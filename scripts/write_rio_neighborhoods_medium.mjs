// Add route-specific planning depth to five custom-layout Rio neighborhood pages.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const heading = ['Una forma práctica de organizar la visita', 'Um jeito prático de organizar a visita', 'A practical way to plan your visit'];
const transportLink = ['Planifica el trayecto →', 'Planeje o trajeto →', 'Plan the journey →'];
const entries = {
  lagoa: [
    [
      'No hace falta recorrer todo el contorno para disfrutar la Lagoa. Elige un tramo de entrada y otro de salida según lo que quieras combinar, y deja margen para sentarte, tomar agua y cruzar con calma. Si vas en bici, decide dónde empieza y termina el paseo antes de salir; no cuentes los puntos del mapa como si fueran paradas contiguas.',
      'Não é preciso percorrer todo o contorno para aproveitar a Lagoa. Escolha um trecho de entrada e outro de saída conforme o que quer combinar e deixe tempo para sentar, beber água e atravessar com calma. Se for de bicicleta, decida onde o passeio começa e termina antes de sair; não trate os pontos do mapa como paradas coladas umas às outras.',
      'You do not need to circle the entire lagoon to enjoy Lagoa. Choose where to start and finish based on what you want to combine, and leave time to sit, drink water and cross carefully. If you cycle, decide where your ride begins and ends before setting out; do not treat map pins as if they were next door to one another.',
    ],
    [
      'Para una salida familiar o tranquila, acuerda un punto de encuentro que todos puedan reconocer y escoge una distancia cómoda para quien camine menos. Con lluvia, calor fuerte o un evento, cambia el plan a una visita corta o a otro barrio cercano. Consulta el transporte para el último tramo: la cercanía a la laguna no asegura que cada destino quede junto a una estación.',
      'Para um passeio em família ou mais tranquilo, combine um ponto de encontro fácil de reconhecer e escolha uma distância confortável para quem caminha menos. Com chuva, calor forte ou evento, reduza o percurso ou escolha outro bairro próximo. Confira o transporte para o último trecho: estar perto da Lagoa não significa que todo destino fique junto a uma estação.',
      'For a family outing or an easy-paced visit, agree on a recognisable meeting point and choose a distance that works for the slowest walker. In rain, extreme heat or during an event, shorten the plan or choose another nearby district. Check transport for the final leg: being near the lagoon does not mean every destination is next to a station.',
    ],
  ],
  'jardim-botanico': [
    [
      'Separa la visita al Jardim Botânico del paseo por Parque Lage, aunque quieras hacer ambos el mismo día: son lugares distintos y cada uno puede ocupar varias horas. Confirma entradas, horarios, accesos y reglas directamente antes de salir. Si tienes poco tiempo, escoge uno como actividad principal y deja el otro para otra visita, en vez de correr de un punto a otro.',
      'Separe a visita ao Jardim Botânico do passeio pelo Parque Lage, mesmo que queira conhecer os dois no mesmo dia: são lugares diferentes e cada um pode ocupar várias horas. Confirme ingressos, horários, acessos e regras diretamente antes de sair. Se tiver pouco tempo, escolha um como atividade principal e deixe o outro para outra visita, em vez de correr de um ponto a outro.',
      'Treat the Jardim Botânico and Parque Lage as separate visits, even if you want to see both on the same day: they are different places and each can take several hours. Check tickets, opening times, access and visitor rules directly before going. If you have limited time, make one the main activity and save the other for another visit instead of rushing between them.',
    ],
    [
      'Elige la ruta dentro del jardín según la energía del grupo y el tiempo disponible; una visita breve y pausada puede ser mejor que intentar cubrir cada sector. Con niños, personas mayores o movilidad reducida, confirma qué accesos y recorridos son adecuados y prevé descansos. Para comer o seguir hacia Gávea y Lagoa, verifica las direcciones y el transporte de cada tramo por separado.',
      'Escolha o percurso dentro do Jardim conforme a disposição do grupo e o tempo disponível; uma visita curta e tranquila pode ser melhor do que tentar cobrir cada área. Com crianças, pessoas idosas ou mobilidade reduzida, confirme quais acessos e caminhos são adequados e preveja pausas. Para comer ou seguir para Gávea e Lagoa, confira endereços e transporte de cada trecho separadamente.',
      'Choose a route through the garden that suits your group’s energy and available time; a shorter, slower visit may be better than trying to cover every area. With children, older adults or reduced mobility, check which entrances and paths are suitable and plan breaks. If you are eating or continuing to Gávea or Lagoa, check addresses and transport for each leg separately.',
    ],
  ],
  'sao-conrado': [
    [
      'En São Conrado, decide si el día será de playa, montaña o una actividad contratada al aire libre. No des por hecho que las condiciones permiten combinarlo todo: tiempo, viento, mar y accesos pueden cambiar. Para vuelo libre o cualquier salida guiada, verifica al operador, la operación y los requisitos antes de reservar; organiza el regreso desde el lugar exacto donde termine la actividad.',
      'Em São Conrado, decida se o dia será de praia, montanha ou uma atividade ao ar livre contratada. Não presuma que as condições permitem fazer tudo: tempo, vento, mar e acessos podem mudar. Para voo livre ou qualquer passeio guiado, verifique o operador, o funcionamento e os requisitos antes de reservar; planeje a volta a partir do lugar exato onde a atividade terminar.',
      'In São Conrado, decide whether your day is for the beach, the mountains or a booked outdoor activity. Do not assume conditions will allow you to combine everything: weather, wind, sea and access can change. For hang gliding or any guided outing, check the operator, availability and requirements before booking; plan your return from the exact place where the activity ends.',
    ],
    [
      'El barrio tiene desniveles y distancias que conviene revisar con el grupo antes de salir. Si alguien tiene movilidad limitada, pregunta por accesos, superficie y transporte hasta cada punto en lugar de basarte en la distancia en línea recta. Con mal tiempo, ten una alternativa urbana y comprueba las condiciones de la playa en el boletín oficial antes de entrar al agua.',
      'O bairro tem desníveis e distâncias que vale conferir com o grupo antes de sair. Se alguém tiver mobilidade reduzida, pergunte sobre acessos, piso e transporte até cada ponto, sem se basear na distância em linha reta. Com mau tempo, tenha uma alternativa urbana e consulte o boletim oficial sobre as condições da praia antes de entrar na água.',
      'The district has slopes and distances worth reviewing with your group before setting out. If anyone has limited mobility, ask about access, surfaces and transport to each stop instead of relying on straight-line distance. In poor weather, keep an urban alternative in mind and check the official beach conditions before entering the water.',
    ],
  ],
  gavea: [
    [
      'Gávea funciona mejor cuando eliges una razón para detenerte: Planetário, un espacio cultural, una comida o una noche en Baixo Gávea. No supongas que esos planes están en la misma cuadra; guarda las direcciones y calcula el último tramo antes de combinar más de uno. La agenda y los servicios cambian, así que confirma programación y apertura directamente para tu fecha.',
      'Gávea funciona melhor quando você escolhe um motivo para parar: Planetário, um espaço cultural, uma refeição ou uma noite no Baixo Gávea. Não presuma que esses programas ficam na mesma quadra; salve os endereços e confira o último trecho antes de combinar mais de um. A programação e os serviços mudam, então confirme funcionamento diretamente para a sua data.',
      'Gávea works best when you choose a reason to stop: the Planetário, a cultural venue, a meal or an evening in Baixo Gávea. Do not assume these are on the same block; save the addresses and check the final leg before combining more than one. Schedules and services change, so confirm programming and opening details for your date.',
    ],
    [
      'Si vas a cenar o salir de noche, identifica de antemano cómo volverás y revisa la conexión desde el lugar concreto, no solo desde el nombre del barrio. Con lluvia, arma un plan alrededor de una actividad bajo techo y confirma entradas. Para familias, compara duración y contenido de la actividad con la edad del grupo y deja margen entre una visita y la siguiente.',
      'Se for jantar ou sair à noite, defina antes como vai voltar e confira a conexão a partir do lugar específico, não apenas pelo nome do bairro. Com chuva, monte o roteiro em torno de uma atividade coberta e confirme ingressos. Com famílias, compare duração e conteúdo da atividade com a idade do grupo e deixe intervalo entre uma visita e outra.',
      'If you are dining or going out at night, decide how you will return and check the connection from the specific venue, not just from the neighbourhood name. In rain, build the plan around an indoor activity and confirm tickets. With families, compare the activity’s length and content with the group’s ages and leave time between stops.',
    ],
  ],
  guaratiba: [
    [
      'Guaratiba y Barra de Guaratiba comparten una escala más abierta, pero no son una sola parada. Decide si tu foco será una playa, una salida de naturaleza o un restaurante concreto y organiza todo alrededor de ese destino. Si eliges una caminata, confirma acceso, dificultad y condiciones con fuentes responsables; no sigas una ruta informal solo porque aparezca marcada en un mapa.',
      'Guaratiba e Barra de Guaratiba têm uma escala mais aberta, mas não são uma única parada. Decida se o foco será uma praia, um passeio de natureza ou um restaurante específico e organize o dia em torno desse destino. Se escolher uma caminhada, confirme acesso, dificuldade e condições com fontes responsáveis; não siga um trajeto informal apenas porque aparece marcado no mapa.',
      'Guaratiba and Barra de Guaratiba share a more open scale, but they are not one single stop. Choose whether your focus is a beach, a nature outing or a specific restaurant, then plan around that destination. If you choose a hike, check access, difficulty and conditions with responsible sources; do not follow an informal route just because it appears on a map.',
    ],
    [
      'Reserva tiempo para la ida y la vuelta y confirma el último servicio o alternativa antes de empezar una actividad larga. Para comer, verifica apertura y reserva con el establecimiento, sobre todo si el viaje se organiza alrededor de esa mesa. Con niños o personas que caminan menos, compara pendiente, sombra y distancia real; deja el plan más exigente para cuando el grupo esté preparado.',
      'Reserve tempo para ir e voltar e confirme o último transporte ou uma alternativa antes de iniciar uma atividade longa. Para comer, confira funcionamento e reserva com o estabelecimento, especialmente se a viagem foi planejada em torno daquela refeição. Com crianças ou pessoas que caminham menos, compare inclinação, sombra e distância real; deixe o programa mais exigente para quando o grupo estiver preparado.',
      'Allow time for the outward and return journeys, and check the last service or an alternative before starting a long activity. For a meal, confirm opening and reservations directly with the venue, especially if the trip is built around that stop. With children or slower walkers, consider slope, shade and actual distance; save the more demanding plan for when the group is ready.',
    ],
  ],
};

