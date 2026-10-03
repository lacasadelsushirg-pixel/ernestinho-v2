#!/usr/bin/env python3
"""Read-only structure, navigation, metadata, asset and size audit for the static site."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import posixpath
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
LIMIT = 250 * 1024
PUBLIC_ORIGIN = "https://www.ernestinhocarioca.com.br"
PREVIEW_HOST = "ernestinho-v2.vercel.app"

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.ids, self.h1 = [], set(), 0
        self.title, self.description, self.lang = 0, 0, False
        self.images_without_alt, self.inline_scripts = [], []
        self.canonicals, self.og_urls, self.robots = [], [], []
        self.suppressed, self.h2, self.visible_words = 0, 0, 0
    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "svg", "nav", "header", "footer") and self.suppressed: self.suppressed -= 1
    def handle_data(self, data):
        if not self.suppressed: self.visible_words += len(data.split())
    def handle_starttag(self, tag, attrs):
        attr = dict(attrs)
        self.tags.append((tag, attr))
        if tag == "h1": self.h1 += 1
        if tag == "h2": self.h2 += 1
        if tag in ("script", "style", "noscript", "svg", "nav", "header", "footer"): self.suppressed += 1
        if tag == "title": self.title += 1
        if tag == "html": self.lang = bool(attr.get("lang"))
        if tag == "meta" and attr.get("name", "").lower() == "description" and attr.get("content"): self.description += 1
        if tag == "meta" and attr.get("property", "").lower() == "og:url" and attr.get("content"): self.og_urls.append(attr["content"])
        if tag == "meta" and attr.get("name", "").lower() in ("robots", "googlebot"): self.robots.append(attr.get("content", "").lower())
        if tag == "link" and "canonical" in attr.get("rel", "").lower().split() and attr.get("href"): self.canonicals.append(attr["href"])
        if attr.get("id"): self.ids.add(attr["id"])
        if tag == "img" and not attr.get("alt"): self.images_without_alt.append(attr.get("src", "(missing src)"))
        if tag == "script" and not attr.get("src") and attr.get("type", "").lower() != "application/ld+json": self.inline_scripts.append(attr.get("type", "classic"))

def main():
    def source_file(path):
        return not any(part in path.relative_to(ROOT).parts for part in ('node_modules', 'dist', '.vercel', '.git'))
    pages = sorted(p for p in ROOT.rglob("*.html") if source_file(p))
    parsed, errors, warnings, sizes, depth = {}, [], [], [], []
    for path in pages:
        rel = path.relative_to(ROOT).as_posix()
        page = Page()
        source = path.read_text(encoding="utf-8", errors="replace")
        try: page.feed(source)
        except Exception as error: errors.append(f"HTML parse {rel}: {error}")
        parsed[rel] = page
        if rel != "404.html": depth.append((page.visible_words, page.h2, rel))
        route = "/" if rel == "index.html" else "/" + rel[:-10] if rel.endswith("/index.html") else "/" + rel
        route = route if route.endswith("/") or "." in route.rsplit("/", 1)[-1] else route + "/"
        redirect = None
        for tag, attr in page.tags:
            if tag == "meta" and attr.get("http-equiv", "").lower() == "refresh":
                match = re.fullmatch(r"\s*0\s*;\s*url\s*=\s*([^;]+)\s*", attr.get("content", ""), re.I)
                if match:
                    destination = urljoin(PUBLIC_ORIGIN + route, match[1].strip().strip("\"'"))
                    target_url = urlsplit(destination)
                    target_path = ROOT / unquote(target_url.path).lstrip("/")
                    if target_path.is_dir(): target_path /= "index.html"
                    if destination.startswith(PUBLIC_ORIGIN + "/") and target_path.is_file():
                        target_page = Page(); target_page.feed(target_path.read_text(encoding="utf-8"))
                        if target_page.canonicals == [destination]: redirect = destination
                    if not redirect: errors.append(f"Invalid redirect destination: {rel} -> {destination}")
        noindex = any("noindex" in value or "none" in value.split() for value in page.robots)
        if rel != "404.html" and not noindex:
            expected = redirect or PUBLIC_ORIGIN + route
            if len(page.canonicals) != 1:
                errors.append(f"Expected one canonical: {rel} ({len(page.canonicals)})")
            elif page.canonicals[0] != expected:
                errors.append(f"Canonical mismatch: {rel} -> {page.canonicals[0]} (expected {expected})")
            if page.og_urls and any(value not in (expected, PUBLIC_ORIGIN + route) for value in page.og_urls):
                errors.append(f"og:url mismatch: {rel} -> {page.og_urls}")
            if PREVIEW_HOST in source:
                errors.append(f"Preview domain in public page: {rel}")
        if page.title != 1: errors.append(f"Expected one title: {rel} ({page.title})")
        if page.description != 1 and not redirect: errors.append(f"Expected one description: {rel} ({page.description})")
        if not page.lang: errors.append(f"Missing html lang: {rel}")
        events_renderer = ROOT / "eventos/grandes-eventos-page.js"
        rendered_heading = rel == "eventos/index.html" and page.h1 == 0 and events_renderer.is_file() and 'React.createElement("h1"' in events_renderer.read_text(encoding="utf-8")
        if rendered_heading: warnings.append(f"Verify rendered h1 in browser: {rel}")
        if rel != "404.html" and page.h1 != 1 and not redirect and not rendered_heading: errors.append(f"Expected one h1: {rel} ({page.h1})")
        if rel != "404.html" and not redirect and not any(
            tag == "script" and attr.get("type", "").lower() == "module" and attr.get("src", "").endswith(("assets/js/site.js", "assets/js/standalone-i18n.js"))
            for tag, attr in page.tags
        ):
            errors.append(f"Missing shared language/navigation runtime: {rel}")
        if page.images_without_alt: errors.append(f"Images missing alt: {rel} ({len(page.images_without_alt)})")
        for tag, attr in page.tags:
            for field in ("href", "src"):
                value = attr.get(field)
                if not value or value.startswith(("http:", "https:", "mailto:", "tel:", "data:", "javascript:")): continue
                split = urlsplit(value)
                route = unquote(split.path)
                target = ROOT / route.lstrip("/") if route.startswith("/") else ROOT / posixpath.normpath(posixpath.join(path.parent.relative_to(ROOT).as_posix(), route))
                if not route: target = path
                if target.is_dir(): target /= "index.html"
                if not target.exists(): errors.append(f"Broken local {field}: {rel} -> {value}")
                elif field == "href" and split.fragment and target.suffix == ".html":
                    target_page = parsed.get(target.relative_to(ROOT).as_posix())
                    if target_page is None:
                        target_page = Page(); target_page.feed(target.read_text(encoding="utf-8", errors="replace"))
                    if split.fragment not in target_page.ids: errors.append(f"Dead fragment: {rel} -> {value}")
        for match in ("url('h')", 'url("h")'):
            if match in source: errors.append(f"Placeholder image URL {match}: {rel}")
        size = path.stat().st_size
        sizes.append((size, rel))
        if size > LIMIT: errors.append(f"Functional HTML exceeds 250 KB: {rel} ({size} bytes)")
    for path in [p for p in [*ROOT.rglob("*.js"), *ROOT.rglob("*.css")] if source_file(p)]:
        if ".git" in path.parts: continue
        size = path.stat().st_size
        sizes.append((size, path.relative_to(ROOT).as_posix()))
        if size > LIMIT: errors.append(f"Functional asset exceeds 250 KB: {path.relative_to(ROOT)} ({size} bytes)")
    print(f"HTML routes: {len(pages)}")
    print(f"Audited local links/assets: {sum(len(p.tags) for p in parsed.values())}")
    print(f"Largest functional file: {max(sizes)[1]} ({max(sizes)[0]} bytes)")
    classes = Counter("incomplete" if words < 120 else "basic" if words < 500 else "acceptable" if words < 800 or h2 < 3 else "complete" if words >= 800 and h2 >= 5 else "acceptable" for words, h2, _ in depth)
    print(f"Content depth (heuristic, visible words / section headings): {dict(classes)}")
    print("Shallowest 10 routes:")
    for words, h2, route in sorted(depth)[:10]: print(f"  {words:4} words, {h2:2} h2  {route}")
    print(f"Errors: {len(errors)}")
    for warning in warnings: print("WARN", warning)
    for error in errors[:100]: print("ERROR", error)
    return 1 if errors else 0

if __name__ == "__main__":
    sys.exit(main())
