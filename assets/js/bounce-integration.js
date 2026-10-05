import {routeParts,localizedPath} from './locale-routing.js';
import {ready as navigationReady} from './site.js';
import {bounceMarkup,mountBounce} from './bounce.js';
const thumbnail='https://res.cloudinary.com/tdez3h4t/image/upload/v1791159666/boton_maletas_bounce.png';
const routes={
 '/hospedaje/':['hospedaje','compact'],
 '/guia/aeropuertos/':['aeropuerto','wide'],
 '/guia/terminales/':['rodoviaria','compact'],
 '/consejos/maletas-rio/':['guia-maleta',null],
 '/consejos/rio-1-a-7-dias/':['ultimo-dia',null],
 '/consejos/revisar-alojamiento/':['ultimo-dia',null],
 '/destinos/buzios/como-llegar/':['buzios',null],
 '/destinos/buzios/cruceros/':['buzios',null]
};
const texts={
 ES:{title:'¿Qué haces con las maletas antes de seguir?',body:'Si sales antes del check-in o después del checkout, consulta primero tu alojamiento. Para unas horas libres en Río, compara guarda equipaje y organiza la retirada antes de tu vuelo, bus o transfer.',link:'Dónde guardar las maletas en Río',card:'Guarda equipaje',alt:'Maletas y guarda equipaje',open:'ABRIR GUÍA →'},
 PT:{title:'Onde deixar as malas antes de seguir?',body:'Se chegar antes do check-in ou sair após o check-out, consulte primeiro a hospedagem. Para algumas horas livres no Rio, compare guarda-volumes e organize a retirada antes do voo, ônibus ou transfer.',link:'Onde guardar malas no Rio',card:'Guarda-volumes',alt:'Bagagem e guarda-volumes',open:'ABRIR GUIA →'},
 EN:{title:'What happens to your bags before the next stage?',body:'If you arrive before check-in or leave after checkout, ask your accommodation first. For spare hours in Rio, compare luggage storage and plan collection before your flight, bus or transfer.',link:'Where to store luggage in Rio',card:'Luggage storage',alt:'Luggage storage',open:'OPEN GUIDE →'}
};
export function apply(){
 const {path,language:lang}=routeParts(),c=texts[lang],href=localizedPath('/guia/guarda-equipaje/',lang);
 if(path==='/guia/'){
  const grids=document.querySelectorAll('.guide-grid'),grid=grids[grids.length-1];if(!grid)return;
  let a=document.getElementById('ec-luggage-guide-card');if(!a){a=document.createElement('a');a.id='ec-luggage-guide-card';grid.append(a);}a.href=href;a.innerHTML=`<img class="guide-thumb" src="${thumbnail}" alt="${c.alt}" width="600" height="400" loading="lazy" decoding="async"><b>${c.card}</b><span>${c.open}</span>`;return;
 }
 const config=routes[path];if(!config)return;
 let aside=document.getElementById('ec-luggage-continuation');if(!aside){aside=document.createElement('aside');aside.id='ec-luggage-continuation';aside.className='ec-luggage-bridge';document.querySelector('main')?.append(aside);}
 const [source,variant]=config;
 const body=source==='buzios'?{ES:'Si tu viaje conecta Búzios con unas horas en Río, resuelve dónde dejar y recoger el equipaje en Río antes del vuelo o traslado. No se presupone guarda equipaje disponible en el desembarque de Búzios.',PT:'Se a viagem combina Búzios com algumas horas no Rio, resolva onde deixar e buscar a bagagem no Rio antes do voo ou transfer. Não se presume guarda-volumes no desembarque de Búzios.',EN:'If your trip combines Búzios with spare hours in Rio, plan where to leave and collect your bags in Rio before the flight or transfer. Storage at the Búzios landing point is not assumed.'}[lang]:c.body;
 aside.innerHTML=`<h2>${c.title}</h2><p>${body}</p><a href="${href}">${c.link} →</a>${variant?bounceMarkup(lang,variant,source):''}`;mountBounce(aside);
}
export const ready=navigationReady.then(apply);
