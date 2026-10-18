export const buziosMainCategories = [
  { key: 'guide', path: '/destinos/buzios/guia/', ES: 'Guía de Búzios', PT: 'Guia de Búzios', EN: 'Búzios guide' },
  { key: 'experiences', path: '/destinos/buzios/experiencias/', ES: 'Tours y experiencias', PT: 'Passeios e experiências', EN: 'Tours and experiences' },
  { key: 'food', path: '/destinos/buzios/comer-y-salir/', ES: 'Dónde comer', PT: 'Onde comer', EN: 'Where to eat' },
  { key: 'things', path: '/destinos/buzios/que-hacer/', ES: 'Qué hacer', PT: 'O que fazer', EN: 'Things to do' },
  { key: 'beaches', path: '/destinos/buzios/playas/', ES: 'Playas', PT: 'Praias', EN: 'Beaches' },
  { key: 'neighborhoods', path: '/destinos/buzios/alojamiento/', ES: 'Barrios', PT: 'Bairros', EN: 'Neighborhoods' },
  { key: 'transport', path: '/destinos/buzios/transportes/', ES: 'Transportes', PT: 'Transportes', EN: 'Transport' },
  { key: 'events', path: '/destinos/buzios/eventos/', ES: 'Eventos', PT: 'Eventos', EN: 'Events' },
  { key: 'photos', path: '/destinos/buzios/fotografias/', ES: 'Fotografías', PT: 'Fotografias', EN: 'Photography' },
  { key: 'tips', path: '/destinos/buzios/consejos/', ES: 'Consejos', PT: 'Dicas', EN: 'Tips' }
];

