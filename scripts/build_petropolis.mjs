import { renderVenueSection, venueRoutes } from './petropolis_mesas.mjs';
import { esc, pre, styles, v } from './buzios_mirror_core.mjs';
import { t } from '../assets/js/translations/destinos/modelo.js';
import { places, placeSections, photoSpots } from '../assets/js/translations/destinos/petropolis-lugares.js';
import { extraCards, transport } from '../assets/js/translations/destinos/petropolis-practico.js';

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
};
export const petrPhotos = Object.fromEntries(Object.entries(assets).map(([key, [folder, alt]]) => [key, { src: folder + key + '.webp', alt }]));
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
const cover = (title, intro, lang) => `<section class="hero" style="min-height:52vh"><div class="hero-copy">
  <p class="kicker">ERNESTINHO CARIOCA · PETRÓPOLIS</p><h1>${tx(title, lang)}</h1><p class="lead">${tx(intro, lang)}</p></div></section>`;
const note = (text, lang) => `<aside class="notice"><b>${tx(tip, lang)}</b>${p(text, lang)}</aside>`;
const titleFor = {
  familia: t('Petrópolis en familia', 'Petrópolis em família', 'Petrópolis with children'),
  cultura: t('Arte y cultura en Petrópolis', 'Arte e cultura em Petrópolis', 'Art and culture in Petrópolis'),
  naturaleza: t('Naturaleza en Petrópolis', 'Natureza em Petrópolis', 'Nature in Petrópolis'),
  fotografias: t('Fotografiar Petrópolis.', 'Fotografar Petrópolis.', 'Photographing Petrópolis.'),
  transportes: t('Cómo moverse en Petrópolis.', 'Como se locomover em Petrópolis.', 'Getting around Petrópolis.'),
};

function localPlaceLink(slug, lang) {
  const section = ['cultura', 'naturaleza', 'familia'].find(key => placeSections[key].includes(slug));
  return link(base + section + '/' + slug + '/', places[slug].name, lang, 'rd-action');
}

function placeList(city, key, lang) {
  const title = titleFor[key];
  const { intro, tip } = city.sections[key];
  const family = key === 'familia';
  const cards = placeSections[key].map(slug => {
    const place = places[slug];
    const url = pre(lang) + base + key + '/' + slug + '/';
    const photo = petrPhotos[place.image];
    if (family) return `<a class="family-card" href="${url}">${photo ? `<div class="family-card-image">${image(photo)}</div>` : ''}
      <div class="family-card-copy"><span>${esc(place.area)}</span><h2>${esc(place.name)}</h2>
      ${p(place.description, lang)}<b>${tx(open, lang)}</b></div></a>`;
    return `<a class="culture-card" href="${url}">${image(photo)}<span class="culture-card-copy"><small>${esc(place.area)}</small>
      <h3>${esc(place.name)}</h3>${p(place.description, lang)}</span></a>`;
  }).join('');
  const body = family
    ? `<section class="family-index"><div class="family-wrap">${link(base, back, lang, 'family-back')}
      <div class="family-index-intro"><span>Petrópolis</span><h1>${tx(title, lang)}</h1>${p(intro, lang)}</div>
      <div class="family-card-grid">${cards}</div></div></section>`
    : cover(title, intro, lang) + `<div class="culture-index"><section class="culture-section culture-categories">
      <p class="culture-kicker">ERNESTINHO CARIOCA</p><h2>${tx(t('Elige qué visitar', 'Escolha o que visitar', 'Choose what to visit'), lang)}</h2>
      <div class="culture-grid">${cards}</div></section><aside class="culture-note">${p(tip, lang)}</aside></div>`;
  return { title, intro, body, css: [family ? 'familia' : 'cultura'], bodyClass: family ? 'familia-index-page' : '' };
}

function placeDetail(key, slug, lang) {
  const place = places[slug];
  const family = key === 'familia';
  const photo = petrPhotos[place.image];
  const body = family
    ? `<section class="family-detail"><div class="family-wrap">${link(base + key + '/', back, lang, 'family-back family-back-dark')}
      <div class="family-detail-intro"><span>${esc(place.area)}</span><h1>${esc(place.name)}</h1>${p(place.description, lang)}</div>
      ${photo ? `<div class="family-detail-hero"><div class="family-hero">${image(photo, '', true)}<div><span>${esc(place.area)}</span><h2>${esc(place.name)}</h2></div></div></div>` : ''}
      <section class="family-experience"><h2>${tx(practical, lang)}</h2>${p(place.visit, lang)}</section>
      <section class="family-experience"><h2>${tx(combine, lang)}</h2>${localPlaceLink(place.combine, lang)}</section></div></section>`
    : cover(place.name, place.description, lang) + `<div class="culture-index">${link(base + key + '/', back, lang, 'culture-back')}
      ${photo ? `<div class="culture-gallery"><figure>${image(photo, '', true)}</figure></div>` : ''}
      <section class="culture-section"><h2>${tx(practical, lang)}</h2>${p(place.visit, lang)}</section>
      <aside class="culture-note"><b>${tx(combine, lang)}</b><p>${localPlaceLink(place.combine, lang)}</p></aside></div>`;
  return { title: place.name, intro: place.description, image: photo, body, css: [family ? 'familia' : 'cultura'], bodyClass: family ? 'familia-detail-page' : '' };
}

