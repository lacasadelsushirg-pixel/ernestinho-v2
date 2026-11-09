import { renderVenueSection, venueRoutes } from './petropolis_mesas.mjs';
import { esc, pre, styles, v } from './buzios_mirror_core.mjs';
import { t } from '../assets/js/translations/destinos/modelo.js';
import { regionalTransport } from '../assets/js/translations/destinos/transportes-regionales.js';
import { regionalPlaces } from '../assets/js/translations/destinos/regional-lugares.js';
import { places, placeSections, photoSpots } from '../assets/js/translations/destinos/petropolis-lugares.js';
import { photographyCards } from './regional_photography.mjs';
import { petrSpotInfo } from '../assets/js/translations/destinos/fotografia-regional.js';
import { extraCards, transport } from '../assets/js/translations/destinos/petropolis-practico.js';

import { morePhotoSpots } from '../assets/js/translations/destinos/petropolis-fotografia-local.js';
import { localPhotos, photoCredit } from '../assets/js/translations/destinos/petropolis-fotos.js';

const base = '/destinos/petropolis/';
const earlier = '/FOTOS/HOME/DESTINOS/20261107-plantillas/petropolis/';
const current = '/FOTOS/HOME/DESTINOS/20261108-petropolis/';
const assets = {
  museu: [earlier, 'Museu Imperial'],
  catedral: [earlier, 'Catedral São Pedro de Alcântara'],
  palacio: [earlier, 'Palácio Quitandinha'],
  quitandinha: [earlier, 'Lago do Palácio Quitandinha'],
  cristal: [current, 'Palácio de Cristal'],
  colono: [current, 'Museu Casa do Colono'],
  'santos-dumont': [current, 'Museu Casa de Santos Dumont'],
  'casa-ipiranga': [current, 'Casa da Ipiranga'],
  castelo: [current, 'Castelo de Itaipava'],
  'catedral-paisaje': [current, 'Catedral São Pedro de Alcântara'],
  'palacio-rio-negro': ['/assets/images/destinos/lugares/petropolis/', 'Palácio Rio Negro'],
};
const petrBasePhotos = Object.fromEntries(Object.entries(assets).map(([key, [folder, alt]]) => [key, { src: folder + key + '.webp', alt }]));
export const petrPhotos = { ...petrBasePhotos, ...localPhotos };
export const petrDetailRoutes = [
  ...venueRoutes,
  ...Object.entries(placeSections).flatMap(([key, slugs]) => slugs.map(slug => [key, slug])),
  ...Object.keys(transport).map(slug => ['transportes', slug]),
];

const tx = (value, lang) => esc(v(value, lang));
const p = (value, lang) => '<p>' + tx(value, lang) + '</p>';
const link = (url, label, lang, cls = '') => `<a${cls ? ` class="${cls}"` : ''} href="${pre(lang) + url}">${tx(label, lang)}</a>`;
const image = (photo, cls = '', eager = false) => photo ? `<img${cls ? ` class="${cls}"` : ''} src="${esc(photo.src)}" alt="${esc(photo.alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">` : '';
const open = t('Ver detalles →', 'Ver detalhes →', 'View details →');
const back = t('← Volver a la sección', '← Voltar à seção', '← Back to section');
const practical = t('Cómo organizar la visita', 'Como organizar a visita', 'Planning your visit');
const combine = t('Con qué combinar', 'Com o que combinar', 'What to pair it with');
const tip = t('Consejo de Ernestinho', 'Dica do Ernestinho', 'Ernestinho’s tip');
const caboFrioTimetables = [
  t('Horarios y pasajes de la 1001', 'Horários e passagens da 1001', '1001 timetables and tickets'),
  t('Líneas y horarios de Salineira', 'Linhas e horários da Salineira', 'Salineira routes and timetables'),
];
const cover = (title, intro, lang, name = 'Petrópolis') => `<section class="hero" style="min-height:52vh"><div class="hero-copy">
  <p class="kicker">ERNESTINHO CARIOCA · ${esc(name.toLocaleUpperCase('pt-BR'))}</p><h1>${tx(title, lang)}</h1><p class="lead">${tx(intro, lang)}</p></div></section>`;
