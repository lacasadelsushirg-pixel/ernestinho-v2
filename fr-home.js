// Release FR AP 805 — 2026-11-21
const ROOT = 'https://www.ernestinhocarioca.com.br/';
const data = await fetch(new URL('./assets/js/translations/fr/piloto-rio.json', import.meta.url), {cache:'force-cache'}).then(r => {if(!r.ok)throw Error('French dictionary HTTP '+r.status);return r.json()});
const fallback = {"EXPLORAR →":"EXPLORER →","Experiencias destacadas":"Expériences à la une","Ernestinho durante una aparición en televisión":"Ernestinho lors d’un passage à la télévision","Eventos de Río de Janeiro":"Événements à Rio de Janeiro","Tours":"Excursions","Guía independiente de Río de Janeiro.":"Guide indépendant de Rio de Janeiro.","Río no se visita. Se vive.":"Rio ne se visite pas. Il se vit.","De descubrir Río a vivirlo.":"De la découverte de Rio à l’expérience vécue.","Experiencias anteriores":"Expériences précédentes","Siguientes experiencias":"Expériences suivantes","Guía de Río":"Guide de Rio","Todo lo práctico para preparar tu viaje.":"Tous les conseils pratiques pour préparer votre voyage.","Transportes":"Transports","Muévete por Río con más claridad.":"Déplacez-vous plus facilement à Rio.","Hospedaje":"Hébergement","Mis opciones y zonas para quedarte.":"Mes adresses et les quartiers où loger.","Fotografía":"Photographie","Llévate algo más que recuerdos.":"Rapportez plus que des souvenirs.","Compras":"Shopping","Shoppings, ferias y mercados.":"Centres commerciaux, foires et marchés.","Barrios":"Quartiers","Entiende Río barrio por barrio.":"Comprendre Rio, quartier par quartier.","Eventos":"Événements","Lo que está pasando en la ciudad.":"Ce qui se passe en ville.","Experiencias":"Expériences","Vive Río con mi equipo local.":"Vivez Rio avec mon équipe locale.","Playas":"Plages","Encuentra tu playa y tu momento.":"Trouvez votre plage et le bon moment pour en profiter.","Vida Nocturna":"Vie nocturne","Samba, música y noches cariocas.":"Samba, musique et nuits cariocas.","Gastronomía":"Gastronomie","Dónde comer según tu momento.":"Où manger selon vos envies.","Arte y Cultura":"Art et culture","Museos, teatros, centros culturales, bibliotecas, fuertes e iglesias.":"Musées, théâtres, centres culturels, bibliothèques, forts et églises.","Atracciones":"Sites à visiter","Los clásicos y lo que hay detrás.":"Les incontournables et leur histoire.","Familia":"En famille","Río también con niños y familia.":"Rio aussi avec les enfants et en famille.","Café Río":"Café Rio","Mi marca de café saborizado: un recuerdo de Brasil con ADN Ernestinho.":"Ma marque de café aromatisé : un souvenir du Brésil à l’ADN Ernestinho.","Consejos":"Conseils","Lo que me gustaría que supieras antes.":"Ce que j’aimerais que vous sachiez avant de partir.","Naturaleza":"Nature","Te cuento cómo vivir Río entre sus miradores y paisajes verdes.":"Mes conseils pour découvrir les belvédères et les paysages verts de Rio.","Full Day Río":"Journée complète à Rio","Un día completo para conectar los grandes lugares de la ciudad.":"Une journée pour relier les grands sites de la ville.","Vuelo en parapente":"Vol en parapente","Parapente desde Parque da Cidade, Niterói, sujeto a las condiciones del viento.":"Vol en parapente depuis le Parque da Cidade, à Niterói, selon les conditions de vent.","Un día de partido en Maracaná":"Une journée de match au Maracanã","Vive el fútbol carioca con acompañamiento y logística organizada.":"Vivez le football carioca avec accompagnement et logistique organisée.","Historia, fantasías, samba y bastidores del carnaval carioca.":"Histoire, costumes, samba et coulisses du carnaval carioca.","Recorrido panorámico musical con libertad para subir y bajar.":"Parcours panoramique en musique avec arrêts libres.","Aguas cristalinas, paseo en barco y un día fuera de Río.":"Eaux cristallines, sortie en bateau et escapade hors de Rio.","Islas, navegación y playas en un día completo.":"Îles, navigation et plages le temps d’une journée.","Contactar por WhatsApp":"Contacter sur WhatsApp","¿QUIERES CONOCER RÍO":"ENVIE DE DÉCOUVRIR RIO","CONMIGO?":"AVEC MOI ?","Diseñamos tu itinerario o te acompaño en un tour privado exclusivo.":"Nous préparons votre itinéraire ou je vous accompagne lors d’une visite privée.","HABLAR CON ERNESTINHO POR WHATSAPP":"PARLER À ERNESTINHO SUR WHATSAPP","RÍO DE JANEIRO, DESDE MI MIRADA":"RIO DE JANEIRO, À TRAVERS MON REGARD","© 2026 Ernestinho Carioca. Todos los derechos reservados.":"© 2026 Ernestinho Carioca. Tous droits réservés.","Diseñado para viajeros que buscan vivir Río de forma real y auténtica.":"Pour les voyageurs qui souhaitent découvrir un Rio authentique.","Estamos registrados en Cadastur.":"Nous sommes enregistrés auprès de Cadastur.","Privacidad, precios y condiciones":"Confidentialité, tarifs et conditions"};
const translations = {...data,...fallback};
let scheduled=false;
function localize(){
  if(document.documentElement.lang!=='fr')document.documentElement.lang='fr';
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  for(let node; (node=walker.nextNode());){
    if(node.parentElement?.closest('script,style,textarea,noscript,svg,code'))continue;
    const original=node.nodeValue, key=original.trim().replace(/\s+/g,' ');
    const translated=translations[key];
    if(translated && translated!==key)node.nodeValue=original.replace(original.trim(),translated);
  }
  for(const el of document.querySelectorAll('[alt],[aria-label],[title],[placeholder]')){
    for(const field of ['alt','aria-label','title','placeholder']){
      if(!el.hasAttribute(field))continue;
      const old=el.getAttribute(field), value=translations[old];
      if(value && value!==old)el.setAttribute(field,value);
    }
  }
  const toggle=document.getElementById('lang');
  if(toggle && toggle.textContent!=='FR')toggle.textContent='FR';
  const pathMatch=location.pathname.match(/^\/([^/]+)\//);
  const previewBase=pathMatch && !['fr','pt','en'].includes(pathMatch[1])?'/'+pathMatch[1]:'';
  const isPreview=Boolean(previewBase);
  const previewRoot=isPreview?previewBase+'/':'/';
  // These routes have index.html files on the existing French Hostinger tree (2026-11-20).
  // Keep unfinished sections on their approved ES destination; never guess a FR route.
  const readyRoutes=new Set([
  "",
  "fr/",
  "fr/guia/",
  "fr/guia/vacunas/",
  "fr/guia/terminales/",
  "fr/guia/consulados/",
  "fr/guia/aeropuertos/",
  "fr/guia/apps/",
  "fr/guia/cpf/",
  "fr/guia/menores/",
  "fr/guia/dinero/",
  "fr/guia/alquiler-auto/",
  "fr/guia/emergencias/",
  "fr/guia/accesibilidad/",
  "fr/guia/seguro/",
  "fr/guia/viajar-solo/",
  "fr/guia/documentos/",
  "fr/guia/mes-a-mes/",
  "fr/guia/permanencia/",
  "fr/guia/donde-alojarse/",
  "fr/guia/guarda-equipaje/",
  "fr/guia/pix/",
  "fr/guia/internet/",
  "fr/transportes/",
  "fr/transportes/terminal-gentileza/",
  "fr/transportes/vlt/",
  "fr/transportes/bonde-santa-teresa/",
  "fr/transportes/alquiler-vehiculo/",
  "fr/transportes/bicicletas/",
  "fr/transportes/metro/",
  "fr/transportes/brt/",
  "fr/transportes/trenes/",
  "fr/transportes/barcas/",
  "fr/transportes/onibus/",
  "fr/transportes/uber/",
  "fr/hospedaje/",
  "fr/hospedaje/805/"
]);
  for(const link of document.querySelectorAll('a[href]')){
    const raw=link.getAttribute('href');
    if(!raw||raw.startsWith('#')||/^(?:mailto:|tel:|javascript:|data:)/i.test(raw))continue;
    let url;try{url=new URL(raw,location.href)}catch{continue}
    const pagePath=url.pathname.startsWith(previewRoot)?url.pathname.slice(previewRoot.length):null;
    if(isPreview && url.origin===location.origin && pagePath===null){
      const sourcePath=url.pathname.replace(/^\/+/, '');
      if(readyRoutes.has('fr/'+sourcePath)){
        const target=location.origin+previewRoot+'fr/'+sourcePath+url.search+url.hash;if(link.href!==target)link.href=target;
        continue;
      }
      if(!sourcePath.startsWith('assets/') && !sourcePath.startsWith('api/') && !sourcePath.startsWith('.well-known/')){
        const target=ROOT+sourcePath+url.search+url.hash;if(link.href!==target)link.href=target;
        continue;
      }
    }
    if(url.origin===location.origin && pagePath!==null && !pagePath.startsWith('assets/')){
      if(readyRoutes.has(pagePath))continue;
      // An unfinished French route must lead to the approved Spanish source, never a 404.
      const untranslated=pagePath.startsWith('fr/')?pagePath.slice(3):pagePath;
      if(!untranslated.startsWith('api/') && !untranslated.startsWith('.well-known/')){const target=ROOT+untranslated+url.search+url.hash;if(link.href!==target)link.href=target;}
    }
  }
  for(const link of document.querySelectorAll('a[href*="wa.me/5521969946938"]')){
    let wa;try{wa=new URL(link.href)}catch{continue}
    wa.searchParams.set('text','Bonjour Ernestinho, j’aimerais découvrir Rio avec vous.');
    if(link.href!==wa.href)link.href=wa.href;
  }
  for(const el of document.querySelectorAll('[src],[srcset]')){
    const src=el.getAttribute('src');
    if(src?.startsWith('/assets/'))el.setAttribute('src',(isPreview?previewBase:'')+src);
    const srcset=el.getAttribute('srcset');
    if(srcset)el.setAttribute('srcset',srcset.split(',').map(item=>{const [url,...descriptor]=item.trim().split(/\s+/);return (url.startsWith('/assets/')?(isPreview?previewBase:'')+url:url)+(descriptor.length?' '+descriptor.join(' '):'')}).join(', '));
  }
}
localize();
new MutationObserver(()=>{
  if(scheduled)return;
  scheduled=true;
  queueMicrotask(()=>{scheduled=false;localize()});
}).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['href','lang']});
let repairPasses=0;
const repairTimer=setInterval(()=>{
  localize();
  if(++repairPasses>=20)clearInterval(repairTimer);
},200);
document.addEventListener('click',event=>{
  const link=event.target.closest('a[href]');
  if(!link)return;
  const raw=link.getAttribute('href');
  if(!raw||raw.startsWith('#')||/^(?:mailto:|tel:|javascript:|data:)/i.test(raw))return;
  let url;try{url=new URL(raw,location.href)}catch{return}
  if(location.pathname.startsWith('/fr-vista-luna/')&&url.origin===location.origin&&!url.pathname.startsWith('/fr-vista-luna/')){
    const sourcePath=url.pathname.startsWith('/')?url.pathname.slice(1):url.pathname;
    if(['guia/','guia/dinero/','guia/aeropuertos/','guia/emergencias/','guia/viajar-solo/','guia/vacunas/','guia/apps/','guia/consulados/','guia/menores/','guia/permanencia/','guia/internet/','transportes/'].includes(sourcePath)){
      event.preventDefault();
      location.assign(location.origin+'/fr-vista-luna/fr/'+sourcePath+url.search+url.hash);
    }
  }
},true);
for(const button of document.querySelectorAll('[data-carousel-target]')){
  button.addEventListener('click',()=>{
    const track=document.getElementById(button.dataset.carouselTarget);
    const card=track?.querySelector('.feature');
    if(card)track.scrollBy({left:(button.dataset.carouselDirection==='prev'?-1:1)*(card.getBoundingClientRect().width+18),behavior:'smooth'});
  });
}
