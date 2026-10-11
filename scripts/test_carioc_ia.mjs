import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ACTIVE_INTENTS, ALL_INTENTS, getIntentCount, getQuestionVariantCount, resolveQuestion, recommendGuideLinks, validateIntentLibrary } from "../assets/js/carioc-ia-engine.js";
import { buildWhatsAppHref, WHATSAPP_BASE } from "../assets/js/carioc-ia-whatsapp.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const legacyBeachAlias = new Map([["beaches", "beach_clarify"]]);
const cases = ACTIVE_INTENTS.map(intent => ({
  question: intent.keywords[0],
  expected: legacyBeachAlias.get(intent.id) || intent.id,
  label: `intención ${intent.id}`
}));

const additionalCases = [
  ["Which beaches do you recommend", "beach_clarify"],
  ["Como me locomovo pelo Rio", "transport"],
  ["Búzios tour", "experience_buzios"],
  ["passeio para Angra", "experience_angra"],
  ["How to reach Joatinga", "beach_access"],
  ["Sugarloaf", "sugarloaf"],
  ["Cristo vs Sugarloaf", "compare_christ_sugarloaf"],
  ["accept cards", "commercial_unknown"],
  ["Que tiempo hará 10/11?", "weather"],
  ["traveling with kids", "experience_family"],
  ["What should I do today?", "today"],
  ["forecast tomorrow", "weather"],
  ["reservar un tour al Cristo", "christ_booking"],
  ["quiero volver al menú", "menu"],
  ["beach family", "beach_family"],
  ["quiet beach", "beach_quiet"],
  ["surfing in Rio", "beach_surf"],
  ["praia natural", "beach_nature"],
  ["por do sol na praia", "beach_sunset"],
  ["beach with kiosks", "beach_kiosks"],
  ["where to eat feijoada in Copacabana", "food_feijoada"],
  ["restaurant with a view", "food_view"],
  ["breakfast in Ipanema", "food_breakfast"],
  ["where to eat near Sugarloaf", "food_near_sugarloaf"],
  ["where to hear samba", "night_samba"],
  ["live music in Rio", "night_live"],
  ["rooftop bar in Rio", "night_rooftop"],
  ["bar tranquilo para conversar", "night_quiet"],
  ["noite animada", "night_active"],
  ["Copacabana or Ipanema", "compare_copa_ipanema"],
  ["Centro versus Santa Teresa", "compare_centro_santa"],
  ["Angra ou Arraial", "compare_angra_arraial"],
  ["Búzios or Arraial", "compare_buzios_arraial"],
  ["Quais praias você recomenda?", "beach_clarify"],
  ["how do I get around Rio", "transport"],
  ["Quiero visitar el Cristo", "christ_access"],
  ["Quiero reservar el Cristo", "christ_booking"],
  ["¿Quién construyó el Cristo?", "christ_history"],
  ["¿Qué puedo visitar cerca del Cristo?", "christ_nearby"],
  ["¿Cristo o Pan de Azúcar?", "compare_christ_sugarloaf"],
  ["precio hoy en el centro para un tour", null],
  ["What is the price today for a tour in downtown Rio?", null]
];
for (const [question, expected] of additionalCases) cases.push({ question, expected, label: "variante adicional" });

assert.ok(cases.length >= 100, `La matriz debe contener al menos 100 preguntas; contiene ${cases.length}.`);
assert.equal(ACTIVE_INTENTS.filter(intent => intent.status === "pending").length, 0, "Las intenciones pendientes nunca deben activarse.");
let failures = 0;
for (const test of cases) {
  const actual = resolveQuestion(test.question).intent?.id || null;
  try {
    assert.equal(actual, test.expected, `${test.label}: ${test.question}`);
  } catch (error) {
    failures += 1;
    console.error(error.message);
  }
}

const libraryErrors = validateIntentLibrary();
if (libraryErrors.length) {
  failures += libraryErrors.length;
  libraryErrors.forEach(error => console.error(`Biblioteca: ${error}`));
}

