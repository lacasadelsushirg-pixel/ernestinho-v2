import fs from 'node:fs';
import path from 'node:path';
import { esc, head, langs, origin, pre, styles, v } from './buzios_mirror_core.mjs';
import { t } from '../assets/js/translations/destinos/modelo.js';
import petropolis from '../assets/js/translations/destinos/petropolis.js';
import angra from '../assets/js/translations/destinos/angra-ilha-grande.js';
import caboFrio from '../assets/js/translations/destinos/cabo-frio.js';
import arraial from '../assets/js/translations/destinos/arraial-do-cabo.js';
import paraty from '../assets/js/translations/destinos/paraty.js';

const photos = JSON.parse(fs.readFileSync(new URL('../assets/data/regional-destination-photos.json', import.meta.url)));
const catalog = '/destinos/';
const credits = catalog + 'creditos-fotos/';
const destinations = [petropolis, angra, caboFrio, arraial, paraty];
const sections = {
  guia: t('Guía', 'Guia', 'Guide'),
  transportes: t('Transportes', 'Transportes', 'Transport'),
  fotografias: t('Fotografía', 'Fotografia', 'Photography'),
  experiencias: t('Tours y experiencias', 'Passeios e experiências', 'Tours & experiences'),
  barrios: t('Barrios', 'Bairros', 'Neighbourhoods'),
  cultura: t('Arte y cultura', 'Arte e cultura', 'Art & culture'),
  familia: t('Familia', 'Família', 'Family'),
  'vida-nocturna': t('Vida nocturna', 'Vida noturna', 'Nightlife'),
  gastronomia: t('Gastronomía', 'Gastronomia', 'Food & drink'),
  consejos: t('Consejos', 'Dicas', 'Tips'),
  naturaleza: t('Naturaleza', 'Natureza', 'Nature'),
  compras: t('Compras', 'Compras', 'Shopping'),
  eventos: t('Eventos', 'Eventos', 'Events'),
};
const home = t('Inicio', 'Início', 'Home');
const destinationsLabel = t('Destinos', 'Destinos', 'Destinations');
const guideLabel = t('Guía práctica', 'Guia prática', 'Practical guide');
const creditLabel = t('Créditos de las fotos', 'Créditos das fotos', 'Photo credits');
const open = t('Explorar', 'Explorar', 'Explore');
const guideOpen = t('Abrir guía', 'Abrir guia', 'Open guide');
const sectionOpen = t('Ver sección', 'Ver seção', 'View section');
const destinationPath = (destination) => catalog + destination.slug + '/';
const sectionPath = (destination, slug) => destinationPath(destination) + slug + '/';
const guidePath = (destination, slug) => sectionPath(destination, 'guia') + slug + '/';
const text = (copy, language) => esc(v(copy, language));
const paragraph = (copy, language) => '<p>' + text(copy, language) + '</p>';
const rioGuideStyles = styles('guia');

const routes = new Map([[catalog, {}], [credits, {}]]);
for (const destination of destinations) {
  routes.set(destinationPath(destination), { destination });
  for (const key of Object.keys(sections)) {
    if (key !== 'guia' && !destination.sections[key]) throw Error(`Missing ${destination.slug}/${key}`);
    routes.set(sectionPath(destination, key), { destination, key });
  }
  for (const guide of Object.keys(destination.guide)) {
    routes.set(guidePath(destination, guide), { destination, key: 'guia', guide });
  }
}
export const regionalRoutes = [...routes.keys()];

const navLink = (route, label, language, className = '', current = false) =>
  `<a${className ? ` class="${className}"` : ''} href="${pre(language) + route}"${current ? ' aria-current="page"' : ''}>${text(label, language)}</a>`;
const external = (url, label, language, className = 'rd-action') =>
  `<a class="${className}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${text(label, language)} <span aria-hidden="true">↗</span></a>`;

function contact(topic, language) {
  const messages = t(`Hola, Ernestinho. Quiero consultar por ${topic}.`, `Olá, Ernestinho. Quero informações sobre ${topic}.`, `Hi Ernestinho, I’d like to ask about ${topic}.`);
  return 'https://wa.me/5521969946938?text=' + encodeURIComponent(v(messages, language));
}

