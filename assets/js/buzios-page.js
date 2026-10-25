Warning: truncated output (original token count: 79642)
Total output lines: 1180

import { installBuziosTransport } from './buzios-transport-content.js?v=20261024-transport-v2';
import { routeParts } from './locale-routing.js';
import { beachProfiles } from './buzios-beaches.js';
import { areaProfiles } from './buzios-areas.js';
import { beachDecisions } from './buzios-beach-decisions.js';
import { deepenBuzios } from './buzios-depth.js';
import { buziosGuidePages } from './buzios-guide-content.js';
import { buziosAreaPages } from './buzios-area-content.js';
import { addEditorial, enhanceExisting } from './buzios-editorial.js';
import { closeEditorial } from './buzios-closure.js';
import { buziosPhotos } from './buzios-photos.js';
import { buziosNeighborhoodPages, buziosNeighborhoods } from './buzios-neighborhoods.js?v=20261025-barrios-r6';
import { ready as navigationReady } from './site.js';
import { renderBuziosCategoryNav, renderBuziosSubtopics } from './buzios-taxonomy.js?v=20261025-barrios-r2';
import { PAGES } from './buzios-page-data.js?v=20261025-barrios-r2';

const T=(es,pt,en)=>({ES:es,PT:pt,EN:en});
const A=(...items)=>items;
const img={
  coast:'/assets/images/buzios/panorama-mtur.webp',
  sea:'https://mediumturquoise-stinkbug-270478.hostingersite.com/FOTOS/HOME/BUZIOS/minitatura%20para%20playas%20buzios.jpg',
  turtle:'/assets/images/buzios/tartaruga.webp',
  street:'/assets/images/buzios/orla-bardot.webp'
};
const link=(title,href,copy)=>({title,href,copy});
const item=(title,text,href='')=>({title,text,href});
const venue=(title,text,photo,details,actions)=>({title,text,photo,details,actions});
const section=(title,lead,items,theme='')=>({title,lead,items,theme});
const fact=(label,value)=>({label,value});

const L={
  ES:{guide:'GUÍA BÚZIOS 360°',home:'Búzios',beaches:'Playas',stay:'Dónde alojarse',arrive:'Cómo llegar',move:'Cómo moverse',do:'Qué hacer',eat:'Comer y salir',cruise:'Cruceros',tips:'Consejos',experiences:'Experiencias',consult:'Consultar por WhatsApp',updated:'Valor actualizado a consultar',confirmed:'Producto en catálogo EC',pending:'Condiciones operativas por confirmar',read:'Abrir guía',see:'Ver experiencia',back:'Volver a Búzios',choose:'Elige por intención, no por una lista infinita',notice:'Antes de decidir',related:'Sigue preparando Búzios',footerTitle:'¿Quieres vivir Búzios con más claridad?',footerCopy:'Cuéntame cuándo viajas, dónde te alojas y cuántas personas son. Te ayudo a separar información útil de una consulta comercial real.',price:'Precio vigente',status:'Estado',origin:'Punto de partida'},
  PT:{guide:'GUIA BÚZIOS 360°',home:'Búzios',beaches:'Praias',stay:'Onde ficar',arrive:'Como chegar',move:'Como se locomover',do:'O que fazer',eat:'Comer e sair',cruise:'Cruzeiros',tips:'Dicas',experiences:'Experiências',consult:'Consultar pelo WhatsApp',updated:'Valor atualizado sob consulta',confirmed:'Produto no catálogo EC',pending:'Condições operacionais a confirmar',read:'Abrir guia',see:'Ver experiência',back:'Voltar a Búzios',choose:'Escolha pela intenção, não por uma lista infinita',notice:'Antes de decidir',related:'Continue preparando Búzios',footerTitle:'Quer viver Búzios com mais clareza?',footerCopy:'Conte quando você viaja, onde ficará hospedado e quantas pessoas são. Eu ajudo a separar informação útil de uma consulta comercial real.',price:'Preço vigente',status:'Status',origin:'Ponto de partida'},
  EN:{guide:'BÚZIOS 360° GUIDE',home:'Búzios',beaches:'Beaches',stay:'Where to stay',arrive:'Getting there',move:'Getting around',do:'Things to do',eat:'Eat and go out',cruise:'Cruises',tips:'Practical tips',experiences:'Experiences',consult:'Ask on WhatsApp',updated:'Current price on request',confirmed:'Product in the EC catalogue',pending:'Operating details to be confirmed',read:'Open guide',see:'View experience',back:'Back to Búzios',choose:'Choose by intent, not from an endless list',notice:'Before you decide',related:'Keep planning Búzios',footerTitle:'Want to experience Búzios with more clarity?',footerCopy:'Tell me when you are travelling, where you are staying and your group size. I will help separate useful guidance from a real commercial enquiry.',price:'Current price',status:'Status',origin:'Starting point'}
};

