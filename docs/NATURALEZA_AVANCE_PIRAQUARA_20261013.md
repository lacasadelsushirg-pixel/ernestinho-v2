# Avance de Naturaleza — Piraquara

Fecha: 2026-10-13
Estado: trabajo local para revisión; sin commit y sin publicación.

## Criterio editorial vigente

- Mantener la voz en primera persona de Ernestinho y la estructura `culture-detail` del sitio.
- Desarrollar cada lugar con contexto, acceso, mapa del acceso claramente identificado, horario publicado o sugerido, preparación, seguridad y propuestas para combinar.
- No inventar coordenadas, dimensiones, historia, tiempos ni detalles técnicos. Separar métricas de circuitos y atractivos puntuales.
- Trabajar con los MD de la Biblioteca y contrastar datos operativos con fuentes oficiales actuales.
- Usar las fotos del archivo enviado por la persona usuaria cuando identifiquen el sitio o su señalización; dejar créditos y pies de foto, y no adjudicar a un lugar una imagen de ubicación incierta.
- Mantener los colores, tipografía y componentes del sitio. Añadir elementos breves de exploración para que las fichas inviten a observar e interactuar, además de leer.
- No editar contenido congelado de otras secciones; no publicar ni generar commit sin que la persona usuaria lo pida.

## Dos tandas incorporadas

| Tema | Ruta | Datos y límites de publicación |
|---|---|---|
| Circuito Pedra Jesus Vem | `/naturaleza/circuito-pedra-jesus-vem/` | Material consultado asocia 3,7 km y cerca de 3 h al circuito. El cartel del acceso indica 3,7 km desde la sede hasta Jesus Vem, sin aclarar si es ida o total. El estado actual del cable requiere confirmación. |
| Pedra Jesus Vem | `/naturaleza/pedra-jesus-vem/` | Referencia de altitud: 520 m. La guía atribuye el nombre a una inscripción; autoría/fecha sin confirmar. Se incorporó el cartel real del sendero. |
| Pedra do Osso | `/naturaleza/pedra-do-osso/` | Formación vinculada al circuito, sin métricas independientes confirmadas. Foto de Vivian Telles, vista desde el sendero. |
| Muro das Lamentações | `/naturaleza/muro-das-lamentacoes/` | Dimensiones aproximadas de guía: 100 m × 130 m; mantener distancia de zonas de escalada. Sin foto específica confirmada. |
| Pedra Rachada | `/naturaleza/pedra-rachada/` | Atractivo del Trecho 08. La Transcarioca recomienda retorno a Piraquara desde Pedra Rachada; 4,6 km y ~3 h corresponden al tramo completo. Sin foto específica confirmada. |
| Núcleo Piraquara | `/naturaleza/nucleo-piraquara/` | Rua do Governo, Realengo; horario INEA martes–domingo, 8:00–17:00. Entrada general gratuita; confirmar avisos, servicios y estado del baño. Foto de señalización del núcleo. |
| Aqueduto do Piraquara | `/naturaleza/aqueduto-do-piraquara/` | Sistema asociado de ~34 km; Trecho do Governador ~18 m de alto y ~200 m. El mapa marca el núcleo; aún falta una foto identificada de la estructura. |
| Pedra do Ponto | `/naturaleza/pedra-do-ponto/` | Altitud de referencia 932 m. La guía anota ~3,9 km/~4 h, sin dejar claro el sentido de la distancia. Foto Rafael Duarte de la travesía, sin afirmar que sea la cima. |
| Pico do Piraquara | `/naturaleza/pico-do-piraquara/` | Altitud de referencia técnica: 881 m. Diferenciado de Pedra do Ponto (932 m); ruta específica sin métricas/track verificados. Sin foto identificada. |
| Cachoeira do Barata | `/naturaleza/cachoeira-do-barata/` | INEA la identifica como la única cascada disponible para baño; se explica que la situación cambia con lluvia, caudal y avisos. Sin foto identificada. |

Las tarjetas están en “Pedra Branca y Zona Oeste”. Las fotos del circuito y sus atractivos tienen pies o textos alternativos que indican qué muestran y cuándo la ubicación exacta no está confirmada. Las páginas tienen mapas del acceso general donde no se validó un pin o track de atractivo.

## Fuentes consultadas

- INEA, Parque Estadual da Pedra Branca: <https://www.inea.rj.gov.br/biodiversidade-territorio/conheca-as-unidades-de-conservacao/parque-estadual-da-pedra-branca/>
- INEA, Aqueduto y Núcleo Piraquara: <https://www.inea.rj.gov.br/parque-estadual-da-pedra-branca-abriga-aqueduto-historico-com-34-km-de-extensao/>
- Trilha Transcarioca, Trecho 08: <https://trilhatranscarioca.com.br/piraquara-x-estrada-dos-teixeiras>
- Trilha Transcarioca, Trecho 07: <https://trilhatranscarioca.com.br/pau-da-fome-x-piraquara>
- MD de la Biblioteca materializados durante esta sesión en `source-md/`.

## Pendiente antes de considerar listo para publicar

