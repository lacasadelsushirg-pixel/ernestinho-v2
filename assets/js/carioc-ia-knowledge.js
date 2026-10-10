const t = (ES, PT, EN) => ({ ES, PT, EN });

export const UI = {
  ES: {
    name: "Ernestinho Carioc-IA",
    subtitle: "Tu guía rápida de Río",
    greeting: "¡Hola! Soy Ernestinho Carioc-IA. Te ayudo a encontrar la guía de Río que buscas. ¿Por dónde empezamos?",
    placeholder: "Escribe tu pregunta…",
    send: "Enviar",
    open: "Abrir asistente",
    close: "Cerrar asistente",
    whatsapp: "Hablar con Ernestinho",
    whatsappMessage: "Hola Ernestinho, necesito ayuda para planificar mi viaje a Río.",
    suggestions: [
      "¿Qué hacer en Río en 3 días?",
      "¿Qué playas me recomiendas?",
      "¿Cómo me muevo por Río?",
      "Viajo con niños",
      "¿Qué experiencia me recomiendas?",
      "Quiero reservar"
    ],
    fallback: "Todavía no tengo esa respuesta exacta en mi guía. Puedo acercarte a una sección relacionada o ayudarte a hablar con Ernestinho por WhatsApp.",
    fallbackTitle: "Te puede servir",
    booking: "Puedo ayudarte a encontrar la experiencia. Los valores, disponibilidad y condiciones se confirman directamente con Ernestinho para tus fechas.",
    privacy: "Respuestas preparadas con información de la guía."
  },
  PT: {
    name: "Ernestinho Carioc-IA",
    subtitle: "Seu guia rápido do Rio",
    greeting: "Oi! Sou o Ernestinho Carioc-IA. Ajudo você a encontrar o guia do Rio que procura. Por onde começamos?",
    placeholder: "Escreva sua pergunta…",
    send: "Enviar",
    open: "Abrir assistente",
    close: "Fechar assistente",
    whatsapp: "Falar com Ernestinho",
    whatsappMessage: "Olá Ernestinho, preciso de ajuda para planejar minha viagem ao Rio.",
    suggestions: [
      "O que fazer no Rio em 3 dias?",
      "Quais praias você recomenda?",
      "Como me locomover pelo Rio?",
      "Viajo com crianças",
      "Qual experiência você recomenda?",
      "Quero reservar"
    ],
    fallback: "Ainda não tenho essa resposta exata no meu guia. Posso indicar uma seção relacionada ou ajudar você a falar com Ernestinho pelo WhatsApp.",
    fallbackTitle: "Pode ajudar",
    booking: "Posso ajudar você a encontrar a experiência. Valores, disponibilidade e condições são confirmados diretamente com Ernestinho para as suas datas.",
    privacy: "Respostas preparadas com informações do guia."
  },
  EN: {
    name: "Ernestinho Carioc-IA",
    subtitle: "Your quick guide to Rio",
    greeting: "Hi! I'm Ernestinho Carioc-IA. I can help you find the Rio guide you need. Where should we start?",
    placeholder: "Type your question…",
    send: "Send",
    open: "Open assistant",
    close: "Close assistant",
    whatsapp: "Talk to Ernestinho",
    whatsappMessage: "Hi Ernestinho, I need help planning my trip to Rio.",
    suggestions: [
      "What should I do in Rio in 3 days?",
      "Which beaches do you recommend?",
      "How do I get around Rio?",
      "I'm traveling with kids",
      "Which experience do you recommend?",
      "I want to book"
    ],
    fallback: "I don't have that exact answer in my guide yet. I can point you to a related section or help you contact Ernestinho on WhatsApp.",
    fallbackTitle: "This may help",
    booking: "I can help you find an experience. Prices, availability, and terms are confirmed directly with Ernestinho for your dates.",
    privacy: "Answers are prepared from the guide's content."
  }
};

