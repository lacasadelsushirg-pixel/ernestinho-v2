import { getLanguage } from '/assets/js/i18n.js';
import { beachIndex } from '/assets/js/buzios-beach-v2-data.js';
import { beachProfiles } from '/assets/js/buzios-beaches.js';
import { beachDecisions } from '/assets/js/buzios-beach-decisions.js';
import { beachCompletion } from '/assets/js/buzios-beach-content.js';
import { buziosBeachGallery } from '/assets/js/buzios-beach-gallery.js';

const language = getLanguage();
const prefix = location.pathname.startsWith('/pt/') ? '/pt' : location.pathname.startsWith('/en/') ? '/en' : '';
const slug = location.pathname.split('/').filter(Boolean).at(-1);
const beach = beachIndex.find(item => item.slug === slug);
const root = document.querySelector('#bz2-detail');
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const local = value => value && typeof value === 'object' ? (value[language] || value.ES || '') : (value || '');
const copy = {
  ES: {
    back:'← Volver a Playas de Búzios', eyebrow:'ERNESTINHO CARIOCA · COSTA DE BÚZIOS', lead:'Yo te invito a conocer esta playa con calma: primero mira su ambiente, después decide si encaja con el día que quieres vivir.',
    toc:['Cómo se vive','Qué hacer','El mar','Cómo llegar','Qué encontrarás','Mi recomendación','Con qué combinar','Mapa'],
    sections:['Una playa con su propio ritmo','Qué hacer y cómo aprovecharla','El mar se mira antes de entrar','Cómo llegar sin improvisar el regreso','Servicios, familias y lo práctico','Mi recomendación para elegir bien','Con qué combinar este paseo','Mapa y ubicación'],
    labels:['01 / PRIMERA IMPRESIÓN','02 / EXPERIENCIAS','03 / CONDICIONES DEL MAR','04 / LLEGADA Y REGRESO','05 / SERVICIOS Y COMPAÑÍA','06 / MI CONSEJO','07 / OTRO PLAN CERCA','08 / ORIENTACIÓN'],
    identity:'Mi lectura de la playa', thingsLead:'Yo la elegiría por su perfil —', seaLead:'Yo siempre separo la belleza del paisaje de las condiciones reales del mar. ', accessLead:'Para llegar, yo organizaría el recorrido pensando también en la vuelta. ', practicalLead:'Antes de salir, yo confirmaría los servicios del sector y llevaría lo que no quiero depender de encontrar. ', recLead:'Si yo tuviera que darte una recomendación concreta, empezaría por esto: ', combineLead:'Yo combinaría esta visita con otra playa o paseo cercano solo si el acceso y el horario del día lo permiten.',
    photo:'Un recorte del paisaje de', tip:'DATO DE ERNESTINHO', profile:'Perfil', sea:'Mar y baño', access:'Llegada', map:'Abrir en Google Maps ↗', mapText:'La ubicación y el acceso pueden variar según el punto elegido; abre el mapa y revisa la ruta antes de salir.', open:'Conocer playa', noPhotos:'Todavía no hay fotografías registradas para esta playa.',
    note:'Oleaje, viento, marea, corrientes, accesos y servicios pueden cambiar. Yo recomiendo comprobar las condiciones del día y respetar las indicaciones locales.'
  },
  PT: {
    back:'← Voltar para as Praias de Búzios', eyebrow:'ERNESTINHO CARIOCA · LITORAL DE BÚZIOS', lead:'Convido você a conhecer esta praia sem pressa: primeiro observe o ambiente, depois decida se combina com o dia que quer viver.',
    toc:['Como é','O que fazer','O mar','Como chegar','O que encontrar','Minha recomendação','O que combinar','Mapa'],
    sections:['Uma praia com seu próprio ritmo','O que fazer e como aproveitar','Observe o mar antes de entrar','Como chegar sem improvisar a volta','Serviços, famílias e o lado prático','Minha recomendação para escolher bem','O que combinar com este passeio','Mapa e localização'],
    labels:['01 / PRIMEIRA IMPRESSÃO','02 / EXPERIÊNCIAS','03 / CONDIÇÕES DO MAR','04 / IDA E VOLTA','05 / SERVIÇOS E COMPANHIA','06 / MINHA DICA','07 / OUTRO PLANO PERTO','08 / ORIENTAÇÃO'],
    identity:'Minha leitura da praia', thingsLead:'Eu escolheria esta praia pelo perfil —', seaLead:'Eu sempre separo a beleza da paisagem das condições reais do mar. ', accessLead:'Para chegar, eu organizaria o percurso pensando também na volta. ', practicalLead:'Antes de sair, eu confirmaria os serviços do trecho e levaria o que não quero depender de encontrar. ', recLead:'Se eu pudesse dar uma recomendação concreta, começaria por isto: ', combineLead:'Eu combinaria esta visita com outra praia ou passeio próximo somente se o acesso e o horário do dia permitirem.',
    photo:'Um recorte da paisagem de', tip:'DICA DO ERNESTINHO', profile:'Perfil', sea:'Mar e banho', access:'Chegada', map:'Abrir no Google Maps ↗', mapText:'A localização e o acesso podem variar conforme o trecho escolhido; abra o mapa e confira o trajeto antes de sair.', open:'Conhecer praia', noPhotos:'Ainda não há fotografias registradas para esta praia.',
    note:'Ondas, vento, maré, correntes, acessos e serviços podem mudar. Recomendo conferir as condições do dia e respeitar as orientações locais.'
  },
  EN: {
    back:'← Back to Búzios beaches', eyebrow:'ERNESTINHO CARIOCA · BÚZIOS COAST', lead:'I invite you to get to know this beach at your own pace: take in its atmosphere first, then decide whether it suits the day you want.',
    toc:['The feel','Things to do','The sea','Getting there','What to expect','My recommendation','Pair the visit','Map'],
    sections:['A beach with its own rhythm','Things to do and how to enjoy it','Check the sea before swimming','Getting there and planning the return','Facilities, families and practical details','My recommendation for choosing well','What to pair with this visit','Map and location'],
    labels:['01 / FIRST IMPRESSION','02 / EXPERIENCES','03 / SEA CONDITIONS','04 / ARRIVAL AND RETURN','05 / FACILITIES AND COMPANY','06 / MY ADVICE','07 / ANOTHER NEARBY PLAN','08 / GETTING ORIENTED'],
    identity:'My take on this beach', thingsLead:'I would choose this beach for its character —', seaLead:'I always separate the beauty of the view from the sea conditions on the day. ', accessLead:'I would plan the journey with the return in mind as well. ', practicalLead:'Before setting out, I would check which facilities are operating and bring anything I do not want to rely on finding. ', recLead:'If I could give you one practical recommendation, I would start here: ', combineLead:'I would pair this visit with another nearby beach or outing only if access and timing work on the day.',
    photo:'A view of the landscape at', tip:'ERNESTINHO’S TIP', profile:'Best for', sea:'Sea and swimming', access:'Getting there', map:'Open in Google Maps ↗', mapText:'The exact location and access can vary by beach entrance; open the map and check your route before setting out.', open:'Explore beach', noPhotos:'No photographs are registered for this beach yet.',
    note:'Waves, wind, tides, currents, access and facilities can change. I recommend checking conditions on the day and following local guidance.'
  }
};
const L = copy[language] || copy.ES;
const content = beachCompletion.find(([name]) => name === beach?.name)?.[1] || [];
const decision = local(beachDecisions[beach?.name]);
const profile = local(beachProfiles.find(([name]) => name === beach?.name)?.[1]);
const byline = local(beach?.profile);
const basePhotos = buziosBeachGallery[slug] || [];
const coverPhotos = {
  amores:'AMORES/vista-da-praia-amores.jpg', armacao:'ARMACAO/ARMACAO3.jpg', azeda:'AZEDA/azeda-beach (1).jpg',
  azedinha:'AZEDINHA/praia-da-azedinha (1).jpg', brava:'BRAVA/BRAVA.jpg', canto:'CANTOS/praia-do-canto-buzios.jpg',
  caravelas:'CARAVELAS/CARAVELAS 1.jpg', ferradura:'FERRADURA/FERRADURA PORT.jpg', ferradurinha:'FERRADURINHA/ferradurinha.jpg',
  foca:'FOCA/praia-da-foca (1).jpg', forno:'FORNO/praia-do-forno.jpg', geriba:'GERIBÁ/praia-de-geriba.jpg',
  gorda:'GORDA/praia gorda 4.jpg', 'joao-fernandes':'JOAO FERNANDES/2b9b49ed-1c45-49ec-aae0-d5cf379e824c.jpg',
  'joao-fernandinho':'JOAO FERNANDINHO/praia-de-joao-fernandinho (1).jpg', 'jose-goncalves':'JOSE GONCALVES/José Gonçalves 122.jpg',
  manguinhos:'MANGUINHOS/galeria-manguinhos-1.jpg', 'olho-de-boi':'OLHO DE BOI/Olho-de-Boi_01.jpg',
  ossos:'OSSOS/buzios-armacao-dos-buzios.jpg', rasa:'RASA/playa-rasa-baia-formosa-buzios-04.jpg',
  tartaruga:'TARTARUGAS/praia-tartaruga.jpg', tucuns:'TUCUNS/tucuns buzios 2.jpg', virgens:'VIRGENS/praia das virgens.jpg'
};
const selectedCover = basePhotos.includes(coverPhotos[slug]) ? coverPhotos[slug] : basePhotos[0];
const photos = selectedCover ? [selectedCover,...basePhotos.filter(path => path !== selectedCover)] : [];
const host = 'https://mediumturquoise-stinkbug-270478.hostingersite.com/FOTOS/HOME/BUZIOS/PLAYAS/';
const photoUrl = path => host + path.split('/').map(encodeURIComponent).join('/');
function prettyPhoto(path, index = 0) {
  const stem = path.split('/').at(-1).replace(/\.[^.]+$/, '').replace(/\s*\(\d+\)/g, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  const meaningful = stem.replace(/\b(caption|photo0jpg|img|dsc|whatsapp image|buzios)\b/ig, '').trim();
  const labels = {
    ES: [`Una primera mirada a ${beach.name}`, `La costa de ${beach.name}`, `Un detalle del paisaje de ${beach.name}`, `La playa desde otro ángulo de ${beach.name}`],
    PT: [`Um primeiro olhar para ${beach.name}`, `O litoral de ${beach.name}`, `Um detalhe da paisagem de ${beach.name}`, `A praia por outro ângulo em ${beach.name}`],
    EN: [`A first look at ${beach.name}`, `The coast at ${beach.name}`, `A detail of ${beach.name}`, `Another view of ${beach.name}`]
  };
  if (/atardecer|sunset|pôr do sol/i.test(meaningful)) return language === 'PT' ? `Luz do fim do dia em ${beach.name}` : language === 'EN' ? `Late-day light at ${beach.name}` : `Luz del final del día en ${beach.name}`;
  if (/indicador|cartel|placa|sign/i.test(meaningful)) return language === 'PT' ? `Referência de acesso a ${beach.name}` : language === 'EN' ? `An access marker for ${beach.name}` : `Referencia de acceso a ${beach.name}`;
  if (meaningful.length > 4 && !/^\d+$/.test(meaningful) && !/^[a-f0-9-]{24,}$/i.test(meaningful) && !/^\d{8}[-_ ]?\d+/i.test(meaningful)) return `${meaningful.charAt(0).toLocaleUpperCase(language === 'PT' ? 'pt-BR' : language === 'EN' ? 'en' : 'es')}${meaningful.slice(1)}`;
  return labels[language]?.[index % 4] || labels.ES[index % 4];
}
function figure(path, index, hero=false) {
  const label = prettyPhoto(path, index);
  const alt = language === 'PT' ? `${beach.name} em Búzios — ${label}` : language === 'EN' ? `${beach.name} in Búzios — ${label}` : `${beach.name} en Búzios — ${label}`;
  return `<figure class="${hero ? 'bp-hero__photo' : ''}"><img src="${escape(photoUrl(path))}" alt="${escape(alt)}" loading="${hero ? 'eager' : 'lazy'}" decoding="async" ${hero ? 'fetchpriority="high"' : ''}><figcaption>${escape(label)}</figcaption></figure>`;
}
function photoStory(paths, start) {
  if (!paths.length) return '';
  const grid = paths.map((path, i) => {
    const geriba = {
      ES:[
        'Las olas y la orilla abierta muestran el carácter surfeable de Geribá; el mar del día siempre merece una mirada antes de entrar.',
        'La franja amplia de arena se abre hacia el agua y deja ver el morro rocoso que enmarca un extremo de la ensenada.',
        'Personas con tablas recorren la orilla: una escena cotidiana que revela el pulso de surf de esta playa.',
        'Desde la arena, el perfil verde y rocoso acompaña el movimiento de las olas a lo largo de la costa.'
      ],
      PT:[
        'As ondas e a faixa aberta da praia mostram o perfil de surfe de Geribá; vale observar as condições do mar antes de entrar.',
        'A ampla faixa de areia se abre para o mar e revela o costão rochoso que contorna uma das pontas da enseada.',
        'Pessoas com pranchas caminham pela beira-mar: uma cena cotidiana que mostra o ritmo do surfe nesta praia.',
        'Da areia, o contorno verde e rochoso acompanha o movimento das ondas ao longo da costa.'
      ],
      EN:[
        'The breaking waves and open shoreline show Geribá’s surf character; check the sea on the day before heading in.',
        'A broad stretch of sand opens onto the water, with the rocky headland framing one end of the bay.',
        'Surfers carrying boards walk along the waterline, a familiar scene that captures the beach’s surf rhythm.',
        'From the sand, a green rocky headland frames the waves rolling along the shore.'
      ]
    };
    const general = {
      ES:[
        `La línea de arena y el agua dibujan el paisaje de ${beach.name}; el oleaje puede cambiar durante el día.`,
        `Esta vista deja reconocer cómo la costa y el entorno se encuentran en ${beach.name}.`,
        `La perspectiva desde la orilla ayuda a imaginar el paseo y a elegir dónde detenerse.`,
        `El paisaje alrededor de ${beach.name} completa la experiencia más allá del baño.`
      ],
      PT:[
        `A faixa de areia e o mar desenham a paisagem de ${beach.name}; as ondas podem mudar ao longo do dia.`,
        `Esta vista mostra como o litoral e o entorno se encontram em ${beach.name}.`,
        `A perspectiva da beira-mar ajuda a imaginar o passeio e escolher onde parar.`,
        `A paisagem ao redor de ${beach.name} completa a experiência além do banho de mar.`
      ],
      EN:[
        `The shoreline and water shape the landscape at ${beach.name}; waves can change throughout the day.`,
        `This view shows how the coast and its surroundings meet at ${beach.name}.`,
        `The view from the water’s edge helps picture the walk and choose where to pause.`,
        `The setting around ${beach.name} adds to the visit beyond swimming.`
      ]
    };
    const detail = ((slug === 'geriba' ? geriba : general)[language] || (slug === 'geriba' ? geriba : general).ES)[i % 4];
    return `<figure><img src="${escape(photoUrl(path))}" alt="${escape(detail)}" loading="lazy" decoding="async"><figcaption><p>${escape(detail)}</p></figcaption></figure>`;
  }).join('');
  const galleryLabel = language === 'PT' ? `Fotografias de ${beach.name}` : language === 'EN' ? `Photos of ${beach.name}` : `Fotografías de ${beach.name}`;
  return `<aside class="ec-copa-photo-story" aria-label="${escape(galleryLabel)}"><div class="ec-copa-photo-grid">${grid}</div></aside>`;
}
function section(index, body, style='deep') {
  return `<section class="bp-section bp-section--${style}" id="${['vida','hacer','mar','llegar','practica','recomiendo','combinar','mapa'][index]}"><p class="bp-number">${L.labels[index]}</p><div class="bp-copy-wide"><h2>${L.sections[index]}</h2>${body}</div></section>`;
}
function articleCard(number, title, text) {
  return `<article class="bp-activity"><span>${number}</span><h3>${escape(title)}</h3><p>${escape(text)}</p></article>`;
}
function practicalCard(title, text) {
  return `<article><h3>${escape(title)}</h3><p>${escape(text)}</p></article>`;
}

if (!beach || !root) {
  if (root) root.innerHTML = `<main class="bp-shell"><h1>${language === 'EN' ? 'Beach not found' : language === 'PT' ? 'Praia não encontrada' : 'Playa no encontrada'}</h1></main>`;
  throw new Error(`Unknown Búzios beach: ${slug}`);
}

const title = `${beach.name} en Búzios: guía completa de playa | Ernestinho Carioca`;
const description = language === 'PT' ? `Conheça a Praia ${beach.name}, em Búzios: meu guia sobre o que fazer, mar, acesso, dicas e praias próximas.` : language === 'EN' ? `Explore ${beach.name} beach in Búzios with my guide to activities, sea conditions, access and nearby beaches.` : `Conoce la playa ${beach.name} en Búzios con mi guía de qué hacer, mar, acceso, recomendaciones y playas cercanas.`;
document.title = language === 'PT' ? `${beach.name} em Búzios: guia completo da praia | Ernestinho Carioca` : language === 'EN' ? `${beach.name} beach in Búzios: complete guide | Ernestinho Carioca` : title;
const setMeta = (selector, key, value) => {
  let node = document.querySelector(selector);
  if (!node) { node = document.createElement('meta'); node.setAttribute(selector.startsWith('meta[property=') ? 'property' : 'name', selector.match(/"([^\"]+)"/)[1]); document.head.append(node); }
  node.setAttribute(key, value);
};
setMeta('meta[name="description"]','content',description);
setMeta('meta[property="og:title"]','content',document.title);
setMeta('meta[property="og:description"]','content',description);
setMeta('meta[property="og:type"]','content','article');
setMeta('meta[property="og:url"]','content',`https://www.ernestinhocarioca.com.br${location.pathname}`);
setMeta('meta[property="og:image:alt"]','content',`${beach.name} · Búzios`);
if (photos[0]) setMeta('meta[property="og:image"]','content',photoUrl(photos[0]));
let canonical = document.querySelector('link[rel="canonical"]');
if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
canonical.href = `https://www.ernestinhocarioca.com.br${location.pathname}`;
const ids = ['vida','hacer','mar','llegar','practica','recomiendo','combinar','mapa'];
const related = {
  geriba:['ferradurinha','manguinhos'], 'joao-fernandes':['joao-fernandinho','azeda'], 'joao-fernandinho':['joao-fernandes','azeda'],
  ferradura:['ferradurinha','canto'], ferradurinha:['geriba','ferradura'], azeda:['azedinha','ossos'], azedinha:['azeda','ossos'],
  tartaruga:['manguinhos','canto'], brava:['olho-de-boi','forno'], forno:['foca','brava'], ossos:['azeda','armacao'], armacao:['ossos','canto'],
  canto:['armacao','amores'], manguinhos:['rasa','tartaruga'], rasa:['manguinhos','gorda'], tucuns:['geriba','caravelas'],
  'jose-goncalves':['tucuns','rasa'], caravelas:['tucuns','rasa'], foca:['forno','brava'], 'olho-de-boi':['brava','forno'],
  amores:['canto','virgens'], virgens:['canto','amores'], gorda:['rasa','manguinhos']
};
const localNames = {ES:{doing:'Qué hacer',watch:'Mirar el paisaje',prepare:'Preparar el paseo'},PT:{doing:'O que fazer',watch:'Observar a paisagem',prepare:'Preparar o passeio'},EN:{doing:'Things to do',watch:'Take in the landscape',prepare:'Plan the outing'}}[language] || {doing:'Qué hacer',watch:'Mirar el paisaje',prepare:'Preparar el paseo'};
const relatedCards = (related[slug] || []).map(key => {
  const item = beachIndex.find(x => x.slug === key);
  if (!item) return '';
  const target = `${prefix}/destinos/buzios/playas/${item.slug}/`;
  return `<a class="bp-combine" href="${target}"><span>${escape(L.open)}</span><h3>${escape(item.name)}</h3><p>${escape(local(item.profile))}</p><b>${escape(L.open)} →</b></a>`;
}).join('');
const escapeField = index => escape(local(content[index]));
const persona = byline || profile;
const narrative = {
  ES: {
    hero:`Yo te cuento cómo elegir el mejor tramo de ${beach.name}: qué esperar del mar, cómo organizar la llegada y qué plan puede encajar contigo.`,
    life1:`Cuando yo llego a una playa nueva, no empiezo buscando la foto perfecta. Primero miro cómo se abre la costa, cuánto espacio hay para instalarse y qué ritmo trae la gente. En ${beach.name}, esa primera lectura me ayuda a decidir si conviene quedarse cerca del acceso, caminar un poco más o simplemente disfrutar del paisaje desde un punto cómodo.`,
    life2:`Su perfil es ${persona}. Para mí, esa identidad es el hilo que organiza el día: una playa puede ser una pausa, una caminata, un baño si las condiciones acompañan o una parada breve dentro de una ruta. Yo no la presentaría como una experiencia universal, porque cada persona llega con otra expectativa, y el mar y el acceso también cambian.`,
    life3:`La descripción más concreta empieza aquí: ${local(content[0])} ${local(content[1])} Yo usaría esos dos datos para elegir el horario y la compañía, y no solo para decidir si la playa se ve bonita en una fotografía.`,
    activities:`En ${beach.name}, yo organizaría el paseo alrededor de actividades que respeten su carácter y las condiciones del día. ${local(content[1])} Si el plan incluye caminar, observar la costa o pasar un rato en la arena, conviene dejar tiempo suficiente para hacerlo sin convertir la visita en una carrera por marcar lugares.`,
    activity2:`También preguntaría antes por alquileres, clases, excursiones o cualquier servicio anunciado por terceros; una posibilidad no significa que esté disponible a toda hora. Si dependes de un operador, acuerda el precio, el horario, el punto de encuentro y el regreso antes de salir. Cuando no haya una actividad formal, el propio paisaje puede ser el programa: detenerse a mirar, fotografiar sin invadir a nadie y reconocer cómo cambia el agua al acercarse a las rocas.`,
    sea1:`Yo miro el mar antes de elegir dónde sentarme y vuelvo a mirarlo antes de entrar. ${local(content[0])} Una fotografía no informa sobre corrientes, viento, oleaje o visibilidad de hoy; tampoco basta con que otras personas estén en el agua. Pregunta a quienes conocen el lugar y sigue la señalización y las indicaciones de los equipos locales.`,
    sea2:`Si el agua se mueve con fuerza, si el acceso rocoso está mojado o si la marea está subiendo, yo cambio el plan: paseo por la orilla, observación desde tierra o visita a otra playa con un perfil más adecuado. Con niños, nadadores poco experimentados o personas que necesiten apoyo, prefiero elegir un punto con salida sencilla y permanecer cerca.`,
    access1:`Yo planifico la llegada junto con la vuelta. ${local(content[2])} Antes de salir, revisa el acceso exacto en el mapa, confirma el último tramo a pie y calcula el desnivel, el suelo y la sombra. En Búzios, dos playas cercanas en el mapa pueden tener entradas muy distintas; no conviene suponer que existe un sendero corto entre ellas.`,
    access2:`Para transporte, ${local(content[5])} Si vas en coche, confirma dónde puede estacionarse legalmente y no bloquees entradas ni pasos vecinales. Si dependes de taxi, transporte público o traslado, guarda el punto de recogida y acuerda cómo volverás, sobre todo si la visita termina al atardecer o en una zona con señal irregular.`,
    practical1:`Yo salgo con agua, protección solar, algo para cubrirme y una bolsa para llevar de vuelta los residuos. ${local(content[3])} No doy por garantizados baños, sombra, comida, duchas o alquiler de sillas: pueden cambiar por temporada y por tramo. Si esos servicios son importantes para ti, conviene confirmarlos antes y llevar una alternativa sencilla.`,
    practical2:`Para una visita en familia, ${local(content[4])} A mí me ayuda pensar en el recorrido completo: desde el coche o la calle hasta la arena, el tiempo bajo el sol, la posibilidad de descansar y la subida de regreso. Sobre accesibilidad, hay que comprobar la entrada y el terreno concretos; la cercanía de un restaurante o de un estacionamiento no significa que la arena sea accesible.`,
    practical3:`El momento y lo que llevas también cuentan: ${local(content[6])} Consulta el pronóstico, la marea y las condiciones locales el mismo día. Lleva calzado adecuado si hay piedras o camino de tierra, carga el teléfono y guarda una referencia del punto de salida. Yo prefiero tener un plan más corto y cómodo que depender de encontrar algo al llegar.`,
    recommend:`Mi recomendación principal para ${beach.name} es decidir con honestidad qué buscas. ${local(content[8])} Si buscas calma, compara el tramo y el estado real del mar; si priorizas un paseo, calcula la distancia y el retorno; si quieres una playa con servicios, confirma lo que está abierto. Ese pequeño ajuste evita expectativas equivocadas y hace que el día se disfrute más.`,
    combine:`Yo combinaría ${beach.name} con otra parada solo si el traslado tiene sentido y queda tiempo para estar de verdad en cada sitio. ${local(content[7])} Las playas vecinas pueden compartir paisaje, pero no necesariamente acceso, sombra, servicios ni condiciones de baño. Mira las tarjetas para escoger una compañera de ruta y organiza el orden pensando en el sol, el transporte y la energía del grupo.`,
    ending:`En resumen, yo visitaría ${beach.name} con curiosidad y margen para adaptar el plan. Llevar una referencia clara, comprobar el mar y cuidar el regreso son detalles pequeños que hacen una diferencia grande. La playa se disfruta mejor cuando uno entiende su ritmo y la trata con respeto.`,
    map:'La ubicación señalada sirve como referencia inicial. Revisa el acceso y la ruta elegidos antes de salir; el pin puede no coincidir con cada entrada de la playa.'
  },
  PT: {
    hero:`Eu conto como escolher o melhor trecho de ${beach.name}: o que esperar do mar, como organizar a chegada e que passeio pode combinar com você.`,
    life1:`Quando chego a uma praia nova, não começo procurando a foto perfeita. Primeiro observo como a costa se abre, quanto espaço existe e qual é o ritmo das pessoas. Em ${beach.name}, essa primeira leitura me ajuda a decidir se vale ficar perto da entrada, caminhar um pouco ou aproveitar a paisagem de um ponto confortável.`,
    life2:`O perfil é ${persona}. Para mim, essa identidade organiza o dia: uma praia pode ser uma pausa, uma caminhada, um banho se as condições permitirem ou uma parada curta num roteiro. Eu não apresentaria a visita como uma experiência igual para todo mundo, porque cada pessoa chega com uma expectativa, e o mar e o acesso também mudam.`,
    life3:`A descrição mais concreta começa por aqui: ${local(content[0])} ${local(content[1])} Eu usaria essas informações para escolher o horário e a companhia, e não apenas para decidir se a praia fica bonita numa fotografia.`,
    activities:`Em ${beach.name}, eu organizaria o passeio em torno de atividades que respeitem o caráter do lugar e as condições do dia. ${local(content[1])} Se a ideia é caminhar, observar a costa ou passar um tempo na areia, reserve tempo suficiente para fazer isso sem transformar a visita numa corrida para marcar lugares.`,
    activity2:`Também perguntaria antes sobre aluguel, aulas, passeios ou serviços anunciados por terceiros; uma possibilidade não quer dizer que esteja disponível a qualquer hora. Se depender de um operador, combine preço, horário, ponto de encontro e volta antes de sair. Quando não houver atividade formal, a paisagem pode ser o próprio programa: parar para observar, fotografar sem invadir o espaço de ninguém e perceber como a água muda perto das pedras.`,
    sea1:`Eu observo o mar antes de escolher onde ficar e olho de novo antes de entrar. ${local(content[0])} Uma fotografia não informa sobre correntes, vento, ondas ou visibilidade de hoje; e o fato de outras pessoas estarem na água não é garantia. Pergunte a quem conhece o local e siga a sinalização e as orientações da equipe local.`,
    sea2:`Se a água estiver forte, se as pedras estiverem molhadas ou se a maré estiver subindo, eu mudo o plano: caminho pela orla, observo da terra ou escolho outra praia mais adequada. Com crianças, nadadores inexperientes ou pessoas que precisem de apoio, prefiro um ponto com saída simples e acompanhamento próximo.`,
    access1:`Eu planejo a chegada junto com a volta. ${local(content[2])} Antes de sair, confira o acesso exato no mapa, o trecho final a pé, a inclinação, o piso e a sombra. Em Búzios, duas praias próximas no mapa podem ter entradas bem diferentes; não presuma que exista uma trilha curta entre elas.`,
    access2:`Sobre transporte, ${local(content[5])} Se for de carro, confirme onde é permitido estacionar e não bloqueie entradas nem passagens de moradores. Se depender de táxi, transporte público ou transfer, salve o ponto de embarque e combine a volta, sobretudo se a visita terminar ao entardecer ou numa área com sinal irregular.`,
    practical1:`Eu saio com água, proteção solar, algo para me cobrir e uma sacola para levar o lixo de volta. ${local(content[3])} Não presumo que haja banheiro, sombra, comida, ducha ou aluguel de cadeiras: isso pode mudar por temporada e por trecho. Se esses serviços forem importantes, confirme antes e leve uma alternativa simples.`,
    practical2:`Para uma visita em família, ${local(content[4])} Eu penso no percurso inteiro: do carro ou da rua até a areia, o tempo no sol, a possibilidade de descansar e a subida da volta. Sobre acessibilidade, é preciso conferir a entrada e o terreno concretos; a proximidade de restaurante ou estacionamento não significa que a areia seja acessível.`,
    practical3:`O horário e o que você leva também contam: ${local(content[6])} Confira previsão, maré e condições locais no mesmo dia. Leve calçado adequado se houver pedras ou estrada de terra, carregue o celular e guarde uma referência do ponto de saída. Prefiro um plano mais curto e confortável a depender de encontrar algo ao chegar.`,
    recommend:`Minha recomendação principal para ${beach.name} é decidir com sinceridade o que você procura. ${local(content[8])} Se busca tranquilidade, compare o trecho e o estado real do mar; se prioriza uma caminhada, calcule distância e volta; se quer serviços, confirme o que está aberto. Esse ajuste simples evita expectativas erradas e melhora o dia.`,
    combine:`Eu combinaria ${beach.name} com outra parada apenas se o deslocamento fizer sentido e houver tempo para aproveitar cada lugar. ${local(content[7])} Praias vizinhas podem compartilhar a paisagem, mas não necessariamente acesso, sombra, serviços ou condições de banho. Veja os cartões e escolha a sequência considerando sol, transporte e energia do grupo.`,
    ending:`Em resumo, eu visitaria ${beach.name} com curiosidade e espaço para adaptar o plano. Ter uma referência clara, conferir o mar e cuidar da volta são detalhes pequenos que fazem diferença. A praia fica melhor quando entendemos seu ritmo e a tratamos com respeito.`,
    map:'A localização marcada é uma referência inicial. Confira o acesso e o trajeto escolhidos antes de sair; o ponto pode não corresponder a todas as entradas da praia.'
  },
  EN: {
    hero:`I explain how to choose the right stretch of ${beach.name}: what to expect from the sea, how to plan your arrival and which kind of visit may suit you.`,
    life1:`When I arrive at a new beach, I do not start by looking for the perfect photo. First I notice how the coast opens up, how much room there is and what pace people have brought to the shore. At ${beach.name}, that first reading helps me decide whether to stay near the entrance, walk a little farther or simply enjoy the view from a comfortable spot.`,
    life2:`Its profile is ${persona}. For me, that character helps shape the day: a beach can be a pause, a walk, a swim if conditions allow or a short stop on a longer route. I would not present it as the same experience for everyone, because visitors arrive with different expectations and both the sea and access can change.`,
    life3:`A more useful description starts here: ${local(content[0])} ${local(content[1])} I would use those details to choose the time and company, not simply to decide whether the beach looks beautiful in a photograph.`,
    activities:`At ${beach.name}, I would plan around activities that respect the character of the place and the conditions that day. ${local(content[1])} If the plan is to walk, watch the coastline or spend time on the sand, leave enough room to do it without turning the visit into a race to tick off locations.`,
    activity2:`I would also ask in advance about rentals, lessons, boat trips or services advertised by others; a possibility does not mean it is available at every hour. If an operator is part of your plan, agree on the price, schedule, meeting point and return before setting out. When there is no formal activity, the landscape can be the experience: pause to look, take photographs without intruding on anyone and notice how the water changes near the rocks.`,
    sea1:`I look at the sea before choosing where to settle and again before going in. ${local(content[0])} A photograph cannot tell you today’s currents, wind, waves or visibility, and other people being in the water is no guarantee. Ask people who know the place and follow signs and local guidance.`,
    sea2:`If the water is strong, the rocks are wet or the tide is rising, I change the plan: walk along the shore, enjoy the view from land or choose another beach that fits better. With children, inexperienced swimmers or anyone who needs support, I prefer a place with an easy exit and close supervision.`,
    access1:`I plan the return at the same time as the arrival. ${local(content[2])} Before leaving, check the exact entrance on the map, the final walk, the slope, the surface and available shade. In Búzios, two beaches that look close on a map can have very different entrances; I would not assume there is a short trail between them.`,
    access2:`For transport, ${local(content[5])} If you drive, confirm where parking is allowed and keep gates and local paths clear. If you rely on a taxi, public transport or a transfer, save the pickup point and arrange the return, especially if the visit ends near sunset or in an area with patchy phone signal.`,
    practical1:`I leave with water, sun protection, a light cover-up and a bag for taking rubbish back. ${local(content[3])} I do not assume that toilets, shade, food, showers or chair rentals will be available: they can change by season and by stretch. If a facility matters to you, confirm it first and bring a simple backup.`,
    practical2:`For a family visit, ${local(content[4])} I think about the whole route: from the car or street to the sand, time in the sun, chances to rest and the uphill return. Accessibility needs a check of the actual entrance and ground; a nearby restaurant or car park does not mean the sand is accessible.`,
    practical3:`Timing and what you carry matter too: ${local(content[6])} Check the forecast, tide and local conditions on the day. Bring suitable shoes if there are rocks or an unpaved path, charge your phone and save a reference for the starting point. I prefer a shorter, comfortable plan to relying on finding something when I arrive.`,
    recommend:`My main recommendation for ${beach.name} is to be honest about what you are looking for. ${local(content[8])} If you want a calm swim, compare the exact stretch and actual sea conditions; if you want a walk, account for distance and the return; if facilities matter, confirm what is open. That small adjustment prevents mismatched expectations and makes the day more enjoyable.`,
    combine:`I would pair ${beach.name} with another stop only if the transfer makes sense and leaves time to enjoy each place. ${local(content[7])} Nearby beaches may share a coastline but not access, shade, services or swimming conditions. Use the cards to choose a companion stop, then set the order around sunlight, transport and the group’s energy.`,
    ending:`In short, I would visit ${beach.name} with curiosity and room to adapt. A clear meeting point, a check on the sea and a planned return are small details that make a real difference. The beach is more rewarding when we understand its pace and treat it with care.`,
    map:'The marked location is a starting reference. Check your chosen entrance and route before setting out; the pin may not represent every beach access.'
  }
}[language] || null;
const N = narrative || {
  hero:`${L.lead} ${beach.name}.`, life1:`${L.lead} ${persona}. ${local(content[0])}`, life2:`${local(content[1])} ${local(content[0])}`, life3:`${local(content[0])} ${local(content[1])}`,
  activities:local(content[1]), activity2:local(content[7]), sea1:local(content[0]), sea2:L.note, access1:local(content[2]), access2:local(content[5]), practical1:local(content[3]), practical2:local(content[4]), practical3:local(content[6]), recommend:local(content[8]), combine:local(content[7]), ending:L.note, map:L.mapText
};
const photosForStory = photos.slice(1);
const stories = [];
for (let i=0; i<photosForStory.length; i+=4) stories.push(photoStory(photosForStory.slice(i,i+4), i+1));
const picture = index => stories[index] || '';
const introDecision = decision || `${L.lead} ${profile}`;
const mapQuery = encodeURIComponent(`Praia ${beach.name}, Armação dos Búzios, RJ`);
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
const excerpt = value => { const text = String(value || '').replace(/\s+/g,' ').trim(); return text.length > 88 ? `${text.slice(0,85).replace(/\s+\S*$/,'')}…` : text; };
const quickFacts = `<div class="bp-hero__facts"><span>${escape(byline || profile)}</span><span>${escape(L.sea)} · ${escape(excerpt(local(content[0])))}</span><span>${escape(L.access)} · ${escape(excerpt(local(content[2])))}</span></div>`;
const activityHeading = {ES:'Elige el plan que le va a esta costa',PT:'Escolha o programa que combina com este litoral',EN:'Choose an outing that suits this coast'}[language];
const practicalHeading = {ES:'Antes de salir, resuelve lo esencial',PT:'Antes de sair, resolva o essencial',EN:'Sort out the essentials before you go'}[language];
const mapSection = `<section class="bp-section bp-section--deep" id="mapa"><p class="bp-number">${L.labels[7]}</p><div class="bp-copy-wide"><h2>${L.sections[7]}</h2><p>${escape(N.map)}</p><a class="bp-source-link" href="${mapUrl}" target="_blank" rel="noopener noreferrer">${L.map}</a></div></section>`;
const leadText = language === 'PT' ? N.hero : language === 'EN' ? N.hero : N.hero;
const activityCards = `<div class="bp-activity-grid">${articleCard('01',localNames.doing,N.activities)}${articleCard('02',localNames.watch,N.activity2)}${articleCard('03',localNames.prepare,N.recommend)}</div>`;
const practicalCards = `<div class="bp-practical-grid">${practicalCard(language==='PT'?'Estrutura e serviços':language==='EN'?'Facilities and services':'Servicios e infraestructura',N.practical1)}${practicalCard(language==='PT'?'Famílias e acessibilidade':language==='EN'?'Families and access':'Familias y accesibilidad',N.practical2)}${practicalCard(language==='PT'?'Horário e mochila':language==='EN'?'Timing and what to pack':'Horario y qué llevar',N.practical3)}</div>`;

root.innerHTML = `<main class="beach-premium bz2-beach-page" id="contenido">
  <section class="bp-hero" aria-labelledby="bz2-title">
    <div class="bp-hero__copy"><a class="bp-back" href="${prefix}/destinos/buzios/playas/">${L.back}</a><p class="kicker">${L.eyebrow} · ${escape(beach.name.toUpperCase())}</p><h1 id="bz2-title">${escape(language === 'PT' ? `Praia ${beach.name}` : language === 'EN' ? `${beach.name} Beach` : `Playa ${beach.name}`)}</h1><p class="bp-hero__lead">${escape(leadText)}</p></div>
    ${photos[0] ? figure(photos[0],0,true) : ''}${quickFacts}
  </section>
  <div class="bp-shell">
    <nav class="bp-toc" aria-label="${language === 'PT' ? 'Nesta guia' : language === 'EN' ? 'In this guide' : 'En esta guía'}">${L.toc.map((label,i)=>`<a href="#${ids[i]}">${label}</a>`).join('')}</nav>
    ${section(0,`<h3>${escape(L.identity)}</h3><p>${escape(N.life1)}</p><p>${escape(N.life2)}</p><p>${escape(N.life3)}</p><aside class="bp-tip bp-tip--gold"><p class="bp-tip__label">${L.tip}</p><p>${escape(decision || introDecision)}</p></aside>`,'deep')}
    ${picture(0)}
    ${section(1,`<p>${escape(N.activities)}</p><p>${escape(N.activity2)}</p><h3>${escape(activityHeading)}</h3>${activityCards}`,'sand')}
    ${picture(1)}
    ${section(2,`<p>${escape(N.sea1)}</p><p>${escape(N.sea2)}</p><aside class="bp-tip bp-tip--teal"><p class="bp-tip__label">${L.tip}</p><p>${escape(L.note)}</p></aside>`,'deep')}
    ${picture(2)}
    ${section(3,`<p>${escape(N.access1)}</p><p>${escape(N.access2)}</p><p>${escape(local(content[5]))}</p>`,'sand')}
    ${section(4,`<p>${escape(N.practical1)}</p><p>${escape(N.practical2)}</p><p>${escape(N.practical3)}</p><h3>${escape(practicalHeading)}</h3>${practicalCards}`,'deep')}
    ${picture(3)}
    ${section(5,`<p>${escape(N.recommend)}</p><aside class="bp-tip bp-tip--gold"><p class="bp-tip__label">${L.tip}</p><p>${escape(N.ending)}</p></aside>`,'sand')}
    ${section(6,`<p>${escape(N.combine)}</p><div class="bp-combine-grid">${relatedCards}</div>`,'deep')}
    ${stories.slice(4).join('')}
    ${mapSection}
  </div>
</main>`;
