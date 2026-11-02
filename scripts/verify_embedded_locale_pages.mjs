#!/usr/bin/env node
// Verify rendered ES/PT/EN output for pages with an indexed in-page locale dictionary.
// Read-only; requires an isolated --routes build already present in dist/.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const checks=[
 {slug:'polis-sucos',
  es:'Polis Sucos tiene la energía visual de una cafetería carioca',
  pt:'Polis Sucos tem a energia visual de uma lanchonete carioca',
  en:'Polis Sucos has the visual energy of a Rio juice bar',
  bad:{es:['Polis Suclos tem a energia visual'],
       pt:['Polis Suclos tem a energia visual'],
       en:['Polis Suclos tem a energia visual','Polis Sucos tiene la energía visual']}},

 {slug:'arp-bar',es:'El mar llega a la mesa en un bar de hotel',pt:'O mar chega à mesa em um bar de hotel',en:'The ocean reaches your table at a hotel bar',
  bad:{es:['O mar chega à mesa'],pt:['El mar llega a la mesa'],en:['O mar chega à mesa','El mar llega a la mesa']}},
 {slug:'classico-leme',es:'Playa, música y cocina de quiosco',pt:'Praia, música e cozinha de quiosque',en:'Beach, music and kiosk cuisine',
  bad:{es:['O Clássico Leme não tenta esconder'],pt:['Clássico Leme no intenta ocultar'],en:['O Clássico Leme não tenta esconder','Clássico Leme no intenta ocultar']}},
 {slug:'quiteria',es:'Cocina brasileña contemporánea en la planta baja',pt:'Cozinha brasileira contemporânea no térreo',en:'Contemporary Brazilian cuisine on the ground floor',
  bad:{es:['O Quitéria tem uma estética'],pt:['Quitéria tiene una estética'],en:['O Quitéria tem uma estética','Quitéria tiene una estética']}},
 {slug:'cosmopolita',es:'Cosmopolita fue un restaurante histórico de Lapa',pt:'O Cosmopolita foi um restaurante histórico da Lapa',en:'Cosmopolita was a historic restaurant in Lapa',
  bad:{es:['La casa está asociada a la tradición gastronómica de Santa Teresa'],pt:['Associado à tradição gastronômica de Santa Teresa'],en:['historic address tied to Santa Teresa']}}
];
// Also verify short visible strings, not just paragraph text.
const shortChecks={"polis-sucos":{"es":"La fachada forma parte del movimiento de la avenida.","pt":"A fachada participa do movimento da avenida.","en":"The storefront is part of the avenue's bustle."},"arp-bar":{"es":"La terraza acerca la mesa a la playa de Arpoador.","pt":"A varanda aproxima a mesa da Praia do Arpoador.","en":"The terrace brings diners closer to Arpoador Beach."},"classico-leme":{"es":"La costa forma parte de la experiencia.","pt":"A orla entra diretamente na experiência.","en":"The beachfront is part of the experience."},"quiteria":{"es":"Un salón luminoso en la planta baja del Ipanema Inn.","pt":"Um salão claro no térreo do Ipanema Inn.","en":"A bright dining room on the ground floor of the Ipanema Inn."},"cosmopolita":{"es":"Referencia histórica: no hay servicio gastronómico actual confirmado.","pt":"Referência histórica: não há atendimento gastronômico atual confirmado.","en":"Historic reference: no current restaurant service is confirmed."}};
const noticeChecks={"arp-bar":{"slug":"arp-bar","es":"El nuevo menú lleva la firma del chef Camilo Vanazzi. Los platos, el equipo, los horarios y los precios pueden variar según la temporada; confirma la carta vigente.","pt":"O novo cardápio leva a assinatura do chef Camilo Vanazzi. Pratos, equipe, horários e preços podem variar conforme a temporada; confira o cardápio atualizado.","en":"The new menu is signed by chef Camilo Vanazzi. Dishes, staff, opening hours and prices may change seasonally; check the current menu."},"classico-leme":{"slug":"classico-leme","es":"La unidad de Leme funciona en una zona abierta de la costa. Los horarios, la música, los eventos y la ocupación de los lounges pueden variar según el clima y la programación.","pt":"A unidade do Leme funciona em uma área aberta à beira-mar. Horários, música, eventos e ocupação dos lounges podem mudar conforme o clima e a programação.","en":"The Leme venue operates in an open-air beachfront setting. Opening hours, music, events and lounge availability may change with the weather and event schedule."},"quiteria":{"slug":"quiteria","es":"El restaurante está dentro del hotel, pero también recibe a visitantes que no se hospedan allí. La carta y los precios se revisaron en referencias de 2026; confirma si hubo cambios.","pt":"O restaurante fica dentro do hotel, mas também recebe clientes que não estão hospedados. O cardápio e os preços foram consultados em fontes de 2026; confirme se houve alterações.","en":"The restaurant is inside the hotel but also welcomes non-guests. The menu and prices were checked against 2026 sources; confirm whether anything has changed."}};
const seoTitleChecks={"arp-bar":{"pt":"Arp Bar: guia gastronômico em Ipanema | Ernestinho Carioca","en":"Arp Bar: dining guide in Ipanema | Ernestinho Carioca"},"quiteria":{"pt":"Quitéria em Ipanema: guia gastronômico | Ernestinho Carioca","en":"Quitéria in Ipanema: dining guide | Ernestinho Carioca"}};
const dec=s=>s.replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#39;/gi,"'");
function visible(html){
 return dec(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'')
 .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'')
 .replace(/<!--[ \s\S]*?-->/g,'')
 .replace(/<[^>]*>/g,' ').replace(/\s+/g,' '));
}
const errors=[],results=[];
for(const test of checks){
 for(const lang of ['es','pt','en']){
  const dest=lang==='es'?path.join(root,'dist','gastronomia',test.slug,'index.html'):path.join(root,'dist',lang,'gastronomia',test.slug,'index.html');
  if(!fs.existsSync(dest)){errors.push(lang+'/'+test.slug+': missing generated HTML');continue;}
  const html=fs.readFileSync(dest,'utf8'),v=visible(html);
  let ok=v.includes(test[lang]);
  if(!ok)errors.push(lang+'/'+test.slug+': correct-language hero text missing');
  let unwanted=(test.bad[lang]||[]).filter(s=>v.includes(s));
  if(unwanted.length)errors.push(lang+'/'+test.slug+': stale text '+unwanted.join(', '));
  if(test.slug==='cosmopolita'){
   if(!v.includes('Travessa do Mosqueira'))errors.push(lang+'/cosmopolita: missing historic Lapa location');
   if(lang==='es'&&!v.includes('No hay servicio gastronómico actual confirmado'))errors.push('es/cosmopolita: no closure warning');
   if(lang==='pt'&&!v.includes('Não há serviço gastronômico atual confirmado'))errors.push('pt/cosmopolita: no closure warning');
   if(lang==='en'&&!v.includes('No current restaurant service is confirmed'))errors.push('en/cosmopolita: no closure warning');
  }
  const notice=noticeChecks[test.slug];
  if(notice){const expected=notice[lang==='es'?'es':lang];if(!v.includes(expected))errors.push(lang+'/'+test.slug+': translated notice missing');if(lang!=='es'&&v.includes(notice.es))errors.push(lang+'/'+test.slug+': Spanish notice leaked')}
  if(['classico-leme','polis-sucos'].includes(test.slug)&&lang!=='es'&&v.includes('← Volver a Gastronomía'))errors.push(lang+'/'+test.slug+': Spanish navigation leaked');
  if(['classico-leme','polis-sucos'].includes(test.slug)&&lang!=='es'&&v.includes('Identidad y ambiente visual'))errors.push(lang+'/'+test.slug+': Spanish section heading leaked');
  if(lang!=='es'){
   const specificTitle=seoTitleChecks[test.slug]?.[lang];
   if(specificTitle&&!html.includes('<title>'+specificTitle+'</title>'))errors.push(lang+'/'+test.slug+': expected SEO title missing');
   if(test.slug==='cosmopolita'){
    const requiredDescription=lang==='pt'?"História do antigo restaurante Cosmopolita na Lapa e do filé à Oswaldo Aranha. Endereço histórico; não há serviço gastronômico atual confirmado.":"History of the former Cosmopolita restaurant in Lapa and filé à Oswaldo Aranha. Historic address; no current restaurant service is confirmed.";
    if(!html.includes('content="'+requiredDescription+'"'))errors.push(lang+'/cosmopolita: historical SEO description not localized');
   }
  }
  if(test.slug==='classico-leme'&&lang!=='es'){
   const expectedTitle=lang==='pt'?'Clássico Beach Club Leme: guia completo | Ernestinho Carioca':'Clássico Beach Club Leme: complete guide | Ernestinho Carioca';
   const expectedMeta=lang==='pt'?"Guia do Clássico Beach Club Leme: ambiente à beira-mar, pratos, horários, transporte, mapa e dicas para planejar a visita no Rio.":"Clássico Beach Club Leme guide: beachfront atmosphere, food, opening hours, transport, a map and tips for planning a visit to Rio.";
   if(!html.includes('<title>'+expectedTitle+'</title>'))errors.push(lang+'/classico-leme: HTML title not localized');
   const actualDescription=html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1]||'';
   if(actualDescription!==expectedMeta)errors.push(lang+'/classico-leme: expected PT/EN SEO description missing');
  }
  const shortText=shortChecks[test.slug]?.[lang];
  if(shortText&&!v.includes(shortText))errors.push(lang+'/'+test.slug+': short localized text missing');
  if(lang!=='es'&&v.includes('Guía independiente de Río de Janeiro'))errors.push(lang+'/'+test.slug+': untranslated Spanish footer');
  results.push({route:lang+'/gastronomia/'+test.slug+'/',expectedText:ok,incorrectPhrases:unwanted.length,shortTextOk:!shortText||v.includes(shortText)});
 }
}
console.log(JSON.stringify({pages:results.length,checked:results,failures:errors},null,2));
if(errors.length)process.exitCode=1;
