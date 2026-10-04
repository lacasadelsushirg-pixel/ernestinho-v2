#!/usr/bin/env python3
"""Focused QA for Búzios V1 rendered output."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
ORIGIN = "https://www.ernestinhocarioca.com.br"
SOURCES = [
    "/destinos/", "/destinos/buzios/", "/destinos/buzios/playas/",
    "/destinos/buzios/alojamiento/", "/destinos/buzios/como-llegar/",
    "/destinos/buzios/moverse/", "/destinos/buzios/que-hacer/",
    "/destinos/buzios/comer-y-salir/", "/destinos/buzios/cruceros/",
    "/destinos/buzios/consejos/", "/destinos/buzios/experiencias/",
    "/destinos/buzios/experiencias/arraial-do-cabo/",
    "/destinos/buzios/experiencias/cabo-frio/",
    "/destinos/buzios/experiencias/rio-desde-buzios/",
    "/destinos/buzios/experiencias/paseo-barco/",
    "/destinos/buzios/experiencias/paseo-buggy/",
    "/destinos/buzios/experiencias/alquiler-buggy/",
    "/destinos/buzios/experiencias/jardinera/",
    "/destinos/buzios/experiencias/trekking/",
    "/destinos/buzios/experiencias/buceo/",
    "/destinos/buzios/experiencias/full-day-buzios/",
]
COMMERCIAL = set(SOURCES[11:])
LANGS = {"ES": ("", "es"), "PT": ("/pt", "pt-BR"), "EN": ("/en", "en")}
HISTORIC_AMOUNTS = re.compile(r"R\$\s*(?:25|60|80|90|94|100|160|180|190|260|330|360|380|400|405)(?!\d)")


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.lang = ""
        self.title = ""
        self.in_title = False
        self.h1 = 0
        self.description = ""
        self.canonical = ""
        self.alternates = {}
        self.og = {}
        self.hrefs = []
        self.body = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html": self.lang = attrs.get("lang", "")
        if tag == "title": self.in_title = True
        if tag == "h1": self.h1 += 1
        if tag == "meta" and attrs.get("name") == "description": self.description = attrs.get("content", "")
        if tag == "meta" and attrs.get("property", "").startswith("og:"):
            self.og[attrs["property"]] = attrs.get("content", "")
        if tag == "link" and attrs.get("rel") == "canonical": self.canonical = attrs.get("href", "")
        if tag == "link" and attrs.get("rel") == "alternate": self.alternates[attrs.get("hreflang", "")] = attrs.get("href", "")
        if tag == "a" and attrs.get("href"): self.hrefs.append(attrs["href"])

    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False

    def handle_data(self, data):
        if self.in_title: self.title += data
        self.body.append(data)


def route_file(route):
    return DIST / route.lstrip("/") / "index.html" if route != "/" else DIST / "index.html"


def main():
    failures, rows = [], []
    expected_routes = []
    sitemap = (DIST / "sitemap.xml").read_text(encoding="utf-8")
    for language, (prefix, expected_lang) in LANGS.items():
        for source in SOURCES:
            route = prefix + source
            expected_routes.append(route)
            file = route_file(route)
            row = {"route": route, "language": language, "problems": []}
            if not file.is_file():
                row["problems"].append("missing rendered file")
                rows.append(row)
                continue
            page = Page(); page.feed(file.read_text(encoding="utf-8"))
            expected_canonical = ORIGIN + route
            if page.lang != expected_lang: row["problems"].append(f"lang {page.lang!r}")
            if not page.title.strip(): row["problems"].append("missing title")
            if len(page.description.strip()) < 80: row["problems"].append("short/missing description")
            if page.canonical != expected_canonical: row["problems"].append("canonical mismatch")
            if page.h1 != 1: row["problems"].append(f"h1 count {page.h1}")
            if not all(page.og.get(k) for k in ("og:title", "og:description", "og:url", "og:image")):
                row["problems"].append("incomplete OG")
            if page.og.get("og:url") != expected_canonical: row["problems"].append("og:url mismatch")
            expected_alt = {
                "es": ORIGIN + source,
                "pt-BR": ORIGIN + "/pt" + source,
                "en": ORIGIN + "/en" + source,
                "x-default": ORIGIN + source,
            }
            if page.alternates != expected_alt: row["problems"].append("hreflang mismatch")
            if f"<loc>{expected_canonical}</loc>" not in sitemap: row["problems"].append("missing sitemap URL")
            body = " ".join(page.body)
            if HISTORIC_AMOUNTS.search(body): row["problems"].append("historical amount exposed")
            if source in COMMERCIAL and not any(h.startswith("https://wa.me/5521969946938") for h in page.hrefs):
                row["problems"].append("missing WhatsApp CTA")
            for href in page.hrefs:
                split = urlsplit(href)
                if split.scheme or split.netloc or href.startswith(("#", "mailto:", "tel:")): continue
                local = unquote(split.path)
                if not local.startswith("/"): continue
                target = route_file(local)
                if not target.is_file() and not (DIST / local.lstrip("/")).is_file():
                    row["problems"].append(f"broken link {href}")
            rows.append(row)

    for prefix, _ in LANGS.values():
        home = route_file(prefix + "/" if prefix else "/")
        if not home.is_file() or "home-buzios" not in home.read_text(encoding="utf-8"):
            failures.append({"route": prefix + "/", "problem": "Búzios Home block missing"})

    failures.extend({"route": r["route"], "problem": p} for r in rows for p in r["problems"])
    report = {
        "source_urls": len(SOURCES),
        "localized_versions": len(expected_routes),
        "editorial_source_urls": len(SOURCES) - len(COMMERCIAL),
        "commercial_source_urls": len(COMMERCIAL),
        "failures": failures,
        "rows": rows,
    }
    out = ROOT / "docs/buzios/QA_BUZIOS_V1.json"
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({k: report[k] for k in ("source_urls", "localized_versions", "editorial_source_urls", "commercial_source_urls")}, ensure_ascii=False))
    print(f"Failures: {len(failures)}")
    for failure in failures[:100]: print("ERROR", failure)
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
