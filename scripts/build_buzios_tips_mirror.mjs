import{page,T,v,pre,esc,para,photo,hosted}from'./buzios_mirror_core.mjs';
import{buziosConsejosPages as pages,buziosConsejosIndex as hub}from'../assets/js/buzios-consejos-pages.js';
export const tipsMirrorRoutes=['/destinos/buzios/consejos/',...Object.keys(pages)];
const w=(l,es,pt,en)=>v(T(es,pt,en),l);
export function renderBuziosTipsMirror(route,l){
 if(route==='/destinos/buzios/consejos/')return renderTipsIndex(route,l);
 const p=pages[route];if(!p)throw Error('Unknown tips '+route);
 const body='<main class="advice" id="contenido"><a href="'+pre(l)+'/destinos/buzios/consejos/">← '+w(l,'Todos los consejos','Todas as dicas','All tips')+'</a><p class="kicker">'+v(p.eyebrow,l)+'</p><h1>'+v(p.title,l)+'</h1>'+para(p.intro,l)+(p.hero?photo(p.hero,v(p.title,l),'midphoto'):'')+'<section class="list">'+p.sections.map((s,i)=>'<section><h2>'+v(s.title,l)+'</h2>'+para(s.lead,l)+s.items.map(item=>'<article><h3>'+esc(v(item.title,l))+'</h3>'+para(item.text,l)+'</article>').join('')+'</section>').join('')+'</section><div class="best"><b>'+w(l,'EL CONSEJO DE ERNESTINHO','A DICA DO ERNESTINHO','ERNESTINHO’S TIP')+'</b><p>'+w(l,'Elige por zonas, deja tiempo para disfrutar y confirma los detalles del día antes de salir. Un plan flexible te permite aprovechar Búzios con más calma.','Escolha por regiões, deixe tempo para curtir e confirme os detalhes do dia antes de sair. Um plano flexível permite aproveitar Búzios com mais calma.','Plan by area, leave time to enjoy yourself and check that day’s details before heading out. A flexible plan lets you enjoy Búzios at a calmer pace.')+'</p></div><div class="gold">'+p.related.map(a=>'<a href="'+pre(l)+a.href+'">'+v(a.title,l)+'</a>').join(' · ')+'</div></main>';
 return page(route,l,v(p.title,l),v(p.description,l),body,{template:'consejos/20-consejos'});
}

function renderTipsIndex(route, language) {
  const copy = value => esc(v(value, language));
  const title = (es, pt, en) => copy(T(es, pt, en));
  const [essential, ...advice] = hub.sections[0].items;
  const guide = {
    title: T('Guía completa antes del viaje', 'Guia completo antes da viagem', 'Complete guide before your trip'),
    href: '/destinos/buzios/guia/',
    photo: { src: '/assets/images/buzios/bardot-mtur.webp' },
  };
  const covers = {
    '/destinos/buzios/consejos/supermercados/': hosted('miniatura supermercados en buzios.webp'),
    '/destinos/buzios/consejos/lluvia/': 'https://mediumturquoise-stinkbug-270478.hostingersite.com/FOTOS/HOME/BUZIOS/DONDE%20COMER/BALTHAZAR%20BAKERY/830754886_18446922934131610_6480389713568833620_n.jpg',
    '/destinos/buzios/consejos/atardeceres/': hosted('barrios/porto-da-barra.jpg'),
  };
  const tile = item => `<a class="ec-card" href="${pre(language)}${item.href}" aria-label="${copy(item.title)}">
    <img src="${esc(covers[item.href] ?? item.photo.src)}" alt="${copy(item.title)}" loading="lazy"><span class="ec-label">${copy(item.title)}</span>
  </a>`;
  const quick = [
    [T('Pix', 'Pix', 'Pix'), '/destinos/buzios/guia/pix/', T('Cómo organizar pagos y efectivo.', 'Como organizar pagamentos e dinheiro.', 'Planning payments and cash.')],
    [T('Portugués', 'Português', 'Portuguese'), '/consejos/portugues/', T('Frases que ayudan durante el viaje.', 'Frases úteis durante a viagem.', 'Useful phrases for the trip.')],
    [T('Electricidad', 'Eletricidade', 'Electricity'), '/destinos/buzios/guia/electricidad/', T('Enchufes y adaptadores para tu equipo.', 'Tomadas e adaptadores para seus aparelhos.', 'Plugs and adapters for your devices.')],
    [T('Seguros', 'Seguros', 'Insurance'), '/destinos/buzios/guia/seguro/', T('Qué revisar antes de contratar.', 'O que conferir antes de contratar.', 'What to check before buying.')],
  ];
  const body = `<main id="contenido">
    <section class="ec-consejos-head"><div class="ec-wrap">
      <span>${title('Consejos reales y sin complicaciones', 'Dicas práticas e sem complicação', 'Practical tips without complications')}</span>
      <h1>${copy(hub.title)}</h1><p>${copy(hub.intro)}</p>
    </div></section>
    <section class="ec-consejos-body"><div class="ec-wrap">
      <h2>${title('Consejos esenciales', 'Dicas essenciais', 'Essential tips')}</h2>
      <div class="ec-grid ec-grid-essential" id="essential-grid">${[essential, guide].map(tile).join('')}</div>
      <h2 class="ec-second">${title('Organiza y vive tu viaje', 'Organize e viva sua viagem', 'Plan and enjoy your trip')}</h2>
      <div class="ec-grid" id="advice-grid">${advice.map(tile).join('')}</div>
    </div></section>
    <section class="rio-route-index"><div class="rio-route-index__inner">
      <span class="rio-route-index__eyebrow">BRASIL</span>
      <h2>${title('Pequeñas dudas que cambian el día', 'Pequenas dúvidas que mudam o dia', 'Small questions that change the day')}</h2>
      <p class="rio-route-index__lead">${title('Resuelve cómo pagar, qué adaptador llevar y qué revisar antes de salir a recorrer Búzios.', 'Resolva como pagar, qual adaptador levar e o que conferir antes de sair para conhecer Búzios.', 'Work out how to pay, which adapter to pack and what to check before exploring Búzios.')}</p>
      <div class="rio-route-index__grid">${quick.map(([label, href, description]) => `<a class="rio-route-index__item" href="${pre(language)}${href}"><h3>${copy(label)}</h3><p>${copy(description)}</p><span>${title('ABRIR GUÍA', 'ABRIR GUIA', 'OPEN GUIDE')} →</span></a>`).join('')}</div>
    </div></section>
  </main>`;
  return page(route, language, v(hub.title, language), v(hub.description, language), body, { template: 'consejos', css: ['consejos'] });
}
