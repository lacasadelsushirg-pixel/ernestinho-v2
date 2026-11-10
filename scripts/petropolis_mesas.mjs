import { esc, pre, styles, v } from './buzios_mirror_core.mjs';
import { t } from '../assets/js/translations/destinos/modelo.js';
import { regionalVenues } from '../assets/js/translations/destinos/mesas-regionales.js';
import { petrExpansion } from '../assets/js/translations/destinos/petropolis-mesas-ampliacion.js';
import { petrDiningBlockA, petrDiningPending } from '../assets/js/translations/destinos/petropolis-mesas-bloque-a.js';
import { petrDeepDining } from '../assets/js/translations/destinos/petropolis-mesas-profundas.js';
import { casaDAngelo } from '../assets/js/translations/destinos/petropolis-casa-dangelo.js';
import { casaPellegrini } from '../assets/js/translations/destinos/petropolis-casa-pellegrini.js';
import { categories, venues } from '../assets/js/translations/destinos/petropolis-mesas.js';

const base = destination => '/destinos/' + destination.slug + '/';
const diningUpdates = {
  'casa-dangelo': { ...casaDAngelo, contact: 'https://wa.me/552422420888' },
  'casa-pellegrini': { ...casaPellegrini, contact: 'https://wa.me/552422316110' },
  ...Object.fromEntries(Object.entries({ ...petrDiningBlockA, ...petrDiningPending }).map(([slug, updates]) =>
    [slug, { ...petrExpansion.gastronomia[slug], ...updates }])),
};
const petropolis = Object.fromEntries(Object.entries(venues).map(([section, items]) => [
  section, { ...items, ...petrExpansion[section], ...petrDeepDining[section], ...(section === 'gastronomia' ? diningUpdates : {}) },
]));
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
    return food
      ? `<a class="restaurant" href="${href}" data-venue data-category="${item.category}"><div class="restaurant-content">
        <h3>${label}</h3><p class="restaurant-place">${esc(item.area)} · ${category}</p>
        <p class="restaurant-description">${description}</p><span class="restaurant-link">${text(words.open, lang)}</span></div></a>`
      : `<a href="${href}" data-venue data-category="${item.category}"><b>${label}</b><span>${category} · ${description}</span></a>`;
  }).join('');
  const empty = `<p data-empty hidden>${text(words.empty, lang)}</p>`;
  const body = food
    ? `<div class="gast-shell" data-petr-venues><section class="gast-hero"><div class="gast-hero-inner"><p class="gast-eyebrow">ERNESTINHO CARIOCA</p>
      <h1>${text(title, lang)}</h1><p class="gast-intro">${text(intro, lang)}</p></div></section>
      <section class="gast-catalog"><div class="gast-section-heading"><h2>${text(words.directory, lang)}</h2></div>
      <div class="catalog-controls">${search}</div><div class="restaurant-grid">${cards}</div>${empty}</section></div>`
    : `<div data-petr-venues><section class="hero"><div class="hero-copy"><p class="kicker">ERNESTINHO CARIOCA</p>
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
  const pending = destination.slug === 'petropolis' && food && Object.hasOwn(petrDiningPending, slug);
  const query = [item.name, item.address, item.municipality || destination.name, 'RJ, Brasil'].join(', ');
  const contact = item.contact ? `<a class="btn" href="${esc(item.contact)}">${text(t('Consultar al local', 'Consultar a casa', 'Contact the venue'), lang)}</a>` : '';
  const mapLink = item.contact ? `<a class="btn alt" data-venue-map href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(query)}">${text(t('Abrir en el mapa', 'Abrir no mapa', 'Open in Maps'), lang)}</a>` : '';
  const address = `<b>${text(pending ? t('Dirección histórica', 'Endereço histórico', 'Historical address') : words.location, lang)}</b> ${esc(item.address)} · ${esc(item.area)}`;
  const map = '<iframe title="' + esc(item.name) + '" src="https://maps.google.com/maps?q=' +
    encodeURIComponent(query) + '&amp;output=embed" loading="lazy" class="petr-venue-map" referrerpolicy="no-referrer-when-downgrade"></iframe>';
  const mapPanel = '<section class="wrap"><details class="card"><summary>' +
    text(t('Cómo llegar y mapa', 'Como chegar e mapa', 'Directions and map'), lang) +
    '</summary><p>' + esc(item.address) + ' · ' + esc(item.area) + '</p>' + map + '</details></section>';
  const experience = `<article class="card"><h2>${text(words[food ? 'experience' : 'evening'], lang)}</h2><p>${text(item.experience, lang)}</p></article>`;
  const advice = `<article class="card tip"><h2>${text(words.advice, lang)}</h2><p>${text(item.advice, lang)}</p></article>`;
  const richFood = destination.slug === 'petropolis' && food && item.sections?.length ? `<section class="petr-food-depth wrap" aria-label="${text(t('Guía gastronómica completa','Guia gastronômico completo','Complete dining guide'),lang)}">
    <div class="petr-food-depth-intro"><span>ERNESTINHO CARIOCA · PETRÓPOLIS</span><h2>${text(t('Conoce el restaurante antes de reservar','Conheça o restaurante antes de reservar','Know the restaurant before booking'),lang)}</h2><p>${text(item.reservation,lang)}</p></div>
    <div class="petr-food-depth-chapters">${item.sections.map((section,i)=>`<article class="petr-food-chapter"><span class="petr-food-number">${String(i+1).padStart(2,'0')}</span><div><h3>${text(section.title,lang)}</h3><p>${text(section.text,lang)}</p></div></article>`).join('')}</div>
    <aside class="petr-food-depth-sources"><h2>${text(t('Fuentes y datos para confirmar','Fontes e dados para conferir','Sources and details to verify'),lang)}</h2><p>${text(t('Menús, reservas y precios pueden cambiar. Confirma los detalles con el establecimiento.','Cardápios, reservas e preços podem mudar. Confirme com o estabelecimento.','Menus, bookings and prices may change. Confirm details with the venue.'),lang)}</p><ul>${(item.sources || []).map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)} ↗</a></li>`).join('')}</ul></aside></section>` : '';
  const foodDepthCss = `<style>
