import { esc, pre, styles, v } from './buzios_mirror_core.mjs';
import { t } from '../assets/js/translations/destinos/modelo.js';
import { regionalVenues } from '../assets/js/translations/destinos/mesas-regionales.js';
import { petrExpansion } from '../assets/js/translations/destinos/petropolis-mesas-ampliacion.js';
import { categories, venues } from '../assets/js/translations/destinos/petropolis-mesas.js';

import { investigatedVenues } from '../assets/js/translations/destinos/petropolis-mesas-investigadas.js';

const base = destination => '/destinos/' + destination.slug + '/';
const petropolis = Object.fromEntries(Object.entries(venues).map(([section, items]) =>
  [section, { ...items, ...petrExpansion[section], ...investigatedVenues[section] }]));
const catalogs = { petropolis, ...regionalVenues };
export const venueRoutes = Object.entries(petropolis).flatMap(([section, items]) => Object.keys(items).map(slug => [section, slug]));
export const otherVenueRoutes = Object.entries(regionalVenues).flatMap(([city, catalog]) =>
  Object.entries(catalog).flatMap(([section, items]) => Object.keys(items).map(slug => [city, section, slug])));
const words = {
  gastronomia: t('Gastronomía en Petrópolis', 'Gastronomia em Petrópolis', 'Food in Petrópolis'),
  'vida-nocturna': t('Vida nocturna en Petrópolis', 'Vida noturna em Petrópolis', 'Nightlife in Petrópolis'),
  foodIntro: t('Elige un restaurante o un café y abre su ficha para ver dónde queda, qué pedir y con qué combinarlo.', 'Escolha um restaurante ou café e abra a ficha para ver onde fica, o que pedir e com o que combinar.', 'Choose a restaurant or café and open its guide for the location, what to order and nearby stops.'),
  nightIntro: t('Bares, gastropubs y casas con música. Abre la ficha de cada lugar para elegir dónde pasar la noche.', 'Bares, gastropubs e casas com música. Abra a ficha de cada lugar para escolher onde passar a noite.', 'Bars, gastropubs and music venues. Open each guide to choose where to spend the evening.'),
  search: t('Buscar por nombre o estilo', 'Buscar por nome ou estilo', 'Search by name or style'),
  category: t('Tipo de lugar', 'Tipo de lugar', 'Venue type'),
  all: t('Todos', 'Todos', 'All'),
  empty: t('No hay resultados para esa búsqueda.', 'Nenhum resultado para essa busca.', 'No results for that search.'),
  open: t('Abrir ficha →', 'Abrir ficha →', 'Open guide →'),
  directory: t('Encuentra tu próximo lugar', 'Encontre seu próximo lugar', 'Find your next stop'),
  location: t('Dirección', 'Endereço', 'Address'),
  practical: t('Información práctica', 'Informações práticas', 'Practical information'),
  format: t('Formato', 'Formato', 'Format'),
  experience: t('Qué pedir y por qué', 'O que pedir e por quê', 'What to order and why'),
  evening: t('Cómo se vive la noche', 'Como é a noite', 'What the evening is like'),
  advice: t('Mi consejo Ernestinho', 'Minha dica do Ernestinho', 'My Ernestinho tip'),
  nearby: t('Ver la ficha relacionada →', 'Ver a ficha relacionada →', 'Open the related guide →'),
  return: t('Volver al listado', 'Voltar à lista', 'Back to the directory'),
  transit: t('Cómo moverse en Petrópolis', 'Como se locomover em Petrópolis', 'Getting around Petrópolis'),
};
const text = (message, lang) => esc(v(message, lang));
const anchor = (route, label, lang, css = '') => `<a${css ? ` class="${css}"` : ''} href="${pre(lang) + route}">${text(label, lang)}</a>`;

