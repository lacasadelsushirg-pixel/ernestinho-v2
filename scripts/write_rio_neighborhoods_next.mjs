// Add practical, locale-ready planning advice to five priority Rio neighborhoods.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const heading = [
  'Planifica el barrio según tu día',
  'Planeje o bairro de acordo com o seu dia',
  'Plan the neighbourhood around your day',
];
const transportLink = [
  'Consulta la guía de transporte →',
  'Consulte o guia de transporte →',
  'See the transport guide →',
];

// Each paragraph is maintained as ES / PT-BR / EN. Keep advice useful without
// presenting schedules, services, sea conditions, or travel times as current.
const entries = {
  'barra-da-tijuca': [
    [
      'En Barra, la primera decisión es el sector: playa, Jardim Oceânico, lagunas o centros comerciales no forman una caminata continua. Elige un punto de partida y agrupa cerca lo que de verdad quieras hacer; cruzar la zona para sumar una parada puede consumir el tiempo que reservabas para descansar. Si mezclas playa y compras, deja una pausa para cambiarte y revisa cómo volver desde el último lugar.',
      'Na Barra, a primeira decisão é o trecho: praia, Jardim Oceânico, lagoas ou shoppings não formam um passeio contínuo a pé. Escolha um ponto de partida e agrupe o que realmente quer fazer; atravessar a região para incluir uma parada pode consumir o tempo reservado para descansar. Se combinar praia e compras, planeje uma pausa para se trocar e confira como voltar do último lugar.',
      'In Barra, choose your sector first: the beach, Jardim Oceânico, lagoons and shopping centres do not form one continuous walk. Pick a starting point and group the stops you really want; crossing the area for one extra stop can take time away from resting. If you combine beach and shopping, leave time to change and check how you will return from your final stop.',
    ],
    [
      'Con calor, evita encadenar trayectos largos a pie en las horas más pesadas. Si llueve, un centro comercial o una actividad bajo techo puede servir de alternativa, pero confirma apertura y entradas antes de salir. Para el regreso, guarda el nombre exacto del acceso o establecimiento: “Barra” es demasiado amplio para coordinar una recogida.',
      'Com calor, evite emendar caminhadas longas nos horários mais quentes. Se chover, um shopping ou uma atividade coberta pode ser uma alternativa, mas confirme funcionamento e ingressos antes de sair. Para a volta, salve o nome exato do acesso ou estabelecimento: “Barra” é amplo demais para combinar um ponto de embarque.',
      'In hot weather, avoid stringing together long walks during the hottest part of the day. If it rains, a shopping centre or indoor activity can be an alternative, but check opening details and tickets before leaving. For your return, save the exact entrance or venue name: “Barra” is too broad for arranging a pickup.',
    ],
  ],
  recreio: [
    [
      'Recreio se disfruta mejor con una prioridad clara: un tramo de playa, Pontal o una salida hacia Prainha y Grumari. No metas todos esos puntos en el mismo plan por verlos cerca en el mapa; el acceso, el tiempo de playa y el regreso cuentan. Decide de antemano si harás una jornada de arena o un recorrido con varias paradas, y deja margen para cambiar el orden si el clima o el mar no acompañan.',
      'O Recreio rende mais com uma prioridade clara: um trecho de praia, o Pontal ou um passeio em direção à Prainha e Grumari. Não coloque todos esses pontos no mesmo roteiro só porque parecem próximos no mapa; acesso, tempo de praia e volta também contam. Decida antes se será um dia de areia ou um percurso com várias paradas e deixe margem para mudar a ordem se o tempo ou o mar não ajudarem.',
      'Recreio works best with one clear priority: a stretch of beach, Pontal, or an outing towards Prainha and Grumari. Do not fit all of them into one plan just because they look close on a map; access, beach time and the return journey all count. Decide whether you want a beach day or several stops, and leave room to change the order if the weather or sea does not cooperate.',
    ],
    [
      'Para un día sencillo, elige primero dónde quieres terminar y organiza la comida y el transporte alrededor de ese punto. Lleva agua y protección solar si vas a pasar tiempo al aire libre, y confirma antes las condiciones de cualquier sendero o playa aislada. Si el plan incluye una subida o caminata, trátala como una actividad propia y no como un añadido improvisado al baño.',
      'Para um dia simples, escolha primeiro onde quer terminar e organize comida e transporte em torno desse ponto. Leve água e proteção solar se for passar bastante tempo ao ar livre e confira antes as condições de qualquer trilha ou praia mais isolada. Se o roteiro incluir subida ou caminhada, trate isso como uma atividade própria, não como um complemento improvisado ao banho de mar.',
      'For a simple day, decide where you want to finish and plan food and transport around that point. Bring water and sun protection if you will be outdoors for a while, and check conditions for any trail or more isolated beach in advance. If the plan includes a climb or hike, treat it as its own activity rather than an improvised add-on to a swim.',
    ],
  ],
  'santa-teresa': [
    [
      'En Santa Teresa, calcula el recorrido por pendientes y tramos, no solo por distancia en el mapa. Escoge dos o tres referencias —por ejemplo, Largo dos Guimarães y Parque das Ruínas— y decide si prefieres subir en transporte y bajar caminando, o al revés. El adoquín y las cuestas cambian el esfuerzo; si alguien del grupo tiene movilidad limitada, comprueba accesos y desniveles antes de cerrar la ruta.',
      'Em Santa Teresa, planeje o percurso pelas ladeiras e pelos trechos, não apenas pela distância no mapa. Escolha duas ou três referências — por exemplo, Largo dos Guimarães e Parque das Ruínas — e decida se prefere subir de transporte e descer a pé, ou o contrário. Paralelepípedos e inclinações mudam o esforço; se alguém do grupo tiver mobilidade reduzida, confira acessos e desníveis antes de definir o caminho.',
      'In Santa Teresa, plan around hills and individual stretches, not just map distance. Choose two or three landmarks—such as Largo dos Guimarães and Parque das Ruínas—and decide whether to ride uphill and walk down, or the other way around. Cobblestones and slopes affect the effort; if anyone in your group has limited mobility, check access and gradients before settling on a route.',
    ],
    [
      'Deja tiempo para parar: aquí el paseo, los talleres y las vistas forman parte del plan. Comprueba el mismo día la operación del Bondinho y de los espacios que quieras visitar; no bases toda la excursión en un único servicio. Si combinas con Lapa, acuerda antes el punto y la forma de continuar, y reserva la caminata nocturna para calles con movimiento y un trayecto pensado.',
      'Reserve tempo para parar: o passeio, os ateliês e as vistas fazem parte do programa. Confira no próprio dia o funcionamento do Bondinho e dos espaços que pretende visitar; não baseie o passeio inteiro num único serviço. Se combinar com a Lapa, defina antes o ponto e como seguirá o trajeto, e planeje a caminhada noturna por ruas movimentadas e um percurso pensado.',
      'Leave time to pause: the walk, studios and views are part of the experience. Check the Bondinho and the venues you plan to visit on the day; do not build the whole outing around one service. If you combine it with Lapa, agree on where and how you will continue, and plan any night walk along active streets with a clear route.',
    ],
  ],
  lapa: [
    [
      'Lapa ofrece dos visitas distintas. De día puedes recorrer los Arcos, la Escadaria Selarón y las calles históricas con una pausa cultural; de noche, elige antes el tipo de música o ambiente y el local concreto. No conviertas una noche en una lista de bares: reservar tiempo para cenar, entrar al espectáculo y volver suele hacer el plan más llevadero.',
      'A Lapa oferece dois passeios diferentes. De dia, dá para conhecer os Arcos, a Escadaria Selarón e as ruas históricas com uma pausa cultural; à noite, escolha antes o tipo de música ou ambiente e o local específico. Não transforme a noite numa lista de bares: reservar tempo para jantar, entrar no espetáculo e voltar deixa o programa mais tranquilo.',
      'Lapa offers two different outings. By day, you can see the Arcos, Escadaria Selarón and historic streets with a cultural stop; at night, choose your preferred music or atmosphere and a specific venue in advance. Do not turn one evening into a bar checklist: allowing time for dinner, the show and the return usually makes the plan easier.',
    ],
    [
      'Si te alojas cerca, pregunta por el ruido nocturno y la orientación de la habitación antes de reservar. Para una salida, guarda la dirección exacta del local y acuerda cómo regresar antes de que empiece la noche; al terminar, usa el punto de recogida indicado y evita improvisar un trayecto largo a pie por calles vacías. En fechas de feria o eventos, revisa el calendario y los accesos.',
      'Se for se hospedar por perto, pergunte sobre o ruído noturno e a posição do quarto antes de reservar. Para sair, salve o endereço exato do local e combine a volta antes do início da noite; ao terminar, use o ponto de embarque indicado e evite improvisar um trajeto longo a pé por ruas vazias. Em dias de feira ou evento, confira calendário e acessos.',
      'If you stay nearby, ask about night noise and the room’s orientation before booking. For an evening out, save the venue’s exact address and arrange your return before the night begins; when it ends, use the designated pickup point and avoid improvising a long walk along empty streets. Check the calendar and access details on market or event days.',
    ],
  ],
  urca: [
    [
      'Urca invita a bajar el ritmo: puedes centrar la visita en el paseo junto a la bahía y sumar Praia Vermelha o el entorno del Pão de Açúcar, según tu energía y el tiempo. No cuentes el barrio como una parada rápida entre muchos puntos del otro lado de la ciudad. Elige un objetivo principal y deja el resto como opción si el grupo quiere seguir.',
      'A Urca convida a desacelerar: você pode focar o passeio junto à baía e incluir a Praia Vermelha ou o entorno do Pão de Açúcar, conforme sua disposição e o tempo. Não trate o bairro como uma parada rápida entre muitos pontos do outro lado da cidade. Escolha um objetivo principal e deixe o restante como opção se o grupo quiser continuar.',
      'Urca invites you to slow down: focus on the bayfront walk and add Praia Vermelha or the area around Sugarloaf, depending on your energy and the weather. Do not treat the neighbourhood as a quick stop between several places across the city. Choose one main goal and leave the rest as an option if your group wants to continue.',
    ],
    [
      'La bahía y la playa no equivalen a una garantía de baño: revisa los boletines de balneabilidad antes de entrar al agua. Con lluvia o viento, prioriza el paseo y la comida bajo techo, y confirma horarios y accesos de cualquier visita con entrada. Para cerrar el día, decide si vuelves por el mismo camino o enlazas con Botafogo; concreta el trayecto cuando sepas dónde termina tu recorrido.',
      'A baía e a praia não garantem condições para banho: consulte os boletins de balneabilidade antes de entrar na água. Com chuva ou vento, priorize o passeio e uma refeição em local coberto, e confirme horários e acessos de qualquer atração com ingresso. Para encerrar o dia, decida se volta pelo mesmo caminho ou segue para Botafogo; escolha o trajeto quando souber onde termina o passeio.',
      'The bay and beach do not guarantee safe swimming conditions: check water-quality notices before entering the water. In rain or wind, prioritise the walk and an indoor meal, and confirm hours and access for any ticketed visit. To end the day, decide whether to return the way you came or continue to Botafogo; choose your route once you know where your outing ends.',
    ],
  ],
  flamengo: [
    [
      'Piensa en el Aterro como un parque grande junto a la bahía, no como una sola plaza. Elige de antemano si quieres caminar, descansar, acercarte a un espacio cultural o enlazar con Catete y Glória; así evitas cruzar de un extremo a otro sin una pausa. Si viajas con niños, personas mayores o alguien que necesita descansos frecuentes, define un tramo corto y un punto claro para encontrarse.',
      'Pense no Aterro como um parque amplo junto à baía, não como uma única praça. Decida antes se quer caminhar, descansar, visitar um espaço cultural ou seguir para Catete e Glória; assim você evita atravessar de uma ponta a outra sem pausa. Se estiver com crianças, pessoas idosas ou alguém que precise descansar com frequência, escolha um trecho curto e um ponto claro para se encontrar.',
      'Think of the Aterro as a large park beside the bay, not one single square. Decide whether you want a walk, a rest, a cultural stop or to continue towards Catete and Glória; this helps avoid crossing from one end to the other without a break. If you are with children, older adults or anyone who needs frequent rests, choose a shorter stretch and a clear meeting point.',
    ],
    [
      'El calor, la lluvia y los eventos pueden cambiar el paseo y los accesos. Lleva agua, busca sombra y confirma en fuentes oficiales si hay cierres o programación especial para la fecha elegida. Puedes combinar el parque con una visita cultural, pero comprueba horarios y entradas por separado; reserva el regreso según el punto exacto donde termines.',
      'Calor, chuva e eventos podem mudar o passeio e os acessos. Leve água, procure sombra e confira em fontes oficiais se há interdições ou programação especial na data escolhida. Dá para combinar o parque com uma visita cultural, mas verifique horários e ingressos separadamente; planeje a volta a partir do ponto exato onde terminar.',
      'Heat, rain and events can change the walk and access. Bring water, look for shade, and check official sources for closures or special programming on your chosen date. You can pair the park with a cultural visit, but check opening times and tickets separately; plan your return from the exact place where you finish.',
    ],
  ],
};

