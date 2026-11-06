// Render the existing Búzios guide copy inside the actual Río guide template.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buziosGuidePages} from '../assets/js/buzios-guide-content.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const templates={'aeropuertos':'aeropuertos','terminal':'terminales','salud-emergencias':'emergencias','consulados':'consulados','accesibilidad':'accesibilidad','viajar-solo':'viajar-solo'};
const langs=['ES','PT','EN'],origin='https://www.ernestinhocarioca.com.br',media='https://mediumturquoise-stinkbug-270478.hostingersite.com/FOTOS/HOME/BUZIOS/';
const T=(ES,PT,EN)=>({ES,PT,EN});
const tips={
'aeropuertos':T('Yo compararía el vuelo junto con el viaje hasta la puerta del alojamiento. Ahorrar un poco en el pasaje puede significar otro traslado, más espera y menos tiempo en tu primer día de playa.','Eu compararia o voo junto com o trajeto até a porta da hospedagem. Economizar um pouco na passagem pode significar outro transfer, mais espera e menos tempo no primeiro dia de praia.','I would compare the flight together with the journey to your accommodation door. A small airfare saving can mean another transfer, extra waiting and less time on your first beach day.'),
 'terminal':T('Yo guardaría la dirección del alojamiento y resolvería el último tramo antes de subir al bus. Llegar con la vuelta comprada y saber cómo seguir te deja empezar Búzios con otra tranquilidad.','Eu salvaria o endereço da hospedagem e resolveria o último trecho antes de embarcar. Chegar com a volta comprada e saber como continuar deixa o começo de Búzios muito mais tranquilo.','I would save my accommodation address and plan the final leg before boarding. Arriving with a return ticket and knowing how to continue makes for a much easier start.'),
 'viajar-solo':T('Yo elegiría una base desde la que pueda cenar y volver con facilidad. Después dejaría parte del día abierta: viajar solo también es poder quedarte en esa playa que te gustó, sin mirar el reloj.','Eu escolheria uma base de onde seja fácil jantar e voltar. Depois deixaria parte do dia livre: viajar sozinho também é poder ficar naquela praia de que você gostou, sem olhar o relógio.','I would choose a base with an easy dinner-and-return route, then leave part of the day open. Travelling solo also means staying longer at a beach you love without watching the clock.'),
 'accesibilidad':T('Yo pediría un video del camino completo: desde la puerta de la habitación hasta la calle y desde el vehículo hasta la mesa o la arena. Esos minutos explican mucho más que la palabra «accesible» en un anuncio.','Eu pediria um vídeo do caminho inteiro: da porta do quarto à rua e do veículo até a mesa ou a areia. Esses minutos explicam muito mais do que a palavra «acessível» num anúncio.','I would ask for a video of the whole route, from the room door to the street and from the vehicle to the table or sand. Those minutes say far more than an “accessible” label.'),
 'consulados':T('Yo guardaría los contactos consulares antes de viajar y también fuera del teléfono. Si pierdes el móvil, agradecerás tener la dirección del alojamiento y un contacto de confianza en una tarjeta de papel.','Eu salvaria os contatos consulares antes da viagem e também fora do celular. Se perder o aparelho, ajuda ter o endereço da hospedagem e um contato de confiança num cartão de papel.','I would save consular contacts before travelling and keep a copy away from my phone. If it goes missing, a paper card with your accommodation address and a trusted contact will help.'),
 'salud-emergencias':T('Yo guardaría esta guía sin conexión y anotaría el barrio del alojamiento. Cuando necesitas ayuda, explicar dónde estás con claridad vale más que buscar todos los datos en ese momento.','Eu salvaria este guia sem conexão e anotaria o bairro da hospedagem. Quando precisa de ajuda, dizer com clareza onde está vale mais do que procurar todos os dados naquela hora.','I would save this guide offline and write down my accommodation neighbourhood. When you need help, clearly explaining where you are matters more than searching for every detail at that moment.')};