// Existing editorial routes grouped under the eight destination doors.
// Keep these links on their current URLs while giving each topic one clear home.
export const buziosSubtopics = {
  guide: [
    ['/destinos/buzios/perfiles/', { ES: 'Planifica según tu viaje', PT: 'Planeje conforme sua viagem', EN: 'Plan around your trip' }, { ES: 'Perfiles de viaje para elegir ritmo, base y prioridades antes de reservar.', PT: 'Perfis de viagem para escolher ritmo, base e prioridades antes de reservar.', EN: 'Travel profiles to choose your pace, base and priorities before booking.' }]
  ],
  experiences: [
    ['/destinos/buzios/cruceros/', { ES: 'Llegada en crucero', PT: 'Chegada de cruzeiro', EN: 'Cruise visits' }, { ES: 'Desembarque, tiempo disponible y regreso coordinados con tu naviera.', PT: 'Desembarque, tempo disponível e retorno coordenados com sua companhia.', EN: 'Plan landing, time ashore and return with your cruise line.' }]
  ],
  food: [
    ['/destinos/buzios/gastronomia-argentina/', { ES: 'Cocina argentina', PT: 'Cozinha argentina', EN: 'Argentine cooking' }, { ES: 'Parrillas, sabores y referencias argentinas presentes en Búzios.', PT: 'Parrillas, sabores e referências argentinas em Búzios.', EN: 'Grills, flavours and Argentine influences found in Búzios.' }],
    ['/destinos/buzios/gastronomia-chilena/', { ES: 'Cocina chilena', PT: 'Cozinha chilena', EN: 'Chilean cooking' }, { ES: 'Una guía de propuestas chilenas y cómo ubicarlas en tu recorrido.', PT: 'Um guia de propostas chilenas e como incluí-las no passeio.', EN: 'A guide to Chilean options and where they fit into your plans.' }]
  ],
  things: [
    ['/destinos/buzios/con-ninos/', { ES: 'Búzios con niños', PT: 'Búzios com crianças', EN: 'Búzios with children' }, { ES: 'Actividades, pausas y decisiones prácticas para una salida familiar.', PT: 'Atividades, pausas e decisões práticas para um passeio em família.', EN: 'Activities, breaks and practical choices for a family outing.' }],
    ['/destinos/buzios/compras/', { ES: 'Compras', PT: 'Compras', EN: 'Shopping' }, { ES: 'Calles, productos y compras integradas a un paseo por el centro.', PT: 'Ruas, produtos e compras integradas a um passeio pelo Centro.', EN: 'Shopping streets and local finds folded into a town-centre walk.' }],
    ['/destinos/buzios/eventos/', { ES: 'Eventos', PT: 'Eventos', EN: 'Events' }, { ES: 'Qué revisar en la agenda y cómo confirmar fechas antes de viajar.', PT: 'O que conferir na agenda e como confirmar datas antes de viajar.', EN: 'What to look for in the calendar and how to verify dates.' }],
    ['/destinos/buzios/vida-nocturna/', { ES: 'Vida nocturna', PT: 'Vida noturna', EN: 'Nightlife' }, { ES: 'Ideas para cenar, caminar y organizar el regreso al alojamiento.', PT: 'Ideias para jantar, caminhar e planejar a volta à hospedagem.', EN: 'Ideas for dinner, an evening walk and getting back to your stay.' }]
  ],
  transport: [
    ['/destinos/buzios/como-llegar/', { ES: 'Cómo llegar desde Río y los aeropuertos', PT: 'Como chegar do Rio e dos aeroportos', EN: 'Getting here from Rio and the airports' }, { ES: 'Compara bus, transfer y auto según tu origen, horario y destino final.', PT: 'Compare ônibus, transfer e carro conforme sua origem, horário e destino final.', EN: 'Compare bus, transfer and car by origin, time and final destination.' }],
    ['/destinos/buzios/moverse/', { ES: 'Cómo moverse en Búzios', PT: 'Como se locomover em Búzios', EN: 'Getting around Búzios' }, { ES: 'Opciones locales para conectar alojamiento, playas y planes del día.', PT: 'Opções locais para conectar hospedagem, praias e programas do dia.', EN: 'Local options for connecting your stay, beaches and daily plans.' }]
  ],
  events: [
    ['/destinos/buzios/eventos/', { ES: 'Agenda viva de Búzios', PT: 'Agenda viva de Búzios', EN: 'Búzios live calendar' }, { ES: 'Festivales, cultura, gastronomía, deporte y vida comunitaria: confirma fechas en la agenda oficial.', PT: 'Festivais, cultura, gastronomia, esporte e vida comunitária: confira as datas na agenda oficial.', EN: 'Festivals, culture, food, sport and community life: verify dates in the official calendar.' }]
  ],
  photos: [
    ['/destinos/buzios/fotografias/', { ES: 'Galería de Búzios', PT: 'Galeria de Búzios', EN: 'Búzios photo gallery' }, { ES: 'Paisajes, playas y rincones del destino con créditos y fuentes de cada imagen.', PT: 'Paisagens, praias e cantos do destino com créditos e fontes de cada imagem.', EN: 'Landscapes, beaches and corners of the destination with image credits and sources.' }]
  ],
  tips: [
    ['/destinos/buzios/clima/', { ES: 'Clima y temporadas', PT: 'Clima e temporadas', EN: 'Weather and seasons' }, { ES: 'Estacionalidad, cambios de tiempo y decisiones útiles para empacar.', PT: 'Sazonalidade, mudanças do tempo e escolhas úteis para fazer a mala.', EN: 'Seasonality, changing weather and useful packing decisions.' }],
    ['/destinos/buzios/seguridad/', { ES: 'Seguridad', PT: 'Segurança', EN: 'Safety' }, { ES: 'Criterios de cuidado para moverte y disfrutar con atención.', PT: 'Cuidados para circular e aproveitar com atenção.', EN: 'Practical care for moving around and enjoying your stay.' }],
    ['/destinos/buzios/dinero/', { ES: 'Dinero y pagos', PT: 'Dinheiro e pagamentos', EN: 'Money and payments' }, { ES: 'Prepara medios de pago y gastos sin depender de supuestos.', PT: 'Prepare meios de pagamento e despesas sem depender de suposições.', EN: 'Plan payment methods and spending without relying on assumptions.' }],
    ['/destinos/buzios/internet/', { ES: 'Internet y conexión', PT: 'Internet e conexão', EN: 'Internet and connectivity' }, { ES: 'Conectividad, mapas y comunicación durante el viaje.', PT: 'Conectividade, mapas e comunicação durante a viagem.', EN: 'Connectivity, maps and communication during your trip.' }],
    ['/destinos/buzios/salud/', { ES: 'Salud', PT: 'Saúde', EN: 'Health' }, { ES: 'Preparación básica y cómo localizar asistencia cuando la necesites.', PT: 'Preparação básica e como localizar atendimento quando precisar.', EN: 'Basic preparation and how to find assistance when needed.' }],
    ['/destinos/buzios/accesibilidad/', { ES: 'Accesibilidad', PT: 'Acessibilidade', EN: 'Accessibility' }, { ES: 'Consulta pendientes, superficies y condiciones concretas antes de salir.', PT: 'Confira ladeiras, superfícies e condições concretas antes de sair.', EN: 'Check slopes, surfaces and specific conditions before setting out.' }],
    ['/destinos/buzios/mascotas/', { ES: 'Viajar con mascotas', PT: 'Viajar com animais', EN: 'Travelling with pets' }, { ES: 'Qué confirmar con alojamientos, transporte y establecimientos.', PT: 'O que confirmar com hospedagens, transporte e estabelecimentos.', EN: 'What to confirm with accommodation, transport and venues.' }],
    ['/destinos/buzios/servicios/', { ES: 'Servicios prácticos', PT: 'Serviços práticos', EN: 'Practical services' }, { ES: 'Resuelve necesidades cotidianas durante la estadía.', PT: 'Resolva necessidades cotidianas durante a estadia.', EN: 'Handle everyday needs during your stay.' }],
    ['/destinos/buzios/supermercados/', { ES: 'Supermercados', PT: 'Supermercados', EN: 'Supermarkets' }, { ES: 'Ubica compras de abastecimiento según tu alojamiento y recorrido.', PT: 'Encontre compras de abastecimento conforme sua hospedagem e trajeto.', EN: 'Plan grocery stops around your accommodation and route.' }]
  ]
};

