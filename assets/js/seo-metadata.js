import ATTRACTION_SEO from './attraction-seo.js';
// Controlled on-page plan: metadata only. Editorial HTML remains unchanged.
import { routeParts } from './locale-routing.js';
export const SEO_METADATA = {
  "/naturaleza/": {
    ES: ["Naturaleza en Río: miradores, parques y trilhas | Ernestinho Carioca", "Te acompaño por la naturaleza de Río: miradores, parques, trilhas, cascadas y el Parque Estadual da Pedra Branca, con consejos para planificar cada salida."],
    PT: ["Natureza no Rio: mirantes, parques e trilhas | Ernestinho Carioca", "Acompanho você pela natureza do Rio: mirantes, parques, trilhas, cachoeiras e o Parque Estadual da Pedra Branca, com dicas para planejar cada passeio."],
    EN: ["Nature in Rio: viewpoints, parks and trails | Ernestinho Carioca", "I’ll guide you through Rio’s natural side: viewpoints, parks, trails, waterfalls and Pedra Branca State Park, with tips to plan each outing."]
  },
  "/naturaleza/bico-papagaio/": {
    ES: ["Bico do Papagaio | Ernestinho Carioca", "Bico do Papagaio forma parte de los destacados del tramo 12, entre Bom Retiro y el Centro de Visitantes del Parque Nacional da Tijuca."],
    PT: ["Bico do Papagaio | Ernestinho Carioca", "Bico do Papagaio está entre os destaques do trecho 12, entre Bom Retiro e o Centro de Visitantes do Parque Nacional da Tijuca."],
    EN: ["Bico do Papagaio | Ernestinho Carioca", "Bico do Papagaio is among the highlights of section 12, between Bom Retiro and the Tijuca National Park Visitor Center."]
  },
  "/naturaleza/catacumba/": {
    ES: ["Parque das Catacumbas | Ernestinho Carioca", "Senderos cortos dentro de un parque urbano junto a la Lagoa, con esculturas, vegetación y miradores. Buena elección para familias y para quien comienza a caminar."],
    PT: ["Parque das Catacumbas | Ernestinho Carioca", "Trilhas curtas em um parque urbano junto à Lagoa, com esculturas, vegetação e mirantes. Boa escolha para famílias e para quem está começando a caminhar."],
    EN: ["Parque das Catacumbas | Ernestinho Carioca", "Short trails in an urban park beside Lagoa, with sculptures, greenery and viewpoints. A good choice for families and beginner walkers."]
  },
  "/naturaleza/circuito-grutas/": {
    ES: ["Circuito das Grutas | Ernestinho Carioca", "Recorrido sombreado entre vegetación, formaciones rocosas, grutas y caminos históricos. Ideal para conocer el interior de la floresta."],
    PT: ["Circuito das Grutas | Ernestinho Carioca", "Percurso sombreado entre vegetação, formações rochosas, grutas e caminhos históricos. Ideal para conhecer o interior da floresta."],
    EN: ["Circuito das Grutas | Ernestinho Carioca", "A shaded walk among vegetation, rock formations, caves and historic paths. Ideal for exploring the forest interior."]
  },
  "/naturaleza/dois-irmaos-trek/": {
    ES: ["Morro Dois Irmãos | Ernestinho Carioca", "Ascenso desde Vidigal con vistas de Ipanema, Leblon, Rocinha, Lagoa y São Conrado. Hay modalidades diurna y amanecer."],
    PT: ["Morro Dois Irmãos | Ernestinho Carioca", "Subida a partir do Vidigal com vistas de Ipanema, Leblon, Rocinha, Lagoa e São Conrado. Há opções diurnas e ao amanhecer."],
    EN: ["Morro Dois Irmãos | Ernestinho Carioca", "An ascent from Vidigal overlooking Ipanema, Leblon, Rocinha, Lagoa and São Conrado. Daytime and sunrise options are available."]
  },
  "/naturaleza/mirante-dona-marta/": {
    ES: ["Mirante Dona Marta: mi guía para visitarlo | Ernestinho Carioca", "Mi guía del Mirante Dona Marta: qué se ve, cómo entender la panorámica, consejos para la visita y con qué combinarlo en Río."],
    PT: ["Mirante Dona Marta: meu guia de visita | Ernestinho Carioca", "Meu guia do Mirante Dona Marta: o que você vê, como entender o panorama, dicas para a visita e o que combinar no Rio."],
    EN: ["Mirante Dona Marta: my guide to visiting | Ernestinho Carioca", "My guide to Mirante Dona Marta: what you can see, how to read the panorama, visit tips and what to pair it with in Rio."]
  },
  "/naturaleza/parque-flamengo/": {
    ES: ["Parque do Flamengo (Aterro do Flamengo) | Ernestinho Carioca", "Mucho más que una franja verde junto al mar: es una de las grandes obras de paisajismo moderno de Río y uno de mis lugares favoritos para caminar, pedalear o simplemente ver cómo los cariocas ocupan la ciudad."],
    PT: ["Parque do Flamengo (Aterro do Flamengo) | Ernestinho Carioca", "Muito mais que uma faixa verde junto ao mar: é uma das grandes obras do paisagismo moderno do Rio e um dos meus lugares favoritos para caminhar, pedalar ou simplesmente observar como os cariocas vivem a cidade."],
    EN: ["Parque do Flamengo (Aterro do Flamengo) | Ernestinho Carioca", "Much more than a green strip beside the sea: it is one of Rio’s great works of modern landscape design and one of my favorite places to walk, cycle or simply watch how locals enjoy their city."]
  },
  "/naturaleza/pedra-bonita-trek/": {
    ES: ["Pedra Bonita | Ernestinho Carioca", "Una de las mejores relaciones entre esfuerzo y recompensa: sendero relativamente corto y panorámica de Pedra da Gávea, Barra, São Conrado y la floresta."],
    PT: ["Pedra Bonita | Ernestinho Carioca", "Uma das melhores relações entre esforço e recompensa: trilha relativamente curta e vista panorâmica de Pedra da Gávea, Barra, São Conrado e da floresta."],
    EN: ["Pedra Bonita | Ernestinho Carioca", "One of the best balances of effort and reward: a relatively short trail with panoramic views of Pedra da Gávea, Barra, São Conrado and the forest."]
  },
  "/naturaleza/pedra-branca/": {
    ES: ["Parque Estadual da Pedra Branca: mi guía por zonas | Ernestinho Carioca", "Mi guía para entender el Parque Estadual da Pedra Branca por núcleos, accesos y paisajes de la Zona Oeste, desde Pau da Fome hasta Rio da Prata y Campo Grande."],
    PT: ["Parque Estadual da Pedra Branca: meu guia por setores | Ernestinho Carioca", "Meu guia para entender o Parque Estadual da Pedra Branca por núcleos, acessos e paisagens da Zona Oeste, de Pau da Fome ao Rio da Prata e Campo Grande."],
    EN: ["Pedra Branca State Park: my guide by area | Ernestinho Carioca", "My guide to Pedra Branca State Park by sector, access point and West Zone landscape, from Pau da Fome to Rio da Prata and Campo Grande."]
  },
  "/naturaleza/pedra-gavea-trek/": {
    ES: ["Pedra da Gávea | Ernestinho Carioca", "Trekking largo y exigente con el paso técnico de la Carrasqueira. Recomendamos realizarlo exclusivamente con guía profesional y equipo de seguridad."],
    PT: ["Pedra da Gávea | Ernestinho Carioca", "Trekking longo e exigente com a passagem técnica da Carrasqueira. Recomendamos fazê-lo exclusivamente com guia profissional e equipamentos de segurança."],
    EN: ["Pedra da Gávea | Ernestinho Carioca", "A long, demanding hike with the technical Carrasqueira passage. We recommend doing it only with a professional guide and safety equipment."]
  },
  "/naturaleza/pico-tijuca/": {
    ES: ["Pico da Tijuca | Ernestinho Carioca", "El Pico da Tijuca aparece entre los grandes destacados del tramo 11 de la Transcarioca, junto a Represa dos Ciganos y Pico da Tijuca Mirim."],
    PT: ["Pico da Tijuca | Ernestinho Carioca", "O Pico da Tijuca está entre os grandes destaques do trecho 11 da Transcarioca, junto à Represa dos Ciganos e ao Pico da Tijuca Mirim."],
    EN: ["Pico da Tijuca | Ernestinho Carioca", "Pico da Tijuca is among the main highlights of Transcarioca section 11, alongside Represa dos Ciganos and Pico da Tijuca Mirim."]
  },
  "/naturaleza/pontal/": {
    ES: ["Pedra do Pontal | Ernestinho Carioca", "Ascenso corto pero inclinado entre Recreio y Praia da Macumba, con panorámica del litoral de la Zona Oeste."],
    PT: ["Pedra do Pontal | Ernestinho Carioca", "Subida curta, mas íngreme, entre Recreio e Praia da Macumba, com vista panorâmica do litoral da Zona Oeste."],
    EN: ["Pedra do Pontal | Ernestinho Carioca", "A short but steep ascent between Recreio and Praia da Macumba, with panoramic views of the West Zone coastline."]
  },
  "/naturaleza/primatas/": {
    ES: ["Cachoeira dos Primatas | Ernestinho Carioca", "Cachoeira dos Primatas aparece al final del tramo 17 y al comienzo del 18 de la Transcarioca, conectando Horto con el camino hacia Paineiras."],
    PT: ["Cachoeira dos Primatas | Ernestinho Carioca", "Cachoeira dos Primatas aparece ao final do trecho 17 e no início do 18 da Transcarioca, conectando Horto ao caminho para Paineiras."],
    EN: ["Cachoeira dos Primatas | Ernestinho Carioca", "Cachoeira dos Primatas appears at the end of Transcarioca section 17 and the beginning of section 18, connecting Horto with the path to Paineiras."]
  },
  "/naturaleza/rio-da-prata-campo-grande/": {
    ES: ["Rio da Prata y Campo Grande: naturaleza rural | Ernestinho Carioca", "Mi guía de Rio da Prata, en Campo Grande: acceso de referencia, horario general, paisaje rural y cómo entender la Trilha Transcarioca con seguridad."],
    PT: ["Rio da Prata e Campo Grande: natureza rural | Ernestinho Carioca", "Meu guia do Rio da Prata, em Campo Grande: acesso de referência, horário geral, paisagem rural e como entender a Trilha Transcarioca com segurança."],
    EN: ["Rio da Prata and Campo Grande: rural nature | Ernestinho Carioca", "My guide to Rio da Prata in Campo Grande: reference access, general hours, rural scenery and how to understand the Transcarioca Trail safely."]
  },
  "/naturaleza/sitio-burle-marx/": {
    ES: ["Sítio Roberto Burle Marx | Ernestinho Carioca", "Si te gustan los jardines, la arquitectura, el arte o simplemente descubrir un Río completamente diferente, este lugar merece planificación. No es un parque para entrar espontáneamente: la visita es guiada y requiere reserva."],
    PT: ["Sítio Roberto Burle Marx | Ernestinho Carioca", "Se você gosta de jardins, arquitetura, arte ou simplesmente de descobrir um Rio completamente diferente, este lugar merece planejamento. Não é um parque para entrar de última hora: a visita é guiada e exige reserva."],
    EN: ["Sítio Roberto Burle Marx | Ernestinho Carioca", "If you enjoy gardens, architecture, art or simply discovering a completely different Rio, this place deserves planning. It is not a park for spontaneous entry: visits are guided and require booking."]
  },
  "/naturaleza/telegrafo-trek/": {
    ES: ["Pedra do Telégrafo | Ernestinho Carioca", "Pedra do Telégrafo es uno de los grandes atractivos del primer tramo oficial, junto a las playas salvajes y Pedra da Tartaruga."],
    PT: ["Pedra do Telégrafo | Ernestinho Carioca", "Pedra do Telégrafo é um dos grandes atrativos do primeiro trecho oficial, junto às praias selvagens e à Pedra da Tartaruga."],
    EN: ["Pedra do Telégrafo | Ernestinho Carioca", "Pedra do Telégrafo is one of the main attractions of the first official section, alongside the wild beaches and Pedra da Tartaruga."]
  },
  '/naturaleza/nucleo-piraquara/': {
    ES: ['Núcleo Piraquara: naturaleza y patrimonio | Ernestinho Carioca', 'Mi guía del Núcleo Piraquara en Realengo: cascada, acueducto, senderos, horario oficial, acceso, mapa y cómo organizar la visita.'],
    PT: ['Núcleo Piraquara: natureza e patrimônio | Ernestinho Carioca', 'Meu guia do Núcleo Piraquara em Realengo: cachoeira, aqueduto, trilhas, horário oficial, acesso, mapa e como organizar a visita.'],
    EN: ['Núcleo Piraquara: nature and heritage | Ernestinho Carioca', 'My guide to Núcleo Piraquara in Realengo: waterfall, aqueduct, trails, opening hours, access, map and visit planning.']
  },
  '/naturaleza/aqueduto-do-piraquara/': {
    ES: ['Aqueduto do Piraquara: historia y naturaleza | Ernestinho Carioca', 'Mi guía del Aqueduto do Piraquara y Trecho do Governador: historia del agua, dimensiones, aves, acceso, horario y mapa.'],
    PT: ['Aqueduto do Piraquara: história e natureza | Ernestinho Carioca', 'Meu guia do Aqueduto do Piraquara e Trecho do Governador: história da água, dimensões, aves, acesso, horário e mapa.'],
    EN: ['Aqueduto do Piraquara: history and nature | Ernestinho Carioca', 'My guide to Aqueduto do Piraquara and Trecho do Governador: water history, dimensions, birds, access, hours and map.']
  },
  '/naturaleza/pedra-do-ponto/': {
    ES: ['Pedra do Ponto en Piraquara: guía de montaña | Ernestinho Carioca', 'Mi guía de Pedra do Ponto: altitud, planificación, referencias de ruta, horario, mapa y combinación con el núcleo.'],
    PT: ['Pedra do Ponto em Piraquara: guia de montanha | Ernestinho Carioca', 'Meu guia da Pedra do Ponto: altitude, planejamento, referências de rota, horário, mapa e combinação com o núcleo.'],
    EN: ['Pedra do Ponto in Piraquara: mountain guide | Ernestinho Carioca', 'My guide to Pedra do Ponto: elevation, planning, route references, hours, map and nearby visits.']
  },
  '/naturaleza/pico-do-piraquara/': {
    ES: ['Pico do Piraquara: acceso, mapa y planificación | Ernestinho Carioca', 'Mi guía del Pico do Piraquara: altitud de referencia, diferencias con Pedra do Ponto, orientación, preparación y mapa.'],
    PT: ['Pico do Piraquara: acesso, mapa e planejamento | Ernestinho Carioca', 'Meu guia do Pico do Piraquara: altitude de referência, diferenças da Pedra do Ponto, orientação, preparo e mapa.'],
    EN: ['Pico do Piraquara: access, map and planning | Ernestinho Carioca', 'My guide to Pico do Piraquara: reference elevation, how it differs from Pedra do Ponto, navigation, preparation and map.']
  },
  '/naturaleza/cachoeira-do-barata/': {
    ES: ['Cachoeira do Barata: baño, horario y seguridad | Ernestinho Carioca', 'Mi guía de Cachoeira do Barata en Piraquara: horario, baño sujeto a condiciones, seguridad con lluvia, mapa y combinaciones.'],
    PT: ['Cachoeira do Barata: banho, horário e segurança | Ernestinho Carioca', 'Meu guia da Cachoeira do Barata em Piraquara: horário, banho sujeito às condições, segurança após chuva, mapa e combinações.'],
    EN: ['Cachoeira do Barata: swimming, hours and safety | Ernestinho Carioca', 'My guide to Cachoeira do Barata in Piraquara: hours, bathing subject to conditions, rain safety, map and nearby visits.']
  },
  '/naturaleza/vista-chinesa/': {
    ES: ['Vista Chinesa en Río: mi guía para visitarla | Ernestinho Carioca', 'Mi guía completa de Vista Chinesa: historia del pabellón, vistas, horario oficial, restricciones de circulación, mapa y consejos para llegar desde Horto.'],
    PT: ['Vista Chinesa no Rio: meu guia de visita | Ernestinho Carioca', 'Meu guia completo da Vista Chinesa: história do pavilhão, vistas, horário oficial, restrições de circulação, mapa e dicas para chegar pelo Horto.'],
    EN: ['Vista Chinesa in Rio: my visitor guide | Ernestinho Carioca', 'My complete Vista Chinesa guide: pavilion history, views, official hours, road restrictions, map and tips for getting there from Horto.']
  },
  '/naturaleza/mesa-do-imperador/': {
    ES: ['Mesa do Imperador en Río: historia, mapa y consejos | Ernestinho Carioca', 'Mi guía de Mesa do Imperador: la historia de D. Pedro II, qué mirar, horario oficial, acceso por Horto y cómo combinarla con Vista Chinesa.'],
    PT: ['Mesa do Imperador no Rio: história, mapa e dicas | Ernestinho Carioca', 'Meu guia da Mesa do Imperador: a história de D. Pedro II, o que observar, horário oficial, acesso pelo Horto e como combiná-la com a Vista Chinesa.'],
    EN: ['Mesa do Imperador in Rio: history, map and tips | Ernestinho Carioca', 'My guide to Mesa do Imperador: the story of D. Pedro II, what to look for, official hours, access via Horto and how to pair it with Vista Chinesa.']
  },
  '/naturaleza/mirante-da-piraquara/': {
    ES: ['Mirante da Piraquara: vista de Realengo | Ernestinho Carioca', 'Mi guía del Mirante da Piraquara: qué se ve, cómo se relaciona con el Trecho 08 de la Transcarioca, horarios, dificultad y mapa.'],
    PT: ['Mirante da Piraquara: vista de Realengo | Ernestinho Carioca', 'Meu guia do Mirante da Piraquara: o que se vê, relação com o Trecho 08 da Transcarioca, horários, dificuldade e mapa.'],
    EN: ['Mirante da Piraquara: views over Realengo | Ernestinho Carioca', 'My guide to Mirante da Piraquara: what you can see, how it relates to Transcarioca Section 08, opening hours, difficulty and map.']
  },
  '/naturaleza/circuito-pedra-jesus-vem/': {
    ES: ['Circuito Pedra Jesus Vem: ruta y consejos | Ernestinho Carioca', 'Mi guía del Circuito Pedra Jesus Vem en Piraquara: 3,7 km, cerca de 3 horas, dificultad, horario, mapa y preparación.'],
    PT: ['Circuito Pedra Jesus Vem: trilha e dicas | Ernestinho Carioca', 'Meu guia do Circuito Pedra Jesus Vem em Piraquara: 3,7 km, cerca de 3 horas, dificuldade, horário, mapa e preparação.'],
    EN: ['Pedra Jesus Vem Circuit: trail and tips | Ernestinho Carioca', 'My guide to the Pedra Jesus Vem Circuit in Piraquara: 3.7 km, about 3 hours, difficulty, hours, map and preparation.']
  },
  '/naturaleza/pedra-jesus-vem/': {
    ES: ['Pedra Jesus Vem en Piraquara: guía y mapa | Ernestinho Carioca', 'Mi guía de Pedra Jesus Vem: origen del nombre, circuito, dificultad, horario, mapa y qué confirmar sobre el paso con cable.'],
    PT: ['Pedra Jesus Vem em Piraquara: guia e mapa | Ernestinho Carioca', 'Meu guia da Pedra Jesus Vem: origem do nome, circuito, dificuldade, horário, mapa e o que confirmar sobre o trecho com cabo.'],
    EN: ['Pedra Jesus Vem in Piraquara: guide and map | Ernestinho Carioca', 'My guide to Pedra Jesus Vem: name origin, circuit, difficulty, hours, map and what to verify about the cable section.']
  },
  '/naturaleza/pedra-do-osso/': {
    ES: ['Pedra do Osso en Piraquara: geología y visita | Ernestinho Carioca', 'Mi guía de Pedra do Osso: formación rocosa, observación responsable, circuito, horario, preparación y mapa.'],
    PT: ['Pedra do Osso em Piraquara: geologia e visita | Ernestinho Carioca', 'Meu guia da Pedra do Osso: formação rochosa, observação responsável, circuito, horário, preparação e mapa.'],
    EN: ['Pedra do Osso in Piraquara: geology and visit | Ernestinho Carioca', 'My guide to Pedra do Osso: rock formation, responsible viewing, circuit, hours, preparation and map.']
  },
  '/naturaleza/muro-das-lamentacoes/': {
    ES: ['Muro das Lamentações en Piraquara: guía | Ernestinho Carioca', 'Mi guía del Muro das Lamentações: dimensiones aproximadas, geología, seguridad de observación, horario, acceso y mapa.'],
    PT: ['Muro das Lamentações em Piraquara: guia | Ernestinho Carioca', 'Meu guia do Muro das Lamentações: dimensões aproximadas, geologia, segurança na visita, horário, acesso e mapa.'],
    EN: ['Muro das Lamentações in Piraquara: guide | Ernestinho Carioca', 'My guide to Muro das Lamentações: approximate dimensions, geology, safe viewing, hours, access and map.']
  },
  '/naturaleza/pedra-rachada/': {
    ES: ['Pedra Rachada en Piraquara: Trecho 08 y acceso | Ernestinho Carioca', 'Mi guía de Pedra Rachada: formación, Trecho 08, regreso recomendado a Piraquara, horario, alertas y mapa.'],
    PT: ['Pedra Rachada em Piraquara: Trecho 08 e acesso | Ernestinho Carioca', 'Meu guia da Pedra Rachada: formação, Trecho 08, retorno recomendado a Piraquara, horário, alertas e mapa.'],
    EN: ['Pedra Rachada in Piraquara: Section 08 and access | Ernestinho Carioca', 'My guide to Pedra Rachada: formation, Section 08, recommended return to Piraquara, hours, alerts and map.']
  },
  '/naturaleza/mirante-do-caete/': {
    ES: ['Mirante do Caeté en Prainha: trilha, horario y reserva | Ernestinho Carioca', 'Mi guía del Mirante do Caeté en Prainha: horario oficial, reserva de fin de semana, vistas, caminata y cómo combinar naturaleza y playa.'],
    PT: ['Mirante do Caeté na Prainha: trilha, horário e reserva | Ernestinho Carioca', 'Meu guia do Mirante do Caeté na Prainha: horário oficial, reserva no fim de semana, vistas, caminhada e como combinar natureza e praia.'],
    EN: ['Mirante do Caeté in Prainha: trail, hours and booking | Ernestinho Carioca', 'My guide to Mirante do Caeté in Prainha: official hours, weekend booking, views, hike and how to pair nature with the beach.']
  },
  '/naturaleza/mirante-do-horto/': {
    ES: ['Mirante do Horto en Río: trilha, vistas y acceso | Ernestinho Carioca', 'Mi guía del Mirante do Horto: ubicación entre las cachoeiras, vistas, horario, acceso desde Estrada Dona Castorina y qué confirmar antes de caminar.'],
    PT: ['Mirante do Horto no Rio: trilha, vistas e acesso | Ernestinho Carioca', 'Meu guia do Mirante do Horto: localização entre cachoeiras, vistas, horário, acesso pela Estrada Dona Castorina e o que confirmar antes da caminhada.'],
    EN: ['Mirante do Horto in Rio: trail, views and access | Ernestinho Carioca', 'My guide to Mirante do Horto: location between waterfalls, views, hours, access from Estrada Dona Castorina and what to confirm before hiking.']
  },
  '/naturaleza/mirante-do-excelsior/': {
    ES: ['Mirante do Excelsior: trilha en la Floresta da Tijuca | Ernestinho Carioca', 'Mi guía del Mirante do Excelsior en la Floresta da Tijuca: caminata, hora límite para empezar, acceso, historia y recomendaciones.'],
    PT: ['Mirante do Excelsior: trilha na Floresta da Tijuca | Ernestinho Carioca', 'Meu guia do Mirante do Excelsior na Floresta da Tijuca: caminhada, horário limite para começar, acesso, história e recomendações.'],
    EN: ['Mirante do Excelsior: hiking in Tijuca Forest | Ernestinho Carioca', 'My guide to Mirante do Excelsior in Tijuca Forest: walk, latest start time, access, history and recommendations.']
  },
  '/naturaleza/mirante-da-cascatinha/': {
    ES: ['Mirante da Cascatinha: horario, sendero y vistas | Ernestinho Carioca', 'Mi guía del Mirante da Cascatinha, reabierto en 2024: deck panorámico, caminata, capacidad, horario y acceso en la Floresta da Tijuca.'],
    PT: ['Mirante da Cascatinha: horário, trilha e vistas | Ernestinho Carioca', 'Meu guia do Mirante da Cascatinha, reaberto em 2024: deck panorâmico, caminhada, capacidade, horário e acesso na Floresta da Tijuca.'],
    EN: ['Mirante da Cascatinha: hours, trail and views | Ernestinho Carioca', 'My guide to Mirante da Cascatinha, reopened in 2024: panoramic deck, walk, capacity, hours and access in Tijuca Forest.']
  },
  '/naturaleza/vista-do-almirante/': {
    ES: ['Vista do Almirante en Tijuca: vistas y planificación | Ernestinho Carioca', 'Mi guía de Vista do Almirante: panorámica hacia Pedra da Gávea, Pedra Bonita y Agulinha, y qué confirmar antes de organizar el acceso.'],
    PT: ['Vista do Almirante na Tijuca: vistas e planejamento | Ernestinho Carioca', 'Meu guia da Vista do Almirante: panorama da Pedra da Gávea, Pedra Bonita e Agulinha, e o que confirmar antes de organizar o acesso.'],
    EN: ['Vista do Almirante in Tijuca: views and planning | Ernestinho Carioca', 'My guide to Vista do Almirante: views toward Pedra da Gávea, Pedra Bonita and Agulinha, and what to confirm before planning access.']
  },
  '/naturaleza/mirante-da-mesa-rio-da-prata/': {
    ES: ['Mirante da Mesa en Rio da Prata: territorio y vistas | Ernestinho Carioca', 'Mi guía del Mirante da Mesa en Pedra Branca: paisaje hacia Recreio y el Canal de Sernambetiba, contexto territorial, horario del parque y acceso responsable.'],
    PT: ['Mirante da Mesa no Rio da Prata: território e vistas | Ernestinho Carioca', 'Meu guia do Mirante da Mesa na Pedra Branca: paisagem para Recreio e o Canal de Sernambetiba, contexto territorial, horário do parque e acesso responsável.'],
    EN: ['Mirante da Mesa in Rio da Prata: landscape and views | Ernestinho Carioca', 'My guide to Mirante da Mesa in Pedra Branca: views of Recreio and the Sernambetiba Canal, local context, park hours and responsible access.']
  },
  '/naturaleza/cachoeira-do-engenho/': {
    ES: ['Cachoeira do Engenho en Rio da Prata | Ernestinho Carioca', 'Mi guía de Cachoeira do Engenho: acceso general, conexión con la Transcarioca, seguridad del agua, horarios y mapa de referencia.'],
    PT: ['Cachoeira do Engenho no Rio da Prata | Ernestinho Carioca', 'Meu guia da Cachoeira do Engenho: acesso geral, conexão com a Transcarioca, segurança da água, horários e mapa de referência.'],
    EN: ['Cachoeira do Engenho in Rio da Prata | Ernestinho Carioca', 'My guide to Cachoeira do Engenho: general access, Transcarioca connections, water safety, hours and a reference map.']
  },
  '/naturaleza/alto-da-capelinha/': {
    ES: ['Alto da Capelinha en Pedra Branca | Ernestinho Carioca', 'Mi guía de Alto da Capelinha: mirador de trilha, paisaje rural, datos del Trecho 04, acceso, horario sugerido y mapa de referencia.'],
    PT: ['Alto da Capelinha na Pedra Branca | Ernestinho Carioca', 'Meu guia do Alto da Capelinha: mirante de trilha, paisagem rural, dados do Trecho 04, acesso, período sugerido e mapa de referência.'],
    EN: ['Alto da Capelinha in Pedra Branca | Ernestinho Carioca', 'My guide to Alto da Capelinha: trail viewpoint, rural landscape, Section 04 details, access, suggested time and reference map.']
  },
  '/naturaleza/alto-da-bela-vista/': {
    ES: ['Alto da Bela Vista en Pedra Branca | Ernestinho Carioca', 'Mi guía de Alto da Bela Vista: mirador natural de la Trilha Transcarioca, panorama entre costa y Campo Grande, acceso responsable y mapa general.'],
    PT: ['Alto da Bela Vista na Pedra Branca | Ernestinho Carioca', 'Meu guia do Alto da Bela Vista: mirante natural da Trilha Transcarioca, paisagem entre o litoral e Campo Grande, acesso responsável e mapa geral.'],
    EN: ['Alto da Bela Vista in Pedra Branca | Ernestinho Carioca', 'My guide to Alto da Bela Vista: a natural viewpoint on the Transcarioca Trail, views between the coast and Campo Grande, responsible access and a general map.']
  },
  '/naturaleza/trilha-transcarioca-trecho-05/': {
    ES: ['Trilha Transcarioca Trecho 05: Rio da Prata a Casa Amarela | Ernestinho Carioca', 'Guía del Trecho 05 de la Trilha Transcarioca: 8 km, cerca de 5 horas y dificultad alta. Mapa general, preparación y atractivos del camino.'],
    PT: ['Trilha Transcarioca Trecho 05: Rio da Prata à Casa Amarela | Ernestinho Carioca', 'Guia do Trecho 05 da Trilha Transcarioca: 8 km, cerca de 5 horas e dificuldade alta. Mapa geral, preparação e atrativos do caminho.'],
    EN: ['Transcarioca Trail Section 05: Rio da Prata to Casa Amarela | Ernestinho Carioca', 'Guide to Transcarioca Section 05: 8 km, about 5 hours and high difficulty. General map, preparation and trail highlights.']
  },
  '/naturaleza/circuito-engenho-capelinha/': {
    ES: ['Circuito Cachoeira do Engenho y Alto da Capelinha | Ernestinho Carioca', 'Guía del circuito de la Trilha Transcarioca entre Cachoeira do Engenho y Alto da Capelinha, con regreso a Rio da Prata, planificación y mapa general.'],
    PT: ['Circuito Cachoeira do Engenho e Alto da Capelinha | Ernestinho Carioca', 'Guia do circuito da Trilha Transcarioca entre a Cachoeira do Engenho e o Alto da Capelinha, com retorno ao Rio da Prata, planejamento e mapa geral.'],
    EN: ['Cachoeira do Engenho & Alto da Capelinha Circuit | Ernestinho Carioca', 'Guide to the Transcarioca circuit between Cachoeira do Engenho and Alto da Capelinha, returning to Rio da Prata, with planning and a general map.']
  },
  '/naturaleza/alto-do-mangalarga/': {
    ES: ['Alto do Mangalarga en Pedra Branca | Ernestinho Carioca', 'Guía de Alto do Mangalarga, mirador del Trecho 05 de la Transcarioca con vistas de 360 grados. Distancias y horarios se refieren al tramo completo.'],
    PT: ['Alto do Mangalarga na Pedra Branca | Ernestinho Carioca', 'Guia do Alto do Mangalarga, mirante do Trecho 05 da Transcarioca com vista de 360 graus. Distâncias e horários se referem ao trecho completo.'],
    EN: ['Alto do Mangalarga in Pedra Branca | Ernestinho Carioca', 'Guide to Alto do Mangalarga, a viewpoint on Transcarioca Section 05 with 360-degree views. Distances and times refer to the full section.']
  },
  '/naturaleza/calcamento-historico-pedra-branca/': {
    ES: ['Calçamento histórico de Pedra Branca | Ernestinho Carioca', 'El calçamento de piedra del Trecho 05 de la Transcarioca: contexto, cómo visitarlo con respeto, mapas y datos históricos aún por confirmar.'],
    PT: ['Calçamento histórico da Pedra Branca | Ernestinho Carioca', 'O calçamento de pedra do Trecho 05 da Transcarioca: contexto, como visitar com respeito, mapas e dados históricos ainda a confirmar.'],
    EN: ['Historic Stone Paving in Pedra Branca | Ernestinho Carioca', 'The stone paving on Transcarioca Section 05: context, respectful visiting, maps and historical details that still need confirmation.']
  },
  '/naturaleza/jequitiba-centenario-rio-da-prata/': {
    ES: ['Jequitibá Centenário de Rio da Prata | Ernestinho Carioca', 'Mi guía del Jequitibá Centenário de Rio da Prata: valor natural y rural, qué se sabe, acceso responsable y mapa general.'],
    PT: ['Jequitibá Centenário do Rio da Prata | Ernestinho Carioca', 'Meu guia do Jequitibá Centenário do Rio da Prata: valor natural e rural, o que se sabe, acesso responsável e mapa geral.'],
    EN: ['Rio da Prata Centenary Jequitibá | Ernestinho Carioca', 'My guide to Rio da Prata’s Jequitibá Centenário: natural and rural heritage, what is known, responsible access and a general map.']
  },
  '/naturaleza/casa-amarela-pedra-branca/': {
    ES: ['Casa Amarela en Pedra Branca | Ernestinho Carioca', 'Mi guía de Casa Amarela: antigua casa del Engenho Santa Bárbara, nodo de la Transcarioca, rutas, acceso responsable y mapa general.'],
    PT: ['Casa Amarela na Pedra Branca | Ernestinho Carioca', 'Meu guia da Casa Amarela: antiga casa do Engenho Santa Bárbara, nó da Transcarioca, trilhas, acesso responsável e mapa geral.'],
    EN: ['Casa Amarela in Pedra Branca | Ernestinho Carioca', 'My guide to Casa Amarela: former Engenho Santa Bárbara house, a Transcarioca trail junction, routes, responsible access and a general map.']
  },
  '/naturaleza/trilha-transcarioca-trecho-08/': {
    ES: ['Trilha Transcarioca Trecho 08: Piraquara y Pedra Rachada | Ernestinho Carioca', 'Mi guía del Trecho 08: datos del tramo, recomendación actual de ida y vuelta hasta Pedra Rachada, preparación y mapa de acceso.'],
    PT: ['Trilha Transcarioca Trecho 08: Piraquara e Pedra Rachada | Ernestinho Carioca', 'Meu guia do Trecho 08: dados do percurso, recomendação atual de ida e volta até a Pedra Rachada, preparação e mapa de acesso.'],
    EN: ['Transcarioca Trail Section 08: Piraquara & Pedra Rachada | Ernestinho Carioca', 'My guide to Section 08: route details, current out-and-back recommendation to Pedra Rachada, preparation and access map.']
  },
  '/naturaleza/trilha-transcarioca-trecho-04/': {
    ES: ['Transcarioca Trecho 04: Morgado–Rio da Prata | Ernestinho Carioca', 'Guía de la travesía de 11,5 km y unas 7 horas por Pedra Branca, con dificultad, orientación, logística y mapa de referencia.'],
    PT: ['Transcarioca Trecho 04: Morgado–Rio da Prata | Ernestinho Carioca', 'Guia da travessia de 11,5 km e cerca de 7 horas pela Pedra Branca, com dificuldade, orientação, logística e mapa de referência.'],
    EN: ['Transcarioca Section 04: Morgado–Rio da Prata | Ernestinho Carioca', 'A guide to this 11.5 km, roughly seven-hour Pedra Branca hike, with difficulty, navigation, logistics and a reference map.']
  },
  '/naturaleza/posto-avancado-rio-da-prata/': {
    ES: ['Núcleo Rio da Prata: acceso a Pedra Branca | Ernestinho Carioca', 'Dirección de referencia, horario general del Parque Estadual da Pedra Branca y conexiones con los senderos de Rio da Prata.'],
    PT: ['Núcleo Rio da Prata: acesso à Pedra Branca | Ernestinho Carioca', 'Endereço de referência, horário geral do Parque Estadual da Pedra Branca e conexões com as trilhas do Rio da Prata.'],
    EN: ['Rio da Prata Park Centre: Pedra Branca access | Ernestinho Carioca', 'Reference address, general Pedra Branca State Park hours and trail connections in Rio da Prata.']
  },
  '/naturaleza/quilombo-cafunda-astrogilda/': {
    ES: ['Quilombo Cafundá Astrogilda: memoria y territorio | Ernestinho Carioca', 'Una guía respetuosa sobre la comunidad quilombola de Vargem Grande, su memoria, agricultura y relación con la Mata Atlántica.'],
    PT: ['Quilombo Cafundá Astrogilda: memória e território | Ernestinho Carioca', 'Um guia respeitoso sobre a comunidade quilombola de Vargem Grande, sua memória, agricultura e relação com a Mata Atlântica.'],
    EN: ['Quilombo Cafundá Astrogilda: memory & territory | Ernestinho Carioca', 'A respectful guide to the quilombola community in Vargem Grande, its memory, agriculture and connection to the Atlantic Forest.']
  },
  '/naturaleza/agricultura-pedra-branca/': {
    ES: ['Agricultura en Pedra Branca: paisaje rural de Río | Ernestinho Carioca', 'Conoce la historia agrícola del Maciço da Pedra Branca y su relación con familias, caminos, agua, conservación y Río.'],
    PT: ['Agricultura na Pedra Branca: paisagem rural do Rio | Ernestinho Carioca', 'Conheça a história agrícola do Maciço da Pedra Branca e sua relação com famílias, caminhos, água, conservação e o Rio.'],
    EN: ['Agriculture in Pedra Branca: Rio’s rural landscape | Ernestinho Carioca', 'Explore the agricultural history of the Pedra Branca Massif and its relationship with families, paths, water, conservation and Rio.']
  },
  '/naturaleza/trilha-transcarioca-trecho-06/': {
    ES: ['Transcarioca Trecho 06: Casa Amarela a Pau da Fome | Ernestinho Carioca', 'Guía de la travesía de 13,4 km y unas seis horas por Pedra Branca, con dificultad, atractivos, preparación y mapa de referencia.'],
    PT: ['Transcarioca Trecho 06: Casa Amarela a Pau da Fome | Ernestinho Carioca', 'Guia da travessia de 13,4 km e cerca de seis horas pela Pedra Branca, com dificuldade, atrativos, preparação e mapa de referência.'],
    EN: ['Transcarioca Section 06: Casa Amarela to Pau da Fome | Ernestinho Carioca', 'Guide to the 13.4 km, roughly six-hour Pedra Branca traverse, with difficulty, highlights, preparation and a reference map.']
  },
  '/naturaleza/cachoeira-do-camorim/': {
    ES: ['Cachoeira do Camorim: sendero y agua | Ernestinho Carioca', 'Guía de la cascada en Pedra Branca: acceso general, lluvia, caudal, normas del baño y preparación.'],
    PT: ['Cachoeira do Camorim: trilha e água | Ernestinho Carioca', 'Guia da cachoeira na Pedra Branca: acesso geral, chuva, vazão, regras de banho e preparação.'],
    EN: ['Cachoeira do Camorim: trail and water | Ernestinho Carioca', 'A guide to the Pedra Branca waterfall: general access, rain, water flow, swimming rules and preparation.']
  },
  '/naturaleza/pedra-do-quilombo/': {
    ES: ['Pedra do Quilombo: montaña y memoria | Ernestinho Carioca', 'Conoce el paisaje y contexto de Pedra do Quilombo en Pedra Branca, con claridad sobre la altitud de referencia y el acceso pendiente.'],
    PT: ['Pedra do Quilombo: montanha e memória | Ernestinho Carioca', 'Conheça a paisagem e o contexto da Pedra do Quilombo, na Pedra Branca, com transparência sobre a altitude de referência e o acesso pendente.'],
    EN: ['Pedra do Quilombo: mountain and memory | Ernestinho Carioca', 'Explore Pedra do Quilombo’s landscape and context, with clarity about its reference elevation and unverified access.']
  },
  '/naturaleza/nucleo-pau-da-fome/': {
    ES: ['Núcleo Pau da Fome: entrada a Pedra Branca | Ernestinho Carioca', 'Dirección, horario, centro de visitantes y consejos para elegir una visita o sendero en la sede del Parque Estadual da Pedra Branca.'],
    PT: ['Núcleo Pau da Fome: acesso à Pedra Branca | Ernestinho Carioca', 'Endereço, horário, centro de visitantes e dicas para escolher uma visita ou trilha na sede do Parque Estadual da Pedra Branca.'],
    EN: ['Pau da Fome Park Centre: Pedra Branca access | Ernestinho Carioca', 'Address, opening hours, visitor centre and tips for choosing a visit or trail at Pedra Branca State Park.']
  },
  '/naturaleza/trilha-transcarioca-trecho-07/': {
    ES: ['Transcarioca Trecho 07: Pau da Fome a Piraquara | Ernestinho Carioca', 'Guía de la travesía de 11,7 km y unas seis horas entre dos sedes, con dificultad alta, orientación, mapa y planificación.'],
    PT: ['Transcarioca Trecho 07: Pau da Fome a Piraquara | Ernestinho Carioca', 'Guia da travessia de 11,7 km e cerca de seis horas entre duas sedes, com dificuldade alta, orientação, mapa e planejamento.'],
    EN: ['Transcarioca Section 07: Pau da Fome to Piraquara | Ernestinho Carioca', 'Guide to the 11.7 km, roughly six-hour traverse between two park centres, with difficulty, navigation, map and planning.']
  },
  '/naturaleza/pico-da-pedra-branca/': {
    ES: ['Pico da Pedra Branca: punto culminante de Río | Ernestinho Carioca', 'Conoce la cumbre de 1.024–1.025 m en el parque estatal y qué confirmar sobre la ruta antes de planificar una subida.'],
    PT: ['Pico da Pedra Branca: ponto culminante do Rio | Ernestinho Carioca', 'Conheça o cume de 1.024–1.025 m no parque estadual e o que confirmar sobre a trilha antes de planejar a subida.'],
    EN: ['Pico da Pedra Branca: Rio’s highest point | Ernestinho Carioca', 'Learn about this 1,024–1,025 m summit in the state park and what to verify about its route before planning a climb.']
  },
  '/naturaleza/aqueduto-do-barata/': {
    ES: ['Aqueduto do Barata: patrimonio hídrico | Ernestinho Carioca', 'El acueducto citado en la Transcarioca entre las copas del bosque de Pedra Branca: contexto y observación segura.'],
    PT: ['Aqueduto do Barata: patrimônio hídrico | Ernestinho Carioca', 'O aqueduto citado na Transcarioca entre as copas da floresta da Pedra Branca: contexto e observação segura.'],
    EN: ['Aqueduto do Barata: water heritage | Ernestinho Carioca', 'The aqueduct mentioned on the Transcarioca Trail among Pedra Branca’s forest canopy: context and safe viewing.']
  },
  '/naturaleza/nucleo-camorim/': {
    ES: ['Núcleo Camorim: entrada a Pedra Branca | Ernestinho Carioca', 'Dirección, horario administrativo, sendero al Açude y recomendaciones para planificar una visita al Núcleo Camorim.'],
    PT: ['Núcleo Camorim: acesso à Pedra Branca | Ernestinho Carioca', 'Endereço, horário administrativo, trilha até o Açude e dicas para planejar a visita ao Núcleo Camorim.'],
    EN: ['Camorim Park Centre: Pedra Branca access | Ernestinho Carioca', 'Address, administrative hours, trail to the reservoir and tips for planning a visit to Camorim.']
  },
  '/naturaleza/acude-do-camorim/': {
    ES: ['Açude do Camorim: historia y visita responsable | Ernestinho Carioca', 'Conoce el embalse de 1908 en Pedra Branca, su acceso por sendero y las reglas: baño prohibido y agua no potable.'],
    PT: ['Açude do Camorim: história e visita responsável | Ernestinho Carioca', 'Conheça a represa de 1908 na Pedra Branca, o acesso pela trilha e as regras: banho proibido e água não potável.'],
    EN: ['Açude do Camorim: history and responsible visit | Ernestinho Carioca', 'Explore the 1908 reservoir in Pedra Branca, its trail access and the rules: swimming is prohibited and the water is not potable.']
  },
  '/naturaleza/aqueduto-do-pau-da-fome/': {
    ES: ['Aqueduto do Pau da Fome: patrimonio hídrico | Ernestinho Carioca', 'Una estructura histórica de agua en Pedra Branca, su contexto, acceso responsable y conexión con la Trilha Transcarioca.'],
    PT: ['Aqueduto do Pau da Fome: patrimônio hídrico | Ernestinho Carioca', 'Uma estrutura histórica de água na Pedra Branca, seu contexto, acesso responsável e relação com a Trilha Transcarioca.'],
    EN: ['Aqueduto do Pau da Fome: water heritage | Ernestinho Carioca', 'A historic water structure in Pedra Branca, its context, responsible access and connection to the Transcarioca Trail.']
  },
  '/naturaleza/cachoeira-veu-da-noiva-camorim/': {
    ES: ['Cachoeira Véu da Noiva de Camorim | Ernestinho Carioca', 'Guía del Circuito das Águas de Camorim: acceso, horario, patrimonio hídrico y qué verificar antes de ir al agua.'],
    PT: ['Cachoeira Véu da Noiva de Camorim | Ernestinho Carioca', 'Guia do Circuito das Águas de Camorim: acesso, horário, patrimônio hídrico e o que confirmar antes de ir à água.'],
    EN: ['Cachoeira Véu da Noiva in Camorim | Ernestinho Carioca', 'A guide to Camorim’s Circuito das Águas: access, hours, water heritage and what to check before visiting.']
  },
  '/': {
    ES: ['Guía de Río de Janeiro y tours | Ernestinho Carioca', 'Vive Río con mi mirada local: qué hacer, playas, restaurantes, transporte, apartamentos en Copacabana y experiencias con Ernestinho Carioca.'],
    PT: ['Guia do Rio de Janeiro e passeios | Ernestinho Carioca', 'Viva o Rio com meu olhar local: o que fazer, praias, restaurantes, transporte, apartamentos em Copacabana e experiências com Ernestinho Carioca.'],
    EN: ['Rio de Janeiro Travel Guide & Tours | Ernestinho Carioca', 'Experience Rio through my local perspective: things to do, beaches, restaurants, transport, Copacabana apartments and tours with Ernestinho Carioca.']
  },
  '/guia/': {
    ES: ['Guía para viajar a Río de Janeiro | Ernestinho Carioca', 'Prepara tu viaje a Río: documentos, dinero, PIX, internet, aeropuertos, seguridad y dónde alojarte, con consejos prácticos de Ernestinho.'],
    PT: ['Guia para viajar ao Rio de Janeiro | Ernestinho Carioca', 'Prepare sua viagem ao Rio: documentos, dinheiro, Pix, internet, aeroportos, segurança e onde ficar, com dicas práticas do Ernestinho.'],
    EN: ['Planning a Trip to Rio de Janeiro | Ernestinho Carioca', 'Plan your Rio trip with practical advice on documents, money, PIX, internet, airports, safety and where to stay from Ernestinho.']
  },
  '/experiencias/': {
    ES: ['Tours y paseos en Río de Janeiro | Ernestinho Carioca', 'Elige tu experiencia en Río: Cristo Redentor, Maracaná, Rocinha, aventura y excursiones a Búzios, Arraial do Cabo y Angra con Ernestinho Carioca.'],
    PT: ['Passeios e tours no Rio de Janeiro | Ernestinho Carioca', 'Escolha sua experiência no Rio: Cristo Redentor, Maracanã, Rocinha, aventura e passeios a Búzios, Arraial do Cabo e Angra com Ernestinho Carioca.'],
    EN: ['Rio de Janeiro Tours & Day Trips | Ernestinho Carioca', 'Find your Rio experience: Christ the Redeemer, Maracanã, Rocinha, adventure and day trips to Búzios, Arraial do Cabo and Angra with Ernestinho Carioca.']
  },
  '/atracciones/': {
    ES: ['Qué visitar en Río de Janeiro: atracciones | Ernestinho', 'Descubre qué visitar en Río de Janeiro: lugares emblemáticos y atracciones para organizar tu viaje con la mirada local de Ernestinho Carioca.'],
    PT: ['O que visitar no Rio de Janeiro: atrações | Ernestinho', 'Descubra o que visitar no Rio de Janeiro: lugares emblemáticos e atrações para organizar sua viagem com o olhar local do Ernestinho Carioca.'],
    EN: ['What to See in Rio de Janeiro: Attractions | Ernestinho', 'Discover what to see in Rio de Janeiro: landmarks and attractions to plan your visit with Ernestinho Carioca’s local perspective.']
  },
  '/gastronomia/': {
    ES: ['Dónde comer en Río de Janeiro: restaurantes | Ernestinho', 'Explora restaurantes, botecos, cafés y sabores de Río. Elige dónde comer por barrio y estilo, con la guía gastronómica de Ernestinho Carioca.'],
    PT: ['Onde comer no Rio de Janeiro: restaurantes | Ernestinho', 'Explore restaurantes, botecos, cafés e sabores do Rio. Escolha onde comer por bairro e estilo, com o guia gastronômico do Ernestinho Carioca.'],
    EN: ['Where to Eat in Rio de Janeiro: Restaurants | Ernestinho', 'Explore Rio’s restaurants, botecos, cafés and local flavours. Choose where to eat by neighbourhood and style with Ernestinho Carioca’s food guide.']
  },
  '/cultura/': {
    ES: ['Museos y cultura en Río de Janeiro | Ernestinho Carioca', 'Explora museos, teatros, centros culturales, bibliotecas y fortalezas de Río de Janeiro con la guía de arte y cultura de Ernestinho Carioca.'],
    PT: ['Museus e cultura no Rio de Janeiro | Ernestinho Carioca', 'Explore museus, teatros, centros culturais, bibliotecas e fortes do Rio de Janeiro com o guia de arte e cultura do Ernestinho Carioca.'],
    EN: ['Museums & Culture in Rio de Janeiro | Ernestinho Carioca', 'Explore Rio de Janeiro’s museums, theatres, cultural centres, libraries and forts with Ernestinho Carioca’s art and culture guide.']
  },
  '/vida-nocturna/': {
    ES: ['Vida nocturna en Río: bares y samba | Ernestinho Carioca', 'Descubre qué hacer de noche en Río: bares, samba, rooftops y locales para elegir según tu barrio y tu estilo con Ernestinho Carioca.'],
    PT: ['Vida noturna no Rio: bares e samba | Ernestinho Carioca', 'Descubra o que fazer à noite no Rio: bares, samba, rooftops e lugares para escolher conforme seu bairro e seu estilo com Ernestinho Carioca.'],
    EN: ['Rio Nightlife: Bars & Samba | Ernestinho Carioca', 'Discover Rio after dark: bars, samba, rooftops and venues to suit your neighbourhood and style with Ernestinho Carioca.']
  },
  '/transportes/': {
    ES: ['Cómo moverse en Río de Janeiro | Ernestinho Carioca', 'Muévete por Río con consejos sobre metro, Uber, VLT, BRT, autobuses, bicicletas y transporte privado de Ernestinho Carioca.'],
    PT: ['Como se locomover no Rio de Janeiro | Ernestinho Carioca', 'Circule pelo Rio com dicas sobre metrô, Uber, VLT, BRT, ônibus, bicicletas e transporte privativo do Ernestinho Carioca.'],
    EN: ['Getting Around Rio de Janeiro | Ernestinho Carioca', 'Get around Rio with Ernestinho Carioca’s practical advice on the metro, Uber, VLT, BRT, buses, bikes and private transport.']
  },
  '/hospedaje/': {
    ES: ['Apartamentos en Copacabana: alquiler temporal | Ernestinho', 'Encuentra tu apartamento en Copacabana con Ernestinho Carioca. Conoce las unidades para parejas, familias y grupos y consulta por WhatsApp.'],
    PT: ['Apartamentos em Copacabana: aluguel temporada | Ernestinho', 'Encontre seu apartamento em Copacabana com Ernestinho Carioca. Conheça as unidades para casais, famílias e grupos e consulte pelo WhatsApp.'],
    EN: ['Copacabana Holiday Apartments | Ernestinho Carioca', 'Find your Copacabana apartment with Ernestinho Carioca. Explore accommodation for couples, families and groups and enquire on WhatsApp.']
  },
  '/experiencias/cristo-city-tour/': {
    ES: ['Tour Cristo Redentor y City Tour en Río | Ernestinho', 'Conoce el Cristo Redentor y puntos emblemáticos de Río de Janeiro en el Cristo + City Tour de Ernestinho Carioca. Consulta los detalles y reserva.'],
    PT: ['Tour Cristo Redentor e City Tour no Rio | Ernestinho', 'Conheça o Cristo Redentor e pontos emblemáticos do Rio de Janeiro no Cristo + City Tour do Ernestinho Carioca. Consulte os detalhes e reserve.'],
    EN: ['Christ the Redeemer & Rio City Tour | Ernestinho', 'Visit Christ the Redeemer and Rio de Janeiro landmarks on Ernestinho Carioca’s Christ + City Tour. Explore the details and enquire about booking.']
  },
  '/experiencias/full-day-rio/': {
    ES: ['Full Day Río: Cristo y Pan de Azúcar | Ernestinho Carioca', 'Descubre Río en un día completo: Cristo Redentor, Pan de Azúcar y otros símbolos de la ciudad en el Full Day de Ernestinho Carioca.'],
    PT: ['Full Day Rio: Cristo e Pão de Açúcar | Ernestinho Carioca', 'Descubra o Rio em um dia completo: Cristo Redentor, Pão de Açúcar e outros símbolos da cidade no Full Day do Ernestinho Carioca.'],
    EN: ['Rio Full Day: Christ & Sugarloaf | Ernestinho Carioca', 'Discover Rio on a full day tour: Christ the Redeemer, Sugarloaf Mountain and other city landmarks with Ernestinho Carioca.']
  },
  '/experiencias/partido-maracana/': {
    ES: ['Partidos en el Maracaná: entradas y experiencia | Ernestinho', 'Vive un partido en el Maracaná con Ernestinho Carioca. Consulta los próximos encuentros y los detalles de la experiencia antes de reservar.'],
    PT: ['Jogos no Maracanã: ingressos e experiência | Ernestinho', 'Viva um jogo no Maracanã com Ernestinho Carioca. Consulte as próximas partidas e os detalhes da experiência antes de reservar.'],
    EN: ['Maracanã Football Matches & Tickets | Ernestinho', 'Experience a football match at the Maracanã with Ernestinho Carioca. Check upcoming fixtures and experience details before booking.']
  },
  '/naturaleza/trilha-transcarioca-trecho-09/': {
    ES: ['Transcarioca Trecho 09: Teixeiras y Catonho | Ernestinho Carioca', 'Mi guía del Trecho 09 de la Trilha Transcarioca: distancia, tiempo, dificultad, mapa de referencia y dudas que conviene resolver antes de salir.'],
    PT: ['Transcarioca Trecho 09: Teixeiras e Catonho | Ernestinho Carioca', 'Meu guia do Trecho 09 da Trilha Transcarioca: distância, tempo, dificuldade, mapa de referência e dúvidas para esclarecer antes de sair.'],
    EN: ['Transcarioca Section 09: Teixeiras to Catonho | Ernestinho Carioca', 'My guide to Transcarioca Section 09: distance, time, difficulty, a general map and questions to resolve before setting out.']
  },
  '/naturaleza/adutoras-guandu-pedra-branca/': {
    ES: ['Adutoras del Guandu: el agua invisible de Río | Ernestinho Carioca', 'Historia del abastecimiento, infraestructura y paisaje en Pedra Branca y la Zona Oeste.'],
    PT: ['Adutoras do Guandu: a água invisível do Rio | Ernestinho Carioca', 'História do abastecimento, infraestrutura e paisagem na Pedra Branca e na Zona Oeste.'],
    EN: ['Guandu aqueduct system: Rio’s invisible water | Ernestinho Carioca', 'The history of water supply, infrastructure and landscape in Pedra Branca and Rio’s West Zone.']
  },
  '/naturaleza/aqueduto-do-catonho/': {
    ES: ['Aqueduto do Catonho: historia del agua | Ernestinho Carioca', 'Historia del Aqueduto do Catonho, parte visible del sistema hídrico del Guandu, y límites de acceso para leerlo con respeto.'],
    PT: ['Aqueduto do Catonho: história da água | Ernestinho Carioca', 'História do Aqueduto do Catonho, parte visível do sistema hídrico do Guandu, e limites de acesso para conhecê-lo com respeito.'],
    EN: ['Aqueduto do Catonho: water history | Ernestinho Carioca', 'The story of Aqueduto do Catonho, a visible part of the Guandu water system, and responsible access boundaries.']
  },
  '/naturaleza/ponte-da-cachoeira-adutora/': {
    ES: ['Ponte da Cachoeira: infraestructura del Guandu | Ernestinho Carioca', 'La Ponte da Cachoeira es una estructura del sistema hídrico del Guandu. Conoce su extensión y por qué no es una cascada ni un acceso turístico confirmado.'],
    PT: ['Ponte da Cachoeira: infraestrutura do Guandu | Ernestinho Carioca', 'A Ponte da Cachoeira é uma estrutura do sistema hídrico do Guandu. Conheça sua extensão e por que ela não é uma cachoeira nem um acesso turístico confirmado.'],
    EN: ['Ponte da Cachoeira: Guandu infrastructure | Ernestinho Carioca', 'Ponte da Cachoeira is part of the Guandu water system. Learn its documented length and why it is not a waterfall or confirmed tourist access.']
  },
  '/naturaleza/ponte-do-governo-realengo/': {
    ES: ['Ponte do Governo, Realengo: obra hidráulica | Ernestinho Carioca', 'Conoce la Ponte do Governo, una estructura de unos 200 m vinculada al sistema del Guandu, y no la confundas con la Rua do Governo de Piraquara.'],
    PT: ['Ponte do Governo, Realengo: obra hidráulica | Ernestinho Carioca', 'Conheça a Ponte do Governo, estrutura de cerca de 200 m ligada ao sistema do Guandu, sem confundi-la com a Rua do Governo, em Piraquara.'],
    EN: ['Ponte do Governo, Realengo: water infrastructure | Ernestinho Carioca', 'Learn about Ponte do Governo, a roughly 200 m structure in the Guandu system, and how it differs from Rua do Governo in Piraquara.']
  },
  '/naturaleza/parque-natural-municipal-da-prainha/': {
    ES: ['Parque Natural Municipal da Prainha: visita y senderos | Ernestinho Carioca', 'Mi guía del Parque Natural Municipal da Prainha: horarios, acceso general, conservación, cómo planear el día y qué confirmar antes de caminar.'],
    PT: ['Parque Natural Municipal da Prainha: visita e trilhas | Ernestinho Carioca', 'Meu guia do Parque Natural Municipal da Prainha: horários, acesso geral, conservação, como planejar o dia e o que confirmar antes de caminhar.'],
    EN: ['Prainha Municipal Natural Park: visit and trails | Ernestinho Carioca', 'My guide to Prainha Municipal Natural Park: hours, general access, conservation, day planning and what to confirm before hiking.']
  },
  '/naturaleza/mirante-da-prainha/': {
    ES: ['Mirante da Prainha: vistas y acceso por confirmar | Ernestinho Carioca', 'Guía prudente del punto panorámico asociado a Prainha: cómo distinguirlo de Caeté y del restaurante, mapa de referencia y condiciones que debo confirmar.'],
    PT: ['Mirante da Prainha: vista e acesso a confirmar | Ernestinho Carioca', 'Guia cuidadoso do ponto panorâmico associado à Prainha: como diferenciá-lo do Caeté e do restaurante, mapa de referência e condições a confirmar.'],
    EN: ['Mirante da Prainha: views and access to confirm | Ernestinho Carioca', 'A careful guide to the viewpoint associated with Prainha: how to distinguish it from Caeté and the restaurant, a reference map and conditions to confirm.']
  },
  '/naturaleza/parque-natural-municipal-de-grumari/': {
    ES: ['Parque Natural Municipal de Grumari: guía y acceso | Ernestinho Carioca', 'Mi guía del Parque Natural Municipal de Grumari: ecosistemas, accesos generales, horario municipal, cuidados y diferencias con Pedra Branca y el APA.'],
    PT: ['Parque Natural Municipal de Grumari: guia e acesso | Ernestinho Carioca', 'Meu guia do Parque Natural Municipal de Grumari: ecossistemas, acessos gerais, horário municipal, cuidados e diferenças em relação à Pedra Branca e à APA.'],
    EN: ['Grumari Municipal Natural Park: guide and access | Ernestinho Carioca', 'My guide to Grumari Municipal Natural Park: ecosystems, general access, city hours, visitor care and how it differs from Pedra Branca and the APA.']
  },
  '/naturaleza/mirante-de-grumari/': {
    ES: ['Mirante de Grumari: paisaje, acceso y mapa | Ernestinho Carioca', 'Guía de planificación del Mirante de Grumari: punto de carretera aún por identificar, seguridad vial, vista costera y cómo combinarlo con el parque.'],
    PT: ['Mirante de Grumari: paisagem, acesso e mapa | Ernestinho Carioca', 'Guia de planejamento do Mirante de Grumari: ponto na estrada ainda a identificar, segurança viária, vista costeira e como combinar com o parque.'],
    EN: ['Mirante de Grumari: views, access and map | Ernestinho Carioca', 'A planning guide to Mirante de Grumari: a roadside point still to identify, road safety, coastal views and pairing it with the park.']
  },
  '/naturaleza/apa-de-grumari/': {
    ES: ['APA de Grumari: mapa, conservación y contexto | Ernestinho Carioca', 'Una guía de contexto sobre la APA de Grumari: qué protege, cómo se diferencia del parque municipal y cómo evitar confundir una unidad territorial con una atracción.'],
    PT: ['APA de Grumari: mapa, conservação e contexto | Ernestinho Carioca', 'Um guia de contexto sobre a APA de Grumari: o que protege, como se diferencia do parque municipal e como não confundir uma unidade territorial com uma atração.'],
    EN: ['Grumari APA: map, conservation and context | Ernestinho Carioca', 'A context guide to the Grumari APA: what it protects, how it differs from the municipal park and why it is a territory, not an attraction.']
  },
  '/naturaleza/parque-natural-municipal-da-prainha/': {
    ES: ['Parque Natural Municipal da Prainha: visita y senderos | Ernestinho Carioca', 'Mi guía del Parque Natural Municipal da Prainha: horarios, acceso general, conservación, cómo planear el día y qué confirmar antes de caminar.'],
    PT: ['Parque Natural Municipal da Prainha: visita e trilhas | Ernestinho Carioca', 'Meu guia do Parque Natural Municipal da Prainha: horários, acesso geral, conservação, como planejar o dia e o que confirmar antes de caminhar.'],
    EN: ['Prainha Municipal Natural Park: visit and trails | Ernestinho Carioca', 'My guide to Prainha Municipal Natural Park: hours, general access, conservation, day planning and what to confirm before hiking.']
  },
  '/naturaleza/mirante-da-prainha/': {
    ES: ['Mirante da Prainha: vistas y acceso por confirmar | Ernestinho Carioca', 'Guía prudente del punto panorámico asociado a Prainha: cómo distinguirlo de Caeté y del restaurante, mapa de referencia y condiciones que debo confirmar.'],
    PT: ['Mirante da Prainha: vista e acesso a confirmar | Ernestinho Carioca', 'Guia cuidadoso do ponto panorâmico associado à Prainha: como diferenciá-lo do Caeté e do restaurante, mapa de referência e condições a confirmar.'],
    EN: ['Mirante da Prainha: views and access to confirm | Ernestinho Carioca', 'A careful guide to the viewpoint associated with Prainha: how to distinguish it from Caeté and the restaurant, a reference map and conditions to confirm.']
  },
  '/naturaleza/parque-natural-municipal-de-grumari/': {
    ES: ['Parque Natural Municipal de Grumari: guía y acceso | Ernestinho Carioca', 'Mi guía del Parque Natural Municipal de Grumari: ecosistemas, accesos generales, horario municipal, cuidados y diferencias con Pedra Branca y el APA.'],
    PT: ['Parque Natural Municipal de Grumari: guia e acesso | Ernestinho Carioca', 'Meu guia do Parque Natural Municipal de Grumari: ecossistemas, acessos gerais, horário municipal, cuidados e diferenças em relação à Pedra Branca e à APA.'],
    EN: ['Grumari Municipal Natural Park: guide and access | Ernestinho Carioca', 'My guide to Grumari Municipal Natural Park: ecosystems, general access, city hours, visitor care and how it differs from Pedra Branca and the APA.']
  },
  '/naturaleza/mirante-de-grumari/': {
    ES: ['Mirante de Grumari: paisaje, acceso y mapa | Ernestinho Carioca', 'Guía de planificación del Mirante de Grumari: punto de carretera aún por identificar, seguridad vial, vista costera y cómo combinarlo con el parque.'],
    PT: ['Mirante de Grumari: paisagem, acesso e mapa | Ernestinho Carioca', 'Guia de planejamento do Mirante de Grumari: ponto na estrada ainda a identificar, segurança viária, vista costeira e como combinar com o parque.'],
    EN: ['Mirante de Grumari: views, access and map | Ernestinho Carioca', 'A planning guide to Mirante de Grumari: a roadside point still to identify, road safety, coastal views and pairing it with the park.']
  },
  '/naturaleza/apa-de-grumari/': {
    ES: ['APA de Grumari: mapa, conservación y contexto | Ernestinho Carioca', 'Una guía de contexto sobre la APA de Grumari: qué protege, cómo se diferencia del parque municipal y cómo evitar confundir una unidad territorial con una atracción.'],
    PT: ['APA de Grumari: mapa, conservação e contexto | Ernestinho Carioca', 'Um guia de contexto sobre a APA de Grumari: o que protege, como se diferencia do parque municipal e como não confundir uma unidade territorial com uma atração.'],
    EN: ['Grumari APA: map, conservation and context | Ernestinho Carioca', 'A context guide to the Grumari APA: what it protects, how it differs from the municipal park and why it is a territory, not an attraction.']
  },
  '/naturaleza/restinga-de-grumari/': {
    ES: ['Restinga de Grumari: ecosistema y visita responsable | Ernestinho Carioca', 'Mi guía para entender la restinga de Grumari: cómo vive entre arena, sal, viento y bosque, qué observar y cómo no dañar un ecosistema frágil.'],
    PT: ['Restinga de Grumari: ecossistema e visita responsável | Ernestinho Carioca', 'Meu guia para entender a restinga de Grumari: como vive entre areia, sal, vento e floresta, o que observar e como não danificar esse ecossistema frágil.'],
    EN: ['Grumari Restinga: ecosystem and responsible visits | Ernestinho Carioca', 'My guide to Grumari’s restinga: life among sand, salt, wind and forest, what to observe and how to protect a fragile ecosystem.']
  },
  '/naturaleza/transicion-montana-mar-guaratiba/': {
    ES: ['Montaña y mar en Guaratiba: paisaje y ecosistemas | Ernestinho Carioca', 'Una lectura de la transición entre Pedra Branca, las bajadas costeras, la restinga, los manglares y el mar en el extremo oeste de Río.'],
    PT: ['Montanha e mar em Guaratiba: paisagem e ecossistemas | Ernestinho Carioca', 'Uma leitura da transição entre Pedra Branca, baixadas costeiras, restinga, manguezais e mar no extremo oeste do Rio.'],
    EN: ['Mountain and sea in Guaratiba: landscape and ecosystems | Ernestinho Carioca', 'A guide to the transition between Pedra Branca, coastal lowlands, restinga, mangroves and sea in Rio’s far west.']
  },
  '/naturaleza/barra-de-guaratiba-contexto-natural/': {
    ES: ['Barra de Guaratiba: naturaleza, mar y territorio | Ernestinho Carioca', 'Mi guía de contexto natural para Barra de Guaratiba: costa, montaña, pesca, conservación, logística y cómo distinguirla de los barrios vecinos.'],
    PT: ['Barra de Guaratiba: natureza, mar e território | Ernestinho Carioca', 'Meu guia de contexto natural para Barra de Guaratiba: litoral, montanha, pesca, conservação, logística e diferenças em relação aos bairros vizinhos.'],
    EN: ['Barra de Guaratiba: nature, sea and place | Ernestinho Carioca', 'A natural context guide to Barra de Guaratiba: coast, mountains, fishing, conservation, logistics and how it differs from nearby neighborhoods.']
  },
  '/naturaleza/pedra-de-guaratiba-contexto-ambiental/': {
    ES: ['Pedra de Guaratiba: bahía, manglar y paisaje | Ernestinho Carioca', 'Mi guía para leer el paisaje de Pedra de Guaratiba: Baía de Sepetiba, pesca, áreas intermareales y conservación sin confundirla con Barra o Ilha de Guaratiba.'],
    PT: ['Pedra de Guaratiba: baía, manguezal e paisagem | Ernestinho Carioca', 'Meu guia da paisagem de Pedra de Guaratiba: Baía de Sepetiba, pesca, áreas entremarés e conservação, sem confundi-la com Barra ou Ilha de Guaratiba.'],
    EN: ['Pedra de Guaratiba: bay, mangroves and landscape | Ernestinho Carioca', 'My guide to Pedra de Guaratiba’s landscape: Sepetiba Bay, fishing, intertidal areas and conservation, distinct from Barra or Ilha de Guaratiba.']
  },
  '/naturaleza/manguezais-de-guaratiba/': {
    ES: ['Manguezales de Guaratiba: ecosistema y cuidado | Ernestinho Carioca', 'Mi guía de los manglares de Guaratiba: su papel en la Baía de Sepetiba, conservación, biodiversidad y cómo observarlos sin entrar en áreas sensibles.'],
    PT: ['Manguezais de Guaratiba: ecossistema e cuidado | Ernestinho Carioca', 'Meu guia dos manguezais de Guaratiba: seu papel na Baía de Sepetiba, conservação, biodiversidade e como observá-los sem entrar em áreas sensíveis.'],
    EN: ['Guaratiba mangroves: ecosystem and care | Ernestinho Carioca', 'My guide to Guaratiba’s mangroves: their role in Sepetiba Bay, conservation, biodiversity and how to observe without entering sensitive areas.']
  },
  '/naturaleza/restinga-de-grumari/': {
    ES: ['Restinga de Grumari: ecosistema y visita responsable | Ernestinho Carioca', 'Mi guía para entender la restinga de Grumari: cómo vive entre arena, sal, viento y bosque, qué observar y cómo no dañar un ecosistema frágil.'],
    PT: ['Restinga de Grumari: ecossistema e visita responsável | Ernestinho Carioca', 'Meu guia para entender a restinga de Grumari: como vive entre areia, sal, vento e floresta, o que observar e como não danificar esse ecossistema frágil.'],
    EN: ['Grumari Restinga: ecosystem and responsible visits | Ernestinho Carioca', 'My guide to Grumari’s restinga: life among sand, salt, wind and forest, what to observe and how to protect a fragile ecosystem.']
  },
  '/naturaleza/transicion-montana-mar-guaratiba/': {
    ES: ['Montaña y mar en Guaratiba: paisaje y ecosistemas | Ernestinho Carioca', 'Una lectura de la transición entre Pedra Branca, las bajadas costeras, la restinga, los manglares y el mar en el extremo oeste de Río.'],
    PT: ['Montanha e mar em Guaratiba: paisagem e ecossistemas | Ernestinho Carioca', 'Uma leitura da transição entre Pedra Branca, baixadas costeiras, restinga, manguezais e mar no extremo oeste do Rio.'],
    EN: ['Mountain and sea in Guaratiba: landscape and ecosystems | Ernestinho Carioca', 'A guide to the transition between Pedra Branca, coastal lowlands, restinga, mangroves and sea in Rio’s far west.']
  },
  '/naturaleza/barra-de-guaratiba-contexto-natural/': {
    ES: ['Barra de Guaratiba: naturaleza, mar y territorio | Ernestinho Carioca', 'Mi guía de contexto natural para Barra de Guaratiba: costa, montaña, pesca, conservación, logística y cómo distinguirla de los barrios vecinos.'],
    PT: ['Barra de Guaratiba: natureza, mar e território | Ernestinho Carioca', 'Meu guia de contexto natural para Barra de Guaratiba: litoral, montanha, pesca, conservação, logística e diferenças em relação aos bairros vizinhos.'],
    EN: ['Barra de Guaratiba: nature, sea and place | Ernestinho Carioca', 'A natural context guide to Barra de Guaratiba: coast, mountains, fishing, conservation, logistics and how it differs from nearby neighborhoods.']
  },
  '/naturaleza/pedra-de-guaratiba-contexto-ambiental/': {
    ES: ['Pedra de Guaratiba: bahía, manglar y paisaje | Ernestinho Carioca', 'Mi guía para leer el paisaje de Pedra de Guaratiba: Baía de Sepetiba, pesca, áreas intermareales y conservación sin confundirla con Barra o Ilha de Guaratiba.'],
    PT: ['Pedra de Guaratiba: baía, manguezal e paisagem | Ernestinho Carioca', 'Meu guia da paisagem de Pedra de Guaratiba: Baía de Sepetiba, pesca, áreas entremarés e conservação, sem confundi-la com Barra ou Ilha de Guaratiba.'],
    EN: ['Pedra de Guaratiba: bay, mangroves and landscape | Ernestinho Carioca', 'My guide to Pedra de Guaratiba’s landscape: Sepetiba Bay, fishing, intertidal areas and conservation, distinct from Barra or Ilha de Guaratiba.']
  },
  '/naturaleza/manguezais-de-guaratiba/': {
    ES: ['Manguezales de Guaratiba: ecosistema y cuidado | Ernestinho Carioca', 'Mi guía de los manglares de Guaratiba: su papel en la Baía de Sepetiba, conservación, biodiversidad y cómo observarlos sin entrar en áreas sensibles.'],
    PT: ['Manguezais de Guaratiba: ecossistema e cuidado | Ernestinho Carioca', 'Meu guia dos manguezais de Guaratiba: seu papel na Baía de Sepetiba, conservação, biodiversidade e como observá-los sem entrar em áreas sensíveis.'],
    EN: ['Guaratiba mangroves: ecosystem and care | Ernestinho Carioca', 'My guide to Guaratiba’s mangroves: their role in Sepetiba Bay, conservation, biodiversity and how to observe without entering sensitive areas.']
  },
  '/naturaleza/trilha-transcarioca-trecho-21/': {
    ES: ['Transcarioca Trecho 21: Circuito da Catacumba | Ernestinho Carioca', 'Mi guía del Circuito do Parque da Catacumba: 1,1 km y aprox. una hora, miradores, esculturas, horario municipal y contexto histórico con respeto.'],
    PT: ['Transcarioca Trecho 21: Circuito da Catacumba | Ernestinho Carioca', 'Meu guia do Circuito do Parque da Catacumba: 1,1 km e cerca de uma hora, mirantes, esculturas, horário municipal e contexto histórico com respeito.'],
    EN: ['Transcarioca Section 21: Catacumba Circuit | Ernestinho Carioca', 'My guide to A 1.1 km circuit of Parque da Catacumba with viewpoints, outdoor art, city hours and respectful historical context.']
  },
  '/naturaleza/trilha-transcarioca-trecho-23/': {
    ES: ['Transcarioca Trecho 23: Morro São João y Chacrinha | Ernestinho Carioca', 'Mi guía del La Transcarioca recomienda hoy una ida y vuelta desde el Parque da Chacrinha hasta Morro São João; revisa acceso y horario.'],
    PT: ['Transcarioca Trecho 23: Morro São João e Chacrinha | Ernestinho Carioca', 'Meu guia do A Transcarioca recomenda hoje uma ida e volta do Parque da Chacrinha até o Morro São João; confira acesso e horário.'],
    EN: ['Transcarioca Section 23: Morro São João and Chacrinha | Ernestinho Carioca', 'My guide to Transcarioca currently recommends an out-and-back from Parque da Chacrinha to Morro São João; check access and hours.']
  },
  '/naturaleza/trilha-transcarioca-trecho-24/': {
    ES: ['Transcarioca Trecho 24: Circuito do Morro da Babilônia | Ernestinho Carioca', 'Mi guía del Una ruta de montaña con riesgo alto, orientación difícil y guía local recomendado; aclaro las variantes y el regreso seguro.'],
    PT: ['Transcarioca Trecho 24: Circuito do Morro da Babilônia | Ernestinho Carioca', 'Meu guia do Uma rota de montanha com risco alto, orientação difícil e guia local recomendado; explico as variantes e o retorno seguro.'],
    EN: ['Transcarioca Section 24: Morro da Babilônia Circuit | Ernestinho Carioca', 'My guide to A mountain route with high risk, difficult navigation and a recommended local guide; understand route variants and safe return.']
  },
  '/naturaleza/trilha-transcarioca-trecho-25/': {
    ES: ['Transcarioca Trecho 25: Praia Vermelha y Morro da Urca | Ernestinho Carioca', 'Mi guía del 1,9 km y cerca de una hora por Pista Cláudio Coutinho y el sendero; separa la caminata gratuita del Bondinho.'],
    PT: ['Transcarioca Trecho 25: Praia Vermelha e Morro da Urca | Ernestinho Carioca', 'Meu guia do 1,9 km e cerca de uma hora pela Pista Cláudio Coutinho e trilha; diferencie a caminhada gratuita do Bondinho.'],
    EN: ['Transcarioca Section 25: Praia Vermelha and Morro da Urca | Ernestinho Carioca', 'My guide to A 1.9 km walk along Pista Cláudio Coutinho and the trail; distinguish the free hike from the cable car.']
  },
  '/naturaleza/trilha-transcarioca-trecho-26/': {
    ES: ['Transcarioca Trecho 26: Ilha Comprida | Ernestinho Carioca', 'Mi guía del Guía de la Trilha da Comprida, con acceso marítimo, protocolo de ICMBio, seguridad y condiciones actuales de visita.'],
    PT: ['Transcarioca Trecho 26: Ilha Comprida | Ernestinho Carioca', 'Meu guia do Guia da Trilha da Comprida, com acesso marítimo, protocolo do ICMBio, segurança e condições atuais de visitação.'],
    EN: ['Transcarioca Section 26: Ilha Comprida | Ernestinho Carioca', 'My guide to Guide to Trilha da Comprida, with maritime access, ICMBio protocols, safety and current visitor conditions.']
  },
  '/naturaleza/trilha-transcarioca-trecho-16/': {
    ES: ['Transcarioca Trecho 16: Vista Chinesa y Dona Castorina | Ernestinho Carioca', 'Mi guía del Trecho 16 de la Transcarioca en el Parque Nacional da Tijuca: 3,5 km y unas 2 h 30, con circuito opcional del Parque da Cidade de 2,8 km y unas 2 h. Dificultad moderada; confirma horarios, acceso y regreso.'],
    PT: ['Transcarioca Trecho 16: Vista Chinesa e Dona Castorina | Ernestinho Carioca', 'Meu guia do Trecho 16 da Transcarioca no Parque Nacional da Tijuca: 3,5 km e cerca de 2h30, com circuito opcional do Parque da Cidade de 2,8 km e cerca de 2h. Dificuldade moderada; confirme horários, acesso e retorno.'],
    EN: ['Transcarioca Section 16: Vista Chinesa and Dona Castorina | Ernestinho Carioca', 'My guide to Transcarioca Section 16 in Tijuca National Park: 3.5 km and about 2.5 hours, with an optional 2.8 km Parque da Cidade circuit taking about 2 hours. Moderate; confirm access, hours and return logistics.']
  },
  '/naturaleza/trilha-transcarioca-trecho-17/': {
    ES: ['Transcarioca Trecho 17: Dona Castorina y Cachoeira dos Primatas | Ernestinho Carioca', 'Mi guía del Trecho 17 de la Transcarioca en el Parque Nacional da Tijuca: 3,9 km y unas 2 h 30 por bosque, cascadas y mirador; disfruta el jequitibá centenario desde el sendero.'],
    PT: ['Transcarioca Trecho 17: Dona Castorina e Cachoeira dos Primatas | Ernestinho Carioca', 'Meu guia do Trecho 17 da Transcarioca no Parque Nacional da Tijuca: 3,9 km e cerca de 2h30 por mata, cachoeiras e mirante; observe o jequitibá centenário sem sair da trilha.'],
    EN: ['Transcarioca Section 17: Dona Castorina and Cachoeira dos Primatas | Ernestinho Carioca', 'My guide to Transcarioca Section 17 in Tijuca National Park: 3.9 km and about 2.5 hours through forest, waterfalls and a viewpoint; admire the old jequitibá from the trail.']
  },
  '/naturaleza/trilha-transcarioca-trecho-18/': {
    ES: ['Transcarioca Trecho 18: Cachoeira dos Primatas y Paineiras | Ernestinho Carioca', 'Mi guía del Trecho 18 de la Transcarioca en el Parque Nacional da Tijuca: 4,2 km y unas 2 h 30 hacia Paineiras; riesgo medio y exposición solar alta. Planifica posibles salidas y transporte.'],
    PT: ['Transcarioca Trecho 18: Cachoeira dos Primatas e Paineiras | Ernestinho Carioca', 'Meu guia do Trecho 18 da Transcarioca no Parque Nacional da Tijuca: 4,2 km e cerca de 2h30 até Paineiras; risco médio e exposição solar alta. Planeje possíveis saídas e transporte.'],
    EN: ['Transcarioca Section 18: Cachoeira dos Primatas and Paineiras | Ernestinho Carioca', 'My guide to Transcarioca Section 18 in Tijuca National Park: 4.2 km and about 2.5 hours to Paineiras; medium risk and high sun exposure. Plan possible exits and transport.']
  },
  '/naturaleza/trilha-transcarioca-trecho-19/': {
    ES: ['Transcarioca Trecho 19: Paineiras y Parque Lage | Ernestinho Carioca', 'Mi guía del Trecho 19 de la Transcarioca en el Parque Nacional da Tijuca: 3,3 km y unas 2 h 30, con escalaminhada y riesgo técnico alto; prepara el terreno y cruces con tránsito.'],
    PT: ['Transcarioca Trecho 19: Paineiras e Parque Lage | Ernestinho Carioca', 'Meu guia do Trecho 19 da Transcarioca no Parque Nacional da Tijuca: 3,3 km e cerca de 2h30, com escalaminhada e risco técnico alto; prepare-se para o terreno e trechos com trânsito.'],
    EN: ['Transcarioca Section 19: Paineiras and Parque Lage | Ernestinho Carioca', 'My guide to Transcarioca Section 19 in Tijuca National Park: 3.3 km and about 2.5 hours, with scrambling and high technical risk; prepare for the terrain and sections with traffic.']
  },
  '/naturaleza/trilha-transcarioca-trecho-20/': {
    ES: ['Transcarioca Trecho 20: Parque Lage, Lagoa y Catacumba | Ernestinho Carioca', 'Mi guía del Trecho 20 de la Transcarioca en el Parque Nacional da Tijuca: El resumen publica 3,6 km y la ficha técnica 4,3 km/~1 h. Planifica con la cifra mayor; incluye cruces urbanos y ciclovía.'],
    PT: ['Transcarioca Trecho 20: Parque Lage, Lagoa e Catacumba | Ernestinho Carioca', 'Meu guia do Trecho 20 da Transcarioca no Parque Nacional da Tijuca: O resumo informa 3,6 km e a ficha técnica 4,3 km/1h. Planeje pela distância maior; há travessias urbanas e ciclovia.'],
    EN: ['Transcarioca Section 20: Parque Lage, Lagoa and Catacumba | Ernestinho Carioca', 'My guide to Transcarioca Section 20 in Tijuca National Park: The summary lists 3.6 km and the technical sheet 4.3 km/about 1 hour. Plan for the longer distance; expect urban crossings and a cycle path.']
  },
  '/naturaleza/trilha-transcarioca-trecho-11/': {
    ES: ['Transcarioca Trecho 11: Represa dos Ciganos y Bom Retiro | Ernestinho Carioca', 'Mi guía del Trecho 11 de la Transcarioca en el Parque Nacional da Tijuca: 9,5 km, unas cinco horas, dificultad alta, horario, mapa y la advertencia de que el baño en la represa está prohibido.'],
    PT: ['Transcarioca Trecho 11: Represa dos Ciganos e Bom Retiro | Ernestinho Carioca', 'Meu guia do Trecho 11 da Transcarioca no Parque Nacional da Tijuca: 9,5 km, cerca de cinco horas, dificuldade alta, horário, mapa e o aviso de que o banho na represa é proibido.'],
    EN: ['Transcarioca Section 11: Represa dos Ciganos and Bom Retiro | Ernestinho Carioca', 'My guide to Transcarioca Section 11 in Tijuca National Park: 9.5 km, about five hours, high difficulty, hours, map and the warning that swimming in the reservoir is prohibited.']
  },
  '/naturaleza/trilha-transcarioca-trecho-12/': {
    ES: ['Transcarioca Trecho 12: Bom Retiro y Centro de Visitantes | Ernestinho Carioca', 'Mi guía del Trecho 12 de la Transcarioca en el Parque Nacional da Tijuca: 6,6 km y unas cuatro horas, con un paso de escalaminhada en el sector de Bico do Papagaio.'],
    PT: ['Transcarioca Trecho 12: Bom Retiro e Centro de Visitantes | Ernestinho Carioca', 'Meu guia do Trecho 12 da Transcarioca no Parque Nacional da Tijuca: 6,6 km e cerca de quatro horas, com um trecho de escalaminhada no setor do Bico do Papagaio.'],
    EN: ['Transcarioca Section 12: Bom Retiro and Visitor Centre | Ernestinho Carioca', 'My guide to Transcarioca Section 12 in Tijuca National Park: 6.6 km and about four hours, with a scrambling section near Bico do Papagaio.']
  },
  '/naturaleza/trilha-transcarioca-trecho-13/': {
    ES: ['Transcarioca Trecho 13: Centro de Visitantes y Portão da Floresta | Ernestinho Carioca', 'Mi guía del Trecho 13 de la Transcarioca en el Parque Nacional da Tijuca: 4,6 km entre miradores, cascada y paradas culturales; comprueba horarios de servicios y transporte.'],
    PT: ['Transcarioca Trecho 13: Centro de Visitantes e Portão da Floresta | Ernestinho Carioca', 'Meu guia do Trecho 13 da Transcarioca no Parque Nacional da Tijuca: 4,6 km entre mirantes, cachoeira e paradas culturais; confira horários dos serviços e transporte.'],
    EN: ['Transcarioca Section 13: Visitor Centre and Forest Gate | Ernestinho Carioca', 'My guide to Transcarioca Section 13 in Tijuca National Park: 4.6 km among viewpoints, a waterfall and cultural stops; check service hours and transport.']
  },
  '/naturaleza/trilha-transcarioca-trecho-14/': {
    ES: ['Transcarioca Trecho 14: Portão da Floresta y Mesa do Imperador | Ernestinho Carioca', 'Mi guía del Trecho 14 de la Transcarioca en el Parque Nacional da Tijuca: Un tramo con miradores y dos métricas oficiales distintas; organiza el día con la estimación larga.'],
    PT: ['Transcarioca Trecho 14: Portão da Floresta e Mesa do Imperador | Ernestinho Carioca', 'Meu guia do Trecho 14 da Transcarioca no Parque Nacional da Tijuca: Um trecho com mirantes e duas métricas oficiais diferentes; planeje o dia pela estimativa mais longa.'],
    EN: ['Transcarioca Section 14: Forest Gate and Mesa do Imperador | Ernestinho Carioca', 'My guide to Transcarioca Section 14 in Tijuca National Park: A viewpoint trail with conflicting official metrics; plan for the longer estimate.']
  },
  '/naturaleza/trilha-transcarioca-trecho-15/': {
    ES: ['Transcarioca Trecho 15: Mesa do Imperador y Vista Chinesa | Ernestinho Carioca', 'Mi guía del Trecho 15 de la Transcarioca en el Parque Nacional da Tijuca: Un sendero corto entre dos miradores, sin puntos de agua y con extremos distintos.'],
    PT: ['Transcarioca Trecho 15: Mesa do Imperador e Vista Chinesa | Ernestinho Carioca', 'Meu guia do Trecho 15 da Transcarioca no Parque Nacional da Tijuca: Uma trilha curta entre dois mirantes, sem pontos de água e com extremos diferentes.'],
    EN: ['Transcarioca Section 15: Mesa do Imperador and Vista Chinesa | Ernestinho Carioca', 'My guide to Transcarioca Section 15 in Tijuca National Park: A short trail between two viewpoints, with no water points and different endpoints.']
  },
  '/naturaleza/ilha-de-guaratiba-contexto-natural/': {
    ES: ['Ilha de Guaratiba | Ernestinho Carioca', 'Una guía para entender Ilha de Guaratiba como barrio y paisaje periurbano: memoria, vegetación y la relación con los espacios protegidos de la Zona Oeste.'],
    PT: ['Ilha de Guaratiba: território e paisagem | Ernestinho Carioca', 'Meu guia de contexto em Guaratiba, com atenção à conservação, ao acesso responsável e às informações que precisam ser confirmadas antes da visita.'],
    EN: ['Ilha de Guaratiba: place and landscape | Ernestinho Carioca', 'A context guide to Guaratiba, with care for conservation, responsible access and details to confirm before visiting.']
  },
  '/naturaleza/apa-das-brisas/': {
    ES: ['APA das Brisas | Ernestinho Carioca', 'Qué significa la APA das Brisas en Guaratiba, cómo leer su función de conservación y por qué una unidad territorial no equivale a un parque con entrada y horario.'],
    PT: ['APA das Brisas: conservação em Guaratiba | Ernestinho Carioca', 'Meu guia de contexto em Guaratiba, com atenção à conservação, ao acesso responsável e às informações que precisam ser confirmadas antes da visita.'],
    EN: ['APA das Brisas: conservation in Guaratiba | Ernestinho Carioca', 'A context guide to Guaratiba, with care for conservation, responsible access and details to confirm before visiting.']
  },
  '/naturaleza/parque-natural-municipal-serra-capoeira-grande/': {
    ES: ['Parque Natural Municipal da Serra da Capoeira Grande | Ernestinho Carioca', 'Mi guía de contexto del Parque Natural Municipal da Serra da Capoeira Grande: ecosistemas, biodiversidad y qué confirmar antes de planear una visita.'],
    PT: ['Parque Natural Municipal da Serra da Capoeira Grande | Ernestinho Carioca', 'Meu guia de contexto em Guaratiba, com atenção à conservação, ao acesso responsável e às informações que precisam ser confirmadas antes da visita.'],
    EN: ['Serra da Capoeira Grande Municipal Natural Park | Ernestinho Carioca', 'A context guide to Guaratiba, with care for conservation, responsible access and details to confirm before visiting.']
  },
  '/naturaleza/observacao-aves-guaratiba/': {
    ES: ['Observación de aves en Guaratiba | Ernestinho Carioca', 'Cómo disfrutar la observación de aves en Guaratiba con paciencia, fuentes confiables y respeto por las áreas protegidas y sus restricciones de acceso.'],
    PT: ['Observação de aves em Guaratiba | Ernestinho Carioca', 'Meu guia de contexto em Guaratiba, com atenção à conservação, ao acesso responsável e às informações que precisam ser confirmadas antes da visita.'],
    EN: ['Birdwatching in Guaratiba | Ernestinho Carioca', 'A context guide to Guaratiba, with care for conservation, responsible access and details to confirm before visiting.']
  },
  '/naturaleza/pesca-artesanal-guaratiba/': {
    ES: ['Pesca artesanal en Guaratiba | Ernestinho Carioca', 'Una lectura respetuosa de la pesca artesanal y su relación con la Baía de Sepetiba, los manglares y las comunidades de Guaratiba, sin convertir el trabajo local en espectáculo.'],
    PT: ['Pesca artesanal em Guaratiba | Ernestinho Carioca', 'Meu guia de contexto em Guaratiba, com atenção à conservação, ao acesso responsável e às informações que precisam ser confirmadas antes da visita.'],
    EN: ['Artisanal fishing in Guaratiba | Ernestinho Carioca', 'A context guide to Guaratiba, with care for conservation, responsible access and details to confirm before visiting.']
  }
};
Object.assign(SEO_METADATA, ATTRACTION_SEO);
export function applySeoMetadata(language, route = routeParts().path) {
  const copy = SEO_METADATA[route]?.[language];
  if (!copy) return;
  document.title = copy[0];
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const data = JSON.parse(script.textContent);
      for (const node of data['@graph'] || [data]) {
        if (!['WebPage', 'Article'].includes(node['@type'])) continue;
        if (node.url && new URL(node.url, location.href).pathname !== route) continue;
        node.name = copy[0]; node.description = copy[1];
        node.inLanguage = language === 'PT' ? 'pt-BR' : language.toLowerCase();
      }
      script.textContent = JSON.stringify(data);
    } catch { /* Preserve unrelated or invalid legacy markup. */ }
  }
  for (const [key, value] of [['description',copy[1]], ['og:title',copy[0]], ['og:description',copy[1]], ['twitter:title',copy[0]], ['twitter:description',copy[1]]]) {
    const node = document.querySelector(`meta[name="${key}"],meta[property="${key}"]`);
    if (node) node.content = value;
  }
}
