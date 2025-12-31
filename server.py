#!/usr/bin/env python3
"""
Simple HTTP server to serve the DeepThought Frontend Challenge
This fixes CORS issues when accessing external APIs
"""
import http.server
import socketserver

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

Handler = MyHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"✅ Server running at http://localhost:{PORT}")
    print(f"📂 Serving files from: {httpd.server_address}")
    print(f"🌐 Open http://localhost:{PORT} in your browser")
    print(f"\nPress Ctrl+C to stop the server")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n🛑 Server stopped")
