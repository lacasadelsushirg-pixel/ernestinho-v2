import { esc, pre, styles, v } from './buzios_mirror_core.mjs';
import { t } from '../assets/js/translations/destinos/modelo.js';
import { regionalNeighborhoods } from '../assets/js/translations/destinos/barrios-regionales.js';
import { petropolisDistrictEditorial } from '../assets/js/translations/destinos/petropolis-barrios-editorial.js';
import { petropolisBarrioArchive } from '../assets/js/translations/destinos/petropolis-barrios-archivo.js';
import { petropolisBarriosProfundo } from '../assets/js/translations/destinos/petropolis-barrios-profundo.js';
import { petropolisBarriosContinua } from '../assets/js/translations/destinos/petropolis-barrios-continua.js';

export const neighborhoodRoutes = Object.entries(regionalNeighborhoods).flatMap(([city, districts]) =>
  Object.keys(districts).map(slug => [city, 'barrios', slug]));

const text = (value, lang) => esc(v(value, lang));
const open = t('Abrir ficha →', 'Abrir ficha →', 'Open guide →');
const back = t('← Volver a Barrios', '← Voltar a Bairros', '← Back to neighbourhoods');
const navigate = (href, label, lang, cls = '') =>
  `<a class="${cls}" href="${pre(lang) + href}">${text(label, lang)}</a>`;
const picture = (photo, name, cls, eager = false) => photo
  ? `<img class="${cls}" src="${esc(photo.src)}" alt="${esc(photo.alt || name)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">` : '';