function actionLink(action, destination, language, title) {
  if (action.map) {
    const map = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(action.map);
    return external(map, t('Abrir en el mapa', 'Abrir no mapa', 'Open on map'), language);
  }
  if (action.url) return external(action.url, t('Consultar sitio', 'Consultar site', 'Visit website'), language);
  if (action.whatsapp) return external(contact(v(title, language), language), t('Consultar por WhatsApp', 'Consultar pelo WhatsApp', 'Ask on WhatsApp'), language);
  if (action.guide) return navLink(guidePath(destination, action.guide), t('Ver guía', 'Ver guia', 'Read guide'), language, 'rd-action');
  if (action.page) return navLink(sectionPath(destination, action.page), sections[action.page], language, 'rd-action');
  if (action.route) return navLink(action.route, t('Ver detalles', 'Ver detalhes', 'View details'), language, 'rd-action');
  throw Error('Missing card action for ' + v(title, language));
}

function photograph(photo, alt, eager = false, className = '') {
  if (!photo) return '';
  return `<img${className ? ` class="${className}"` : ''} src="${esc(photo.src)}" alt="${esc(alt)}" decoding="async" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}>`;
}

function breadcrumbs(destination, key, guide, route, language) {
  const entries = [['/', home], [catalog, destinationsLabel]];
  if (destination) entries.push([destinationPath(destination), destination.name]);
  if (key) entries.push([sectionPath(destination, key), sections[key]]);
  if (guide) entries.push([guidePath(destination, guide), destination.guide[guide].title]);
  if (route === credits) entries.push([credits, creditLabel]);
  const label = text(t('Ruta de navegación', 'Caminho de navegação', 'Breadcrumb'), language);
  return `<nav class="rd-breadcrumb" aria-label="${label}"><ol>${entries.map(([url, label]) =>
    `<li>${url === route ? `<span aria-current="page">${text(label, language)}</span>` : navLink(url, label, language)}</li>`).join('')}</ol></nav>`;
}

function destinationNav(destination, route, language) {
  const links = [[destinationPath(destination), home], ...Object.entries(sections).map(([slug, label]) => [sectionPath(destination, slug), label])];
  return `<nav class="rd-nav" aria-label="${esc(destination.name)}"><div>${links.map(([url, label]) =>
    navLink(url, label, language, '', url === route)).join('')}</div></nav>`;
}

function hero(title, kicker, description, language, options = {}) {
  const { photo, alt = '', headline = '', links = '' } = options;
  return `<header class="hero rd-hero${photo ? ' rd-hero-photo' : ''}">
    ${photo ? `<div class="hero-visual">${photograph(photo, alt, true)}</div>` : ''}
    <div class="hero-copy"><p class="kicker">${text(kicker, language)}</p>
    <h1>${text(title, language)}</h1>
    ${headline ? `<p class="rd-headline">${text(headline, language)}</p>` : ''}
    <p class="lead">${text(description, language)}</p>${links ? `<div class="rd-hero-actions">${links}</div>` : ''}</div>
  </header>`;
}

function tile(route, title, language, photo, alt = '', caption = open) {
  return `<a href="${pre(language) + route}">${photograph(photo, alt, false, 'guide-thumb')}
    <b>${text(title, language)}</b><span>${text(caption, language)} <i aria-hidden="true">→</i></span></a>`;
}

function recommendation(copy, language, title = t('Ernestinho recomienda', 'Ernestinho recomenda', 'Ernestinho recommends')) {
  return `<aside class="rd-tip"><p class="kicker">ERNESTINHO CARIOCA</p><h2>${text(title, language)}</h2>${paragraph(copy, language)}</aside>`;
}

function sectionTiles(destination, language) {
  const media = photos[destination.slug];
  const featured = [];
  const compact = [];
  for (const [key, title] of Object.entries(sections)) {
    const route = sectionPath(destination, key);
    const image = media[key];
    if (image) featured.push(tile(route, title, language, image, '', sectionOpen));
    else compact.push(`<a href="${pre(language) + route}"><strong>${text(title, language)}</strong><span aria-hidden="true">→</span></a>`);
  }
  return `<section class="guide-group rd-group"><h2>${text(t('Qué ver y cómo organizar el viaje', 'O que ver e como organizar a viagem', 'What to see and how to plan your trip'), language)}</h2>
    <div class="guide-grid">${featured.join('')}</div><div class="rd-quick-grid">${compact.join('')}</div></section>`;
}

