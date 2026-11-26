import argparse
import json
from pathlib import Path

def main():
    p = argparse.ArgumentParser()
    p.add_argument("inventory", type=Path)
    p.add_argument("memory", type=Path)
    a = p.parse_args()
    inventory = json.loads(a.inventory.read_text(encoding="utf-8"))
    memory = json.loads(a.memory.read_text(encoding="utf-8"))
    for page in inventory["pages"]:
        for lang in ("pt", "en", "fr"):
            units = page["units"]
            reviewed = sum(memory.get(k, {}).get(lang, {}).get("status") in {"reviewed_import", "reviewed"} and bool(memory.get(k, {}).get(lang, {}).get("text")) for k in units)
            print(json.dumps({"path": page["path"], "lang": lang, "total": len(units), "reviewed": reviewed, "pending": len(units)-reviewed, "inline_scripts_pending": len(page["inline_scripts_pending"]), "publication_approved": False}, ensure_ascii=False))

if __name__ == "__main__":
    main()
