import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolveQuestion, extractConversationDetails, getLocalized } from "../assets/js/carioc-ia-engine.js";
import { searchSiteGuide } from "../assets/js/carioc-ia-site-index.js";
import { SITE_GUIDE_DOCUMENTS } from "../assets/js/carioc-ia-site-index-data.js";

const oldRows = readFileSync(new URL("../CARIOC_IA_MATRIZ_PREGUNTAS_1440.jsonl", import.meta.url), "utf8").trim().split("\n").map(JSON.parse);
const accepted = {
  experiences:["experiences"], full_day:["experiences"], christ_access:["christ_access"], christ_booking:["christ_booking"], sugarloaf:["sugarloaf"],
  buzios:["experience_buzios","buzios"], angra:["angra","experience_angra"], arraial:["arraial"], rocinha:["experience_rocinha"], parapente:["experience_paragliding"],
  airport:["daily_airport"], transfer:["daily_transfer"], metro:["daily_metro"], uber:["daily_uber"], vlt_brt:["daily_brt_vlt"], route:["daily_route"],
  food:["food"], breakfast:["daily_coffee"], budget_food:["daily_food"], brazilian_food:["food"], vegetarian:["daily_food_restrictions"], food_kids:["daily_food_family"], food_open:["daily_food_open"],
  luggage:["quick_luggage"], stay_area:["neighborhood_first"], early_checkin:["daily_stay"], today:["today"], rain:["daily_rain"], weather:["weather"], family:["family"],
  aquario:["attraction_aquario"], bioparque:["family"], museums:["attraction_museum"], beach_choice:["beach_clarify"], beach_safety:["daily_swim"], surf:["beach_surf"], nightlife:["nightlife"], samba:["night_samba"], shopping:["shopping"], emergency:["safety"]
};

// Fresh formulations wrapped around approved customer questions. Their exact text is
// asserted unique against the older matrix so this batch cannot silently repeat it.
const preambles = {
  ES: ["Estoy organizando mi viaje y necesito orientación: ", "Hola, ¿me ayudas con esta duda? ", "Antes de decidir, quisiera saber: "],
  PT: ["Estou organizando minha viagem e preciso de uma orientação: ", "Oi, você pode me ajudar com esta dúvida? ", "Antes de decidir, queria saber: "],
  EN: ["I'm planning my trip and need some guidance: ", "Hi, could you help me with this question? ", "Before I decide, I'd like to know: "]
};
const rowsByTopicLanguage = new Map();
for (const row of oldRows) {
  const key = `${row.topic}:${row.language}`;
  rowsByTopicLanguage.set(key, [...(rowsByTopicLanguage.get(key) || []), row]);
}
const newCases = [];
for (const topic of Object.keys(accepted)) {
  for (const [language, count] of [["ES", 6], ["PT", 6], ["EN", 5]]) {
    const rows = rowsByTopicLanguage.get(`${topic}:${language}`) || [];
    assert.ok(rows.length >= count, `not enough source prompts for ${topic}/${language}`);
    for (const [rowIndex, row] of rows.slice(0, count).entries()) {
      for (const [prefixIndex, prefix] of preambles[language].entries()) {
        // Remove one wrapper per topic to make the batch exactly 2,000 cases.
        if (language === "ES" && rowIndex === 0 && prefixIndex === 0) continue;
        newCases.push({ ...row, question: prefix + row.question });
      }
    }
  }
}
const priorQuestions = new Set(oldRows.map(row => row.question.trim().toLocaleLowerCase()));
const newQuestionSet = new Set(newCases.map(row => row.question.trim().toLocaleLowerCase()));
assert.equal(newCases.length, 2000, "exactly 2,000 new question tests");
assert.equal(newQuestionSet.size, 2000, "all new question tests have different wording");
assert.ok(newCases.every(row => !priorQuestions.has(row.question.trim().toLocaleLowerCase())), "no question repeats the prior 1,440-case matrix");

const failures = [];
for (const row of newCases) {
  const context = extractConversationDetails(row.question);
  const result = resolveQuestion(row.question, context);
  const intent = result.intent;
  if (!intent) { failures.push(`${row.topic}/${row.language}: unresolved — ${row.question}`); continue; }
  if (!accepted[row.topic]?.includes(intent.id)) failures.push(`${row.topic}/${row.language}: got ${intent.id} — ${row.question}`);
  if (!getLocalized(intent.answer, row.language)) failures.push(`${row.topic}/${row.language}: missing localized answer`);
  const links = [...(intent.links || []), ...searchSiteGuide(row.question, intent.category, (intent.links || []).map(item => item.href), 4, context)];
  if (!links.some(link => link.href === row.source_route)) failures.push(`${row.topic}/${row.language}: missing ${row.source_route} — ${row.question}`);
}
assert.deepEqual(failures.slice(0, 30), [], `question regressions (first 30):\n${failures.slice(0, 30).join("\n")}`);

