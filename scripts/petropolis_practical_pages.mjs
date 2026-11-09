import { esc, map, pre, styles, v } from './buzios_mirror_core.mjs';
import { t } from '../assets/js/translations/destinos/modelo.js';
import { photoCredit } from '../assets/js/translations/destinos/petropolis-fotos.js';

const base = '/destinos/petropolis/';
const text = (copy, lang) => esc(v(copy, lang));
const paragraph = (copy, lang) => '<p>' + text(copy, lang) + '</p>';
const mapLabel = t('Abrir en el mapa', 'Abrir no mapa', 'Open on map');
const detailsLabel = t('Ver guía relacionada', 'Ver guia relacionado', 'Read the related guide');
const faqTitle = t('Preguntas frecuentes', 'Perguntas frequentes', 'Frequently asked questions');
const sourceTitle = t('Fuentes y consultas', 'Fontes e consultas', 'Sources and travel information');
const contentsTitle = t('En esta página', 'Nesta página', 'On this page');
const connectionsTitle = t('Trayectos y paradas', 'Trajetos e pontos', 'Routes and stops');
const tipTitle = t('Consejo de Ernestinho', 'Dica do Ernestinho', 'Ernestinho’s tip');

const localLink = (route, label, lang, cls) =>
  `<a class="${cls}" href="${pre(lang) + base + route}">${text(label, lang)} →</a>`;
const external = ([url, label], lang, cls) =>
  `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${text(label, lang)}</a>`;

function picture(photo, className, lang, eager = false) {
  return `<figure class="${className}"><img src="${esc(photo.src)}" alt="${esc(photo.alt)}" decoding="async"
    ${eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'}><figcaption>${esc(photo.alt)}${photo.author ? ' · ' + photoCredit(photo, lang) : ''}</figcaption></figure>`;
}

function contents(sections, lang, className) {
  return `<nav class="petr-page-contents" aria-label="${text(contentsTitle, lang)}">${sections.map(({ id, title }) =>
    `<a class="${className}" href="#${id}">${text(title, lang)}</a>`).join('')}</nav>`;
}

function numbered(heading, copy, lang, index, extras = '', id = '') {
  return `<article${id ? ` id="${id}"` : ''}><span>${String(index + 1).padStart(2, '0')}</span>
    <h${id ? 2 : 3}>${text(heading, lang)}</h${id ? 2 : 3}>${paragraph(copy, lang)}${extras}</article>`;
}

export function practicalGuidePage(data, photos, lang, template) {
  const { title, intro, sections, faq, sources } = data;
  const image = photos[data.image];
  const photoClass = template === 'guia/emergencias' ? 'ec-guide-photo' : 'ec-inline-photo';
  const sectionCards = sections.map(({ id, title, copy, image, map: location, route, links = [], phones = [] }, index) => {
    const extra = (location ? map(location, v(mapLabel, lang)) : '') +
      (route ? localLink(route, detailsLabel, lang, 'ext') : '') +
      phones.map(([number, label]) => `<a class="ext" href="tel:${number}">${text(label, lang)} · ${number}</a>`).join('') +
      links.map(source => external(source, lang, 'ext')).join('');
    return numbered(title, copy, lang, index, extra, id) +
      (image ? picture(photos[image], photoClass, lang) : '');
  }).join('');
  return {
    title, intro, image, inline: styles(template) + '<style>.guide .petr-page-contents{flex-wrap:wrap;gap:0}</style>',
    body: `<section class="guide"><p class="kicker">ERNESTINHO CARIOCA · PETRÓPOLIS</p>
      <h1>${text(title, lang)}</h1><p class="intro">${text(intro, lang)}</p>
      <aside class="tip"><b>${text(tipTitle, lang)}</b>${paragraph(data.tip, lang)}</aside>
      ${picture(image, photoClass, lang, true)}
      ${contents(sections, lang, 'ext')}
      <section class="items">${sectionCards}</section>
      <h2>${text(faqTitle, lang)}</h2>
      <section class="items">${faq.map(([q, a], index) => numbered(q, a, lang, index)).join('')}</section>
      <h2>${text(sourceTitle, lang)}</h2>${sources.map(source => external(source, lang, 'ext')).join('')}
      ${(data.relatedLinks || [['transportes/vans/#trayectos', t('Trayectos y paradas de autobús', 'Trajetos e pontos de ônibus', 'Bus routes and stops')]])
        .map(([route, label]) => localLink(route, label, lang, 'ext')).join('')}
      ${localLink('guia/', t('Volver a la guía', 'Voltar ao guia', 'Back to the guide'), lang, 'ext')}</section>`,
  };
}

