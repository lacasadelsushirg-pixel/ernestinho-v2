"""Translate inventory units with explicitly supplied local Marian models.
Requires torch, transformers, sentencepiece. No network or paid API at runtime.
Verify model licenses before supplying model directories.
"""
import argparse
import json
import os
from pathlib import Path

def save(path, data):
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    os.replace(tmp, path)

def main():
    p = argparse.ArgumentParser()
    p.add_argument("inventory", type=Path)
    p.add_argument("memory", type=Path)
    p.add_argument("--lang", required=True, choices=["pt", "en", "fr"])
    p.add_argument("--model", required=True, type=Path)
    p.add_argument("--batch", type=int, default=8)
    args = p.parse_args()
    if not args.model.is_dir() or args.batch < 1:
        p.error("Supply an existing local model directory and positive batch size")
    os.environ["HF_HUB_OFFLINE"] = "1"
    from transformers import MarianMTModel, MarianTokenizer
    import torch
    tokenizer = MarianTokenizer.from_pretrained(str(args.model), local_files_only=True)
    model = MarianMTModel.from_pretrained(str(args.model), local_files_only=True)
    model.eval()
    memory = json.loads(args.memory.read_text(encoding="utf-8")) if args.memory.exists() else {}
    units = {}
    for page in json.loads(args.inventory.read_text(encoding="utf-8"))["pages"]:
        units.update(page["units"])
    pending = [(k, v["source"]) for k, v in units.items() if not memory.get(k, {}).get(args.lang)]
    args.memory.parent.mkdir(parents=True, exist_ok=True)
    skipped = []
    for start in range(0, len(pending), args.batch):
        batch = []
        for key, source in pending[start:start + args.batch]:
            if len(tokenizer.encode(source)) > min(512, model.config.max_position_embeddings):
                skipped.append(key)
            else:
                batch.append((key, source))
        if not batch:
            continue
        inputs = tokenizer([s for _, s in batch], return_tensors="pt", padding=True, truncation=False)
        with torch.inference_mode():
            outputs = model.generate(**inputs, max_new_tokens=512, num_beams=4)
        for (key, source), tokens in zip(batch, outputs):
            translated = tokenizer.decode(tokens, skip_special_tokens=True).strip()
            if translated and translated != source:
                memory.setdefault(key, {})[args.lang] = {"text": translated, "status": "machine_unreviewed", "model": args.model.name}
            else:
                skipped.append(key)
        save(args.memory, memory)
    print(json.dumps({"pending_initial": len(pending), "unresolved": skipped, "publication_approved": False}))

if __name__ == "__main__":
    main()