.petr-food-depth{margin:30px auto 48px;padding:0 clamp(16px,3vw,32px);max-width:1120px}
.petr-food-depth-intro{border-radius:22px;background:#e9f4ee;border:1px solid #c6e1d2;padding:clamp(20px,4vw,36px);margin-bottom:22px}
.petr-food-depth-intro>span{font-weight:800;letter-spacing:.13em;color:#16705b;font-size:.7rem}
.petr-food-depth-intro h2{margin:12px 0;font-size:clamp(1.3rem,2.6vw,2rem);line-height:1.18;color:#154f40}
.petr-food-depth-intro p{margin:0;line-height:1.75;color:#274d40}
.petr-food-depth-chapters{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.petr-food-chapter{display:flex;align-items:flex-start;gap:15px;border:1px solid #d8e4de;border-radius:18px;background:#fff;padding:clamp(17px,2.5vw,26px);min-width:0}
.petr-food-chapter:nth-child(4n+2){background:#faf6eb;border-color:#e8dfcc}
.petr-food-chapter:nth-child(4n+3){background:#f3f7f6}
.petr-food-number{font-size:1.25rem;font-weight:900;color:#26806b;line-height:1.3}
.petr-food-chapter>div{min-width:0}
.petr-food-chapter h3{font-size:clamp(1.04rem,1.75vw,1.2rem);line-height:1.28;color:#125044;margin:0 0 12px}
.petr-food-chapter p{line-height:1.78;margin:0;overflow-wrap:break-word;color:#314b44}
.petr-food-depth-sources{padding:24px;margin-top:22px;border-radius:20px;background:#eff6f3;border:1px solid #cfe2d8}
.petr-food-depth-sources h2{color:#165345;font-size:1.25rem;margin:0 0 8px}
.petr-food-depth-sources p{line-height:1.65;margin:0 0 14px}
.petr-food-depth-sources ul{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px 18px;list-style:none;padding:0;margin:0}
.petr-food-depth-sources li{min-width:0}
.petr-food-depth-sources a{font-weight:700;color:#135447;overflow-wrap:anywhere}
@media(max-width:730px){.petr-food-depth-chapters,.petr-food-depth-sources ul{grid-template-columns:1fr}.petr-food-depth{margin:24px auto 38px}.petr-food-chapter{padding:19px}.petr-food-depth-intro{padding:22px}}
</style>`;
  const hero = `<header class="hero petr-venue-hero"><div class="wrap">${back}<div class="${food ? 'ey' : 'eyebrow'}">${text(category, lang)} · ${esc(item.area)}</div>
    <h1>${esc(item.name)}</h1><p class="lead">${text(item.summary, lang)}</p></div></header>`;
  const body = food
    ? `${hero}<div class="wrap"><div class="tags"><span class="tag">${text(category, lang)}</span><span class="tag">${esc(item.area)}</span></div>
      <div class="grid"><section>${experience}${advice}</section><aside class="card facts"><h2>${text(words.practical, lang)}</h2>
      <p>${address}</p>${contact}${mapLink}${transit}${next}</aside></div></div>`
    : `${hero}<div class="wrap"><section class="facts"><div class="fact">${address}</div>
      <div class="fact"><b>${text(words.format, lang)}</b>${text(category, lang)}</div></section>
      <div class="content"><section>${experience}${advice}</section><aside class="card"><h2>${text(words.practical, lang)}</h2>
      <div class="actions">${transit}${next}</div></aside></div></div>`;
  return { title: item.name, intro: item.summary, body: body + richFood + (pending
    ? `<section class="wrap"><p><a href="${esc(item.source)}">${text(t('Consultar la referencia de archivo', 'Consultar a referência de arquivo', 'View the archive reference'), lang)}</a></p></section>`
    : mapPanel), image: null, bodyClass: 'petr-venue-detail', css: ['petr-venues'],
    inline: styles(food ? 'gastronomia/aprazivel' : 'vida-nocturna/rio-scenarium') + (richFood ? foodDepthCss : '') };
}

export function renderVenueSection(destination, section, slug, lang) {
  if (!catalogs[destination.slug]?.[section]) return null;
  return slug ? detail(destination, section, slug, lang) : directory(destination, section, lang);
}
