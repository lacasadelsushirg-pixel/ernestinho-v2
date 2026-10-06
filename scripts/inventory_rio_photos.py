#!/usr/bin/env python3
"""Inventory references to the disabled Cloudinary account outside Búzios."""
import json
import re
from collections import defaultdict
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs/rio/FOTOS_CLOUDINARY_RIO_REEMPLAZO.json"
HOST = "res.cloudinary.com/qa301cbc/"
URL_RE = re.compile(r"""https?://res\.cloudinary\.com/qa301cbc/[^\s"'<>)]{1,}""")


def excluded(path: Path) -> bool:
    parts = [part.lower() for part in path.relative_to(ROOT).parts]
    if any(part in {".git", "node_modules", "dist", ".vercel", "upload"} for part in parts):
        return True
    if any("buzios" in part or "búzios" in part for part in parts):
        return True
    if parts[0] == "docs":
        return True
    return path.suffix.lower() not in {".html", ".js", ".json", ".css"}


def route_for(rel: str):
    if not rel.endswith("/index.html"):
        return None
    return "/" + rel[:-len("index.html")]


def cloudinary_public_id(url: str) -> str:
    path = urlsplit(url).path.split("/image/upload/", 1)[-1]
    parts = path.split("/")
    version_at = next((i for i, part in enumerate(parts) if re.fullmatch(r"v\d+", part)), None)
    if version_at is not None:
        parts = parts[version_at + 1:]
    else:
        while parts and ("," in parts[0] or re.match(r"^(?:f|q|c|w|h|ar|g|dpr|e|fl|l|r|t|x|y|z)_", parts[0])):
            parts.pop(0)
    return unquote("/".join(parts))


assets = defaultdict(lambda: {"url": "", "assetName": "", "references": []})
pages = [p for p in ROOT.rglob("index.html") if not excluded(p)]
scanned_files = 0
pages_with_refs = set()
for path in ROOT.rglob("*"):
    if not path.is_file() or excluded(path):
        continue
    scanned_files += 1
    rel = path.relative_to(ROOT).as_posix()
    source = path.read_text(errors="replace")
    route = route_for(rel)
    for match in URL_RE.finditer(source):
        url = match.group(0).rstrip(",.;")
        if HOST not in url:
            continue
        # Keep an adjacent alt when this is an image element; source context
        # and line are included for other metadata/data references.
        context = source[max(0, match.start()-500):min(len(source), match.end()+250)]
        alt_match = re.search(r"<img\b[^>]*\balt=[\"']([^\"']*)[\"'][^>]*>", context, re.I | re.S)
        item = assets[url]
        item["url"] = url
        item["cloudinaryPublicId"] = cloudinary_public_id(url)
        item["assetName"] = item["cloudinaryPublicId"].rsplit("/", 1)[-1]
        item["references"].append({
            "route": route,
            "sourceFile": rel,
            "line": source.count("\n", 0, match.start()) + 1,
            "alt": alt_match.group(1) if alt_match else None,
        })
        if route:
            pages_with_refs.add(route)

ordered = sorted(assets.values(), key=lambda a: a["assetName"].lower())
for item in ordered:
    item["references"].sort(key=lambda r: (r["sourceFile"], r["line"]))
result = {
    "scope": "Rio site source outside Búzios paths; all public HTML pages plus shared HTML/JS/JSON/CSS sources.",
    "host": "res.cloudinary.com/qa301cbc",
    "routesScanned": len(pages),
    "pagesWithReferences": len(pages_with_refs),
    "sourceFilesScanned": scanned_files,
    "oldHostOccurrences": sum(len(a["references"]) for a in ordered),
    "uniqueUrlVariants": len(ordered),
    "uniquePhotoIds": len({a["cloudinaryPublicId"] for a in ordered}),
    "status": "INVENTORY_COMPLETE; NEW_SERVER_MAPPING_PENDING",
    "assets": ordered,
}
OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
print(f"Rio HTML routes scanned: {len(pages)}")
print(f"Pages using old host: {len(pages_with_refs)}")
print(f"Source files scanned: {scanned_files}")
print(f"Old-host occurrences: {result['oldHostOccurrences']}")
print(f"Unique photo IDs: {result['uniquePhotoIds']}")
print(f"URL variants: {result['uniqueUrlVariants']}")
print(f"Inventory: {OUT.relative_to(ROOT)}")
