import { t } from './modelo.js';

const month = (title, low, high, rain, plan) => ({ title, low, high, rain, plan });


const monthlyAdvice = [
  // Recomendaciones prácticas, NO predicciones: basadas en patrones históricos y paseos existentes.
  { carry: t('Impermeable ligero, calzado antideslizante y agua.', 'Capa de chuva leve, calçado antiderrapante e água.', 'Light raincoat, grippy shoes and water.'),
    inside: t('Museu Imperial o una exposición confirmada en el Centro.', 'Museu Imperial ou exposição confirmada no Centro.', 'Imperial Museum or a confirmed downtown exhibition.') },
  { carry: t('Paraguas compacto, calzado cerrado y bolsa impermeable.', 'Guarda-chuva compacto, sapato fechado e bolsa impermeável.', 'Compact umbrella, closed shoes and a waterproof bag.'),
    inside: t('Programación cubierta en el Centro Cultural Sesc Quitandinha.', 'Programação coberta do Centro Cultural Sesc Quitandinha.', 'Indoor programming at Centro Cultural Sesc Quitandinha.') },
  { carry: t('Capa para lluvia intensa y plan de regreso flexible.', 'Capa para chuva forte e plano de retorno flexível.', 'Rain protection and a flexible return plan.'),
    inside: t('Casa Santos Dumont o museo cercano, solo si la ruta es segura.', 'Casa Santos Dumont ou museu próximo, só com rota segura.', 'Santos Dumont house or a nearby museum, only if roads are safe.') },
  { carry: t('Chaqueta fina y paraguas para cambios de tiempo.', 'Casaco leve e guarda-chuva para mudanças de tempo.', 'Light jacket and umbrella for weather changes.'),
    inside: t('Centro de Cultura Raul de Leoni: consulta la agenda del día.', 'Centro de Cultura Raul de Leoni: confira a agenda do dia.', 'Centro de Cultura Raul de Leoni: check daily programming.') },
  { carry: t('Abrigo para mañana y tarde, zapatos cómodos.', 'Agasalho para manhã e fim do dia, sapato confortável.', 'Layers for mornings and evenings, comfortable shoes.'),
    inside: t('Museu Casa do Colono, confirmando apertura y traslado.', 'Museu Casa do Colono, confirmando abertura e transporte.', 'Museu Casa do Colono, after confirming opening and transport.') },
  { carry: t('Abrigo más cálido para fiestas y paseos nocturnos.', 'Agasalho mais quente para festas e passeios noturnos.', 'Warmer layers for evening festivities.'),
    inside: t('Museu Imperial o espacios culturales abiertos durante la fiesta.', 'Museu Imperial ou espaços culturais abertos durante a festa.', 'Imperial Museum or indoor cultural venues open during festival dates.') },
  { carry: t('Camiseta de manga larga y abrigo para salir temprano.', 'Manga comprida e casaco para sair cedo.', 'Long sleeves and a jacket for early starts.'),
    inside: t('Museu da FEB o Palácio Rio Negro solo con visitas confirmadas.', 'Museu da FEB ou Palácio Rio Negro só com visita confirmada.', 'FEB Museum or Rio Negro Palace only when visits are confirmed.') },
  { carry: t('Capas de ropa: mañana fresca y sol de mediodía.', 'Roupas em camadas: manhã fria e sol ao meio-dia.', 'Layered clothing for cool mornings and midday sun.'),
    inside: t('Casa Stefan Zweig: revisa días y horarios de visita.', 'Casa Stefan Zweig: confira dias e horários de visita.', 'Casa Stefan Zweig: check visiting days and hours.') },
  { carry: t('Chaqueta ligera, agua y protección para sol y lluvia.', 'Casaco leve, água e proteção para sol e chuva.', 'Light jacket, water and sun/rain protection.'),
    inside: t('Centro de Cultura Raul de Leoni, según cartelera.', 'Centro de Cultura Raul de Leoni, conforme programação.', 'Centro de Cultura Raul de Leoni, depending on the schedule.') },
  { carry: t('Calzado con buena suela y una capa de lluvia.', 'Sapato de boa aderência e capa de chuva.', 'Grippy footwear and a rain layer.'),
    inside: t('Una exposición del Sesc Quitandinha, confirmando la entrada.', 'Uma exposição no Sesc Quitandinha, conferindo o acesso.', 'A Sesc Quitandinha exhibition, after checking access.') },
  { carry: t('Impermeable y batería externa para consultar alertas.', 'Capa de chuva e bateria externa para consultar alertas.', 'Raincoat and power bank for checking alerts.'),
    inside: t('Museu de Porcelana u otro espacio abierto, si el trayecto es seguro.', 'Museu de Porcelana ou outro local aberto, se o caminho for seguro.', 'Porcelain Museum or another open venue if routes remain safe.') },
  { carry: t('Calzado cerrado, impermeable y tiempo extra para el tráfico.', 'Sapato fechado, capa e tempo extra para o trânsito.', 'Closed shoes, rainwear and extra travel time.'),
    inside: t('Una actividad cubierta del calendario navideño, verificada para tu fecha.', 'Atividade coberta da agenda de Natal, confirmada para a data.', 'An indoor holiday-calendar activity confirmed for your date.') },
];

