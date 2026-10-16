import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { extractConversationDetails, getContextualIntentAnswer, recommendGuideLinks, resolveQuestion } from "../assets/js/carioc-ia-engine.js";
import { searchSiteGuide } from "../assets/js/carioc-ia-site-index.js";

const rows = readFileSync(new URL("../CARIOC_IA_MATRIZ_PREGUNTAS_1440.jsonl", import.meta.url), "utf8").trim().split("\n").map(JSON.parse);
assert.equal(rows.length, 1440, "matrix has 1,440 cases");
assert.equal(new Set(rows.map(row => row.id)).size, 1440, "matrix IDs are unique");
for (const lang of ["ES", "PT", "EN"]) assert.equal(rows.filter(row => row.language === lang).length, 480, `${lang} has 480 cases`);

// Freeze acceptable engine intent IDs by topic. A topic may intentionally have two equivalent legacy IDs.
const accepted = {
  experiences:["experiences"], full_day:["experiences"], christ_access:["christ_access"], christ_booking:["christ_booking"], sugarloaf:["sugarloaf"],
  buzios:["experience_buzios","buzios"], angra:["angra","experience_angra"], arraial:["arraial"], rocinha:["experience_rocinha"], parapente:["experience_paragliding"],
  airport:["daily_airport"], transfer:["daily_transfer"], metro:["daily_metro"], uber:["daily_uber"], vlt_brt:["daily_brt_vlt"], route:["daily_route"],
  food:["food"], breakfast:["daily_coffee"], budget_food:["daily_food"], brazilian_food:["food"], vegetarian:["daily_food_restrictions"], food_kids:["daily_food_family"], food_open:["daily_food_open"],
  luggage:["quick_luggage"], stay_area:["neighborhood_first"], early_checkin:["daily_stay"], today:["today"], rain:["daily_rain"], weather:["weather"], family:["family"],
  aquario:["attraction_aquario"], bioparque:["family"], museums:["attraction_museum"], beach_choice:["beach_clarify"], beach_safety:["daily_swim"], surf:["beach_surf"], nightlife:["nightlife","night_active"], samba:["night_samba"], shopping:["shopping"], emergency:["safety"]
};
const contextOf = row => extractConversationDetails(row.context_detail || "");
const failures = [];
for (const row of rows) {
  const context = contextOf(row);
  const result = resolveQuestion(row.question, context);
  const intent = result.intent;
  if (!intent) { failures.push(`${row.id}: unresolved`); continue; }
  if (!accepted[row.topic]?.includes(intent.id)) failures.push(`${row.id}: ${intent.id} not accepted for ${row.topic}`);
  if (!intent.answer?.[row.language]) failures.push(`${row.id}: no ${row.language} answer`);
  const links = [...(intent.links || []), ...searchSiteGuide(row.question, intent.category, (intent.links || []).map(link => link.href), 5, context), ...recommendGuideLinks(intent, row.question, 3, context)];
  if (!links.some(link => link.href === row.source_route)) failures.push(`${row.id}: route ${row.source_route} missing`);
  // A supplied neighborhood should survive extraction and must be used by contextual replies.
  if (/copacabana/i.test(row.context_detail || "") && context.location !== "copacabana") failures.push(`${row.id}: lost Copacabana context`);
  if (/ipanema/i.test(row.context_detail || "") && context.location !== "ipanema") failures.push(`${row.id}: lost Ipanema context`);
  if (/central rio|downtown rio|rio center|rio centre/i.test(row.context_detail || "") && context.location !== "centro") failures.push(`${row.id}: lost central Rio context`);
  if (/niño|criança|child|kids/i.test(row.context_detail || "") && context.profile !== "family") failures.push(`${row.id}: lost family context`);
  if (/dos adultos|two adults|dois adultos/i.test(row.context_detail || "") && context.partySize !== "3") failures.push(`${row.id}: expected party size 3, got ${context.partySize}`);
  if (/econ[oó]mic|budget|cheap|barato/i.test(row.context_detail || "") && context.budget !== "budget") failures.push(`${row.id}: lost budget context`);
  if (/evitar caminatas largas|evitar caminhadas longas|avoid long walks/i.test(row.context_detail || "") && context.mobility !== "avoid_long_walks") failures.push(`${row.id}: lost mobility context`);
  if (/solo tengo unas horas|so tenho algumas horas|only have a few hours/i.test(row.context_detail || "") && context.duration !== "few_hours") failures.push(`${row.id}: lost duration context`);
}
assert.deepEqual(failures.slice(0, 30), [], `matrix regressions (first failures):\n${failures.slice(0, 30).join("\n")}`);

