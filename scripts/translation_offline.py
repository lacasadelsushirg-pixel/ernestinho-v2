"""Resumable offline translation with pinned local Marian model snapshots.
Generated text stays machine_unreviewed; this script never approves publication.
"""
import argparse
import fcntl
import json
import os
from pathlib import Path

from translation_model_registry import verify_model_dir


MODEL_KEYS = {"en": "es-en", "fr": "es-fr", "pt": "en-pt"}


def required_model_keys(lang, has_pivot):
    if lang not in MODEL_KEYS:
        raise ValueError("Unsupported target language: " + lang)
    if lang == "pt" and not has_pivot:
        raise ValueError("PT-BR requires --pivot-model for the pinned ES→EN→PT route")
    if lang != "pt" and has_pivot:
        raise ValueError("--pivot-model is only valid for the PT-BR pivot route")
    return ("es-en", "en-pt") if lang == "pt" else (MODEL_KEYS[lang],)

def save(path, data):
    tmp = path.with_suffix(path.suffix + f".{os.getpid()}.tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    os.replace(tmp, path)

def lock_memory(path):
    path.parent.mkdir(parents=True, exist_ok=True)
    handle = path.with_suffix(path.suffix + ".lock").open("a", encoding="utf-8")
    try:
        fcntl.flock(handle.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError as exc:
        handle.close()
        raise RuntimeError(f"Translation memory is already being updated: {path}") from exc
    return handle

def main():
    p = argparse.ArgumentParser()
    p.add_argument("inventory", type=Path)
    p.add_argument("memory", type=Path)
    p.add_argument("--lang", required=True, choices=["pt", "en", "fr"])
    p.add_argument("--model", required=True, type=Path)
    p.add_argument("--pivot-model", type=Path, help="Pinned ES→EN model folder; required for PT-BR")
    p.add_argument("--batch", type=int, default=8)
    p.add_argument("--threads", type=int, default=2)
    args = p.parse_args()
    if not args.model.is_dir() or args.batch < 1 or args.threads < 1:
        p.error("Supply an existing local model directory and positive batch/thread counts")
    try:
        model_keys = required_model_keys(args.lang, bool(args.pivot_model))
        target_key = model_keys[-1]
        if args.pivot_model and not args.pivot_model.is_dir():
            raise ValueError("Supply an existing local pivot model directory")
        if args.pivot_model:
            verify_model_dir(args.pivot_model, "es-en")
        target_info, _ = verify_model_dir(args.model, target_key)
    except (ValueError, KeyError, OSError, json.JSONDecodeError) as exc:
        p.error(str(exc))
    os.environ["HF_HUB_OFFLINE"] = "1"
    from transformers import MarianMTModel, MarianTokenizer
    import torch
    torch.set_num_threads(args.threads)
    target_tokenizer = MarianTokenizer.from_pretrained(str(args.model), local_files_only=True)
    target_model = MarianMTModel.from_pretrained(str(args.model), local_files_only=True)
    target_model.eval()
    pivot_tokenizer = pivot_model = None
    if args.pivot_model:
        pivot_tokenizer = MarianTokenizer.from_pretrained(str(args.pivot_model), local_files_only=True)
        pivot_model = MarianMTModel.from_pretrained(str(args.pivot_model), local_files_only=True)
        pivot_model.eval()
    try:
        lock_handle = lock_memory(args.memory)
    except RuntimeError as exc:
        p.error(str(exc))
    memory = json.loads(args.memory.read_text(encoding="utf-8")) if args.memory.exists() else {}
    if not isinstance(memory, dict):
        p.error("Translation memory must be a JSON object")
    units = {}
    inventory = json.loads(args.inventory.read_text(encoding="utf-8"))
    for page in inventory["pages"]:
        units.update(page["units"])
    pending = [(k, v["source"]) for k, v in units.items() if not memory.get(k, {}).get(args.lang)]
    skipped = []
    for start in range(0, len(pending), args.batch):
        batch = []
        for key, source in pending[start:start + args.batch]:
            source_tokenizer = pivot_tokenizer or target_tokenizer
            source_model = pivot_model or target_model
            if len(source_tokenizer.encode(source)) > min(512, source_model.config.max_position_embeddings):
                skipped.append(key)
            else:
                batch.append((key, source))
        if not batch:
            continue
        source_texts = [s for _, s in batch]
        if pivot_model:
            inputs = pivot_tokenizer(source_texts, return_tensors="pt", padding=True, truncation=False)
            with torch.inference_mode():
                pivot_outputs = pivot_model.generate(**inputs, max_new_tokens=512, num_beams=4)
            source_texts = [pivot_tokenizer.decode(tokens, skip_special_tokens=True).strip() for tokens in pivot_outputs]
            valid = [(row, text) for row, text in zip(batch, source_texts) if text and len(target_tokenizer.encode(text)) <= min(512, target_model.config.max_position_embeddings)]
            skipped.extend(row[0] for row, text in zip(batch, source_texts) if not text or len(target_tokenizer.encode(text)) > min(512, target_model.config.max_position_embeddings))
            batch = [row for row, _ in valid]
            source_texts = [text for _, text in valid]
            if not batch:
                continue
        inputs = target_tokenizer(source_texts, return_tensors="pt", padding=True, truncation=False)
        with torch.inference_mode():
            outputs = target_model.generate(**inputs, max_new_tokens=512, num_beams=4)
        for (key, source), tokens in zip(batch, outputs):
            translated = target_tokenizer.decode(tokens, skip_special_tokens=True).strip()
            if translated and translated != source:
                used_models = model_keys
                memory.setdefault(key, {})[args.lang] = {
                    "text": translated,
                    "status": "machine_unreviewed",
                    "models": used_models,
                    "licenses": ["apache-2.0", target_info["license"]] if len(used_models) > 1 else [target_info["license"]],
                    "method": "es-en-pt-pivot" if args.lang == "pt" else "direct",
                }
            else:
                skipped.append(key)
        save(args.memory, memory)
    print(json.dumps({"pages": len(inventory["pages"]), "pending_initial": len(pending), "translated_unreviewed": len(pending) - len(skipped), "unresolved": skipped, "publication_approved": False}))

if __name__ == "__main__":
    main()
