import assert from 'node:assert/strict';
import {resolveQuestion,getContextualIntentAnswer} from '../assets/js/carioc-ia-engine.js';
import {searchSiteGuide} from '../assets/js/carioc-ia-site-index.js';
import {SITE_GUIDE_DOCUMENTS} from '../assets/js/carioc-ia-site-index-data.js';
import {readFileSync} from 'node:fs';

const initialQuestions=['¿Dónde puedo comer?','Onde posso comer?','Where should I eat?','quiero comer','quero comer','I want to eat'];
for(const question of initialQuestions) {
  const r=resolveQuestion(question);
  assert.equal(r.contextUpdate.pending,'dining_cuisine');
  assert.deepEqual(r.intent.links.map(l=>l.href),['/gastronomia/'],'No restaurant is chosen before preferences');
  assert.ok(r.intent.suppressRecommendations);
  assert.ok(r.intent.followups.length>=6);
}
for(const [language,question,sushi] of [['ES','¿Dónde puedo comer?','Sushi / japonesa'],['PT','Onde posso comer?','Sushi / japonesa'],['EN','Where should I eat?','Sushi / Japanese']]) {
  const first=resolveQuestion(question);
  const type=resolveQuestion(sushi,first.contextUpdate);
  assert.equal(type.contextUpdate.pending,'dining_location');
  assert.deepEqual(type.intent.links.map(l=>l.href),['/gastronomia/']);
  const final=resolveQuestion('Leblon',type.contextUpdate);
  assert.ok(final.intent.links.some(l=>l.href==='/gastronomia/sushi-leblon/'));
  assert.ok(getContextualIntentAnswer(final.intent,final.contextUpdate,language).includes('Leblon'));
  for(const link of final.intent.links.filter(l=>l.href!=='/gastronomia/')) {
    const record=SITE_GUIDE_DOCUMENTS.find(d=>d.href===link.href);
    assert.equal(record.neighborhood,'Leblon');
    assert.match([record.title,...record.tags].join(' '),/sushi|japon/i);
  }
  const empty=resolveQuestion('Copacabana',type.contextUpdate);
  assert.deepEqual(empty.intent.links.map(l=>l.href),['/gastronomia/'],'Do not substitute another district when the requested combination has no evidence');
  const zoneFirst=resolveQuestion('Copacabana',first.contextUpdate);
  assert.equal(zoneFirst.contextUpdate.pending,'dining_cuisine');
  assert.ok(zoneFirst.intent.answer[language].includes('Copacabana'));
  const changed=resolveQuestion('Necesito un traslado',type.contextUpdate);
  assert.equal(changed.intent.id,'daily_transfer','New topic exits dining flow');
  const rental=resolveQuestion('alquilar un auto',type.contextUpdate);
  assert.equal(rental.intent.id,'daily_car_rental','Car rental exits dining flow');
  const internet=resolveQuestion('internet',type.contextUpdate);
  assert.equal(internet.intent.id,'daily_internet','Internet questions exit dining flow');
}
const cheap=resolveQuestion('Copacabana, algo económico',resolveQuestion('quiero comer').contextUpdate);
const affordableMeat=resolveQuestion('Carnes / churrasco',cheap.contextUpdate);
assert.equal(affordableMeat.contextUpdate.budget,'budget');
assert.deepEqual(affordableMeat.intent.links.map(l=>l.href),['/gastronomia/'],'Unverified prices do not become budget recommendations');
assert.match(affordableMeat.intent.answer.ES,/precios actuales confirmados/);
for(const question of initialQuestions) assert.deepEqual(searchSiteGuide(question,'gastronomy'),[],'Generic requests cannot produce arbitrary indexed venues');
const widget=readFileSync(new URL('../assets/js/carioc-ia.js',import.meta.url),'utf8');
assert.match(widget,/suppressAdditionalRecommendations \? \[\] : searchSiteGuide/,'Food preferences suppress indexed venue recommendations');
assert.match(widget,/Boolean\(intent\.suppressRecommendations \|\| intent\.pending\)/,'Any intent asking a follow-up suppresses premature venue recommendations');
assert.match(widget,/intent\.directAnswer \? getLocalized\(intent\.answer, language\)/,'Widget renders the selected dining flow reply');
console.log('Dining flow passed: six entry phrases, three languages, cuisine/area in both orders, strict matches, empty results, budget and topic changes.');