export const petropolisMonths = {
  title: t('Petrópolis mes a mes', 'Petrópolis mês a mês', 'Petrópolis month by month'),
  image: 'vista-trono',
  seasonChoices: [
    {
      title: t('Diciembre a marzo', 'Dezembro a março', 'December to March'),
      badge: t('Calor y más lluvia', 'Calor e mais chuva', 'Warmer and wetter'),
      copy: t('Reserva actividades al aire libre para ventanas de tiempo seguro y prepara alternativas bajo techo. Con alertas de Defensa Civil, cambia el itinerario y evita caminos inundados.',
        'Planeje atividades externas para janelas de tempo seguro e tenha opções cobertas. Com alertas da Defesa Civil, mude a programação e evite vias alagadas.',
        'Choose outdoor time windows when conditions are safe and keep indoor alternatives. Follow Civil Defence alerts and avoid flooded routes.'),
    },
    {
      title: t('Abril y mayo', 'Abril e maio', 'April and May'),
      badge: t('Transición más templada', 'Transição mais amena', 'Milder transition'),
      copy: t('Buen momento para combinar un paseo del Centro con otra zona, reservando abrigo y tiempo de traslado.',
        'Boa época para combinar o Centro com outra região, prevendo agasalho e deslocamento.',
        'Pair the historic centre with another district, allowing for layers and transport time.'),
    },
    {
      title: t('Junio a agosto', 'Junho a agosto', 'June to August'),
      badge: t('Más fresco y menos lluvioso', 'Mais frio e menos chuvoso', 'Cooler and historically drier'),
      copy: t('Ideal para priorizar caminatas urbanas y patrimonio, con abrigo para la mañana. Verifica los grandes eventos antes de reservar.',
        'Boa fase para caminhadas urbanas e patrimônio, com agasalho de manhã. Confira eventos antes de reservar.',
        'Prioritise urban walks and heritage, bring warm layers for mornings and check festival calendars before booking.'),
    },
    {
      title: t('Septiembre a noviembre', 'Setembro a novembro', 'September to November'),
      badge: t('Lluvia en aumento', 'Chuva aumentando', 'Rainfall increasing'),
      copy: t('A medida que avanza la primavera, vuelve a tener más peso el plan para lluvia y el margen para viajar de vuelta.',
        'Com o avanço da primavera, priorize um plano de chuva e margem para a volta.',
        'As spring progresses, build in a rainy-day plan and extra return-travel time.'),
    },
  ],
  intro: t('Doce meses para decidir cuándo subir a la sierra, qué llevar y cómo combinar una visita al aire libre con una alternativa bajo techo.',
    'Doze meses para decidir quando subir a serra, o que levar e como combinar um passeio ao ar livre com uma opção coberta.',
    'Twelve months to decide when to head up into the mountains, what to pack and how to pair outdoor plans with an indoor alternative.'),
  tip: t('Yo elegiría junio a agosto para priorizar caminatas con menos lluvia histórica. Si viajas en verano, reserva una visita bajo techo y decide el paseo al aire libre después de mirar el pronóstico.',
    'Eu escolheria junho a agosto se a prioridade fosse caminhar com menos chuva histórica. No verão, reserve uma visita coberta e decida o passeio ao ar livre depois de olhar a previsão.',
    'I’d pick June through August if walking in historically drier weather is the priority. In summer, book an indoor visit and decide on outdoor plans after checking the forecast.'),
  months: [
    month(t('Enero', 'Janeiro', 'January'), 21, 29, 316, t(
      'Haz Koeler y la Catedral temprano si el cielo acompaña. Reserva el Museu Imperial como alternativa y lleva impermeable liviano.',
      'Faça Koeler e a Catedral cedo se o tempo ajudar. Reserve o Museu Imperial como alternativa e leve capa leve.',
      'Walk Koeler and visit the cathedral early if the weather cooperates. Keep the Imperial Museum as a backup and bring a light rain jacket.')),
    month(t('Febrero', 'Fevereiro', 'February'), 21, 29, 234, t(
      'Combina Quitandinha y una exposición del Sesc. Si coincide con Carnaval, verifica agenda, apertura y horario del bus de regreso.',
      'Combine Quitandinha e uma exposição do Sesc. Se coincidir com o Carnaval, confira agenda, funcionamento e ônibus de volta.',
      'Combine Quitandinha with a Sesc exhibition. If your dates overlap with Carnival, check events, openings and your bus back.')),
    month(t('Marzo', 'Março', 'March'), 20, 28, 249, t(
      'Reserva un circuito compacto entre Imperatriz y el Centro. Si hay tormentas o alerta, aplaza senderos y confirma las condiciones del regreso.',
      'Reserve um circuito curto entre a Imperatriz e o Centro. Com tempestade ou alerta, adie trilhas e confira as condições da volta.',
      'Plan a compact route between Rua da Imperatriz and downtown. If there are storms or warnings, postpone hikes and check the return conditions.')),
    month(t('Abril', 'Abril', 'April'), 19, 26, 112, t(
      'Yo combinaría una caminata por Koeler con Palácio de Cristal. Si tu fecha coincide con un feriado, revisa cambios de apertura y compra el pasaje con margen.',
      'Eu combinaria uma caminhada pela Koeler com o Palácio de Cristal. Em feriado, confira mudanças de funcionamento e compre a passagem com folga.',
      'I’d pair a walk along Koeler with the Crystal Palace. On holidays, check changes to opening hours and buy your bus ticket ahead.')),
    month(t('Mayo', 'Maio', 'May'), 16, 24, 75, t(
      'Dedica una mañana a Itaipava y reserva tiempo para el almuerzo. Lleva una capa para la espera del bus y guarda el punto de regreso.',
      'Dedique uma manhã a Itaipava e deixe tempo para o almoço. Leve uma camada extra para esperar o ônibus e salve o ponto da volta.',
      'Spend a morning in Itaipava and leave time for lunch. Bring a layer for waiting for the bus and save your return stop.')),
    month(t('Junio', 'Junho', 'June'), 15, 23, 45, t(
      'Lleva abrigo para la mañana. Si tu objetivo es la Bauernfest, confirma el calendario oficial de la edición y organiza el regreso antes de quedarte hasta el cierre.',
      'Leve agasalho para a manhã. Se a ideia for a Bauernfest, confira o calendário oficial da edição e organize a volta antes de ficar até o encerramento.',
      'Bring a warm layer for the morning. If you’re visiting for Bauernfest, check that edition’s official dates and arrange a ride back before staying until closing.')),
    month(t('Julio', 'Julho', 'July'), 14, 23, 43, t(
      'Es el mes con menos precipitación media en esta serie. Aprovecha para caminar por el Centro y guarda una visita interior para la primera hora si hace frío.',
      'É o mês com menor precipitação média nesta série. Aproveite para caminhar pelo Centro e deixe uma visita coberta para a primeira hora se estiver frio.',
      'This is the driest month in the dataset. Walk around downtown and keep an indoor visit for the first stop if it is cold.')),
    month(t('Agosto', 'Agosto', 'August'), 15, 24, 45, t(
      'Con buena visibilidad, yo priorizaría una panorámica de la ciudad. Si prefieres Bonfim, consulta las condiciones de acceso y deja la vuelta organizada.',
      'Com boa visibilidade, eu priorizaria uma vista da cidade. Se preferir o Bonfim, consulte as condições de acesso e deixe a volta organizada.',
      'With good visibility, I’d prioritise a view over town. If you prefer Bonfim, check access conditions and arrange the return.')),
    month(t('Septiembre', 'Setembro', 'September'), 16, 25, 91, t(
      'Alterna jardines y una visita cultural. Guarda un segundo plan en el mismo barrio para evitar cruzar la ciudad si cambia el tiempo.',
      'Alterne jardins e uma visita cultural. Salve outro plano no mesmo bairro para evitar atravessar a cidade se o tempo mudar.',
      'Pair gardens with a cultural visit. Save another option in the same neighbourhood so you can avoid crossing town if the weather changes.')),
    month(t('Octubre', 'Outubro', 'October'), 18, 26, 146, t(
      'Aprovecha una ventana seca para el lago de Quitandinha. Revisa la cartelera del Sesc para trasladar la visita al interior si empieza a llover.',
      'Aproveite uma janela sem chuva para o lago do Quitandinha. Confira a programação do Sesc para passar ao espaço coberto se chover.',
      'Use a dry window for the Quitandinha lake. Check the Sesc programme so you can move indoors if rain starts.')),
    month(t('Noviembre', 'Novembro', 'November'), 19, 26, 255, t(
      'Deja margen para el bus si vas a un evento. Consulta la previsión para el distrito y decide el paseo panorámico el mismo día.',
      'Deixe folga para o ônibus se for a um evento. Consulte a previsão do distrito e decida o passeio panorâmico no próprio dia.',
      'Leave a bus buffer if you’re going to an event. Check the forecast for the district and decide on viewpoints on the day.')),
    month(t('Diciembre', 'Dezembro', 'December'), 20, 28, 303, t(
      'Si vas por el Natal Imperial, confirma actividades y horarios por día. Combina un programa cubierto con una salida corta y organiza la vuelta antes de salir de noche.',
      'Se for pelo Natal Imperial, confira atividades e horários por dia. Combine um programa coberto com uma saída curta e organize a volta antes de sair à noite.',
      'If you’re coming for Natal Imperial, confirm the daily programme. Pair an indoor visit with a short outing and arrange your return before going out at night.')),
  ].map((entry,index)=>({ ...entry, ...monthlyAdvice[index] })),
  sources: [
    ['https://www.climatempo.com.br/climatologia/317/petropolis-br', 'Climatempo · Petrópolis'],
    ['https://linktr.ee/turismo.petropolis', 'Turispetro · Secretaria de Turismo'],
    ['https://diariodepetropolis.com.br/integra/prefeitura-lanca-calendario-de-eventos-2026-36904', 'Diário de Petrópolis · Calendário 2026'],
    ['https://calendariodeeventos.abihrj.com.br/municipio/petropolis/', 'ABIH-RJ · Eventos Petrópolis 2026/2027'],
    ['https://www.petropolis.rj.gov.br/boletim', 'Defesa Civil · Boletim meteorológico Petrópolis'],
  ],
};
