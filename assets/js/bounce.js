// The image language is editorially approved; never infer it from filenames.
export const BOUNCE_URL='https://go.bounce.com/ERNESTINHO8980973466';
export const BOUNCE_IMAGES={
 ES:{vertical:'https://res.cloudinary.com/tdez3h4t/image/upload/v1791153274/Guarda_tu_equipaje_y_disfruta_R%C3%ADo.png',compact:'https://res.cloudinary.com/tdez3h4t/image/upload/v1791153274/%C3%9Altimo_d%C3%ADa_en_R%C3%ADo_sin_maletas.png',wide:'https://res.cloudinary.com/tdez3h4t/image/upload/v1791153272/Disfruta_R%C3%ADo_sin_cargar_maletas.png'},
 PT:{vertical:'https://res.cloudinary.com/tdez3h4t/image/upload/v1791153276/Descubra_o_Rio_sem_Malas.png',compact:'https://res.cloudinary.com/tdez3h4t/image/upload/v1791153272/Explore_o_Rio_Sem_Malas.png',wide:'https://res.cloudinary.com/tdez3h4t/image/upload/v1791153274/Confira_o_Rio_Sem_Malas.png'},
 EN:{vertical:'https://res.cloudinary.com/tdez3h4t/image/upload/v1791153280/Guarda_Maletas_y_Descubre_R%C3%ADo.png',compact:'https://res.cloudinary.com/tdez3h4t/image/upload/v1791153275/Escapada_a_R%C3%ADo_sin_maletas.png',wide:'https://res.cloudinary.com/tdez3h4t/image/upload/v1791153272/Anuncio_de_viaje_en_R%C3%ADo_con_Bounce.png'}
};
const copy={ES:{cta:'Buscar guarda equipaje en Bounce',alt:'Bounce: disfruta Río sin maletas',disclosure:'Enlace de afiliación: Ernestinho puede recibir una comisión por una reserva. Revisa ubicación, horario, precio y condiciones en Bounce antes de pagar.'},PT:{cta:'Buscar guarda-volumes na Bounce',alt:'Bounce: aproveite o Rio sem malas',disclosure:'Link de afiliado: Ernestinho pode receber uma comissão por uma reserva. Confira localização, horário, preço e condições na Bounce antes de pagar.'},EN:{cta:'Find luggage storage on Bounce',alt:'Bounce: enjoy Rio without luggage',disclosure:'Affiliate link: Ernestinho may earn a commission from a booking. Check the location, hours, price and terms on Bounce before paying.'}};
export function bounceMarkup(language,variant='compact',source='guia-equipaje'){
 if(!BOUNCE_IMAGES[language]?.[variant])throw new Error('Unknown Bounce locale or variant');
 // Keep the supplied map intact. Four files contradict their approved visual language.
 // Until corrected creatives arrive, show only a verified file from the same locale.
 if(language==='ES'&&variant!=='compact')variant='compact';
 if(language==='EN'&&variant!=='wide')variant='wide';
 if(!/^[a-z-]+$/.test(source))throw new Error('Invalid Bounce source');
 const c=copy[language];
 const [width,height]=variant==='vertical'?[887,1774]:language==='EN'||variant==='wide'&&language==='PT'?[1536,1024]:[1942,809];
 return `<aside class="ec-bounce ec-bounce-${variant}" data-bounce-source="${source}" data-bounce-language="${language}" data-bounce-variant="${variant}" style="--bounce-ratio:${width}/${height}"><a href="${BOUNCE_URL}" target="_blank" rel="sponsored noopener noreferrer" data-bounce-click><img src="${BOUNCE_IMAGES[language][variant]}" width="${width}" height="${height}" alt="${c.alt}" loading="lazy" decoding="async"><span class="ec-bounce-cta">${c.cta} ↗</span></a><p class="ec-bounce-disclosure">${c.disclosure}</p></aside>`;
}
function track(name,node){const params={bounce_source:node.dataset.bounceSource};if(typeof window.gtag==='function')window.gtag('event',name,params);else{window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:name,...params});}}
export function mountBounce(root=document){
 for(const node of root.querySelectorAll('[data-bounce-source]')){
  if(node.dataset.bounceMounted)continue;node.dataset.bounceMounted='1';
  for(const a of node.querySelectorAll('[data-bounce-click]'))a.addEventListener('click',()=>track('bounce_click',node));
  const viewed=()=>{if(node.dataset.bounceViewed)return;node.dataset.bounceViewed='1';track('bounce_view',node);};
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){viewed();observer.disconnect();}},{threshold:.25});observer.observe(node);}else viewed();
 }
}
