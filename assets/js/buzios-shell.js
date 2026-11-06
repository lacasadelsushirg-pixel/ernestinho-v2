// Búzios-only shell. Reuses the existing destination bar and Río corporate footer.
import {renderBuziosCategoryNav} from './buzios-taxonomy.js?v=20261105-rio-parity';
const copy={"ES": ["¿QUIERES CONOCER BÚZIOS<br>CONMIGO?", "Diseñamos tu itinerario o te acompaño en un tour privado exclusivo.", "HABLAR CON ERNESTINHO POR WHATSAPP", "BÚZIOS, DESDE MI MIRADA", "© 2026 Ernestinho Carioca. Todos los derechos reservados.", "Diseñado para viajeros que buscan vivir Búzios de forma real y auténtica.", "Privacidad, precios y condiciones", "Hola Ernestinho, quiero conocer Búzios contigo."], "PT": ["QUER CONHECER BÚZIOS<br>COMIGO?", "Planejamos seu roteiro ou acompanho você em um passeio privativo exclusivo.", "FALAR COM ERNESTINHO PELO WHATSAPP", "BÚZIOS, PELO MEU OLHAR", "© 2026 Ernestinho Carioca. Todos os direitos reservados.", "Feito para viajantes que querem viver Búzios de forma real e autêntica.", "Privacidade, preços e condições", "Olá Ernestinho, quero conhecer Búzios com você."], "EN": ["WANT TO EXPLORE BÚZIOS<br>WITH ME?", "We plan your itinerary or I accompany you on an exclusive private tour.", "TALK TO ERNESTINHO ON WHATSAPP", "BÚZIOS, THROUGH MY EYES", "© 2026 Ernestinho Carioca. All rights reserved.", "Designed for travellers seeking an authentic Búzios experience.", "Privacy, prices and terms", "Hi Ernestinho, I would like to explore Búzios with you."]};
const template="\n    <div class=\"ec-closing-cta\">\n      <div><h2>¿QUIERES CONOCER RÍO<br>CONMIGO?</h2><p>Diseñamos tu itinerario o te acompaño en un tour privado exclusivo.</p></div>\n      <a href=\"https://wa.me/5521969946938?text=Hola%20Ernestinho%2C%20quiero%20conocer%20R%C3%ADo%20contigo.\" target=\"_blank\" rel=\"noopener noreferrer\"><span aria-hidden=\"true\">●</span> HABLAR CON ERNESTINHO POR WHATSAPP</a>\n    </div>\n    <footer class=\"ec-corporate-footer\">\n      <div class=\"ec-footer-brand\"><img src=\"/assets/brand/ec-mark.png\" alt=\"Ernestinho Carioca\" width=\"60\" height=\"60\" decoding=\"async\"><div><strong>ERNESTINHO <em>CARIOCA</em></strong><small>RÍO DE JANEIRO, DESDE MI MIRADA</small></div></div>\n      <div class=\"ec-footer-legal\"><p>© 2026 Ernestinho Carioca. Todos los derechos reservados.</p><p>Diseñado para viajeros que buscan vivir Río de forma real y auténtica.</p><a href=\"/privacidad-precios-condiciones/\">Privacidad, precios y condiciones</a></div>\n    </footer>";
function applyShell(){
 if(!/\/destinos\/buzios\//.test(location.pathname))return;
 const lang=location.pathname.startsWith('/pt/')?'PT':location.pathname.startsWith('/en/')?'EN':'ES';
 const prefix=lang==='ES'?'':'/'+lang.toLowerCase();
 const bars=[...document.querySelectorAll('.bz-destination-nav')];
 if(bars.length>1){const keep=bars.find(n=>n.closest('#bz-app'))||bars[0];for(const bar of bars)if(bar!==keep)bar.remove();}
 if(!document.querySelector('.bz-destination-nav')){
  const anchor=document.querySelector('#bz-app,main');
  if(anchor)anchor.insertAdjacentHTML('beforebegin',renderBuziosCategoryNav(lang));
 }
 const bar=document.querySelector('.bz-destination-nav');
 if(bar&&!bar.dataset.bzShell){const holder=document.createElement('div');holder.innerHTML=renderBuziosCategoryNav(lang);const replacement=holder.firstElementChild;replacement.dataset.bzShell='20261105';bar.replaceWith(replacement);}
 // The old CTA placeholder must not suppress the real corporate footer.
 const old=document.querySelector('#bz-footer');
 if(old){old.classList.remove('ec-corporate-closing');old.hidden=true;}
 if(!document.querySelector('.ec-corporate-footer')){
  const root=document.createElement('section');root.className='ec-corporate-closing';root.innerHTML=template;
  document.body.append(root);
 }
 const root=document.querySelector('.ec-corporate-footer')?.closest('.ec-corporate-closing');
 if(root&&root.dataset.bzLocale!==lang){
  root.dataset.bzLocale=lang;
  const c=copy[lang];
  root.querySelector('.ec-closing-cta h2').innerHTML=c[0];
  root.querySelector('.ec-closing-cta p').textContent=c[1];
  const contact=root.querySelector('.ec-closing-cta a');contact.innerHTML='<span aria-hidden="true">●</span> '+c[2];contact.href='https://wa.me/5521969946938?text='+encodeURIComponent(c[7]);
  root.querySelector('.ec-footer-brand small').textContent=c[3];
  const ps=root.querySelectorAll('.ec-footer-legal p');ps[0].textContent=c[4];ps[1].textContent=c[5];
  const legal=root.querySelector('.ec-footer-legal a');legal.textContent=c[6];legal.href=prefix+'/privacidad-precios-condiciones/';
 }
 // Existing profiles must link to the published accommodation guide.
 // site.js may finish mounting Cadastur after the first shell pass.
 // Reconcile only differing text so the observer reaches a stable state.
 if(root){
  const c=copy[lang],ps=root.querySelectorAll('.ec-footer-legal p');
  for(const [i,text] of [[0,c[4]],[1,c[5]]])if(ps[i]&&ps[i].textContent!==text)ps[i].textContent=text;
  const contact=root.querySelector('.ec-closing-cta a'),href='https://wa.me/5521969946938?text='+encodeURIComponent(c[7]);
  if(contact&&contact.getAttribute('href')!==href)contact.setAttribute('href',href);
 }
 for(const a of document.querySelectorAll('a[href]')){
  if(a.getAttribute('href')===prefix+'/destinos/buzios/alojamiento/tartaruga/')a.href=prefix+'/destinos/buzios/alojamiento/';
 }
}
let pending=false;
const observer=new MutationObserver(()=>{if(pending)return;pending=true;queueMicrotask(()=>{pending=false;applyShell();});});
observer.observe(document.body,{childList:true,subtree:true});
applyShell();
export {applyShell};