const swim = resolveQuestion("¿Es seguro bañarse hoy en las playas de Río?").intent;
assert.equal(swim?.id, "daily_swim", "beach swimming question stays out of generic safety routing");
assert.equal(extractConversationDetails("I only have a few hours in central Rio and want to avoid long walks.").profile, undefined, "few-hours phrase is not mistaken for solo travel");
const family = extractConversationDetails("I am in central Rio. We are two adults with a young child.");
assert.equal(family.location, "centro"); assert.equal(family.profile, "family"); assert.equal(family.partySize, "3");
const answer = getContextualIntentAnswer(resolveQuestion("¿Dónde puedo desayunar en Copacabana?").intent, { location: "copacabana" }, "ES");
assert.match(answer, /Copacabana/);
for (const [breakfast, luggage] of [
  ["¿Dónde puedo desayunar en Copacabana?", "Llego temprano a Copacabana y no puedo hacer check-in todavía. ¿Dónde dejo las maletas?"],
  ["Onde posso tomar café da manhã em Copacabana?", "Chego cedo e ainda não posso fazer check-in. Onde deixo as malas?"],
  ["Where can I get breakfast in Copacabana?", "I arrive early and cannot check in yet. Where can I leave my bags?"]
]) {
  const first = resolveQuestion(breakfast);
  const previous = { ...extractConversationDetails(breakfast), ...first.contextUpdate, lastIntentId: first.intent?.id };
  assert.equal(first.intent?.id, "daily_coffee");
  assert.equal(resolveQuestion(luggage, previous).intent?.id, "quick_luggage", `new luggage topic must interrupt breakfast follow-up: ${luggage}`);
}
for (const [breakfast, airport] of [
  ["¿Dónde puedo desayunar en Copacabana?", "Aterrizo en Galeão y necesito llegar a Copacabana, ¿qué opciones tengo?"],
  ["Onde posso tomar café da manhã em Copacabana?", "Cheguei ao Galeão e preciso ir para Copacabana. Como faço?"],
  ["Where can I get breakfast in Copacabana?", "I land at Galeão and need to get to Copacabana. What are my options?"]
]) {
  const first = resolveQuestion(breakfast);
  const previous = { ...extractConversationDetails(breakfast), ...first.contextUpdate, lastIntentId: first.intent?.id };
  assert.equal(resolveQuestion(airport, previous).intent?.id, "daily_airport", `airport question must interrupt breakfast follow-up: ${airport}`);
}
assert.equal(resolveQuestion("Copacabana", { pending: "location", category: "gastronomy", lastEverydayId: "daily_coffee" }).intent?.id, "daily_coffee_followup", "a short location reply still completes the current follow-up");
for (const [question, language] of [
  ["¿Qué hacer con niños en Río?", "ES"],
  ["O que fazer com crianças no Rio?", "PT"],
  ["What can we do with kids in Rio?", "EN"]
]) {
  const result = resolveQuestion(question);
  assert.equal(result.intent?.id, "family", "family planning stays in the family guide: " + question);
  assert.ok(result.intent?.links?.some(link => link.href === "/familia/"), "family guide link is present: " + question);
}
for (const [question, language] of [
  ["¿Dónde puedo desayunar en Copacabana?", "ES"],
  ["Quero tomar café da manhã em Copacabana", "PT"],
  ["I want breakfast in Copacabana", "EN"]
]) {
  const result = resolveQuestion(question);
  assert.equal(result.intent?.id, "daily_coffee", "breakfast question is recognized: " + question);
  assert.equal(result.contextUpdate?.location, "copacabana", "provided neighborhood is retained: " + question);
  const answer = getContextualIntentAnswer(result.intent, result.contextUpdate, language);
  assert.match(answer, /Copacabana/i);
  assert.doesNotMatch(answer, /¿En qué barrio|Em qual bairro|Which neighborhood/i, "do not ask for the neighborhood twice: " + question);
}
console.log(`Carioc-IA customer matrix: ${rows.length}/${rows.length} cases passed; 480 per language.`);
