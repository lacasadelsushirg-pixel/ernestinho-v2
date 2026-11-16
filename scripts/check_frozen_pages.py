from pathlib import Path
import hashlib
import json
import sys


ROOT = Path(__file__).resolve().parents[1]
HISTORICAL_MANIFEST = ROOT / "docs/FROZEN_PAGES_20260930.json"
PUBLISHED_SNAPSHOT = ROOT / "docs/PUBLISHED_PROTECTION_SNAPSHOT_20261109.json"
EXPECTED_PUBLISHED_COMMIT = "02968a27acd166e06b66c95df8f20074de881429"
EXPECTED_PAGE_COUNT = 586

# Owner-authorized, path-scoped page update already recorded in the publication
# guard. Its published-snapshot hash is intentionally superseded for this route.
OWNER_AUTHORIZED_ROUTE_BLOBS = {
    "quiero/index.html": "32267e792c4e044e07d12997cec4f610a880a097",
}


def git_blob_hash(content: bytes) -> str:
    header = f"blob {len(content)}\0".encode("ascii")
    return hashlib.sha1(header + content).hexdigest()


def sha256(content: bytes) -> str:
    return hashlib.sha256(content).hexdigest()


def main() -> int:
    historical = json.loads(HISTORICAL_MANIFEST.read_text(encoding="utf-8"))
    snapshot = json.loads(PUBLISHED_SNAPSHOT.read_text(encoding="utf-8"))
    published = snapshot.get("protectedFiles", {})

    if snapshot.get("publishedCommit") != EXPECTED_PUBLISHED_COMMIT:
        print("FAIL: published protection snapshot points to an unexpected commit.")
        return 1
    if len(historical) != EXPECTED_PAGE_COUNT or len(published) != EXPECTED_PAGE_COUNT:
        print(
            "FAIL: protected page inventory mismatch: "
            f"historical={len(historical)}, published={len(published)}, "
            f"expected={EXPECTED_PAGE_COUNT}."
        )
        return 1
    if set(historical) != set(published):
        print("FAIL: historical and published page inventories do not match.")
        return 1

    failures = []
    historical_drift = []
    for name, historical_digest in historical.items():
        file_path = ROOT / name
        if not file_path.is_file():
            failures.append(f"{name}: missing")
            continue

        content = file_path.read_bytes()
        expected_published_blob = OWNER_AUTHORIZED_ROUTE_BLOBS.get(name, published[name])
        actual_blob = git_blob_hash(content)
        if actual_blob != expected_published_blob:
            failures.append(f"{name}: differs from the published protection snapshot")
        if sha256(content) != historical_digest:
            historical_drift.append(name)

    if failures:
        print("Protected pages changed since the published snapshot:")
        print("\n".join(failures))
        return 1

    print(
        f"PASS: {EXPECTED_PAGE_COUNT} protected pages match the published "
        f"snapshot at {EXPECTED_PUBLISHED_COMMIT[:8]}."
    )
    if historical_drift:
        print(
            f"HISTORICAL AUDIT: {len(historical_drift)} pages differ from the "
            "2026-09-30 manifest; these are reported separately and are not "
            "treated as new changes against the published snapshot."
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
