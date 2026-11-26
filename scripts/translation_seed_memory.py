"""Import explicitly reviewed flat ES-to-target JSON dictionaries without overwriting memory."""
import argparse
import hashlib
import json
from pathlib import Path
from translation_offline import save

def main():
    p = argparse.ArgumentParser()
    p.add_argument("dictionary", type=Path)
    p.add_argument("memory", type=Path)
    p.add_argument("--lang", choices=["pt", "en", "fr"], required=True)
    p.add_argument("--reviewed", action="store_true", required=True)
    a = p.parse_args()
    source = json.loads(a.dictionary.read_text(encoding="utf-8"))
    if not isinstance(source, dict) or any(not isinstance(v, str) for v in source.values()):
        p.error("Expected a reviewed flat source-text to translated-text dictionary")
    memory = json.loads(a.memory.read_text(encoding="utf-8")) if a.memory.exists() else {}
    added = conflicts = 0
    for es, target in source.items():
        es, target = es.strip(), target.strip()
        if not es or not target:
            continue
        key = hashlib.sha256(es.encode("utf-8")).hexdigest()
        row = memory.setdefault(key, {})
        if a.lang in row:
            conflicts += int(row[a.lang]["text"] != target)
            continue
        row[a.lang] = {"text": target, "status": "reviewed_import", "source": str(a.dictionary)}
        added += 1
    a.memory.parent.mkdir(parents=True, exist_ok=True)
    save(a.memory, memory)
    print(json.dumps({"added": added, "conflicts_preserved": conflicts, "publication_approved": False}))

if __name__ == "__main__":
    main()
