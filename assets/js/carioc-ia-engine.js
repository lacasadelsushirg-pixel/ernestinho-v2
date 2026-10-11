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
    ["quiero salir a comer", "quiero salir a cenar", "quiero ir a comer", "quiero comer algo", "tengo hambre", "donde puedo cenar", "quiero cenar", "salir a cenar", "comer barato", "algo para comer", "quero sair para comer", "estou com fome", "to com fome", "quero jantar", "onde posso jantar", "comer barato no rio", "i want to eat out", "i am hungry", "im hungry", "i m hungry", "where can i have dinner", "where to have dinner", "cheap eats"],
    ecT("¡Vamos a comer rico! ¿En qué barrio estás y qué te apetece: comida brasileña, carnes, mariscos, algo económico o una cafetería? Mientras tanto, puedes mirar nuestra guía gastronómica.",
    "Vamos comer bem! Em qual bairro você está e o que prefere: comida brasileira, carnes, frutos do mar, algo econômico ou uma cafeteria? Enquanto isso, confira o guia de gastronomia.",
    "Let's find something tasty! Which neighborhood are you in, and what sounds good: Brazilian food, grilled meat, seafood, budget-friendly food, or a café? You can also browse our food guide."),
    [ecL("/gastronomia/", "Explorar restaurantes", "Explorar restaurantes", "Explore restaurants")], "location"),
  ecEveryday("daily_supermarket", "shopping",
    ["quiero un supermercado cerca", "un supermercado cerca", "supermercado cerca de mi", "supermercado cercano", "quiero ir al supermercado", "donde hay un supermercado", "donde esta el supermercado", "donde compro agua", "comprar agua cerca", "necesito un supermercado", "mercado cerca de mi", "supermercado perto de mim", "supermercado aqui perto", "preciso de supermercado", "onde comprar agua", "onde tem supermercado", "mercado perto", "supermarket near me", "where is the nearest supermarket", "grocery store near me", "where can i buy water", "need a supermarket"],
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
    [ecL("/playas/", "Ver playas", "Ver praias", "Explore beaches")], null),
  ecEveryday("daily_food_family", "gastronomy", ["restaurante con ninos","donde comer con ninos","restaurante familiar","restaurante com criancas","family friendly restaurant"], ecT("¿En qué barrio están y qué edades tienen los niños? Te ayudo a revisar restaurantes y servicios familiares.", "Em qual bairro vocês estão e qual a idade das crianças? Vamos buscar restaurantes com serviços para famílias.", "What neighborhood are you in, and how old are the children? Let's look for suitable restaurants."), [ecL("/gastronomia/", "gastronomy", "gastronomy", "gastronomy")], "location", 38),
  ecEveryday("daily_food_restrictions", "gastronomy", ["soy vegetariano","comida vegana cerca","sin gluten","alergia alimentaria","sou vegetariano","sem gluten","alergia alimentar","vegan restaurant nearby","food allergies","gluten free food"], ecT("¿En qué barrio estás y qué restricción necesitas? Si hay alergia, confirma ingredientes y contaminación cruzada directamente con el restaurante.", "Qual bairro e qual restrição alimentar? Se houver alergia, confirme ingredientes e contaminação cruzada com o restaurante.", "Which neighborhood and dietary restriction? For allergies, confirm ingredients and cross-contact with the restaurant."), [ecL("/gastronomia/", "gastronomy", "gastronomy", "gastronomy")], "location", 38),
  ecEveryday("daily_food_open", "gastronomy", ["restaurante abierto ahora","donde cenar ahora","comer a esta hora","restaurante aberto agora","onde jantar agora","restaurant open now","where can i eat right now"], ecT("¿En qué barrio estás? Te ayudo a elegir, pero los horarios de apertura deben comprobarse con el local.", "Em qual bairro está? Ajudo a escolher, mas é importante confirmar o funcionamento com o local.", "Which neighborhood are you in? I can help you choose, but please verify opening hours with the venue."), [ecL("/gastronomia/", "gastronomy", "gastronomy", "gastronomy")], "location", 38),
  ecEveryday("daily_food_delivery", "gastronomy", ["delivery de comida","pedir comida al departamento","quero pedir delivery","entrega de comida","food delivery","order food to apartment"], ecT("¿En qué barrio estás? Verifica cobertura y cargos del servicio de entrega; mientras tanto, nuestra guía te ayuda a elegir qué comer.", "Em qual bairro está? Confira a cobertura e as taxas do delivery; nosso guia ajuda a escolher.", "Which neighborhood are you in? Check delivery coverage and fees; our guide can help choose the food."), [ecL("/gastronomia/", "gastronomy", "gastronomy", "gastronomy")], "location", 38),
  ecEveryday("daily_coffee", "gastronomy", ["quiero desayunar","buscar cafeteria","quiero un helado","tomar cafe da manha","cafeteria perto","sorvete perto","where to get breakfast","coffee shop nearby","ice cream near me"], ecT("¿En qué barrio estás? ¿Prefieres una padaria, cafetería tranquila, desayuno completo o algo dulce?", "Em qual bairro está? Prefere padaria, cafeteria, café da manhã completo ou sobremesa?", "Which neighborhood are you in? Would you like a bakery, a quiet café, breakfast or dessert?"), [ecL("/gastronomia/", "gastronomy", "gastronomy", "gastronomy")], "location", 38),
  ecEveryday("daily_live_music", "nightlife", ["quiero musica en vivo","quiero escuchar pagode","quiero carretear","salir a bailar","quero musica ao vivo","onde tem samba hoje","sair pra dancar","live music tonight","samba tonight","where can we dance"], ecT("¿Qué música te gusta y en qué barrio quieres salir? Confirma programación y horario de cada local.", "Que música você gosta e em qual bairro quer sair? Confirme a programação e horário do local.", "What kind of music do you like, and in which neighborhood? Verify venue schedules."), [ecL("/vida-nocturna/", "nightlife", "nightlife", "nightlife")], "location", 38),
  ecEveryday("daily_night_quiet", "nightlife", ["un bar tranquilo","salir sin tanta fiesta","lugar romantico de noche","bar tranquilo perto","lugar romantico a noite","quiet bar near me","romantic evening in rio"], ecT("¿Prefieres un bar tranquilo, un restaurante con vista o un paseo? Dime barrio y presupuesto.", "Prefere um bar tranquilo, restaurante com vista ou passeio? Diga bairro e orçamento.", "Would you prefer a quiet bar, a restaurant with a view, or an outing? Tell me your area and budget."), [ecL("/vida-nocturna/", "nightlife", "nightlife", "nightlife")], "location", 38),
  ecEveryday("daily_atm", "shopping", ["cajero automatico cerca","donde sacar dinero","donde cambio dolares","caixa eletronico perto","onde sacar dinheiro","casa de cambio perto","atm near me","withdraw cash nearby","currency exchange near me"], ecT("¿En qué barrio estás? Comprueba ubicación, horario y comisiones del cajero o casa de cambio antes de ir.", "Em qual bairro está? Confira endereço, horários e taxas do caixa ou casa de câmbio.", "Which neighborhood are you in? Verify ATM or exchange locations, hours and fees."), [ecL("/compras/", "shopping", "shopping", "shopping")], "location", 38),
  ecEveryday("daily_souvenirs", "shopping", ["donde comprar recuerdos","quiero souvenirs","feria artesanal cerca","onde comprar lembrancinhas","feira de artesanato perto","souvenir shopping","craft market near me"], ecT("¿Qué recuerdos buscas y por qué barrio estás? Te oriento por mercados, ferias y tiendas; los horarios pueden variar.", "Que lembrancinhas procura e em qual bairro? Posso indicar feiras, mercados e lojas; horários podem mudar.", "What souvenirs are you looking for, and where are you? I can guide you toward markets and stores; hours may vary."), [ecL("/compras/", "shopping", "shopping", "shopping")], "location", 38),
  ecEveryday("daily_metro", "transport", ["como uso el metro","estacion de metro cerca","metro al maracana","mapa del metro","como usar o metro","estacao de metro perto","metro para maracana","how to use the metro","nearest metro station","rio metro map"], ecT("¿Desde dónde sales y a dónde vas? Utiliza también el mapa oficial de MetrôRio para comprobar conexiones y accesibilidad.", "De onde sai e para onde vai? Consulte também o mapa oficial do MetrôRio para conexões e acessibilidade.", "Where are you traveling from and to? Check the official MetrôRio map for connections and accessibility."), [ecL("/transportes/", "transport", "transport", "transport")], "route", 38),
  ecEveryday("daily_brt_vlt", "transport", ["que es el brt","como usar vlt","tranvia del centro","terminal gentileza","como usar el jae","como funciona o brt","cartao jae","what is brt","rio tram","jae card"], ecT("En Río funcionan metro, BRT y VLT. ¿Cuál es tu origen y destino? Confirma líneas y tarifas con los operadores.", "No Rio existem metrô, BRT e VLT. Qual origem e destino? Confirme linhas e tarifas com os operadores.", "Rio has metro, BRT and VLT. What's your origin and destination? Check current routes and fares with operators."), [ecL("/transportes/", "transport", "transport", "transport")], "route", 38),
  ecEveryday("daily_transfer", "transport", ["necesito transfer privado","quiero un transfer privado","quiero transfer privado","traslado para seis personas","chofer aeropuerto","preciso de transfer privado","motorista para aeroporto","private airport transfer","airport transfer for six"], ecT("¿Necesitas traslado desde GIG o SDU? Dime fecha, destino, pasajeros y maletas para preparar una consulta; precio y disponibilidad se confirman.", "Precisa de transfer de GIG ou SDU? Diga data, destino, passageiros e malas para solicitar orçamento; disponibilidade sujeita a confirmação.", "Is the transfer from GIG or SDU? Please share date, destination, travelers and luggage; quote and availability require confirmation."), [ecL("/transportes/", "transport", "transport", "transport")], "airport", 38),
  ecEveryday("daily_private_tour", "experiences", ["quiero un tour privado","quiero tour privado","queremos un tour privado","somos seis para un tour","tour exclusivo","queremos contratar una van","quero um passeio privado","quero tour privado","queremos passeio privado","passeio em familia","i want a private tour","private tour","private city tour","private tour for our group"], ecT("¿Qué fecha, cuántos viajeros y qué atracciones desean? Te ayudo a preparar la consulta de un tour privado; confirmaré que la disponibilidad no es automática.", "Qual data, quantas pessoas e quais atrações? Ajudo a preparar a solicitação de tour privado, sujeito a confirmação.", "What date, group size and attractions? I can help prepare a private-tour inquiry, subject to confirmation."), [ecL("/experiencias/", "experiences", "experiences", "experiences")], "booking", 38),
  ecEveryday("daily_adventure", "experiences", ["quiero hacer parapente","vuelo en helicoptero","quiero hacer rapel","quiero trekking","quero voar de parapente","voo de helicoptero","fazer rapel","fazer trilha","paragliding in rio","helicopter tour","rappelling in rio","hiking trip"], ecT("¿Qué actividad te interesa, para qué día y cuántas personas son? Confirma operador, condiciones y precio antes de reservar.", "Qual atividade interessa, para qual data e quantas pessoas? Confirme operador, condições e preço antes de reservar.", "Which activity, date and group size? Please verify provider, conditions and price before booking."), [ecL("/experiencias/", "experiences", "experiences", "experiences")], "booking", 38),
  ecEveryday("daily_change_booking", "commercial", ["necesito cambiar mi reserva","quiero cambiar mi reserva","quiero cancelar mi paseo","ya pague la sena","no encuentro mi voucher","preciso alterar minha reserva","cancelar passeio","ja paguei o sinal","change my reservation","cancel my tour","missing voucher"], ecT("Para cambios, cancelaciones o comprobantes, contacta directamente a Ernestinho con el nombre y fecha de reserva. Este chat no puede modificarla.", "Para alterações, cancelamentos ou comprovantes, contate Ernestinho com nome e data da reserva. Este chat não altera reservas.", "For changes, cancellations or vouchers, contact Ernestinho with your booking name and date. This chat cannot modify reservations."), [ecL("/experiencias/", "commercial", "commercial", "commercial")], null, 38),
  ecEveryday("daily_price_quote", "commercial", ["cuanto cuesta un tour privado","precio para diez personas","costo del tour","quanto custa um passeio privado","preco para dez pessoas","how much is a private tour","price for ten people"], ecT("Los valores dependen de fecha, paseo, grupo e inclusiones. ¿Qué tour y para cuántas personas? La cotización final se confirma con Ernestinho.", "Os valores variam por data, passeio, grupo e itens incluídos. Qual tour e para quantas pessoas? Confirme o orçamento com Ernestinho.", "Prices depend on date, tour, group size and inclusions. Which tour and how many people? Ernestinho will confirm the quote."), [ecL("/experiencias/", "commercial", "commercial", "commercial")], "booking", 38),
  ecEveryday("daily_lost_documents", "general", ["perdi mi celular","perdi mis documentos","me robaron el pasaporte","perdi meu celular","perdi meus documentos","i lost my phone","lost my passport"], ecT("¿Qué perdiste y en qué zona? Prioriza tu seguridad. Para documentos, puede ser necesario denunciar y contactar el consulado; no compartas datos sensibles aquí.", "O que perdeu e em qual região? Priorize sua segurança. Para documentos, pode ser necessário registrar ocorrência e falar com o consulado; não envie dados sensíveis.", "What did you lose and where? Prioritize safety. For documents, you may need a police report and consulate; don't share sensitive details."), [ecL("/guia/", "general", "general", "general")], null, 38)
];

