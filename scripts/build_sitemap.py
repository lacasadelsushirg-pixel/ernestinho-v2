#!/usr/bin/env python3
"""Generate sitemap.xml from the real HTML route tree for a supplied deployment origin."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
from xml.etree.ElementTree import Element, SubElement, register_namespace
from xml.sax.saxutils import escape
import os
import json

origin = os.environ.get("SITE_ORIGIN", "https://www.ernestinhocarioca.com.br").strip().rstrip("/")
parsed = urlsplit(origin)
if origin != "https://www.ernestinhocarioca.com.br":
    raise SystemExit("The public sitemap must use https://www.ernestinhocarioca.com.br")
register_namespace("", "http://www.sitemaps.org/schemas/sitemap/0.9")
root = Path(__file__).resolve().parents[1]
urlset = Element("{http://www.sitemaps.org/schemas/sitemap/0.9}urlset")
count = 0
redirects = {item['source'].rstrip('/') or '/'
             for item in json.loads((root / 'vercel.json').read_text()).get('redirects', [])}

class Metadata(HTMLParser):
    def __init__(self):
        super().__init__()
        self.excluded = False
        self.canonical = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'meta':
            if attrs.get('http-equiv', '').lower() == 'refresh':
                self.excluded = True
            if attrs.get('name', '').lower() in ('robots', 'googlebot'):
                directives = attrs.get('content', '').lower().replace(',', ' ').split()
                self.excluded |= 'noindex' in directives or 'none' in directives
        if tag == 'link' and 'canonical' in attrs.get('rel', '').lower().split():
            self.canonical = attrs.get('href')

for page in sorted(root.rglob("*.html")):
    relative = page.relative_to(root)
    if relative.as_posix() == "404.html" or ".git" in relative.parts:
        continue
    route = "/" if relative.as_posix() == "index.html" else "/" + relative.parent.as_posix().strip(".") + "/" if relative.name == "index.html" else "/" + relative.as_posix()
    metadata = Metadata()
    metadata.feed(page.read_text(encoding='utf-8'))
    if metadata.excluded or (route.rstrip('/') or '/') in redirects:
        continue
    if metadata.canonical != origin + route:
        raise SystemExit(f"Canonical must match the sitemap URL: {relative}")
    url = SubElement(urlset, "{http://www.sitemaps.org/schemas/sitemap/0.9}url")
    SubElement(url, "{http://www.sitemaps.org/schemas/sitemap/0.9}loc").text = origin + route
    count += 1
output = root / "sitemap.xml"
lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
lines.extend('  <url><loc>' + escape(url[0].text) + '</loc></url>' for url in urlset)
output.write_text('\n'.join(lines + ['</urlset>']) + '\n', encoding='utf-8')
print(f"Wrote {output.name} from {count} routes at {origin}")
