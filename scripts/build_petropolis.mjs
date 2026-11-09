import { renderVenueSection, venueRoutes } from './petropolis_mesas.mjs';
import { esc, pre, styles, v } from './buzios_mirror_core.mjs';
import { t } from '../assets/js/translations/destinos/modelo.js';
import { regionalTransport } from '../assets/js/translations/destinos/transportes-regionales.js';
import { regionalPlaces } from '../assets/js/translations/destinos/regional-lugares.js';
import { places, placeSections, photoSpots } from '../assets/js/translations/destinos/petropolis-lugares.js';
import { photographyCards } from './regional_photography.mjs';
import { petrSpotInfo } from '../assets/js/translations/destinos/fotografia-regional.js';
import { practicalGuidePage, monthlyGuidePage, petropolisTransportPage } from './petropolis_practical_pages.mjs';
import { transportDetails } from '../assets/js/translations/destinos/petropolis-transporte-local.js';
import { extraCards, transport } from '../assets/js/translations/destinos/petropolis-practico.js';

import { morePhotoSpots } from '../assets/js/translations/destinos/petropolis-fotografia-local.js';
import { localPhotos, photoCredit } from '../assets/js/translations/destinos/petropolis-fotos.js';
import { petropolisCultureEditorial } from '../assets/js/translations/destinos/petropolis-cultura-editorial.js';

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

const petrCultureCss = `<style>
.petr-culture-overview{padding:20px 0 28px}
.petr-culture-overview h2{color:#124c43;font-size:clamp(1.45rem,3vw,2rem);margin:0 0 14px}
.petr-culture-overview-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}
.petr-culture-overview-grid article{padding:22px;border:1px solid #c8e2d8;background:#edf7f3;border-radius:20px}
.petr-culture-overview-grid article:nth-child(2){background:#fff5e6;border-color:#f0d7a7}
.petr-culture-overview-grid h3{margin:0 0 10px;font-size:1.13rem;color:#125147}
.petr-culture-overview-grid p{font-size:.95rem;line-height:1.75;margin:0}
.petr-culture-depth{display:grid;gap:16px;margin:24px 0}
.petr-culture-depth article{border-radius:20px;padding:clamp(18px,2.8vw,26px);border:1px solid #c9e0d8;background:#f0f7f4}
.petr-culture-depth article:nth-child(2){background:#fff5e6;border-color:#edd9b5}
.petr-culture-depth article:nth-child(3){background:#f6f8fa;border-color:#dae1e8}
.petr-culture-depth h3{font-size:clamp(1.1rem,2vw,1.35rem);margin:0 0 10px;color:#0b5046}
.petr-culture-depth p{line-height:1.8;margin:0;color:#254c43}
.petr-culture-map{display:inline-block;padding:10px 16px;background:#125f53;color:#fff !important;font-weight:700;text-decoration:none;border-radius:999px;margin:14px 0}
.petr-culture-sources{margin-top:18px;border-top:1px solid #d4e5df;padding-top:12px}
.petr-culture-sources a{display:inline-block;color:#0b5549;margin:5px 12px 5px 0;font-size:.91rem}
.culture-grid .culture-card:not(:has(img)){background:#f0f7f4;border:1px solid #d2e6df;border-radius:18px;padding:15px}
@media(max-width:780px){.petr-culture-overview-grid{grid-template-columns:1fr}}
</style>`;
function cultureOverview(lang) {
  const topics = [
    [t('Imperio y arquitectura','Império e arquitetura','Empire and architecture'),
      t('El palacio, la Catedral, los jardines y las casonas explican cómo nació la ciudad de veraneo de la corte.',
        'Palácio, Catedral, jardins e casarões mostram como nasceu a cidade de veraneio da corte.',
        'Palace, cathedral, gardens and mansions tell how the summer city of the court developed.')],
    [t('República, guerra y memoria','República, guerra e memória','Republic, war and memory'),
      t('Palácio Rio Negro, Casa Stefan Zweig y Museu da FEB revelan otros capítulos del siglo XX.',
        'Palácio Rio Negro, Casa Stefan Zweig e Museu da FEB revelam outros capítulos do século XX.',
        'Rio Negro Palace, Casa Stefan Zweig and the FEB museum tell other 20th-century stories.')],
    [t('Arte, oficios e inmigración','Arte, ofícios e imigração','Art, craft and immigration'),
      t('Casa do Colono, el centro cultural y los museos de porcelana y de cera amplían el recorrido más allá de los palacios.',
        'Casa do Colono, centro cultural e museus de porcelana e cera ampliam o roteiro além dos palácios.',
        'Casa do Colono, the cultural centre and porcelain and wax museums broaden the visit beyond palaces.')],
  ];
  return `<section class="petr-culture-overview">
    <h2>${tx(t('Una ciudad, muchas historias','Uma cidade, muitas histórias','One city, many stories'), lang)}</h2>
    <div class="petr-culture-overview-grid">${topics.map(([title,copy])=>`<article><h3>${tx(title,lang)}</h3>${p(copy,lang)}</article>`).join('')}</div>
  </section>`;
}
function cultureDetail(slug,lang) {
  const entry = petropolisCultureEditorial[slug];
  if (!entry) return '';
  const blocks = [
    [t('La historia detrás de este lugar', 'A história por trás deste lugar', 'The history behind this place'), entry.history],
    [t('Qué mirar durante la visita', 'O que observar na visita', 'What to look for'), entry.details],
    [t('Acceso y consejos prácticos', 'Acesso e dicas práticas', 'Access and practical advice'), entry.access],
  ];
  const src = entry.sources.map(([url,label])=>`<a href="${esc(url)}" rel="noopener noreferrer" target="_blank">${esc(label)}</a>`).join('');
  const href = 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(entry.address);
  return `<div class="petr-culture-depth">
    ${blocks.map(([title,body])=>`<article><h3>${tx(title,lang)}</h3>${p(body,lang)}</article>`).join('')}
    <div><a class="petr-culture-map" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${tx(t('Abrir dirección exacta en el mapa', 'Abrir endereço exato no mapa', 'Open exact address on map'),lang)}</a>
    <div class="petr-culture-sources"><strong>${tx(t('Fuentes y enlaces útiles','Fontes e links úteis','Sources and useful links'),lang)}</strong><div>${src}</div></div></div>
  </div>`;
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
  const petrCulture = config === petropolisCatalog && key === 'cultura';
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
    : cover(title, intro, lang, city.name) + `<div class="culture-index">${petrCulture ? cultureOverview(lang) : ''}<section class="culture-section culture-categories">
      <p class="culture-kicker">ERNESTINHO CARIOCA</p><h2>${tx(t('Elige qué visitar', 'Escolha o que visitar', 'Choose what to visit'), lang)}</h2>
      <div class="culture-grid">${cards}</div></section><aside class="culture-note">${p(tip, lang)}</aside></div>`;
  return { title, intro, body, css: [family ? 'familia' : 'cultura'], bodyClass: family ? 'familia-index-page' : '', inline: petrCulture ? petrCultureCss : '' };
}