const commercialPage=({eyebrow,title,description,intro,hero=img.coast,mode,why,confirmed,market,pending,decision,related})=>({
  eyebrow,title,description,intro,hero,
  commercial:true,
  facts:A(
    fact(T('Estado comercial','Status comercial','Commercial status'),T('Producto confirmado · condiciones por actualizar','Produto confirmado · condições a atualizar','Product confirmed · terms require update')),
    fact(T('Precio público','Preço público','Public price'),T('Consultar valor actualizado','Consultar valor atualizado','Request current price')),
    fact(T('Salida','Saída','Departure'),mode)
  ),
  sections:A(
    section(T('Por qué elegir esta experiencia','Por que escolher esta experiência','Why choose this experience'),why,A(...decision.map(d=>item(d[0],d[1])))),
    section(T('Lo confirmado y lo que falta','O confirmado e o que falta','What is confirmed and what is still needed'),market,A(
      item(T('Confirmado por Ernesto','Confirmado por Ernesto','Confirmed by Ernesto'),confirmed),
      item(T('Referencia de mercado','Referência de mercado','Market context'),market),
      item(T('Antes de reservar','Antes de reservar','Before booking'),pending)
    ),'alt')
  ),
  notice:pending,
  whatsapp:T('Hola Ernestinho, quiero consultar esta experiencia saliendo desde Búzios. Producto: '+title.ES+'. Fecha: __. Pasajeros: __. Edades: __. Alojamiento: __.','Olá Ernestinho, quero consultar esta experiência saindo de Búzios. Produto: '+title.PT+'. Data: __. Passageiros: __. Idades: __. Hospedagem: __.','Hi Ernestinho, I would like to enquire about this experience departing Búzios. Product: '+title.EN+'. Date: __. Passengers: __. Ages: __. Accommodation: __.'),
  related
});



PAGES['/destinos/buzios/playas/'].sections.push(section(T('Las 23 playas: acceso, ambiente y decisión','As 23 praias: acesso, ambiente e escolha','All 23 beaches: access, atmosphere and choice'),T('Elige primero el tipo de día y después revisa cómo llegar y volver. Los servicios y el mar se comprueban para la fecha de visita.','Escolha primeiro o tipo de dia e depois confira ida e volta. Serviços e mar devem ser verificados na data da visita.','Choose the kind of day first, then check the outward and return journey. Verify services and sea conditions for your visit.'),beachProfiles.map(([name,text])=>item(name,T(...['ES','PT','EN'].map(lang=>text[lang]+' '+(beachDecisions[name]?.[lang]||'')))))));
const areaProfilePhotos={
 'Centro / Rua das Pedras / Canto':'Orla Bardot',
 'Orla Bardot / Armação':'Armação',
 'Humaitá':'Paisaje de Búzios',
 'Ossos':'Ossos',
 'João Fernandes / João Fernandinho':'João Fernandes',
 'Geribá':'Geribá',
 'Ferradura':'Ferradura',
 'Manguinhos / Porto da Barra':'Manguinhos',
 'Brava':'Brava',
 'Rasa / Marina / Baía Formosa':{src:'https://mediumturquoise-stinkbug-270478.hostingersite.com/FOTOS/HOME/BUZIOS/PLAYAS/RASA/playa-rasa-baia-formosa-buzios-01.jpg',name:'Praia Rasa',width:1140,height:500},
 'Tucuns / Cem Braças':{src:'https://mediumturquoise-stinkbug-270478.hostingersite.com/FOTOS/HOME/BUZIOS/PLAYAS/TUCUNS/tucuns%20buzios.png',name:'Tucuns',width:1600,height:1200},
 'José Gonçalves / Caravelas':{src:'https://mediumturquoise-stinkbug-270478.hostingersite.com/FOTOS/HOME/BUZIOS/PLAYAS/CARAVELAS/CARAVELAS%201.jpg',name:'Praia das Caravelas',width:1600,height:1204}
};
const buziosPhotoAliases={
 'Centro':'Orla Bardot','Rua das Pedras':'Canto 1','Praia da Armação':'Armação','Praia dos Ossos':'Ossos','Praia Brava':'Brava',
 'Centro, Rua das Pedras y Canto':'Centro / Rua das Pedras / Canto','Orla Bardot y Armação':'Orla Bardot / Armação','Humaitá':'Humaitá',
 'João Fernandes y João Fernandinho':'João Fernandes / João Fernandinho','Manguinhos y Porto da Barra':'Manguinhos / Porto da Barra',
 'Rasa, Marina y Baía Formosa':'Rasa / Marina / Baía Formosa','Tucuns y Cem Braças':'Tucuns / Cem Braças','José Gonçalves y Caravelas':'José Gonçalves / Caravelas'
};
function buziosPhotoFor(key){
 if(!key)return null;
 if(typeof key==='object')return key;
 const direct=buziosPhotos[key]||buziosPhotos[buziosPhotoAliases[key]];
 if(direct)return direct;
 const mapped=areaProfilePhotos[key]||areaProfilePhotos[buziosPhotoAliases[key]];
 return typeof mapped==='string'?buziosPhotos[mapped]||null:mapped||null;
}
 const areaProfileSlugs={'Centro / Rua das Pedras / Canto':'centro','Orla Bardot / Armação':'armacao-orla','Humaitá':'humaita','Ossos':'ossos','João Fernandes / João Fernandinho':'joao-fernandes','Geribá':'geriba','Ferradura':'ferradura','Manguinhos / Porto da Barra':'manguinhos-porto-da-barra','Brava':'brava','Rasa / Marina / Baía Formosa':'rasa-marina-baia-formosa','Tucuns / Cem Braças':'tucuns-cem-bracas','José Gonçalves / Caravelas':'jose-goncalves-caravelas'};
 PAGES['/destinos/buzios/alojamiento/'].sections.splice(2,0,section(T('Explora los barrios de Búzios','Explore os bairros de Búzios','Explore Búzios neighbourhoods'),T('Abre la zona que estás considerando. Cada página cuenta su historia, qué lugares quedan cerca y qué revisar para elegir alojamiento.','Abra a região que está considerando. Cada página conta a história, os lugares próximos e o que conferir antes de escolher hospedagem.','Open the area you are considering. Each page covers its history, nearby places and what to check before booking.'),areaProfiles.map(([name,text])=>({...item(name,text,`/destinos/buzios/alojamiento/${areaProfileSlugs[name]}/`),photo:areaProfilePhotos[name]})),'area-index'));
