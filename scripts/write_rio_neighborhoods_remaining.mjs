// Add practical, locale-ready planning copy to existing Rio neighborhood pages.
// This only appends text inside the current page layout; it does not touch photos.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const heading = ['Antes de cerrar el recorrido', 'Antes de fechar o passeio', 'Before you finalise the outing'];
const entries = {
  'ilha-da-gigoia': [
    [
      'La isla se disfruta mejor sin apuro y con una expectativa distinta de la Barra de avenidas y shoppings. Confirma el punto de embarque y el regreso antes de cruzar; no des por sentado que podrás resolver el transporte igual que en tierra firme. Si vas a comer, revisa directamente si el restaurante abre ese día y guarda su ubicación para coordinar la vuelta.',
      'A ilha rende mais sem pressa e com uma expectativa diferente da Barra de avenidas e shoppings. Confira o ponto de embarque e a volta antes de atravessar; não presuma que poderá resolver o transporte como em terra firme. Se for comer, confirme diretamente se o restaurante abre naquele dia e salve a localização para combinar o retorno.',
      'The island is best enjoyed at an unhurried pace, with expectations different from Barra’s avenues and shopping centres. Check the boarding point and return before crossing; do not assume you can arrange transport as easily as on the mainland. If you plan to eat, confirm the restaurant is open that day and save its location to coordinate your return.',
    ],
    [
      'Lleva solo lo que necesitas y piensa en el piso irregular y los tramos a pie. Con lluvia, niños pequeños o alguien con movilidad reducida, pregunta antes cómo es el acceso al lugar elegido y deja margen para cambiar el plan. La visita puede ser una salida propia; no hace falta encajarla a la fuerza con varios puntos lejanos el mismo día.',
      'Leve apenas o necessário e considere o piso irregular e os trechos a pé. Com chuva, crianças pequenas ou alguém com mobilidade reduzida, pergunte antes como é o acesso ao lugar escolhido e deixe margem para mudar o plano. A visita pode ser um passeio por si só; não é preciso encaixá-la à força com vários pontos distantes no mesmo dia.',
      'Bring only what you need and allow for uneven surfaces and stretches on foot. In rain, with small children or anyone with limited mobility, ask in advance about access to your chosen venue and leave room to change plans. The island can be an outing in its own right; you do not need to force it into a day with several distant stops.',
    ],
  ],
  jacarepagua: [
    [
      'Jacarepaguá es extensa: antes de salir, marca el destino exacto y comprueba la ruta desde tu alojamiento, no solo el nombre del barrio. Junta en el mismo día lugares cercanos entre sí y evita cruzar hacia Barra, Vargens y el Centro como si fueran paradas consecutivas. Deja previsto cómo volver desde el último punto.',
      'Jacarepaguá é extensa: antes de sair, marque o destino exato e confira o trajeto desde sua hospedagem, não apenas o nome do bairro. Agrupe no mesmo dia lugares próximos entre si e evite cruzar para Barra, Vargens e Centro como se fossem paradas consecutivas. Planeje a volta a partir do último ponto.',
      'Jacarepaguá is extensive: before setting out, pin the exact destination and check the route from your accommodation, not just the neighbourhood name. Group places that are close to one another and avoid treating Barra, Vargens and downtown as consecutive stops. Plan your return from the final location.',
    ],
    [
      'Si el motivo es un evento, una comida o una visita concreta, confirma fecha, acceso y reserva con el establecimiento. Con calor o lluvia, calcula pausas y una alternativa bajo techo. Para familias o personas que caminan menos, revisa distancias entre entradas y puntos de descenso: la cercanía en el mapa no siempre significa un trayecto sencillo.',
      'Se o motivo for um evento, uma refeição ou uma visita específica, confirme data, acesso e reserva diretamente com o local. Com calor ou chuva, preveja pausas e uma alternativa coberta. Para famílias ou pessoas que caminham menos, confira as distâncias entre entradas e pontos de desembarque: proximidade no mapa nem sempre significa um trajeto simples.',
      'If you are going for an event, a meal or a specific visit, confirm the date, access and reservation directly with the venue. In heat or rain, plan breaks and an indoor alternative. For families or slower walkers, check distances between entrances and drop-off points: nearby on a map does not always mean an easy journey.',
    ],
  ],
  laranjeiras: [
    [
      'Laranjeiras funciona bien para una caminata de barrio, pero conviene distinguirla de Cosme Velho y del acceso al Cristo: son planes que pueden conectarse, aunque cada uno necesita su propio margen. Elige un punto de inicio y revisa pendientes, cruces y transporte antes de sumar una visita con hora marcada.',
      'Laranjeiras funciona bem para um passeio de bairro, mas vale distinguir o bairro de Cosme Velho e do acesso ao Cristo: são programas que podem ser conectados, embora cada um precise do seu próprio tempo. Escolha um ponto de partida e confira ladeiras, travessias e transporte antes de incluir uma visita com hora marcada.',
      'Laranjeiras works well for a neighbourhood walk, but distinguish it from Cosme Velho and the access to Christ the Redeemer: these outings can be connected, though each needs its own time allowance. Choose a starting point and check slopes, crossings and transport before adding a timed visit.',
    ],
    [
      'Para un plan tranquilo, combina una sola actividad principal con una pausa para comer o descansar. Comprueba directamente horarios y entradas de los espacios que quieras visitar. Si vas con niños, una persona mayor o alguien con movilidad limitada, confirma desniveles y acceso al destino exacto, no solo a la estación o plaza más cercana.',
      'Para um programa tranquilo, combine uma atividade principal com uma pausa para comer ou descansar. Confira diretamente horários e ingressos dos espaços que pretende visitar. Com crianças, pessoas idosas ou alguém com mobilidade reduzida, confirme desníveis e acesso ao destino exato, não apenas à estação ou praça mais próxima.',
      'For an easy-paced visit, pair one main activity with a meal or rest stop. Check opening times and tickets directly with the places you plan to visit. With children, older adults or anyone with limited mobility, confirm gradients and access to the exact destination, not just the nearest station or square.',
    ],
  ],
  sepetiba: [
    [
      'Sepetiba merece una decisión consciente por la distancia: antes de ir, compara el tiempo de desplazamiento con lo que quieres hacer allí y organiza la ida y la vuelta. No la sumes al final de un día cargado en la Zona Sul o el Centro. Guarda un plan alternativo por si cambia el clima o el transporte.',
      'Sepetiba merece uma decisão consciente por causa da distância: antes de ir, compare o tempo de deslocamento com o que deseja fazer lá e organize ida e volta. Não deixe para incluí-la no fim de um dia cheio na Zona Sul ou no Centro. Tenha um plano alternativo caso o tempo ou o transporte mudem.',
      'Sepetiba deserves a deliberate decision because of the distance: before going, weigh the journey against what you want to do there and plan both directions. Do not tack it onto the end of a busy day in the South Zone or downtown. Keep an alternative in mind in case the weather or transport changes.',
    ],
    [
      'Si tu interés es la playa o una comida junto al mar, verifica las condiciones y la apertura con fuentes oficiales o directamente con el establecimiento antes de salir. Lleva agua, protección solar y margen para descansar; con personas que caminan menos, confirma superficies, sombra y acceso. La vuelta también forma parte del paseo: no la dejes para resolver al final.',
      'Se o seu interesse for a praia ou uma refeição perto do mar, confira as condições e o funcionamento em fontes oficiais ou diretamente com o estabelecimento antes de sair. Leve água, proteção solar e tempo para descansar; com pessoas que caminham menos, confirme piso, sombra e acesso. A volta também faz parte do passeio: não deixe para resolver no fim.',
      'If you are going for the beach or a meal by the sea, check conditions and opening details through official sources or directly with the venue before leaving. Bring water, sun protection and time to rest; with slower walkers, check surfaces, shade and access. The return is part of the outing too, so do not leave it to the last minute.',
    ],
  ],
  tijuca: [
    [
      'Tijuca, el barrio, no es lo mismo que el Parque Nacional da Tijuca. Decide si buscas comercio y vida cotidiana, una visita cultural o naturaleza; cada opción tiene accesos y necesidades diferentes. Para entrar al parque o hacer una trilha, confirma las reglas, condiciones y ruta con la administración oficial antes de salir.',
      'Tijuca, o bairro, não é a mesma coisa que o Parque Nacional da Tijuca. Decida se procura comércio e vida cotidiana, uma visita cultural ou natureza; cada opção tem acessos e necessidades diferentes. Para entrar no parque ou fazer uma trilha, confira regras, condições e percurso com a administração oficial antes de sair.',
      'Tijuca the neighbourhood is not the same as Tijuca National Park. Decide whether you want local shops and daily life, a cultural visit or nature; each option has different access and needs. Before entering the park or hiking, check the rules, conditions and route with the official administration.',
    ],
    [
      'Para un paseo urbano, escoge un eje y evita medir el día solo por cuántas paradas caben. Si vas con niños o personas mayores, prioriza descansos y cruces sencillos. Con lluvia o mucho calor, deja la trilha para otra ocasión y confirma el transporte de regreso desde el punto que elijas.',
      'Para um passeio urbano, escolha um eixo e não meça o dia apenas por quantas paradas cabem. Com crianças ou pessoas idosas, priorize pausas e travessias simples. Com chuva ou muito calor, deixe a trilha para outra ocasião e confira o transporte de volta a partir do ponto escolhido.',
      'For an urban outing, choose one area and do not measure the day only by how many stops you can fit in. With children or older adults, prioritise breaks and easy crossings. In rain or intense heat, save the hike for another time and check your return transport from the chosen location.',
    ],
  ],
  vargens: [
    [
      'Vargem Grande y Vargem Pequena son una invitación a bajar el ritmo, pero los restaurantes, espacios naturales y alojamientos pueden quedar separados. Elige primero el lugar que justifica el viaje y comprueba directamente si requiere reserva o tiene acceso condicionado. No confíes en llegar caminando entre paradas solo porque el mapa las muestra cerca.',
      'Vargem Grande e Vargem Pequena convidam a desacelerar, mas restaurantes, áreas naturais e hospedagens podem ficar separados. Escolha primeiro o lugar que justifica o passeio e confirme diretamente se exige reserva ou tem acesso condicionado. Não conte com caminhar entre paradas só porque o mapa mostra pouca distância.',
      'Vargem Grande and Vargem Pequena invite you to slow down, but restaurants, natural areas and places to stay may be far apart. Choose the place that makes the trip worthwhile and confirm directly whether it requires a reservation or has restricted access. Do not assume you can walk between stops just because they look close on a map.',
    ],
    [
      'Si quieres combinar comida y naturaleza, deja el orden flexible y consulta el clima y las condiciones del acceso ese día. Para senderos o cascadas, usa información oficial y no entres en rutas cerradas o sin orientación clara. Con familia, confirma baños, sombra y transporte antes de salir; en esta zona una dirección precisa ayuda mucho a coordinar la llegada y la vuelta.',
      'Se quiser combinar comida e natureza, mantenha a ordem flexível e confira o tempo e as condições de acesso no dia. Para trilhas ou cachoeiras, use informações oficiais e não entre em percursos fechados ou sem orientação clara. Com a família, confirme banheiros, sombra e transporte antes de sair; nesta região, um endereço preciso ajuda a combinar chegada e volta.',
      'If you want to combine food and nature, keep the order flexible and check the weather and access conditions that day. For trails or waterfalls, use official information and avoid closed routes or places without clear guidance. With family, check restrooms, shade and transport before leaving; in this area, an exact address makes arrival and return much easier to coordinate.',
    ],
  ],
};