function photography(city, lang) {
  const title = titleFor.fotografias;
  const intro = city.sections.fotografias.intro;
  const cards = photoSpots.map(([slug, photo, query, copy]) => {
    const href = 'https://www.google.com/maps/search/?api=1&amp;query=' + encodeURIComponent(query + ', Petrópolis, RJ');
    return `<article class="spot">${image(petrPhotos[photo], 'photo-thumb')}<div class="spot-body"><b>${esc(places[slug].name)}</b>
      ${p(copy, lang)}<a class="photo-map" href="${href}" target="_blank" rel="noopener noreferrer">${tx(t('Abrir en el mapa ↗', 'Abrir no mapa ↗', 'Open on map ↗'), lang)}</a></div></article>`;
  }).join('');
  return { title, intro, body: cover(title, intro, lang) + `<section class="editorial"><div class="photo-grid">${cards}</div></section>`, inline: styles('fotografia') };
}

function transportLayout(city, slug, lang) {
  const title = titleFor.transportes;
  const { intro, tip } = city.sections.transportes;
  if (slug) {
    const [, name, area, summary, returnTrip] = transport[slug];
    const body = `<section class="transit-guide"><div class="breadcrumbs">${link(base + 'transportes/', back, lang)}</div>
      <div class="guide-intro"><p class="kicker">ERNESTINHO CARIOCA · PETRÓPOLIS</p><h1>${tx(name, lang)}</h1>
      <p class="guide-dek">${tx(summary, lang)}</p><span class="fact-pill">${esc(area)}</span></div>
      <div class="guide-layout"><article class="guide-copy"><section class="guide-section ec-adn ec-teal"><h2>${tx(practical, lang)}</h2>${p(returnTrip, lang)}</section></article>
      <aside class="guide-aside"><div class="aside-card">${link(base + 'guia/llegada/', t('Cómo llegar desde Río', 'Como chegar do Rio', 'Getting here from Rio'), lang, 'text-action')}</div></aside></div></section>`;
    return { title: name, intro: summary, body, css: ['transit-guides'] };
  }
  const cards = Object.entries(transport).map(([mode, [icon, name, area, copy]]) => {
    const photo = { src: '/FOTOS/HOME/DESTINOS/20261107-plantillas/transportes/' + mode + '.webp', alt: v(name, lang) };
    return `<article class="tcard source-transport">${image(photo, 'transport-thumb')}<div class="transport-content"><i aria-hidden="true">${icon}</i>
      <b>${tx(name, lang)}</b><strong>${esc(area)}</strong>${p(copy, lang)}</div>
      ${link(base + 'transportes/' + mode + '/', open, lang, 'detail-link')}</article>`;
  }).join('');
  return { title, intro, body: cover(title, intro, lang) + `<section class="transport"><div class="tgrid">${cards}</div>${note(tip, lang)}</section>`, inline: styles('transportes') };
}

export function renderPetropolis(city, key, slug, lang) {
  if (key === 'gastronomia' || key === 'vida-nocturna') return renderVenueSection(key, slug, lang);
  if (key === 'fotografias') return photography(city, lang);
  if (key === 'transportes') return transportLayout(city, slug, lang);
  if (placeSections[key]) return slug ? placeDetail(key, slug, lang) : placeList(city, key, lang);
  return null;
}

export function petropolisCards(key, cards) {
  return [...cards, ...(extraCards[key] || [])];
}