PAGES['/destinos/buzios/comer-y-salir/'].sections.push(section(T('Una mesa para cada momento del viaje','Uma mesa para cada momento da viagem','A table for each moment of your trip'),T('No todos los días piden la misma comida ni el mismo ambiente. Usa estos criterios antes de decidir el local.','Nem todo dia pede a mesma comida ou ambiente. Use estes critérios antes de escolher o lugar.','Not every day calls for the same food or atmosphere. Use these criteria before choosing a venue.'),A(
 item(T('Mariscos y cocina de costa','Frutos do mar e cozinha do litoral','Seafood and coastal cooking'),T('Mira cómo el menú describe el plato y si el precio corresponde a una o más personas. Confirma acompañamientos y alergias. Rocka, en Brava, es una referencia investigada para gastronomía junto al mar; su carta y reserva se consultan directamente.','Observe como o cardápio descreve o prato e se o valor é para uma ou mais pessoas. Confirme acompanhamentos e alergias. Rocka, na Brava, é referência pesquisada de gastronomia à beira-mar; cardápio e reserva devem ser consultados diretamente.','Check how the menu describes the dish and whether it serves one or more people. Confirm sides and allergies. Rocka at Brava is a researched seaside-dining reference; check its current menu and reservation arrangements directly.')),
 item(T('Cena de pareja','Jantar a dois','Dinner for two'),T('Una vista agradable no garantiza una mesa tranquila. Elige entre Orla Bardot, Manguinhos o una propuesta junto a la playa según el regreso. Pregunta por reserva, ubicación de la mesa y música. En alta demanda, resolverlo antes evita depender de la primera mesa libre.','Uma vista bonita não garante mesa tranquila. Escolha Orla Bardot, Manguinhos ou restaurante de praia conforme a volta. Pergunte sobre reserva, posição da mesa e música. Em períodos movimentados, combinar antes evita depender da primeira mesa vaga.','A pleasant view does not guarantee a quiet table. Choose between Orla Bardot, Manguinhos and beach dining according to your return journey. Ask about reservations, table location and music. Planning ahead at busy times avoids relying on the first available table.')),
 item(T('Comer con niños','Comer com crianças','Eating with children'),T('Prioriza acceso, baño, sombra y un menú que el grupo pueda compartir. Una cena cerca de la base puede funcionar mejor que una propuesta lejana después de la playa. Confirma porciones y tiempo de cocina, y lleva una alternativa si el local está lleno.','Priorize acesso, banheiro, sombra e um cardápio que o grupo possa compartilhar. Jantar perto da base pode funcionar melhor após a praia. Confirme porções e tempo de preparo; tenha alternativa se o local estiver cheio.','Prioritise access, toilets, shade and food the group can share. Dinner near your base may work better after a beach day. Ask about portions and preparation times, and have an alternative if the restaurant is full.')),
 item(T('Desayuno y café sin prisa','Café da manhã sem pressa','Unhurried breakfast and coffee'),T('Si tu pousada no incluye desayuno, busca una opción cerca antes de empezar el día. Panadería, café y restaurante tienen ritmos diferentes. Confirma si sirven lo que necesitas a esa hora; una parada breve puede ahorrar un traslado innecesario con hambre o niños.','Se a pousada não inclui café da manhã, encontre uma opção próxima antes de começar o dia. Padaria, cafeteria e restaurante têm ritmos diferentes. Confirme o serviço no horário desejado; uma parada perto evita deslocamento desnecessário com fome ou crianças.','If your pousada has no breakfast, find a nearby option before starting the day. Bakeries, cafés and restaurants have different rhythms. Confirm service at your intended time; a nearby stop avoids unnecessary travel with hungry children.')),
 item(T('Cuidar el presupuesto','Cuidar do orçamento','Watching your budget'),T('Compara el gasto completo: comida, bebidas, servicio y transporte. Pregunta qué viene con el plato y si el valor es por persona o para compartir. Un apartamento con cocina cambia las opciones: mercado para desayunos y una cena elegida pueden rendir más que improvisar cada comida.','Compare o gasto completo: comida, bebidas, serviço e transporte. Pergunte o que acompanha o prato e se o valor é individual ou para compartilhar. Apartamento com cozinha muda as opções: mercado para café da manhã e um jantar escolhido podem render mais.','Compare the total spend: food, drinks, service and transport. Ask what comes with a dish and whether the price is individual or shared. A self-catering apartment changes the options: groceries for breakfast and one chosen dinner can stretch the budget.')),
 item(T('Beach club y noche de música','Beach club e noite de música','Beach clubs and music nights'),T('Silk, en Brava, y Fishbone, en Geribá, son referencias de formatos diferentes, no una programación permanente. Revisa sus canales oficiales para la fecha y confirma admisión, consumo y regreso. Una foto de una fiesta pasada no prueba que ese evento ocurra durante tu viaje.','Silk, na Brava, e Fishbone, em Geribá, são referências de formatos diferentes, não programação permanente. Confira canais oficiais para sua data, entrada, consumo e volta. Foto de festa passada não prova que o evento ocorrerá na viagem.','Silk at Brava and Fishbone at Geribá represent different formats, not permanent programmes. Check official channels for your date, admission, spending requirements and return. A photo of a past party does not prove it will happen during your stay.'))
)));