function renderHome(destination, language) {
  const photo = photos[destination.slug].home;
  const links = navLink(sectionPath(destination, 'guia'), guideOpen, language, 'primary') +
    navLink(sectionPath(destination, 'experiencias'), sections.experiencias, language, 'rd-outline');
  return hero(destination.name, destination.region, destination.intro, language, { photo, alt: photo.alt || destination.name, headline: destination.headline, links }) +
    destinationNav(destination, destinationPath(destination), language) +
    `<div class="rd-wrap rd-home-tip">${recommendation(destination.plan, language, t('Así empezaría mi viaje', 'Assim eu começaria a viagem', 'How I’d start the trip'))}</div>` +
    sectionTiles(destination, language);
}

function guideIndex(destination, language) {
  const title = guideTitle(destination, language);
  const intro = t('Lo esencial para preparar tu visita, con el tiempo, los accesos y los trayectos que conviene decidir primero.', 'O essencial para preparar a visita, com tempo, acessos e deslocamentos que vale decidir primeiro.', 'The essentials for your visit, starting with timing, access and journeys.');
  const media = photos[destination.slug];
  const guidePhotos = [...new Set([media.guia, media.barrios, media.home, media.familia, media.cultura].filter(Boolean))];
  const tiles = Object.entries(destination.guide).map(([slug, guide], index) =>
    tile(guidePath(destination, slug), guide.title, language, guidePhotos[index], '', guideOpen));
  const heading = text(t('Empieza por lo esencial', 'Comece pelo essencial', 'Start with the essentials'), language);
  return hero(title, destination.name, intro, language) +
    destinationNav(destination, sectionPath(destination, 'guia'), language) +
    `<section class="guide-group rd-group"><h2>${heading}</h2><div class="guide-grid">${tiles.join('')}</div></section>
    <div class="rd-wrap">${recommendation(destination.plan, language)}</div>`;
}

function guideTitle(destination, language) {
  return v(t(`Guía práctica de ${destination.name}`, `Guia prático de ${destination.name}`, `${destination.name} travel guide`), language);
}

function related(destination, key, guide, language) {
  let links = (key === 'guia'
    ? [['guia', guideLabel], ['transportes', sections.transportes], ['consejos', sections.consejos]]
    : [['guia', guideLabel], ...['transportes', 'experiencias', 'naturaleza', 'consejos'].filter(item => item !== key).slice(0, 2).map(item => [item, sections[item]])]
  ).map(([slug, label]) => navLink(sectionPath(destination, slug), label, language, 'rd-action'));
  if (guide) {
    links = links.concat(Object.entries(destination.guide).filter(([slug]) => slug !== guide)
      .map(([slug, article]) => navLink(guidePath(destination, slug), article.title, language, 'rd-action')));
  }
  return `<nav class="rd-related" aria-label="${text(t('Sigue explorando', 'Continue explorando', 'Keep exploring'), language)}">${links.join('')}</nav>`;
}

function renderSection(destination, key, guide, language, route) {
  const item = guide ? destination.guide[guide] : destination.sections[key];
  const title = guide ? item.title : sections[key];
  const media = photos[destination.slug];
  const gallery = key === 'fotografias'
    ? [media.fotografias, media.home, media.cultura, media.familia, media.barrios, media.naturaleza].filter(Boolean).slice(0, 3)
    : [];
  const heading = guide ? guideLabel : key === 'experiencias'
    ? t('Elige tu salida', 'Escolha seu passeio', 'Choose your trip')
    : t('Paradas y planes', 'Paradas e programas', 'Places and plans');
  const cards = item.cards.map(({ title, copy, action }) => `<article class="bh-card rd-card"><h3>${text(title, language)}</h3>
    ${paragraph(copy, language)}${actionLink(action, destination, language, title)}</article>`).join('');
  return hero(title, destination.name, item.intro, language) + destinationNav(destination, route, language) +
    `<div class="rd-wrap bh-wrap">
      <section><h2>${text(heading, language)}</h2><div class="bh-grid rd-cards">${cards}</div></section>
      ${gallery.length ? `<div class="rd-gallery">${gallery.map(photo => `<figure>${photograph(photo, photo.alt || destination.name)}</figure>`).join('')}</div>` : ''}
      ${recommendation(item.tip, language)}${related(destination, key, guide, language)}
    </div>`;
}