const sectionsForCard = {
  barrios: ['guia/primera-visita/', 'cultura/palacio-quitandinha/', 'familia/parque-itaipava/'],
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

export function petropolisGuide(city, slug, lang) {
  const title = t('Guía de Petrópolis.', 'Guia de Petrópolis.', 'Petrópolis travel guide.');
  const intro = t('Cómo llegar desde Río, moverte por la sierra y armar un recorrido según el tiempo que tengas.', 'Como chegar do Rio, se locomover pela serra e montar um roteiro para o tempo disponível.', 'How to get here from Rio, get around the mountains and plan a route for the time you have.');
  const covers = { 'primera-visita': 'museu', llegada: 'palacio', 'clima-y-lluvia': 'quitandinha', accesibilidad: 'cristal' };
  if (slug) {
    const guide = city.guide[slug];
    const items = guide.cards.map((card, index) => `<article><span>${String(index + 1).padStart(2, '0')}</span>
      <h2>${tx(card.title, lang)}</h2>${p(card.copy, lang)}${card.action.page ? link(base + card.action.page + '/', open, lang, 'rd-action') : ''}</article>`).join('');
    return {
      title: guide.title, intro: guide.intro, inline: styles('guia/documentos'), css: ['guia-adn'],
      body: `<section class="guide"><p class="kicker">PETRÓPOLIS</p><h1>${tx(guide.title, lang)}</h1>
      <p class="intro">${tx(guide.intro, lang)}</p>${image(petrPhotos[covers[slug]], 'heroimg', true)}
      <aside class="tip"><b>${tx(tip, lang)}</b>${p(guide.tip, lang)}</aside><section class="items">${items}</section>
      ${link(base + 'guia/', back, lang, 'back')}</section>`,
    };
  }
  const groups = [
    [t('Antes de viajar', 'Antes de viajar', 'Before you travel'), ['clima-y-lluvia', 'accesibilidad']],
    [t('Moverse', 'Como se locomover', 'Getting around'), ['llegada']],
    [t('Organiza tu estadía', 'Organize sua estadia', 'Plan your stay'), ['primera-visita']],
  ];
  const body = cover(title, intro, lang) + groups.map(([label, slugs]) => `<section class="guide-group"><h2>${tx(label, lang)}</h2>
    <div class="guide-grid">${slugs.map(id => `<a href="${pre(lang) + base}guia/${id}/">${image(petrPhotos[covers[id]], 'guide-thumb')}
    <b>${tx(city.guide[id].title, lang)}</b><span>${tx(t('ABRIR GUÍA →', 'ABRIR GUIA →', 'OPEN GUIDE →'), lang)}</span></a>`).join('')}</div></section>`).join('');
  return { title, intro, body };
}

export function petropolisEditorial(city, key, title, lang) {
  const data = city.sections[key];
  const cards = petropolisCards(key, data.cards);
  const hero = cover(title, data.intro, lang);
  const url = (card, index) => sectionDestination(key, card, index);
  const render = fn => cards.map(fn).join('');
  const itemTitle = card => '<h3>' + tx(card.title, lang) + '</h3>';
  const action = (card, index, cls = 'rd-action') => link(url(card, index), open, lang, cls);
  if (key === 'barrios') {
    const media = [petrPhotos['catedral-paisaje'], petrPhotos.palacio, petrPhotos.castelo];
    return { title, intro: data.intro, inline: styles('barrios'), body: hero + `<section class="editorial bh-individual-index">
      <div class="section-head"><h2>${tx(t('Explora barrio por barrio', 'Explore bairro por bairro', 'Explore neighbourhood by neighbourhood'), lang)}</h2></div>
      <div class="topic-grid">${render((card, i) => `<a class="topic" href="${pre(lang) + url(card, i)}">${image(media[i], 'bh-topic-mini')}
      <b>${tx(card.title, lang)}</b><span>${tx(open, lang)}</span></a>`)}</div></section>
      <section class="editorial bh-zone-index"><div class="bh-clusters">${render((card, i) => `<a class="bh-cluster" href="${pre(lang) + url(card, i)}">
      ${itemTitle(card)}<p class="bh-cluster-intro">${tx(card.copy, lang)}</p><span class="bh-cluster-cta">${tx(open, lang)}</span></a>`)}</div></section>` };
  }
  if (key === 'experiencias') {
    return { title, intro: data.intro, inline: styles('experiencias'), body: `<section class="editorial experiences-catalog">
      <header class="section-head"><p class="kicker">PETRÓPOLIS</p><h1>${tx(title, lang)}</h1>${p(data.intro, lang)}</header>
      <section class="exp-group"><div class="exp-grid">${render((card, i) => `<a class="exp-card" href="${pre(lang) + url(card, i)}">
      <div class="exp-photo" style="--img:url('${petrPhotos[i === 0 ? 'museu' : 'palacio'].src}')"></div>
      <div class="exp-info">${itemTitle(card)}${p(card.copy, lang)}<span class="meta">${tx(open, lang)}</span></div></a>`)}</div></section></section>` };
  }
  if (key === 'consejos') {
    return { title, intro: data.intro, css: ['consejos'], body: `<section class="ec-consejos-head"><div class="ec-wrap"><span>Petrópolis</span>
      <h1>${tx(title, lang)}</h1>${p(data.intro, lang)}</div></section><section class="ec-consejos-body"><div class="ec-wrap">
      <h2>${tx(t('Consejos esenciales', 'Dicas essenciais', 'Essential tips'), lang)}</h2><div class="ec-grid ec-grid-essential">${render((card, i) =>
        `<a class="ec-card" href="${pre(lang) + url(card, i)}">${image(petrPhotos[['museu', 'quitandinha', 'catedral-paisaje', 'cristal'][i]])}
        <span class="ec-label">${tx(card.title, lang)}</span></a>`)}</div></div></section>` };
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
  return { title, intro: data.intro, body: hero + `<section class="editorial"><div class="section-head"><h2>${tx(edition, lang)}</h2></div><div class="bh-grid">
    ${render((card, i) => `<article class="bh-card">${itemTitle(card)}${dates[i] ? `<strong>${tx(dates[i], lang)}</strong>` : ''}${p(card.copy, lang)}${action(card, i)}</article>`)}</div>${note(data.tip, lang)}</section>` };
}
