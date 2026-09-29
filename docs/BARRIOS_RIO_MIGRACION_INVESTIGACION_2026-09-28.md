# Barrios de Río — migración, investigación y control final

**Fecha:** 28 de septiembre de 2026
**Rama de trabajo:** `barrios-produccion-20260928`
**Base revisada:** `c3c75de` (rama `main` actualizada antes de integrar Barrios).

## Resultado de inventario

La sección de Barrios contiene **56 páginas HTML de destino** más el directorio `/barrios/`. El directorio presenta 17 guías de corredor (las 9 zonas de V2 y los 8 accesos compuestos de V1) y 40 fichas individuales. Copacabana comparte una ruta entre la guía de corredor y la ficha individual. Se añadieron páginas para recuperar áreas que faltaban en el destino y rutas de V1 que no tenían destino propio.

### Fichas individuales

| Área | Ruta |
|---|---|
| Copacabana | `/barrios/copacabana/` |
| Ipanema | `/barrios/ipanema/` |
| Leblon | `/barrios/leblon/` |
| Botafogo | `/barrios/botafogo/` |
| Urca | `/barrios/urca/` |
| Flamengo | `/barrios/flamengo/` |
| Laranjeiras | `/barrios/laranjeiras/` |
| Catete | `/barrios/catete/` |
| Glória | `/barrios/gloria/` |
| Santa Teresa | `/barrios/santa-teresa/` |
| Lapa | `/barrios/lapa/` |
| Centro | `/barrios/centro/` |
| Lagoa | `/barrios/lagoa/` |
| Jardim Botânico | `/barrios/jardim-botanico/` |
| Gávea | `/barrios/gavea/` |
| São Conrado | `/barrios/sao-conrado/` |
| Barra da Tijuca | `/barrios/barra-da-tijuca/` |
| Ilha da Gigóia | `/barrios/ilha-da-gigoia/` |
| Recreio | `/barrios/recreio/` |
| Vargens | `/barrios/vargens/` |
| Guaratiba | `/barrios/guaratiba/` |
| Sepetiba | `/barrios/sepetiba/` |
| Tijuca | `/barrios/tijuca/` |
| Maracanã | `/barrios/maracana/` |
| São Cristóvão | `/barrios/sao-cristovao/` |
| Madureira | `/barrios/madureira/` |
| CADEG / Benfica | `/barrios/cadeg/` |
| Jacarepaguá | `/barrios/jacarepagua/` |
| Pequena África | `/barrios/pequena-africa/` |
| Largo do Machado | `/barrios/largo-do-machado/` |
| Cinelândia | `/barrios/cinelandia/` |
| Cosme Velho | `/barrios/cosme-velho/` |
| Humaitá | `/barrios/humaita/` |
| Floresta da Tijuca | `/barrios/floresta-da-tijuca/` |
| Alto da Boa Vista | `/barrios/alto-da-boa-vista/` |
| Paquetá | `/barrios/paqueta/` |

Pequena África se presenta como territorio histórico-cultural de la Región Portuaria, no como una delimitación administrativa equivalente a un barrio. Paquetá se añadió porque aparece como zona propia en el registro de lugares V1 y tiene investigación turística y municipal específica.