function renderCatalog(language) {
  const buzios = { src: 'https://mediumturquoise-stinkbug-270478.hostingersite.com/FOTOS/HOME/BUZIOS/ENCABEZADO%20BUZIOS.png' };
  const title = t('Destinos de Ernestinho', 'Destinos do Ernestinho', 'Destinations with Ernestinho');
  const intro = t('De los palacios de la sierra a la Costa Verde y la Región de los Lagos. Elige un destino para abrir su guía, descubrir sus barrios y preparar el viaje.', 'Dos palácios da serra à Costa Verde e à Região dos Lagos. Escolha o destino para abrir o guia, conhecer os bairros e preparar a viagem.', 'From mountain palaces to the Green Coast and Lakes Region. Pick a destination to open its guide, explore the neighbourhoods and plan your trip.');
  const tiles = destinations.map(destination => tile(destinationPath(destination), destination.name, language, photos[destination.slug].home));
  tiles.push(tile('/destinos/buzios/', 'Búzios', language, buzios));
  return { title, intro, body: hero(title, 'ERNESTINHO CARIOCA', intro, language) +
    `<section class="guide-group rd-group"><h2>${text(t('Elige tu próximo destino', 'Escolha o próximo destino', 'Choose your next destination'), language)}</h2>
    <div class="guide-grid">${tiles.join('')}</div></section>` };
}

function renderCredits(language) {
  const intro = t('Imágenes redimensionadas para la web. Cada ficha enlaza a la fotografía original y a su licencia.', 'Imagens redimensionadas para a web. Cada ficha leva à foto original e à licença.', 'Images resized for the web. Each entry links to the original photograph and its licence.');
  const groups = destinations.map(destination => `<section><h2>${esc(destination.name)}</h2><ul class="rd-credit-list">${Object.values(photos[destination.slug]).filter(photo => photo.source).map(photo =>
    `<li>${external(photo.source, photo.file.replaceAll('_', ' ').replace(/\.[^.]+$/, ''), language)}
    <span>${esc(photo.artist || v(t('Autoría en la ficha original', 'Autoria na ficha original', 'Author listed in the original record'), language))} ·
    ${photo.licenseUrl ? external(photo.licenseUrl, photo.license, language) : esc(photo.license)}</span></li>`).join('')}</ul></section>`).join('');
  return { title: creditLabel, intro, body: hero(creditLabel, 'ERNESTINHO CARIOCA', intro, language) + `<div class="rd-wrap">${groups}</div>` };
}

function footer(destination, language) {
  const title = destination ? t(`¿Planeas viajar a ${destination.name}?`, `Vai viajar para ${destination.name}?`, `Planning a trip to ${destination.name}?`) :
    t('¿Cuál es tu próximo destino?', 'Qual é o próximo destino?', 'Where are you going next?');
  const copy = t('Cuéntame cuándo viajas y qué te gustaría conocer.', 'Conte quando viaja e o que gostaria de conhecer.', 'Tell me when you’re travelling and what you’d like to see.');
  return `<section class="ec-corporate-closing"><div class="ec-closing-cta">
    <div><h2>${text(title, language)}</h2>${paragraph(copy, language)}</div>
    ${external(contact(destination?.name || v(destinationsLabel, language), language), t('Hablar con Ernestinho', 'Falar com Ernestinho', 'Talk to Ernestinho'), language, 'rd-whatsapp')}
    </div><footer class="ec-corporate-footer">
    <div class="ec-footer-brand"><img src="/assets/brand/ec-mark.png" alt="" width="60" height="60" loading="lazy"><div><strong>ERNESTINHO <em>CARIOCA</em></strong><small>${text(t('RÍO DE JANEIRO, DESDE MI MIRADA', 'RIO DE JANEIRO, DO MEU JEITO', 'RIO DE JANEIRO THROUGH MY EYES'), language)}</small></div></div>
    <div class="ec-footer-legal"><p>© 2026 Ernestinho Carioca.</p>
    ${navLink(catalog, destinationsLabel, language)} · ${navLink(credits, creditLabel, language)} ·
    ${navLink('/privacidad-precios-condiciones/', t('Privacidad, precios y condiciones', 'Privacidade, preços e condições', 'Privacy, prices and terms'), language)}</div>
    </footer></section>`;
}