function placeDetail(key, slug, lang, config = petropolisCatalog, cityName = 'Petrópolis') {
  const { base, places, photos } = config;
  const place = places[slug];
  const family = key === 'familia';
  const photo = photos[place.image];
  const cultureData = config === petropolisCatalog && key === 'cultura' ? petropolisCultureEditorial[slug] : null;
  const queryLocation = place.map ? place.map + ', ' + cityName + ', RJ' : cultureData?.address;
  const mapUrl = queryLocation ? 'https://www.google.com/maps/search/?api=1&amp;query=' + encodeURIComponent(queryLocation) : '';
  const map = mapUrl ? `<a class="rd-action" href="${mapUrl}" target="_blank" rel="noopener noreferrer">${tx(t('Abrir en el mapa ↗', 'Abrir no mapa ↗', 'Open on map ↗'), lang)}</a>` : '';
  const body = family
    ? `<section class="family-detail"><div class="family-wrap">${link(base + key + '/', back, lang, 'family-back family-back-dark')}
      <div class="family-detail-intro"><span>${esc(place.area)}</span><h1>${esc(place.name)}</h1>${p(place.description, lang)}</div>
      ${photo ? `<div class="family-detail-hero"><div class="family-hero">${image(photo, '', true)}<div><span>${esc(place.area)}</span><h2>${esc(place.name)}</h2></div></div></div>` : ''}
      <section class="family-experience"><h2>${tx(practical, lang)}</h2>${p(place.visit, lang)}${map}</section>
      <section class="family-experience"><h2>${tx(combine, lang)}</h2>${localPlaceLink(place.combine, lang, config)}</section></div></section>`
    : cover(place.name, place.description, lang, cityName) + `<div class="culture-index">${link(base + key + '/', back, lang, 'culture-back')}
      ${photo ? `<div class="culture-gallery"><figure>${image(photo, '', true)}</figure></div>` : ''}
      <section class="culture-section"><h2>${tx(practical, lang)}</h2>${p(place.visit, lang)}${map}${cultureData ? cultureDetail(slug,lang) : ''}</section>
      <aside class="culture-note"><b>${tx(combine, lang)}</b><p>${localPlaceLink(place.combine, lang, config)}</p></aside></div>`;
  return { title: place.name, intro: place.description, image: config === petropolisCatalog ? photo : photo || null, body, css: [family ? 'familia' : 'cultura'], bodyClass: family ? 'familia-detail-page' : '', inline: cultureData ? petrCultureCss : '' };
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
  const photoRoutes = [
    {
      name: t('Centro histórico a pie', 'Centro histórico a pé', 'Historic centre on foot'),
      time: t('Medio día, sin museos largos', 'Meio dia, sem visitas longas a museus', 'Half a day without long museum visits'),
      route: t('Museu Imperial → Catedral y Avenida Koeler → Palácio de Cristal → Casa da Ipiranga.',
        'Museu Imperial → Catedral e Avenida Koeler → Palácio de Cristal → Casa da Ipiranga.',
        'Museu Imperial → Cathedral and Avenida Koeler → Crystal Palace → Casa da Ipiranga.'),
      guide: 'barrios/centro-historico/',
      map: 'Museu Imperial, Rua da Imperatriz 220, Petrópolis, RJ',
    },
    {
      name: t('Arquitectura y paisaje de la sierra', 'Arquitetura e paisagem da serra', 'Architecture and mountain scenery'),
      time: t('Medio día o más con traslados', 'Meio dia ou mais com deslocamentos', 'Half a day or longer with transfers'),
      route: t('Quitandinha y su lago → antigua Estação Nogueira → Itaipava. Elige solo las paradas que se adapten a tu tiempo; no es un trayecto a pie.',
        'Quitandinha e o lago → antiga Estação Nogueira → Itaipava. Escolha paradas conforme seu tempo; não é roteiro a pé.',
        'Quitandinha and its lake → old Estação Nogueira → Itaipava. Choose stops according to your time; this is not a walking route.'),
      guide: 'transportes/entre-distritos/',
      map: 'Centro Cultural Sesc Quitandinha, Petrópolis, RJ',
    },
  ];
  const routesBody = `<section class="editorial petr-photo-routes" id="rutas-fotograficas">
    <h2>${tx(t('Dos recorridos fotográficos que haría', 'Dois roteiros fotográficos que eu faria', 'Two photo walks I would plan'), lang)}</h2>
    <p class="petr-photo-route-lead">${tx(t('No hace falta correr por todos los puntos. Combina lugares próximos y reserva el traslado para la sierra.',
      'Não precisa correr por todos os pontos. Combine lugares próximos e reserve deslocamento para a serra.',
      'You do not need to rush to every spot. Group nearby places and save transport time for the mountains.'), lang)}</p>
    <div class="petr-photo-route-grid">${photoRoutes.map(route => `<article>
      <span>${tx(route.time, lang)}</span><h3>${tx(route.name, lang)}</h3>${p(route.route, lang)}
      <div class="petr-photo-route-links">
        ${link(base + route.guide, t('Guía para organizarlo', 'Guia para organizar', 'How to plan this route'), lang, 'photo-map')}
        <a class="photo-map" href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(route.map)}" target="_blank" rel="noopener noreferrer">${tx(t('Abrir el primer punto', 'Abrir primeira parada', 'Open first stop'), lang)}</a>
      </div></article>`).join('')}</div>
    </section>`;
  const safetyBody = `<aside class="editorial petr-photo-safety">
    <h2>${tx(t('Fotografiar con respeto y seguridad', 'Fotografar com respeito e segurança', 'Photography with care'), lang)}</h2>
    ${p(t('Desde la calle, evita entrar a viviendas, jardines privados o locales cerrados. Antes de fotografiar dentro de iglesias o museos, pregunta por las reglas vigentes. En la sierra, la niebla y la lluvia pueden cambiar rápidamente la visibilidad: no te acerques a taludes, bordes del agua o carreteras para conseguir una toma.',
      'Na rua, não entre em casas, jardins privados ou locais fechados. Antes de fotografar em igrejas ou museus, confira as regras. Na serra, neblina e chuva mudam a visibilidade rapidamente: não se aproxime de barrancos, margens ou pistas para conseguir uma foto.',
      'From the street, stay off private property and out of closed venues. Check rules before photographing inside churches or museums. Mountain fog and rain can quickly change visibility: avoid embankments, shore edges and roadways for a photo.'), lang)}
  </aside>`;
  const photoExtrasCss = `<style>
  .petr-photo-routes{padding-block:clamp(22px,4vw,45px)}
  .petr-photo-routes h2,.petr-photo-safety h2{color:#153d36;font-size:clamp(1.4rem,3vw,2rem);margin:0 0 12px}
  .petr-photo-route-lead{color:#3e5a52;font-size:1.02rem;line-height:1.7;max-width:72ch}
  .petr-photo-route-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:17px;margin-top:22px}
  .petr-photo-route-grid article{border:1px solid #d4e1d9;background:#eff7f2;padding:clamp(18px,3vw,30px);border-radius:23px}
  .petr-photo-route-grid article:nth-child(2){background:#fff7e8;border-color:#eddfc3}
  .petr-photo-route-grid article>span{font-size:.82rem;font-weight:800;color:#16574d;display:block;margin-bottom:10px}
  .petr-photo-route-grid h3{font-family:Georgia,serif;color:#153d36;font-size:clamp(1.17rem,2.4vw,1.5rem);margin:0 0 10px}
  .petr-photo-route-grid p{line-height:1.75;color:#3e5a52;margin:0}
  .petr-photo-route-links{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
  .petr-photo-route-links .photo-map{min-height:40px;align-items:center;justify-content:center;text-decoration:none}
  .petr-photo-safety{border-left:4px solid #d19b45;background:#fbf6ea;padding-block:20px;margin-block:12px 28px}
  .petr-photo-safety p{color:#34544b;line-height:1.75;max-width:86ch}
  @media(max-width:680px){.petr-photo-route-grid{grid-template-columns:1fr}.petr-photo-route-links{flex-direction:column}.petr-photo-route-links .photo-map{width:100%;box-sizing:border-box}}
  </style>`;
  return { title, intro, body: cover(title, intro, lang) + routesBody + photographyCards(spots, lang, city.name) + safetyBody +
    `<aside class="editorial"><ul>${credits.map(credit => '<li>' + credit + '</li>').join('')}</ul></aside>`,
    inline: styles('fotografia') + photoExtrasCss };
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
    if (isPetr && transportDetails[slug]) return petropolisTransportPage(transportDetails[slug], slug, name, summary, petrPhotos, lang);
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
    const photo = isPetr && transportDetails[mode] ? petrPhotos[transportDetails[mode].image] : isCaboFrio ? photos['transportes-' + mode] :
      mode === 'barcos' ? photos['transportes-barcos'] || photos['spot-praia-dos-anjos'] :
      { src: '/FOTOS/HOME/DESTINOS/20261107-plantillas/transportes/' + mode + '.webp', alt: v(name, lang) };
    return `<article class="tcard source-transport">${image(photo && { ...photo, alt: photo.alt || v(name, lang) }, 'transport-thumb')}<div class="transport-content"><i aria-hidden="true">${icon}</i>
      <b>${tx(name, lang)}</b><strong>${esc(area)}</strong>${p(copy, lang)}</div>
      ${link(base + 'transportes/' + mode + '/', open, lang, 'detail-link')}</article>`;
  }).join('');
  const coverPhoto = isPetr && petrPhotos['catedral-paisaje'];
  const banner = coverPhoto
    ? `<section class="hero"><div class="hero-visual">${image(coverPhoto, '', true)}</div><div class="hero-copy">
      <p class="kicker">ERNESTINHO CARIOCA · PETRÓPOLIS</p><h1>${tx(title, lang)}</h1><p class="lead">${tx(intro, lang)}</p>
      ${link(base + 'transportes/onibus/#trayectos', t('Ver rutas de las micros', 'Ver linhas de ônibus', 'See local bus routes'), lang, 'primary')}</div></section>`
    : cover(title, intro, lang, city.name);
  return { title, intro, body: banner + `<section class="transport"><div class="tgrid">${cards}</div>${note(tip, lang)}</section>`, inline: styles('transportes') };
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
  const covers = { 'primera-visita': 'museu', llegada: 'palacio', 'clima-y-lluvia': 'quitandinha' };
  if (slug) {
    const guide = city.guide[slug];
    if (guide.months) return monthlyGuidePage(guide, petrPhotos, lang);
    if (guide.sections) {
      const template = ['emergencias', 'accesibilidad', 'terminales'].includes(slug) ? 'guia/' + slug : 'guia/viajar-solo';
      return practicalGuidePage(guide, petrPhotos, lang, template);
    }
    return renderGuideArticle(city, guide, petrPhotos[guide.image || covers[slug]], lang);
  }
  const groups = [
    [t('Antes de viajar', 'Antes de viajar', 'Before you travel'), ['clima-y-lluvia', 'mes-a-mes', 'accesibilidad', 'viajar-solo', 'emergencias']],
    [t('Moverse', 'Como se locomover', 'Getting around'), ['llegada', 'terminales', 'sin-auto', 'guarda-equipaje']],
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