PAGES['/destinos/buzios/comer-y-salir/'].sections.push(
  section(
    T('10 mesas para entender la gastronomía de Búzios','10 mesas para entender a gastronomia de Búzios','10 tables for understanding Búzios dining'),
    T('No es un ranking. Es una primera selección con estilos distintos entre Rua das Pedras, Orla Bardot y Porto da Barra. Los horarios cambian: confirma el mismo día antes de salir.','Não é ranking. É uma primeira seleção com estilos diferentes entre Rua das Pedras, Orla Bardot e Porto da Barra. Horários mudam: confirme no mesmo dia antes de sair.','This is not a ranking. It is a first selection covering different styles across Rua das Pedras, Orla Bardot and Porto da Barra. Hours change: confirm on the day before going.'),
    A(
      venue(
        T('Chez Michou · el clásico informal','Chez Michou · o clássico informal','Chez Michou · the casual classic'),
        T('Una institución nacida en Búzios para resolver una cena sin ceremonia: crepes salados y dulces, movimiento y ambiente joven. Lo recomiendo cuando quieres algo rápido, céntrico y fácil de combinar con Rua das Pedras, no cuando buscas una cena silenciosa o gastronómica de varias horas.','Uma instituição nascida em Búzios para resolver um jantar sem cerimônia: crepes salgados e doces, movimento e clima jovem. Recomendo quando você quer algo rápido, central e fácil de combinar com a Rua das Pedras, não quando procura jantar silencioso ou experiência gastronômica longa.','A Búzios institution for an unfussy meal: savoury and sweet crêpes, energy and a youthful atmosphere. I recommend it when you want something quick and central to combine with Rua das Pedras, not for a quiet, long-form dinner.'),
        'Orla Bardot',
        A(
          item(T('Qué pedir','O que pedir','What to order'),T('Elige un crepe salado y deja espacio para compartir uno dulce. La carta tiene muchas combinaciones; conviene decidir por ingrediente principal y no por cantidad de opciones.','Escolha um crepe salgado e deixe espaço para dividir um doce. O cardápio tem muitas combinações; vale decidir pelo ingrediente principal, não pela quantidade de opções.','Choose a savoury crêpe and leave room to share a sweet one. The menu is extensive, so decide by your main ingredient rather than by the number of choices.')),
          item(T('Dato de Ernestinho','Dado do Ernestinho','Ernestinho tip'),T('Úsalo como parte de una noche caminando por el Centro. Si tu prioridad es conversar sin ruido, elige otro formato.','Use como parte de uma noite caminhando pelo Centro. Se a prioridade é conversar sem barulho, escolha outro formato.','Use it as part of an evening walking through the centre. If quiet conversation is the priority, choose another format.')),
          item(T('Dirección','Endereço','Address'),T('Rua das Pedras, 90 · Centro','Rua das Pedras, 90 · Centro','Rua das Pedras, 90 · Centro'))
        ),
        A(
          {label:T('Mapa','Mapa','Map'),href:'https://www.google.com/maps/search/?api=1&query=Chez+Michou+Buzios+Rua+das+Pedras+90'},
          {label:T('Teléfono','Telefone','Phone'),href:'tel:+552226339400'},
          {label:T('Instagram','Instagram','Instagram'),href:'https://www.instagram.com/chezmichoucreperia/'},
          {label:T('Web oficial','Site oficial','Official site'),href:'https://www.chezmichou.com.br/lojas/buzios/'}
        )
      ),
      venue(
        T('Primitivo · Italia en Rua das Pedras','Primitivo · Itália na Rua das Pedras','Primitivo · Italy on Rua das Pedras'),
        T('Pasta, pizza, vino y una ubicación que funciona muy bien para una cena antes o después de caminar por el centro. Es una opción más sentada y gastronómica que Chez Michou, sin perder el ritmo de Rua das Pedras.','Massas, pizza, vinho e uma localização que funciona muito bem para jantar antes ou depois de caminhar pelo centro. É uma opção mais sentada e gastronômica que o Chez Michou, sem perder o ritmo da Rua das Pedras.','Pasta, pizza, wine and a location that works well before or after walking through the centre. It is a more sit-down, food-focused choice than Chez Michou while keeping the Rua das Pedras energy.'),
        'Orla Bardot',
        A(
          item(T('Qué pedir','O que pedir','What to order'),T('Pizza de fermentación trabajada, pastas y platos italianos. Si van varios, compartir entradas y pizza permite probar más sin convertir la cena en una sucesión de platos pesados.','Pizza de fermentação trabalhada, massas e pratos italianos. Em grupo, dividir entradas e pizza ajuda a provar mais sem t…69642 tokens truncated…/experiencias/');
  document.body.classList.toggle('ec-buzios-full-day',path==='/destinos/buzios/experiencias/full-day-buzios/');
  document.body.classList.toggle('ec-buzios-page',path.startsWith('/destinos/buzios/'));
  document.body.classList.toggle('bz-transport-page',path.startsWith('/destinos/buzios/transportes/'));
  document.body.classList.toggle('ec-buzios-guide-index',path==='/destinos/buzios/guia/');
  const title=value(page.title,lang),description=value(page.description,lang),eyebrow=value(page.eyebrow,lang),intro=value(page.intro,lang);
  const skip=document.querySelector('.skip');if(skip)skip.textContent=T('Saltar al contenido','Pular para o conteúdo','Skip to content')[lang];
  document.title=title+' | Ernestinho Carioca';
  const setMeta=(selector,attr,val)=>{let node=document.querySelector(selector);if(!node){node=document.createElement('meta');if(selector.includes('property='))node.setAttribute('property',selector.match(/"([^"]+)/)[1]);else node.setAttribute('name',selector.match(/"([^"]+)/)[1]);document.head.appendChild(node);}node.setAttribute(attr,val);if(attr==='content')node.dataset.ecContent=val;};
  setMeta('meta[name="description"]','content',description);setMeta('meta[property="og:title"]','content',document.title);setMeta('meta[property="og:description"]','content',description);setMeta('meta[name="twitter:title"]','content',document.title);setMeta('meta[name="twitter:description"]','content',description);
  setMeta('meta[property="og:image:alt"]','content',T('Paisaje costero de Búzios','Paisagem do litoral de Búzios','Búzios coastal landscape')[lang]);
  setMeta('meta[property="og:image"]','content',new URL(page.hero||'/assets/brand/ec-mark.png','https://www.ernestinhocarioca.com.br').href);setMeta('meta[name="twitter:image"]','content',new URL(page.hero||'/assets/brand/ec-mark.png','https://www.ernestinhocarioca.com.br').href);
  const canonical='https://www.ernestinhocarioca.com.br'+location.pathname;let canon=document.querySelector('link[rel="canonical"]');if(canon)canon.href=canonical;
  const facts=(page.facts||[]).map(f=>`<div class="bz-fact"><small>${esc(value(f.label,lang))}</small><strong>${esc(value(f.value,lang))}</strong></div>`).join('');
  const isExperienceIndex=path==='/destinos/buzios/experiencias/';
  const experienceExtraOffset=isExperienceIndex?2:0;
  const sections=(page.sections||[]).filter(s=>s.theme!=='area-index').slice(experienceExtraOffset).map((s,si)=>`<section id="${path.endsWith('/comer-y-salir/')&&si===1?'noche':'bz-section-'+si}" class="bz-section ${s.theme||''}"><div class="bz-wrap"><div class="bz-section-head"><p class="bz-eyebrow">${String(si+1).padStart(2,'0')}</p><h2>${esc(value(s.title,lang))}</h2><p>${esc(value(s.lead,lang))}</p></div><div class="bz-grid ${(s.items||[]).length<3?'two':''}">${(s.items||[]).map((it,i)=>{const text=value(it.text,lang)||'';const expandedGuide=(path.startsWith('/destinos/buzios/guia/')&&path!=='/destinos/buzios/guia/')||path.startsWith('/destinos/buzios/alojamiento/');const deep=(String(text).length>152||Boolean(it.details?.length))&&!expandedGuide;const venueHasUnverifiedAreaPhoto=path.endsWith('/comer-y-salir/')&&Boolean(it.actions?.length);return `<article class="bz-card ${page.commercial?'bz-commerce':''}">${page.commercial?`<span class="bz-status">${esc(l.confirmed)}</span>`:`<span class="bz-card-number">${String(i+1).padStart(2,'0')}</span>`}${venueHasUnverifiedAreaPhoto?'':(uploadedBuziosFigure(it,lang)||photoFigure(buziosPhotoFor(it.photo),lang))}${it.banner?`<a class="bz-card-photo bz-affiliate-banner" href="${esc(it.banner.href)}" target="_blank" rel="sponsored noopener noreferrer"><img src="${esc(it.banner.src)}" alt="${esc(value(it.banner.alt,lang))}" width="1200" height="420" loading="lazy" decoding="async"></a>`:''}<h3>${esc(value(it.title,lang))}</h3><p class="bz-card-summary">${esc(expandedGuide?text:shortCopy(text))}</p>${deep?`<details class="bz-card-more"><summary>${esc(T('Leer el contexto','Ler o contexto','Read the full context')[lang])}</summary><div><p>${esc(text)}</p>${editorialDetails(it,lang)}</div></details>`:editorialDetails(it,lang)}${it.href?`<a href="${esc(localizedHref(it.href,lang))}">${esc(page.commercial?l.see:l.read)} →</a>`:''}</article>`}).join('')}</div>${editorialMatrix(s.matrix,lang)}</div></section>`).join('');
  const portal=path==='/destinos/buzios/'?`<section class="bz-section bz-portal"><div class="bz-wrap"><p class="bz-eyebrow">${esc(T('EXPLORA TU BÚZIOS','EXPLORE A SUA BÚZIOS','EXPLORE YOUR BÚZIOS')[lang])}</p><h2>${esc(T('Un destino, diez puertas para recorrerlo','Um destino, dez caminhos para conhecer','One destination, ten ways to explore it')[lang])}</h2><div class="door-grid" aria-label="${esc(T('Diez categorías de la guía de Búzios','Dez categorias do guia de Búzios','Ten categories in the Búzios guide')[lang])}">${portalCards.map(card=>`<a class="door" href="${localizedHref(card.href,lang)}"><img class="card-image" src="${esc(card.thumb)}" alt="" width="1200" height="774" loading="lazy" decoding="async"><span class="door-copy"><b>${esc(card.title[lang])}</b><span class="card-copy">${esc(card.copy[lang])}</span><small>${esc(l.read)} →</small></span></a>`).join('')}</div></div></section>`:'';
  const topicCategory={
    '/destinos/buzios/':'guide',
    '/destinos/buzios/experiencias/':'experiences',
    '/destinos/buzios/que-hacer/':'things',
    '/destinos/buzios/como-llegar/':'transport',
    '/destinos/buzios/transportes/':'transport',
    '/destinos/buzios/eventos/':'events',
    '/destinos/buzios/fotografias/':'photos',
    '/destinos/buzios/consejos/':'tips'
  }[path];
  const topicSelector=path==="/destinos/buzios/perfiles/"?`<div class="bz-wrap bz-profile-picker"><label for="bz-profile-choice">${esc(T('Elige tu perfil','Escolha seu perfil','Choose your profile')[lang])}</label><select id="bz-profile-choice"><option value="">${esc(T('Ver todos','Ver todos','Show all')[lang])}</option>${page.sections[0].items.map((it,i)=>`<option value="${i}">${esc(value(it.title,lang))}</option>`).join('')}</select></div>`:'';
  const related=(page.related||[]).map(r=>`<a class="bz-related-card" href="${esc(localizedHref(r.href,lang))}"><small>${esc(l.read)} →</small><strong>${esc(value(r.title,lang))}</strong><span>${esc(value(r.copy,lang))}</span></a>`).join('');
  const msg=value(page.whatsapp,lang)||T('Hola Ernestinho, quiero preparar mi viaje a Búzios. Fecha: __. Pasajeros: __. Alojamiento: __.','Olá Ernestinho, quero preparar minha viagem a Búzios. Data: __. Passageiros: __. Hospedagem: __.','Hi Ernestinho, I would like to plan my Búzios trip. Date: __. Passengers: __. Accommodation: __.')[lang];
  const editorialTarget=page.related?.[0]?.href||'/destinos/buzios/experiencias/';
  const primaryHref=path==='/destinos/buzios/transportes/'?'#bz-transport-options':page.commercial?whatsapp(msg):path.startsWith('/destinos/buzios/guia/')&&path!='/destinos/buzios/guia/'?'#bz-section-0':localizedHref(editorialTarget,lang);
  const isBuziosHome=path==='/destinos/buzios/';
  if(isBuziosHome&&!document.querySelector('.mini-strip')){
    const strip=document.createElement('div');
    strip.className='mini-strip bz-mini-strip';
    strip.innerHTML=`<span class="badge"><strong>BÚZIOS</strong> ${esc(T('guía local','guia local','local guide')[lang])}</span><span>ARMAÇÃO DOS BÚZIOS</span><span>${esc(T('Planifica menos. Vive más.','Planeje menos. Viva mais.','Plan less. Live more.')[lang])}</span>`;
    document.querySelector('.topbar')?.before(strip);
  }
  const relatedSection=`<section class="bz-related"><div class="bz-wrap"><p class="bz-eyebrow">${esc(l.related)}</p><h2>${esc(l.related)}</h2><div class="bz-related-grid">${related}</div></div></section>`;
  const noticeBlock=page.notice?`<div class="bz-wrap"><aside class="bz-notice"><strong>${esc(l.notice)}</strong><p>${esc(value(page.notice,lang))}</p></aside></div>`:'';
  const homeBody=`<section class="intro bz-home-intro" id="explora"><p class="kicker">${esc(T('MI BÚZIOS, A TU MANERA','MEU BÚZIOS, DO SEU JEITO','MY BÚZIOS, YOUR WAY')[lang])}</p><h2>${esc(T('¿Por dónde quieres empezar?','Por onde você quer começar?','Where would you like to start?')[lang])}</h2><p>${esc(intro)}</p></section>${portal}`;
  const experienceBody=()=>`${renderExperienceIndex(page,lang)}<details class="bz-experience-supplement"><summary>${esc(T('Consejos y formatos complementarios','Dicas e formatos complementares','More tips and ways to explore')[lang])} · ${esc(T('Abrir','Abrir','Open')[lang])} →</summary><div>${sections}${renderBuziosSubtopics(topicCategory,lang)}</div></details>${noticeBlock}${relatedSection}`;
  const areaIndexBody=()=>`${renderAreaIndex(page.sections.find(s=>s.theme==='area-index'),lang)}<details class="bz-experience-supplement"><summary>${esc(T('Guía práctica de barrios y zonas','Guia prática de bairros e regiões','Practical guide to neighbourhoods and areas')[lang])} · ${esc(T('Abrir','Abrir','Open')[lang])} →</summary><div>${topicSelector}${sections}${renderBuziosSubtopics(topicCategory,lang)}</div></details>${noticeBlock}${relatedSection}`;
  const breadcrumbIntro=`<div class="bz-wrap"><div class="bz-breadcrumb"><a href="${localizedHref('/destinos/',lang)}">${esc(lang==='PT'?'Destinos':lang==='EN'?'Destinations':'Destinos')}</a> · <a href="${localizedHref('/destinos/buzios/',lang)}">Búzios</a> · ${esc(title)}</div></div><section class="bz-intro" id="bz-intro"><div class="bz-wrap bz-intro-grid"><div><p class="bz-eyebrow">${esc(l.choose)}</p><p class="bz-intro-lead">${esc(intro)}</p></div><div class="bz-facts">${facts}</div></div></section>`;
  const photoGallery=page.gallery?`<section class="bz-photo-gallery"><div class="bz-wrap"><div class="bz-photo-grid">${[
    ...Object.values(buziosPhotos).map(photo=>({photo,caption:value(photo.name,lang),temporary:false})),
    {photo:{src:'/assets/images/buzios/ernestinho-orla-bardot.webp',name:'Ernestinho en Orla Bardot',width:1200,height:800},caption:T('Ernestinho frente al mar en Búzios','Ernestinho à beira-mar em Búzios','Ernestinho by the sea in Búzios')[lang],temporary:true}
  ].map(({photo,caption,temporary})=>`<figure><img src="${esc(photo.src)}" alt="${esc(caption)}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async"><figcaption><strong>${esc(caption)}</strong>${temporary?`<span>${esc(T('Imagen temporal de la guía','Imagem temporária do guia','Temporary guide artwork')[lang])}</span>`:`<span>${esc(photo.artist)} · <a href="${esc(photo.source)}" target="_blank" rel="noopener noreferrer">${esc(T('Fuente','Fonte','Source')[lang])}</a> · <a href="${esc(photo.licenseUrl)}" target="_blank" rel="license noopener noreferrer">${esc(photo.license)}</a></span>`}</figcaption></figure>`).join('')}</div></div></section>`:'';
  const bookingTable=page.bookingTable?`<section class="bz-section bz-booking-rates"><div class="bz-wrap"><div class="bz-section-head"><h2>${esc(value(page.bookingTable.title,lang))}</h2><p>${esc(value(page.bookingTable.valid,lang))}</p></div><div class="bz-table-scroll"><table><thead><tr>${page.bookingTable.columns.map(c=>`<th scope="col">${esc(value(c,lang))}</th>`).join('')}</tr></thead><tbody>${page.bookingTable.rows.map(r=>`<tr><th scope="row">${esc(value(r.car,lang))}</th><td>${esc(r.price)}</td><td><a href="${esc(r.href)}" target="_blank" rel="noopener noreferrer">${esc(T('Consultar por WhatsApp','Consultar pelo WhatsApp','Enquire on WhatsApp')[lang])} →</a></td></tr>`).join('')}</tbody></table></div></div></section>`:'';
  const transportMatrix=renderTransportMatrix(page.transportMatrix,lang);
  const transportLinks=page.transportLinks?.length?`<div class="bz-transport-sources"><div class="bz-wrap">${page.transportLinks.map(a=>`<a href="${esc(a.href)}" target="_blank" rel="noopener noreferrer">${esc(value(a.label,lang))} →</a>`).join('')}</div></div>`:'';
  const customGuide=['/destinos/buzios/guia/salud-emergencias/','/destinos/buzios/guia/consulados/','/destinos/buzios/guia/terminal/','/destinos/buzios/guia/aeropuertos/','/destinos/buzios/guia/mes-a-mes/','/destinos/buzios/guia/viajar-solo/','/destinos/buzios/guia/accesibilidad/'].includes(path)||Boolean(page.neighborhood);
  document.body.classList.toggle('bz-rio-active',customGuide);
  const customBody=customGuide?renderRioStyle(page,path,lang):'';
  const standardBody=`${path==='/destinos/buzios/guia/'?'':breadcrumbIntro}${topicSelector}${page.gallery?photoGallery:sections}${transportMatrix}${transportLinks}${bookingTable}${page.gallery||topicCategory==='events'?'':renderBuziosSubtopics(topicCategory,lang)}${noticeBlock}${relatedSection}`;
  const pageBody=path==='/destinos/buzios/barrios/'?renderBuziosNeighborhoodIndex(lang):path==='/destinos/buzios/transportes/'?renderBzTransportIndex(lang):path==='/destinos/buzios/transportes/transporte-privado/'?standardBody+renderBzTransferBooking(lang):path==='/destinos/buzios/transportes/alquiler-autos/'?standardBody+'<a class="bz-rentcars-banner" href="https://www.rentcars.com/es/?requestorid=11142&amp;utm_source=www.ernestinhocarioca.com.br&amp;utm_medium=afiliado-link" target="_blank" rel="sponsored noopener noreferrer"><img src="https://mediumturquoise-stinkbug-270478.hostingersite.com/FOTOS/HOME/GUIA%20DE%20RIO/ALQUILER%20DE%20AUTO/banner%20rent%20cars.png" loading="lazy" alt="Rentcars · comparar alquiler de autos"></a>':customGuide?customBody:isBuziosHome?homeBody:path==='/destinos/buzios/guia/'?renderPracticalGuideIndex(page,lang):isExperienceIndex?experienceBody():path==='/destinos/buzios/alojamiento/'?areaIndexBody():path==='/destinos/buzios/experiencias/full-day-buzios/'?renderBuziosFullDay(page,lang,whatsapp(msg)):standardBody;
  document.getElementById('bz-app').innerHTML=`
    ${renderBuziosCategoryNav(lang)}
    <main class="bz-shell"><section class="hero bz-page-hero ${!page.hero?'bz-hero-text':''} ${path==='/destinos/buzios/'?'bz-hero-portal':''} ${path==='/destinos/buzios/alojamiento/'?'bz-area-page':''} ${path==='/destinos/buzios/barrios/'?'bz-neighborhood-page':''}">${page.hero?`<picture class="hero-visual"><img src="${esc(page.hero)}" alt="${esc(page.heroPhoto?.alt?value(page.heroPhoto.alt,lang):page.heroPhoto?.name==='Porto da Barra'?T('Entrada de Porto da Barra, en Manguinhos, Búzios','Entrada do Porto da Barra, em Manguinhos, Búzios','Entrance to Porto da Barra in Manguinhos, Búzios')[lang]:isBuziosHome?T('Vista costera de Búzios con la escultura de Brigitte Bardot','Vista costeira de Búzios com a escultura de Brigitte Bardot','Búzios coastline with the Brigitte Bardot sculpture')[lang]:T('Paisaje costero de Búzios','Paisagem do litoral de Búzios','Búzios coastal landscape')[lang])}" width="${page.heroPhoto?.width||page.heroWidth||1600}" height="${page.heroPhoto?.height||page.heroHeight||900}" fetchpriority="high" decoding="async"></picture>`:``}<div class="hero-copy"><p class="kicker">${path==='/destinos/buzios/guia/'?T('ANTES Y DURANTE TU VIAJE','ANTES E DURANTE SUA VIAGEM','BEFORE AND DURING YOUR TRIP')[lang]:path==='/destinos/buzios/alojamiento/'?T('BÚZIOS BARRIO A BARRIO','BÚZIOS BAIRRO A BAIRRO','BÚZIOS, AREA BY AREA')[lang]:'ERNESTINHO CARIOCA · BÚZIOS'}</p><${path==='/destinos/buzios/experiencias/full-day-buzios/'?'div':'h1'}>${isBuziosHome?`<span>${esc(T('Búzios no se visita.','Búzios não se visita.','Búzios is not just visited.')[lang])}</span><br><em>${esc(T('Se vive.','Se vive.','It is lived.')[lang])}</em>`:esc(title)}</${path==='/destinos/buzios/experiencias/full-day-buzios/'?'div':'h1'}><p class="lead">${esc(description)}</p><a class="primary" href="${isBuziosHome?'#explora':esc(primaryHref)}"${page.commercial?' target="_blank" rel="noopener noreferrer"':''}>${esc(isBuziosHome?T('DESCUBRIR BÚZIOS','DESCOBRIR BÚZIOS','DISCOVER BÚZIOS')[lang]:page.commercial?l.consult:l.read)}</a><a class="bz-page-back" href="${localizedHref('/destinos/buzios/',lang)}">${esc(l.back)}</a></div></section>
    ${page.heroPhoto?.source&&page.heroPhoto?.artist&&page.heroPhoto?.licenseUrl&&!isBuziosHome?`<div class="bz-hero-credit">${esc(page.heroPhoto.name)} · <a href="${esc(page.heroPhoto.source)}" target="_blank" rel="noopener noreferrer">${esc(page.heroPhoto.artist)}</a> · <a href="${esc(page.heroPhoto.licenseUrl)}" target="_blank" rel="license noopener noreferrer">${esc(page.heroPhoto.license)}</a></div>`:''}
    ${pageBody}</main>`;
  const fullDayForm=document.querySelector('[data-bz-full-day-form]');
  if(fullDayForm){const dateInput=fullDayForm.elements.fecha;dateInput.min=new Date().toLocaleDateString('en-CA');fullDayForm.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(fullDayForm);const enquiry=[T('Hola Ernestinho, quiero consultar el Full Day Búzios.','Olá Ernestinho, quero consultar o Full Day Búzios.','Hi Ernestinho, I would like to enquire about Full Day Búzios.')[lang],'',`${T('Fecha','Data','Date')[lang]}: ${d.get('fecha')}`,`${T('Nombre','Nome','Name')[lang]}: ${d.get('nombre')}`,`${T('Viajeros','Viajantes','Travellers')[lang]}: ${d.get('pasajeros')}`,`${T('Edades de menores','Idades das crianças','Children’s ages')[lang]}: ${d.get('edades')||T('No indicado','Não informado','Not provided')[lang]}`,`${T('Hotel o recogida','Hotel ou embarque','Hotel or pick-up')[lang]}: ${d.get('hotel')}`,`${T('WhatsApp','WhatsApp','WhatsApp')[lang]}: ${d.get('telefono')}`,`${T('Consulta','Observação','Request')[lang]}: ${d.get('mensaje')||T('Ninguna','Nenhuma','None')[lang]}`,'',T('La consulta no confirma una reserva.','A consulta não confirma uma reserva.','This enquiry does not confirm a booking.')[lang]].join('\n');window.open(whatsapp(enquiry),'_blank','noopener,noreferrer');});}
  document.getElementById('bz-transfer-form')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const msg=['Ernestinho Carioca · Transfer Río/Búzios',...Array.from(f.entries()).map(([k,v])=>k+': '+v),'Por favor confirmar precio vigente, disponibilidad y condiciones.'].join('\n');window.open('https://wa.me/5521969946938?text='+encodeURIComponent(msg),'_blank','noopener,noreferrer');});
  document.getElementById('bz-footer').innerHTML=`<div class="bz-footer"><div class="bz-footer-inner"><div><h2>${esc(l.footerTitle)}</h2><p>${esc(l.footerCopy)}</p></div><a class="bz-button" href="${whatsapp(msg)}" target="_blank" rel="noopener noreferrer">${esc(l.consult)}</a></div></div>`;
  document.querySelectorAll('[data-mm-select]').forEach(button=>button.addEventListener('click',()=>{const selected=button.dataset.mmSelect;document.querySelectorAll('[data-mm-select]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('[data-mm-panel]').forEach(p=>p.hidden=p.dataset.mmPanel!==selected);document.querySelector('[data-mm-panel="'+selected+'"]')?.scrollIntoView({behavior:'smooth',block:'nearest'});}));
   document.querySelectorAll('.bz-month-tabs button').forEach(button=>button.addEventListener('click',()=>{const mode=Number(button.dataset.filter);document.querySelectorAll('.bz-month-tabs button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('.bz-month-card').forEach(card=>card.hidden=mode===1?card.dataset.rain!=='1':mode===2?card.dataset.heat!=='1':false);}));
  const picker=document.getElementById('bz-profile-choice');if(picker)picker.addEventListener('change',()=>{document.querySelectorAll('#bz-section-0 .bz-card').forEach((c,i)=>c.hidden=picker.value!==''&&Number(picker.value)!==i);});
  const schema=document.querySelector('script[type="application/ld+json"]');if(schema)schema.textContent=JSON.stringify({'@context':'https://schema.org','@type':'WebPage',name:document.title,description,url:canonical,inLanguage:document.documentElement.lang,isPartOf:{'@type':'WebSite',name:'Ernestinho Carioca',url:'https://www.ernestinhocarioca.com.br/'}});
}

export function apply(){render();}
export const ready=navigationReady.then(()=>{render();});
