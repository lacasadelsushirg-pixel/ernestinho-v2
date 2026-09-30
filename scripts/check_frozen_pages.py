from pathlib import Path
import hashlib,json,sys
root=Path(__file__).resolve().parents[1]
manifest=json.loads((root/'docs/FROZEN_PAGES_20260930.json').read_text())
failures=[name for name,digest in manifest.items() if not (root/name).is_file() or hashlib.sha256((root/name).read_bytes()).hexdigest()!=digest]
if failures:
 print('Protected pages changed:');print('\n'.join(failures));sys.exit(1)
print(f'PASS: {len(manifest)} protected pages unchanged.')
