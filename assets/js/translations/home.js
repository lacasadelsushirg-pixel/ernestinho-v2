import { registerTranslations, getLanguage, onLanguageChange } from "../i18n.js";
const ES={
 title:"Ernestinho Carioca | Río no se visita. Se vive.","hero.line1":"Río no se visita.","hero.line2":"Se vive.","hero.lead":"Mi guía para descubrir Río como lo vivo yo: qué hacer hoy, cómo moverte, dónde quedarte y experiencias que realmente vas a recordar.","hero.cta":"DESCUBRIR RÍO",
 "intro.kicker":"MI RÍO, A TU MANERA","intro.title":"¿Por dónde quieres empezar?","intro.copy":"No quiero darte una lista infinita. Quiero ayudarte a encontrar el Río que encaja contigo.",
 "today.kicker":"AQUÍ · AHORA","today.title":"¿Qué hago hoy?","today.copy":"Ideas según el momento del día, el clima, tu energía, accesibilidad y dónde estás.","today.cta":"VER QUÉ HACER AHORA","live.kicker":"RÍO EN VIVO","live.title":"Tiempo, viento y mar en Río","live.copy":"Consulta temperatura, viento y mar; revisa las mareas estimadas y abre cámaras de varios puntos de la ciudad.","live.cta":"ABRIR RÍO EN VIVO →",
 "experiences.kicker":"EXPERIENCIAS","experiences.title":"De descubrir Río a vivirlo.","experiences.copy":"Vive Río de la mano de un equipo apasionado por mostrarte lo mejor de la Ciudad Maravillosa. Junto a mi equipo de guías y operadores locales, te ayudamos a transformar el viaje en experiencias que realmente vas a recordar.",
 "shopping.kicker":"COMPRAS","shopping.title":"Mucho más que shoppings.","shopping.copy":"Centros comerciales, ferias y mercados para combinar con tu recorrido por la ciudad.","footer.slogan":"Río no se visita. Se vive.","footer.note":"Guía independiente de Río de Janeiro.","home.explore":"EXPLORAR",
 "door.guia-de-rio.title":"Guía de Río","door.guia-de-rio.copy":"Todo lo práctico para preparar tu viaje.","door.transportes.title":"Transportes","door.transportes.copy":"Muévete por Río con más claridad.","door.hospedaje.title":"Hospedaje","door.hospedaje.copy":"Mis opciones y zonas para quedarte.","door.fotografia.title":"Fotografía","door.fotografia.copy":"Llévate algo más que recuerdos.","door.compras.title":"Compras","door.compras.copy":"Shoppings, ferias y mercados.","door.barrios.title":"Barrios","door.barrios.copy":"Entiende Río barrio por barrio.","door.eventos.title":"Eventos","door.eventos.copy":"Lo que está pasando en la ciudad.","door.experiencias.title":"Experiencias","door.experiencias.copy":"Vive Río con mi equipo local.","door.playas.title":"Playas","door.playas.copy":"Encuentra tu playa y tu momento.","door.vida-nocturna.title":"Vida Nocturna","door.vida-nocturna.copy":"Samba, música y noches cariocas.","door.gastronomia.title":"Gastronomía","door.gastronomia.copy":"Dónde comer según tu momento.","door.atracciones.title":"Atracciones","door.atracciones.copy":"Los clásicos y lo que hay detrás.","door.familia.title":"Familia","door.familia.copy":"Río también con niños y familia.","door.cafe-rio.title":"Café Río","door.cafe-rio.copy":"Paradas para bajar el ritmo.","door.consejos.title":"Consejos","door.consejos.copy":"Lo que me gustaría que supieras antes.","door.naturaleza.title":"Naturaleza","door.naturaleza.copy":"Te cuento cómo vivir Río entre sus miradores y paisajes verdes.",
 "experience.full-day-rio.copy":"Una jornada para entender la ciudad y llevarte sus grandes postales.","experience.angra-ilha-grande.copy":"Mar, islas y un día para cambiar el ritmo.","experience.arraial-do-cabo.copy":"Aguas claras y paisajes que parecen otra costa.","experience.buzios.copy":"Costa, paseo y otro ritmo fuera de Río.","experience.rio-samba-bus.copy":"City tour panorámico musical con libertad para subir y bajar.","experience.carnaval-experience.copy":"Historia, fantasías, samba y bastidores del carnaval carioca.","experience.pequena-africa.copy":"Memoria afrobrasileña por la Zona Portuaria de Río.",
 "shop.barrashopping.copy":"Servicios, conexiones y una de las mayores opciones de Barra.","shop.shopping-leblon.copy":"Zona Sul y una parada fácil de combinar con Leblon.","shop.saara.copy":"Comercio popular, calles llenas de movimiento y otro Río."
};
const PT={
 title:"Ernestinho Carioca | O Rio não se visita. Se vive.","hero.line1":"O Rio não se visita.","hero.line2":"Se vive.","hero.lead":"Meu guia para descobrir o Rio como eu vivo: o que fazer hoje, como se locomover, onde ficar e experiências que você vai lembrar.","hero.cta":"DESCUBRA O RIO",
 "intro.kicker":"MEU RIO, DO SEU JEITO","intro.title":"Por onde você quer começar?","intro.copy":"Não quero entregar uma lista infinita. Quero ajudar você a encontrar o Rio que combina com a sua viagem.",
 "today.kicker":"AQUI · AGORA","today.title":"O que fazer hoje?","today.copy":"Ideias de acordo com o horário, o clima, seu ritmo, suas necessidades de acessibilidade e onde você está.","today.cta":"VEJA O QUE FAZER AGORA","live.kicker":"RIO AO VIVO","live.title":"Tempo, vento e mar no Rio","live.copy":"Acompanhe a temperatura, o vento e as condições do mar, consulte a previsão das marés e veja câmeras ao vivo de diferentes pontos da cidade.","live.cta":"ABRIR RIO AO VIVO →",
 "experiences.kicker":"EXPERIÊNCIAS","experiences.title":"De descobrir o Rio a viver o Rio.","experiences.copy":"Viva o Rio com uma equipe apaixonada por mostrar o melhor da Cidade Maravilhosa. Com meus guias e operadores locais, transformamos a viagem em experiências que você vai lembrar.",
 "shopping.kicker":"COMPRAS","shopping.title":"Muito além dos shoppings.","shopping.copy":"Shoppings, feiras e mercados para incluir no seu roteiro pela cidade.","footer.slogan":"O Rio não se visita. Se vive.","footer.note":"Guia independente do Rio de Janeiro.","home.explore":"EXPLORAR",
 "door.guia-de-rio.title":"Guia do Rio","door.guia-de-rio.copy":"Informações práticas para preparar sua viagem.","door.transportes.title":"Transportes","door.transportes.copy":"Circule pelo Rio com mais clareza e tranquilidade.","door.hospedaje.title":"Hospedagem","door.hospedaje.copy":"Minhas sugestões e regiões para se hospedar.","door.fotografia.title":"Fotografia","door.fotografia.copy":"Leve mais do que lembranças.","door.compras.title":"Compras","door.compras.copy":"Shoppings, feiras e mercados.","door.barrios.title":"Bairros","door.barrios.copy":"Conheça o Rio bairro a bairro.","door.eventos.title":"Eventos","door.eventos.copy":"O que está acontecendo na cidade.","door.experiencias.title":"Experiências","door.experiencias.copy":"Viva o Rio com minha equipe local.","door.playas.title":"Praias","door.playas.copy":"Encontre sua praia e seu momento.","door.vida-nocturna.title":"Vida Noturna","door.vida-nocturna.copy":"Samba, música e noites cariocas.","door.gastronomia.title":"Gastronomia","door.gastronomia.copy":"Onde comer de acordo com o seu momento.","door.atracciones.title":"Atrações","door.atracciones.copy":"Os clássicos e o que existe por trás deles.","door.familia.title":"Família","door.familia.copy":"O Rio também para crianças e famílias.","door.cafe-rio.title":"Café Rio","door.cafe-rio.copy":"Paradas para desacelerar.","door.consejos.title":"Dicas","door.consejos.copy":"O que eu gostaria que você soubesse antes de vir.","door.naturaleza.title":"Natureza","door.naturaleza.copy":"Eu te mostro o Rio entre mirantes e paisagens verdes.",
 "experience.full-day-rio.copy":"Um dia para conhecer a cidade e ver de perto seus principais cartões-postais.","experience.angra-ilha-grande.copy":"Mar, ilhas e um dia para mudar o ritmo.","experience.arraial-do-cabo.copy":"Águas cristalinas e paisagens que parecem de outra costa.","experience.buzios.copy":"Litoral, passeio e outro ritmo fora do Rio.","experience.rio-samba-bus.copy":"City tour musical panorâmico com liberdade para subir e descer.","experience.carnaval-experience.copy":"História, fantasias, samba e bastidores do carnaval carioca.","experience.pequena-africa.copy":"Memória afro-brasileira pela Zona Portuária do Rio.",
 "shop.barrashopping.copy":"Serviços, conexões e uma das maiores opções de compras da Barra.","shop.shopping-leblon.copy":"Zona Sul e uma parada fácil de combinar com o Leblon.","shop.saara.copy":"Comércio popular, ruas movimentadas e um outro Rio."
};
const EN={
 title:"Ernestinho Carioca | Rio is lived, not just visited.","hero.line1":"Rio is more than a place to visit.","hero.line2":"Come live it.","hero.lead":"My guide to experiencing Rio as I do: what to do today, how to get around, where to stay and experiences worth remembering.","hero.cta":"DISCOVER RIO",
 "intro.kicker":"MY RIO, YOUR WAY","intro.title":"Where would you like to start?","intro.copy":"I do not want to give you an endless list. I want to help you find the Rio that feels right for your trip.",
 "today.kicker":"HERE · NOW","today.title":"What should I do today?","today.copy":"Ideas based on the time of day, weather, your pace, accessibility needs and where you are.","today.cta":"SEE WHAT TO DO NOW","live.kicker":"RIO LIVE","live.title":"Weather, wind and sea in Rio","live.copy":"Check temperatures, wind and sea conditions, tide forecasts, and live cameras from different parts of the city.","live.cta":"OPEN RIO LIVE →",
 "experiences.kicker":"EXPERIENCES","experiences.title":"Go from discovering Rio to living it.","experiences.copy":"Experience Rio with a team passionate about showing you the best of the Marvelous City. My local guides and operators help turn your trip into memories that stay with you.",
 "shopping.kicker":"SHOPPING","shopping.title":"More than shopping malls.","shopping.copy":"Shopping malls, street fairs and markets to add to your plans around the city.","footer.slogan":"Rio is lived, not just visited.","footer.note":"An independent guide to Rio de Janeiro.","home.explore":"EXPLORE",
 "door.guia-de-rio.title":"Rio Guide","door.guia-de-rio.copy":"Practical information to help you prepare for your trip.","door.transportes.title":"Getting Around","door.transportes.copy":"Get around Rio with more confidence.","door.hospedaje.title":"Places to Stay","door.hospedaje.copy":"My accommodation picks and the best areas to stay.","door.fotografia.title":"Photography","door.fotografia.copy":"Take home more than memories.","door.compras.title":"Shopping","door.compras.copy":"Malls, street fairs and markets.","door.barrios.title":"Neighborhoods","door.barrios.copy":"Get to know Rio one neighborhood at a time.","door.eventos.title":"Events","door.eventos.copy":"What is happening around the city.","door.experiencias.title":"Experiences","door.experiencias.copy":"Experience Rio with my local team.","door.playas.title":"Beaches","door.playas.copy":"Find a beach and a moment that feel right.","door.vida-nocturna.title":"Nightlife","door.vida-nocturna.copy":"Samba, music and nights in Rio.","door.gastronomia.title":"Food","door.gastronomia.copy":"Where to eat, whatever you’re in the mood for.","door.atracciones.title":"Attractions","door.atracciones.copy":"The classics and the stories behind them.","door.familia.title":"Family","door.familia.copy":"Rio for children and families, too.","door.cafe-rio.title":"Rio Cafés","door.cafe-rio.copy":"Places to slow down for a while.","door.consejos.title":"Tips","door.consejos.copy":"Things I wish you knew before you arrived.","door.naturaleza.title":"Nature","door.naturaleza.copy":"I’ll show you Rio through its viewpoints and green landscapes.",
 "experience.full-day-rio.copy":"A day to get to know the city and see its best-known sights.","experience.angra-ilha-grande.copy":"Sea, islands and a day at a different pace.","experience.arraial-do-cabo.copy":"Clear waters and coastal scenery that feel a world away.","experience.buzios.copy":"Coastal views, a day out and a different pace beyond Rio.","experience.rio-samba-bus.copy":"A musical panoramic city tour with the freedom to hop on and off.","experience.carnaval-experience.copy":"History, costumes, samba and a look behind the scenes of Rio’s Carnival.","experience.pequena-africa.copy":"Afro-Brazilian heritage across Rio’s Port Zone.",
 "shop.barrashopping.copy":"Services, connections and one of Barra’s largest shopping options.","shop.shopping-leblon.copy":"A Zona Sul stop that pairs easily with Leblon.","shop.saara.copy":"Popular shopping, lively streets and another side of Rio."
};

