import assert from 'node:assert/strict';
import {resolveQuestion, getLocalized} from '../assets/js/carioc-ia-engine.js';
let context = {};
function ask(q, check) {
  const r = resolveQuestion(q, context);
  assert.ok(r.intent, `Unresolved: ${q}`);
  const answer = getLocalized(r.intent.answer, 'ES');
  assert.ok(answer && !answer.includes('No tengo información fiable'), q);
  if (check) check(answer, r);
  if (!r.contextUpdate?.socialTurn) context = {...context, ...r.contextUpdate, lastIntentId:r.intent.id, category:r.intent.category};
  return r;
}
ask('Hola! ¿Cómo estás? Es mi primera vez en Río');
ask('Estoy en Copacabana. ¿Dónde puedo salir a bailar samba sin gastar mucho?', a=> {assert.match(a,/Bip Bip/);assert.match(a,/Lapa/);assert.doesNotMatch(a,/¿Qué música/);});
ask('Samba, en Copacabana, como te dije. Dame dos lugares concretos', a=>assert.match(a,/Scenarium/));
ask('¿Cómo voy al Cristo Redentor desde Copacabana por mi cuenta? ¿Puedo llegar en Uber hasta arriba?', a=> {assert.match(a,/Lido/); assert.match(a,/Uber no/);});
ask('¿Cómo ir al Cristo?',a=>assert.match(a,/Cosme Velho/));
ask('¿Cómo uso el metro de Río?',a=>assert.match(a,/molinete/));
ask('¿Puedo pagar con mi tarjeta de crédito argentina directamente en el molinete?',a=>assert.match(a,/Visa/));
ask('¿Cómo se paga el ómnibus en Río? ¿Efectivo, tarjeta o Jaé?',a=>assert.match(a,/QR/));
ask('¿Necesito CPF para usar Jaé siendo turista?',a=>assert.match(a,/CPF/));
ask('¿Cómo pagar el onibus?',a=>assert.match(a,/Jaé/));
ask('¿Cómo pido comida a domicilio si no tengo CPF ni teléfono brasileño?',a=>assert.match(a,/directamente al restaurante/));
ask('¿Cómo digo en portugués que quiero una pizza mitad muzzarella y mitad calabresa?',a=>assert.match(a,/meia muçarela/));
ask('¿Dónde encuentro pizza buena y barata en Copacabana?',(a,r)=>{assert.match(a,/Stalos/);assert.ok(r.intent.links.some(l=>l.href==='/gastronomia/stalos/'));assert.match(a,/precios.*confirmados/);});
ask('¿Y alguna con rodizio?',a=>{assert.match(a,/rodízio/);assert.match(a,/no voy a presentarlo como rodízio/);});
ask('Hola',a=>assert.match(a,/Hola/));
ask('Gracias, ¿y tú cómo estás?',a=>assert.match(a,/gracias/));
ask('Estoy en Copacabana y quiero ir a Cinelândia en metro. ¿Qué dirección tomo y dónde bajo?',a=>{assert.match(a,/Uruguai/);assert.match(a,/Baja en Cinelândia/);});
context = {};
ask('Hola');
ask('Quiero comer pizza en Copacabana',a=>assert.match(a,/Stalos/));
ask('¿Cuál me recomiendas?',a=>assert.match(a,/Stalos/));
// Greetings cannot discard a pending food request; changing subject must work.
const before={...context};ask('Gracias');assert.deepEqual(context,before);
ask('¿Cómo voy al Cristo?',a=>assert.match(a,/van oficial/));
for (const [language, questions] of [
 ['PT',['Olá, tudo bem?','Como pago o ônibus?','Preciso de CPF para usar Jaé?','Posso pagar o metrô com cartão estrangeiro?','Como chegar ao Cristo de Uber?','Onde encontro pizza em Copacabana?']],
 ['EN',['Hi, how are you?','How do I pay for a bus?','Can I use Jaé without CPF?','Can I pay at the metro turnstile with a foreign card?','How do I get to Christ the Redeemer by Uber?','Where can I eat pizza in Copacabana?']]
]) for(const q of questions){ const r=resolveQuestion(q);assert.ok(r.intent,q);assert.ok(getLocalized(r.intent.answer,language).length>40,q); }
// Do not hijack independent requests or treat nearby sights as access directions.
assert.equal(resolveQuestion('¿Qué puedo visitar cerca del Cristo?').intent.id,'christ_nearby');
assert.equal(resolveQuestion('Hola, quiero un tour privado').intent.id,'daily_private_tour');
assert.equal(resolveQuestion('Necesito un traslado',context).intent.id,'daily_transfer');
console.log('PASS: original 20 visitor messages, meaningful answers, follow-ups, topic changes, social context and PT/EN variants.');