const p = (value, lang) => '<p>' + text(value, lang) + '</p>';
const petrCss = `<style>
.petr-bairro-profile{max-width:1180px;margin:0 auto;padding:clamp(16px,3vw,32px)}
.petr-bairro-intro{max-width:80ch;font-size:1.08rem;line-height:1.8}
.petr-bairro-panels{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(240px,1fr);gap:18px;margin:22px 0}
.petr-bairro-box{background:#f0f7f5;border:1px solid #cce3dc;border-radius:22px;padding:clamp(18px,2.5vw,27px)}
.petr-bairro-box:nth-child(2){background:#fff7e9;border-color:#f2ddac}
.petr-bairro-box h2,.petr-bairro-stops h2{font-size:clamp(1.23rem,2.5vw,1.7rem);margin:0 0 12px;color:#114d44}
.petr-bairro-box p{margin:0;line-height:1.75}
.petr-bairro-time{display:inline-block;background:#0b5048;border-radius:999px;padding:8px 14px;color:white;font-weight:700;margin-top:14px}
.petr-bairro-stops{margin:28px 0 22px}
.petr-bairro-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:16px}
.petr-bairro-stop{min-width:0;border-radius:19px;border:1px solid #dae7e2;padding:22px;background:#fff;box-shadow:0 8px 20px rgba(6,49,41,.055)}
.petr-bairro-stop h3{margin:0 0 10px;color:#0d5149;font-size:1.08rem}
.petr-bairro-stop p{font-size:.94rem;line-height:1.65;color:#435b55;margin:0 0 12px}
.petr-bairro-actions{display:flex;gap:8px;flex-wrap:wrap}
.petr-bairro-actions a{display:inline-block;padding:8px 12px;text-decoration:none;border:1px solid #b5d7cd;border-radius:999px;color:#0b5349;font-size:.86rem;font-weight:700}
.petr-bairro-actions a:hover{background:#e3f4ee}
.petr-bairro-sources{padding:14px 0;border-top:1px solid #dce8e3;margin-top:20px}
.petr-bairro-sources a{display:inline-block;margin:4px 12px 4px 0;color:#0b5148}
.petr-bairro-photo{max-height:460px;overflow:hidden;border-radius:20px}
.petr-bairro-photo img{width:100%;max-height:460px;object-fit:cover}
.petr-bairro-no-image{display:none}
.petr-bairro-topic{display:flex;flex-direction:column;min-height:294px;overflow:hidden}
.petr-bairro-topic img{display:block;width:100%;height:155px;object-fit:cover}
.petr-bairro-topic b{display:block;line-height:1.3;padding:12px 14px 0}
.petr-bairro-topic .petr-bairro-topic-summary{margin:8px 14px 12px;font-size:.88rem;line-height:1.5;color:#416059;flex:1}
.petr-bairro-topic > span{display:block;margin-top:auto;padding:0 14px 16px;font-weight:800}
.petr-bairro-topic--text{background:linear-gradient(138deg,#e9f5f0,#fcf7ec);border:1px solid #c9dfd4}
.petr-bairro-topic--text b{padding-top:26px;font-size:1.16rem;color:#153e36}
.petr-bairro-topic--text .petr-bairro-topic-summary{font-size:.96rem}
.petr-bairro-photo-credit{display:block;font-size:.77rem;margin:6px 4px 0;color:#4a5c57}
.petr-bairro-photo-credit a{color:#13564c;text-decoration:underline}
.petr-bairro-chapters{display:grid;gap:21px;margin:28px 0 36px}
.petr-bairro-chapter{padding:clamp(21px,3vw,35px);border-radius:20px;border:1px solid #d5e4de;background:#fff}
.petr-bairro-chapter:nth-child(even){background:#f5faf7}
.petr-bairro-chapter h2{color:#10564b;font-size:clamp(1.32rem,2.6vw,1.85rem);line-height:1.25;margin:0 0 14px}
.petr-bairro-chapter p{max-width:85ch;line-height:1.95;font-size:1.02rem;margin:0;color:#25483f}
.petr-bairro-archive-intro{max-width:1140px;margin:8px auto 26px;padding:clamp(20px,3vw,32px);border-radius:22px;background:#f1f7f4;border:1px solid #cfdfd7}
.petr-bairro-archive-intro h2{font-size:clamp(1.35rem,3vw,1.85rem);color:#114d44;margin:0 0 12px}
.petr-bairro-archive-intro p{max-width:96ch;line-height:1.85;margin:0 0 12px}
.petr-bairro-archive-intro a{color:#125f53;font-weight:750}
.petr-deep{max-width:1180px;margin:14px auto 40px;padding:0 clamp(16px,3vw,32px)}
.petr-deep-head{background:linear-gradient(115deg,#0f4e45,#267366);color:#fff;border-radius:23px;padding:clamp(24px,4vw,38px)}
.petr-deep-head h2{color:#fff;font-size:clamp(1.6rem,3vw,2.2rem);margin:0 0 13px}
.petr-deep-head p{font-size:1.06rem;line-height:1.8;margin:0;max-width:85ch}
.petr-deep-section{margin-top:33px}
.petr-deep-section>h2{font-size:clamp(1.4rem,3vw,1.9rem);color:#104d43;margin:0 0 17px}
.petr-deep-timeline{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;list-style:none;padding:0;margin:0}
.petr-deep-timeline li{background:#eff6f2;border:1px solid #d5e6dc;border-radius:15px;padding:17px}
.petr-deep-timeline strong{color:#0b5d50;font-size:1.12rem;display:block;margin-bottom:7px}
.petr-deep-timeline span{line-height:1.65;display:block;font-size:.94rem}
.petr-deep-chapter{border-bottom:1px solid #dae7df;padding:clamp(22px,3vw,32px) 0}
.petr-deep-chapter h3{margin:0 0 13px;font-size:clamp(1.23rem,2.5vw,1.65rem);color:#104e44}
.petr-deep-chapter p{font-size:1.03rem;line-height:1.9;max-width:90ch;margin:0 0 15px}
.petr-deep-citations{display:flex;flex-wrap:wrap;gap:8px;margin-top:9px}
.petr-deep-citations a{display:inline-block;border-radius:999px;background:#e9f5ef;color:#125f51;border:1px solid #cde6d9;padding:8px 12px;text-decoration:none;font-size:.82rem;font-weight:700}
.petr-deep-walk{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}
.petr-deep-walk article{padding:20px;border:1px solid #d6e4dd;background:#fff;border-radius:18px}
.petr-deep-walk h3{font-size:1.04rem;color:#0e5146;margin:0 0 8px}
.petr-deep-walk p{line-height:1.7;font-size:.94rem;margin:0 0 10px}
.petr-deep-walk a{color:#0b6253;font-weight:750}
.petr-deep-bibliography{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}
.petr-deep-bibliography li{border:1px solid #d9e7dd;border-radius:16px;padding:17px;background:#f8faf7;list-style:none}
.petr-deep-bibliography a{color:#095547;font-weight:800}
.petr-deep-bibliography p{line-height:1.65;font-size:.92rem;margin:8px 0 0}
@media(max-width:780px){.petr-deep-timeline{grid-template-columns:repeat(2,minmax(0,1fr))}.petr-deep-bibliography{grid-template-columns:1fr}}
@media(max-width:580px){.petr-deep-timeline,.petr-deep-walk{grid-template-columns:1fr}.petr-deep{padding:0 15px}}
@media(max-width:600px){.petr-bairro-topic{min-height:248px}.petr-bairro-topic img{height:145px}}
@media(max-width:800px){.petr-bairro-panels{grid-template-columns:1fr}.petr-bairro-cards{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:560px){.petr-bairro-cards{grid-template-columns:1fr}.petr-bairro-profile{padding:16px}.petr-bairro-stop{padding:18px}}
</style>`;
function petrDeepCentre(base, lang, slug = 'centro-historico') {
  const deep = slug === 'centro-historico' ? petropolisBarriosProfundo.centroHistorico : (petropolisBarriosProfundo[slug] || petropolisBarriosContinua[slug]);
  if (!deep) return '';
  const defaultTitle = t('Centro Histórico: una historia que se puede caminar','Centro Histórico: uma história para percorrer','Historic Centre: a history you can walk');
  const defaultIntro = t('Una investigación que reúne la formación de la ciudad, sus arquitectos y trabajadores, la presencia negra, los cambios republicanos y la protección del patrimonio. Las referencias enlazan documentos de instituciones públicas e investigaciones históricas.','Uma pesquisa sobre a formação da cidade, arquitetos, trabalhadores, presença negra, transformações republicanas e preservação. As referências levam a instituições públicas e estudos históricos.','A researched guide covering the town’s origins, architects and workers, Black history, republican change and heritage protection, with links to public institutions and historical scholarship.');
  const label = url => url.split('/').slice(2).join(' › ');
  const chapters = deep.chapters.map(({title,paragraphs,sources}) =>
    '<article class="petr-deep-chapter"><h3>'+text(title,lang)+'</h3>'+paragraphs.map(item=>p(item,lang)).join('')+
    '<div class="petr-deep-citations">'+sources.map(url=>'<a target="_blank" rel="noopener noreferrer" href="'+esc(url)+'">'+esc(label(url))+' ↗</a>').join('')+'</div></article>').join('');
  const history = deep.timeline.map(([date, event])=>'<li><strong>'+esc(date)+'</strong><span>'+text(event,lang)+'</span></li>').join('');
  const stops=deep.stops.map(({name,note,location,route})=>{
    const href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(location);
    return '<article><h3>'+esc(name)+'</h3>'+p(note,lang)+'<div class="petr-bairro-actions"><a href="'+esc(href)+'" target="_blank" rel="noopener noreferrer">'+text(t('Abrir mapa','Abrir mapa','Open map'),lang)+'</a>'+
      (route?navigate(base+route,t('Guía de la visita','Guia da visita','Visitor guide'),lang):'')+'</div></article>';
  }).join('');
  const bibliography=deep.bibliography.map(({label,url,why})=>'<li><a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+' ↗</a>'+p(why,lang)+'</li>').join('');
  return '<section class="petr-deep"><header class="petr-deep-head"><h2>'+text(deep.heading || defaultTitle,lang)+'</h2><p>'+
    text(deep.intro || defaultIntro,lang)+'</p></header>'+
    '<section class="petr-deep-section"><h2>'+text(t('Línea de tiempo documentada','Linha do tempo documentada','Documented timeline'),lang)+'</h2><ol class="petr-deep-timeline">'+history+'</ol></section>'+
    '<section class="petr-deep-section"><h2>'+text(t('Capítulos para comprender el barrio','Capítulos para entender o bairro','Chapters to understand the area'),lang)+'</h2>'+chapters+'</section>'+
    '<section class="petr-deep-section"><h2>'+text(t('Recorrido histórico y paradas útiles','Roteiro histórico e paradas úteis','Historic route and useful stops'),lang)+'</h2><div class="petr-deep-walk">'+stops+'</div></section>'+
    '<section class="petr-deep-section"><h2>'+text(t('Investigación y lecturas recomendadas','Pesquisa e leituras recomendadas','Research and further reading'),lang)+'</h2><ul class="petr-deep-bibliography">'+bibliography+'</ul></section></section>';
}
function petrProfile(area, data, base, lang, slug) {
  const archive = petropolisBarrioArchive[slug];
  const chapters = (archive?.chapters || []).map(chapter => `<article class="petr-bairro-chapter"><h2>${text(chapter.title, lang)}</h2>${p(chapter.body,lang)}</article>`).join('');
  const mapLink = query => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  const stops = data.points.map(point => `<article class="petr-bairro-stop"><h3>${esc(point.name)}</h3>${p(point.reason, lang)}
    <div class="petr-bairro-actions"><a target="_blank" rel="noopener noreferrer" href="${esc(mapLink(point.location))}">${text(t('Ver en el mapa', 'Ver no mapa', 'Open map'), lang)}</a>
    ${point.route ? navigate(base + point.route, t('Ver guía de visita', 'Abrir guia de visita', 'Read visitor guide'), lang) : ''}</div></article>`).join('');
  const sourceList = [...data.sources, ...(archive?.sources || [])];
  const sources = [...new Map(sourceList.map(([url,name]) => [url,[url,name]])).values()]
    .map(([url,name]) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(name)}</a>`).join('');
  return `<div class="petr-bairro-profile">
    <section class="petr-bairro-box"><h2>${text(t('Historia e identidad del barrio', 'História e identidade do bairro', 'History and local identity'),lang)}</h2><div class="petr-bairro-intro">${p(data.history,lang)}</div></section>
    ${chapters ? `<section class="petr-bairro-chapters" aria-label="${text(t('Investigación histórica del barrio','Pesquisa histórica do bairro','Neighbourhood historical research'),lang)}">${chapters}</section>` : ''}
    <div class="petr-bairro-panels"><section class="petr-bairro-box"><h2>${text(t('Un recorrido que yo haría', 'Um passeio que eu faria', 'A route I would take'),lang)}</h2>${p(data.itinerary,lang)}</section>
      <section class="petr-bairro-box"><h2>${text(t('Cómo llegar y volver', 'Como chegar e voltar', 'How to get there and back'),lang)}</h2>${p(data.access,lang)}
      <span class="petr-bairro-time">${text(data.duration,lang)}</span></section></div>
    <section class="petr-bairro-stops"><h2>${text(t('Paradas concretas para conocer', 'Paradas para conhecer', 'Specific places to visit'),lang)}</h2><div class="petr-bairro-cards">${stops}</div></section>
    <section class="petr-bairro-sources"><strong>${text(t('Fuentes para planificar la visita', 'Fontes para planejar a visita', 'Sources to plan your visit'),lang)}</strong><div>${sources}</div></section>
  </div>`;
}

export function renderRegionalNeighborhood(city, slug, lang, photos) {
  const districts = regionalNeighborhoods[city.slug];
  if (!districts) return null;
  const base = '/destinos/' + city.slug + '/';
  const key = 'barrios';
  const path = base + key + '/';
  const cityName = esc(city.name.toLocaleUpperCase('pt-BR'));
  const hero = (title, intro) => `<section class="hero" style="min-height:48vh"><div class="hero-copy">
    <p class="kicker">ERNESTINHO CARIOCA · ${cityName}</p><h1>${text(title, lang)}</h1><p class="lead">${text(intro, lang)}</p></div></section>`;

  if (slug) {
    const area = districts[slug];
    if (!area) return null;
    const photo = area.image ? photos[area.image] : null;
    const detailed = city.slug === 'petropolis' ? petropolisDistrictEditorial[slug] : null;
    const summary = city.slug === 'petropolis' ? (petropolisBarriosProfundo.summaries[slug] || area.summary) : area.summary;
    const body = hero(area.name, summary) + `<section class="editorial bh-zone-index">
      ${navigate(path, back, lang, 'rd-action')}
      ${photo ? `<div class="petr-bairro-photo"><figure>${picture(photo, area.name, '', true)}</figure>${photo.author && photo.source ?
        `<small class="petr-bairro-photo-credit">${text(t('Fotografía', 'Fotografia', 'Photograph'),lang)}: <a href="${esc(photo.source)}" target="_blank" rel="noopener noreferrer">${esc(photo.author)}</a></small>` : ''}</div>` : ''}
      ${detailed ? petrProfile(area, detailed, base, lang, slug) : ''}
      ${city.slug === 'petropolis' && ['centro-historico','quitandinha','itaipava','cascatinha-nogueira','castelanea','bingen','correas-bonfim'].includes(slug) ? petrDeepCentre(base,lang,slug) : ''}
      <article class="bh-cluster">
        <h2>${text(t('Qué ver y cómo moverte', 'O que ver e como circular', 'What to see and how to get around'), lang)}</h2>
        <p class="bh-cluster-intro">${text(area.visit, lang)}</p>
        ${navigate(base + area.nearby, t('Una parada para combinar →', 'Uma parada para combinar →', 'A stop to pair it with →'), lang, 'rd-action')}
        ${navigate(base + 'transportes/', t('Transportes', 'Transportes', 'Transport'), lang, 'rd-action')}</article></section>`;
    return { title: area.name, intro: summary, body, image: photo || null, inline: styles('barrios') + (detailed ? petrCss : '') };
  }
  const title = t(`Barrios de ${city.name}`, `Bairros de ${city.name}`, `${city.name} neighbourhoods`);
  const { intro, tip } = city.sections[key];
  const entries = Object.entries(districts);
  const isPetropolis = city.slug === 'petropolis';
  const tiles = entries.map(([id, area]) => {
    const summary = isPetropolis ? (petropolisBarriosProfundo.summaries[id] || area.summary) : area.summary;
    const photo = area.image ? photos[area.image] : null;
    const className = isPetropolis ? 'topic petr-bairro-topic' + (photo ? '' : ' petr-bairro-topic--text') : 'topic';
    return `<a class="${className}" href="${pre(lang) + path + id}/">
      ${picture(photo, area.name, 'bh-topic-mini')}<b>${esc(area.name)}</b>
      ${isPetropolis ? `<p class="petr-bairro-topic-summary">${text(summary,lang)}</p>` : ''}
      <span>${text(open, lang)}</span></a>`;
  }).join('');
  const clusters = entries.map(([id, area]) => `<a class="bh-cluster" href="${pre(lang) + path + id}/">
    <h3>${esc(area.name)}</h3><p class="bh-cluster-intro">${text(isPetropolis ? (petropolisBarriosProfundo.summaries[id] || area.summary) : area.summary, lang)}</p><span class="bh-cluster-cta">${text(open, lang)}</span></a>`).join('');
  const archiveIntro = isPetropolis ? `<section class="editorial"><div class="petr-bairro-archive-intro"><h2>${text(t('Una ciudad que se cuenta barrio por barrio','Uma cidade contada bairro a bairro','A city told neighbourhood by neighbourhood'),lang)}</h2><p>${text(t('La historia de Petrópolis empieza mucho antes de sus monumentos. El plan de Koeler organizó la Vila Imperial y los quarteirões de familias trabajadoras e inmigrantes; después llegaron industrias, vías férreas, localidades rurales y nuevas formas de vivir en la sierra. Estas fichas reúnen capítulos históricos documentados y recorridos concretos.','A história de Petrópolis começa bem antes de seus monumentos. O plano de Koeler organizou a Vila Imperial e quarteirões de famílias trabalhadoras e imigrantes; depois vieram indústrias, ferrovias, regiões rurais e outras formas de viver na serra. As fichas reúnem pesquisa histórica documentada e roteiros concretos.','Petrópolis history begins long before its monuments. Koeler planned the Imperial Villa and neighbourhoods for working and immigrant families; industry, railways, rural communities and new ways of life followed. These guides bring documented history together with practical routes.'),lang)}</p><p>${text(t('Importante: los quarteirões históricos, los barrios actuales y los cinco distritos administrativos no son la misma división. Aquí usamos nombres útiles para el viajero y explicamos sus orígenes.','Importante: quarteirões históricos, bairros atuais e cinco distritos administrativos não são a mesma divisão. Usamos nomes úteis para o visitante e explicamos suas origens.','Important: historic allotments, modern neighbourhoods and the five administrative districts are different divisions. We use recognisable visitor-oriented names and explain their origins.'),lang)}</p><a href="https://ihp.org.br/os-quarteiroes/" target="_blank" rel="noopener noreferrer">${text(t('Consultar la investigación del Instituto Histórico de Petrópolis ↗','Consultar a pesquisa do Instituto Histórico de Petrópolis ↗','Read the Petrópolis Historical Institute research ↗'),lang)}</a></div></section>` : '';
  const body = hero(title, intro) + archiveIntro + `<section class="editorial bh-individual-index"><div class="section-head">
    <h2>${text(t('Explora barrio por barrio', 'Explore bairro por bairro', 'Explore neighbourhood by neighbourhood'), lang)}</h2></div>
    <div class="topic-grid">${tiles}</div></section>
    <section class="editorial bh-zone-index"><div class="bh-clusters">${clusters}</div>
    <aside class="notice"><b>${text(t('Consejo de Ernestinho', 'Dica do Ernestinho', 'Ernestinho’s tip'), lang)}</b><p>${text(tip, lang)}</p></aside></section>`;
  return { title, intro, body, inline: styles('barrios') + (city.slug === 'petropolis' ? petrCss : '') };
}
