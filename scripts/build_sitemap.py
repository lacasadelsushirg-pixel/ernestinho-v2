#!/usr/bin/env python3
"""Generate sitemap.xml from the real HTML route tree for a supplied deployment origin."""
from pathlib import Path
from urllib.parse import urlsplit
from xml.etree.ElementTree import Element, SubElement, ElementTree, register_namespace
import os

origin = os.environ.get("SITE_ORIGIN", "").strip().rstrip("/")
parsed = urlsplit(origin)
if parsed.scheme != "https" or not parsed.netloc or parsed.path:
    raise SystemExit("Set SITE_ORIGIN to the final HTTPS site origin, for example https://preview.example.com")
register_namespace("", "http://www.sitemaps.org/schemas/sitemap/0.9")
root = Path(__file__).resolve().parents[1]
urlset = Element("{http://www.sitemaps.org/schemas/sitemap/0.9}urlset")
count = 0
for page in sorted(root.rglob("*.html")):
    relative = page.relative_to(root)
    if relative.as_posix() == "404.html" or ".git" in relative.parts:
        continue
    route = "/" if relative.as_posix() == "index.html" else "/" + relative.parent.as_posix().strip(".") + "/" if relative.name == "index.html" else "/" + relative.as_posix()
    url = SubElement(urlset, "{http://www.sitemaps.org/schemas/sitemap/0.9}url")
    SubElement(url, "{http://www.sitemaps.org/schemas/sitemap/0.9}loc").text = origin + route
    count += 1
output = root / "sitemap.xml"
ElementTree(urlset).write(output, encoding="utf-8", xml_declaration=True)
print(f"Wrote {output.name} from {count} routes at {origin}")