export const INTENTS = [
  {
    id: "contact",
    keywords: ["whatsapp", "hablar con ernestinho", "contacto", "contactar", "contact", "talk to ernestinho", "falar no whatsapp", "falar com ernestinho", "contato"],
    answer: t(
      "Claro. Escríbele directamente a Ernestinho por WhatsApp y cuéntale qué necesitas; te ayudará con tu consulta.",
      "Claro. Fale diretamente com Ernestinho pelo WhatsApp e conte o que você precisa; ele poderá ajudar com a sua dúvida.",
      "Of course. Message Ernestinho directly on WhatsApp and let him know what you need."
    ),
    whatsapp: true,
    links: []
  },
  {
    id: "booking",
    keywords: ["quiero reservar", "reservar", "reserva", "hacer una reserva", "precio", "precios", "valor", "valores", "disponibilidad", "booking", "book", "make a reservation", "price", "availability", "reservar", "reserva", "preço", "valor", "disponibilidade", "quero fechar", "fazer reserva"],
    answer: t(
      "Puedo ayudarte a encontrar la experiencia. Los valores, la disponibilidad y las condiciones se confirman directamente con Ernestinho para tus fechas.",
      "Posso ajudar você a encontrar a experiência. Valores, disponibilidade e condições são confirmados diretamente com Ernestinho para as suas datas.",
      "I can help you find an experience. Prices, availability, and terms are confirmed directly with Ernestinho for your dates."
    ),
    whatsapp: true,
    links: [{ href: "/experiencias/", label: t("Ver experiencias", "Ver experiências", "Browse experiences") }]
  },
  {
    id: "first_visit",
    keywords: ["que hacer en rio en 3 dias", "3 dias en rio", "3 dias", "primer viaje", "primera vez", "first time in rio", "3 days in rio", "o que fazer no rio", "primeira vez no rio", "3 dias no rio"],
    answer: t(
      "Para una primera visita, organiza los días por zonas y deja margen para los traslados. La guía reúne información práctica, atracciones y experiencias para que elijas según tus fechas e intereses; no hay un recorrido único para todos.",
      "Na primeira visita, organize os dias por regiões e deixe tempo para os deslocamentos. O guia reúne informações práticas, atrações e experiências para você escolher conforme suas datas e interesses.",
      "For a first visit, plan by area and leave time for getting around. The guide brings together practical information, attractions, and experiences so you can choose what fits your dates and interests."
    ),
    links: [
      { href: "/guia/", label: t("Guía práctica", "Guia prático", "Practical guide") },
      { href: "/atracciones/", label: t("Atracciones", "Atrações", "Attractions") },
      { href: "/experiencias/", label: t("Experiencias", "Experiências", "Experiences") }
    ]
  },
  {
    id: "beaches",
    keywords: ["playas", "playa", "praias", "praia", "beaches", "beach", "copacabana beach", "what beach is in copacabana", "beach in copacabana", "playa en copacabana", "playa de copacabana", "praia em copacabana", "praia de copacabana", "orla", "surf", "tomar sol"],
    answer: t(
      "Cada playa tiene su propio ritmo. Revisa las fichas para comparar zonas y consulta la información de la playa concreta antes de salir, sobre todo si buscas surf, un paseo tranquilo o ir con niños.",
      "Cada praia tem seu próprio ritmo. Consulte as fichas para comparar as regiões e confira as informações da praia escolhida antes de sair, especialmente se procura surfe, um passeio tranquilo ou um lugar para ir com crianças.",
      "Each beach has its own feel. Compare the beach guides and check the specific beach before you go, especially if you're looking for surfing, a quieter visit, or a family outing."
    ),
    links: [
      { href: "/playas/", label: t("Guía de playas", "Guia de praias", "Beach guide") },
      { href: "/playas/copacabana/", label: t("Copacabana", "Copacabana", "Copacabana") },
      { href: "/playas/ipanema/", label: t("Ipanema", "Ipanema", "Ipanema") },
      { href: "/playas/prainha/", label: t("Prainha", "Prainha", "Prainha") }
    ]
  },
  {
    id: "transport",
    keywords: ["transporte", "transportes", "moverme", "moverse", "muevo", "como me muevo", "como llego a", "como llegar", "get around", "how do i get around rio", "aeropuerto", "uber", "metro", "brt", "vlt", "onibus", "ônibus", "getting around", "transport", "airport", "subway", "como me locomover", "metrô", "ônibus", "aeroporto"],
    answer: t(
      "La mejor opción depende del trayecto. La guía explica metro, VLT, BRT, buses, apps y traslados; si llegas en avión, revisa primero si tu vuelo aterriza en GIG o SDU.",
      "A melhor opção depende do trajeto. O guia explica metrô, VLT, BRT, ônibus, aplicativos e traslados; se você chega de avião, confira primeiro se seu voo pousa no GIG ou no SDU.",
      "The best option depends on your route. The guide covers the metro, VLT, BRT, buses, apps, and transfers. If you're flying in, first check whether your flight lands at GIG or SDU."
    ),
    links: [
      { href: "/transportes/", label: t("Guía de transportes", "Guia de transportes", "Transport guide") },
      { href: "/transportes/metro/", label: t("Metro", "Metrô", "Metro") },
      { href: "/transportes/uber/", label: t("Uber y apps", "Uber e aplicativos", "Uber and ride apps") },
      { href: "/guia/aeropuertos/", label: t("Aeropuertos", "Aeroportos", "Airports") }
    ]
  },
  {
    id: "stay",
    keywords: ["donde alojarse", "mejor zona", "hospedaje", "alojamiento", "hotel", "dormir en rio", "where to stay", "accommodation", "neighborhood to stay", "onde ficar", "hospedagem", "onde se hospedar"],
    answer: t(
      "La zona ideal depende de tu plan, presupuesto y forma de moverte. Compara los barrios y consulta la guía de hospedaje; si buscas un departamento atendido por Ernestinho, puedes ver sus opciones y preguntar directamente.",
      "A região ideal depende do seu roteiro, orçamento e forma de se locomover. Compare os bairros e consulte o guia de hospedagem; se procura um apartamento atendido pelo Ernestinho, veja as opções e fale diretamente com ele.",
      "The best area depends on your plans, budget, and how you want to get around. Compare neighborhoods and check the lodging guide. You can also browse Ernestinho's apartments and ask him directly."
    ),
    links: [
      { href: "/guia/donde-alojarse/", label: t("Dónde alojarse", "Onde ficar", "Where to stay") },
      { href: "/barrios/", label: t("Comparar barrios", "Comparar bairros", "Compare neighborhoods") },
      { href: "/hospedaje/", label: t("Apartamentos Ernestinho", "Apartamentos Ernestinho", "Ernestinho's apartments") }
    ]
  },
  {
    id: "family",
    keywords: ["familia", "familias", "ninos", "niños", "niño", "kids", "children", "family", "crianças", "criancas", "viajo con niños", "com crianças"],
    answer: t(
      "La sección Familia reúne planes de animales, ciencia, fútbol, carnaval, naturaleza y juegos para niños y adolescentes. Revisa cada ficha para ver qué lugar encaja mejor con tu grupo.",
      "A seção Família reúne opções de animais, ciência, futebol, carnaval, natureza e diversão para crianças e adolescentes. Consulte cada ficha para escolher o que combina com o seu grupo.",
      "The Family section gathers animal, science, football, carnival, nature, and play activities for children and teens. Browse the guides to find what suits your group."
    ),
    links: [
      { href: "/familia/", label: t("Río en familia", "Rio em família", "Rio with family") },
      { href: "/familia/aquario/", label: t("AquaRio", "AquaRio", "AquaRio") },
      { href: "/familia/bioparque/", label: t("BioParque", "BioParque", "BioParque") },
      { href: "/familia/parques/", label: t("Parques", "Parques", "Parks") }
    ]
  },
  {
    id: "food",
    keywords: ["donde comer", "comer en", "restaurante", "restaurantes", "gastronomia", "gastronomía", "comida", "churrascaria", "brunch", "where to eat", "restaurants", "food", "onde comer", "restaurante", "gastronomia", "comida", "churrascaria"],
    answer: t(
      "La guía gastronómica reúne restaurantes investigados y fichas por establecimiento. Puedes buscar por barrio o estilo y revisar la ficha antes de decidir; confirma horarios y disponibilidad con el local.",
      "O guia gastronômico reúne restaurantes pesquisados e fichas por estabelecimento. Você pode buscar por bairro ou estilo e consultar a ficha antes de escolher; confirme horários e disponibilidade com o local.",
      "The food guide brings together researched restaurants and individual venue guides. Search by neighborhood or style, then check the venue's details before deciding; confirm hours and availability with the restaurant."
    ),
    links: [
      { href: "/gastronomia/", label: t("Explorar Gastronomía", "Explorar Gastronomia", "Explore dining") },
      { href: "/barrios/copacabana/", label: t("Comer en Copacabana", "Comer em Copacabana", "Dining in Copacabana") },
      { href: "/barrios/ipanema/", label: t("Comer en Ipanema", "Comer em Ipanema", "Dining in Ipanema") }
    ]
  },
  {
    id: "experiences",
    keywords: ["experiencia", "experiencias", "tour", "tours", "excursion", "excursiones", "paseo", "full day", "cristo", "recommend an experience", "experiences", "tour", "passeio", "passeios", "experiência", "experiências"],
    answer: t(
      "En Experiencias puedes comparar paseos por tipo: ciudad, mar, cultura, aventura o planes privados. Abre cada ficha para revisar qué incluye y consulta con Ernestinho los valores y la disponibilidad de tu fecha.",
      "Em Experiências você pode comparar passeios por estilo: cidade, mar, cultura, aventura ou opções privadas. Abra cada ficha para conferir o que inclui e consulte Ernestinho sobre valores e disponibilidade para a sua data.",
      "The Experiences section lets you compare city, sea, culture, adventure, and private outings. Open each guide to see what's included, then ask Ernestinho about prices and availability for your date."
    ),
    links: [
      { href: "/experiencias/", label: t("Ver todas las experiencias", "Ver todas as experiências", "Browse all experiences") },
      { href: "/experiencias/full-day-rio/", label: t("Full Day Río", "Full Day Rio", "Full Day Rio") },
      { href: "/experiencias/cristo-city-tour/", label: t("Cristo + City Tour", "Cristo + City Tour", "Christ + City Tour") }
    ]
  },
  {
    id: "buzios",
    keywords: ["buzios", "búzios", "buzios tour", "buzios goleta", "buzios escuna", "tour a buzios", "tours a buzios", "tours to buzios", "passeio para buzios"],
    answer: t(
      "La guía de Búzios presenta la experiencia en goleta y la escapada desde Río. Revisa la ficha para conocer la propuesta y consulta directamente por valores, disponibilidad y condiciones para tu fecha.",
      "O guia de Búzios apresenta o passeio de escuna e a viagem saindo do Rio. Consulte a ficha para conhecer a proposta e fale diretamente sobre valores, disponibilidade e condições para a sua data.",
      "The Búzios guide covers the schooner outing and the trip from Rio. Check the page for details, then ask directly about prices, availability, and terms for your date."
    ),
    links: [
      { href: "/experiencias/buzios/", label: t("Experiencia Búzios", "Experiência Búzios", "Búzios experience") },
      { href: "/destinos/buzios/", label: t("Guía de Búzios", "Guia de Búzios", "Búzios guide") }
    ]
  },
  {
    id: "angra",
    keywords: ["angra", "ilha grande", "isla grande", "angra tour", "angra passeio", "tours a angra", "tour a angra", "tours to angra", "trip to angra", "passeio em angra", "passeios para angra"],
    answer: t(
      "La ficha de Angra + Ilha Grande describe la excursión y sus puntos principales. Revísala y confirma directamente con Ernestinho los detalles, valores y disponibilidad para tu fecha.",
      "A ficha de Angra + Ilha Grande apresenta o passeio e seus principais pontos. Consulte os detalhes e confirme diretamente com Ernestinho valores e disponibilidade para a sua data.",
      "The Angra + Ilha Grande guide describes the outing and its main highlights. Check the page, then confirm details, prices, and availability for your date with Ernestinho."
    ),
    links: [{ href: "/experiencias/angra-ilha-grande/", label: t("Angra + Ilha Grande", "Angra + Ilha Grande", "Angra + Ilha Grande") }]
  },
  {
    id: "arraial",
    keywords: ["arraial", "arraial do cabo", "caribe brasileiro", "tour a arraial", "tours a arraial", "tours to arraial", "passeio para arraial"],
    answer: t(
      "La ficha de Arraial do Cabo presenta la excursión desde Río y el paseo por la Região dos Lagos. Consulta la página y confirma con Ernestinho los detalles y la disponibilidad para tus fechas.",
      "A ficha de Arraial do Cabo apresenta o passeio saindo do Rio e a Região dos Lagos. Consulte a página e confirme com Ernestinho os detalhes e a disponibilidade para as suas datas.",
      "The Arraial do Cabo guide covers the outing from Rio and the Região dos Lagos. Check the page, then confirm details and availability for your dates with Ernestinho."
    ),
    links: [{ href: "/experiencias/arraial-do-cabo/", label: t("Arraial do Cabo", "Arraial do Cabo", "Arraial do Cabo") }]
  },
  {
    id: "neighborhoods",
    keywords: ["barrios", "bairro", "bairros", "neighborhood", "neighborhoods", "copacabana", "ipanema", "leblon", "santa teresa", "lapa", "urca", "centro", "zonas de rio", "regiões"],
    answer: t(
      "Río cambia mucho de un barrio a otro: distancias, ambiente, playa y transporte influyen en la experiencia. La guía de Barrios ayuda a comparar las zonas antes de elegir dónde quedarse o qué explorar.",
      "O Rio muda bastante de um bairro para outro: distâncias, ambiente, praia e transporte fazem diferença. O guia de Bairros ajuda a comparar as regiões antes de escolher onde ficar ou o que conhecer.",
      "Rio feels different from one neighborhood to another. Distances, atmosphere, beaches, and transport all shape the experience. Use the neighborhood guide to compare areas before choosing where to stay or explore."
    ),
    links: [
      { href: "/barrios/", label: t("Explorar barrios", "Explorar bairros", "Explore neighborhoods") },
      { href: "/barrios/copacabana/", label: t("Copacabana", "Copacabana", "Copacabana") },
      { href: "/barrios/ipanema/", label: t("Ipanema", "Ipanema", "Ipanema") },
      { href: "/barrios/santa-teresa/", label: t("Santa Teresa", "Santa Teresa", "Santa Teresa") }
    ]
  },
  {
    id: "weather",
    keywords: ["clima", "tempo", "mejor epoca", "cuando viajar", "mes a mes", "weather", "best time", "when to visit", "clima no rio", "época", "chuva"],
    answer: t(
      "La guía mes a mes reúne clima, playas, eventos y movimiento de la ciudad para planificar la época del viaje. Para el pronóstico de un día concreto, revisa una fuente meteorológica actualizada cerca de tu salida.",
      "O guia mês a mês reúne clima, praias, eventos e movimento da cidade para ajudar a escolher a época da viagem. Para a previsão de um dia específico, consulte uma fonte meteorológica atualizada perto da data.",
      "The month-by-month guide brings together weather, beaches, events, and the city's rhythm to help plan your travel season. For a specific day's forecast, check an up-to-date weather source closer to departure."
    ),
    links: [{ href: "/guia/mes-a-mes/", label: t("Río mes a mes", "Rio mês a mês", "Rio month by month") }]
  },
  {
    id: "today",
    keywords: ["que hacer hoy", "hoy en rio", "hoy", "agenda", "eventos", "evento", "today", "what's on", "events", "o que fazer hoje", "hoje", "eventos no rio"],
    answer: t(
      "Para ideas del día, revisa Rio Hoje en la portada y la agenda de eventos. La programación puede cambiar, así que confirma fecha, lugar y entradas en la página del evento antes de salir.",
      "Para ideias do dia, veja o Rio Hoje na página inicial e a agenda de eventos. A programação pode mudar; confirme data, local e ingressos na página do evento antes de sair.",
      "For ideas today, check Rio Hoje on the homepage and the events guide. Listings can change, so confirm the date, venue, and tickets on the event page before heading out."
    ),
    links: [
      { href: "/#hoy", label: t("Rio Hoje", "Rio Hoje", "Rio Hoje") },
      { href: "/eventos/", label: t("Agenda de eventos", "Agenda de eventos", "Events guide") }
    ]
  },
  {
    id: "safety",
    keywords: ["seguridad", "seguro", "emergencia", "emergencias", "safety", "safe", "emergency", "segurança", "emergência"],
    answer: t(
      "Para una situación urgente, primero busca un lugar seguro y protege a las personas. La guía de emergencias reúne pasos y contactos útiles; si se trata de una emergencia inmediata, contacta los servicios locales.",
      "Em uma situação urgente, procure primeiro um local seguro e proteja as pessoas. O guia de emergências reúne orientações e contatos úteis; em caso de emergência imediata, procure os serviços locais.",
      "In an urgent situation, first get to a safe place and protect the people involved. The emergency guide gathers useful steps and contacts; for immediate danger, contact local emergency services."
    ),
    links: [{ href: "/guia/emergencias/", label: t("Guía de emergencias", "Guia de emergências", "Emergency guide") }]
  },
  {
    id: "nightlife",
    keywords: ["vida nocturna", "noche", "salir de noche", "bares", "nightlife", "night out", "bars at night", "vida noturna", "noite", "sair à noite"],
    answer: t(
      "La guía de Vida Nocturna reúne fichas por barrio, música y tipo de noche. Revisa la ficha del lugar que te interese y confirma su programación y horario antes de ir.",
      "O guia de Vida Noturna reúne fichas por bairro, música e estilo de noite. Consulte a ficha do local que interessa e confirme a programação e o horário antes de ir.",
      "The Nightlife guide groups venue pages by neighborhood, music, and night-out style. Check the venue page and confirm its schedule and hours before you go."
    ),
    links: [{ href: "/vida-nocturna/", label: t("Explorar Vida Nocturna", "Explorar Vida Noturna", "Explore nightlife") }]
  },
  {
    id: "shopping",
    keywords: ["compras", "shopping", "where can i shop", "where to shop", "feria", "ferias", "mercado", "feira", "markets", "shopping mall", "onde comprar", "onde fazer compras"],
    answer: t(
      "La sección Compras reúne shoppings, ferias y mercados populares, con fichas para elegir según la zona y lo que buscas.",
      "A seção Compras reúne shoppings, feiras e mercados populares, com fichas para escolher conforme a região e o que você procura.",
      "The Shopping section covers malls, street fairs, and popular markets, with guides to help you choose by area and what you're looking for."
    ),
    links: [{ href: "/compras/", label: t("Explorar Compras", "Explorar Compras", "Explore shopping") }]
  },
];

export const FALLBACK_LINKS = [
  { href: "/guia/", label: t("Guía de Río", "Guia do Rio", "Rio guide") },
  { href: "/experiencias/", label: t("Experiencias", "Experiências", "Experiences") },
  { href: "/playas/", label: t("Playas", "Praias", "Beaches") }
];
