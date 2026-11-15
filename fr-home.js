const ROOT = 'https://www.ernestinhocarioca.com.br/';
const data = await fetch(new URL('./assets/js/translations/fr/piloto-rio.json', import.meta.url), {cache:'force-cache'}).then(r => r.ok ? r.json() : {}).catch(() => ({}));
const fallback = {"Tours":"Excursions","Guía independiente de Río de Janeiro.":"Guide indépendant de Rio de Janeiro.","Río no se visita. Se vive.":"Rio ne se visite pas. Il se vit.","De descubrir Río a vivirlo.":"De la découverte de Rio à l’expérience vécue.","Experiencias anteriores":"Expériences précédentes","Siguientes experiencias":"Expériences suivantes","Guía de Río":"Guide de Rio","Todo lo práctico para preparar tu viaje.":"Tous les conseils pratiques pour préparer votre voyage.","Transportes":"Transports","Muévete por Río con más claridad.":"Déplacez-vous plus facilement à Rio.","Hospedaje":"Hébergement","Mis opciones y zonas para quedarte.":"Mes adresses et les quartiers où loger.","Fotografía":"Photographie","Llévate algo más que recuerdos.":"Rapportez plus que des souvenirs.","Compras":"Shopping","Shoppings, ferias y mercados.":"Centres commerciaux, foires et marchés.","Barrios":"Quartiers","Entiende Río barrio por barrio.":"Comprendre Rio, quartier par quartier.","Eventos":"Événements","Lo que está pasando en la ciudad.":"Ce qui se passe en ville.","Experiencias":"Expériences","Vive Río con mi equipo local.":"Vivez Rio avec mon équipe locale.","Playas":"Plages","Encuentra tu playa y tu momento.":"Trouvez la plage qui vous convient.","Vida Nocturna":"Vie nocturne","Samba, música y noches cariocas.":"Samba, musique et nuits cariocas.","Gastronomía":"Gastronomie","Dónde comer según tu momento.":"Où manger selon vos envies.","Arte y Cultura":"Arts et culture","Museos, teatros, centros culturales, bibliotecas, fuertes e iglesias.":"Musées, théâtres, centres culturels, bibliothèques, forts et églises.","Atracciones":"Incontournables","Los clásicos y lo que hay detrás.":"Les classiques et ce qui se cache derrière.","Familia":"Famille","Río también con niños y familia.":"Rio aussi avec les enfants et en famille.","Café Río":"Café Rio","Mi marca de café saborizado: un recuerdo de Brasil con ADN Ernestinho.":"Ma marque de café aromatisé : un souvenir du Brésil à l’ADN Ernestinho.","Consejos":"Conseils","Lo que me gustaría que supieras antes.":"Ce que j’aimerais que vous sachiez avant de partir.","Naturaleza":"Nature","Te cuento cómo vivir Río entre sus miradores y paisajes verdes.":"Mes conseils pour découvrir les belvédères et les paysages verts de Rio.","EXPLORAR →":"EXPLORER →","EXPLORAR":"EXPLORER","Full Day Río":"Journée complète à Rio","Un día completo para conectar los grandes lugares de la ciudad.":"Une journée pour relier les grands sites de la ville.","Vuelo en parapente":"Vol en parapente","Parapente desde Parque da Cidade, Niterói, sujeto a las condiciones del viento.":"Vol en parapente depuis le Parque da Cidade, à Niterói, selon les conditions de vent.","Un día de partido en Maracaná":"Une journée de match au Maracanã","Vive el fútbol carioca con acompañamiento y logística organizada.":"Vivez le football carioca avec accompagnement et logistique organisée.","Historia, fantasías, samba y bastidores del carnaval carioca.":"Histoire, costumes, samba et coulisses du carnaval carioca.","Recorrido panorámico musical con libertad para subir y bajar.":"Parcours panoramique en musique avec arrêts libres.","Aguas cristalinas, paseo en barco y un día fuera de Río.":"Eaux cristallines, sortie en bateau et escapade hors de Rio.","Islas, navegación y playas en un día completo.":"Îles, navigation et plages le temps d’une journée."};
const translations = {...data,...fallback};
let scheduled=false;
function localize(){
  document.documentElement.lang='fr';
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
  const isPreview=location.pathname.startsWith('/fr-vista-luna/');
  const previewRoot=isPreview?'/fr-vista-luna/':'/';
  const readyRoutes=new Set(['','fr/','fr/guia/','fr/guia/dinero/','fr/guia/aeropuertos/','fr/guia/emergencias/','fr/guia/viajar-solo/','fr/guia/vacunas/','fr/guia/apps/','fr/guia/consulados/','fr/guia/menores/','fr/guia/permanencia/','fr/guia/internet/','fr/transportes/']);
  for(const link of document.querySelectorAll('a[href]')){
    const raw=link.getAttribute('href');
    if(!raw||raw.startsWith('#')||/^(?:mailto:|tel:|javascript:|data:)/i.test(raw))continue;
    let url;try{url=new URL(raw,location.href)}catch{continue}
    const onProductionFr=location.pathname.startsWith('/fr/');
    if(onProductionFr && url.origin===location.origin && !url.pathname.startsWith('/fr/')){
      const productionPath=url.pathname.startsWith('/')?url.pathname.slice(1):url.pathname;
      if(productionPath==='' || readyRoutes.has('fr/'+productionPath)){
        link.href=location.origin+'/fr/'+productionPath+url.search+url.hash;
        continue;
      }
    }
    const pagePath=url.pathname.startsWith(previewRoot)?url.pathname.slice(previewRoot.length):null;
    if(isPreview && url.origin===location.origin && pagePath===null){
      const sourcePath=url.pathname.replace(/^\/+/, '');
      if(readyRoutes.has('fr/'+sourcePath)){
        link.href=location.origin+previewRoot+'fr/'+sourcePath+url.search+url.hash;
        continue;
      }
    }
    if(url.origin===location.origin && pagePath!==null && !pagePath.startsWith('assets/')){
      if(readyRoutes.has(pagePath))continue;
      // An unfinished French route must lead to the approved Spanish source, never a 404.
      const untranslated=pagePath.startsWith('fr/')?pagePath.slice(3):pagePath;
      if(!untranslated.startsWith('api/') && !untranslated.startsWith('.well-known/'))link.href=ROOT+untranslated+url.search+url.hash;
    }
  }
  for(const el of document.querySelectorAll('[src],[srcset]')){
    const src=el.getAttribute('src');
    if(src?.startsWith('/assets/'))el.setAttribute('src',(location.pathname.startsWith('/fr-vista-luna/')?'/fr-vista-luna':'')+src);
  }
}
localize();
new MutationObserver(()=>{
  if(scheduled)return;
  scheduled=true;
  queueMicrotask(()=>{scheduled=false;localize()});
}).observe(document.body,{subtree:true,childList:true,characterData:true});
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
