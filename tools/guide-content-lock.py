#!/usr/bin/env python3
"""Check that closed Rio Guide files match the approved SHA-256 snapshot."""
from __future__ import annotations
import hashlib, json, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / 'tools' / 'guide-content-lock.json'
PAGES = ('guia', 'consejos')
TRANSLATIONS = ('assets/js/translations/chunks/guia-01.js', 'assets/js/translations/chunks/guia-02.js', 'assets/js/translations/chunks/consejos-01.js')
def current_files():
    html = [f'{folder}/{p.relative_to(ROOT / folder).as_posix()}' for folder in PAGES for p in (ROOT / folder).rglob('*.html')]
    return sorted(html + [p for p in TRANSLATIONS if (ROOT / p).is_file()])
def digest(path):
    return hashlib.sha256((ROOT / path).read_bytes()).hexdigest()
def main():
    if len(sys.argv) == 2 and sys.argv[1] == '--write':
        pages = current_files()
        payload = {'schema': 1, 'policy': 'Closed guide pages and language chunks require explicit Ernesto authorization before updating this snapshot.', 'files': {p: digest(p) for p in pages}}
        MANIFEST.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        print(f'Snapshot written: {len(pages)} locked files')
        return 0
    if not MANIFEST.exists():
        print('FAIL: approved page snapshot is missing.', file=sys.stderr); return 2
    approved = json.loads(MANIFEST.read_text(encoding='utf-8')).get('files', {})
    pages = set(current_files()); locked = set(approved)
    issues=[]
    for path in sorted(locked - pages): issues.append(f'MISSING {path}')
    for path in sorted(pages - locked): issues.append(f'UNLOCKED {path}')
    for path in sorted(pages & locked):
        actual=digest(path)
        if actual != approved[path]: issues.append(f'CHANGED {path}')
    if issues:
        print(f'FAIL: {len(issues)} unauthorized change(s) in closed Rio Guide files.')
        print('\n'.join(issues))
        print('Do not update the snapshot unless Ernesto explicitly authorizes that page change.')
        return 1
    print(f'PASS: all {len(locked)} closed Rio Guide files match the approved snapshot.')
    return 0
if __name__ == '__main__': raise SystemExit(main())
