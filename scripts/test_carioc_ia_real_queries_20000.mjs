import assert from 'node:assert/strict';
import { resolveQuestion } from '../assets/js/carioc-ia-engine.js';

// 20,000 visitor-style variants, systematically varied across common wording,
// politeness, trip context and Rio neighborhoods. Every case must reach its
// authored intent and a first-party guide rather than the generic fallback.
const corpus = [
  {id:'cristo', expected:'christ_access', bases:['como ir al cristo','como ir al cristo redentor','como llego al cristo','como llego al cristo redentor','como subir al cristo','como llegar al cristo','como visitar cristo','como ir até o cristo','how do i get to christ','how to get to christ the redeemer']},
  {id:'favela', expected:'experience_rocinha', bases:['quiero ir a la favela','quiero visitar una favela','quiero conocer una favela','quiero ir a rocinha','tour favela rio','quero conhecer uma favela','quero visitar a rocinha','visitar favela con guia','i want to visit a favela','favela tour in rio']},
  // Location-specific Ipanema questions may resolve to the authored breakfast
  // recommendation; general breakfast questions resolve to the follow-up flow.
  {id:'breakfast', expected:['daily_coffee','food_breakfast'], bases:['donde tomar desayuno','donde desayunar','quiero desayunar','donde puedo desayunar','tomar cafe da manha','onde tomar cafe da manha','onde tomar café da manhã','where can i get breakfast','where to have breakfast','where can i have breakfast']},
  {id:'lunch', expected:'daily_food', bases:['donde almorzar','donde puedo almorzar','quiero almorzar','donde almorzar en rio','onde almoçar','onde posso almoçar','quero almoçar','where can i have lunch','where to have lunch','where can i get lunch']},
  {id:'snack', expected:'daily_food', bases:['donde merendar','donde puedo merendar','quiero merendar','donde tomar una merienda','tomar algo por la tarde','onde lanchar','quero fazer um lanche','onde tomar um lanche','where can i get an afternoon snack','where to get a snack']},
  {id:'dinner', expected:'daily_food', bases:['donde cenar','donde puedo cenar','quiero cenar','donde cenar en rio','onde jantar','onde posso jantar','quero jantar','where can i have dinner','where to get dinner','where can i eat dinner']},
  {id:'car', expected:'daily_car_rental', bases:['alquilar un auto','quiero alquilar un auto','alquilar un coche','rentar un carro','alquiler de coche','alugar um carro','quero alugar carro','locacao de veiculo','rent a car','car rental']},
  {id:'internet', expected:'daily_internet', bases:['internet','necesito internet','internet en rio','como tener internet en rio','chip para brasil','sim card brazil','esim para brasil','chip de datos para turistas','mobile data in brazil','how to get internet in rio']},
  {id:'tours', expected:'experiences', bases:['que tours ofrecen','que tours tienen','que tours hay en rio','que experiencias ofrecen','que experiencias tienen','quais passeios oferecem','quais tours voces oferecem','what tours do you offer','what tours do you have','what tours are available']},
  {id:'recommended', expected:['experiences','experience_must_see','first_visit','today'], bases:['que experiencia me recomiendas','que tours puedo hacer en rio','cuales son los imperdibles','quiero un tour','que experiencias hay en rio','qual passeio voce recomenda','quais passeios posso fazer','which tour do you recommend','what experiences can i do in rio','what should i do in rio']}
];
const variations={
  ES:{prefixes:['','Hola, ','Por favor, ','Disculpa, ','Una consulta: ','¿Me ayudas con esto? ','Estoy viajando, ','Para mi viaje, ','Necesito saber: ','Quisiera consultar: '],suffixes:['',' por favor',' en Río',' en Rio de Janeiro',' para mi viaje',' este fin de semana',' mañana',' hoy',' cerca de Copacabana',' cerca de Ipanema',' con mi pareja',' con mi familia',' para dos personas',' para turistas',' gracias',' ¿me ayudas?',' ¿qué recomiendas?',' estoy de vacaciones',' antes de viajar',' como visitante']},
  PT:{prefixes:['','Olá, ','Por favor, ','Com licença, ','Uma dúvida: ','Pode me ajudar? ','Estou viajando, ','Na minha viagem, ','Preciso saber: ','Gostaria de saber: '],suffixes:['',' por favor',' no Rio',' no Rio de Janeiro',' para a minha viagem',' neste fim de semana',' amanhã',' hoje',' perto de Copacabana',' perto de Ipanema',' com meu parceiro',' com minha família',' para duas pessoas',' como turista',' obrigado',' pode me ajudar?',' o que você recomenda?',' estou de férias',' antes de viajar',' como visitante']},
  EN:{prefixes:['','Hi, ','Please, ','Excuse me, ','Quick question: ','Could you help me? ','I am traveling, ','For my trip, ','I need to know: ','I would like to ask: '],suffixes:['',' please',' in Rio',' in Rio de Janeiro',' for my trip',' this weekend',' tomorrow',' today',' near Copacabana',' near Ipanema',' with my partner',' with my family',' for two people',' as a tourist',' thanks',' can you help me?',' what do you recommend?',' I am on vacation',' before I travel',' as a visitor']}
};
const normalize=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const languageOf=base=>{
  const q=normalize(base);
  if(/\b(where|what|how|i want|rent a|car rental|hire a|sim card|mobile data|internet in|favela tour in|which|what should)\b/.test(q)) return 'EN';
  if(/\b(onde|quero|quais|qual|voce|voces|alugar|aluguel|com guia|na rocinha|o que|cafe da manha)\b/.test(q)) return 'PT';
  return 'ES';
};
const seen=new Set();
const errors=[];
let checked=0;
for (const group of corpus) {
  let groupCount=0;
  for (const base of group.bases) {
    const {prefixes,suffixes}=variations[languageOf(base)];
    for (const prefix of prefixes) for (const suffix of suffixes) {
    const question=(prefix+base+suffix).replace(/\s+/g,' ').trim();
    if (seen.has(question)) continue;
    seen.add(question);
    const result=resolveQuestion(question);
    const expected=group.expected;
    if (!(Array.isArray(expected) ? expected.includes(result.intent?.id) : result.intent?.id === expected)) {
      if (errors.length<30) errors.push({topic:group.id,question,got:result.intent?.id||null});
    } else {
      assert.ok(result.intent.answer, `${group.id} has a non-empty answer: ${question}`);
      assert.ok(result.intent.links?.some(link=>link.href.startsWith('/')), `${group.id} includes a first-party link: ${question}`);
    }
    checked++; groupCount++;
    }
  }
  assert.equal(groupCount,2000,`${group.id}: 2,000 distinct realistic variants`);
}
assert.equal(checked,20000,'exactly 20,000 unique visitor-style questions checked');
assert.equal(seen.size,20000,'the 20,000 questions are all distinct');
assert.deepEqual(errors,[],`unresolved or misrouted visitor questions: ${JSON.stringify(errors,null,2)}`);

// Verify each meal keeps its purpose when the visitor answers with cuisine and area.
for (const [question,meal] of [['donde almorzar','lunch'],['donde merendar','snack'],['donde cenar','dinner']]) {
  const first=resolveQuestion(question);
  assert.equal(first.intent?.id,'daily_food');
  assert.equal(first.contextUpdate?.diningMeal,meal);
  const cuisine=resolveQuestion('comida brasileña',first.contextUpdate);
  assert.equal(cuisine.intent?.id,'daily_food');
  assert.equal(cuisine.contextUpdate?.diningMeal,meal);
  const location=resolveQuestion('Copacabana',cuisine.contextUpdate);
  assert.equal(location.intent?.id,'daily_food');
  assert.equal(location.contextUpdate?.diningMeal,meal);
}
console.log(`PASS: ${checked.toLocaleString('en-US')} unique human-style queries routed to useful, linked answers; meal context retained in follow-up turns.`);