- Revisión visual de las nuevas fichas y tarjetas en móvil y escritorio.
- Traducción editorial completa del cuerpo de las fichas a portugués e inglés; los cuerpos nuevos permanecen en español por ahora.
- Añadir fotos que faltan para Muro, Pedra Rachada, Aqueduto, Pico y Cachoeira cuando estén disponibles y claramente identificadas.
- Ejecutar auditorías de contenido, rutas, metadatos y enlaces internos al cerrar la tanda.
- Confirmar cualquier acceso, cierre o condición diaria directamente con la administración antes de mostrarlo como vigente.

## Continuidad y estado de Git

El estado de archivos puede consultarse con `git status` en la rama actual. Estos cambios siguen locales: no se creó commit y no se publicó el sitio.

## Verificación de esta tanda

- Las diez fichas de Piraquara comprobadas tienen un solo H1, un mapa de acceso y un elemento interactivo breve de exploración.
- Las fotos locales usadas en esta sección existen en el proyecto; las que no cuentan con identificación suficiente no se atribuyen a una cascada, cumbre, muro o aqueduto.
- Vista de escritorio y móvil revisada; la página no genera desbordamiento horizontal a 390 px.
- La generación localizada de las rutas piloto completó las páginas ES/PT/EN, pero sus cuerpos editoriales nuevos siguen en español. El paso final del sitemap falla por una referencia alterna preexistente a `/experiencias/paracaidas/`, fuera del alcance de esta tanda. Corregir antes de considerar una construcción integral.

## Tanda siguiente: Rio da Prata, Trechos 04 y 08 y paisaje vivo

Trabajo local agregado el 14 de octubre, todavía sin commit ni publicación:

| Tema | Ruta | Tratamiento y límites |
|---|---|---|
| Trilha Transcarioca · Trecho 08 | `/naturaleza/trilha-transcarioca-trecho-08/` | 4,6 km/~3 h son la ficha del tramo general. Se diferencia la recomendación actual de ida y vuelta Piraquara–Pedra Rachada; la Transcarioca no publica una métrica separada para esa variante. Se usa la foto auténtica del cartel de Piraquara, identificada como señalización, no como foto del sendero. |
| Trilha Transcarioca · Trecho 04 | `/naturaleza/trilha-transcarioca-trecho-04/` | 11,5 km/~7 h, dificultad alta, orientación difícil y señalización parcial para la travesía Morgado–Rio da Prata. Se advierte que los extremos son distintos y que el mapa mostrado es solo de referencia. |
| Núcleo/Posto Avançado Rio da Prata | `/naturaleza/posto-avancado-rio-da-prata/` | INEA usa “Núcleo Rio da Prata” y publica Estrada da Batalha, s/nº; Transcarioca usa “Posto Avançado” y referencia cerca del nº 202. La entrada física requiere confirmación. El horario 8–17 se etiqueta como horario general del parque, no como operación independiente confirmada del núcleo. |
| Quilombo Cafundá Astrogilda | `/naturaleza/quilombo-cafunda-astrogilda/` | Página contextual sobre comunidad y memoria, no una atracción. No promete visitas, no marca caminos internos ni incluye fotos de personas/casas. El mapa apunta solo al barrio Vargem Grande. |
| Agricultura del Maciço da Pedra Branca | `/naturaleza/agricultura-pedra-branca/` | Artículo transversal; banana, caqui, aipim y hortalizas aparecen como referencias de investigación, no como inventario actual. No se publican visitas a fincas ni horarios de ferias sin confirmar. |

Los cinco temas se enlazaron desde la página principal de Naturaleza. Se creó un pequeño reto interactivo y una traducción PT/EN para las nuevas tarjetas del índice. **El cuerpo de las cinco fichas sigue en español**; la traducción editorial completa queda pendiente antes de publicación.

### Fotos pendientes de esta tanda

- Trecho 08: la foto de señalización ya está colocada; faltan imágenes recientes/autorizadas de Pedra Rachada, bosque y Mirante da Piraquara.
- Trecho 04 y Núcleo Rio da Prata: faltan foto del acceso/cartel institucional y paisajes confirmados de ese sector.
- Quilombo Cafundá Astrogilda: no usar imagen de la comunidad sin autorización; solo añadir material aprobado por sus representantes.
- Agricultura: faltan imágenes autorizadas de cultivos, cosechas o feria pública con fecha, lugar y crédito confirmados.

### Verificación adicional

