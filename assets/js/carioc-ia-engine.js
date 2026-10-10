import { INTENTS } from "./carioc-ia-knowledge.js";

export function normalizeQuestion(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s+]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function findIntent(question) {
  const query = normalizeQuestion(question);
  if (!query) return null;
  let best = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    for (const keyword of intent.keywords) {
      const phrase = normalizeQuestion(keyword);
      if (!phrase || !query.includes(phrase)) continue;
      const words = phrase.split(" ").length;
      const score = phrase.length + (words * 0.35);
      if (score > bestScore) {
        best = intent;
        bestScore = score;
      }
    }
  }
  return best;
}

export function getLocalized(value, language) {
  if (typeof value === "string") return value;
  return value?.[language] || value?.ES || "";
}