export const ALL_INTENTS = [...LEGACY_INTENTS, ...CURATED_INTENTS, ...EVERYDAY_INTENTS];
export const ACTIVE_INTENTS = ALL_INTENTS.filter(intent => intent.status !== "pending");
const MIN_SCORE = 7.5;
// The welcome chips must always resolve to a useful, authored intent in all three languages.
const WELCOME_CHIP_IDS = {
  "que hacer en rio en 3 dias": "first_visit",
  "o que fazer no rio em 3 dias": "first_visit",
  "what should i do in rio in 3 days": "first_visit",
  "que playas me recomiendas": "beach_clarify",
  "quais praias voce recomenda": "beach_clarify",
  "which beaches do you recommend": "beach_clarify",
  "como me muevo por rio": "transport",
  "como me locomover pelo rio": "transport",
  "how do i get around rio": "transport",
  "viajo con ninos": "family",
  "viajo com criancas": "experience_family",
  "i m traveling with kids": "experience_family",
  "que experiencia me recomiendas": "experiences",
  "qual experiencia voce recomenda": "experiences",
  "which experience do you recommend": "experiences",
  "quiero reservar": "booking",
  "quero reservar": "booking",
  "i want to book": "booking"
};
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


const EC_NEIGHBORHOODS = {
  copacabana: "Copacabana", ipanema: "Ipanema", leblon: "Leblon", leme: "Leme", botafogo: "Botafogo",
  flamengo: "Flamengo", urca: "Urca", centro: "Centro", lapa: "Lapa", "barra da tijuca": "Barra da Tijuca",
  barra: "Barra da Tijuca", recreio: "Recreio", "santa teresa": "Santa Teresa", tijuca: "Tijuca",
  gloria: "Glória", catete: "Catete", humaita: "Humaitá", gavea: "Gávea",
  "jardim botanico": "Jardim Botânico", arpoador: "Arpoador"
};
const EC_ZONE_PAGE = {
  copacabana: "/barrios/copacabana/", ipanema: "/barrios/ipanema/", leblon: "/barrios/leblon/",
  leme: "/barrios/leme/", botafogo: "/barrios/botafogo/", flamengo: "/barrios/flamengo/",
  urca: "/barrios/urca/", centro: "/barrios/centro/", lapa: "/barrios/lapa/",
  "barra da tijuca": "/barrios/barra-da-tijuca/", "santa teresa": "/barrios/santa-teresa/"
};
const EC_AREA = /(copacabana|ipanema|leblon|leme|botafogo|flamengo|urca|centro|lapa|barra da tijuca|barra|recreio|santa teresa|tijuca|gloria|catete|humaita|gavea|jardim botanico|arpoador)/;
function getEverydayLocation(query) {
  const trimmed = query.replace(/^(?:(?:estoy|estamos|me encuentro|estou|ficamos|i am|im|we are|near|perto de|cerca de|en|em|in|at)\s+){0,2}/, "");
  const match = trimmed.match(new RegExp("^" + EC_AREA.source + "$"));
  return match?.[1] || null;
}
function everydayContextAnswer(topic, context, location, extra = "") {
  const name = EC_NEIGHBORHOODS[location] || location;
  const isFood = topic.category === "gastronomy";
  const isShopping = topic.category === "shopping";
  const isNight = topic.category === "nightlife";
  const isTransportation = topic.category === "transport";
  const isExperience = topic.category === "experiences";
  const type = isFood ? ecT("restaurantes", "restaurantes", "restaurants")
    : isShopping ? ecT("compras y servicios", "compras e serviços", "shops and services")
    : isNight ? ecT("vida nocturna", "vida noturna", "nightlife")
    : isTransportation ? ecT("transporte", "transporte", "transport")
    : isExperience ? ecT("experiencias", "experiências", "experiences")
    : ecT("actividades", "atividades", "activities");
  const priority = context?.preference || extra;
  const detail = priority === "budget"
    ? ecT(" Tendremos en cuenta el presupuesto, sin asegurar tarifas no verificadas.", " Vamos considerar o orçamento, sem garantir preços não verificados.", " We'll keep budget in mind without guessing current prices.")
    : priority === "comfort"
      ? ecT(" Priorizaremos comodidad y menos traslados.", " Vamos priorizar conforto e menos deslocamentos.", " We'll prioritize comfort and fewer transfers.")
      : ecT("", "", "");
  const answer = ecT(
    "¡Perfecto! Para " + name + " podemos empezar por nuestra guía de " + type.ES + "." + detail.ES + " ¿Qué tipo de " + (isFood ? "comida" : isShopping ? "producto o servicio" : isNight ? "ambiente" : "plan") + " buscas? No puedo afirmar qué negocio es el más cercano ni qué está abierto sin consultar datos actuales.",
    "Perfeito! Para " + name + ", podemos começar pelo nosso guia de " + type.PT + "." + detail.PT + " Qual tipo de " + (isFood ? "comida" : isShopping ? "produto ou serviço" : isNight ? "ambiente" : "programa") + " procura? Não posso afirmar qual estabelecimento está mais perto ou aberto sem dados atualizados.",
    "Great! For " + name + ", let's start with our guide to " + type.EN + "." + detail.EN + " What kind of " + (isFood ? "food" : isShopping ? "product or service" : isNight ? "night out" : "activity") + " would you prefer? I can't confirm the nearest business or current opening hours without live information."
  );
  const links = [...topic.links];
  const neighborhoodLink = EC_ZONE_PAGE[location];
  if (neighborhoodLink && !links.some(x => x.href === neighborhoodLink)) {
    links.push(ecL(neighborhoodLink, "Guía de " + name, "Guia de " + name, name + " guide"));
  }
  return { ...topic, id: topic.id + "_followup", answer, links };
}
function resolveEverydayFollowup(query, context) {
  if (!context?.pending || !context?.lastEverydayId) return null;
  const topic = EVERYDAY_INTENTS.find(x => x.id === context.lastEverydayId);
  if (!topic) return null;
  const zone = getEverydayLocation(query);
  const airport = /^(?:gig|galeao|sdu|santos dumont)$/.test(query) && context.pending === "airport";
  const budget = /^(?:barato|economico|low cost|cheap|budget|mais barato|o mais barato|lo mas barato|the cheapest)$/.test(query);
  const comfort = /^(?:comodo|comodidad|comfort|comfortable|conforto|sem caminhar|sin caminar mucho)$/.test(query);
  const openNow = /^(?:abierto ahora|algo abierto ahora|que este abierto|esta abierto|aberto agora|aberto nesse momento|open now|anything open now|still open)$/.test(query);
  const foodPreference = topic.category === "gastronomy" && /^(?:brasilena|comida brasilena|brasileira|brazilian|carnes|carne|seafood|mariscos|frutos do mar|vegetariano|vegetariana|vegetarian|vegano|vegan|pizza|sushi|cafe|cafeteria|padaria)$/.test(query);
  if (!zone && !airport && !budget && !comfort && !openNow && !foodPreference) return null;
  const location = zone || context.location;
  const pref = budget ? "budget" : comfort ? "comfort" : context.preference || null;
  let intent;
  if (zone) {
    intent = everydayContextAnswer(topic, { ...context, preference: pref }, zone);
  } else if (airport) {
    const label = query.toUpperCase();
    intent = { ...topic, id: topic.id + "_followup", answer: ecT(
      "Perfecto, llegaste a " + label + ". ¿A qué barrio vas y llevas muchas maletas?",
      "Perfeito, você chegou ao " + label + ". Para qual bairro vai e está com muitas malas?",
      "Got it, you arrived at " + label + ". Which neighborhood are you heading to, and do you have much luggage?"
    ) };
  } else if (openNow) {
    intent = { ...topic, id: topic.id + "_followup", answer: ecT(
      "Entendido: quieres algo abierto ahora" + (location ? " en " + (EC_NEIGHBORHOODS[location] || location) : "") + ". No tengo horarios en vivo; confirma apertura y ubicación con el establecimiento antes de salir.",
      "Entendi: você procura algo aberto agora" + (location ? " em " + (EC_NEIGHBORHOODS[location] || location) : "") + ". Não tenho horários ao vivo; confirme endereço e funcionamento com o local.",
      "Got it: you need somewhere open now" + (location ? " in " + (EC_NEIGHBORHOODS[location] || location) : "") + ". I don't have live opening hours; verify the address and availability before visiting."
    ) };
  } else if (foodPreference) {
    intent = { ...topic, id: topic.id + "_followup", answer: ecT(
      "¡Excelente! Busquemos " + query + (location ? " en " + EC_NEIGHBORHOODS[location] : "") + ". La guía gastronómica es el punto de partida; confirma menú, dirección y horario con cada local.",
      "Ótimo! Vamos procurar " + query + (location ? " em " + EC_NEIGHBORHOODS[location] : "") + ". Comece pelo guia e confirme cardápio, endereço e horário com o local.",
      "Great! Let's look for " + query + (location ? " in " + EC_NEIGHBORHOODS[location] : "") + ". Start with the food guide and verify menu, address and hours."
    ) };
  } else if (location) {
    intent = everydayContextAnswer(topic, { ...context, preference: pref }, location);
  } else {
    intent = { ...topic, id: topic.id + "_followup", answer: ecT(
      "Perfecto, priorizamos " + (budget ? "opciones económicas" : "comodidad") + ". ¿En qué barrio estás? Los precios y la disponibilidad requieren confirmación.",
      "Perfeito, vamos priorizar " + (budget ? "opções econômicas" : "conforto") + ". Em qual bairro está? Preços e disponibilidade precisam de confirmação.",
      "Got it, let's prioritize " + (budget ? "budget-friendly options" : "comfort") + ". Which neighborhood are you in? Prices and availability need confirmation."
    ) };
  }
  return { intent, candidates: [topic], contextUpdate: {
    pending: context.pending, category: topic.category, lastEverydayId: topic.id,
    ...(zone ? { location: zone } : {}), ...(budget || comfort ? { preference: pref } : {})
  }};
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

  const welcomeIntent = WELCOME_CHIP_IDS[query];
  if (welcomeIntent) {
    return { intent: ACTIVE_INTENTS.find(intent => intent.id === welcomeIntent) || null,
      candidates: [], contextUpdate: { pending: welcomeIntent === "beach_clarify" ? "beach_style" : null,
        category: null, lastEverydayId: null } };
  }

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