const referencedRoutes = ALL_INTENTS.flatMap(intent => [
  ...(intent.links || []).map(link => link.href),
  ...(intent.source || [])
]);
const missingRoutes = [...new Set(referencedRoutes)]
  .filter(href => href.startsWith("/"))
  .filter(href => {
    const pathname = href.split(/[?#]/, 1)[0];
    const localPath = path.join(repoRoot, pathname === "/" ? "index.html" : `${pathname.replace(/^\//, "").replace(/\/$/, "")}/index.html`);
    return !existsSync(localPath);
  });
if (missingRoutes.length) {
  failures += missingRoutes.length;
  missingRoutes.forEach(route => console.error(`Ruta interna inexistente: ${route}`));
}

const bareChrist = resolveQuestion("Cristo");
assert.equal(bareChrist.intent, null, "Cristo sin contexto debe pedir precisión.");
assert.ok(bareChrist.clarification, "Debe ofrecer una pregunta aclaratoria sobre Cristo.");
assert.equal(resolveQuestion("Surf", { pending: "beach_style" }).intent?.id, "beach_surf", "Debe resolver la respuesta contextual del tipo de playa.");
assert.equal(resolveQuestion("tranquila", { pending: "beach_style" }).intent?.id, "beach_quiet", "Debe resolver la preferencia tranquila.");
assert.equal(resolveQuestion("¿Dónde queda AquaRio?", { pending: "beach_style" }).intent?.id, "attraction_aquario", "Una pregunta completa debe superar el contexto de seguimiento.");
assert.equal(resolveQuestion("precio del dólar hoy").intent, null, "Una pregunta ajena debe quedar sin respuesta inventada.");

for (const [language, expectedLabels] of [["ES", ["Experiencia:", "Fecha:", "Personas:"]], ["PT", ["Experiência:", "Data:", "Pessoas:"]], ["EN", ["Experience:", "Date:", "People:"]]]) {
  const href = buildWhatsAppHref({ language, baseMessage: "Hola", experience: "Angra + Ilha Grande", date: "24/10", people: "4" });
  const parsed = new URL(href);
  assert.equal(parsed.origin + parsed.pathname, WHATSAPP_BASE, `El destino de WhatsApp debe conservarse (${language}).`);
  const message = parsed.searchParams.get("text");
  for (const label of expectedLabels) assert.ok(message.includes(label), `Falta la etiqueta ${label} (${language}).`);
}
const newWelcomeCases = [
  ["Quiero conocer los tours", "experiences"], ["Busco dónde hospedarme", "stay"],
  ["¿Dónde puedo guardar mi maleta?", "quick_luggage"], ["Necesito un traslado", "daily_transfer"],
  ["¿Qué hacer en familia?", "family"], ["¿Cómo me muevo por Río?", "transport"],
  ["¿Dónde puedo comer?", "daily_food"], ["¿Qué puedo hacer hoy?", "today"],
  ["Onde posso guardar minha mala?", "quick_luggage"],
  ["Where can I store my luggage?", "quick_luggage"]
];
for (const [question, expected] of newWelcomeCases) {
  assert.equal(resolveQuestion(question).intent?.id, expected, "Chip V2: " + question);
}
const luggageStart = resolveQuestion("¿Dónde puedo guardar mi maleta?");
assert.equal(luggageStart.contextUpdate?.pending, "location", "Equipaje debe solicitar zona y conservar contexto.");
const luggageNext = resolveQuestion("Copacabana", luggageStart.contextUpdate);
assert.equal(luggageNext.intent?.id, "quick_luggage_followup", "Equipaje debe comprender barrio como seguimiento.");
assert.ok(luggageNext.intent.answer.ES.includes("Copacabana"), "Seguimiento debe conservar el barrio.");

const luggageTime = resolveQuestion("hasta las 20", luggageNext.contextUpdate);
assert.equal(luggageTime.intent?.id, "quick_luggage_followup", "La consigna debe entender la hora de retiro.");
assert.ok(luggageTime.intent?.answer?.ES?.includes("20:00"), "Debe conservar la hora indicada.");
const foodWelcome = resolveQuestion("¿Dónde puedo comer?");
const foodCombined = resolveQuestion("Copacabana, algo económico", foodWelcome.contextUpdate);
assert.ok(foodCombined.intent?.answer?.ES?.includes("Copacabana"), "Debe detectar barrio en una respuesta mixta.");
assert.ok(foodCombined.intent?.answer?.ES?.includes("presupuesto"), "Debe detectar preferencia económica.");
const foodGuide = resolveQuestion("¿Dónde puedo comer?").intent;
const supplementaryFood = recommendGuideLinks(foodGuide, "desayuno barato", 3);
assert.ok(supplementaryFood.length <= 3, "Las recomendaciones complementarias tienen un máximo de 3 enlaces.");
assert.equal(new Set(supplementaryFood.map(link => link.href)).size, supplementaryFood.length, "No debe repetir páginas.");
assert.ok(supplementaryFood.every(link => link.href.startsWith("/") && !link.href.startsWith("//")), "Solo rutas internas revisables.");
assert.deepEqual(recommendGuideLinks(null, "comer"), [], "No debe recomendar enlaces sin intención.");
const bareWhatsApp = new URL(buildWhatsAppHref({ language: "EN", baseMessage: "Hello" }));
assert.equal(bareWhatsApp.searchParams.get("text"), "Hello", "WhatsApp debe estar disponible sin pedir datos opcionales.");
assert.equal(resolveQuestion("precio hoy en el centro para un tour").intent, null, "Palabras frecuentes no deben forzar una respuesta comercial.");
assert.equal(resolveQuestion("What is the price today for a tour in downtown Rio?").intent, null, "Today's price without a specific product must fall back.");

if (failures) process.exitCode = 1;
else console.log(`OK: ${cases.length} preguntas; ${getIntentCount()} intenciones; ${getQuestionVariantCount()} variantes; esquema, rutas y contexto correctos.`);
