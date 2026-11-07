import { page, T, v, pre, esc } from './buzios_mirror_core.mjs';
import { neighborhoodCorridors } from '../assets/js/translations/chunks/buzios-neighborhood-corridors.js';
import { buziosNeighborhoods } from '../assets/js/buzios-neighborhoods.js';

const base = '/destinos/buzios/barrios/';
const words = {
  label: T('GUÍA DE ZONA', 'GUIA DE REGIÃO', 'AREA GUIDE'),
  title: T('Empieza por un corredor', 'Comece por um corredor', 'Start with an area'),
  lead: T('Elige una zona para ver sus playas, cómo moverte, dónde comer y los recorridos que yo combinaría.', 'Escolha uma região para ver praias, como circular, onde comer e os roteiros que eu combinaria.', 'Choose an area for beaches, ways to get around, food stops and routes I’d combine.'),
  places: T('Algunos lugares de la guía', 'Alguns lugares do guia', 'Places in this guide'),
  open: T('VER GUÍA POR ZONA', 'VER GUIA DA REGIÃO', 'OPEN AREA GUIDE'),
};

export const corridorRoutes = neighborhoodCorridors.map(corridor => base + corridor.slug + '/');

export function corridorIndex(language) {
  const copy = value => esc(v(value, language));
  const cards = neighborhoodCorridors.map(corridor => `
    <a class="bh-cluster" href="${pre(language)}${base}${corridor.slug}/">
      <p class="bh-cluster-label">${copy(words.label)}</p>
      <h3>${copy(corridor.name)}</h3>
      <p class="bh-cluster-intro">${copy(corridor.intro)}</p>
      <strong>${copy(words.places)}</strong>
      <ul>${corridor.places.slice(0, 4).map(place => `<li>${esc(place)}</li>`).join('')}</ul>
      <span class="bh-cluster-cta">${copy(words.open)} →</span>
    </a>`).join('');

  return `<section class="editorial bh-zone-index">
    <div class="section-head"><p class="kicker">BÚZIOS</p><h2>${copy(words.title)}</h2><p>${copy(words.lead)}</p></div>
    <div class="bh-clusters">${cards}</div>
  </section>`;
}

export function renderNeighborhoodCorridor(route, language) {
  const corridor = neighborhoodCorridors.find(item => route === base + item.slug + '/');
  if (!corridor) throw new Error('Unknown Búzios corridor: ' + route);
  const copy = value => esc(v(value, language));
  const title = (es, pt, en) => copy(T(es, pt, en));
  const list = (items, className = '') => `<ul class="${className}">${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>`;
  const card = (heading, content) => `<article class="bh-card"><h2>${heading}</h2>${content}</article>`;
  const paragraph = value => `<p>${copy(value)}</p>`;
  const related = corridor.neighborhoods.map(slug => {
    const neighborhood = buziosNeighborhoods.find(item => item.slug === slug);
    return `<a href="${pre(language)}${base}${slug}/">${copy(neighborhood.name)} →</a>`;
  }).join('');

  const body = `<main id="contenido">
    <section class="hero" style="min-height:48vh"><div class="hero-copy">
      <p class="kicker">BÚZIOS · ${copy(words.label)}</p><h1>${copy(corridor.name)}</h1>
      <p class="lead">${copy(corridor.intro)}</p>
    </div></section>
    <section class="bh-wrap">
      <div class="bh-grid">
        ${card(title('Qué pone esta zona en el mapa', 'O que destaca esta região', 'What puts this area on the map'), list(corridor.places, 'bh-tags'))}
        ${card(title('Qué buscar para comer', 'O que procurar para comer', 'What to look for when eating out'), list(v(corridor.food, language)))}
        ${card(title('Cómo organizar el paseo', 'Como organizar o passeio', 'How to plan the outing'), list(v(corridor.mobility, language)))}
        ${card(title('Rutas que yo combinaría', 'Roteiros que eu combinaria', 'Routes I’d combine'), `<div class="bh-routes">${corridor.routes.map(([path, name]) => `<div><b>${copy(name)}</b><span>${esc(path)}</span></div>`).join('')}</div>`)}
        ${card(title('Para quién y en qué momento', 'Para quem e em que momento', 'Who it suits and when to go'), paragraph(corridor.audience) + paragraph(corridor.timing))}
        ${card(title('Antes de ir', 'Antes de ir', 'Before you go'), paragraph(corridor.check) + `<p><strong>${title('Mi consejo', 'Minha dica', 'My tip')}</strong></p>` + paragraph(corridor.tip))}
      </div>
      <h2 style="margin:34px 0 16px">${title('Abre cada barrio', 'Abra cada bairro', 'Explore each neighbourhood')}</h2>
      <div class="bh-related">${related}</div>
      <p style="margin-top:28px"><a href="${pre(language)}${base}">← ${title('Volver a Barrios', 'Voltar a Bairros', 'Back to neighbourhoods')}</a></p>
    </section>
    <section class="b"><div class="g">
      <article class="p"><h2>${title('Elige dónde empezar y terminar', 'Escolha onde começar e terminar', 'Choose where to start and finish')}</h2>
        <p>${title('Abre primero la ficha del barrio donde comienza tu plan. Ahí puedes ubicar las paradas y decidir qué tramo vale la pena hacer a pie.', 'Abra primeiro a ficha do bairro onde seu passeio começa. Assim você localiza as paradas e decide qual trecho vale fazer a pé.', 'Start with the neighbourhood guide where your outing begins. Use it to locate stops and decide which stretch to walk.')}</p></article>
      <article class="p"><h2>${title('Deja margen para el regreso', 'Deixe tempo para a volta', 'Leave time to get back')}</h2>
        <p>${title('Antes de reservar una mesa al final del paseo, confirma el punto de recogida y calcula el trayecto con margen. Si el día cambia, acorta el recorrido y conserva la parada que más te interesa.', 'Antes de reservar uma mesa no fim do passeio, confirme o ponto de embarque e deixe uma folga no trajeto. Se o dia mudar, encurte o roteiro e mantenha a parada que mais interessa.', 'Before booking a table at the end of the outing, confirm your pickup point and allow time for the journey. If plans change, shorten the route and keep the stop you most want to see.')}</p></article>
    </div></section>
  </main>`;
  return page(route, language, v(corridor.name, language), v(corridor.intro, language), body, { template: 'barrios/ipanema-leblon', css: ['barrios'] });
}
