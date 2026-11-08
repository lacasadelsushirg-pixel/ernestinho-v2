import { t } from './modelo.js';

const petropolis = 'https://www.petropolis.rj.gov.br/';
const arraial = 'https://www.arraial.rj.gov.br/';
const angra = 'https://angra.rj.gov.br/calendariodeeventos';
const paraty = 'https://www.paraty.rj.gov.br/';
const festivalLula = 'https://calendariodeeventos.abihrj.com.br/municipio/arraial-do-cabo/festival-da-lula/';
const agendaArraial = 'https://calendariodeeventos.abihrj.com.br/municipio/arraial-do-cabo/';
const centro = 'Centro Histórico';
const rock = 'Rock the Mountain';
const cristal = 'Palácio de Cristal · Rua Alfredo Pachá';

const e = (name, organizer, start, end, location, official, source, description, attendance, returnTrip, options = {}) =>
  ({ name, organizer, start, end, location, official, source, description, attendance, returnTrip, ...options });

export const regionalEvents = {
  petropolis: [
    e('Natal Imperial', 'Prefeitura de Petrópolis', '2026-11-27', '2027-01-04', centro, petropolis,
      'https://calendariodeeventos.abihrj.com.br/municipio/petropolis/natal-imperial/',
      t('La programación navideña se reparte por el centro, con iluminación y actividades en distintos recintos.', 'A programação natalina se espalha pelo centro, com iluminação e atividades em diferentes espaços.', 'Christmas lights and activities take place at several venues around the historic centre.'),
      t('Elige la actividad y su recinto cuando salga la programación. Si viajas con niños, prioriza la primera función.', 'Escolha a atividade e o local quando sair a programação. Com crianças, prefira a primeira sessão.', 'Pick the activity and venue once the programme is out. With children, choose an earlier session.'),
      t('Si vuelves a otro barrio, acuerda un punto de encuentro fuera de las calles cerradas.', 'Se for voltar para outro bairro, combine um ponto fora das ruas interditadas.', 'If heading to another neighbourhood, choose a pickup point outside the road closures.'), { provisional: true }),
    e(rock, rock, '2026-10-30', '2026-11-08', 'Parque de Exposições · Estrada União e Indústria, 10.000, Itaipava',
      'https://www.rockthemountain.com.br/', 'https://app.rockthemountain.com.br/',
      t('Festival de música y arte con escenarios repartidos por el parque de exposiciones y puestos gastronómicos.', 'Festival de música e arte com palcos pelo parque de exposições e área de alimentação.', 'Music and art festival with stages throughout the exhibition grounds and a food area.'),
      t('La edición se divide en dos fines de semana: 30 de octubre–1 de noviembre y 6–8 de noviembre. Revisa el día de tu entrada y el escenario de cada artista.', 'A edição se divide em dois fins de semana: 30 de outubro–1º de novembro e 6–8 de novembro. Confira a data do ingresso e o palco de cada artista.', 'The edition runs on two weekends, October 30–November 1 and November 6–8. Check your ticket date and each artist’s stage.'),
      t('Reserva la vuelta a Itaipava, Petrópolis o Río antes del festival. Revisa la parada de salida si usas el traslado oficial.', 'Reserve a volta para Itaipava, Petrópolis ou Rio antes do festival. Confira o ponto de saída se usar o transfer oficial.', 'Book your ride back to Itaipava, Petrópolis or Rio before the festival. Check the departure point if using the official shuttle.'), { split: ['2026-11-01', '2026-11-06'] }),
    e('Serra Serata', 'Casa D’Italia Anita Garibaldi', '2026-09-16', '2026-09-20', cristal, petropolis,
      'https://aconteceempetropolis.com.br/2026/09/15/serra-serata-comeca-nesta-quarta-com-atividades-culturais-gratuitas-confira-a-programacao/',
      t('La fiesta italiana reúne cocina, música y danza en el Palácio de Cristal. Parte de los talleres de la edición se hizo en otros recintos.', 'A festa italiana reúne culinária, música e dança no Palácio de Cristal. Parte das oficinas da edição aconteceu em outros espaços.', 'The Italian festival brings food, music and dance to Palácio de Cristal. Some workshops took place at other venues.'),
      t('Para otra edición, consulta qué talleres necesitan inscripción y qué actividades se hacen fuera del palacio.', 'Em uma próxima edição, confira quais oficinas pedem inscrição e quais atividades são fora do palácio.', 'For a future edition, check which workshops need registration and which activities take place away from the palace.'),
      t('Si te alojas en el centro, vuelve por las calles principales. Para Itaipava, organiza la vuelta antes de quedarte al último espectáculo.', 'Se ficar no centro, volte pelas ruas principais. Para Itaipava, combine a volta antes de ficar para o último show.', 'If you are staying downtown, return along the main streets. For Itaipava, arrange your ride before staying for the last show.')),
    e('Bauernfest', 'Prefeitura de Petrópolis e Clube 29 de Junho', '2026-06-19', '2026-07-05', cristal,
      'https://clube29dejunho.org.br/bauernfest-2026/', 'https://agendaalema.org.br/AgendaDetalhe.aspx?codigo=429',
      t('La Fiesta del Colono Alemán celebra la historia de la inmigración en la sierra con desfiles, grupos de danza y cocina germánica.', 'A Festa do Colono Alemão celebra a história da imigração na serra com desfiles, grupos de dança e gastronomia germânica.', 'The German Settlers’ Festival celebrates the region’s immigrant history with parades, dance groups and German food.'),
      t('Para otra edición, mira el programa de desfiles antes de elegir la visita y reserva tiempo para recorrer el centro a pie.', 'Em uma próxima edição, consulte o programa de desfiles antes de escolher o dia e reserve tempo para andar pelo centro.', 'For a future edition, check the parade programme before picking a day and allow time to explore downtown on foot.'),
      t('Fija un punto de recogida fuera del perímetro del palacio si sales al cierre.', 'Combine um ponto de embarque fora do perímetro do palácio se sair no encerramento.', 'Choose a pickup point outside the palace perimeter if you leave at closing time.'), { photoKey: 'eventos' }),
  ],
  'arraial-do-cabo': [
    e('Festival de Frutos do Mar', 'Prefeitura de Arraial do Cabo', '2026-11-13', '2026-11-15', 'Arraial do Cabo', arraial,
      'https://abihrj.com.br/noticias/arraial-do-cabo-festival-de-frutos-do-mar-2026-chimarruts-chico-chico-nando-luiz-13-a-15-novembro',
      t('Festival de cocina marinera con restaurantes participantes y una agenda de música. El programa anunciado incluye a Chimarruts y Chico Chico.', 'Festival de cozinha do mar com restaurantes participantes e programação musical. A agenda anunciada inclui Chimarruts e Chico Chico.', 'Seafood festival featuring participating restaurants and live music. The announced programme includes Chimarruts and Chico Chico.'),
      t('Confirma el recinto de los conciertos y dónde sirve cada restaurante. Organiza las comidas y el show por separado.', 'Confira o local dos shows e onde cada restaurante atende. Planeje a refeição e o show separadamente.', 'Check the concert site and where each restaurant serves its dishes. Plan your meal and concert separately.'),
      t('Si vuelves a Cabo Frio, confirma el último servicio intermunicipal de esa noche o reserva el traslado antes del show.', 'Se voltar a Cabo Frio, confirme o último ônibus intermunicipal da noite ou reserve o traslado antes do show.', 'If returning to Cabo Frio, check the last intercity bus or book a ride before the show.')),
    e('Street Games', null, '2026-11', '', 'Arraial do Cabo', arraial, agendaArraial,
      t('Cita deportiva del calendario municipal. El recinto y el formato de inscripción se anuncian con la programación de la edición.', 'Evento esportivo do calendário municipal. Local e formato de inscrição são divulgados com a programação da edição.', 'A sporting event on the municipal calendar. The venue and registration details are announced with the edition programme.'),
      t('Antes de desplazarte, verifica la modalidad, el punto de encuentro y si la actividad acepta público sin inscripción.', 'Antes de sair, confira a modalidade, o ponto de encontro e se a atividade aceita público sem inscrição.', 'Before heading out, check the discipline, meeting point and whether spectators need to register.'),
      t('Organiza el regreso una vez confirmado el recinto, especialmente si estás alojado fuera del Centro.', 'Combine a volta depois da confirmação do local, especialmente se estiver hospedado fora do Centro.', 'Arrange your ride after the venue is announced, especially if staying outside the centre.'), { provisional: true }),
    e('Festival da Lagoa', null, '2026-12', '', 'Arraial do Cabo', arraial, agendaArraial,
      t('Evento del calendario turístico de diciembre. El anuncio mensual permite orientarse mientras se publica el programa.', 'Evento do calendário turístico de dezembro. O anúncio mensal orienta o planejamento até a publicação da programação.', 'A December tourism event. The month is listed on the calendar, with the detailed programme to follow.'),
      t('Consulta el punto exacto en la laguna y el acceso indicado por la Prefeitura antes de decidir desde dónde salir.', 'Consulte o ponto exato na lagoa e o acesso indicado pela Prefeitura antes de decidir de onde sair.', 'Check the exact lagoon location and municipal access directions before deciding where to depart from.'),
      t('Al confirmar el sitio, verifica también dónde se toma el transporte de vuelta y cuándo sale.', 'Ao confirmar o local, confira também onde pegar o transporte de volta e a hora de saída.', 'Once the site is confirmed, check where to catch your return transport and when it leaves.'), { provisional: true }),
    e('Festival da Lula', 'Prefeitura de Arraial do Cabo', '2026-04-02', '2026-04-05', 'Arraial do Cabo', arraial, festivalLula,
      t('Fiesta de Semana Santa centrada en el calamar y en las preparaciones de los cocineros locales.', 'Festa da Semana Santa dedicada à lula e aos preparos dos cozinheiros locais.', 'An Easter weekend festival centred on squid and dishes prepared by local cooks.'),
      t('En otra edición, verifica los locales participantes y si el programa incluye actuaciones en la noche que te interesa.', 'Em uma próxima edição, confira os locais participantes e se há shows na noite que interessa.', 'For a future edition, check participating venues and whether there are performances on the night you plan to go.'),
      t('Deja margen entre el último paseo de barco y la cena. Si duermes en Cabo Frio, organiza el regreso de la noche antes de salir.', 'Dê intervalo entre o último passeio de barco e o jantar. Se dormir em Cabo Frio, organize a volta antes de sair.', 'Allow time between the last boat trip and dinner. If staying in Cabo Frio, arrange your ride before leaving.')),
  ],
  'angra-ilha-grande': [
    e('Encontro de Teatro de Rua', 'Prefeitura de Angra dos Reis', '2026-11-11', '2026-11-21', t('Varios barrios de Angra', 'Diversos bairros de Angra', 'Several Angra neighbourhoods'), angra, angra,
      t('Encuentro de teatro con funciones distribuidas en distintos barrios del municipio.', 'Encontro de teatro com apresentações distribuídas por diferentes bairros do município.', 'Street theatre gathering with performances in several municipal neighbourhoods.'),
      t('Escoge la función por barrio y revisa si cambia de sitio en caso de lluvia.', 'Escolha a apresentação pelo bairro e confira se muda de local em caso de chuva.', 'Choose a performance by neighbourhood and check the wet-weather venue.'),
      t('Organiza la vuelta desde el barrio de la función. Si vas a dormir en Ilha Grande, verifica la última conexión marítima.', 'Planeje a volta a partir do bairro da apresentação. Se dormir na Ilha Grande, confira a última travessia.', 'Plan your trip back from the performance neighbourhood. If staying on Ilha Grande, check the last crossing.'), { provisional: true }),
    e('Dia do Samba', 'Prefeitura de Angra dos Reis', '2026-12-03', '2026-12-03', 'Praça Zumbi dos Palmares, Centro de Angra', angra, angra,
      t('La programación municipal del Día del Samba sitúa la celebración en la Praça Zumbi dos Palmares, en el Centro.', 'A programação municipal do Dia do Samba indica a Praça Zumbi dos Palmares, no Centro, como local da comemoração.', 'Angra’s municipal calendar lists Praça Zumbi dos Palmares downtown as the venue for its Samba Day celebration.'),
      t('Revisa la hora de comienzo y la lista de grupos cuando salga la agenda de la plaza.', 'Confira o horário de início e os grupos quando sair a programação da praça.', 'Check the start time and performers when the square’s programme is released.'),
      t('Si sales tarde, elige con antelación un punto de recogida fuera de la plaza.', 'Se sair tarde, escolha com antecedência um ponto de embarque fora da praça.', 'If leaving late, choose a pickup point away from the square ahead of time.'), { provisional: true }),
    e('Festa de Nossa Senhora da Conceição', null, '2026-12-08', '2026-12-08', 'Centro de Angra', angra, angra,
      t('Celebración religiosa del centro de Angra en honor a Nossa Senhora da Conceição.', 'Celebração religiosa no Centro de Angra em homenagem a Nossa Senhora da Conceição.', 'A religious celebration in central Angra in honour of Our Lady of the Immaculate Conception.'),
      t('Consulta el recorrido, el templo y los horarios antes de elegir dónde acompañar la celebración.', 'Consulte o percurso, a igreja e os horários antes de escolher onde acompanhar a celebração.', 'Check the route, church and schedule before choosing where to join the celebration.'),
      t('Cuenta con desvíos en el Centro y confirma si cambian las paradas de tu línea.', 'Considere desvios no Centro e confira se os pontos da sua linha mudam.', 'Allow for detours downtown and check if your bus stops are affected.'), { provisional: true }),
    e('Festival de Música e Ecologia da Ilha Grande', 'Prefeitura de Angra dos Reis', '2026-07-03', '2026-07-05', 'Vila do Abraão, Ilha Grande', angra, angra,
      t('El festival reúne música y actividades relacionadas con el ambiente de Ilha Grande en su principal villa.', 'O festival reúne música e atividades ligadas ao ambiente da Ilha Grande na vila principal.', 'The festival brings music and activities linked to the island’s natural environment to its main village.'),
      t('Para otra edición, revisa el escenario de cada actividad y confirma tu travesía a Abraão.', 'Em uma próxima edição, confira onde fica cada atividade e confirme a travessia até o Abraão.', 'For a future edition, check where each activity takes place and confirm your crossing to Abraão.'),
      t('Si te quedas a los shows de la noche, alojarte en Abraão permite regresar a pie.', 'Se ficar para os shows da noite, hospedar-se no Abraão permite voltar a pé.', 'If staying for the evening shows, booking accommodation in Abraão lets you walk back.')),
  ],
  paraty: [
    e('Encontro da Cultura Negra', 'Quilombo do Campinho da Independência', '2026-11-20', '2026-11-22', 'Quilombo do Campinho da Independência', paraty,
      'https://www.guiadeparaty.net/pt/eventos/encontro-da-cultura-negra',
      t('Encuentro quilombola con música, jongo y conversaciones sobre la cultura afrobrasileña.', 'Encontro quilombola com música, jongo e rodas de conversa sobre a cultura afro-brasileira.', 'Quilombola gathering with music, jongo and discussions on Afro-Brazilian culture.'),
      t('Consulta el programa comunitario y confirma dónde dejan a los visitantes que llegan desde el Centro de Paraty.', 'Consulte a programação comunitária e confira o desembarque de quem vem do Centro de Paraty.', 'Check the community programme and the drop-off point for visitors coming from central Paraty.'),
      t('Acuerda la recogida en Campinho antes de quedarte a una actividad nocturna.', 'Combine a volta no Campinho antes de ficar para uma atividade noturna.', 'Arrange your pickup in Campinho before staying for an evening activity.'), { provisional: true }),
    e('Gastronomia do Mar Sesc', 'Sesc RJ', '2026-12-04', '2026-12-06', 'Paraty', 'https://www.sescrio.org.br/',
      'https://paraty.com.br/calendario-turistico-e-cultural-2026/',
      t('Encuentro gastronómico dedicado a los ingredientes del mar y a la cocina del litoral.', 'Encontro gastronômico dedicado aos ingredientes do mar e à cozinha do litoral.', 'Food event devoted to seafood ingredients and coastal cooking.'),
      t('Confirma la sede de cada actividad y si las degustaciones u oficinas requieren inscripción.', 'Confirme o local de cada atividade e se degustações ou oficinas pedem inscrição.', 'Confirm each venue and whether tastings or workshops require registration.'),
      t('Organiza la vuelta según la sede anunciada. Si vas a Trindade, verifica el último servicio antes de la cena.', 'Planeje a volta conforme o local anunciado. Para Trindade, confira o último serviço antes do jantar.', 'Plan your return once the venue is announced. For Trindade, check the last service before dinner.'), { provisional: true }),
    e('Festa Literária Internacional de Paraty · Flip', 'Associação Casa Azul', '2026-07-22', '2026-07-26', centro,
      'https://www.flip.org.br/', 'https://paraty.com.br/calendario-turistico-e-cultural-2026/',
      t('La Flip reúne mesas literarias y actividades en distintas casas y espacios del Centro Histórico.', 'A Flip reúne mesas literárias e atividades em diferentes casas e espaços do Centro Histórico.', 'Flip brings literary panels and activities to venues around the historic centre.'),
      t('En una próxima edición, separa las mesas con entrada de las actividades abiertas y deja tiempo para ir a pie entre sedes.', 'Em uma próxima edição, separe as mesas com ingresso das atividades abertas e reserve tempo para caminhar entre os locais.', 'For a future edition, separate ticketed talks from open activities and leave time to walk between venues.'),
      t('Si te alojas fuera del casco histórico, acuerda el punto de recogida por fuera de la zona peatonal.', 'Se ficar fora do Centro Histórico, combine um ponto de embarque fora da área de pedestres.', 'If staying outside the old town, arrange a pickup point outside the pedestrian area.')),
    e('Festival da Cachaça, Cultura e Sabores', 'Prefeitura de Paraty e Associação dos Produtores e Amigos da Cachaça de Paraty', '2026-08-20', '2026-08-23', 'Paraty', paraty,
      'https://odia.ig.com.br/paraty/2026/08/7293783-paraty-celebra-44-festival-da-cachaca-com-tradicao-e-sabor.html',
      t('Productores locales presentan las cachaças de sus alambiques y la programación incluye cocina y música.', 'Produtores locais apresentam as cachaças dos seus alambiques e a programação inclui culinária e música.', 'Local producers showcase cachaça from their distilleries alongside food and music.'),
      t('En una próxima edición, verifica los horarios de degustación y qué productores estarán en cada jornada.', 'Em uma próxima edição, confira os horários de degustação e quais produtores estarão em cada dia.', 'For a future edition, check tasting hours and which distilleries will be there each day.'),
      t('Si planeas degustar, organiza la vuelta a pie o deja reservado un traslado.', 'Se for degustar, planeje voltar a pé ou deixe um traslado reservado.', 'If you plan to taste, arrange to walk back or book a ride in advance.')),
  ],
};
