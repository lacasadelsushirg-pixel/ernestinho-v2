"""Download only pinned, commercially usable Marian snapshots; inference stays offline."""
import argparse
import json
import urllib.request
from pathlib import Path

from translation_model_registry import load_lock, sha256_file


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("destination", type=Path)
    parser.add_argument("--models", nargs="+", choices=["es-en", "es-fr", "en-pt"], default=["es-en", "es-fr", "en-pt"])
    args = parser.parse_args()
    try:
        from huggingface_hub import snapshot_download
    except ImportError as exc:
        parser.error("Install the pinned optional translation dependencies first: " + str(exc))
    lock = load_lock()
    for key in args.models:
        item = lock["models"][key]
        request = urllib.request.Request(
            "https://huggingface.co/api/models/" + item["repo_id"] + "?blobs=true",
            headers={"User-Agent": "Ernestinho-Offline-Translation/1"},
        )
        with urllib.request.urlopen(request, timeout=30) as response:
            metadata = json.load(response)
        license_id = (metadata.get("cardData") or {}).get("license")
        if metadata.get("sha") != item["revision"] or license_id != item["license"]:
            parser.error(f"Upstream revision/license changed for {item['repo_id']}; update the lock only after review")
        filenames = {entry["rfilename"] for entry in metadata.get("siblings", [])}
        expected_files = {"README.md", "config.json", "generation_config.json", "source.spm", "target.spm", "tokenizer_config.json", "vocab.json", *item["weight_files"]}
        if item["target_language"] == "pt":
            expected_files.add("special_tokens_map.json")
        if expected_files - filenames:
            parser.error(f"Pinned model is missing expected artifacts: {sorted(expected_files - filenames)}")
        local = args.destination / key
        snapshot_download(
            repo_id=item["repo_id"], revision=item["revision"], local_dir=str(local),
            allow_patterns=sorted(expected_files), max_workers=4,
        )
        hashes = {}
        for file_path in sorted(local.rglob("*")):
            if not file_path.is_file() or ".cache" in file_path.parts or file_path.name == "provenance.json":
                continue
            hashes[file_path.relative_to(local).as_posix()] = sha256_file(file_path)
        provenance = {field: item[field] for field in ("repo_id", "revision", "license", "license_url", "commercial_use", "attribution")}
        provenance.update({"model_key": key, "files": hashes, "metadata_verified_at": "2026-11-26", "metadata_source": "https://huggingface.co/api/models/" + item["repo_id"]})
        (local / "provenance.json").write_text(json.dumps(provenance, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(json.dumps({"model": key, "repo_id": item["repo_id"], "revision": item["revision"], "license": item["license"], "commercial_use": True, "files_verified": len(hashes), "directory": str(local)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