const note = (text, lang) => `<aside class="notice"><b>${tx(tip, lang)}</b>${p(text, lang)}</aside>`;
const titleFor = {
  familia: t('Petrópolis en familia', 'Petrópolis em família', 'Petrópolis with children'),
  cultura: t('Arte y cultura en Petrópolis', 'Arte e cultura em Petrópolis', 'Art and culture in Petrópolis'),
  naturaleza: t('Naturaleza en Petrópolis', 'Natureza em Petrópolis', 'Nature in Petrópolis'),
  fotografias: t('Fotografiar Petrópolis.', 'Fotografar Petrópolis.', 'Photographing Petrópolis.'),
  transportes: t('Cómo moverse en Petrópolis.', 'Como se locomover em Petrópolis.', 'Getting around Petrópolis.'),
};

const petropolisCatalog = { base, places, placeSections, photos: petrPhotos };

export const regionalPlaceRoutes = Object.entries(regionalPlaces).flatMap(([city, { placeSections }]) =>
  Object.entries(placeSections).flatMap(([key, slugs]) => slugs.map(slug => [city, key, slug])));

export function renderRegionalPlaces(city, key, slug, lang, photos) {
  const catalog = regionalPlaces[city.slug];
  if (!catalog?.placeSections[key]) return null;
  const config = { ...catalog, base: '/destinos/' + city.slug + '/', photos };
  return slug ? placeDetail(key, slug, lang, config, city.name) : placeList(city, key, lang, config);
}

function localPlaceLink(slug, lang, { base, places, placeSections }) {
  const section = ['cultura', 'naturaleza', 'familia'].find(key => placeSections[key].includes(slug));
  return link(base + section + '/' + slug + '/', places[slug].name, lang, 'rd-action');
}

function placeList(city, key, lang, config = petropolisCatalog) {
  const { base, places, placeSections, photos } = config;
  const title = config === petropolisCatalog ? titleFor[key] : {
    familia: t(`${city.name} en familia`, `${city.name} em família`, `${city.name} with children`),
    cultura: t(`Arte y cultura en ${city.name}`, `Arte e cultura em ${city.name}`, `Art and culture in ${city.name}`),
    naturaleza: t(`Naturaleza en ${city.name}`, `Natureza em ${city.name}`, `Nature in ${city.name}`),
  }[key];
  const { intro, tip } = city.sections[key];
  const family = key === 'familia';
  const cards = placeSections[key].map(slug => {
    const place = places[slug];
    const url = pre(lang) + base + key + '/' + slug + '/';
    const photo = photos[place.image];
    if (family) return `<a class="family-card" href="${url}">${photo ? `<div class="family-card-image">${image(photo)}</div>` : ''}
      <div class="family-card-copy"><span>${esc(place.area)}</span><h2>${esc(place.name)}</h2>
      ${p(place.description, lang)}<b>${tx(open, lang)}</b></div></a>`;
    return `<a class="culture-card" href="${url}">${image(photo)}<span class="culture-card-copy"><small>${esc(place.area)}</small>
      <h3>${esc(place.name)}</h3>${p(place.description, lang)}</span></a>`;
  }).join('');
  const body = family
    ? `<section class="family-index"><div class="family-wrap">${link(base, back, lang, 'family-back')}
      <div class="family-index-intro"><span>${esc(city.name)}</span><h1>${tx(title, lang)}</h1>${p(intro, lang)}</div>
      <div class="family-card-grid">${cards}</div>${config !== petropolisCatalog ? note(tip, lang) : ''}</div></section>`
    : cover(title, intro, lang, city.name) + `<div class="culture-index"><section class="culture-section culture-categories">
      <p class="culture-kicker">ERNESTINHO CARIOCA</p><h2>${tx(t('Elige qué visitar', 'Escolha o que visitar', 'Choose what to visit'), lang)}</h2>
      <div class="culture-grid">${cards}</div></section><aside class="culture-note">${p(tip, lang)}</aside></div>`;
  return { title, intro, body, css: [family ? 'familia' : 'cultura'], bodyClass: family ? 'familia-index-page' : '' };
}

