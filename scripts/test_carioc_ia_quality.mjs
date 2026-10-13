import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolveQuestion } from "../assets/js/carioc-ia-engine.js";
import { BOUNCE_URL, bounceMarkup } from "../assets/js/bounce.js";

const recommendations = [
  ["ES", "¿Qué experiencia me recomiendas?", ["imperdibles", "VIP", "trekking", "aventura", "walking tour", "fútbol en vivo"]],
  ["PT", "Qual experiência você recomenda?", ["imperdíveis", "VIP", "trekking", "aventura", "walking tour", "futebol ao vivo"]],
  ["EN", "What experience do you recommend?", ["Rio highlights", "VIP", "trekking", "adventure", "walking tour", "live football"]]
];
for (const [language, question, categories] of recommendations) {
  const intent = resolveQuestion(question).intent;
  assert.equal(intent?.id, "experiences", language + ": recommendation question resolves");
  const answer = intent.answer[language];
  for (const category of categories) assert.ok(answer.toLowerCase().includes(category.toLowerCase()), language + ": answer includes " + category);
  assert.ok(intent.links.some(link => link.href === "/experiencias/partido-maracana/"), language + ": includes live football guide");
  assert.ok(intent.links.some(link => link.href === "/naturaleza/"), language + ": includes trekking guide");
  assert.deepEqual(intent.followups, ["Imperdibles", "VIP", "Trekking", "Aventura", "Walking tour", "Fútbol en vivo"]);
}

for (const [question, category, expected] of [
  ["VIP", "VIP", "experience_vip"], ["trekking", "trekking", "experience_trekking"], ["aventura", "aventura", "experience_adventure"], ["walking tour", "walking tour", "experience_walking"],
  ["fútbol en vivo", "fútbol en vivo", "experience_live_football"], ["futebol ao vivo", "futebol ao vivo", "experience_live_football"], ["live football", "live football", "experience_live_football"], ["imperdibles", "imperdibles", "experience_must_see"]
]) {
  assert.equal(resolveQuestion(question).intent?.id, expected, "category chip " + category + " resolves");
}

const beaches = resolveQuestion("playas").intent;
assert.equal(beaches?.id, "beach_clarify");
assert.match(beaches.answer.ES, /surf|tranquila|familiar/i);
assert.ok(beaches.links.some(link => link.href === "/playas/"));
assert.doesNotMatch(beaches.answer.ES, /No tengo información fiable/);

const luggage = resolveQuestion("Quiero guardar mi maleta").intent;
assert.equal(luggage?.id, "quick_luggage");
assert.ok(luggage.links.some(link => link.href === "/guia/guarda-equipaje/"), "chat sends luggage visitors to our guide");
assert.match(luggage.answer.ES, /barrio|lugar/i);

const luggageSource = readFileSync(new URL("../assets/js/luggage-page.js", import.meta.url), "utf8");
const chatSource = readFileSync(new URL("../assets/js/carioc-ia.js", import.meta.url), "utf8");
const integrationSource = readFileSync(new URL("../assets/js/bounce-integration.js", import.meta.url), "utf8");
const bounceSource = readFileSync(new URL("../assets/js/bounce.js", import.meta.url), "utf8");
assert.match(luggageSource, /import \{BOUNCE_URL/);
assert.match(luggageSource, /data-bounce-source="guia-equipaje-foto-/);
assert.ok(luggageSource.includes("href=\"") && luggageSource.includes("BOUNCE_URL"), "image banner is an affiliate link");
assert.match(luggageSource, /data-bounce-click/);
assert.ok(luggageSource.includes("Consultar guarda equipaje con Bounce"), "ES photo banner uses Spanish copy");
assert.ok(luggageSource.includes("Consultar opciones de guarda equipaje"), "ES photo CTA uses Spanish copy");
for (const photo of ["photo(0)", "photo(1)", "photo(2)"]) assert.ok(luggageSource.includes(photo), "each of the three image banners is rendered and linked: " + photo);
for (const route of ["/hospedaje/", "/guia/aeropuertos/", "/guia/terminales/"]) assert.ok(integrationSource.includes(route), "Bounce integration covers " + route);
assert.equal(BOUNCE_URL, "https://go.bounce.com/ERNESTINHO8980973466");
assert.doesNotMatch(chatSource + luggageSource + integrationSource + bounceSource, /radicalstorage\.com|bounce\.com\/luggage-storage/i, "all luggage journeys stay on our guide and affiliate route");
for (const language of ["ES", "PT", "EN"]) {
  for (const variant of ["vertical", "compact", "wide"]) {
    const markup = bounceMarkup(language, variant, "guia-equipaje");
    assert.ok(markup.includes(BOUNCE_URL), language + " " + variant + ": banner uses the affiliate URL");
    assert.match(markup, /rel="sponsored noopener noreferrer"/);
  }
}

console.log("Carioc-IA quality checks passed: recommendations in ES/PT/EN, beach and luggage intents, affiliate banners.");
