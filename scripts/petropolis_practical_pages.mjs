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
  const { title, intro, sections, faq, sources, quickFacts = [], emergencyNumbers = [], dayPlans = [] } = data;
  const image = photos[data.image];
  const urgent = emergencyNumbers.length ? `<nav class="petr-urgent-actions" aria-label="${text(t('Teléfonos de emergencia','Telefones de emergência','Emergency phone numbers'),lang)}">
    <h2>${text(t('¿Necesitas ayuda ahora?','Precisa de ajuda agora?','Need help right now?'),lang)}</h2>
    <div>${emergencyNumbers.map(([number,label]) => `<a href="tel:${number}" aria-label="${text(label,lang)} ${number}">
      <strong>${number}</strong><span>${text(label,lang)}</span></a>`).join('')}</div>
  </nav>` : '';
  const quick = quickFacts.length ? `<section class="petr-quick-facts" aria-label="${text(t('Orientación rápida','Orientação rápida','Quick orientation'),lang)}">
    <h2>${text(t('Encuentra tu opción','Encontre sua opção','Find your best option'),lang)}</h2>
    <div class="petr-fact-grid">${quickFacts.map(([title,value,note]) => `<article class="petr-fact-card">
      <h3>${text(title,lang)}</h3><strong>${text(value,lang)}</strong><p>${text(note,lang)}</p></article>`).join('')}</div>
  </section>` : '';

  // Optional itineraries share the approved Rio guide template, with Petrópolis-only
  // editorial components. No new global CSS or edits to the 586 protected pages.
  const planTabs = dayPlans.length ? `<nav class="petr-itin-tabs" aria-label="${text(t('Elegir itinerario', 'Escolher roteiro', 'Choose an itinerary'),lang)}">
    ${dayPlans.map(({id,title})=>`<a href="#${esc('roteiro-'+id)}">${text(title,lang)}</a>`).join('')}
  </nav>` : '';
  const planCards = dayPlans.length ? `<section class="petr-itinerary-plans" id="planes">
    <h2>${text(t('Recorridos con paradas reales','Roteiros com paradas reais','Routes with actual places to visit'),lang)}</h2>
    ${planTabs}
    <div class="petr-day-grid">${dayPlans.map(({id,title,subtitle,stops,transport,rain})=>`
      <article id="roteiro-${esc(id)}" class="petr-day-card">
        <header><h3>${text(title,lang)}</h3><p>${text(subtitle,lang)}</p></header>
        <ol class="petr-day-stops">${stops.map(({when,title,copy,location})=>`
          <li><span class="petr-when">${text(when,lang)}</span><h4>${esc(title)}</h4><p>${text(copy,lang)}</p>
            ${location ? map(location,v(mapLabel,lang)) : ''}</li>`).join('')}
        </ol>
        <div class="petr-day-notes">
          <section><strong>${text(t('Transporte y regreso','Transporte e volta','Transport and return'),lang)}</strong><p>${text(transport,lang)}</p></section>
          <section><strong>${text(t('Alternativa si llueve','Alternativa se chover','Rainy-day alternative'),lang)}</strong><p>${text(rain,lang)}</p></section>
        </div>
      </article>`).join('')}</div>
    </section>` : '';
  const tripStyles = dayPlans.length ? `<style>
    .petr-itinerary-plans{margin:28px 0 32px}
    .petr-itinerary-plans>h2{color:#104f43;font-size:clamp(1.35rem,2.6vw,1.8rem);margin-bottom:15px}
    .petr-itin-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0 21px}
    .petr-itin-tabs>a{border:1px solid #a9d0be;background:#f3faf6;border-radius:999px;padding:9px 13px;color:#0c5545;font-size:.85rem;text-decoration:none;font-weight:700}
    .petr-itin-tabs>a:hover,.petr-itin-tabs>a:focus-visible{background:#daf1e3;outline:2px solid #0c6553}
    .petr-day-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:17px;align-items:start}
    .petr-day-card{min-width:0;border:1px solid #c9e0d5;border-radius:21px;background:#f1f8f4;overflow:hidden;scroll-margin-top:90px;box-shadow:0 6px 16px rgba(10,60,47,.05)}
    .petr-day-card:nth-child(3n+2){background:#fff8ea;border-color:#e9d6b5}
    .petr-day-card>header{padding:21px 24px 12px}
    .petr-day-card>header h3{font-size:1.28rem;color:#124c42;margin:0 0 6px}
    .petr-day-card>header p{font-size:.92rem;color:#4c645b;margin:0;line-height:1.6}
    .petr-day-stops{list-style:none;counter-reset:stop;display:grid;gap:0;padding:0 24px;margin:0}
    .petr-day-stops li{position:relative;counter-increment:stop;border-left:2px solid #a9cdbf;margin-left:12px;padding:12px 0 21px 21px}
    .petr-day-stops li:before{content:counter(stop);position:absolute;left:-14px;top:12px;width:25px;height:25px;border-radius:50%;background:#126250;color:white;font-size:.76rem;display:grid;place-items:center;font-weight:700}
    .petr-day-stops li:last-child{border-left-color:transparent}
    .petr-day-stops .petr-when{display:block;color:#985f28;font-size:.8rem;font-weight:800;margin-bottom:4px}
    .petr-day-stops h4{color:#164c42;font-size:1.05rem;margin:0 0 7px}
    .petr-day-stops p{font-size:.9rem;line-height:1.65;color:#3c594e;margin:0 0 9px}
    .petr-day-stops a{font-size:.84rem;color:#0e5c4d;font-weight:700;text-decoration:none;border-bottom:1px solid #0e5c4d}
    .petr-day-notes{display:grid;gap:12px;margin:0 22px 22px;border-top:1px solid #c9ddd0;padding-top:15px}
    .petr-day-notes section{background:rgba(255,255,255,.74);padding:12px 15px;border-radius:11px}
    .petr-day-notes section strong{color:#195143;font-size:.91rem}
    .petr-day-notes section p{color:#4c6154;line-height:1.65;margin:6px 0 0;font-size:.9rem}
    @media(max-width:820px){.petr-day-grid{grid-template-columns:1fr}.petr-day-card>header{padding:18px 18px 10px}.petr-day-stops{padding:0 18px}.petr-day-notes{margin:0 17px 17px}}
    @media(max-width:560px){.petr-itin-tabs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.petr-itin-tabs a{font-size:.76rem;padding:9px;min-width:0}.petr-day-stops li{padding-right:1px}}
  </style>` : '';
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
    title, intro, image, inline: styles(template) + tripStyles + `<style>
      .guide .petr-page-contents{flex-wrap:wrap;gap:0}
      .guide .petr-urgent-actions{margin:18px 0 22px;padding:20px;background:#fff4e8;border:1px solid #e7c894;border-radius:18px}
      .guide .petr-urgent-actions h2,.guide .petr-quick-facts h2{font-size:clamp(1.24rem,2.5vw,1.55rem);color:#123e37;margin:0 0 14px}
      .guide .petr-urgent-actions > div{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
      .guide .petr-urgent-actions a{display:flex;flex-direction:column;gap:2px;align-items:center;justify-content:center;
        border-radius:12px;padding:12px 10px;background:white;border:1px solid #dab48a;color:#19453c;text-decoration:none;min-height:64px}
      .guide .petr-urgent-actions a strong{font-size:1.48rem;color:#8d351c;font-variant-numeric:tabular-nums}
      .guide .petr-urgent-actions a span{font-size:.83rem;text-align:center}
      .guide .petr-urgent-actions a:focus-visible,.guide .petr-urgent-actions a:hover{outline:2px solid #8d351c}
      .guide .petr-quick-facts{padding:6px 0 18px;margin:15px 0}
      .guide .petr-fact-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,185px),1fr));gap:12px}
      .guide .petr-fact-card{min-width:0;border:1px solid #cee3dc;border-radius:15px;padding:17px;background:#edf7f2}
      .guide .petr-fact-card:nth-child(even){background:#fff8e9;border-color:#eaddb8}
      .guide .petr-fact-card h3{font-size:.94rem;color:#275448;margin:0 0 7px;font-weight:700}
      .guide .petr-fact-card strong{display:block;color:#0e5548;font-size:1.1rem;line-height:1.3;margin-bottom:8px}
      .guide .petr-fact-card p{color:#405b53;font-size:.91rem;line-height:1.6;margin:0}
      /* Only these two new guides use a shorter mobile header. Rio remains unchanged. */
      @media(max-width:650px){
        .guide.petr-compact-intro>h1{
          font-size:clamp(2rem,9.5vw,2.5rem)!important;
          line-height:1.07!important;
          letter-spacing:-.025em;
          margin:14px 0 14px!important;
        }
        .guide.petr-compact-intro>p.intro{
          font-size:1rem!important;line-height:1.5!important;
          margin:0 auto 23px!important;
          max-width:36ch!important;
        }
        .guide.petr-compact-intro>.kicker{margin-bottom:12px!important}
      }
      @media(max-width:650px){
        .guide .petr-urgent-actions{padding:14px}
        .guide .petr-urgent-actions > div{grid-template-columns:repeat(2,minmax(0,1fr))}
        body:has(.petr-local-guide) .ec-global-actions{
          left:10px!important;right:10px!important;bottom:calc(env(safe-area-inset-bottom,0px) + 8px)!important;
          display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-end!important;
          gap:8px!important;pointer-events:none!important
        }
        body:has(.petr-local-guide) .ec-global-actions > .ec-float-btn{
          min-height:42px!important;padding:9px 13px!important;font-size:12px!important;pointer-events:auto!important
        }
        body:has(.petr-local-guide) .ec-global-actions > .ec-share-panel,
        body:has(.petr-local-guide) .ec-global-actions > .ec-share-status{pointer-events:auto!important}
        body:has(.petr-local-guide) .petr-local-guide{padding-bottom:calc(92px + env(safe-area-inset-bottom,0px))}
      }
    </style>`,
    body: `<section class="guide petr-local-guide${data.compactMobileIntro ? ' petr-compact-intro' : ''}"><p class="kicker">ERNESTINHO CARIOCA · PETRÓPOLIS</p>
      <h1>${text(title, lang)}</h1><p class="intro">${text(intro, lang)}</p>
      ${urgent}${quick}
      <aside class="tip"><b>${text(tipTitle, lang)}</b>${paragraph(data.tip, lang)}</aside>
      ${picture(image, photoClass, lang, true)}
      ${contents(sections, lang, 'ext')}
      ${planCards}
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
  const { title, intro, months, tip, sources, seasonChoices = [] } = data;
  const image = photos[data.image];
  const rainPattern = rain => rain >= 200
    ? t('Promedio muy lluvioso', 'Média muito chuvosa', 'Very wet average')
    : rain >= 100 ? t('Lluvia moderada', 'Chuva moderada', 'Moderate rainfall')
      : t('Mes históricamente más seco', 'Mês historicamente mais seco', 'Historically drier month');
  const monthCards = months.map(({ title, low, high, rain, plan, carry, inside }, index) =>
    `<article id="mes-${index + 1}" class="month-card petr-month-card">
      <h2>${text(title, lang)}</h2>
      <p class="petr-month-metrics"><strong>${low}–${high} °C</strong><span>${rain} mm</span></p>
      <span class="petr-month-rain">${text(rainPattern(rain),lang)}</span>
      <h3>${text(t('Mi plan del mes', 'Meu plano do mês', 'My plan for the month'), lang)}</h3>
      ${paragraph(plan, lang)}
      <div class="petr-month-advice">
        <div><h4>${text(t('Qué llevar', 'O que levar', 'What to bring'),lang)}</h4>${paragraph(carry,lang)}</div>
        <div><h4>${text(t('Si llueve', 'Se chover', 'If it rains'),lang)}</h4>${paragraph(inside,lang)}</div>
      </div>
    </article>`).join('');
  const seasonCards = seasonChoices.length ? `<section class="petr-season-overview" aria-label="${text(t('Qué temporada elegir', 'Que estação escolher', 'Which season to choose'),lang)}">
    <h2>${text(t('Cuándo visitar según tu estilo de viaje', 'Quando visitar conforme seu passeio', 'When to visit for your kind of trip'),lang)}</h2>
    <div class="petr-season-grid">${seasonChoices.map(item=>`<article class="petr-season-card">
      <h3>${text(item.title,lang)}</h3><strong>${text(item.badge,lang)}</strong>${paragraph(item.copy,lang)}
    </article>`).join('')}</div>
    <p class="petr-climate-note">${text(t('Las medias son referencias históricas, no pronósticos ni garantías de buen tiempo.',
      'As médias são referências históricas, não previsões nem garantia de tempo bom.',
      'These are historical averages, not forecasts or guarantees of good weather.'),lang)}</p>
  </section>` : '';
  return {
    title, intro, image,
    inline: styles('guia/mes-a-mes') + `<style>
      .season .month-toolbar{flex:initial}
      .season .month-toolbar a,.season .source-link{border:1px solid #0b6158;background:white;border-radius:999px;padding:.55rem .8rem;color:#064b44;font-weight:700}
      .season .ec-guide-photo a{color:inherit}
      .petr-month-guide .petr-season-overview{margin:24px 0 30px}
      .petr-month-guide .petr-season-overview>h2{font-size:clamp(1.32rem,2.7vw,1.9rem);color:#164a41;margin:0 0 17px}
      .petr-month-guide .petr-season-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
      .petr-month-guide .petr-season-card{background:#eef7f2;border:1px solid #cbe0d5;border-radius:20px;padding:clamp(18px,2.5vw,26px)}
      .petr-month-guide .petr-season-card:nth-child(3n+2){background:#fff8eb;border-color:#e9d9bd}
      .petr-month-guide .petr-season-card h3{margin:0 0 8px;font-size:1.15rem;color:#175246}
      .petr-month-guide .petr-season-card strong{display:block;margin-bottom:10px;color:#966222;font-size:.93rem}
      .petr-month-guide .petr-season-card p{line-height:1.68;color:#43574e;margin:0}
      .petr-month-guide .petr-climate-note{font-size:.9rem;line-height:1.6;color:#536b63;margin:14px 0}
      .petr-month-guide .petr-month-card{min-width:0;scroll-margin-top:100px}
      .petr-month-guide .petr-month-metrics{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:7px 0}
      .petr-month-guide .petr-month-metrics span{font-variant-numeric:tabular-nums}
      .petr-month-guide .petr-month-rain{display:inline-block;background:#e4f2eb;color:#175446;border-radius:999px;padding:7px 11px;font-size:.79rem;font-weight:750;margin:3px 0 13px}
      .petr-month-guide .petr-month-advice{border-top:1px solid #d3e3da;margin-top:15px;padding-top:12px;display:grid;gap:12px}
      .petr-month-guide .petr-month-advice h4{font-size:.93rem;margin:0 0 4px;color:#164d42}
      .petr-month-guide .petr-month-advice p{line-height:1.6;margin:0;color:#43564f}
      @media(max-width:690px){
        .petr-month-guide .petr-season-grid{grid-template-columns:1fr}
        .petr-month-guide .petr-season-card{padding:17px}
        body:has(.petr-month-guide) .ec-global-actions{
          left:10px!important;right:10px!important;bottom:calc(env(safe-area-inset-bottom,0px) + 8px)!important;
          display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-end!important;
          gap:8px!important;pointer-events:none!important
        }
        body:has(.petr-month-guide) .ec-global-actions>.ec-float-btn{
          min-height:42px!important;padding:9px 13px!important;font-size:12px!important;pointer-events:auto!important
        }
        body:has(.petr-month-guide) .ec-global-actions>.ec-share-panel,
        body:has(.petr-month-guide) .ec-global-actions>.ec-share-status{pointer-events:auto!important}
        .petr-month-guide{padding-bottom:calc(92px + env(safe-area-inset-bottom,0px))}
      }
    </style>`,
    body: `<section class="season petr-month-guide">${picture(image, 'ec-guide-photo', lang, true)}
      ${localLink('guia/', t('Volver a la guía', 'Voltar ao guia', 'Back to the guide'), lang, 'ext')}
      <p class="eyebrow">ERNESTINHO CARIOCA · PETRÓPOLIS</p><h1>${text(title, lang)}</h1><p class="season-intro">${text(intro, lang)}</p>
      <p>${text(t('Las cifras muestran medias de temperaturas mínimas y máximas y lluvia mensual según la serie de Climatempo. Consulta el pronóstico para tus fechas.',
        'Os números mostram médias de mínimas e máximas e chuva mensal segundo a série do Climatempo. Consulte a previsão para suas datas.',
        'Figures show mean lows, highs and monthly rainfall from Climatempo’s historical series. Check the forecast for your dates.'), lang)}</p>
      ${seasonCards}
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
  const { sections, faq, sources, related, quickChoices = [] } = data;
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
  const navigation = [...(quickChoices.length ? [{ id: 'elegir', title: t('Qué transporte elegir', 'Qual transporte escolher', 'Which transport to choose') }] : []),
    ...(data.connections ? [{ id: 'trayectos', title: connectionsTitle }] : []), ...sections];
  const decisionGuide = quickChoices.length ? `<section id="elegir" class="petr-decision-block" aria-label="${text(t('Guía rápida de transporte', 'Guia rápida de transporte', 'Quick transport guide'), lang)}">
    <h2>${text(t('Elige según tu recorrido', 'Escolha conforme o trajeto', 'Choose for your journey'), lang)}</h2>
    <div class="petr-decision-grid">${quickChoices.map(({ title, value, detail }) => `<article class="petr-decision-card">
      <h3>${text(title, lang)}</h3><strong>${text(value, lang)}</strong><p>${text(detail, lang)}</p>
    </article>`).join('')}</div></section>` : '';
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
  const connectionStyles = (data.connections || quickChoices.length) ? `<style>
    .petr-decision-block{max-width:1180px;margin:16px auto 24px;padding:0 clamp(16px,3vw,32px)}
    .petr-decision-block h2{color:#123e38;margin:0 0 14px;font-size:clamp(1.2rem,2.6vw,1.65rem)}
    .petr-decision-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
    .petr-decision-card{border:1px solid #c9dfd9;border-radius:18px;padding:18px 20px;background:#f0f8f5;box-shadow:0 8px 18px rgba(6,49,41,.06)}
    .petr-decision-card:nth-child(3n+2){background:#fff7e7;border-color:#eddfbb}
    .petr-decision-card h3{font-size:.95rem;margin:0 0 8px;color:#234b45}
    .petr-decision-card strong{display:block;font-size:1.35rem;color:#0c574b;line-height:1.3;margin:0 0 8px}
    .petr-decision-card p{font-size:.91rem;line-height:1.55;color:#344f49;margin:0}
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
    @media(max-width:780px){.petr-decision-grid{grid-template-columns:1fr}.petr-decision-card{padding:15px 17px}}
    @media(max-width:540px){.petr-route-stops ol{display:grid;gap:6px}.petr-route-stops li{width:100%;box-sizing:border-box}.petr-route-actions{display:grid}}
  </style>` : '';
  return {
    title, intro, image, inline: styles('transportes/uber') + '<style>.guide-aside .petr-page-contents{display:block}.guide-photo-caption{margin-top:9px;color:#61706a;font-size:13px;line-height:1.5}</style>' + connectionStyles, css: ['transit-guides'],
    body: `<section class="transit-guide">${photoFirst ? hero : ''}<div class="guide-intro"><p class="kicker">ERNESTINHO CARIOCA · PETRÓPOLIS</p>
      <h1>${text(title, lang)}</h1><p class="guide-dek">${text(intro, lang)}</p>
      <span class="fact-pill">${text(data.badge || (vans ? t('Autobús urbano · intermunicipal · van privada', 'Ônibus urbano · intermunicipal · van particular', 'Local bus · intercity coach · private van') :
        t('Tarifa dinámica · matrícula · punto de recogida', 'Tarifa dinâmica · placa · ponto de embarque', 'Dynamic fare · licence plate · pickup point')), lang)}</span></div>
      ${photoFirst ? '' : hero}
      ${decisionGuide}
      <div class="guide-layout"><article class="guide-copy">${connectionGuide}${sections.map(chapter).join('')}
      <section class="guide-section ec-adn ec-teal"><h2>⭐ ${text(tipTitle, lang)}</h2>${paragraph(data.tip, lang)}</section>
      <section class="guide-section ec-faq"><h2>${text(faqTitle, lang)}</h2>
      ${faq.map(([q, a]) => `<details><summary>${text(q, lang)}</summary>${paragraph(a, lang)}</details>`).join('')}</section>
      <section class="guide-section sources"><h2>${text(sourceTitle, lang)}</h2><div class="source-list">
      ${sources.map(source => external(source, lang, 'source-link')).join('')}</div></section>
      ${localLink('transportes/', t('Volver a Transportes', 'Voltar a Transportes', 'Back to Transport'), lang, 'text-action')}</article>${side}</div></section>`,
  };
}