function placeDetail(key, slug, lang, config = petropolisCatalog, cityName = 'Petrópolis') {
  const { base, places, photos } = config;
  const place = places[slug];
  const family = key === 'familia';
  const photo = photos[place.image];
  const mapUrl = place.map ? 'https://www.google.com/maps/search/?api=1&amp;query=' + encodeURIComponent(place.map + ', ' + cityName + ', RJ') : '';
  const map = mapUrl ? `<a class="rd-action" href="${mapUrl}" target="_blank" rel="noopener noreferrer">${tx(t('Abrir en el mapa ↗', 'Abrir no mapa ↗', 'Open on map ↗'), lang)}</a>` : '';
  const body = family
    ? `<section class="family-detail"><div class="family-wrap">${link(base + key + '/', back, lang, 'family-back family-back-dark')}
      <div class="family-detail-intro"><span>${esc(place.area)}</span><h1>${esc(place.name)}</h1>${p(place.description, lang)}</div>
      ${photo ? `<div class="family-detail-hero"><div class="family-hero">${image(photo, '', true)}<div><span>${esc(place.area)}</span><h2>${esc(place.name)}</h2></div></div></div>` : ''}
      <section class="family-experience"><h2>${tx(practical, lang)}</h2>${p(place.visit, lang)}${map}</section>
      <section class="family-experience"><h2>${tx(combine, lang)}</h2>${localPlaceLink(place.combine, lang, config)}</section></div></section>`
    : cover(place.name, place.description, lang, cityName) + `<div class="culture-index">${link(base + key + '/', back, lang, 'culture-back')}
      ${photo ? `<div class="culture-gallery"><figure>${image(photo, '', true)}</figure></div>` : ''}
      <section class="culture-section"><h2>${tx(practical, lang)}</h2>${p(place.visit, lang)}${map}</section>
      <aside class="culture-note"><b>${tx(combine, lang)}</b><p>${localPlaceLink(place.combine, lang, config)}</p></aside></div>`;
  return { title: place.name, intro: place.description, image: config === petropolisCatalog ? photo : photo || null, body, css: [family ? 'familia' : 'cultura'], bodyClass: family ? 'familia-detail-page' : '' };
}

function photography(city, lang) {
  const title = titleFor.fotografias;
  const intro = city.sections.fotografias.intro;
  const spots = photoSpots.map(([slug, photo, query, copy], index) => {
    const [area, time, access, arrival] = petrSpotInfo[index];
    return { name: places[slug].name, photo: petrPhotos[photo], query, copy, area, time, access, arrival };
  });
  spots.push(...morePhotoSpots.map(({ image, ...spot }) => ({ ...spot, photo: petrPhotos[image] })));
  const credits = morePhotoSpots.map(({ image }) => photoCredit(petrPhotos[image], lang)).filter(Boolean);
  return { title, intro, body: cover(title, intro, lang) + photographyCards(spots, lang, city.name) +
    `<aside class="editorial"><ul>${credits.map(credit => '<li>' + credit + '</li>').join('')}</ul></aside>`, inline: styles('fotografia') };
}

export const regionalTransportRoutes = Object.entries(regionalTransport).flatMap(([city, modes]) =>
  Object.keys(modes).map(slug => [city, 'transportes', slug]));

export function renderRegionalTransport(city, key, slug, lang, photos) {
  if (key !== 'transportes' || !regionalTransport[city.slug]) return null;
  return transportLayout(city, slug, lang, photos);
}

