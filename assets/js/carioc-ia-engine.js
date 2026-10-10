import { INTENTS } from "./carioc-ia-knowledge.js?v=20261010-cariocia2";
import { CURATED_INTENTS, FOLLOWUP_MAPS, INTENT_GUIDANCE } from "./carioc-ia-library.js?v=20261010-cariocia2";

const LEGACY_CATEGORIES = {
  contact: "commercial", booking: "commercial", first_visit: "general", beaches: "beaches", transport: "transport",
  stay: "lodging", family: "family", food: "gastronomy", experiences: "experiences", buzios: "experiences",
  angra: "experiences", arraial: "experiences", neighborhoods: "neighborhoods", weather: "general", today: "events",
  safety: "general", nightlife: "nightlife", shopping: "shopping"
};
const LEGACY_INTENTS = INTENTS.map(intent => ({
  ...intent,
  category: intent.category || LEGACY_CATEGORIES[intent.id] || "general",
  status: "legacy",
  source: intent.links?.map(item => item.href) || []
}));
export const ALL_INTENTS = [...LEGACY_INTENTS, ...CURATED_INTENTS];
export const ACTIVE_INTENTS = ALL_INTENTS.filter(intent => intent.status !== "pending");
const MIN_SCORE = 7.5;
const MENU_PHRASES = ["volver al menu", "volver al inicio", "cambiar de tema", "reiniciar conversacion", "empezar de nuevo", "start over", "back to menu", "change topic", "voltar ao menu", "mudar de assunto", "comecar de novo"];

