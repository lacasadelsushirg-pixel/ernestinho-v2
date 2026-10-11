import { INTENTS } from "./carioc-ia-knowledge.js?v=20261010-cariocia2";
import { CURATED_INTENTS, FOLLOWUP_MAPS, INTENT_GUIDANCE } from "./carioc-ia-library.js?v=20261010-cariocia2";

const LEGACY_CATEGORIES = {
  contact: "commercial", booking: "commercial", first_visit: "general", beaches: "beaches", transport: "transport",
  stay: "lodging", family: "family", food: "gastronomy", experiences: "experiences", buzios: "experiences",
  angra: "experiences", arraial: "experiences", neighborhoods: "neighborhoods", weather: "general", today: "events",
  safety: "general", nightlife: "nightlife", shopping: "shopping"
};
const LEGACY_INTENTS = INTENTS.map(intent => ({
  ...intent,
  category: intent.category || LEGACY_CATEGORIES[intent.id] || "general",
  status: "legacy",
  source: intent.links?.map(item => item.href) || []
}));

/* Everyday visitor needs: authored responses, no invented live location or availability. */
const ecT = (ES, PT, EN) => ({ ES, PT, EN });
const ecL = (href, ES, PT, EN) => ({ href, label: ecT(ES, PT, EN) });
const ecEveryday = (id, category, keywords, answer, links, pending = null, priority = 27) => ({
  id, category, keywords, answer, links, status: "approved",
  source: links.map(x => x.href), priority, pending,
  reviewedOn: "2026-10-10", followups: []
});
const EVERYDAY_INTENTS = [
  ecEveryday("daily_food", "gastronomy",
    ["quiero salir a comer", "quiero comer algo", "tengo hambre", "donde puedo cenar", "quiero cenar", "salir a cenar", "comer barato", "algo para comer", "quero sair para comer", "estou com fome", "to com fome", "quero jantar", "onde posso jantar", "comer barato no rio", "i want to eat out", "i am hungry", "im hungry", "where can i have dinner", "where to have dinner", "cheap eats"],
    ecT("¡Vamos a comer rico! ¿En qué barrio estás y qué te apetece: comida brasileña, carnes, mariscos, algo económico o una cafetería? Mientras tanto, puedes mirar nuestra guía gastronómica.",
    "Vamos comer bem! Em qual bairro você está e o que prefere: comida brasileira, carnes, frutos do mar, algo econômico ou uma cafeteria? Enquanto isso, confira o guia de gastronomia.",
    "Let's find something tasty! Which neighborhood are you in, and what sounds good: Brazilian food, grilled meat, seafood, budget-friendly food, or a café? You can also browse our food guide."),
    [ecL("/gastronomia/", "Explorar restaurantes", "Explorar restaurantes", "Explore restaurants")], "location"),
  ecEveryday("daily_supermarket", "shopping",
    ["quiero un supermercado cerca", "un supermercado cerca", "supermercado cerca de mi", "supermercado cercano", "donde hay un supermercado", "donde compro agua", "comprar agua cerca", "necesito un supermercado", "mercado cerca de mi", "supermercado perto de mim", "supermercado aqui perto", "preciso de supermercado", "onde comprar agua", "onde tem supermercado", "mercado perto", "supermarket near me", "where is the nearest supermarket", "grocery store near me", "where can i buy water", "need a supermarket"],
    ecT("¡Claro! ¿En qué barrio o cerca de qué calle estás? Te ayudo a orientarte, pero no puedo ver tu GPS ni confirmar qué sucursal está abierta sin datos actuales.",
    "Claro! Em qual bairro ou perto de qual rua você está? Eu ajudo a se orientar, mas não consigo ver seu GPS nem confirmar qual loja está aberta sem dados atualizados.",
    "Sure! Which neighborhood or street are you near? I can help you navigate, but I can't see your GPS or confirm which shop is open without current information."),
    [ecL("/consejos/supermercados/", "Guía de supermercados", "Guia de supermercados", "Supermarket guide")], "location", 38),
  ecEveryday("daily_pharmacy", "shopping",
    ["farmacia cerca", "farmacia cerca de mi", "necesito farmacia", "farmacia 24 horas", "donde compro remedios", "farmacia abierta ahora", "farmacia perto", "preciso de farmacia", "farmacia 24 horas perto", "onde comprar remedio", "pharmacy near me", "i need a pharmacy", "24 hour pharmacy", "where to buy medicine"],
    ecT("¿En qué barrio o calle estás? Puedo orientarte para buscar una farmacia; confirma horarios directamente. Si es una urgencia médica, llama al SAMU 192.",
    "Em qual bairro ou rua você está? Posso orientar a busca por farmácia; confirme os horários com a loja. Em emergência médica, ligue para o SAMU 192.",
    "What neighborhood or street are you near? I can guide your pharmacy search; please verify opening hours. For a medical emergency in Brazil, call SAMU at 192."),
    [ecL("/guia/", "Guía práctica", "Guia prático", "Practical guide")], "location", 35),
  ecEveryday("daily_essential_shops", "shopping",
    ["donde comprar protector solar", "comprar bloqueador", "comprar panales", "necesito hielo", "comprar frutas", "comprar cafe brasileno", "comprar paraguas", "onde comprar protetor solar", "comprar fraldas", "onde comprar gelo", "comprar frutas", "where to buy sunscreen", "where to buy diapers", "where to buy ice", "buy fruit", "where to buy an umbrella"],
    ecT("Te ayudo a encontrar dónde comprarlo. ¿En qué barrio estás? Supermercados, farmacias y tiendas pueden tener opciones, pero el stock y horario cambian.",
    "Ajudo você a encontrar onde comprar. Em qual bairro está? Mercados, farmácias e lojas podem ter opções, mas estoque e horário mudam.",
    "I can help you look for it. Which neighborhood are you in? Supermarkets, pharmacies and shops may carry it, but stock and hours can change."),
    [ecL("/compras/", "Compras en Río", "Compras no Rio", "Shopping in Rio")], "location"),
  ecEveryday("daily_drinks", "nightlife",
    ["quiero tomar algo", "donde tomar algo", "quiero ir a un bar", "tomar una caipirinha", "busco un bar", "quero tomar alguma coisa", "quero tomar um drink", "quero um bar", "onde tomar caipirinha", "i want to grab a drink", "where can i get a drink", "find a bar", "cocktail bar near me"],
    ecT("¿Buscas una caipirinha frente al mar, un bar tranquilo, música en vivo o una cafetería? Dime también tu barrio para orientarte mejor.",
    "Você prefere caipirinha à beira-mar, bar tranquilo, música ao vivo ou cafeteria? Me diga também seu bairro para eu orientar melhor.",
    "Would you prefer a beachfront drink, a quiet bar, live music or a café? Tell me your neighborhood so I can narrow it down."),
    [ecL("/vida-nocturna/", "Vida nocturna", "Vida noturna", "Nightlife")], "location"),
  ecEveryday("daily_rain", "family",
    ["esta lloviendo que hacemos", "llueve que hacer", "planes con lluvia", "esta lloviendo", "que hacemos si llueve", "esta chovendo o que fazer", "chovendo no rio", "o que fazer na chuva", "rainy day activities", "it is raining", "what to do when it rains", "indoor activities in rio"],
    ecT("Si llueve, podemos cambiar la playa por un plan bajo techo. ¿En qué barrio estás y viajas con niños? Tenemos museos, AquaRio y otras opciones en la guía; confirma horarios antes de salir.",
    "Se chover, podemos trocar a praia por um programa coberto. Em qual bairro você está e vem com crianças? Temos museus, AquaRio e outras opções no guia; confirme horários antes de sair.",
    "On a rainy day we can switch to an indoor plan. Which neighborhood are you in, and are you traveling with children? Our guide covers museums, AquaRio and other ideas; verify opening hours first."),
    [ecL("/familia/", "Planes familiares", "Passeios em família", "Family activities"),ecL("/museos/", "Museos", "Museus", "Museums")], "location"),
  ecEveryday("daily_airport", "transport",
    ["acabo de llegar al aeropuerto", "llegue al aeropuerto", "llegue al galeao", "llegue a santos dumont", "del aeropuerto a copacabana", "como voy del aeropuerto", "cheguei ao aeroporto", "cheguei no galeao", "cheguei no santos dumont", "aeroporto ate copacabana", "just landed at the airport", "just arrived at gig", "just arrived at sdu", "airport to copacabana", "how to get from airport"],
    ecT("¡Bienvenido a Río! ¿Llegaste a Galeão (GIG) o Santos Dumont (SDU), y a qué barrio vas? Con equipaje y horario puedo comparar las opciones sin inventar precios.",
    "Bem-vindo ao Rio! Você chegou ao Galeão (GIG) ou Santos Dumont (SDU), e para qual bairro vai? Com horário e malas posso comparar opções sem inventar preços.",
    "Welcome to Rio! Did you arrive at Galeão (GIG) or Santos Dumont (SDU), and which neighborhood are you heading to? Luggage and arrival time help compare options without guessing prices."),
    [ecL("/transportes/", "Guía de transportes", "Guia de transportes", "Transport guide")], "airport"),
  ecEveryday("daily_return", "transport",
    ["quiero volver al hotel", "como vuelvo al hotel", "volver al departamento", "estoy perdido", "no encuentro mi hotel", "como regresar a mi alojamiento", "quero voltar pro hotel", "como voltar para o hotel", "estou perdido", "voltar ao apartamento", "how do i get back to my hotel", "i am lost", "get back to my apartment"],
    ecT("Te ayudo. ¿Dónde estás ahora y a qué hotel, calle o barrio necesitas volver? No tengo acceso automático a tu ubicación.",
    "Eu te ajudo. Onde você está agora e para qual hotel, rua ou bairro precisa voltar? Não tenho acesso automático à sua localização.",
    "I can help. Where are you now, and what hotel, street or neighborhood do you need to get back to? I don't have automatic access to your location."),
    [ecL("/transportes/", "Opciones de transporte", "Opções de transporte", "Transport options")], "route"),
  ecEveryday("daily_route", "transport",
    ["como llego caminando", "como llego en metro", "cuanto tardo en llegar", "se puede ir a pie", "como llegar al hotel", "como chegar a pe", "como chegar de metro", "quanto tempo demora", "da para ir a pe", "how do i walk there", "how long does it take", "can i get there by metro", "directions to hotel"],
    ecT("¿Desde dónde sales y a dónde quieres llegar? Si me das una calle o punto de referencia, puedo orientarte y mostrar la guía de transporte; no puedo calcular tiempos de tráfico en vivo.",
    "De onde você sai e para onde quer ir? Com uma rua ou referência posso orientar e mostrar o guia de transporte; não consigo calcular o trânsito em tempo real.",
    "Where are you starting and where are you going? A street or landmark helps me guide you; I can't calculate live travel times."),
    [ecL("/transportes/", "Transportes", "Transportes", "Transport")], "route"),
  ecEveryday("daily_stay", "lodging",
    ["llegare tarde al departamento", "check in temprano", "puedo dejar mis maletas", "guardar equipaje", "late check out", "vou chegar tarde no apartamento", "check in antecipado", "guardar malas", "posso deixar malas", "early check in", "late check in", "luggage storage", "where to leave luggage"],
    ecT("¿Te refieres al check-in, check-out o a guardar maletas? Dime tu alojamiento y horario. La disponibilidad se confirma con el anfitrión o proveedor.",
    "É sobre check-in, check-out ou guardar malas? Diga a hospedagem e o horário. A disponibilidade precisa ser confirmada com o anfitrião ou prestador.",
    "Is this about check-in, check-out, or luggage storage? Tell me your accommodation and timing. Availability must be confirmed with your host or provider."),
    [ecL("/hospedaje/", "Hospedaje", "Hospedagem", "Accommodation")], null),
  ecEveryday("daily_emergency", "general",
    ["necesito ambulancia", "llamar policia", "necesito bomberos", "me robaron", "socorro emergencia", "preciso de ambulancia", "chamar policia", "preciso dos bombeiros", "me assaltaram", "call an ambulance", "call the police", "need firefighters", "i was robbed"],
    ecT("Si hay peligro inmediato en Brasil, llama al 190 (Policía), 192 (SAMU/ambulancia) o 193 (Bomberos), según la situación. Ponte en un lugar seguro y solicita ayuda local.",
    "Se houver perigo imediato no Brasil, ligue 190 (Polícia), 192 (SAMU/ambulância) ou 193 (Bombeiros), conforme a situação. Vá para um lugar seguro e peça ajuda.",
    "For immediate danger in Brazil, call 190 (Police), 192 (SAMU/ambulance) or 193 (Fire Department), as appropriate. Get to a safe place and seek local help."),
    [ecL("/guia/emergencias/", "Guía de emergencias", "Guia de emergências", "Emergency guide")], null, 75),
  ecEveryday("daily_swim", "beaches",
    ["se puede banar hoy", "el agua esta apta", "mar seguro para nadar", "hay resaca", "bandera roja", "praia propria para banho", "mar seguro hoje", "tem ressaca", "bandeira vermelha", "is it safe to swim today", "water safe for swimming", "red beach flag", "heavy surf warning"],
    ecT("Para bañarte hay que revisar dos cosas distintas: calidad del agua (boletín INEA) y seguridad del mar (oleaje, banderas y guardavidas). No puedo confirmar el estado en vivo. Con bandera roja o aviso de resaca, no entres al agua.",
    "Antes do banho, confira duas coisas diferentes: balneabilidade (boletim do INEA) e segurança do mar (ondas, bandeiras e guarda-vidas). Não consigo confirmar condições ao vivo. Com bandeira vermelha ou ressaca, não entre na água.",
    "Swimming requires two separate checks: water quality (INEA bulletin) and sea safety (surf, flags and lifeguards). I can't confirm live conditions. Don't enter the water under a red flag or heavy-surf warning."),
    [ecL("/playas/", "Guía de playas", "Guia de praias", "Beach guide")], null, 45),
  ecEveryday("daily_access", "family",
    ["playa en silla de ruedas", "necesito silla anfibia", "viajo con bebe", "playa para mayores", "praia cadeira de rodas", "cadeira anfibia", "viajo com bebe", "wheelchair accessible beach", "amphibious chair beach", "beach with a baby"],
    ecT("¿Qué playa y qué día tienes pensado visitar? La accesibilidad y los servicios como sillas anfibias deben confirmarse para cada playa y fecha.",
    "Qual praia e dia você pretende visitar? A acessibilidade e serviços como cadeiras anfíbias precisam ser confirmados por praia e data.",
    "Which beach and day are you planning to visit? Accessibility and services such as amphibious chairs must be confirmed for each beach and date."),
    [ecL("/playas/", "Ver playas", "Ver praias", "Explore beaches")], null)
];