const filterScript = `<script type="module">
  const directory = document.querySelector('[data-petr-venues]');
  const search = directory.querySelector('input[type="search"]');
  const type = directory.querySelector('select');
  const cards = [...directory.querySelectorAll('[data-venue]')];
  const count = directory.querySelector('output');
  const empty = directory.querySelector('[data-empty]');
  const normalize = value => value.normalize('NFD').replace(/\\p{Diacritic}/gu, '').toLowerCase().trim();
  function update() {
    const query = normalize(search.value);
    let total = 0;
    for (const card of cards) {
      const matches = (!type.value || card.dataset.category === type.value) && normalize(card.textContent).includes(query);
      card.hidden = !matches;
      if (matches) total++;
    }
    count.value = total;
    empty.hidden = total !== 0;
  }
  directory.addEventListener('input', update);
  directory.addEventListener('change', update);
  update();
</script>`;

function directory(destination, section, lang) {
  const food = section === 'gastronomia';
  const title = destination.slug === 'petropolis' ? words[section] : food
    ? t('Gastronomía en ' + destination.name, 'Gastronomia em ' + destination.name, 'Food in ' + destination.name)
    : t('Vida nocturna en ' + destination.name, 'Vida noturna em ' + destination.name, 'Nightlife in ' + destination.name);
  const intro = words[food ? 'foodIntro' : 'nightIntro'];
  const items = Object.entries(catalogs[destination.slug][section]);
  const types = [...new Set(items.map(([, item]) => item.category))];
  const search = `<label for="petr-venue-search">${text(words.search, lang)}</label>
    <input id="petr-venue-search" class="search" type="search" autocomplete="off">
    <label for="petr-venue-type">${text(words.category, lang)}</label>
    <select id="petr-venue-type"><option value="">${text(words.all, lang)}</option>
    ${types.map(id => `<option value="${id}">${text(categories[id], lang)}</option>`).join('')}</select>
    <output class="count" aria-live="polite">${items.length}</output>`;
  const cards = items.map(([slug, item]) => {
    const category = text(categories[item.category], lang);
    const label = esc(item.name);
    const description = text(item.summary, lang);
    const href = pre(lang) + base(destination) + section + '/' + slug + '/';
    const venueButton = destination.slug === 'petropolis' ? `<strong class="rd-action">${text(words.open, lang)}</strong>` : '';
    return food
      ? `<a class="restaurant" href="${href}" data-venue data-category="${item.category}"><div class="restaurant-content">
        <h3>${label}</h3><p class="restaurant-place">${esc(item.area)} · ${category}</p>
        <p class="restaurant-description">${description}</p><span class="restaurant-link">${text(words.open, lang)}</span></div></a>`
      : `<a href="${href}" data-venue data-category="${item.category}"><b>${label}</b><span>${category} · ${description}</span>${venueButton}</a>`;
  }).join('');
  const empty = `<p data-empty hidden>${text(words.empty, lang)}</p>`;
  const body = food
    ? `<div class="gast-shell" data-petr-venues><section class="gast-hero"><div class="gast-hero-inner"><p class="gast-eyebrow">ERNESTINHO CARIOCA</p>
      <h1>${text(title, lang)}</h1><p class="gast-intro">${text(intro, lang)}</p></div></section>
      <section class="gast-catalog"><div class="gast-section-heading"><h2>${text(words.directory, lang)}</h2></div>
      <div class="catalog-controls">${search}</div><div class="restaurant-grid">${cards}</div>${empty}</section></div>`
    : `<div data-petr-venues><section class="hero"${destination.slug === 'petropolis' ? ' style="min-height:48vh"' : ''}><div class="hero-copy"><p class="kicker">ERNESTINHO CARIOCA</p>
      <h1>${text(title, lang)}</h1><p class="lead">${text(intro, lang)}</p></div></section>
      <section class="night-editorial"><h2>${text(words.directory, lang)}</h2><div class="night-search">${search}</div></section>
      <section class="editorial"><div class="ec-list">${cards}</div>${empty}</section></div>`;
  return { title, intro, body: body + filterScript, inline: styles(section), css: ['petr-venues', ...(food ? [] : ['vida-nocturna'])] };
}

