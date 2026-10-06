#!/usr/bin/env python3
"""Export old-host photo references for Rio's requested priority sections."""
import json
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/rio/FOTOS_CLOUDINARY_RIO_REEMPLAZO.json"
OUT = ROOT / "docs/rio/FOTOS_RIO_PRIORIDAD_URGENTE.json"

CATEGORIES = {
    "restaurantes": ("/gastronomia/",),
    "museos_cultura": ("/museos/", "/cultura/"),
    "atracciones": ("/atracciones/", "/puntos-turisticos/"),
    "experiencias": ("/experiencias/",),
    "vida_nocturna": ("/vida-nocturna/",),
}


def category(route):
    if not route:
        return None
    for name, prefixes in CATEGORIES.items():
        if route.startswith(prefixes):
            return name
    return None


inventory = json.loads(SOURCE.read_text())
selected = defaultdict(lambda: defaultdict(lambda: {"variants": {}, "routes": set(), "occurrences": 0}))
for item in inventory["assets"]:
    for ref in item["references"]:
        name = category(ref.get("route"))
        if not name:
            continue
        record = selected[name][item["cloudinaryPublicId"]]
        record["variants"][item["url"]] = item["assetName"]
        record["occurrences"] += 1
        record["routes"].add(ref["route"])

groups = {}
for name, by_id in selected.items():
    assets = []
    for public_id, record in sorted(by_id.items()):
        assets.append({
            "cloudinaryPublicId": public_id,
            "filename": public_id.rsplit("/", 1)[-1],
            "urlVariants": [{"url": url, "filename": filename} for url, filename in sorted(record["variants"].items())],
            "routes": sorted(record["routes"]),
            "occurrences": record["occurrences"],
        })
    groups[name] = {
        "uniquePhotoIds": len(assets),
        "urlVariants": sum(len(a["urlVariants"]) for a in assets),
        "occurrences": sum(a["occurrences"] for a in assets),
        "routes": sorted({r for a in assets for r in a["routes"]}),
        "assets": assets,
    }

result = {
    "scope": "Río únicamente; requested priority sections. Búzios excluded.",
    "sourceInventory": "docs/rio/FOTOS_CLOUDINARY_RIO_REEMPLAZO.json",
    "status": "OLD_HOST_REFERENCES_INVENTORIED; CLOUDFLARE_MAPPING_AND_MISSING_ASSETS_PENDING",
    "groups": groups,
}
OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
for name, group in groups.items():
    print(f"{name}: {group['uniquePhotoIds']} IDs, {group['occurrences']} occurrences, {len(group['routes'])} routes")
print(f"Inventory: {OUT.relative_to(ROOT)}")