const pictures={
 'viajar-solo':[['GUIA BUZIOS/VIAJANDO SOLA/1122e2c0350059b4af30dbb27835fc8b.jpg',T('Viajera caminando por una costa rocosa','Viajante caminhando numa costa rochosa','Traveller walking along a rocky coast')],['GUIA BUZIOS/VIAJANDO SOLA/669f3f69ad6e72f6c57f806d10c9393a.jpg',T('Viajera sentada junto al paseo costero','Viajante sentada junto à orla','Traveller sitting beside the waterfront')],['GUIA BUZIOS/VIAJANDO SOLA/c82eade186edfbdb48d78228a8a925f5.jpg',T('Viajera frente al mar','Viajante em frente ao mar','Traveller facing the sea')]],
 'accesibilidad':[['GUIA BUZIOS/ACCESIBILIDAD/SILLA PCD PLAYA.jpg',T('Silla anfibia junto al agua','Cadeira anfíbia junto à água','Amphibious wheelchair by the water')],['GUIA BUZIOS/ACCESIBILIDAD/ACCESIBILIDAD PLAYA AZEDA 2.jpg',T('Acceso a la playa con acompañamiento','Acesso à praia com acompanhamento','Beach access with assistance')],['GUIA BUZIOS/ACCESIBILIDAD/ACCESIBILIDAD PLAYA AZEDA.jpg',T('Equipo de apoyo para el acceso al mar','Equipe de apoio ao acesso ao mar','Team assisting with sea access')],['GUIA BUZIOS/ACCESIBILIDAD/PROYECTO MAR PARA TODOS.jpg',T('Actividad de acceso asistido al mar','Atividade de acesso assistido ao mar','Assisted sea-access activity')]],
 'salud-emergencias':[['GUIA BUZIOS/SALUD Y EMERGENCIAS/hospital-municipal-rodolpho-perisse.jpg',T('Fachada del Hospital Municipal Dr. Rodolpho Perissé','Fachada do Hospital Municipal Dr. Rodolpho Perissé','Dr. Rodolpho Perissé Municipal Hospital exterior')],['GUIA BUZIOS/SALUD Y EMERGENCIAS/UNIDADE DE URGENCIA DA RASA.jpg',T('Edificio identificado como unidad de urgencia de Rasa','Edifício identificado como unidade de urgência da Rasa','Building identified as the Rasa emergency unit')]],
 'terminal':[['GUIA BUZIOS/TERMINAL ONIBUS/TEMRMINAL BUZIOS.jpg',T('Autobús en la terminal de Búzios','Ônibus na rodoviária de Búzios','Coach at the Búzios bus terminal')]],
 'aeropuertos':[['PLAYAS/orla bardot 02.jpg',T('Orla Bardot en Búzios','Orla Bardot em Búzios','Orla Bardot in Búzios')]],'consulados':[]};
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const v=(x,l)=>x&&typeof x==='object'?x[l]||'':x||'';
const pre=l=>l==='ES'?'':'/'+l.toLowerCase();
const link=(u,l)=>u.startsWith('/')&&!u.startsWith('//')?pre(l)+u:u;
const paragraphs=(x,l)=>String(v(x,l)).split(/\n\n+/).filter(Boolean).map(x=>'<p>'+esc(x)+'</p>').join('');
const button=(label,u,l)=>'<a class="ext" href="'+esc(link(u,l))+'"'+(/^https?:/.test(u)?' target="_blank" rel="noopener noreferrer"':'')+'>'+esc(v(label,l))+' ↗</a>';
export const guideArticleRoutes=Object.keys(templates).map(s=>'/destinos/buzios/guia/'+s+'/');
export function renderBuziosGuideArticle(route,l){
 const slug=route.split('/').filter(Boolean).at(-1);if(!templates[slug])throw Error('Unmanaged guide route '+route);
 const d=structuredClone(buziosGuidePages[route]);
 if(slug==='aeropuertos'){
  for(const s of d.sections)for(const it of s.items||[])if(JSON.stringify(it).includes('31/10/2026')){
   it.title=T('Traslado privado: cotiza el trayecto completo','Transfer privativo: cote o trajeto completo','Private transfer: request an end-to-end quote');
   it.text=T('Envíame fecha, aeropuerto, vuelo, pasajeros, maletas y dirección. Te confirmaré el precio total y el vehículo disponible antes de reservar. Revisa el punto de encuentro, los tiempos de espera y las condiciones si el vuelo se retrasa.','Envie data, aeroporto, voo, passageiros, malas e endereço. Confirmarei o preço total e o veículo disponível antes da reserva. Confira o encontro, a espera e as condições em caso de atraso do voo.','Send the date, airport, flight, passenger and luggage counts, and address. I will confirm the total price and available vehicle before booking. Check the meeting point, waiting time and delayed-flight arrangements.');
   it.actions=[];it.href='/destinos/buzios/transportes/transporte-privado/';
  }
  d.notice=T('Solicita el precio completo para tu fecha, con equipaje, destino y condiciones de espera. Comprueba los horarios del bus al comprar el pasaje.','Peça o preço completo para sua data, com bagagem, destino e condições de espera. Confira horários do ônibus ao comprar a passagem.','Request a complete quote for your date, with luggage, destination and waiting terms. Check bus times when buying the ticket.');
 }
 let body='<main class="guide" id="contenido" data-bz-guide-article="'+slug+'">'+button(T('← Guía de Búzios','← Guia de Búzios','← Búzios guide'),'/destinos/buzios/guia/',l)+'<p class="kicker">'+esc(v(d.eyebrow,l))+'</p><h1>'+esc(v(d.title,l))+'</h1><p class="intro">'+esc(v(d.intro,l))+'</p><aside class="tip"><b>'+v(T('Consejo de Ernestinho','Dica do Ernestinho','Ernestinho’s tip'),l)+'</b>'+paragraphs(tips[slug],l)+'</aside>';
 let n=0;const photos=[...pictures[slug]];
 const figure=([src,alt])=>'<figure class="ec-inline-photo"><img src="'+media+src.split('/').map(encodeURIComponent).join('/')+'" alt="'+esc(v(alt,l))+'" loading="lazy" decoding="async"></figure>';
 for(const s of d.sections){body+='<section><h2>'+esc(v(s.title,l))+'</h2>'+paragraphs(s.lead,l)+'<div class="items">';
  for(const it of s.items||[]){body+='<article><span>'+String(++n).padStart(2,'0')+'</span><h2>'+esc(v(it.title,l))+'</h2>'+paragraphs(it.text,l);
   for(const detail of it.details||[])body+='<h3>'+esc(v(detail.title,l))+'</h3>'+paragraphs(detail.text,l);
   for(const a of it.actions||[])body+=button(a.label,a.href,l);
   if(it.href)body+=button(T('Abrir guía relacionada','Abrir guia relacionado','Read related guide'),it.href,l);
   body+='</article>';
  }
  body+='</div></section>';if(photos.length)body+=figure(photos.shift());
 }
 for(const p of photos)body+=figure(p);
 if(d.notice)body+='<aside class="tip"><b>'+v(T('Antes de salir','Antes de sair','Before you go'),l)+'</b>'+paragraphs(d.notice,l)+'</aside>';
 body+='<section><h2>'+v(T('Sigue preparando tu viaje','Continue preparando sua viagem','Keep planning your trip'),l)+'</h2>'+(d.related||[]).map(x=>button(x.title,x.href,l)).join('')+'</section></main>';
 const rio=fs.readFileSync(path.join(root,'guia',templates[slug],'index.html'),'utf8');
 const styles=[...rio.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map(x=>'<style data-rio-guide-template>'+x[1]+'</style>').join('');
 const title=v(d.title,l)+' | Ernestinho Carioca',desc=v(d.description,l),url=origin+pre(l)+route;
 const alt=langs.map(k=>'<link rel="alternate" hreflang="'+(k==='PT'?'pt-BR':k.toLowerCase())+'" href="'+origin+pre(k)+route+'">').join('')+'<link rel="alternate" hreflang="x-default" href="'+origin+route+'">';
 const schema={'@context':'https://schema.org','@type':'WebPage',name:title,description:desc,url,inLanguage:l==='PT'?'pt-BR':l.toLowerCase(),isPartOf:{'@type':'WebSite',name:'Ernestinho Carioca',url:origin+'/'}};
 return '<!doctype html><html data-ec-locale-routes="true" lang="'+schema.inLanguage+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+'</title><meta name="description" content="'+esc(desc)+'"><link rel="canonical" href="'+url+'">'+alt+'<meta property="og:type" content="article"><meta property="og:title" content="'+esc(title)+'"><meta property="og:description" content="'+esc(desc)+'"><meta property="og:url" content="'+url+'"><meta name="twitter:card" content="summary">'+['tokens','app','components','buzios'].map(x=>'<link rel="stylesheet" href="/assets/css/'+x+'.css">').join('')+styles+'<script type="application/ld+json">'+JSON.stringify(schema).replaceAll('<','\\u003c')+'</script></head><body><a class="skip" href="#contenido">'+v(T('Saltar al contenido','Pular para o conteúdo','Skip to content'),l)+'</a><header class="topbar"><a class="brand" href="'+pre(l)+'/" aria-label="Ernestinho Carioca"><img src="/assets/brand/ec-mark.png" alt="Ernestinho Carioca" width="44" height="44"></a><nav></nav><div class="tools"></div></header>'+body+'<script type="module" src="/assets/js/site.js"></script><script type="module" src="/assets/js/buzios-shell.js?v=20261105-rio-parity"></script></body></html>';
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const stage=process.argv.find(x=>x.startsWith('--stage='))?.slice(8);
 for(const route of guideArticleRoutes)for(const l of stage?langs:['ES']){
  const dest=path.join(stage||root,pre(l),route,'index.html');fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,renderBuziosGuideArticle(route,l));
 }
 console.log('Generated '+guideArticleRoutes.length+' Búzios guide articles'+(stage?' in ES/PT/EN':' (ES sources)'));
}