const phrases = { [heading[0]]: { PT: heading[1], EN: heading[2] } };
for (const paragraphs of Object.values(entries)) for (const p of paragraphs) phrases[p[0]] = { PT: p[1], EN: p[2] };
const chunkPath = path.join(root, 'assets/js/translations/chunks/barrios-02.js');
let dictionary = fs.readFileSync(chunkPath, 'utf8');
const missing = Object.fromEntries(Object.entries(phrases).filter(([key]) => !dictionary.includes(`${JSON.stringify(key)}:`)));
if (Object.keys(missing).length) dictionary = dictionary.replace('export default {', `export default {${JSON.stringify(missing).slice(1, -1)},`, 1);
fs.writeFileSync(chunkPath, dictionary);

const marker = 'RIO_NEIGHBORHOOD_DEPTH_V5';
for (const [slug, paragraphs] of Object.entries(entries)) {
  const file = path.join(root, 'barrios', slug, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  const cards = paragraphs.map((p) => `<article class="p"><h2>${heading[0]}</h2><p>${p[0]}</p></article>`).join('');
  const block = `<!-- ${marker} --><section class="b" data-rio-neighborhood-v5><div class="g">${cards}</div></section><!-- /${marker} -->`;
  const existing = new RegExp(`<!-- ${marker} -->[\\s\\S]*?<!-- \\/${marker} -->`);
  if (existing.test(html)) html = html.replace(existing, block);
  else html = html.replace('</main>', `${block}</main>`);
  fs.writeFileSync(file, html);
  console.log(`Neighborhood planning depth: /barrios/${slug}/`);
}
