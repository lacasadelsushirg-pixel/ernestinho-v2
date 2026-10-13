import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ACTIVE_INTENTS, ALL_INTENTS, extractConversationDetails, getContextualIntentAnswer, getIntentCount, getQuestionVariantCount, resolveQuestion, recommendGuideLinks, validateIntentLibrary } from "../assets/js/carioc-ia-engine.js";
import { buildWhatsAppHref, WHATSAPP_BASE } from "../assets/js/carioc-ia-whatsapp.js";
import { SITE_GUIDE_INDEX, searchSiteGuide } from "../assets/js/carioc-ia-site-index.js";
import { SITE_GUIDE_DOCUMENTS } from "../assets/js/carioc-ia-site-index-data.js";

import { UI } from "../assets/js/carioc-ia-knowledge.js";

const expectedWelcomeIntents = ["experiences", "daily_transfer", "daily_food", "quick_luggage", "transport"];
for (const language of ["ES", "PT", "EN"]) {
  assert.equal(UI[language].suggestions.length, 5, `${language}: exactly five initial questions`);
  UI[language].suggestions.forEach((question, index) => assert.equal(resolveQuestion(question).intent?.id, expectedWelcomeIntents[index], `${language}: ${question}`));
}

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const widgetSource = readFileSync(path.join(repoRoot, "assets/js/carioc-ia.js"), "utf8");
assert.match(widgetSource, /import\s*\{[^}]*\bgetContextualIntentAnswer\b[^}]*\}\s*from\s*["']\.\/carioc-ia-engine\.js/);
const detailCases = extractConversationDetails("Somos cuatro en Copacabana, barato, con niños, el martes a las 18:00 y en metro");
assert.equal(detailCases.location, "copacabana");
assert.equal(detailCases.budget, "budget");
assert.equal(detailCases.profile, "family");
assert.equal(detailCases.partySize, "4");
assert.equal(detailCases.weekday, "tuesday");
assert.equal(detailCases.time, "18:00");
assert.equal(detailCases.transport, "public");
const breakfastIntent = resolveQuestion("¿Hay desayuno barato en Copacabana?").intent;
const contextualFoodAnswer = getContextualIntentAnswer(breakfastIntent, { location: "copacabana" }, "ES");
assert.match(contextualFoodAnswer, /Copacabana/);
assert.doesNotMatch(contextualFoodAnswer, /¿En qué barrio/);
const spokenBreakfast = resolveQuestion("¿Dónde puedo desayunar en Copacabana?").intent;
assert.equal(spokenBreakfast?.id, "daily_coffee");
assert.equal(extractConversationDetails("¿Dónde puedo desayunar en Copacabana?").meal, "breakfast");
const todayIntent = resolveQuestion("¿Qué puedo hacer hoy?").intent;
const breakfastAfterToday = resolveQuestion("¿Dónde puedo desayunar en Copacabana?", {
  lastIntentId: todayIntent?.id,
  category: todayIntent?.category
}).intent;
assert.equal(breakfastAfterToday?.id, "daily_coffee");
const contextualCoffeeAnswer = getContextualIntentAnswer(breakfastAfterToday, { location: "copacabana" }, "ES");
assert.match(contextualCoffeeAnswer, /En Copacabana/);
assert.doesNotMatch(contextualCoffeeAnswer, /¿En qué barrio/);
const rainIntent = resolveQuestion("¿Qué puedo hacer si llueve en Río?").intent;
assert.equal(rainIntent?.id, "daily_rain");
const rainAfterChrist = resolveQuestion("¿Qué puedo hacer si llueve en Río?", {
  lastIntentId: "christ_access",
  category: "attractions",
  location: "copacabana"
}).intent;
assert.equal(rainAfterChrist?.id, "daily_rain");
assert.equal(rainAfterChrist?.links?.[0]?.href, "/consejos/lluvia/");
const contextualRainAnswer = getContextualIntentAnswer(rainAfterChrist, { location: "copacabana" }, "ES");
assert.match(contextualRainAnswer, /llueve en Copacabana/);
assert.doesNotMatch(contextualRainAnswer, /¿En qué barrio estás/);
const contextualLuggageAnswer = getContextualIntentAnswer(resolveQuestion("Where can I store my luggage in Copacabana?").intent, { location: "copacabana" }, "EN");
assert.match(contextualLuggageAnswer, /near Copacabana/);
assert.doesNotMatch(contextualLuggageAnswer, /Which neighborhood/);
const contextualFamilyAnswer = getContextualIntentAnswer(resolveQuestion("Where can we eat with kids in Ipanema?").intent, { location: "ipanema" }, "EN");
assert.match(contextualFamilyAnswer, /Ipanema/);
assert.doesNotMatch(contextualFamilyAnswer, /What neighborhood are you in/);
for (const [question, expected] of [["Como chegar ao Cristo Redentor", "christ_access"], ["How to reach Christ the Redeemer", "christ_access"], ["Cómo llego al Cristo Redentor", "christ_access"]]) assert.equal(resolveQuestion(question).intent?.id, expected);
for (const question of ["Quiero un restaurante en Copacabana", "Quero um restaurante em Copacabana", "Find a restaurant in Copacabana"]) assert.equal(resolveQuestion(question).intent?.category, "gastronomy", `restaurant request should route to gastronomy: ${question}`);
const compositionalCases = [
  ["¿Qué puedo hacer hoy con niños en Copacabana?", "family"],
  ["O que fazer hoje com crianças em Copacabana?", "family"],
  ["What can I do today with kids in Copacabana?", "family"],
  ["¿Hay desayuno barato en Copacabana?", "daily_food"],
  ["Onde posso guardar minha mala em Copacabana?", "quick_luggage"],
  ["Where can I store my luggage in Copacabana?", "quick_luggage"],
  ["Can I book Christ today?", "christ_booking"],
  ["¿Cómo llego al Cristo desde Copacabana?", "christ_access"],
  ["Como chego ao Cristo saindo de Copacabana?", "christ_access"],
  ["How can I reach Christ the Redeemer from Copacabana?", "christ_access"],
  ["Where can we eat with kids in Ipanema?", "daily_food_family"],
  ["Somos cuatro y queremos ir a Angra", "experience_angra"],
  ["We are four and want to go to Angra", "experience_angra"],
  ["Somos quatro e queremos ir para Angra", "experience_angra"]
];
for (const [question, expected] of compositionalCases) {
  assert.equal(resolveQuestion(question).intent?.id, expected, "composite request should preserve its primary intent: " + question);
}

const firstAngra = resolveQuestion("Quiero ir a Angra");
const partyRefinement = resolveQuestion("Somos cuatro personas", { ...firstAngra.contextUpdate, lastIntentId: firstAngra.intent.id });
const dayRefinement = resolveQuestion("el martes", { ...partyRefinement.contextUpdate, lastIntentId: firstAngra.intent.id });
assert.equal(partyRefinement.intent?.id, firstAngra.intent.id, "retiene la experiencia al indicar el grupo");
assert.equal(dayRefinement.intent?.id, firstAngra.intent.id, "retiene la experiencia al indicar el día");
assert.equal(dayRefinement.contextUpdate?.partySize, "4");
assert.equal(dayRefinement.contextUpdate?.weekday, "tuesday");
assert.equal(dayRefinement.contextUpdate?.detailRefinement, true);
const angraWhatsApp = new URL(buildWhatsAppHref({ language: "EN", experience: "Angra + Ilha Grande", date: "Tuesday", people: "4" }));
for (const detail of ["Angra", "Tuesday", "4"]) assert.ok(decodeURIComponent(angraWhatsApp.searchParams.get("text")).includes(detail), "WhatsApp retains " + detail);
assert.equal(SITE_GUIDE_INDEX.length, 505, "el índice cubre las 505 rutas verificadas");
assert.equal(SITE_GUIDE_DOCUMENTS.length, SITE_GUIDE_INDEX.length, "cada ruta tiene una ficha de guía");
assert.equal(new Set(SITE_GUIDE_DOCUMENTS.map(item => item.href)).size, SITE_GUIDE_DOCUMENTS.length, "no hay rutas duplicadas");
for (const item of SITE_GUIDE_DOCUMENTS) {
  assert.ok(item.title.trim(), "cada ficha tiene título: " + item.href);
  assert.ok(item.summary.trim(), "cada ficha tiene resumen: " + item.href);
  assert.ok(existsSync(path.join(repoRoot, item.href, "index.html")), "cada recomendación apunta a una página fuente: " + item.href);
}
const barraGuide = SITE_GUIDE_DOCUMENTS.find(item => item.href === "/barrios/barra-da-tijuca/");
assert.equal(barraGuide?.neighborhood, "Barra da Tijuca", "el barrio viene de la página, no del menú compartido");
const copacabanaFood = searchSiteGuide("restaurant Copacabana", "gastronomy", [], 4, { location: "copacabana" });
assert.ok(copacabanaFood.length > 0, "hay fichas gastronómicas de Copacabana");
assert.ok(copacabanaFood.every(item => item.href.startsWith("/gastronomia/") && item.neighborhood === "Copacabana"), "las recomendaciones respetan categoría y barrio");
assert.ok(searchSiteGuide("restaurant Copacabana", "beaches", [], 4).every(item => item.href.startsWith("/playas/")), "mantiene la categoría solicitada");
assert.equal(searchSiteGuide("restaurant Copacabana", "gastronomy", [], 4, { budget: "budget" }).length, 0, "no inventa coincidencias de precio");
assert.equal(searchSiteGuide("breakfast Copacabana", "gastronomy", [], 4, { location: "copacabana" }).length, 0, "no convierte el filtro de barrio en una coincidencia de desayuno");

const legacyBeachAlias = new Map([["beaches", "beach_clarify"], ["food", "daily_food"]]);
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
assert.deepEqual(recommendGuideLinks(foodGuide, "zzzyyxx-unrelated", 3), [], "No recomendar fichas sin relación temática explícita.");
assert.deepEqual(recommendGuideLinks(foodGuide, "desayuno barato", 0), [], "No recomendar si no hay espacio para enlaces extra.");
const expectedIndexedCategories = {"barrios":36,"cultura":130,"experiencias":25,"familia":24,"gastronomia":188,"hospedaje":14,"playas":27,"transportes":12,"vida-nocturna":49};
const actualIndexedCategories = Object.fromEntries(Object.keys(expectedIndexedCategories).map(category => [category, SITE_GUIDE_INDEX.filter(record => record[1] === category).length]));
assert.deepEqual(actualIndexedCategories, expectedIndexedCategories, "Recuento por categoría del índice turístico.");
assert.equal(SITE_GUIDE_INDEX.length, 505, "El índice turístico debe tener los registros de fichas reales esperados.");
assert.equal(new Set(SITE_GUIDE_INDEX.map(record => record[0])).size, SITE_GUIDE_INDEX.length, "Rutas indexadas únicas.");
assert.ok(SITE_GUIDE_INDEX.every(record => record[0].startsWith("/") && record[0].endsWith("/") && !record[0].includes("//")), "Rutas seguras del índice.");
const siteFood = searchSiteGuide("restaurante en copacabana", "gastronomy", [], 3);
assert.ok(siteFood.length <= 3, "Máximo tres resultados indexados.");
assert.deepEqual(searchSiteGuide("zzzyyxx", "gastronomy"), [], "Sin coincidencia, no inventar restaurantes.");
assert.deepEqual(searchSiteGuide("copacabana", "commercial"), [], "No usar fichas para cotizaciones.");
const reviewedAliasSamples = [
  ["¿Hay paseos culturales para mañana?", "experiences"],
  ["Un departamento para cinco personas", "stay"],
  ["Necesito consigna después del check-out", "quick_luggage"],
  ["I need a private pickup at Galeão", "daily_transfer"],
  ["We need stroller-friendly activities", "family"],
  ["Como uso o VLT no Centro?", "daily_brt_vlt"],
  ["I want Brazilian food without seafood", "daily_food_restrictions"],
  ["What is there to do near me right now?", "today"]
];
for (const [question, expected] of reviewedAliasSamples) {
  assert.equal(resolveQuestion(question).intent?.id, expected, "V2 reviewed variant: " + question);
}
const bareWhatsApp = new URL(buildWhatsAppHref({ language: "EN", baseMessage: "Hello" }));
assert.equal(bareWhatsApp.searchParams.get("text"), "Hello", "WhatsApp debe estar disponible sin pedir datos opcionales.");
assert.equal(resolveQuestion("precio hoy en el centro para un tour").intent, null, "Palabras frecuentes no deben forzar una respuesta comercial.");
assert.equal(resolveQuestion("What is the price today for a tour in downtown Rio?").intent, null, "Today's price without a specific product must fall back.");

if (failures) process.exitCode = 1;
else console.log(`OK: ${cases.length} preguntas; ${getIntentCount()} intenciones; ${getQuestionVariantCount()} variantes; esquema, rutas y contexto correctos.`);