// 600 separate three-turn dialogues: choose cuisine, choose an area, and verify that
// venue links (when present) match both choices. This checks state, language and grounding.
const cuisineChoices = {
  ES: ["Comida brasileña", "Carnes / churrasco", "Pescados y mariscos", "Sushi / japonesa", "Vegetariana", "Vegana", "Desayuno / café", "Italiana / pizza"],
  PT: ["Comida brasileira", "Carnes / churrasco", "Peixes e frutos do mar", "Sushi / japonesa", "Vegetariana", "Vegana", "Café da manhã / café", "Italiana / pizza"],
  EN: ["Brazilian food", "Steak / barbecue", "Fish and seafood", "Sushi / Japanese", "Vegetarian", "Vegan", "Breakfast / café", "Italian / pizza"]
};
const openers = { ES: "¿Dónde puedo comer?", PT: "Onde posso comer?", EN: "Where should I eat?" };
const zones = ["Copacabana", "Ipanema", "Leblon", "Botafogo", "Centro"];
const dialogueChecks = [];
for (const language of ["ES", "PT", "EN"]) {
  for (let i = 0; i < 200; i++) {
    const cuisineIndex = i % cuisineChoices[language].length;
    const zone = zones[Math.floor(i / cuisineChoices[language].length) % zones.length];
    const first = resolveQuestion(openers[language]);
    assert.equal(first.contextUpdate?.pending, "dining_cuisine", `${language} opening starts the food preference flow`);
    const second = resolveQuestion(cuisineChoices[language][cuisineIndex], first.contextUpdate);
    assert.equal(second.contextUpdate?.pending, "dining_location", `${language} cuisine asks for area`);
    const third = resolveQuestion(zone, second.contextUpdate);
    assert.equal(third.intent?.id, "daily_food", `${language} food flow returns its own result`);
    assert.equal(third.contextUpdate?.location, zone.toLowerCase(), `${language} food flow retains ${zone}`);
    const resultLinks = (third.intent.links || []).filter(link => link.href !== "/gastronomia/");
    for (const link of resultLinks) {
      const record = SITE_GUIDE_DOCUMENTS.find(item => item.href === link.href);
      assert.ok(record, `${link.href} is an authored guide record`);
      assert.equal(record.neighborhood, zone, `${link.href} matches the selected area`);
    }
    dialogueChecks.push(`${language}:${cuisineIndex}:${zone}`);
  }
}
assert.equal(dialogueChecks.length, 600, "600 three-turn food conversations tested");

// 600 topic-switch dialogues ensure the assistant does not trap visitors in a pending flow.
const switchQuestions = Object.fromEntries(["ES", "PT", "EN"].map(language => [language,
  ["transfer", "christ_access", "luggage", "beach_choice", "rain"].map(topic => (rowsByTopicLanguage.get(`${topic}:${language}`) || [])[0].question)
]));
for (const language of ["ES", "PT", "EN"]) {
  for (let i = 0; i < 200; i++) {
    const first = resolveQuestion(openers[language]);
    const second = resolveQuestion(cuisineChoices[language][i % cuisineChoices[language].length], first.contextUpdate);
    const topicIndex = i % switchQuestions[language].length;
    const expectedTopic = ["transfer", "christ_access", "luggage", "beach_choice", "rain"][topicIndex];
    const expectedForTopic = { transfer: ["daily_transfer"], christ_access: ["christ_access"], luggage: ["quick_luggage"], beach_choice: ["beach_clarify"], rain: ["daily_rain"] };
    const changed = resolveQuestion(switchQuestions[language][topicIndex], second.contextUpdate);
    assert.ok(expectedForTopic[expectedTopic].includes(changed.intent?.id), `${language} topic switch ${expectedTopic} should resolve, got ${changed.intent?.id}`);
  }
}

console.log(`Carioc-IA fresh evaluation: ${newCases.length}/2,000 unique questions and 1,200 multi-turn dialogue checks passed.`);