export function renderBuziosSubtopics(category, language = 'ES') {
  const lang = ['ES', 'PT', 'EN'].includes(language) ? language : 'ES';
  const items = buziosSubtopics[category] || [];
  if (!items.length) return '';
  const heading = { ES: 'Explora los temas de esta guía', PT: 'Explore os temas deste guia', EN: 'Explore this guide by topic' }[lang];
  return `<section class="bz-section bz-topic-index"><div class="bz-wrap"><div class="bz-section-head"><p class="bz-eyebrow">${items.length.toString().padStart(2, '0')}</p><h2>${heading}</h2></div><div class="bz-grid ${items.length < 3 ? 'two' : ''}">${items.map(([href, title, copy], index) => `<article class="bz-card"><span class="bz-card-number">${String(index + 1).padStart(2, '0')}</span><h3>${title[lang]}</h3><p>${copy[lang]}</p><a href="${lang === 'ES' ? '' : `/${lang.toLowerCase()}`}${href}">${{ ES: 'Abrir guía', PT: 'Abrir guia', EN: 'Open guide' }[lang]} →</a></article>`).join('')}</div></div></section>`;
}

export function renderBuziosCategoryNav(language = 'ES') {
  const lang = ['ES', 'PT', 'EN'].includes(language) ? language : 'ES';
  const prefix = lang === 'ES' ? '' : `/${lang.toLowerCase()}`;
  const label = { ES: 'Categorías de Búzios', PT: 'Categorias de Búzios', EN: 'Búzios categories' }[lang];
  const links = buziosMainCategories.map(category =>
    `<a href="${prefix}${category.path}">${category[lang]}</a>`
  ).join('');
  const primary = document.querySelector('.topbar > nav');
  if (primary) {
    primary.classList.add('ec-primary-nav', 'bz-primary-nav');
    primary.setAttribute('aria-label', label);
    primary.innerHTML = links;
  }
  return '';
}