export const ALL_INTENTS = [...LEGACY_INTENTS, ...CURATED_INTENTS, ...EVERYDAY_INTENTS];
export const ACTIVE_INTENTS = ALL_INTENTS.filter(intent => intent.status !== "pending");
const MIN_SCORE = 7.5;
const MENU_PHRASES = ["volver al menu", "volver al inicio", "cambiar de tema", "reiniciar conversacion", "empezar de nuevo", "start over", "back to menu", "change topic", "voltar ao menu", "mudar de assunto", "comecar de novo"];

export function normalizeQuestion(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function phraseMatches(query, phrase) {
  return Boolean(phrase) && (` ${query} `).includes(` ${phrase} `);
}

function isMenuRequest(query) {
  return MENU_PHRASES.some(phrase => phraseMatches(query, normalizeQuestion(phrase)));
}

function scoreIntent(query, intent) {
  let score = 0;
  let matchedPhrase = "";
  let matchedWords = 0;
  for (const rawPhrase of intent.keywords || []) {
    const phrase = normalizeQuestion(rawPhrase);
    // A generic request for a beach should clarify only when the visitor has not
    // already named a preference such as surfing, family, or nature.
    if (["beach_clarify", "beaches"].includes(intent.id) && ["playa", "playas", "praia", "praias", "beach", "beaches"].includes(phrase) && query !== phrase) continue;
    if (intent.id === "experiences" && ["tour", "tours", "cristo"].includes(phrase) && query !== phrase) continue;
    if (intent.id === "neighborhoods" && phrase === "centro" && query !== phrase) continue;
    if (intent.id === "today" && ["hoy", "today", "hoje"].includes(phrase) && query !== phrase) continue;
    if (intent.id === "booking" && ["precio", "precios", "price", "valor", "valores", "disponibilidad", "availability"].includes(phrase)
        && !/\b(cristo|corcovado|angra|arraial|buzios|entrada|ingreso|experiencia|experience|passeio|reserva|booking)\b/.test(query)) continue;
    if (!phraseMatches(query, phrase)) continue;
    const words = phrase.split(" ").length;
    const phraseScore = (words * 7) + Math.min(phrase.length, 48) * 0.12;
    if (phraseScore > score) {
      score = phraseScore;
      matchedPhrase = phrase;
      matchedWords = words;
    }
  }
  if (!score) return null;
  score += Number(intent.priority || 0);

  // A clear contact or booking action should outrank a topic mentioned in the same sentence.
  if (intent.id === "contact" && /\b(whatsapp|contacto|contactar|hablar|falar|contato)\b/.test(query)) score += 42;
  if (intent.id === "booking" && /\b(reservar|reserva|booking|book)\b/.test(query)
      && !/\b(cristo|corcovado|angra|arraial|buzios|experiencia|experience|tour|passeio)\b/.test(query)) score += 38;
  if (intent.category === "comparisons" && /\b(o|versus|vs|or|ou|comparar|compare)\b/.test(query)) score += 12;
  return { intent, score, matchedPhrase, matchedWords };
}

function getContextualMatch(query, context) {
  if (context?.pending !== "beach_style") return null;
  const selected = FOLLOWUP_MAPS.beach_style.find(option =>
    option.keywords.some(keyword => phraseMatches(query, normalizeQuestion(keyword)))
  );
  if (!selected) {
    if (query.split(" ").length <= 3) return { clarification: INTENT_GUIDANCE.clarifyBeach, suggestions: ["Tranquila", "Con surf", "Natural", "Para ir con niños", "Atardecer"] };
    return null;
  }
  return { intent: ACTIVE_INTENTS.find(intent => intent.id === selected.intent), contextUpdate: { pending: null, category: "beaches" } };
}


function resolveEverydayFollowup(query, context) {
  if (!context?.pending || !context?.lastEverydayId) return null;
  const zone = query.match(/^(?:(?:estoy|estamos|me encuentro|estou|ficamos|i am|im|we are|near|perto de|cerca de|en|em|in|at)\s+){0,2}(copacabana|ipanema|leblon|leme|botafogo|flamengo|urca|centro|lapa|barra(?: da tijuca)?|recreio|santa teresa|tijuca|gloria|catete|humaita|gavea|jardim botanico|arpoador|posto\s*[1-6])$/);
  const airport = query.match(/^(?:gig|galeao|sdu|santos dumont)$/);
  const budget = /^(?:barato|economico|econ[oô]mico|low cost|cheap|budget|mais barato|o mais barato|lo mas barato|the cheapest)$/.test(query);
  const comfort = /^(?:comodo|comodidad|comfort|comfortable|conforto|sem caminhar|sin caminar mucho)$/.test(query);
  if (!zone && !(airport && context.pending === "airport") && !budget && !comfort) return null;
  const topic = EVERYDAY_INTENTS.find(x => x.id === context.lastEverydayId);
  if (!topic) return null;
  const label = zone?.[1] || (airport ? airport[0].toUpperCase() : "");
  const where = zone ? ecT(
    "Perfecto, tomo " + label + " como referencia. No tengo acceso a tu GPS ni a horarios en vivo; revisa las opciones de la guía y verifica dirección y apertura antes de salir.",
    "Perfeito, vou considerar " + label + " como referência. Não tenho acesso ao GPS nem a horários ao vivo; confira endereço e funcionamento antes de sair.",
    "Got it, I'll use " + label + " as your reference. I don't have GPS or live hours; check the address and opening times before heading out."
  ) : airport ? ecT(
    "Perfecto, llegaste a " + label + ". ¿A qué barrio vas y llevas muchas maletas?",
    "Perfeito, você chegou ao " + label + ". Para qual bairro vai e está com muitas malas?",
    "Got it, you arrived at " + label + ". Which neighborhood are you heading to, and do you have a lot of luggage?"
  ) : ecT(
    "Perfecto, priorizamos " + (budget ? "opciones económicas" : "comodidad") + ". ¿En qué barrio estás o desde dónde sales? Los precios y la disponibilidad necesitan confirmación.",
    "Perfeito, vamos priorizar " + (budget ? "opções econômicas" : "conforto") + ". Em qual bairro está ou de onde sai? Preços e disponibilidade precisam de confirmação.",
    "Got it, let's prioritize " + (budget ? "budget-friendly options" : "comfort") + ". Which neighborhood or starting point? Prices and availability must be confirmed."
  );
  return { intent: { ...topic, id: topic.id + "_followup", answer: where }, candidates: [topic],
    contextUpdate: { pending: zone ? null : context.pending, category: topic.category, lastEverydayId: zone ? null : topic.id } };
}

function ambiguousEntity(query) {
  if (query === "cristo" || query === "cristo redentor" || query === "christ" || query === "christ the redeemer") {
    return {
      clarification: INTENT_GUIDANCE.clarifyChrist,
      suggestions: ["Cómo llegar al Cristo", "Historia del Cristo", "Cristo con niños", "Reservar un tour al Cristo"]
    };
  }
  return null;
}

export function resolveQuestion(question, context = {}) {
  const query = normalizeQuestion(question);
  if (!query) return { intent: null, candidates: [], clarification: null, suggestions: [] };

  if (isMenuRequest(query)) return { intent: ACTIVE_INTENTS.find(intent => intent.id === "menu"), candidates: [], contextUpdate: { pending: null, category: null, booking: null } };

  const contextual = getContextualMatch(query, context);
  if (contextual?.intent) return { ...contextual, candidates: [] };

  const everydayFollowup = resolveEverydayFollowup(query, context);
  if (everydayFollowup) return everydayFollowup;

  const bareEntity = ambiguousEntity(query);
  if (bareEntity) return { ...bareEntity, intent: null, candidates: [] };

  const ranked = ACTIVE_INTENTS
    .map(intent => scoreIntent(query, intent))
    .filter(result => result && result.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    if (contextual?.clarification) return { ...contextual, intent: null, candidates: [] };
    return { intent: null, candidates: [], clarification: null, suggestions: [] };
  }

  const top = ranked[0];
  const second = ranked[1];
  const hasTopicJoiner = /\b(and|y|e|ou|or|versus|vs|comparar|compare)\b/.test(query);
  if (second && hasTopicJoiner && top.intent.category !== second.intent.category && Math.abs(top.score - second.score) < 5) {
    const candidates = ranked.slice(0, 3).map(result => result.intent);
    return {
      intent: null,
      candidates,
      clarification: INTENT_GUIDANCE.ambiguous,
      suggestions: candidates.flatMap(item => item.links || []).slice(0, 4).map(link => link.label)
    };
  }

  return { intent: top.intent, candidates: ranked.slice(0, 3).map(result => result.intent), score: top.score, matchedPhrase: top.matchedPhrase,
    contextUpdate: top.intent.pending ? { pending: top.intent.pending, category: top.intent.category, lastEverydayId: top.intent.id } : { lastEverydayId: null } };
}

export function findIntent(question, context = {}) {
  return resolveQuestion(question, context).intent || null;
}

export function getLocalized(value, language) {
  if (typeof value === "string") return value;
  return value?.[language] || value?.ES || "";
}

export function getIntentCount() { return ACTIVE_INTENTS.length; }

export function getQuestionVariantCount() {
  return ACTIVE_INTENTS.reduce((total, intent) => total + (intent.keywords || []).length, 0);
}

export function validateIntentLibrary() {
  const ids = new Set();
  const errors = [];
  for (const intent of ALL_INTENTS) {
    if (!intent.id || ids.has(intent.id)) errors.push(`ID ausente o duplicado: ${intent.id || "(vacío)"}`);
    ids.add(intent.id);
    if (!intent.category) errors.push(`Falta categoría: ${intent.id}`);
    if (!intent.keywords?.length) errors.push(`Faltan variantes de pregunta: ${intent.id}`);
    if (intent.status !== "pending" && !intent.answer) errors.push(`Falta respuesta: ${intent.id}`);
    if (intent.status !== "pending") for (const language of ["ES", "PT", "EN"]) {
      if (!getLocalized(intent.answer, language)) errors.push(`Falta respuesta ${language}: ${intent.id}`);
    }
    for (const item of intent.links || []) {
      if (!item.href?.startsWith("/")) errors.push(`Enlace no interno o incompleto: ${intent.id}`);
      for (const language of ["ES", "PT", "EN"]) {
        if (!getLocalized(item.label, language)) errors.push(`Falta etiqueta ${language}: ${intent.id} → ${item.href}`);
      }
    }
    if (intent.status && !["approved", "legacy", "pending"].includes(intent.status)) errors.push(`Estado editorial inválido: ${intent.id}`);
    if (intent.status === "approved" && !/^\d{4}-\d{2}-\d{2}$/.test(intent.reviewedOn || "")) errors.push(`Falta fecha de revisión ISO: ${intent.id}`);
    if (intent.status === "pending" && !intent.source?.length) errors.push(`Intención pendiente sin fuente de revisión: ${intent.id}`);
    for (const source of intent.source || []) {
      if (!source.startsWith("/")) errors.push(`Fuente interna incompleta: ${intent.id} → ${source}`);
    }
  }
  return errors;
}
