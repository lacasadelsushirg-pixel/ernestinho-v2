import { t } from './modelo.js';

const base = '/destinos/petropolis/';
const venue = (name, area, address, category, source, nearby, summary, experience, advice, arrival) =>
  ({ name, area, address, category, source, nearby: base + nearby, summary, experience, advice, arrival });

export const investigatedVenues = {
  gastronomia: {
    'trutas-do-rocio': venue('Trutas do Rocio', 'Rocio · Fazenda Inglesa', 'Estrada da Vargem Grande, 6333', 'seafood',
      'https://www.trutas.com.br/restaurante', 'transportes/entre-distritos/',
      t('Restaurante rural junto al Rio Quilombo, nacido de una piscicultura familiar. Su menú pone la trucha en el centro.', 'Restaurante rural às margens do Rio Quilombo, nascido de uma truticultura familiar. A truta é o centro do cardápio.', 'A rural restaurant on the Rio Quilombo, founded by a trout-farming family. Trout takes centre stage on the menu.'),
      t('Yo compararía las preparaciones de trucha de la carta y preguntaría qué guarnición acompaña cada una. Es un almuerzo de destino para quien quiere combinar cocina de sierra con paisaje.', 'Eu compararia os preparos de truta do cardápio e perguntaria quais acompanhamentos vêm em cada um. É um almoço de destino para quem quer combinar comida serrana e paisagem.', 'I’d compare the trout preparations and ask which sides come with each. It’s a destination lunch for travellers who want mountain food and scenery.'),
      t('El sitio del restaurante indica almuerzo con reserva previa los sábados, domingos y feriados. Confirma tu fecha, cómo pagar y las opciones para niños o para quien no come pescado.', 'O site do restaurante informa almoço com reserva antecipada aos sábados, domingos e feriados. Confirme data, pagamento e opções para crianças ou quem não come peixe.', 'The restaurant lists lunch by advance reservation on Saturdays, Sundays and public holidays. Confirm your date, payment and options for children or anyone who doesn’t eat fish.'),
      t('Usa el pin de Estrada da Vargem Grande, confirma el acceso recomendado con la casa y acuerda transporte de ida y vuelta. Deja el Centro para otro turno.', 'Use o pino da Estrada da Vargem Grande, confirme o acesso recomendado com a casa e combine ida e volta. Deixe o Centro para outro turno.', 'Use the Estrada da Vargem Grande pin, ask the restaurant for the recommended approach and arrange both rides. Save downtown for another half-day.')),
    'casa-dangelo': venue('Casa D’Angelo', 'Centro Histórico', 'Rua do Imperador, 700', 'restaurant',
      'https://www.tripadvisor.com.br/Restaurant_Review-g303504-d1582903-Reviews-Casa_D_Angelo-Petropolis_State_of_Rio_de_Janeiro.html', 'barrios/centro-historico/',
      t('Restaurante de cocina brasileña e italiana en la principal calle comercial del Centro.', 'Restaurante de cozinha brasileira e italiana na principal rua comercial do Centro.', 'A Brazilian and Italian restaurant on the historic centre’s main shopping street.'),
      t('Lo elegiría para sentarse entre dos visitas céntricas. Consulta la carta del día si buscas un almuerzo brasileño y pregunta por medias porciones si quieres seguir caminando sin una comida larga.', 'Eu escolheria para sentar entre duas visitas no Centro. Confira o cardápio do dia se quiser almoço brasileiro e pergunte por meias porções se pretende seguir sem uma refeição longa.', 'I’d stop here between downtown sights. Check the day’s menu for a Brazilian lunch and ask about smaller portions if you want to keep walking.'),
      t('Si vas al Museu Imperial antes o después, calcula la hora de admisión primero y deja la comida flexible. Sirve a grupos con preferencias distintas si todos encuentran algo en el menú.', 'Se for ao Museu Imperial antes ou depois, calcule primeiro o horário de entrada e deixe a refeição flexível. Serve a grupos com gostos diferentes se todos acharem algo no cardápio.', 'If visiting the Imperial Museum before or after, plan around last admission and keep lunch flexible. It can work for a group with different tastes if everyone finds something on the menu.'),
      t('Desde Rua da Imperatriz, camina hacia Rua do Imperador y verifica el número 700. Si llueve o alguien evita caminar, usa la dirección exacta para desembarcar.', 'Da Rua da Imperatriz, caminhe até a Rua do Imperador e confira o número 700. Na chuva ou se alguém evita caminhada, use o endereço exato para desembarque.', 'From Rua da Imperatriz, walk to Rua do Imperador and look for number 700. In rain or with someone avoiding a walk, use the exact address for drop-off.')),
  },
  'vida-nocturna': {},
};