export function normalizeQuestion(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function phraseMatches(query, phrase) {
  return Boolean(phrase) && (` ${query} `).includes(` ${phrase} `);
}

function isMenuRequest(query) {
  return MENU_PHRASES.some(phrase => phraseMatches(query, normalizeQuestion(phrase)));
}

function scoreIntent(query, intent) {
  let score = 0;
  let matchedPhrase = "";
  let matchedWords = 0;
  for (const rawPhrase of intent.keywords || []) {
    const phrase = normalizeQuestion(rawPhrase);
    // A generic request for a beach should clarify only when the visitor has not
    // already named a preference such as surfing, family, or nature.
    if (["beach_clarify", "beaches"].includes(intent.id) && ["playa", "playas", "praia", "praias", "beach", "beaches"].includes(phrase) && query !== phrase) continue;
    if (intent.id === "experiences" && ["tour", "tours", "cristo"].includes(phrase) && query !== phrase) continue;
    if (intent.id === "neighborhoods" && phrase === "centro" && query !== phrase) continue;
    if (intent.id === "today" && ["hoy", "today", "hoje"].includes(phrase) && query !== phrase) continue;
    if (intent.id === "booking" && ["precio", "precios", "price", "valor", "valores", "disponibilidad", "availability"].includes(phrase)
        && !/\b(cristo|corcovado|angra|arraial|buzios|entrada|ingreso|experiencia|experience|passeio|reserva|booking)\b/.test(query)) continue;
    if (!phraseMatches(query, phrase)) continue;
    const words = phrase.split(" ").length;
    const phraseScore = (words * 7) + Math.min(phrase.length, 48) * 0.12;
    if (phraseScore > score) {
      score = phraseScore;
      matchedPhrase = phrase;
      matchedWords = words;
    }
  }
  if (!score) return null;
  score += Number(intent.priority || 0);

  // A clear contact or booking action should outrank a topic mentioned in the same sentence.
  if (intent.id === "contact" && /\b(whatsapp|contacto|contactar|hablar|falar|contato)\b/.test(query)) score += 42;
  if (intent.id === "booking" && /\b(reservar|reserva|booking|book)\b/.test(query)
      && !/\b(cristo|corcovado|angra|arraial|buzios|experiencia|experience|tour|passeio)\b/.test(query)) score += 38;
  if (intent.category === "comparisons" && /\b(o|versus|vs|or|ou|comparar|compare)\b/.test(query)) score += 12;
  return { intent, score, matchedPhrase, matchedWords };
}

function getContextualMatch(query, context) {
  if (context?.pending !== "beach_style") return null;
  const selected = FOLLOWUP_MAPS.beach_style.find(option =>
    option.keywords.some(keyword => phraseMatches(query, normalizeQuestion(keyword)))
  );
  if (!selected) {
    if (query.split(" ").length <= 3) return { clarification: INTENT_GUIDANCE.clarifyBeach, suggestions: ["Tranquila", "Con surf", "Natural", "Para ir con niños", "Atardecer"] };
    return null;
  }
  return { intent: ACTIVE_INTENTS.find(intent => intent.id === selected.intent), contextUpdate: { pending: null, category: "beaches" } };
}

function ambiguousEntity(query) {
  if (query === "cristo" || query === "cristo redentor" || query === "christ" || query === "christ the redeemer") {
    return {
      clarification: INTENT_GUIDANCE.clarifyChrist,
      suggestions: ["Cómo llegar al Cristo", "Historia del Cristo", "Cristo con niños", "Reservar un tour al Cristo"]
    };
  }
  return null;
}

export function resolveQuestion(question, context = {}) {
  const query = normalizeQuestion(question);
  if (!query) return { intent: null, candidates: [], clarification: null, suggestions: [] };

  if (isMenuRequest(query)) return { intent: ACTIVE_INTENTS.find(intent => intent.id === "menu"), candidates: [], contextUpdate: { pending: null, category: null, booking: null } };

  const contextual = getContextualMatch(query, context);
  if (contextual?.intent) return { ...contextual, candidates: [] };

  const bareEntity = ambiguousEntity(query);
  if (bareEntity) return { ...bareEntity, intent: null, candidates: [] };

  const ranked = ACTIVE_INTENTS
    .map(intent => scoreIntent(query, intent))
    .filter(result => result && result.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    if (contextual?.clarification) return { ...contextual, intent: null, candidates: [] };
    return { intent: null, candidates: [], clarification: null, suggestions: [] };
  }

  const top = ranked[0];
  const second = ranked[1];
  const hasTopicJoiner = /\b(and|y|e|ou|or|versus|vs|comparar|compare)\b/.test(query);
  if (second && hasTopicJoiner && top.intent.category !== second.intent.category && Math.abs(top.score - second.score) < 5) {
    const candidates = ranked.slice(0, 3).map(result => result.intent);
    return {
      intent: null,
      candidates,
      clarification: INTENT_GUIDANCE.ambiguous,
      suggestions: candidates.flatMap(item => item.links || []).slice(0, 4).map(link => link.label)
    };
  }

  return { intent: top.intent, candidates: ranked.slice(0, 3).map(result => result.intent), score: top.score, matchedPhrase: top.matchedPhrase };
}

export function findIntent(question, context = {}) {
  return resolveQuestion(question, context).intent || null;
}

export function getLocalized(value, language) {
  if (typeof value === "string") return value;
  return value?.[language] || value?.ES || "";
}

export function getIntentCount() { return ACTIVE_INTENTS.length; }

export function getQuestionVariantCount() {
  return ACTIVE_INTENTS.reduce((total, intent) => total + (intent.keywords || []).length, 0);
}

export function validateIntentLibrary() {
  const ids = new Set();
  const errors = [];
  for (const intent of ALL_INTENTS) {
    if (!intent.id || ids.has(intent.id)) errors.push(`ID ausente o duplicado: ${intent.id || "(vacío)"}`);
    ids.add(intent.id);
    if (!intent.category) errors.push(`Falta categoría: ${intent.id}`);
    if (!intent.keywords?.length) errors.push(`Faltan variantes de pregunta: ${intent.id}`);
    if (intent.status !== "pending" && !intent.answer) errors.push(`Falta respuesta: ${intent.id}`);
    if (intent.status !== "pending") for (const language of ["ES", "PT", "EN"]) {
      if (!getLocalized(intent.answer, language)) errors.push(`Falta respuesta ${language}: ${intent.id}`);
    }
    for (const item of intent.links || []) {
      if (!item.href?.startsWith("/")) errors.push(`Enlace no interno o incompleto: ${intent.id}`);
      for (const language of ["ES", "PT", "EN"]) {
        if (!getLocalized(item.label, language)) errors.push(`Falta etiqueta ${language}: ${intent.id} → ${item.href}`);
      }
    }
    if (intent.status && !["approved", "legacy", "pending"].includes(intent.status)) errors.push(`Estado editorial inválido: ${intent.id}`);
    if (intent.status === "approved" && !/^\d{4}-\d{2}-\d{2}$/.test(intent.reviewedOn || "")) errors.push(`Falta fecha de revisión ISO: ${intent.id}`);
    if (intent.status === "pending" && !intent.source?.length) errors.push(`Intención pendiente sin fuente de revisión: ${intent.id}`);
    for (const source of intent.source || []) {
      if (!source.startsWith("/")) errors.push(`Fuente interna incompleta: ${intent.id} → ${source}`);
    }
  }
  return errors;
}
