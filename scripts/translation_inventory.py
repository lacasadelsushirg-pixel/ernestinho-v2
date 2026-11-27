"""Read-only translation inventory; Python standard library, no paid services.
Usage: python scripts/translation_inventory.py index.html compras/index.html
Outputs JSON to stdout. Inline scripts are flagged for separate AST extraction.
"""
import argparse
import hashlib
import json
from pathlib import Path
from html.parser import HTMLParser

ATTRS = {"alt", "aria-label", "aria-description", "placeholder", "title"}
META = {"description", "og:title", "og:description", "twitter:title", "twitter:description"}

class Extractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.units = {}
        self.scripts = []
        self.block = None
    def add(self, value, kind):
        value = (value or "").strip()
        if not value or not any(c.isalpha() for c in value):
            return
        key = hashlib.sha256(value.encode("utf-8")).hexdigest()
        self.units.setdefault(key, {"source": value, "kinds": []})
        if kind not in self.units[key]["kinds"]:
            self.units[key]["kinds"].append(kind)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in {"script", "style"}:
            self.block = tag
        for k, v in attrs:
            if k in ATTRS or k == "data-es" or k.endswith("-es") and k.startswith("data-"):
                self.add(v, k)
        if tag == "meta" and (a.get("name") or a.get("property")) in META:
            self.add(a.get("content"), "meta")
    def handle_endtag(self, tag):
        if tag == self.block:
            self.block = None
    def handle_data(self, data):
        if self.block == "script":
            if data.strip():
                self.scripts.append({"sha256": hashlib.sha256(data.encode()).hexdigest(), "line": self.getpos()[0]})
        elif not self.block:
            self.add(data, "text")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("files", nargs="+", type=Path)
    args = parser.parse_args()
    pages = []
    for path in args.files:
        raw = path.read_bytes()
        extractor = Extractor()
        extractor.feed(raw.decode("utf-8"))
        extractor.close()
        pages.append({"path": str(path), "source_sha256": hashlib.sha256(raw).hexdigest(),
                      "units": extractor.units, "inline_scripts_pending": extractor.scripts,
                      "publication_approved": False})
    print(json.dumps({"pages": pages}, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