const FR={
  "title": "Ernestinho Carioca | Rio ne se visite pas. Il se vit.",
  "hero.line1": "Rio ne se visite pas.",
  "hero.line2": "Il se vit.",
  "hero.lead": "Mon guide pour découvrir Rio comme je le vis : que faire aujourd’hui, comment se déplacer, où séjourner et quelles expériences vous laisseront de vrais souvenirs.",
  "hero.cta": "DÉCOUVRIR RIO",
  "intro.kicker": "MON RIO, À VOTRE FAÇON",
  "intro.title": "Par quoi voulez-vous commencer ?",
  "intro.copy": "Je ne veux pas vous noyer dans une liste interminable. Je veux vous aider à trouver le Rio qui vous ressemble.",
  "today.kicker": "ICI · MAINTENANT",
  "today.title": "Que faire aujourd’hui ?",
  "today.copy": "Des idées selon l’heure, la météo, votre rythme, vos besoins d’accessibilité et l’endroit où vous vous trouvez.",
  "today.cta": "VOIR QUOI FAIRE MAINTENANT",
  "live.kicker": "RIO EN DIRECT",
  "live.title": "Météo, vent et état de la mer à Rio",
  "live.copy": "Consultez les températures, le vent, l’état de la mer et les marées prévues. Accédez aux caméras de plusieurs quartiers de la ville.",
  "live.cta": "OUVRIR RIO EN DIRECT →",
  "experiences.kicker": "EXPÉRIENCES",
  "experiences.title": "De la découverte de Rio à la vie carioca.",
  "experiences.copy": "Découvrez Rio avec une équipe passionnée qui vous fait partager le meilleur de la Ville merveilleuse. Avec mes guides et partenaires locaux, votre voyage devient une expérience dont vous vous souviendrez.",
  "shopping.kicker": "SHOPPING",
  "shopping.title": "Bien plus que des centres commerciaux.",
  "shopping.copy": "Centres commerciaux, marchés et foires à intégrer facilement à votre itinéraire.",
  "footer.slogan": "Rio ne se visite pas. Il se vit.",
  "footer.note": "Guide indépendant de Rio de Janeiro.",
  "home.explore": "EXPLORER",
  "door.guia-de-rio.title": "Guide de Rio",
  "door.guia-de-rio.copy": "Tout ce qu’il faut savoir pour préparer votre voyage.",
  "door.transportes.title": "Transports",
  "door.transportes.copy": "Se déplacer à Rio en toute simplicité.",
  "door.hospedaje.title": "Hébergement",
  "door.hospedaje.copy": "Mes conseils et les meilleurs quartiers où séjourner.",
  "door.fotografia.title": "Photographie",
  "door.fotografia.copy": "Repartez avec bien plus que des souvenirs.",
  "door.compras.title": "Shopping",
  "door.compras.copy": "Centres commerciaux, marchés et foires.",
  "door.barrios.title": "Quartiers",
  "door.barrios.copy": "Découvrez Rio quartier par quartier.",
  "door.eventos.title": "Événements",
  "door.eventos.copy": "Ce qui se passe en ce moment dans la ville.",
  "door.experiencias.title": "Expériences",
  "door.experiencias.copy": "Vivez Rio avec mon équipe locale.",
  "door.playas.title": "Plages",
  "door.playas.copy": "Trouvez la plage et le moment qui vous conviennent.",
  "door.vida-nocturna.title": "Vie nocturne",
  "door.vida-nocturna.copy": "Samba, musique et nuits cariocas.",
  "door.gastronomia.title": "Gastronomie",
  "door.gastronomia.copy": "Où manger selon vos envies.",
  "door.arte-y-cultura.title": "Arts et culture",
  "door.arte-y-cultura.copy": "Musées, théâtres, centres culturels, bibliothèques, forts et églises.",
  "door.atracciones.title": "Sites incontournables",
  "door.atracciones.copy": "Les grands classiques et ce qui se cache derrière.",
  "door.familia.title": "En famille",
  "door.familia.copy": "Rio aussi avec les enfants et toute la famille.",
  "door.cafe-rio.title": "Café Rio",
  "door.cafe-rio.copy": "Des haltes pour prendre le temps.",
  "door.consejos.title": "Conseils",
  "door.consejos.copy": "Ce que j’aurais aimé que vous sachiez avant de venir.",
  "door.naturaleza.title": "Nature",
  "door.naturaleza.copy": "Je vous emmène entre les belvédères et les paysages verdoyants de Rio.",
  "experience.full-day-rio.title": "Full Day Rio",
  "experience.full-day-rio.copy": "Une journée pour comprendre la ville et découvrir ses panoramas emblématiques.",
  "experience.vuelo-en-parapente.title": "Vol en parapente",
  "experience.vuelo-en-parapente.copy": "Départ du Parque da Cidade, à Niterói, sous réserve des conditions de vent.",
  "experience.un-dia-de-partido-en-maracana.title": "Une journée de match au Maracanã",
  "experience.un-dia-de-partido-en-maracana.copy": "Vivez le football carioca avec un accompagnement et une logistique bien organisés.",
  "experience.carnaval-experience.title": "Carnaval Experience",
  "experience.carnaval-experience.copy": "Histoire, costumes, samba et coulisses du carnaval carioca.",
  "experience.rio-samba-bus.title": "Rio Samba Bus",
  "experience.rio-samba-bus.copy": "Un circuit panoramique musical où vous montez et descendez à votre rythme.",
  "experience.arraial-do-cabo.title": "Arraial do Cabo",
  "experience.arraial-do-cabo.copy": "Des eaux cristallines et des paysages qui semblent venir d’une autre côte.",
  "experience.angra-dos-reis.title": "Angra dos Reis",
  "experience.angra-dos-reis.copy": "Des îles, une croisière et des plages pour une journée complète.",
  "experience.angra-ilha-grande.copy": "La mer, les îles et une journée pour changer de rythme.",
  "experience.buzios.copy": "Le littoral, une escapade et un autre rythme loin de Rio.",
  "experience.pequena-africa.copy": "La mémoire afro-brésilienne au cœur de la zone portuaire de Rio.",
  "shop.barrashopping.title": "BarraShopping",
  "shop.barrashopping.copy": "Services, connexions et l’un des plus grands choix de commerces de Barra.",
  "shop.shopping-leblon.title": "Shopping Leblon",
  "shop.shopping-leblon.copy": "Une adresse de la Zona Sul facile à associer à une promenade à Leblon.",
  "shop.saara.title": "SAARA",
  "shop.saara.copy": "Commerces populaires, rues animées et une autre facette de Rio.",
  "buzios.kicker": "UNE AUTRE DESTINATION AVEC ERNESTINHO",
  "buzios.title": "BÚZIOS",
  "buzios.copy": "Un autre rythme, une autre côte. Plages, expériences, hébergements et conseils pour profiter de Búzios comme d’une vraie destination, pas seulement lors d’une excursion depuis Rio.",
  "buzios.cta": "DÉCOUVRIR BÚZIOS",
  "home.highlights.label": "Rio en direct, Ernestinho à la télévision et événements",
  "home.media.kicker": "ÉMISSIONS ET INTERVIEWS",
  "home.media.title": "Ernestinho à la télévision",
  "home.media.copy": "Les liens d’origine vers les émissions, interviews et reportages au Chili et en Argentine.",
  "home.media.cta": "VOIR LES ÉMISSIONS →",
  "home.media.alt": "Ernestinho lors d’un passage à la télévision",
  "home.events.kicker": "AGENDA DE RIO",
  "home.events.title": "Événements",
  "home.events.copy": "Fêtes, festivals et rendez-vous à ajouter à votre séjour.",
  "home.events.cta": "VOIR LES ÉVÉNEMENTS →",
  "home.events.alt": "Événements à Rio de Janeiro"
};
Object.assign(ES, {
  "door.arte-y-cultura.title": "Arte y Cultura",
  "door.arte-y-cultura.copy": "Museos, teatros, centros culturales, bibliotecas, fuertes e iglesias.",
  "experience.full-day-rio.title": "Full Day Río",
  "experience.vuelo-en-parapente.title": "Vuelo en parapente",
  "experience.vuelo-en-parapente.copy": "Parapente desde Parque da Cidade, Niterói, sujeto a las condiciones del viento.",
  "experience.un-dia-de-partido-en-maracana.title": "Un día de partido en Maracaná",
  "experience.un-dia-de-partido-en-maracana.copy": "Vive el fútbol carioca con acompañamiento y logística organizada.",
  "experience.carnaval-experience.title": "Carnaval Experience",
  "experience.rio-samba-bus.title": "Rio Samba Bus",
  "experience.arraial-do-cabo.title": "Arraial do Cabo",
  "experience.angra-dos-reis.title": "Angra dos Reis",
  "experience.angra-dos-reis.copy": "Islas, navegación y playas en un día completo.",
  "shop.barrashopping.title": "BarraShopping",
  "shop.shopping-leblon.title": "Shopping Leblon",
  "shop.saara.title": "SAARA"
});
Object.assign(PT, {
  "door.arte-y-cultura.title": "Arte e Cultura",
  "door.arte-y-cultura.copy": "Museus, teatros, centros culturais, bibliotecas, fortes e igrejas.",
  "experience.full-day-rio.title": "Full Day Rio",
  "experience.vuelo-en-parapente.title": "Voo de parapente",
  "experience.vuelo-en-parapente.copy": "Parapente a partir do Parque da Cidade, Niterói, sujeito às condições do vento.",
  "experience.un-dia-de-partido-en-maracana.title": "Um dia de jogo no Maracanã",
  "experience.un-dia-de-partido-en-maracana.copy": "Viva o futebol carioca com acompanhamento e logística organizada.",
  "experience.carnaval-experience.title": "Carnaval Experience",
  "experience.rio-samba-bus.title": "Rio Samba Bus",
  "experience.arraial-do-cabo.title": "Arraial do Cabo",
  "experience.angra-dos-reis.title": "Angra dos Reis",
  "experience.angra-dos-reis.copy": "Ilhas, navegação e praias em um dia completo.",
  "shop.barrashopping.title": "BarraShopping",
  "shop.shopping-leblon.title": "Shopping Leblon",
  "shop.saara.title": "SAARA"
});
Object.assign(EN, {
  "door.arte-y-cultura.title": "Art and Culture",
  "door.arte-y-cultura.copy": "Museums, theaters, cultural centers, libraries, forts and churches.",
  "experience.full-day-rio.title": "Full Day Rio",
  "experience.vuelo-en-parapente.title": "Paragliding flight",
  "experience.vuelo-en-parapente.copy": "Paragliding from Parque da Cidade, Niterói, subject to wind conditions.",
  "experience.un-dia-de-partido-en-maracana.title": "A match day at Maracanã",
  "experience.un-dia-de-partido-en-maracana.copy": "Experience Rio football with support and organized logistics.",
  "experience.carnaval-experience.title": "Carnaval Experience",
  "experience.rio-samba-bus.title": "Rio Samba Bus",
  "experience.arraial-do-cabo.title": "Arraial do Cabo",
  "experience.angra-dos-reis.title": "Angra dos Reis",
  "experience.angra-dos-reis.copy": "Islands, sailing and beaches in a full day.",
  "shop.barrashopping.title": "BarraShopping",
  "shop.shopping-leblon.title": "Shopping Leblon",
  "shop.saara.title": "SAARA"
});
Object.assign(ES, {
  "buzios.kicker":"SEGUNDO NÚCLEO ERNESTINHO",
  "buzios.title":"BÚZIOS",
  "buzios.copy":"Otro ritmo. Otro mar. Playas, experiencias, alojamiento y todo lo que necesitas para vivir Búzios como destino, no solamente como una excursión desde Río.",
  "buzios.cta":"DESCUBRIR BÚZIOS"
});
Object.assign(PT, {
  "buzios.kicker":"OUTRO DESTINO COM ERNESTINHO",
  "buzios.title":"BÚZIOS",
  "buzios.copy":"Outro ritmo. Outro mar. Praias, experiências, hospedagem e tudo o que você precisa para viver Búzios como destino, não apenas como um passeio saindo do Rio.",
  "buzios.cta":"DESCOBRIR BÚZIOS"
});
Object.assign(EN, {
  "buzios.kicker":"ANOTHER DESTINATION WITH ERNESTINHO",
  "buzios.title":"BÚZIOS",
  "buzios.copy":"A different rhythm. A different sea. Beaches, experiences, places to stay and everything you need to experience Búzios as a destination—not only as a day trip from Rio.",
  "buzios.cta":"DISCOVER BÚZIOS"
});
Object.assign(ES, {
 "home.highlights.label":"Río en vivo, Ernestinho en TV y eventos",
 "home.media.kicker":"APARICIONES Y PROGRAMAS","home.media.title":"Ernestinho en TV","home.media.copy":"Enlaces originales a programas, entrevistas y coberturas en Chile y Argentina.","home.media.cta":"VER APARICIONES →","home.media.alt":"Ernestinho durante una aparición en televisión",
 "home.events.kicker":"AGENDA DE RÍO","home.events.title":"Eventos","home.events.copy":"Fiestas, festivales y encuentros para sumar a tu viaje.","home.events.cta":"VER EVENTOS →","home.events.alt":"Eventos de Río de Janeiro"
});
Object.assign(PT, {
 "home.highlights.label":"Rio ao vivo, Ernestinho na TV e eventos",
 "home.media.kicker":"PARTICIPAÇÕES E PROGRAMAS","home.media.title":"Ernestinho na TV","home.media.copy":"Links originais para programas, entrevistas e reportagens no Chile e na Argentina.","home.media.cta":"VER PARTICIPAÇÕES →","home.media.alt":"Ernestinho durante uma participação na televisão",
 "home.events.kicker":"AGENDA DO RIO","home.events.title":"Eventos","home.events.copy":"Festas, festivais e encontros para incluir na sua viagem.","home.events.cta":"VER EVENTOS →","home.events.alt":"Eventos do Rio de Janeiro"
});
Object.assign(EN, {
 "home.highlights.label":"Rio live, Ernestinho on TV and events",
 "home.media.kicker":"MEDIA APPEARANCES","home.media.title":"Ernestinho on TV","home.media.copy":"Original links to TV programs, interviews and coverage in Chile and Argentina.","home.media.cta":"SEE APPEARANCES →","home.media.alt":"Ernestinho during a television appearance",
 "home.events.kicker":"RIO EVENTS","home.events.title":"Events","home.events.copy":"Parties, festivals and gatherings to add to your trip.","home.events.cta":"SEE EVENTS →","home.events.alt":"Events in Rio de Janeiro"
});
document.documentElement.dataset.i18nModule = "home";
registerTranslations("home", { ES, PT, EN, FR });
const localizeBuziosImage=language=>{const image=document.querySelector('.home-buzios-media img');if(image){const alt={ES:'Costa de Búzios',PT:'Litoral de Búzios',EN:'Búzios coastline'}[language];image.alt=alt;image.dataset.ecAlt=alt;}};
localizeBuziosImage(getLanguage());
onLanguageChange(localizeBuziosImage);
