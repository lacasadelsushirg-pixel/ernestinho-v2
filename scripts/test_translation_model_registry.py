import hashlib
import json
import tempfile
import unittest
from pathlib import Path

from translation_model_registry import verify_model_dir
from translation_offline import lock_memory, required_model_keys, save


class ModelRegistryTests(unittest.TestCase):
    def fixture(self, root):
        files = {
            "README.md": b"license and attribution",
            "config.json": b"{}",
            "source.spm": b"source tokenizer",
            "target.spm": b"target tokenizer",
            "pytorch_model.bin": b"weights",
        }
        for name, content in files.items():
            (root / name).write_bytes(content)
        expected = {
            "repo_id": "example/model",
            "revision": "a" * 40,
            "license": "apache-2.0",
            "license_url": "https://example.test/license",
            "commercial_use": True,
            "weight_files": ["pytorch_model.bin"],
        }
        provenance = {
            **{key: expected[key] for key in ("repo_id", "revision", "license", "license_url", "commercial_use")},
            "files": {name: hashlib.sha256(content).hexdigest() for name, content in files.items()},
        }
        (root / "provenance.json").write_text(json.dumps(provenance), encoding="utf-8")
        return {"schema_version": 1, "models": {"fixture": expected}}

    def test_model_snapshot_requires_pinned_license_and_valid_hashes(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            lock = self.fixture(root)
            self.assertEqual(verify_model_dir(root, "fixture", lock)[0]["license"], "apache-2.0")

    def test_model_snapshot_rejects_tampered_weight(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            lock = self.fixture(root)
            (root / "pytorch_model.bin").write_bytes(b"changed")
            with self.assertRaisesRegex(ValueError, "checksum mismatch"):
                verify_model_dir(root, "fixture", lock)

    def test_pt_requires_approved_es_en_pivot_route(self):
        self.assertEqual(required_model_keys("pt", True), ("es-en", "en-pt"))
        with self.assertRaisesRegex(ValueError, "requires --pivot-model"):
            required_model_keys("pt", False)

    def test_direct_model_routes_reject_unexpected_pivot(self):
        self.assertEqual(required_model_keys("fr", False), ("es-fr",))
        with self.assertRaisesRegex(ValueError, "only valid for the PT-BR"):
            required_model_keys("en", True)

    def test_memory_lock_rejects_concurrent_writer(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "memory.json"
            first = lock_memory(path)
            try:
                with self.assertRaisesRegex(RuntimeError, "already being updated"):
                    lock_memory(path)
            finally:
                first.close()

    def test_memory_save_replaces_file_without_shared_temp_name(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "memory.json"
            save(path, {"a": {"en": "one"}})
            save(path, {"a": {"en": "two"}})
            self.assertEqual(json.loads(path.read_text(encoding="utf-8"))["a"]["en"], "two")


if __name__ == "__main__":
    unittest.main()
