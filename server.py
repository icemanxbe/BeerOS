#!/usr/bin/env python3
"""BeerOS — minimal static + API server. No build step, stdlib only.

Serves index.html/app.css/core/* as static files, plus a tiny JSON-blob
persistence API backed by SQLite (GET/POST /api/state) so batch tracking
survives a page reload. No multi-user auth, no delta saves, no sync
protocol yet — a single shared blob is the right amount of complexity
for a single self-hosted instance; add more once that's outgrown.

Also accepts hydrometer/sensor telemetry (POST /api/telemetry) in either
iSpindel/GravityMon's native JSON shape or Brewfather's "Custom Stream"
shape — the latter is what most Tilt/RAPT/Plaato bridge apps already know
how to send, so supporting it covers those devices without a bespoke
integration for each. See docs.brewfather.app/integrations/custom-stream
and mp-se.github.io/gravitymon/data.html (both verified against the real
docs, not guessed) for the exact field names this accepts.
"""
import http.server
import json
import os
import secrets
import sqlite3
import sys
import time
import urllib.parse

PORT = int(os.environ.get("PORT", 8199))
if "--port" in sys.argv:
    PORT = int(sys.argv[sys.argv.index("--port") + 1])
DB_PATH = os.environ.get("BEEROS_DB", "beeros.db")
if "--db" in sys.argv:
    DB_PATH = sys.argv[sys.argv.index("--db") + 1]
ROOT = os.path.dirname(os.path.abspath(__file__))

TELEMETRY_RATE_LIMIT_SECONDS = 15 * 60  # matches Brewfather's own "once per 15min per device" convention


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value TEXT)")
    conn.execute(
        "CREATE TABLE IF NOT EXISTS device_readings ("
        "id INTEGER PRIMARY KEY AUTOINCREMENT, device_name TEXT, date TEXT, "
        "sg REAL, temp_c REAL, battery REAL, source TEXT, created_at REAL)"
    )
    return conn


def get_or_create_telemetry_token(conn):
    row = conn.execute("SELECT value FROM kv WHERE key = 'telemetry_token'").fetchone()
    if row:
        return row[0]
    token = secrets.token_urlsafe(16)
    conn.execute("INSERT INTO kv (key, value) VALUES ('telemetry_token', ?)", (token,))
    conn.commit()
    return token


# Same verified cubic as calculators.js's sgToPlato — duplicated here (not
# re-derived) since this server is Python and that's JS; keep both in sync
# if the KB's coefficients ever change.
def sg_to_plato(sg):
    return -616.868 + (1111.14 * sg) - (630.272 * sg * sg) + (135.997 * sg * sg * sg)


def plato_to_sg(plato):
    lo, hi = 0.980, 1.250
    for _ in range(60):
        mid = (lo + hi) / 2
        if sg_to_plato(mid) < plato:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2