**Alcance turístico de la guía:** Riotur informa que el municipio tiene 159 barrios oficiales, pero esta guía no pretende ser un catálogo administrativo exhaustivo. Su criterio es editorial y turístico: profundizar en los barrios, corredores y experiencias que un visitante puede querer conocer, y sumar sectores menos habituales cuando aportan una experiencia cultural, histórica o natural relevante. Por eso aparecen lugares como Madureira, Paquetá, Rocinha y Vidigal, mientras que no hace falta crear una ficha para cada barrio residencial sin un motivo claro de visita. Las 40 fichas individuales actuales mezclan barrios oficiales, sectores y territorios culturales o naturales; los corredores se cuentan aparte. La cifra municipal sirve de contexto, no como medida de tareas pendientes. Fuente: [Riotur — Por dentro do Rio](https://riotur.prefeitura.rio/por-dentro-do-rio/).

### Guías de corredor

| Corredor | Ruta |
|---|---|
| Copacabana | `/barrios/copacabana/` |
| Ipanema + Leblon | `/barrios/ipanema-leblon/` |
| Gávea + Jardim Botânico + Lagoa | `/barrios/gavea-jardim-lagoa/` |
| Botafogo + Urca | `/barrios/botafogo-urca/` |
| Flamengo + Glória | `/barrios/flamengo-gloria/` |
| Centro + Praça Mauá | `/barrios/centro-maua/` |
| Santa Teresa + Lapa | `/barrios/santa-lapa/` |
| Zona Norte | `/barrios/zona-norte/` |
| Barra + Zona Oeste | `/barrios/barra-oeste/` |
| Catete + Largo do Machado + Glória | `/barrios/catete-largo-do-machado-gloria/` |
| Cinelândia + Lapa + Santa Teresa | `/barrios/cinelandia-lapa-santa-teresa/` |
| Centro Histórico + Pequena África | `/barrios/centro-historico-pequena-africa/` |
| Barra da Tijuca + Ilha da Gigóia | `/barrios/barra-da-tijuca-ilha-da-gigoia/` |
| Recreio + Vargens + Guaratiba + Sepetiba | `/barrios/recreio-vargens-guaratiba-sepetiba/` |
| São Conrado + Gávea + Jardim Botânico + Lagoa | `/barrios/sao-conrado-gavea-jardim-botanico-lagoa/` |
| Cosme Velho + Humaitá | `/barrios/cosme-velho-humaita/` |
| Floresta da Tijuca + Alto da Boa Vista | `/barrios/floresta-da-tijuca-alto-da-boa-vista/` |

Las 16 rutas de barrio encontradas en `seoResolveRoute` de V1 quedaron atendidas: 7 rutas sencillas ya existentes y las 9 rutas compuestas; las ocho compuestas que no tenían destino estático en V2 recibieron páginas propias. La ruta `zona-norte` ya existía.

## Fotografías originales

### Corrección del inventario

El primer inventario de **14 archivos** era demasiado estrecho: solo había contado las nueve portadas declaradas directamente por el módulo principal de Barrios y cinco imágenes del sistema editorial de Copacabana. Un segundo cruce con Atracciones, Compras, Recorridos, Gastronomía y constantes archivadas de Ernestinho localizó **29 archivos propios adicionales** útiles para contextualizar barrios. Ese material incluye Ipanema, Leblon, Botafogo, Urca, Catete, Glória, Lapa, Lagoa, Jardim Botânico, Barra, Gigóia, Guaratiba, Floresta da Tijuca, Paquetá, Maracanã, São Cristóvão, Madureira, CADEG y Pequena África. Las URLs versionadas de Cloudinary se conservan.

También se corrigió un error de render en la función maestra de Copacabana: una comilla hacía que el bloque de línea de tiempo, arquitectura, microzonas, historias, consejos, conexiones y galería quedara dentro de una cadena y nunca fuese devuelto al HTML. La sintaxis era válida, por lo que `node --check` no detectaba el problema. La verificación del DOM local confirma ahora la presencia del bloque maestro, la línea de tiempo y la galería.

### Atlas editorial completo

La ficha de Pequena África se profundizó como territorio turístico-cultural, no como barrio administrativo: incluye la historia del nombre atribuido a Heitor dos Prazeres, el Cais do Valongo (1811–1831; redescubierto en 2011 e inscrito por la UNESCO en 2017), el Cemitério dos Pretos Novos (1769–1830; hallazgo en 1996), Pedra do Sal, MUHCAB, IPN, Jardins Suspensos, Morro da Conceição y Largo da Prainha. Las tres imágenes ya recuperadas del proyecto se intercalan en el atlas. La ficha mantiene el contexto de violencia y memoria junto a la continuidad de comunidades negras y de su producción cultural; no publica horarios fijos ni una ruta guiada paso a paso. Fuentes: Riotur, UNESCO, Secretaría Municipal de Cultura y el propio IPN.

Urca también se amplió como ficha individual para que no quede reducida al teleférico: incorpora la fundación de 1565, Praia Vermelha y la Exposición Nacional de 1908, el comienzo del Bondinho en 1912–1913, Fortaleza de São João, el Instituto Benjamin Constant, la Pista Cláudio Coutinho, el Quadrado y la Mureta. Se recuperó la fotografía propia `hora_dorada_urca.jpg` y se colocó entre los temas; los otros espacios visuales siguen marcados como necesidades editoriales. El texto distingue accesos públicos de áreas con reglas propias y no fija horarios. Contraste: Parque Bondinho, Instituto Benjamin Constant, Brasiliana Fotográfica y Riotur.

Jardim Botânico se reorganiza como guía de un valle histórico, no como sinónimo del arboreto: se desarrollan el Real Horto de 1808 y su relación con la aclimatación de especies y la Fábrica de Pólvora, la alameda de palmeras-imperiales durante la dirección de Serpa Brandão, el impulso científico asociado a João Barbosa Rodrigues, Parque Lage y la Escuela de Artes Visuales, Horto y los accesos de montaña. Las dos fotos propias `JARDIMB2.jpg` y `JARDIMB3.jpg` pasan a intercalarse con los temas. Contraste: Instituto de Pesquisas Jardim Botânico, Biblioteca Nacional y Riotur.

Lagoa Rodrigo de Freitas también se amplía con la historia indígena y azucarera previa a la postal actual, la relación con el Engenho d’El Rey y Rodrigo de Freitas, el canal y la comporta de Jardim de Alah, los distintos parques de la orilla y el Mirante do Sacopã. Su fotografía propia vuelve a aparecer intercalada en el atlas. Contraste: Prefeitura do Rio, MultiRio, Rio-Águas, INEA y Riotur.

Se conectó a la ficha pública de Copacabana el archivo ilustrado que ya existía en `assets/js/copacabana-archive.js`: sus capítulos cubren la historia urbana, el subsuelo durante la Segunda Guerra Mundial, la Galeria Menescal, Chacrinha (incluido su acceso cercano al Posto 2), Bairro Peixoto, música y vida de playa, con las fotografías históricas facilitadas por Ernestinho intercaladas por tema. El texto del refugio se presenta como memoria e investigación pendiente por edificio, sin atribuir automáticamente esa función a cada estacionamiento. Se completaron las versiones en portugués e inglés. La ficha cita instituciones por nombre y no dirige al visitante fuera del sitio. Para Chacrinha se contrastó con [Riotur](https://riotur.rio/que_fazer/parque-estadual-da-chacrinha/), [INEA](https://www.inea.rj.gov.br/biodiversidade-territorio/conheca-as-unidades-de-conservacao/parque-estadual-da-chacrinha/) y [MetrôRio](https://www.metrorio.com.br/NavegueRio/PontosTuristicosInterna?p_ponto=27).La pasada de investigación posterior usa Copacabana como patrón de dimensiones, no como plantilla literal. Se incorporó `assets/js/barrios-atlas.js` para las otras **39 fichas individuales**. Cada perfil contiene un relato histórico trilingüe propio, tres hitos de evolución, tres capas de lectura territorial, tres microzonas, cinco lugares explicativos y una orientación práctica adaptada al tipo de territorio. Sumado a la capa editorial ya existente, las galerías recuperadas y las fuentes institucionales, las 40 fichas individuales cubren ahora historia, identidad, patrimonio o paisaje, sectores, cultura cotidiana, orientación y planificación en ES/PT/EN.

El barrido contrastó especialmente Riotur, MultiRio, Parque Nacional da Tijuca/ICMBio, UNESCO y sitios oficiales de instituciones y operadores. Para evitar que el contenido quede obsoleto, horarios, tarifas, programación, condiciones del mar, accesos y cierres no se fijan como datos permanentes: las fichas remiten a la fuente responsable. Las secuencias exactas y la navegación paso a paso de las rutas premium siguen fuera de la capa pública.

| Uso en V1 | Destino en V2 | URL original conservada |
|---|---|---|
| Leme — nueva ficha turística | `leme` | Praia do Leme, Caminho dos Pescadores, Clarice Lispector, patrimônio do Morro do Leme, Babilônia y Chapéu Mangueira; quedan espacios editoriales para fotos propias. |
| Portada Copacabana | `copacabana` | `https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3122` |
| Portada Ipanema + Leblon | `ipanema-leblon` | `https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3123` |
| Portada Gávea + Jardim Botânico + Lagoa | `gavea-jardim-lagoa` | `https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3126` |
| Portada Botafogo + Urca | `botafogo-urca` | `https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3127` |
| Portada Flamengo + Glória | `flamengo-gloria` | `https://res.cloudinary.com/qa301cbc/image/upload/v1788389092/aterro_flamengo.jpg` |
| Portada Centro + Praça Mauá | `centro-maua` | `https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3125` |
| Portada Santa Teresa + Lapa | `santa-lapa` | `https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3124` |
| Portada Zona Norte | `zona-norte` | `https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3083` |
| Portada Barra + Zona Oeste | `barra-oeste` | `https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3097` |
| Copacabana — explorar | Galería `copacabana` | `https://res.cloudinary.com/qa301cbc/image/upload/v1788448793/COPACABANA.jpg` |
| Copacabana — visitar / Forte | Galería `copacabana` | `https://res.cloudinary.com/qa301cbc/image/upload/v1788390184/forte_copa.jpg` |
| Copacabana — comer / Colombo | Galería `copacabana` | `https://res.cloudinary.com/qa301cbc/image/upload/v1788393689/confeitaria-colombo_copa.jpg` |
| Copacabana — organizar / calçadão | Galería `copacabana` | `https://res.cloudinary.com/qa301cbc/image/upload/v1788957880/calzadao_de_copacanana_0001.jpg` |
| Copacabana — momento / Arpoador | Galería `copacabana` | `https://res.cloudinary.com/qa301cbc/image/upload/v1788385260/arpoador_fotos.jpg` |

No se encontraron fotos individualizadas dentro de `MASTER3_NEIGHBORHOOD_CONTENT`, `MASTER3_CITY_PLACE_REGISTRY` ni `master3-runtime-lazy.json`, pero eso no significaba que Ernestinho careciera de ellas. El segundo barrido confirmó que el archivo visual estaba distribuido entre otros módulos y constantes archivadas. Las fichas usan únicamente material ya perteneciente al proyecto o imágenes con procedencia controlada; no se sustituyen faltantes con fotografías genéricas.

## Investigación y fuentes

Las fichas mantienen la historia editorial disponible y ahora muestran el bloque contextual que no se insertaba correctamente en las páginas individuales de V2. Se añadieron lecturas específicas del paisaje y la vida local, orientación de escala/sector, recomendaciones operativas que no fijan horarios ni precios y fuentes enlazadas junto a cada tema.

Se priorizaron fuentes públicas o institucionales: [Riotur](https://riotur.rio/), [MultiRio](https://multirio.rio.rj.gov.br/), [UNESCO — Cais do Valongo](https://whc.unesco.org/en/list/1548/), [MUHCAB](https://cultura.prefeitura.rio/muhcab/), [ICMBio — Parque Nacional da Tijuca](https://www.gov.br/icmbio/pt-br/assuntos/parques-nacionais/parque-nacional-da-tijuca), [Secretaria Municipal do Ambiente e Clima](https://ambienteclima.prefeitura.rio/visite-nossos-parques/), [Barcas Rio](https://barcasrio.com.br/linhas-horarios-e-tarifas/) y [MetrôRio](https://www.metrorio.com.br/).

Referencias temáticas principales:

- [Pequena África — Riotur](https://riotur.rio/que_fazer/pequena-africa/), [MUHCAB](https://cultura.prefeitura.rio/espacos-culturais/museus/muhcab/), [Instituto Pretos Novos](https://pretosnovos.com.br/museu-memorial/), [Cais do Valongo — UNESCO](https://whc.unesco.org/en/list/1548/) y [Cemitério dos Pretos Novos — IPN](https://pretosnovos.com.br/museu-memorial/cemiterio-dos-pretos-novos/): territorio, cais, período de funcionamiento, arqueología, patrimonio mundial y espacios culturales afro-brasileños.
- [Roteiro Madureira — Riotur](https://riotur.rio/editorial/roteiro-madureira/): Parque Madureira, Casa do Jongo, baile charme, Feira das Yabás y cultura del samba.
- [Playas — Riotur](https://riotur.rio/editorial/praias/) y [Parque Natural Municipal de Marapendi — Riotur](https://riotur.rio/que_fazer/parque-natural-municipal-de-marapendi/): litoral oeste, playas, reservas y humedales.
- [Parque Nacional da Tijuca — ICMBio](https://www.gov.br/icmbio/pt-br/assuntos/parques-nacionais/parque-nacional-da-tijuca) y [Riotur](https://riotur.rio/que_fazer/parquenacionaldatijuca/): sectores, accesos y áreas naturales.
- [Museu da República — Riotur](https://riotur.rio/que_fazer/museu-da-republica/), [Roteiro Lapa e Santa Teresa — Riotur](https://riotur.rio/editorial/tourlapaesanta/) y [guía cultural de Riotur](https://riotur.rio/wp-content/uploads/2023/09/Riotur_LivretoPublico_Visit_2023_200x200mm_BR.pdf): patrimonio, calles culturales y espacios urbanos.
- [Parque Darke de Mattos — Prefeitura](https://ambienteclima.prefeitura.rio/parque-nacional-municipal-darke-de-mattos/) y [Barcas Rio](https://barcasrio.com.br/linhas-horarios-e-tarifas/): Paquetá, área de conservación y consulta de la operación marítima vigente.

No se publican tarifas, horarios ni supuestas conexiones en tiempo real; las fichas remiten a las operadoras o instituciones actuales. Las secuencias Premium de `MASTER3_NEIGHBORHOOD_CONTENT.routes` no se migraron a las nuevas páginas.

## Cinco pasadas de revisión

1. **Contenido:** se cruzaron `BARRIOS_DATA`, `MASTER3_NEIGHBORHOOD_CONTENT`, `barriosIframe`, `MASTER3_CITY_PLACE_REGISTRY`, `master3-runtime-family.json` y `master3-runtime-lazy.json`. Se mantuvo el contenido de V2 y se añadió la cobertura ausente.
2. **Imágenes:** se cotejaron las URLs V1 por uso y destino; además de las cinco fotos de Copacabana, el barrido transversal recuperó 29 referencias adicionales repartidas por otros módulos.
3. **Funcionalidad:** se añadió búsqueda y filtrado de fichas por zona y naturaleza, contador accesible, enlaces a corredores, páginas independientes, sitemap y destinos internos verificados.
4. **ES/PT/EN:** se revisaron textos visibles, títulos, leyendas, controles, metadatos y atributos alternativos. El inventario estático no deja nodos visibles sin clave de traducción; los bloques editoriales dinámicos renderizan las tres versiones.
5. **Técnica/SEO:** se verificaron módulos JavaScript, HTML, sitemap, slugs V1, enlaces internos y cargas de scripts locales. El bloque contextual de las fichas individuales ahora se inserta en `<main>` y no intenta usar un `<footer>` que está fuera de ese contenedor.

## Verificaciones realizadas

- 56 páginas de destino más el índice.
- 17 tarjetas de corredores y 40 enlaces a fichas individuales.
- 16/16 slugs `/barrios/:slug` de V1 con página de destino.
- 0 enlaces internos rotos en el árbol del sitio.
- 0 scripts locales faltantes.
- JavaScript validado con `node --check`; sitemap XML y HTML parseados correctamente.
- Revisión estática ES/PT/EN: 0 textos visibles sin entrada de traducción; atributos de metadatos se generan por idioma y se revisan los textos alternativos.
- Esta integración aplica el conjunto de Barrios sobre `c3c75de`; conserva los cambios ya presentes en `main` fuera de Barrios.
