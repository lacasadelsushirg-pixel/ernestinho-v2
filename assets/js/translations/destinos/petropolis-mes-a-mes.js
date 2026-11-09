import { t } from './modelo.js';

const month = (title, low, high, rain, plan) => ({ title, low, high, rain, plan });

export const petropolisMonths = {
  title: t('Petrópolis mes a mes', 'Petrópolis mês a mês', 'Petrópolis month by month'),
  image: 'vista-trono',
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
  ],
  sources: [
    ['https://www.climatempo.com.br/climatologia/317/petropolis-br', 'Climatempo · Petrópolis'],
    ['https://linktr.ee/turismo.petropolis', 'Turispetro · Secretaria de Turismo'],
    ['https://diariodepetropolis.com.br/integra/prefeitura-lanca-calendario-de-eventos-2026-36904', 'Diário de Petrópolis · Calendário 2026'],
  ],
};