def normalize_telemetry(body):
    """Normalizes either iSpindel/GravityMon native shape or Brewfather's
    Custom Stream shape into {device_name, sg, temp_c, battery, source}.
    Returns None if the body has no usable device name."""
    name = body.get("name")
    if not name or not isinstance(name, str):
        return None

    if "temperature" in body:  # iSpindel/GravityMon native shape
        temp = body.get("temperature")
        temp_unit = body.get("temp_units", "C")
        gravity = body.get("corr-gravity", body.get("gravity"))
        gravity_unit = body.get("gravity-unit", "G")
        battery = body.get("battery")
        source = "ispindel"
    else:  # Brewfather Custom Stream shape
        temp = body.get("temp")
        temp_unit = body.get("temp_unit", "C")
        gravity = body.get("gravity")
        gravity_unit = body.get("gravity_unit", "G")
        battery = body.get("battery")
        source = body.get("device_source") or "sensor"

    temp_c = None
    if isinstance(temp, (int, float)):
        if temp_unit == "F":
            temp_c = (temp - 32) * 5 / 9
        elif temp_unit == "K":
            temp_c = temp - 273.15
        else:
            temp_c = float(temp)

    sg = None
    if isinstance(gravity, (int, float)):
        sg = plato_to_sg(gravity) if gravity_unit == "P" else float(gravity)

    if sg is None:
        return None

    return {
        "device_name": name,
        "sg": round(sg, 4),
        "temp_c": round(temp_c, 2) if temp_c is not None else None,
        "battery": battery if isinstance(battery, (int, float)) else None,
        "source": source,
    }


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def _send_json(self, status, obj):
        body = json.dumps(obj).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/state":
            conn = get_db()
            row = conn.execute("SELECT value FROM kv WHERE key = 'state'").fetchone()
            token = get_or_create_telemetry_token(conn)
            conn.close()
            state = json.loads(row[0]) if row else {}
            state["telemetryToken"] = token
            self._send_json(200, state)
            return
        if parsed.path == "/api/telemetry":
            qs = urllib.parse.parse_qs(parsed.query)
            after = int(qs.get("after", ["0"])[0])
            conn = get_db()
            rows = conn.execute(
                "SELECT id, device_name, date, sg, temp_c, battery, source "
                "FROM device_readings WHERE id > ? ORDER BY id ASC",
                (after,),
            ).fetchall()
            conn.close()
            self._send_json(200, [
                {"id": r[0], "deviceName": r[1], "date": r[2], "sg": r[3], "tempC": r[4], "battery": r[5], "source": r[6]}
                for r in rows
            ])
            return
        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/state":
            length = int(self.headers.get("Content-Length", 0))
            raw = self.rfile.read(length)
            try:
                json.loads(raw)  # validate before persisting
            except ValueError:
                self.send_response(400)
                self.end_headers()
                return
            conn = get_db()
            conn.execute(
                "INSERT INTO kv (key, value) VALUES ('state', ?) "
                "ON CONFLICT(key) DO UPDATE SET value = excluded.value",
                (raw.decode("utf-8"),),
            )
            conn.commit()
            conn.close()
            self.send_response(204)
            self.end_headers()
            return
        if parsed.path == "/api/telemetry":
            length = int(self.headers.get("Content-Length", 0))
            raw = self.rfile.read(length)
            conn = get_db()
            token = get_or_create_telemetry_token(conn)
            qs = urllib.parse.parse_qs(parsed.query)
            if qs.get("token", [None])[0] != token:
                conn.close()
                self.send_response(401)
                self.end_headers()
                return
            try:
                body = json.loads(raw)
            except ValueError:
                conn.close()
                self.send_response(400)
                self.end_headers()
                return
            reading = normalize_telemetry(body) if isinstance(body, dict) else None
            if reading is None:
                conn.close()
                self.send_response(400)
                self.end_headers()
                return
            last = conn.execute(
                "SELECT created_at FROM device_readings WHERE device_name = ? ORDER BY id DESC LIMIT 1",
                (reading["device_name"],),
            ).fetchone()
            now = time.time()
            if last and (now - last[0]) < TELEMETRY_RATE_LIMIT_SECONDS:
                conn.close()
                self._send_json(200, {"status": "ignored", "reason": "rate-limited"})
                return
            conn.execute(
                "INSERT INTO device_readings (device_name, date, sg, temp_c, battery, source, created_at) "
                "VALUES (?, ?, ?, ?, ?, ?, ?)",
                (reading["device_name"], time.strftime("%Y-%m-%d"), reading["sg"],
                 reading["temp_c"], reading["battery"], reading["source"], now),
            )
            conn.commit()
            conn.close()
            self._send_json(200, {"status": "ok"})
            return
        self.send_response(404)
        self.end_headers()


if __name__ == "__main__":
    with http.server.ThreadingHTTPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"BeerOS serving on http://0.0.0.0:{PORT} (db: {DB_PATH})")
        httpd.serve_forever()