export function monthlyGuidePage(data, photos, lang) {
  const { title, intro, months, tip, sources } = data;
  const image = photos[data.image];
  const monthCards = months.map(({ title, low, high, rain, plan }, index) =>
    `<article id="mes-${index + 1}" class="month-card"><h2>${text(title, lang)}</h2>
      <p><strong>${low}–${high} °C</strong> · ${rain} mm</p>
      <h3>${text(t('Mi plan del mes', 'Meu plano do mês', 'My plan for the month'), lang)}</h3>
      ${paragraph(plan, lang)}</article>`).join('');
  return {
    title, intro, image,
    inline: styles('guia/mes-a-mes') + '<style>.season .month-toolbar{flex:initial}.season .month-toolbar a,.season .source-link{border:1px solid #0b6158;background:white;border-radius:999px;padding:.55rem .8rem;color:#064b44;font-weight:700}.season .ec-guide-photo a{color:inherit}</style>',
    body: `<section class="season">${picture(image, 'ec-guide-photo', lang, true)}
      ${localLink('guia/', t('Volver a la guía', 'Voltar ao guia', 'Back to the guide'), lang, 'ext')}
      <p class="eyebrow">ERNESTINHO CARIOCA · PETRÓPOLIS</p><h1>${text(title, lang)}</h1><p class="season-intro">${text(intro, lang)}</p>
      <p>${text(t('Las cifras muestran medias de temperaturas mínimas y máximas y lluvia mensual según la serie de Climatempo. Consulta el pronóstico para tus fechas.',
        'Os números mostram médias de mínimas e máximas e chuva mensal segundo a série do Climatempo. Consulte a previsão para suas datas.',
        'Figures show mean lows, highs and monthly rainfall from Climatempo’s historical series. Check the forecast for your dates.'), lang)}</p>
      <nav class="month-toolbar" aria-label="${text(contentsTitle, lang)}">${months.map(({ title }, index) =>
        `<a href="#mes-${index + 1}">${text(title, lang)}</a>`).join('')}</nav>
      <div class="month-grid">${monthCards}</div>
      <aside class="month-extra"><h2>${text(tipTitle, lang)}</h2>${paragraph(tip, lang)}
      ${localLink('guia/clima-y-lluvia/', t('Plan de lluvia', 'Plano de chuva', 'Rainy-day plans'), lang, 'ext')} ·
      ${localLink('eventos/', t('Calendario de eventos', 'Calendário de eventos', 'Events calendar'), lang, 'ext')}</aside>
      <section class="month-extra"><h2>${text(sourceTitle, lang)}</h2>
      <div class="source-list">${sources.map(source => external(source, lang, 'source-link')).join('')}</div></section></section>`,
  };
}