- Fichas oficiales consultadas el 14 de octubre: [Trecho 08](https://trilhatranscarioca.com.br/piraquara-x-estrada-dos-teixeiras-es), [Trecho 04](https://trilhatranscarioca.com.br/cabungui-x-rio-da-prata-es), [horarios y unidades](https://trilhatranscarioca.com.br/unidades-de-conservacao-es); [direcciones de INEA](https://www.inea.rj.gov.br/nossos-enderecos/).
- Contexto público para Cafundá: [Fundação Cultural Palmares](https://www.gov.br/palmares/pt-br/departamentos/protecao-preservacao-e-articulacao/certificacao-quilombola), [Comissão Pró-Índio](https://cpisp.org.br/cafunda/) y [AS-PTA](https://aspta.org.br/2022/09/19/cartografia-cafunda-astrogilda-caminhos-de-memoria-e-resistencia/).
- El generador localizado creó las rutas de esta tanda en `dist`; el cierre volvió a detenerse por el alterno inexistente preexistente `/experiencias/paracaidas/`. No se alteró esa sección.
- `git diff --check` no reportó problemas de whitespace. La comprobación `python3 scripts/check_frozen_pages.py` sí detectó numerosas páginas protegidas modificadas en el árbol de trabajo en secciones distintas, además del índice de Naturaleza editado intencionalmente por este proyecto. No se restauró ni se rebaselinizó contenido; revisar el conjunto antes de cualquier commit.
- `AGENTS.md` requiere que la base contenga el commit de recuperación `5358bee`; el `HEAD` de la rama de trabajo actual no es descendiente de ese commit. No se cambió de rama ni se reescribió historial para preservar la instrucción persistente del usuario y los cambios locales. Este desajuste queda como bloqueo antes de cualquier commit o publicación.

## Tanda Camorim y Pau da Fome — 14 de octubre de 2026

Trabajo local agregado después de la tanda anterior; cinco fichas nuevas conectadas desde el índice de Naturaleza:

| Tema | Ruta | Datos y límites |
|---|---|---|
| Transcarioca · Trecho 06 | `/naturaleza/trilha-transcarioca-trecho-06/` | 13,4 km/~6 h, dificultad alta, orientación moderada, señalización parcial. Métricas del trecho completo; mapa general, no track de navegación. Se explica la conexión adicional a Casa Amarela y la necesidad de confirmar hora límite/estado. |
| Núcleo Camorim | `/naturaleza/nucleo-camorim/` | INEA: Estrada do Camorim, 2.118; sendero de aproximadamente 4 km hacia el Açude; horario administrativo general mar–dom 8–17. No se presentan servicios ni operación específica como confirmados. |
| Açude do Camorim | `/naturaleza/acude-do-camorim/` | Transcarioca: construido en 1908, altitud aproximada 435 m, 18 m de profundidad y volumen publicado de 210 mil m³. Baño prohibido y agua no apta para consumo; mapa apunta solo al acceso por Camorim. |
| Aqueduto do Pau da Fome | `/naturaleza/aqueduto-do-pau-da-fome/` | Ruinas vinculadas al corredor del Trecho 06. Se publicó la foto existente `aqueduto-pau-da-fome.jpg`, visualmente consistente con la estructura; fecha, autoría histórica y acceso independiente siguen pendientes. |
| Cachoeira Véu da Noiva — Camorim | `/naturaleza/cachoeira-veu-da-noiva-camorim/` | Identificada en el Circuito das Águas y en el Trecho 06, diferenciada de Cachoeira do Camorim. El plan de manejo describe el circuito como fácil y de ~1 h 30 hasta su final; no se presenta como tiempo medido hasta la caída. Baño actual no confirmado. |

El índice contiene cinco tarjetas nuevas. Se añadieron metadatos SEO ES/PT/EN y traducción de las tarjetas del índice; el cuerpo de las fichas sigue en español y necesita traducción editorial antes de publicación. Los mapas son de referencia y se rotulan para no insinuar que un pin general sea un acceso exacto.

### Fotos pendientes de la tanda Camorim

- Trecho 06: sendero/bosque del trecho, Açude desde punto permitido, llegada a Pau da Fome y Casa Amarela contextualizada.
- Núcleo Camorim: entrada y señalización actual; panel interpretativo del sistema hídrico.
- Açude: vista actual desde zona autorizada y señal de no baño.
- Aqueduto: la fotografía disponible ya está colocada; falta vista amplia de bosque y acceso autorizado, con crédito verificable.
- Véu da Noiva: fotografía actual de la caída, circuito y estructuras hidráulicas, con autoría/ubicación confirmadas.

### Verificación

- Cinco páginas: una sola H1, un mapa de referencia y un reto interactivo cada una. Todos los enlaces relativos nuevos resuelven; la única imagen editorial de la tanda existe en el proyecto.
- `git diff --check`, `node --check` para SEO, `site.js` y el chunk 13 pasaron.
- El generador produjo las rutas localizadas de las fichas y del índice en `dist`; el último paso volvió a fallar por el alterno externo inexistente preexistente `/experiencias/paracaidas/`. El manifiesto local registra páginas ES/PT/EN. El texto principal PT/EN continúa pendiente.
- Fuentes institucionales actuales usadas: [INEA — PEPB, Núcleo Camorim, sendero y horario administrativo](https://www.inea.rj.gov.br/biodiversidade-territorio/conheca-as-unidades-de-conservacao/parque-estadual-da-pedra-branca/), [Transcarioca — Trecho 06, métricas, Açude y atractivos](https://trilhatranscarioca.com.br/casa-amarela-x-pau-da-fome), [Transcarioca — contactos y horario general](https://trilhatranscarioca.com.br/unidades-de-conservacao), [Plan de Manejo del PEPB — Circuito das Águas](https://feemerj.org/wp-content/uploads/Plano-de-manejo-do-Parque-Estadual-da-Pedra-Branca-PEPB-2.pdf).
- Sigue vigente el bloqueo de la auditoría de páginas congeladas y el desajuste de base Git descritos arriba. No se cambió de rama, no se hizo commit ni se publicó.


## Tanda infraestructura hídrica y Trecho 09 — 14 de octubre de 2026

Se sumaron cinco páginas temáticas, enlazadas en el índice de Naturaleza:

| Tema | Ruta | Contenido y límites |
|---|---|---|
| Transcarioca · Trecho 09 | `/naturaleza/trilha-transcarioca-trecho-09/` | 7,3 km/~5 h en la travesía completa. La ficha técnica indica dificultad alta, orientación difícil y señalización parcial, mientras que el resumen la llama “fácil”; la página explica el conflicto y adopta la lectura prudente. Mapa solo del inicio general en Largo dos Teixeiras; no comparte instrucciones para cruzar estructuras, saltar portones o seguir accesos no confirmados. |
| Adutoras del Guandu | `/naturaleza/adutoras-guandu-pedra-branca/` | Artículo de contexto con sistema de unos 34 km y cronología oficial 1951/1958/1965/1966. Distingue sistema, Catonho y tramo recreativo de Piraquara. Mapa de contexto regional sin acceso. |
| Aqueduto do Catonho | `/naturaleza/aqueduto-do-catonho/` | INEA lo sitúa como tramo visible inaugurado en 1965. No se asume una entrada peatonal ni horario propio; mapa regional de Jardim Sulacap. |
| Ponte da Cachoeira | `/naturaleza/ponte-da-cachoeira-adutora/` | Infraestructura hídrica de aprox. 164 m. La página evita confundirla con una cachoeira natural y no muestra pin exacto. |
| Ponte do Governo | `/naturaleza/ponte-do-governo-realengo/` | Estructura de aprox. 200 m en Realengo; separada expresamente de Rua do Governo y del acceso al Núcleo Piraquara. |

Las cinco fichas tienen un reto breve de observación, mapa regional o del acceso de referencia, propuesta de combinación, datos rápidos y sección de fotos pendientes. No encontré fotos identificables de esos puntos en el archivo que estamos usando; faltan imágenes autorizadas con ubicación confirmada de Trecho 09, Catonho, Ponte da Cachoeira y Ponte do Governo. Para el sistema general también sería útil un mapa histórico oficial acreditado.

### Fuentes y criterios

- INEA, [sistema hídrico de 34 km, fechas y estructuras](https://www.inea.rj.gov.br/parque-estadual-da-pedra-branca-abriga-aqueduto-historico-com-34-km-de-extensao/).
- Transcarioca, [Trecho 09](https://trilhatranscarioca.com.br/estrada-dos-teixeiras-x-aqueduto-do-catonho) y [horarios generales/unidades](https://trilhatranscarioca.com.br/unidades-de-conservacao).
- MD de Biblioteca: `116_ADUTORA_GUANDU_PEDRA_BRANCA.md`, `117_PONTE_DO_GOVERNO_REALENGO.md`, `120_AQUEDUTO_DO_CATONHO.md`, `121_PONTE_DA_CACHOEIRA_ADUTORA.md` y el Inventario Maestro de Naturaleza.
- Se actualizó `naturaleza/index.html`, metadatos ES/PT/EN y `naturaleza-16.js`. El cuerpo editorial de las cinco páginas permanece en español; falta traducción completa PT/EN antes de publicación.
- Sin commit ni publicación. Siguen vigentes las advertencias de Git y auditoría de páginas congeladas registradas anteriormente.


## Tanda Floresta da Tijuca · Trechos 11 a 15 — 14 de octubre de 2026

Se incorporaron cinco fichas en la sección de Trilhas y caminatas, con fotos del archivo que representan atractivos identificados (no se presentan como imágenes del sendero completo):

| Tema | Ruta | Datos y condiciones editoriales |
|---|---|---|
| Trecho 11 · Represa dos Ciganos–Bom Retiro | `/naturaleza/trilha-transcarioca-trecho-11/` | 9,5 km/~5 h, dificultad alta, orientación moderada, señalización completa, exposición solar baja y agua reportada. La represa se usa para abastecimiento y el baño está prohibido. Foto de Pico da Tijuca como atractivo del sector. |
| Trecho 12 · Bom Retiro–Centro de Visitantes | `/naturaleza/trilha-transcarioca-trecho-12/` | 6,6 km/~4 h, moderado, orientación fácil, buena señalización e incluye escalaminhada. Foto identificada de Bico do Papagaio. |
| Trecho 13 · Centro de Visitantes–Portão da Floresta | `/naturaleza/trilha-transcarioca-trecho-13/` | 4,6 km/~3 h, dificultad moderada, orientación fácil y buena señalización. Se advierte confirmar apertura de los servicios culturales y resolver transporte al salir. Foto del Mirante da Cascatinha. |
| Trecho 14 · Portão da Floresta–Mesa do Imperador | `/naturaleza/trilha-transcarioca-trecho-14/` | Hay conflicto de métricas: listado general 5,8 km/~3 h y ficha detallada 8 km/~4 h; ambas marcan dificultad moderada. La página conserva la discrepancia y planifica con la versión larga. Foto de Mesa do Imperador como extremo. |
| Trecho 15 · Mesa do Imperador–Vista Chinesa | `/naturaleza/trilha-transcarioca-trecho-15/` | 1,6 km/~40 min, moderado en la tabla técnica, orientación fácil, buena señalización y sin agua reportada. Los extremos son distintos. Foto identificada de Vista Chinesa como extremo. |

Las cinco páginas incluyen mapa general no secuencial, reto interactivo, horario sugerido sujeto a apertura y avisos del parque, logística de regreso, datos rápidos, sección de combinación y fotos adicionales pendientes. El horario diario 8:00–17:00 se atribuye a la referencia general de Transcarioca/Parque Nacional da Tijuca, no se presenta como horario garantizado de cada acceso.

### Fuentes consultadas

- Fichas de Transcarioca: [11](https://trilhatranscarioca.com.br/represa-dos-ciganos-x-bom-retiro), [12](https://trilhatranscarioca.com.br/bom-retiro-x-centro-de-visitantes), [13](https://trilhatranscarioca.com.br/cova-da-onca-x-portao-da-floresta), [14](https://trilhatranscarioca.com.br/portao-da-floresta-x-mesa-do-imperador), [15](https://trilhatranscarioca.com.br/mesa-do-imperador-x-vista-chinesa) y [horarios/unidades](https://trilhatranscarioca.com.br/unidades-de-conservacao).
- Fotos existentes reutilizadas: `pico-da-tijuca.jpg`, `bico-do-papagaio.jpg`, `mirante-da-cascatinha.jpg`, `mesa-do-imperador.jpg`, `vista-chinesa.jpg`. Son fotos de los puntos descritos, con pie que aclara el alcance visual. Faltan fotos recientes de señalización/terreno de cada trecho y fotos de accesos en condición actual.
- Se añadieron tarjetas de índice, SEO ES/PT/EN y chunk `naturaleza-17.js`; el cuerpo principal permanece en español.
- Las pruebas finales puntuales de estas cinco páginas están pendientes; build localizado completo no se usó para esta tanda. No se hizo commit ni publicación.


## Tanda Floresta da Tijuca · Trechos 16 a 20 — 14 de octubre de 2026

Se añadieron cinco fichas nuevas y tarjetas al índice de Naturaleza. Se reutilizaron fotos del archivo en 16 (Vista Chinesa) y 17 (Mirante do Horto), aclarando que identifican extremos o atractivos y no reflejan las condiciones actuales del sendero. Los trechos 18, 19 y 20 todavía necesitan fotos autorizadas y geolocalizadas de sus accesos, terreno o puntos destacados.

| Trecho | Referencia editorial |
|---|---|
| 16 · Vista Chinesa–Dona Castorina | 3,5 km/~2 h 30; circuito opcional Parque da Cidade 2,8 km/~2 h; moderado. La ficha distingue el circuito de la distancia principal. |
| 17 · Dona Castorina/Jequitibá–Primatas | 3,9 km/~2 h 30; fácil. Incluye cascadas, Mirante do Horto y jequitibá; el texto pide permanecer en el sendero y no asumir baño autorizado. |
| 18 · Primatas–Paineiras/Corcovado | 4,2 km/~2 h 30; moderado, riesgo medio y exposición solar alta. Visitas/tickets al Cristo se mantienen separados de la caminata. |
| 19 · Paineiras/Corcovado–Parque Lage | 3,3 km/~2 h 30; moderado con riesgo técnico alto, orientación moderada y tramos con circulación. |
| 20 · Parque Lage–Catacumba | Distancia discrepante: resumen 3,6 km, ficha técnica 4,3 km/~1 h. Caminata urbana; contempla cruces, ciclovía y horario del parque. |

Todas las fichas incluyen mapa general no equivalente a track, reto de observación, preparación, propuesta de combinación, fuentes y horario/regreso que debe confirmarse. Se retiró de 16–19 una referencia de horario de Catacumba que no correspondía a esos recorridos; se conserva solo en Trecho 20.

### Fuentes consultadas

- Transcarioca: [Trecho 16](https://trilhatranscarioca.com.br/vista-chinesa-x-dona-castorina), [17](https://trilhatranscarioca.com.br/dona-castorina-x-cachoeira-dos-primatas), [18](https://trilhatranscarioca.com.br/cachoeira-dos-primatas-x-paineiras), [19](https://trilhatranscarioca.com.br/paineiras-x-parque-lage), [20](https://trilhatranscarioca.com.br/parque-lage-x-catacumba), [horarios/unidades](https://trilhatranscarioca.com.br/unidades-de-conservacao).
- Prefeitura do Rio, [Parque Natural Municipal da Catacumba: história e horário](https://ambienteclima.prefeitura.rio/parque-nacional-municipal-da-catacumba/).
- Fotos de archivo: `vista-chinesa.jpg` y `mirante-do-horto.jpg`. Sin imagen propia verificada aún para los Trechos 18, 19 y 20.
- Se agregaron cinco tarjetas de índice, SEO ES/PT/EN y `naturaleza-18.js`. El cuerpo editorial principal continúa en español. No se hizo commit ni publicación.

## Tanda Transcarioca · Trechos 21 y 23–26 — 14 de octubre de 2026

Se añadieron cinco fichas al índice y rutas del sitio:

| Tema | Datos / condición editorial |
|---|---|
| 21 · Parque da Catacumba | 1,1 km/~1 h; Parque abierto martes a domingo, 6:00–17:00 según Prefeitura. Se distingue el circuito interior de una conexión hacia Rua Vitória Régia descrita en la ruta de Transcarioca. La historia de la comunidad removida se aborda con respeto. |
| 23 · Morro São João / Chacrinha | 2,6 km/~1 h 30 para el trecho general. La ficha actual advierte que el acceso previo está indisponible y recomienda ida y vuelta desde el Parque da Chacrinha. La página prioriza ese plan, no una entrada turística por la comunidad. |
| 24 · Circuito do Morro da Babilônia | La ficha general da 3,3 km/~3 h y +1,9 km para el circuito adicional. Hay diferencia entre títulos/terminales publicados; riesgo alto, orientación difícil y señalización baja. La ruta vigente recomienda el circuito y fuerte apoyo de guía local. |
| 25 · Praia Vermelha / Morro da Urca | 1,9 km/~1 h; fácil, riesgo bajo, orientación fácil y buena señalización. Se explica que la caminata gratuita y el Bondinho comercial tienen acceso, operación y horarios distintos. |
| 26 · Ilha Comprida / Trilha da Comprida | 1,2 km/~1 h según la ficha de Transcarioca; terreno rocoso, sin agua y exposición solar alta. La visita actual depende de navegación, reglas de ICMBio, condiciones marítimas y servicios habilitados. En 2026 ICMBio publicó acreditación de guías de la Trilha da Comprida y transporte acuaviario para la actividad. |

La página principal explicita el salto del Trecho 21 al 23 presente en la numeración oficial; no se crea un Trecho 22. Las cinco fichas contienen voz de Ernestinho en primera persona, reto de observación, mapa general que no pretende ser track, planificación/regreso, combinación sugerida, fuentes y brecha de fotos. El archivo local no tenía fotos verificadas de Catacumba, Chacrinha, Babilônia, Urca o Ilha Comprida; no se reutilizaron imágenes de otros lugares como si fueran de estas rutas.

### Fuentes consultadas

- Trilha Transcarioca: [21 · Catacumba](https://trilhatranscarioca.com.br/circuito-do-parque-da-catacumba), [23 · Chacrinha](https://trilhatranscarioca.com.br/ladeira-dos-tabajaras-x-parque-da-chacrinha), [24 · Babilônia](https://trilhatranscarioca.com.br/morro-da-babilonia-x-praia-vermelha), [25 · Morro da Urca](https://trilhatranscarioca.com.br/praia-vermelha-x-morro-da-urca), [26 · Ilha Comprida](https://trilhatranscarioca.com.br/ilha-comprida) y [lista oficial dos trechos](https://trilhatranscarioca.com.br/os-trechos).
- Prefeitura / SMAC: [Parque Natural Municipal da Catacumba](https://ambienteclima.prefeitura.rio/parque-nacional-municipal-da-catacumba/) y [Parque Estadual da Chacrinha](https://ambienteclima.prefeitura.rio/parque-natural-estadual-da-chacrinha/).
- ICMBio: [MONA Cagarras, visitação, protocolo y listas de prestadores](https://www.gov.br/icmbio/pt-br/assuntos/biodiversidade/unidade-de-conservacao/unidades-de-biomas/marinho/lista-de-ucs/mona-do-arquipelago-das-ilhas-cagarras/mona-do-arquipelago-das-ilhas-cagarras), [edital de condução na trilha](https://www.gov.br/icmbio/pt-br/centrais-de-conteudo/publicacoes/editais-diversos/editais-diversos-2026/edital-credenciamento-cv-trilha-mona-cagarras) y [transporte aquaviário da Trilha da Comprida](https://www.gov.br/icmbio/pt-br/centrais-de-conteudo/publicacoes/editais-diversos/editais-diversos-2026/edital-de-credenciamento-ta-trilha-mona-cagarras).
- Sem fotos locais verificadas para esta tanda. Ainda faltam imagens autorizadas dos cinco trechos.
- Se añadieron SEO ES/PT/EN y `naturaleza-19.js`. El cuerpo de las fichas permanece en español.
- Build localizado de las cinco páginas y el índice: 18 HTML ES/PT/EN generados; 759 URLs indexables por idioma. Estructura, tarjetas, mapa, retos e imágenes locales validados. No se hizo commit ni publicación.


## Tanda litoral protegido · Prainha y Grumari — 14 de octubre de 2026

Se incorporaron cinco fichas extensas a Naturaleza, utilizando los MD 128–132 y documentación municipal vigente.

| Tema | Criterio editorial / estado |
|---|---|
| Parque Natural Municipal da Prainha | Horario publicado martes–domingo y feriados, 6:00–17:00; puede extenderse a 18:00 durante el horario de verano. El cupo e inscripción de Caeté quedan en su ficha específica. Se distingue del Parque Estadual da Pedra Branca. |
| Mirante da Prainha | Ficha de planificación provisional: el nombre puede referirse a distintos puntos o a un negocio. Mapa de área, sin coordenada de acceso confirmada; requiere foto y verificación local. No confundir con Caeté. |
| Parque Natural Municipal de Grumari | Horario municipal 6:00–17:00, martes–domingo. Se explican restinga, bosque, humedal y manglar; no se prometen servicios más allá de lo que documenta SMAC. |
| Mirante de Grumari | Referencia panorámica ligada a la vía costera, con el punto, parada segura y acceso aún por validar. No se presenta como sendero o mirador con infraestructura confirmada. |
| APA de Grumari | Guía contextual de área protegida; no se presenta como atracción o acceso recreativo. Diferencia APA, parque municipal y otras unidades. |

Las fichas tienen voz en primera persona de Ernestinho, mapa general rotulado según su alcance, horarios sugeridos solo donde hay base oficial, combinaciones, misión de observación y necesidades de fotos. No se hallaron imágenes locales verificadas de estos cinco puntos: faltan entrada/señalización de los parques, ecosistemas de restinga y manglar con ubicación conocida, vistas auténticas de ambos mirantes, infraestructura y cartografía oficial vigente.

Fuentes: [PNM da Prainha / SMAC](https://ambienteclima.prefeitura.rio/parque-nacional-municipal-da-prainha/), [PNM de Grumari / SMAC](https://ambienteclima.prefeitura.rio/parque-nacional-municipal-de-grumari/), [Plan de manejo PNM Prainha y Grumari](https://ambienteclima.prefeitura.rio/wp-content/uploads/sites/81/2023/05/Plano-de-Manejo-PNM-Prainha-Grumari_compressed.pdf), [información municipal de Operação Verão](https://ordempublica.prefeitura.rio/noticias/operacao-verao-25-26-seop-amplia-acoes-em-pontos-das-zonas-sul-e-sudoeste-da-cidade/).

Se agregaron tarjetas, SEO ES/PT/EN y `naturaleza-20.js`. El cuerpo editorial todavía requiere traducción PT/EN completa. Se corrigió el menú global para que Naturaleza aparezca después de Consejos. Build localizado: 18 HTML, 764 URLs indexables por idioma. Sin commit ni publicación.

## Tanda ecosistemas y Guaratiba · MD 133–137 — 14 de octubre de 2026

Se incorporaron cinco fichas de interpretación territorial y ecológica. Ninguna propone un acceso sensible como ruta turística.

| Tema | Enfoque |
|---|---|
| Restinga de Grumari | Ecosistema costero, conservación, observación desde espacios públicos. Enlace al panel municipal Restingas Cariocas y foto pendiente. |
| Montaña y mar en Guaratiba | Guía transversal de Pedra Branca, cuencas, baixadas, restinga, manglar y costa; expresamente no es un itinerario o track. |
| Barra de Guaratiba | Contexto de barrio, naturaleza, pesca y planificación respetuosa; distingue Barra, Pedra e Ilha de Guaratiba. |
| Pedra de Guaratiba | Paisaje de bahía, vida pesquera y manglar; pin general de barrio, sin acceso a muelles o reserva. |
| Manguezais de Guaratiba | Ecosistema estuarino y Reserva Biológica Estadual; se explica que el acceso a la reserva solo se permite para educación/investigación autorizadas. |

Faltan fotos autorizadas y localizadas de restinga, manglar, bahía, paisaje barrial, espacios públicos y actividad pesquera con consentimiento. Falta cartografía oficial para representar límites sin revelar pasos internos. Los MD 134–136 eran borradores de contexto; el texto evita afirmar frecuencias de transporte, mareas puntuales, acceso libre o agenda comercial sin verificación.

Fuentes: [SMAC Restingas Cariocas](https://ambienteclima.prefeitura.rio/restingas-cariocas/), [mapa municipal de cobertura vegetal](https://ambienteclima.prefeitura.rio/mapeamento-da-cobertura-vegetal-e-do-uso-das-terras-do-municipio-do-rio-de-janeiro/), [Riotur contexto geográfico](https://riotur.prefeitura.rio/por-dentro-do-rio/), [INEA Reserva Biológica Estadual de Guaratiba](https://www.inea.rj.gov.br/biodiversidade-territorio/conheca-as-unidades-de-conservacao/reserva-biologica-estadual-de-guaratiba/), [SEAS manglar y reglas de visita](https://www.rj.gov.br/seas/node/223).

Se añadieron tarjetas, SEO ES/PT/EN y `naturaleza-21.js`. El cuerpo editorial requiere traducción PT/EN completa. Build localizado de las dos tandas más el índice pendiente al cierre. Sin commit ni publicación.


### Validación conjunta (14 de octubre de 2026)

- `npm run build`: completo. Se generaron 2.331 archivos HTML y 769 URLs indexables por idioma.
- Auditoría multilingüe: los 10 temas de las tandas MD 128–137 no aparecen en los errores; la auditoría completa aún registra 228 rutas antiguas con faltantes de Open Graph (264 errores en total), fuera de estas fichas.
- `node --check` para `site.js`, `seo-metadata.js` y chunks de Naturaleza 20–21; comprobaciones locales de una sola H1 y mapa por ficha completadas.
- No se hizo commit ni publicación. La narración sigue en español; metadatos y navegación están preparados ES/PT/EN.

### Cierre de índice — 14 de octubre de 2026

Al regenerar fichas y metadatos, se detectaron y eliminaron secciones duplicadas de Prainha/Grumari y Guaratiba en el índice. Se recompilaron las 10 rutas nuevas junto con `/naturaleza/`: 33 HTML ES/PT/EN generados, 769 URLs indexables por idioma. Sin commit ni publicación.

### Verificación de continuidad local — 13 de octubre de 2026

- Se comprobaron las cinco fichas de ecosistemas y paisajes de Guaratiba (Restinga de Grumari, transición montaña-mar, Barra de Guaratiba, Pedra de Guaratiba y Manguezais de Guaratiba) en móvil y escritorio y en ES/PT/EN: 30 cargas, cero fallos de runtime, navegación o desbordamiento.
- Se regeneró la salida local completa: 2.331 HTML ES/PT/EN, 769 URLs indexables por idioma. Las cinco rutas aparecen en los tres idiomas.
- No se editaron páginas en esta verificación, no se creó commit y no se publicó.
- Pendiente de contenido: el cuerpo editorial de estas cinco fichas todavía está en español; la traducción de las tarjetas, SEO y navegación no sustituye la traducción completa de cada ficha.

## Tanda Guaratiba · expansión de territorio y biodiversidad — 14 de octubre de 2026

Se sumaron cinco fichas de contexto a la página principal de Naturaleza:

| Tema | Ruta | Criterio editorial |
|---|---|---|
| Ilha de Guaratiba | `/naturaleza/ilha-de-guaratiba-contexto-natural/` | Contexto barrial y periurbano. El Horto Florestal de Guaratiba tiene dirección y horario administrativo publicados por INEA; ese horario no se presenta como autorización de visita recreativa. |
| APA das Brisas | `/naturaleza/apa-das-brisas/` | Unidad territorial municipal, diferenciada de un parque con portería, horario o acceso recreativo confirmado. El mapa es de orientación, no un límite legal. |
| Parque Natural Municipal da Serra da Capoeira Grande | `/naturaleza/parque-natural-municipal-serra-capoeira-grande/` | Ecosistemas y biodiversidad según SMAC; no se inventan horario, servicios ni traza. La apertura se deja para confirmación directa. |
| Observación de aves en Guaratiba | `/naturaleza/observacao-aves-guaratiba/` | Guía de observación de bajo impacto. No convierte la Reserva Biológica Estadual de Guaratiba en un área de visita libre; cualquier actividad depende de autorización o convocatoria vigente del INEA. |
| Pesca artesanal en Guaratiba | `/naturaleza/pesca-artesanal-guaratiba/` | Lectura de cultura y trabajo vivo en la Baía de Sepetiba, sin proponer embarques, puntos de pesca ni observación de faenas sin permiso. |

Fuentes consultadas: [INEA — Horto Florestal de Guaratiba](https://www.inea.rj.gov.br/biodiversidade-territorio/horto-florestal-de-guaratiba-hfgua/), [SMAC — Serra da Capoeira Grande](https://ambienteclima.prefeitura.rio/pnm-da-serra-da-capoeira-grande/), [SMAC — Unidades de Conservação](https://ambienteclima.prefeitura.rio/visite-nossos-parques/), [Lei municipal da APA das Brisas](https://aplicnt.camara.rj.gov.br/APL/Legislativos/contlei.nsf/50ad008247b8f030032579ea0073d588/183cd441b7b72b72032576ac00733584?CollapseView=&OpenDocument=&Start=2), [INEA — Reserva Biológica de Guaratiba](https://www.inea.rj.gov.br/biodiversidade-territorio/conheca-as-unidades-de-conservacao/reserva-biologica-estadual-de-guaratiba/), [INEA — atividade Vem Passarinhar](https://www.inea.rj.gov.br/observadores-de-aves-registram-71-especies-na-reserva-biologica-de-guaratiba/), [FIPERJ — fortalecimento da pesca artesanal na Baía de Sepetiba](https://www.rj.gov.br/fiperj/node/744), [UFRJ — estudo sobre paisagem de Ilha de Guaratiba](https://www.revistas.ufrj.br/index.php/EspacoAberto/article/view/2035).

Las cinco fichas usan `culture-detail`, mapa de orientación y un solo H1. Se añadieron título y descripción SEO ES/PT/EN y traducción de encabezados/tarjetas; el cuerpo editorial sigue en español y requiere traducción completa a PT/EN. No se asignaron fotos porque no hay material local identificado con certeza para estas fichas. Comprobación estructural de las cinco rutas: un H1 y un mapa por ficha, enlaces de regreso y fuentes presentes; `node --check` y `git diff --check` sin errores.

El índice tenía 89 rutas al comenzar esta tanda y ahora contiene 94. **El total pendiente no es cerrado**: los inventarios maestros siguen marcados “en construcción” y contienen temas adicionales sin una lista congelada de fichas. Temas explícitos que todavía requieren auditoría de cobertura incluyen gastronomía local, viveros y plantas ornamentales, patrimonio religioso, historia barrial, actividades marítimas autorizadas y agenda cultural. Este conteo es de rutas existentes, no una medida de cuántas fichas faltan para completar el inventario.

No se generó commit ni se publicó. No se ejecutó un build completo: este checkout no tiene `dist/locale-manifest.json`, que exige el modo localizado de actualización.