function transportLayout(city, slug, lang, photos = {}) {
  const modes = regionalTransport[city.slug] || transport;
  const isPetr = modes === transport;
  const isCaboFrio = city.slug === 'cabo-frio';
  const base = '/destinos/' + city.slug + '/';
  const guide = city.slug === 'angra-ilha-grande' ? 'embarque' : 'llegada';
  const title = isPetr ? titleFor.transportes : t(`Cómo moverse en ${city.name}.`, `Como se locomover em ${city.name}.`, `Getting around ${city.name}.`);
  const { intro, tip } = city.sections.transportes;
  if (slug) {
    const [, name, area, summary, returnTrip, ...sources] = modes[slug];
    const timetables = isCaboFrio ? sources.map((url, index) =>
      `<a class="text-action" href="${esc(url)}">${tx(caboFrioTimetables[slug === 'onibus' ? 1 : index], lang)}</a>`).join('') : '';
    const body = `<section class="transit-guide"><div class="breadcrumbs">${link(base + 'transportes/', back, lang)}</div>
      <div class="guide-intro"><p class="kicker">ERNESTINHO CARIOCA · ${esc(city.name.toLocaleUpperCase('pt-BR'))}</p><h1>${tx(name, lang)}</h1>
      <p class="guide-dek">${tx(summary, lang)}</p><span class="fact-pill">${esc(area)}</span></div>
      <div class="guide-layout"><article class="guide-copy"><section class="guide-section ec-adn ec-teal"><h2>${tx(isPetr ? practical : t('Embarque y regreso', 'Embarque e volta', 'Boarding and return'), lang)}</h2>${p(returnTrip, lang)}</section></article>
      <aside class="guide-aside"><div class="aside-card">${link(base + 'guia/' + guide + '/', isPetr ? t('Cómo llegar desde Río', 'Como chegar do Rio', 'Getting here from Rio') : t('Planifica la llegada', 'Planeje a chegada', 'Plan your arrival'), lang, 'text-action')}${timetables}</div></aside></div></section>`;
    return { title: name, intro: summary, body, css: ['transit-guides'] };
  }
  const cards = Object.entries(modes).map(([mode, [icon, name, area, copy]]) => {
    const photo = isCaboFrio ? photos['transportes-' + mode] :
      mode === 'barcos' ? photos['transportes-barcos'] || photos['spot-praia-dos-anjos'] :
      { src: '/FOTOS/HOME/DESTINOS/20261107-plantillas/transportes/' + mode + '.webp', alt: v(name, lang) };
    return `<article class="tcard source-transport">${image(photo && { ...photo, alt: photo.alt || v(name, lang) }, 'transport-thumb')}<div class="transport-content"><i aria-hidden="true">${icon}</i>
      <b>${tx(name, lang)}</b><strong>${esc(area)}</strong>${p(copy, lang)}</div>
      ${link(base + 'transportes/' + mode + '/', open, lang, 'detail-link')}</article>`;
  }).join('');
  return { title, intro, body: cover(title, intro, lang, city.name) + `<section class="transport"><div class="tgrid">${cards}</div>${note(tip, lang)}</section>`, inline: styles('transportes') };
}

export function renderPetropolis(city, key, slug, lang) {
  if (key === 'gastronomia' || key === 'vida-nocturna') return renderVenueSection(city, key, slug, lang);
  if (key === 'fotografias') return photography(city, lang);
  if (key === 'transportes') return transportLayout(city, slug, lang);
  if (placeSections[key]) return slug ? placeDetail(key, slug, lang) : placeList(city, key, lang);
  return null;
}

export function petropolisCards(key, cards) {
  return [...cards, ...(extraCards[key] || [])];
}

const sectionsForCard = {
  experiencias: ['guia/primera-visita/', 'barrios/'],
  compras: ['barrios/', 'gastronomia/', 'familia/parque-itaipava/'],
  eventos: ['cultura/palacio-de-cristal/', 'cultura/', 'consejos/'],
};