export function petropolisTransportPage(data, mode, title, intro, photos, lang) {
  const { sections, faq, sources, related } = data;
  const image = photos[data.image];
  const vans = mode === 'vans';
  const photoFirst = vans || mode === 'onibus';
  const hero = photoFirst ? `<img class="hero-image" src="${esc(image.src)}" alt="${esc(image.alt)}" fetchpriority="high">
    <div class="guide-photo-caption">${esc(image.alt)}${image.author ? ' · ' + photoCredit(image, lang) : ''}</div>` : picture(image, 'guide-photo guide-hero-photo', lang, true);
  const mapButton = location => map(location, v(mapLabel, lang)).replace('class="ext"', 'class="text-action"');
  const planRoute = (from, to, isReturn = false) => external([
    'https://www.google.com/maps/dir/?' + new URLSearchParams({ api: '1', origin: from, destination: to, travelmode: 'transit' }),
    isReturn
      ? t('Planificar regreso en el mapa', 'Planejar a volta no mapa', 'Plan the return on the map')
      : t('Planificar ida en el mapa', 'Planejar a ida no mapa', 'Plan the outbound trip on the map'),
  ], lang, 'source-link');
  const connectionGuide = data.connections ? `<section id="trayectos" class="guide-section">
    <h2>${text(connectionsTitle, lang)}</h2>
    ${paragraph(t('Elige tu trayecto y consulta el sentido de ida y vuelta para el día que viajas.',
      'Escolha seu trajeto e confira os sentidos de ida e volta para o dia da viagem.',
      'Choose your route and check both directions for your travel date.'), lang)}
    <p class="petr-info-date">${text(t('Recorridos y horarios de referencia consultados el 9 de noviembre de 2026. No son un rastreador de vehículos en vivo; confirma el servicio antes de salir.',
      'Itinerários e horários de referência consultados em 9 de novembro de 2026. Não é rastreamento ao vivo; confira o serviço antes de sair.',
      'Reference routes and timetables checked on 9 November 2026. This is not live vehicle tracking; confirm service before travelling.'), lang)}</p>
    <ul class="petr-connections">${data.connections.map(({ title, service, boarding, location, from, links, stops = [], serviceNote }) =>
      `<li class="aside-card"><span class="fact-pill">${esc(service)}</span><h3>${text(title, lang)}</h3>
        ${paragraph(boarding, lang)}
        ${stops.length ? `<div class="petr-route-stops"><strong>${text(t('Paradas y puntos de referencia principales', 'Pontos e referências principais', 'Key stops and landmarks'), lang)}</strong>
          <ol>${stops.map(stop => `<li>${esc(stop)}</li>`).join('')}</ol></div>` : ''}
        ${serviceNote ? `<div class="petr-service-note">${paragraph(serviceNote, lang)}</div>` : ''}
        <div class="petr-route-actions">${mapButton(location)}${from ? planRoute(from, location) + planRoute(location, from, true) : ''}</div>
        <div class="source-list">${links.map(source => external(source, lang, 'source-link')).join('')}</div></li>`).join('')}</ul>
    </section>` : '';
  const navigation = data.connections ? [{ id: 'trayectos', title: connectionsTitle }, ...sections] : sections;
  const chapter = ({ id, title, copy, map: location, image, links = [], tone = '' }) =>
    `<section id="${id}" class="guide-section${tone ? ' ec-adn ' + tone : ''}"><h2>${text(title, lang)}</h2>${paragraph(copy, lang)}
      ${location ? mapButton(location) : ''}${links.map(source => external(source, lang, 'source-link')).join('')}</section>
      ${image ? picture(photos[image], 'guide-photo', lang) : ''}`;
  const relatedRoute = 'transportes/' + related + (mode === 'uber' || vans ? '#trayectos' : '');
  const relatedLabel = data.relatedLabel || t('Vans y transporte colectivo', 'Vans e transporte coletivo', 'Vans and public transport');
  const side = `<aside class="guide-aside"><section class="aside-card"><h2>${text(contentsTitle, lang)}</h2>
    ${contents(navigation, lang, 'text-action')}</section><section class="aside-card"><h2>${text(t('Sigue organizando el viaje', 'Continue planejando a viagem', 'Keep planning your trip'), lang)}</h2>
    ${localLink(relatedRoute, relatedLabel, lang, 'action')}
    ${localLink('guia/llegada/', t('Cómo llegar a Petrópolis', 'Como chegar a Petrópolis', 'Getting to Petrópolis'), lang, 'text-action')}</section></aside>`;
  const connectionStyles = data.connections ? `<style>
    .petr-connections{display:grid;gap:12px;padding:0;list-style:none}
    .petr-connections .fact-pill{margin:0 0 8px}
    .petr-connections h3{margin:0 0 8px}
    .petr-connections .source-list{margin-top:10px}
    .petr-info-date{font-size:.88rem;line-height:1.6;color:#465d57;margin:1rem 0}
    .petr-route-stops{margin:16px 0 12px}
    .petr-route-stops strong{display:block;font-size:.88rem;margin-bottom:10px;color:#173d38}
    .petr-route-stops ol{list-style:none;padding:0;display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0}
    .petr-route-stops li{display:inline-flex;align-items:center;background:#e9f4f1;color:#15554c;border:1px solid #c8e3db;border-radius:12px;padding:7px 9px;font-size:.85rem;line-height:1.4}
    .petr-route-stops li+li::before{content:'→';font-weight:bold;margin-right:8px;color:#286e61}
    .petr-service-note{border-left:4px solid #e5a735;padding:9px 12px;background:#fff7e9;margin:12px 0}
    .petr-service-note p{margin:0;font-size:.95rem;line-height:1.7}
    .petr-route-actions{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0 6px}
    @media(max-width:540px){.petr-route-stops ol{display:grid;gap:6px}.petr-route-stops li{width:100%;box-sizing:border-box}.petr-route-actions{display:grid}}
  </style>` : '';
  return {
    title, intro, image, inline: styles('transportes/uber') + '<style>.guide-aside .petr-page-contents{display:block}.guide-photo-caption{margin-top:9px;color:#61706a;font-size:13px;line-height:1.5}</style>' + connectionStyles, css: ['transit-guides'],
    body: `<section class="transit-guide">${photoFirst ? hero : ''}<div class="guide-intro"><p class="kicker">ERNESTINHO CARIOCA · PETRÓPOLIS</p>
      <h1>${text(title, lang)}</h1><p class="guide-dek">${text(intro, lang)}</p>
      <span class="fact-pill">${text(data.badge || (vans ? t('Autobús urbano · intermunicipal · van privada', 'Ônibus urbano · intermunicipal · van particular', 'Local bus · intercity coach · private van') :
        t('Tarifa dinámica · matrícula · punto de recogida', 'Tarifa dinâmica · placa · ponto de embarque', 'Dynamic fare · licence plate · pickup point')), lang)}</span></div>
      ${photoFirst ? '' : hero}
      <div class="guide-layout"><article class="guide-copy">${connectionGuide}${sections.map(chapter).join('')}
      <section class="guide-section ec-adn ec-teal"><h2>⭐ ${text(tipTitle, lang)}</h2>${paragraph(data.tip, lang)}</section>
      <section class="guide-section ec-faq"><h2>${text(faqTitle, lang)}</h2>
      ${faq.map(([q, a]) => `<details><summary>${text(q, lang)}</summary>${paragraph(a, lang)}</details>`).join('')}</section>
      <section class="guide-section sources"><h2>${text(sourceTitle, lang)}</h2><div class="source-list">
      ${sources.map(source => external(source, lang, 'source-link')).join('')}</div></section>
      ${localLink('transportes/', t('Volver a Transportes', 'Voltar a Transportes', 'Back to Transport'), lang, 'text-action')}</article>${side}</div></section>`,
  };
}
