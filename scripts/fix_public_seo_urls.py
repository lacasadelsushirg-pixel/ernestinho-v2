#!/usr/bin/env python3
"""Repair public SEO URLs without changing visible page content."""
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_ORIGIN = "https://www.ernestinhocarioca.com.br"
PREVIEW_ORIGIN = "https://ernestinho-v2.vercel.app"

def route_for(path):
    rel = path.relative_to(ROOT).as_posix()
    if rel == "index.html":
        return "/"
    if rel.endswith("/index.html"):
        return "/" + rel[:-10]
    return "/" + rel

def repair_jsonld(match, expected):
    raw = match.group(1)
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        return match.group(0), False
    encoded = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    if PREVIEW_ORIGIN not in encoded:
        return match.group(0), False
    def walk(value):
        if isinstance(value, dict):
            return {k: walk(v) for k, v in value.items()}
        if isinstance(value, list):
            return [walk(v) for v in value]
        if isinstance(value, str):
            if value == PREVIEW_ORIGIN or value == PREVIEW_ORIGIN + "/":
                return PUBLIC_ORIGIN + "/"
            if value.startswith(PREVIEW_ORIGIN + "/"):
                return PUBLIC_ORIGIN + value[len(PREVIEW_ORIGIN):]
        return value
    fixed = json.dumps(walk(data), ensure_ascii=False, separators=(",", ":"))
    return '<script type="application/ld+json">' + fixed + "</script>", True

def repair(path, write=False):
    source = path.read_text(encoding="utf-8")
    if PREVIEW_ORIGIN not in source:
        return False
    expected = PUBLIC_ORIGIN + route_for(path)
    changed = False
    source2, n = re.subn(
        r'(<link\b[^>]*\brel=["\'][^"\']*\bcanonical\b[^"\']*["\'][^>]*\bhref=["\'])' +
        re.escape(PREVIEW_ORIGIN) + r'[^"\']*(["\'][^>]*>)',
        lambda m: m.group(1) + expected + m.group(2), source, flags=re.I)
    changed |= bool(n)
    source = source2
    source2, n = re.subn(
        r'(<meta\b[^>]*\bproperty=["\']og:url["\'][^>]*\bcontent=["\'])' +
        re.escape(PREVIEW_ORIGIN) + r'[^"\']*(["\'][^>]*>)',
        lambda m: m.group(1) + expected + m.group(2), source, flags=re.I)
    changed |= bool(n)
    source = source2
    pattern = re.compile(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', re.I | re.S)
    def repl(m):
        nonlocal changed
        fixed, did = repair_jsonld(m, expected)
        changed |= did
        return fixed
    source = pattern.sub(repl, source)
    if write and changed:
        path.write_text(source, encoding="utf-8")
    return changed

def main():
    write = "--write" in sys.argv
    touched = []
    for path in sorted(ROOT.rglob("*.html")):
        if ".git" in path.parts:
            continue
        if repair(path, write=write):
            touched.append(path.relative_to(ROOT).as_posix())
    mode = "updated" if write else "would update"
    print(f"{mode}: {len(touched)} HTML files")
    for rel in touched:
        print(rel)
    if not write:
        print("Dry run only. Re-run with --write after reviewing the file list.")

if __name__ == "__main__":
    main()