function sectionDestination(key, card, index) {
  const { route, page, guide } = card.action;
  if (route) return route;
  if (guide) return base + 'guia/' + guide + '/';
  if (page) return base + page + '/';
  return base + (sectionsForCard[key]?.[index] || 'guia/');
}

export function petropolisHome(city, names, lang) {
  const media = {
    guia: 'catedral-paisaje', fotografias: 'quitandinha', experiencias: 'museu',
    barrios: 'palacio', cultura: 'catedral', familia: 'cristal', naturaleza: 'catedral-paisaje',
  };
  const tiles = Object.entries(names).map(([key, label]) => `<a class="door" href="${pre(lang) + base + key}/">${image(petrPhotos[media[key]], 'card-image')}
    <span class="door-copy"><b>${tx(label, lang)}</b><span class="card-copy">${tx(city.sections[key]?.intro || city.plan, lang)}</span>
    <small>${tx(t('EXPLORAR →', 'EXPLORAR →', 'EXPLORE →'), lang)}</small></span></a>`).join('');
  return {
    title: city.name, intro: city.intro, image: petrPhotos['catedral-paisaje'], inline: styles(''),
    body: `<section class="hero"><div class="hero-visual">${image(petrPhotos['catedral-paisaje'], '', true)}</div>
    <div class="hero-copy"><p class="kicker">${tx(city.region, lang)}</p><h1>Petrópolis</h1><p class="lead">${tx(city.intro, lang)}</p>
    ${link(base + 'guia/', t('Abrir guía →', 'Abrir guia →', 'Open guide →'), lang, 'primary')}</div></section>
    <section class="intro"><p class="kicker">ERNESTINHO CARIOCA</p><h2>${tx(t('¿Por dónde quieres empezar?', 'Por onde quer começar?', 'Where do you want to start?'), lang)}</h2>
    ${p(city.plan, lang)}</section><section class="door-grid" aria-label="Petrópolis">${tiles}</section>`,
  };
}

export function renderGuideArticle(city, guide, photo, lang) {
  const base = '/destinos/' + city.slug + '/';
  const items = guide.cards.map((card, index) => `<article><span>${String(index + 1).padStart(2, '0')}</span>
    <h2>${tx(card.title, lang)}</h2>${p(card.copy, lang)}${card.action.route ? link(card.action.route, open, lang, 'rd-action') : card.action.page ? link(base + card.action.page + '/', open, lang, 'rd-action') : ''}</article>`).join('');
  return {
    title: guide.title, intro: guide.intro, ...(guide.image ? { image: photo || null } : {}), inline: styles('guia/documentos'), css: ['guia-adn'],
    body: `<section class="guide"><p class="kicker">${esc(city.name.toLocaleUpperCase('pt-BR'))}</p><h1>${tx(guide.title, lang)}</h1>
    <p class="intro">${tx(guide.intro, lang)}</p>${image(photo, 'heroimg', true)}
    <aside class="tip"><b>${tx(tip, lang)}</b>${p(guide.tip, lang)}</aside><section class="items">${items}</section>
    ${link(base + 'guia/', back, lang, 'back')}</section>`,
  };
}