export function renderRegionalRoute(route, language) {
  const { destination, key, guide } = routes.get(route);
  const content = route === catalog ? renderCatalog(language) : route === credits ? renderCredits(language) : null;
  const title = content?.title || (guide ? destination.guide[guide].title : key === 'guia' ? guideTitle(destination, language) : key ? sections[key] : destination.name);
  const description = content?.intro || (guide ? destination.guide[guide].intro : key && key !== 'guia' ? destination.sections[key].intro : destination.intro);
  const body = content?.body || (!key ? renderHome(destination, language) :
    key === 'guia' && !guide ? guideIndex(destination, language) : renderSection(destination, key, guide, language, route));
  const image = destination && (photos[destination.slug][key] || photos[destination.slug].home);
  const metaTitle = key && key !== 'guia' ? `${v(title, language)} · ${destination.name}` : v(title, language);
  const locale = language === 'PT' ? 'pt-BR' : language.toLowerCase();
  const labels = { ES: 'Español', PT: 'Português', EN: 'English' };
  const languages = langs.map(code =>
    `<a href="${pre(code) + route}" hreflang="${code === 'PT' ? 'pt-BR' : code.toLowerCase()}"${code === language ? ' aria-current="page"' : ''}>${labels[code]}</a>`).join('');
  const stylesheets = ['tokens', 'app', 'components', 'barrios', 'regional-destinations']
    .map(name => `<link rel="stylesheet" href="/assets/css/${name}.css${name === 'regional-destinations' ? '?v=20261107' : ''}">`).join('');
  return `<!doctype html>
<html lang="${locale}" data-ec-locale-routes="true"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="/assets/brand/ec-mark.png">
<meta name="theme-color" content="#071c1b">
${head(route, language, metaTitle, v(description, language))}
${image ? `<meta property="og:image" content="${esc(origin + image.src)}"><meta name="twitter:image" content="${esc(origin + image.src)}">` : ''}
${stylesheets}${rioGuideStyles}</head>
<body class="ec-regional">
<a class="skip" href="#contenido">${text(t('Saltar al contenido', 'Pular para o conteúdo', 'Skip to content'), language)}</a>
<header class="topbar">
<a class="brand" href="${pre(language)}/" aria-label="Ernestinho Carioca"><img src="/assets/brand/ec-mark.png" alt="" width="44" height="44"></a>
<nav aria-label="${text(t('Navegación principal', 'Navegação principal', 'Main navigation'), language)}">
${navLink('/guia/', t('Guía de Río', 'Guia do Rio', 'Rio Guide'), language)}${navLink(catalog, destinationsLabel, language)}${navLink('/destinos/buzios/', 'Búzios', language)}
</nav><div class="tools"></div></header>
<main id="contenido" data-live="regional">
${breadcrumbs(destination, key, guide, route, language)}${body}</main>
<nav class="rd-languages" aria-label="${text(t('Idiomas', 'Idiomas', 'Languages'), language)}">${languages}</nav>
${footer(destination, language)}
<script type="module" src="/assets/js/site.js"></script></body></html>`;
}

const stage = process.argv.find(arg => arg.startsWith('--stage='))?.slice('--stage='.length);
if (stage) {
  for (const route of regionalRoutes) for (const language of langs) {
    const file = path.join(stage, (pre(language) + route).slice(1), 'index.html');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, renderRegionalRoute(route, language));
  }
  console.log(`Rendered ${regionalRoutes.length * langs.length} regional pages`);
}