const phrases = { [heading[0]]: { PT: heading[1], EN: heading[2] }, [transportLink[0]]: { PT: transportLink[1], EN: transportLink[2] } };
for (const paragraphs of Object.values(entries)) for (const triplet of paragraphs) phrases[triplet[0]] = { PT: triplet[1], EN: triplet[2] };
const chunkPath = path.join(root, 'assets/js/translations/chunks/barrios-02.js');
let dictionary = fs.readFileSync(chunkPath, 'utf8');
const missing = Object.fromEntries(Object.entries(phrases).filter(([key]) => !dictionary.includes(`${JSON.stringify(key)}:`)));
if (Object.keys(missing).length) dictionary = dictionary.replace('export default {', `export default {${JSON.stringify(missing).slice(1, -1)},`, 1);
fs.writeFileSync(chunkPath, dictionary);

const marker = 'RIO_NEIGHBORHOOD_DEPTH_V4';
for (const [slug, paragraphs] of Object.entries(entries)) {
  const file = path.join(root, 'barrios', slug, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  const cards = paragraphs.map((p) => `<article class="p"><h2>${heading[0]}</h2><p>${p[0]}</p></article>`).join('');
  const block = `<!-- ${marker} --><section class="b" data-rio-neighborhood-v4><div class="g">${cards}</div><p><a href="../../transportes/">${transportLink[0]}</a></p></section><!-- /${marker} -->`;
  const existing = new RegExp(`<!-- ${marker} -->[\\s\\S]*?<!-- \\/${marker} -->`);
  if (existing.test(html)) html = html.replace(existing, block);
  else html = html.replace('</main>', `${block}</main>`);
  fs.writeFileSync(file, html);
  console.log(`Neighborhood depth: /barrios/${slug}/`);
}