export function petropolisGuide(city, slug, lang) {
  const title = t('Guía de Petrópolis.', 'Guia de Petrópolis.', 'Petrópolis travel guide.');
  const intro = t('Cómo llegar desde Río, moverte por la sierra y armar un recorrido según el tiempo que tengas.', 'Como chegar do Rio, se locomover pela serra e montar um roteiro para o tempo disponível.', 'How to get here from Rio, get around the mountains and plan a route for the time you have.');
  const covers = { 'primera-visita': 'museu', llegada: 'palacio', 'clima-y-lluvia': 'quitandinha', accesibilidad: 'cristal' };
  if (slug) {
    const guide = city.guide[slug];
    return renderGuideArticle(city, guide, petrPhotos[guide.image || covers[slug]], lang);
  }
  const groups = [
    [t('Antes de viajar', 'Antes de viajar', 'Before you travel'), ['clima-y-lluvia', 'accesibilidad']],
    [t('Moverse', 'Como se locomover', 'Getting around'), ['llegada', 'sin-auto']],
    [t('Organiza tu estadía', 'Organize sua estadia', 'Plan your stay'), ['primera-visita', 'itinerarios-1-2-3-dias']],
  ];
  const body = cover(title, intro, lang) + groups.map(([label, slugs]) => `<section class="guide-group"><h2>${tx(label, lang)}</h2>
    <div class="guide-grid">${slugs.map(id => `<a href="${pre(lang) + base}guia/${id}/">${image(petrPhotos[city.guide[id].image || covers[id]], 'guide-thumb')}
    <b>${tx(city.guide[id].title, lang)}</b><span>${tx(t('ABRIR GUÍA →', 'ABRIR GUIA →', 'OPEN GUIDE →'), lang)}</span></a>`).join('')}</div></section>`).join('');
  return { title, intro, body };
}

export function petropolisEditorial(city, key, title, lang, agenda) {
  const data = city.sections[key];
  const cards = petropolisCards(key, data.cards);
  const hero = cover(title, data.intro, lang);
  const url = (card, index) => sectionDestination(key, card, index);
  const render = fn => cards.map(fn).join('');
  const itemTitle = card => '<h3>' + tx(card.title, lang) + '</h3>';
  const action = (card, index, cls = 'rd-action') => link(url(card, index), open, lang, cls);
  if (key === 'experiencias') {
    return { title, intro: data.intro, inline: styles('experiencias'), body: `<section class="editorial experiences-catalog">
      <header class="section-head"><p class="kicker">PETRÓPOLIS</p><h1>${tx(title, lang)}</h1>${p(data.intro, lang)}</header>
      <section class="exp-group"><div class="exp-grid">${render((card, i) => `<a class="exp-card" href="${pre(lang) + url(card, i)}">
      <div class="exp-photo" style="--img:url('${petrPhotos[i === 0 ? 'museu' : 'palacio'].src}')"></div>
      <div class="exp-info">${itemTitle(card)}${p(card.copy, lang)}<span class="meta">${tx(open, lang)}</span></div></a>`)}</div></section></section>` };
  }
  if (key === 'compras') {
    return { title, intro: data.intro, css: ['compras'], inline: styles('compras'), body: hero + `<section class="shopping-editorial">
      <div class="section-head"><h2>${tx(t('Calles, ferias y polos de moda', 'Ruas, feiras e polos de moda', 'Streets, markets and clothing districts'), lang)}</h2></div>
      <div class="shopping-grid">${render((card, i) => `<article class="shopping-card">${itemTitle(card)}${p(card.copy, lang)}${action(card, i)}</article>`)}</div>
      <div class="shopping-note">${p(data.tip, lang)}</div></section>` };
  }
  const edition = t('Ediciones de referencia', 'Edições de referência', 'Reference editions');
  const dates = [
    t('19 de junio al 5 de julio de 2026', '19 de junho a 5 de julho de 2026', '19 June to 5 July 2026'),
    t('16 al 20 de septiembre de 2026', '16 a 20 de setembro de 2026', '16 to 20 September 2026'),
    t('27 de noviembre de 2026 al 4 de enero de 2027', '27 de novembro de 2026 a 4 de janeiro de 2027', '27 November 2026 to 4 January 2027'),
  ];
  return { title, intro: data.intro, body: hero + agenda + `<section class="editorial"><div class="section-head"><h2>${tx(edition, lang)}</h2></div><div class="bh-grid">
    ${render((card, i) => `<article class="bh-card">${itemTitle(card)}${dates[i] ? `<strong>${tx(dates[i], lang)}</strong>` : ''}${p(card.copy, lang)}${action(card, i)}</article>`)}</div>${note(data.tip, lang)}</section>` };
}
