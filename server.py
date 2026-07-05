#!/usr/bin/env python3
"""BeerOS — minimal static server. No build step, stdlib only.

Fresh-start skeleton: serves index.html/app.css/core/* as static files.
No database, no API routes yet — add them as real features get built.
"""
import http.server
import os

PORT = int(os.environ.get("PORT", 8199))
ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)


if __name__ == "__main__":
    with http.server.ThreadingHTTPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"BeerOS serving on http://0.0.0.0:{PORT}")
        httpd.serve_forever()