const phrases = {};
const add = (triplet) => { phrases[triplet[0]] = { PT: triplet[1], EN: triplet[2] }; };
add(heading);
add(transportLink);
for (const paragraphs of Object.values(entries)) for (const paragraph of paragraphs) add(paragraph);

const chunkPath = path.join(root, 'assets/js/translations/chunks/barrios-02.js');
let dictionary = fs.readFileSync(chunkPath, 'utf8');
const missing = Object.fromEntries(Object.entries(phrases).filter(([key]) => !dictionary.includes(`${JSON.stringify(key)}:`)));
if (Object.keys(missing).length) dictionary = dictionary.replace('export default {', `export default {${JSON.stringify(missing).slice(1, -1)},`, 1);
fs.writeFileSync(chunkPath, dictionary);

const marker = 'RIO_NEIGHBORHOOD_DEPTH_V2';
for (const [slug, paragraphs] of Object.entries(entries)) {
  const file = path.join(root, 'barrios', slug, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  const block = `<!-- ${marker} --><article class="bh-card" data-rio-neighborhood-v2><h2>${heading[0]}</h2>${paragraphs.map((p) => `<p>${p[0]}</p>`).join('')}<p><a href="../../transportes/">${transportLink[0]}</a></p></article><!-- /${marker} -->`;
  const existing = new RegExp(`<!-- ${marker} -->[\\s\\S]*?<!-- \\/${marker} -->`);
  if (existing.test(html)) html = html.replace(existing, block);
  else html = html.replace('<p class="bh-source-note">', `${block}<p class="bh-source-note">`);
  fs.writeFileSync(file, html);
  console.log(`Neighborhood depth: /barrios/${slug}/`);
}
