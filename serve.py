#!/usr/bin/env python3
"""Serve the academy locally without dependencies."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from pathlib import Path
import argparse
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--port',type=int,default=8000)
args=parser.parse_args()
root=Path(__file__).resolve().parent
try:
    server=ThreadingHTTPServer(('127.0.0.1',args.port),partial(SimpleHTTPRequestHandler,directory=str(root)))
except OSError as error:
    raise SystemExit(f'Could not start on port {args.port}: {error}. If already running, open http://127.0.0.1:{args.port}; otherwise choose --port 8001.')
print(f'SWE → FDE Academy: http://127.0.0.1:{args.port}\nPress Control-C to stop.',flush=True)
try: server.serve_forever()
except KeyboardInterrupt: pass
finally: server.server_close()
