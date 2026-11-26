"""Validate pinned local Marian model folders before any offline inference."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOCK_PATH = Path(__file__).with_name("translation_models.lock.json")


def sha256_file(path):
    digest = hashlib.sha256()
    with Path(path).open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def load_lock(path=LOCK_PATH):
    lock = json.loads(Path(path).read_text(encoding="utf-8"))
    if lock.get("schema_version") != 1 or not isinstance(lock.get("models"), dict):
        raise ValueError("Unsupported or malformed translation model lock")
    return lock


def verify_model_dir(model_dir, model_key, lock=None):
    """Check license, immutable revision, required files and their SHA-256 hashes."""
    model_dir = Path(model_dir)
    lock = lock or load_lock()
    expected = lock["models"].get(model_key)
    if not expected:
        raise ValueError(f"Unregistered translation model key: {model_key}")
    provenance_path = model_dir / "provenance.json"
    if not provenance_path.is_file():
        raise ValueError(f"Missing model provenance: {provenance_path}")
    provenance = json.loads(provenance_path.read_text(encoding="utf-8"))
    for field in ("repo_id", "revision", "license", "license_url"):
        if provenance.get(field) != expected[field]:
            raise ValueError(f"Model provenance {field} does not match the pinned lock")
    if expected.get("commercial_use") is not True or provenance.get("commercial_use") is not True:
        raise ValueError("Model is not explicitly cleared for commercial use")
    files = provenance.get("files")
    if not isinstance(files, dict) or not files:
        raise ValueError("Model provenance has no file checksums")
    required = {"README.md", "config.json", "source.spm", "target.spm", *expected["weight_files"]}
    missing = required - set(files)
    if missing:
        raise ValueError("Model snapshot is missing required files: " + ", ".join(sorted(missing)))
    for relative, expected_hash in files.items():
        rel = Path(relative)
        if rel.is_absolute() or ".." in rel.parts or relative == "provenance.json":
            raise ValueError("Unsafe path in model provenance")
        file_path = model_dir / rel
        if not file_path.is_file():
            raise ValueError(f"Model file is missing: {relative}")
        digest = sha256_file(file_path)
        if digest != expected_hash:
            raise ValueError(f"Model file checksum mismatch: {relative}")
    return expected, provenance