function detail(destination, section, slug, lang) {
  const item = catalogs[destination.slug][section][slug];
  const food = section === 'gastronomia';
  const category = categories[item.category];
  const back = anchor(base(destination) + section + '/', words.return, lang, 'back');
  const next = anchor(item.nearby || base(destination) + 'barrios/', words.nearby, lang, 'btn');
  const transit = anchor(base(destination) + 'transportes/', t('Cómo moverse', 'Como se locomover', 'Getting around'), lang, 'btn alt');
  const address = `<b>${text(words.location, lang)}</b> ${esc(item.address)} · ${esc(item.area)}`;
  const query = item.name + ', ' + item.address + ', ' + (item.municipality || destination.name) + ', RJ, Brasil';
  const map = '<iframe title="' + esc(item.name) + '" src="https://maps.google.com/maps?q=' +
    encodeURIComponent(query) + '&amp;output=embed" loading="lazy" class="petr-venue-map" referrerpolicy="no-referrer-when-downgrade"></iframe>';
  const mapPanel = '<section class="wrap"><details class="card"><summary>' +
    text(t('Cómo llegar y mapa', 'Como chegar e mapa', 'Directions and map'), lang) +
    '</summary><p>' + esc(item.address) + ' · ' + esc(item.area) + '</p>' + map + '</details></section>';
  const experience = `<article class="card"><h2>${text(words[food ? 'experience' : 'evening'], lang)}</h2><p>${text(item.experience, lang)}</p></article>`;
  const arrival = destination.slug === 'petropolis' && item.arrival ? `<article class="card"><h2>${text(t('Cómo llegar', 'Como chegar', 'Getting there'), lang)}</h2><p>${text(item.arrival, lang)}</p></article>` : '';
  const source = destination.slug === 'petropolis' && item.source ? `<a class="btn alt" href="${esc(item.source)}">${text(t('Consultar el establecimiento ↗', 'Consultar o estabelecimento ↗', 'Check venue information ↗'), lang)}</a>` : '';
  const advice = `<article class="card tip"><h2>${text(words.advice, lang)}</h2><p>${text(item.advice, lang)}</p></article>`;
  const hero = `<header class="hero petr-venue-hero"><div class="wrap">${back}<div class="${food ? 'ey' : 'eyebrow'}">${text(category, lang)} · ${esc(item.area)}</div>
    <h1>${esc(item.name)}</h1><p class="lead">${text(item.summary, lang)}</p></div></header>`;
  const body = food
    ? `${hero}<div class="wrap"><div class="tags"><span class="tag">${text(category, lang)}</span><span class="tag">${esc(item.area)}</span></div>
      <div class="grid"><section>${experience}${arrival}${advice}</section><aside class="card facts"><h2>${text(words.practical, lang)}</h2>
      <p>${address}</p>${transit}${next}${source}</aside></div></div>`
    : `${hero}<div class="wrap"><section class="facts"><div class="fact">${address}</div>
      <div class="fact"><b>${text(words.format, lang)}</b>${text(category, lang)}</div></section>
      <div class="content"><section>${experience}${arrival}${advice}</section><aside class="card"><h2>${text(words.practical, lang)}</h2>
      <div class="actions">${transit}${next}${source}</div></aside></div></div>`;
  return { title: item.name, intro: item.summary, body: body + mapPanel, image: null, bodyClass: 'petr-venue-detail', css: ['petr-venues'],
    inline: styles(food ? 'gastronomia/aprazivel' : 'vida-nocturna/rio-scenarium') };
}

export function renderVenueSection(destination, section, slug, lang) {
  if (!catalogs[destination.slug]?.[section]) return null;
  return slug ? detail(destination, section, slug, lang) : directory(destination, section, lang);
}
