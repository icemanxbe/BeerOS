#!/usr/bin/env python3
"""BeerOS — minimal static + API server. No build step, stdlib only.

Serves index.html/app.css/core/* as static files, plus a tiny JSON-blob
persistence API backed by SQLite (GET/POST /api/state) so batch tracking
survives a page reload. No multi-user auth, no delta saves, no sync
protocol yet — a single shared blob is the right amount of complexity
for a single self-hosted instance; add more once that's outgrown.
"""
import http.server
import json
import os
import sqlite3
import sys

PORT = int(os.environ.get("PORT", 8199))
if "--port" in sys.argv:
    PORT = int(sys.argv[sys.argv.index("--port") + 1])
DB_PATH = os.environ.get("BEEROS_DB", "beeros.db")
if "--db" in sys.argv:
    DB_PATH = sys.argv[sys.argv.index("--db") + 1]
ROOT = os.path.dirname(os.path.abspath(__file__))


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value TEXT)")
    return conn


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        if self.path == "/api/state":
            conn = get_db()
            row = conn.execute("SELECT value FROM kv WHERE key = 'state'").fetchone()
            conn.close()
            body = (row[0] if row else "{}").encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()

    def do_POST(self):
        if self.path == "/api/state":
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
        self.send_response(404)
        self.end_headers()


if __name__ == "__main__":
    with http.server.ThreadingHTTPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"BeerOS serving on http://0.0.0.0:{PORT} (db: {DB_PATH})")
        httpd.serve_forever()
