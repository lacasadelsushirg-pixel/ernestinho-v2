#!/usr/bin/env python3
"""Offline consistency audit for the independent French Compras staging manifest.

Run from repository root: python3 assets/js/translations/fr/audit_compras_paralelo.py
No source files are modified; this is not a browser/rendering/SEO audit.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
MANIFEST = ROOT / "assets/js/translations/fr/compras-paralelo-manifest.json"


def main():
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    scope = manifest["scope"]
    errors = []
    routes = [item["route"] for item in scope]
    if len(routes) != len(set(routes)):
        errors.append("Duplicate canonical route in scope")
    if len(scope) != manifest["totals"]["prepared_pages"]:
        errors.append("prepared_pages differs from scope length")
    static_count = dynamic_count = paragraphs = captions = 0
    for item in scope:
        route = item["route"]
        static_count += item["entries"]
        dynamic_count += item.get("dynamic_js_keys", 0)
        paragraphs += item.get("dynamic_story_paragraphs", 0)
        captions += item.get("dynamic_image_captions", 0)
        for field in ("dictionary", "dynamic_supplement", "caption_supplement"):
            if field not in item:
                continue
            path = ROOT / item[field]
            if not path.is_file():
                errors.append(f"{route}: missing {field}: {path.relative_to(ROOT)}")
                continue
            try:
                json.loads(path.read_text(encoding="utf-8"))
            except (ValueError, UnicodeError) as exc:
                errors.append(f"{route}: invalid JSON {field}: {exc}")
        if item.get("missing_keys", 0) != 0 or item.get("caption_missing_keys", 0) != 0:
            errors.append(f"{route}: nonzero missing key count")
        if len(item.get("source_sha", "")) != 40:
            errors.append(f"{route}: source SHA not 40 hex characters")
        else:
            try:
                int(item["source_sha"], 16)
            except ValueError:
                errors.append(f"{route}: source SHA not hexadecimal")

    # Verify actual dictionary sizes, empty translations and JSON duplicate keys.
    for item in scope:
        path = ROOT / item["dictionary"]
        if not path.is_file():
            continue
        duplicates = []
        def unique_pairs(pairs):
            result = {}
            for key, value in pairs:
                if key in result:
                    duplicates.append(key)
                result[key] = value
            return result
        data = json.loads(path.read_text(encoding="utf-8"), object_pairs_hook=unique_pairs)
        for key in duplicates:
            errors.append(f'{item["route"]}: duplicate JSON key: {key}')
        if not isinstance(data, dict):
            errors.append(f'{item["route"]}: dictionary is not an object')
            continue
        if len(data) != item["entries"]:
            errors.append(f'{item["route"]}: declared {item["entries"]} static entries but file has {len(data)}')
        for key, value in data.items():
            if not isinstance(key, str) or not isinstance(value, str) or not value.strip():
                errors.append(f'{item["route"]}: invalid/empty translation: {str(key)[:60]}')
        for field in ("dynamic_supplement", "caption_supplement"):
            if field not in item:
                continue
            supplement = ROOT / item[field]
            if not supplement.is_file():
                continue
            supplemental = json.loads(supplement.read_text(encoding="utf-8"), object_pairs_hook=unique_pairs)
            if isinstance(supplemental, dict) and supplemental.get("source_sha"):
                if supplemental["source_sha"] != item["source_sha"]:
                    errors.append(f'{item["route"]}: {field} SHA differs from manifest')
    actual = dict(static_dictionary_entries=static_count, dynamic_JS_keys=dynamic_count,
                  extra_story_paragraphs=paragraphs, dynamic_image_captions=captions)
    for key, count in actual.items():
        if manifest["totals"].get(key) != count:
            errors.append(f"Totals mismatch {key}: manifest={manifest['totals'].get(key)} scope={count}")
    unit_count = sum(actual.values())
    if manifest["totals"].get("total_source_translation_units") != unit_count:
        errors.append(f"Translation unit total mismatch: {unit_count}")
    print(f"Compras FR staging: {len(scope)} routes; {unit_count} declared translation units")
    print("Category counts:", actual)
    if errors:
        for error in errors:
            print("ERROR:", error)
        raise SystemExit(1)
    print("PASS: manifest structure, file existence, JSON parse and declared totals.")
    print("NOT VERIFIED: semantic completeness, original HTML SHA, live schedules, FR rendering or SEO.")


if __name__ == "__main__":
    main()
