# Playas de Río — auditoría maestra local

**Estado:** cierre de Playas integrado en preview, con QA visual de escritorio parcial. Rama `revision/rendimiento-traducciones-81a904c`; HEAD remoto verificado antes de integrar: `ff76300becbb08c1a1893f46d2ca9005f25b845f`. El commit remoto reciente de Carioc-IA se conservó como padre; el cierre de Playas se integró sobre ese estado. No se modificó Búzios ni el código de Carioc-IA.

## Alcance y datos comprobados

- 27 fichas individuales y la portada `/playas/` revisadas. La portada enlaza ahora las 27 fichas: se añadieron enlaces a las 15 tarjetas heredadas. En 13 galerías heredadas se sustituyeron miniaturas por fotos propias; en Botafogo se presenta una sola imagen disponible.
- Adjunto `PLAYAS.7z`: 145 archivos adjuntos (142 JPG, 2 JPEG, 1 AVIF; 17 carpetas y 3 archivos en raíz) más 8 referencias remotas ya configuradas en `bulk-photo-references.js`; la matriz reúne 157 entradas: 145 del adjunto, 8 referencias configuradas en `bulk-photo-references.js` y 4 URL externas distintas que ya aparecían en las fichas y en la portada. Hay 16 carpetas nominalmente asociables a páginas del catálogo, una carpeta `PRAIA DO SOSSEGO` ajena a esta ruta y 3 archivos raíz aún sin asignación inequívoca. Se detectó una copia binariamente idéntica en `PLAYA DOS AMORES` mediante SHA-256. Las tres hojas de contacto cubren visualmente los 145 archivos; la identidad por carpeta o miniatura es una pista editorial, no una prueba de ubicación, derechos ni permiso.
- Se insertaron estáticamente 33 fotos del adjunto en 16 páginas. Además, 8 fotos apuntadas por `bulk-photo-references.js` estaban configuradas para añadirse al final de siete fichas sin revisión contextual. Se bloqueó localmente sólo esa inyección automática en rutas `/playas/`; los ocho archivos quedan inventariados y pendientes de verificación e integración editorial. Las URL directas de esas 33 imágenes se abrieron en Chrome el 10-10-2026; además, se inspeccionaron las tres hojas de contacto del archivo completo. No se probó el render de las páginas locales ni se verifica Safari. La matriz distingue las 33 fotos estáticas seleccionadas, las 112 entradas del adjunto aún no integradas y las 8 referencias remotas pendientes, con inyección automática bloqueada localmente. Registra acción propuesta y motivo de no publicación.
- Las 33 imágenes integradas tienen dimensiones, ALT ES/PT/EN, carga diferida en el interior y prioridad eager para portada. Las 27 fichas y la portada cargan `playas-photo-i18n.js` con versión `20261010-playas-r1`; las 27 fichas cargan `rio-practical.css` con esa versión. Las miniaturas evitan el recorte fijo, pero requieren revisión visual final en página.
- Se añadieron notas editoriales breves con atributos ES/PT/EN en las 27 fichas y una tanda de contexto específico adicional, con fuentes enlazadas, en las 15 fichas heredadas; Copacabana, Ipanema, Arpoador, Leblon y Leme recibieron además una segunda cápsula localizada; Ipanema, Arpoador y Leblon tienen una tercera cápsula con datos de identidad y contexto. Se corrigieron errores de idioma cruzado encontrados durante la auditoría. Las fichas no se declaran completas: faltan revisión profunda, QA visual y paridad integral del cuerpo heredado. En la tanda actual, los 15 bloques editoriales generados de fichas heredadas quedaron cubiertos por claves ES/PT/EN (15/15 unidades visibles por ficha); las 12 rutas de guía práctica usan diccionarios de ruta ES/PT/EN. Esto no certifica la traducción integral de cada bloque histórico ni la renderización real. Se retiró además una cifra no sustentada sobre población de Rocinha y se precisó la descripción del aterrizaje de vuelo libre en São Conrado.
- 12 fichas usan el diccionario trilingüe por ruta `rio-beaches.js`; las otras 15 ahora tienen también bloques editoriales ES/PT/EN explícitos sobre contexto local, pero conservan contenido heredado con traducción parcial/no verificada.
- El nombre de carpeta/archivo no es prueba de identidad ni de permiso. Los derechos y el consentimiento de personas retratadas no se deducen por recibir el archivo. No se publicaron fotos históricas nuevas.

## Matriz de las 27 fichas

| Playa | Ruta | Fotos del adjunto | Integradas en ficha | Otras imágenes externas | Texto visible aprox. | Estado local |
|---|---|---:|---:|---:|---:|---|
| Playa de Abricó | `/playas/abrico/` | 7 | 2 | 0 | 3,903 | Fotos propias en ficha; render final pendiente |
| Playa de Arpoador | `/playas/arpoador/` | 13 | 3 | 0 | 5,178 | Fotos propias en ficha; render final pendiente |
| Barra: la dirección exacta cambia tu día | `/playas/barra-da-tijuca/` | 8 | 2 | 0 | 4,467 | Fotos propias en ficha; render final pendiente |
| Barra de Guaratiba: no es sólo el inicio de una trilha | `/playas/barra-de-guaratiba/` | 2 | 2 | 0 | 4,583 | Fotos propias en ficha; render final pendiente |
| Playa de Botafogo | `/playas/botafogo/` | 1 | 1 | 0 | 4,039 | Fotos propias en ficha; render final pendiente |
| Playa de Copacabana | `/playas/copacabana/` | 13 | 3 | 0 | 5,072 | Fotos propias en ficha; render final pendiente |
| Flamengo: playa y parque en el mismo paisaje | `/playas/flamengo/` | 0 | 0 | 0 | 4,479 | Sin foto propia confirmada; álbum Hostinger completo no enumerable |
| Grumari: playa grande, ciudad más lejos | `/playas/grumari/` | 12 | 2 | 0 | 4,894 | Fotos propias en ficha; render final pendiente |
| Playa de Ipanema | `/playas/ipanema/` | 11 | 2 | 0 | 5,131 | Fotos propias en ficha; render final pendiente |
| Playa de Joatinga | `/playas/joatinga/` | 12 | 2 | 0 | 4,146 | Fotos propias en ficha; render final pendiente |
| Playa de Leblon | `/playas/leblon/` | 4 | 2 | 0 | 4,859 | Fotos propias en ficha; render final pendiente |
| Playa de Leme | `/playas/leme/` | 12 | 2 | 0 | 5,152 | Fotos propias en ficha; render final pendiente |
| Macumba: mar de surf con una orla para quedarse | `/playas/macumba/` | 0 | 0 | 0 | 4,423 | Sin foto propia confirmada; álbum Hostinger completo no enumerable |
| Pepê: empezar Barra por su lado más urbano | `/playas/pepe/` | 0 | 0 | 0 | 4,509 | Sin foto propia confirmada; álbum Hostinger completo no enumerable |
| Perigoso: llegar es sólo la mitad del paseo | `/playas/perigoso/` | 0 | 0 | 0 | 4,549 | Sin foto propia confirmada; álbum Hostinger completo no enumerable |
| Pontal: mira la piedra sin dar la subida por hecha | `/playas/pontal/` | 0 | 0 | 0 | 4,288 | Sin foto propia confirmada; álbum Hostinger completo no enumerable |
| Praia da Reserva | `/playas/praia-da-reserva/` | 5 | 2 | 0 | 3,949 | Fotos propias en ficha; render final pendiente |
| Praia da Urca: yo vendría a mirar la bahía | `/playas/praia-da-urca/` | 0 | 0 | 0 | 4,740 | Sin foto propia confirmada; álbum Hostinger completo no enumerable |
| Praia do Diabo (Playa del Diablo) | `/playas/praia-do-diabo/` | 6 | 2 | 0 | 4,470 | Fotos propias en ficha; render final pendiente |
| Secreto: primero decide si bajar tiene sentido | `/playas/praia-do-secreto/` | 0 | 0 | 0 | 4,423 | Sin foto propia confirmada; álbum Hostinger completo no enumerable |
| Praia dos Amores (Barra) | `/playas/praia-dos-amores/` | 14 | 2 | 0 | 3,928 | Fotos propias en ficha; render final pendiente |
| Praia Vermelha | `/playas/praia-vermelha/` | 15 | 2 | 0 | 4,113 | Fotos propias en ficha; render final pendiente |
| Las selvagens: primero prepara la caminata | `/playas/praias-selvagens/` | 0 | 0 | 0 | 4,773 | Sin foto propia confirmada; álbum Hostinger completo no enumerable |
| Prainha: una cala para ir con tiempo | `/playas/prainha/` | 0 | 0 | 0 | 4,828 | Sin foto propia confirmada; álbum Hostinger completo no enumerable |
| Prainha do Vidigal | `/playas/prainha-vidigal/` | 5 | 2 | 0 | 4,209 | Fotos propias en ficha; render final pendiente |
| Playa de Recreio dos Bandeirantes | `/playas/recreio/` | 0 | 0 | 2 | 3,912 | Sin carpeta dedicada en el adjunto; quedan fotos externas sin licencia verificada |
| Playa de São Conrado | `/playas/sao-conrado/` | 0 | 0 | 2 | 4,522 | Sin carpeta dedicada en el adjunto; quedan fotos externas sin licencia verificada |

## Resultado fotográfico y límites

- 33 fotos de las carpetas correspondientes se insertaron en las 16 fichas con material propio (Copacabana y Arpoador tienen tres; Botafogo una; las otras trece, dos). Entre los 145 archivos hay 144 contenidos únicos; la copia exacta está señalada en el CSV y no se integra dos veces. De ellas, 25 también sustituyen miniaturas externas en las 13 galerías heredadas del índice. La distribución intercala una imagen después del primer bloque editorial en las fichas con dos fotos.
- No se sustituyeron las imágenes externas restantes en Recreio y São Conrado; su licencia de uso no está acreditada en el repo. Las fotos históricas solicitadas tampoco se incorporaron sin licencia.
- No se afirma que las 145 imágenes hayan sido cargadas individualmente desde Hostinger. Se verificaron directamente las 33 seleccionadas; el índice del directorio `FOTOS/HOME/PLAYAS/` respondió `403 Forbidden` en navegador el 10-10-2026 y no permitió enumerar las imágenes restantes.
- La portada y las fichas individuales reutilizan cuatro URL externas distintas (dos de Recreio y dos de São Conrado; ocho apariciones `<img>`). No apareció una carpeta propia confirmada para ambas playas y ninguna URL cuenta con licencia documentada; deben reemplazarse por imágenes propias verificadas o retirarse antes de publicar. Las imágenes asociadas a Abricó requieren especial protección de privacidad: priorizar paisaje y señalización y no publicar personas naturistas identificables sin permiso explícito.
- No se reasignó `PRAIA DO SOSSEGO` a Praia do Secreto. Los tres archivos de raíz siguen pendientes de identificación visual inequívoca.

## Fuentes consultadas

- INEA, balneabilidad y recomendaciones: https://www.inea.rj.gov.br/ar-agua-e-solo/balneabilidade-das-praias/ (boletín dinámico por punto/fecha).
- Riotur, playas de Río: https://riotur.rio/que_fazer/rio-praias/
- Riotur, Ipanema: https://riotur.rio/que_fazer/ipanema/
- Riotur, Arpoador: https://riotur.rio/que_fazer/arpoador/
- Riotur, Copacabana y Leme: https://riotur.rio/que_fazer/copacabana-e-leme/
- Riotur, Praia Vermelha: https://riotur.rio/que_fazer/praia-vermelha/
- Riotur, São Conrado (Praia da Gávea, extensión y aterrizaje de vuelo libre): https://riotur.rio/que_fazer/sao-conrado/
- Riotur, Posto 9 e su referencia cultural: https://riotur.rio/que_fazer/posto-9/
- Riotur, Tom Jobim en Arpoador (estatua inaugurada en 2014): https://riotur.rio/que_fazer/tom-jobim/
- Riotur, Pista Cláudio Coutinho: https://riotur.rio/que_fazer/pista-claudio-coutinho/
- Riotur, playas de Río y fichas de Joatinga, Leblon, Reserva y otras: https://riotur.rio/que_fazer/rio-praias/
- Riotur, guía de costas y Caminho dos Pescadores: https://riotur.rio/wp-content/uploads/2023/05/Rotas-Cariocas-RIO-PRAIAS.pdf
- Associação Naturista de Abricó (ANAbricó), preguntas frecuentes sobre presencia, clima, marea y vestimenta: https://www.anabrico.com.br/perguntas — consultar el aviso vigente antes del viaje.
- ANAbricó, código de ética sobre fotografías y consentimiento: https://www.anabrico.com.br/éuca
- Riotur, Copacabana y Leme, Prainha, Vermelha, Grumari, São Conrado, Pista Cláudio Coutinho y playas salvajes: páginas asociadas enlazadas desde https://riotur.rio/que_fazer/rio-praias/ .

## Pendientes para cerrar el trabajo

1. Hacer QA visual real de portada y 27 fichas en escritorio y viewport móvil equivalente a iPhone 14; el entorno no permitió servir el checkout local para capturas.
2. Revisar derechos/consentimiento de las 33 fotos escogidas y retirar o reemplazar imágenes externas cuya licencia no esté documentada.
3. Buscar las 11 playas sin carpeta dedicada en el inventario completo de fotos de Hostinger; hasta enumerar ese álbum, no pedir a Ernesto que suba archivos que quizá ya existen.
4. Confirmar con Ernesto el contexto de las tres fotos de raíz y, para cualquier candidato no integrado, verificar URL individual, derechos/consentimiento y colocación antes de proponer su uso. Las hojas de contacto fueron revisadas; no se deben tratar como validación de publicación.
5. Completar investigación histórica y revisar cada dato de acceso, servicios, gastronomía, historia y seguridad por playa con fuentes específicas.
6. Terminar traducción profesional ES/PT-BR/EN, metadatos y ALT de toda la página; los 12 diccionarios por ruta y los bloques localizados añadidos no significan paridad integral del cuerpo heredado.
7. Revisar referencias externas, contenido de portada, contenido largo y las tarjetas heredadas; no se declara la guía definitiva hasta esta revisión.
8. El documento de conocimiento ahora reúne 60 filas de Q&A ES/PT/EN en dos tablas (42 + 18), con solapamientos por deduplicar; además conserva respuestas semilla por las 27 playas. No se incorporó al motor: el código de Carioc-IA permanece sin modificar y el paquete requiere revisión antes de activación.

## Actualización de investigación en fuentes oficiales — 10-10-2026

Se creó [`PLAYAS_FUENTES_OFICIALES_RIO.md`](PLAYAS_FUENTES_OFICIALES_RIO.md), con la cobertura oficial de cada una de las 27 rutas y los límites de lo que las fuentes sostienen. La revisión directa de Riotur confirma que su guía actual presenta **más de 30 opciones** pero sólo desarrolla una selección. Por ello, el catálogo local de 27 guías no debe anunciarse todavía como inventario exhaustivo de playas municipales. El documento propone contrastar otros sectores citados por fuentes municipales (por ejemplo, Ramos, Sepetiba, Pedra de Guaratiba, Ilha do Governador y Paquetá) antes de añadir páginas; no se deben crear páginas vacías ni confundir la ciudad de Búzios con las playas de Río.

Hallazgos oficiales aplicables a las fichas: Riotur describe Ipanema en unos 2 km, Copacabana en casi 4 km, Barra en unos 18 km y Reserva en unos 8 km; caracteriza Joatinga como acceso por condominio, tramo de piedras y marea a comprobar; indica que Prainha mide unos 700 m y recomienda llegar temprano, con acceso por coche, taxi o aplicación; para las playas salvajes identifica Perigoso, Meio, Funda e Inferno y aconseja guía, agua y protección solar. La Guardia Municipal informa de controles estacionales y capacidad de aparcamiento publicada para Grumari/Prainha, que no se puede prometer como disponibilidad constante. SMAC identifica las áreas protegidas y la restinga de Grumari, Prainha y Reserva; INEA mantiene el boletín variable de balneabilidad.

En 2026, la Prefeitura describió Arpoador y Praia do Diabo como candidatas a Bandera Azul, mientras Prainha y Grumari ya estaban certificadas en la nota consultada. No presentar candidatura como certificación. Los horarios y controles de acceso publicados en campañas de verano/Réveillon deben confirmarse para la fecha concreta.


## Actualización de fotos y catálogo oficial — 10-10-2026

La portada ahora distingue las 27 guías de playa de nueve referencias oficiales adicionales de costa y ocio acuático. Las fichas nuevas usan 8 imágenes abiertas CC; Recreio y São Conrado sustituyen imágenes externas sin licencia documentada. Los créditos, licencias, dimensiones, ubicación y estado de verificación están en `PLAYAS_FOTOS_MAPEO.csv`. Praia da Urca sigue sin foto nueva porque el candidato encontrado corresponde a Praia Vermelha. Las miniaturas de Commons y la vista en el preview aún deben comprobarse con el sitio servido.

## Cierre integrado de Playas — 10-10-2026

- Se verificó el remoto actual antes de integrar: `ff76300becbb08c1a1893f46d2ca9005f25b845f`. Ese commit incluye la ampliación reciente de Carioc-IA y se conserva como padre del cierre de Playas.
- El catálogo presenta 27 fichas individuales enlazadas y 9 referencias costeras complementarias documentadas con fuentes municipales. Riotur declara más de 30 opciones y muestra una selección; por eso el sitio ofrece una cobertura extensa y ordenada, sin llamarla inventario oficial exhaustivo.
- Las 27 fichas tienen al menos una imagen de contenido en su HTML. Se añadió Praia da Urca con foto correctamente identificada y licenciada; la matriz conserva una fila por referencia/archivo y queda con 168 filas de datos, con 16 columnas consistentes.
- `git diff --check`, `node --check assets/js/playas-photo-i18n.js`, la revisión de enlaces locales y el control de metadatos de imágenes pasan. El sitio local no pudo servirse en un navegador en este entorno; no se declara revisado el render visual en escritorio/iPhone ni el estado HTTP de cada imagen dentro de la web.
- El álbum completo de Hostinger no permite enumeración desde el directorio público; no se marca ninguna foto propia como inexistente y no se pide subir archivos sin confirmar ausencia.
- La integración se limita a Playas y documentación de Playas. El remoto de Carioc-IA se mantiene intacto; no se tocan Gastronomía, Vida Nocturna, Búzios ni producción.


### Cierre en preview y corrección tras QA visual — 10-10-2026

El preview `dimgrey-hyena-256947.hostingersite.com` está conectado a la rama indicada y desplegó el cierre. En Chrome de escritorio verifiqué portada y ficha de Urca; su imagen y crédito aparecen correctamente. Esa revisión reveló una cifra sin fuente en la tarjeta de São Conrado, que se quitó antes del enlace final. La pasada complementaria conserva el resto del trabajo y sólo afecta Playas y sus documentos de QA. La revisión visual de móvil/iPhone y la comprobación completa de las imágenes servidas siguen pendientes.

## Adaptación premium local — 11-10-2026

La estructura visual premium se aplicó localmente a las 27 fichas individuales: Copacabana conserva su modelo editorial y las 26 fichas restantes usan el mismo sistema tipográfico y cromático, con galerías sin recorte fijo. Todas cargan `playas.css` y `playas-photo-i18n.js` con caché `20261011-playas-premium-2`. QA estático registró 27 H1 únicos, 74 etiquetas de imagen en total (47 de contenido y 27 logotipos), todas con ALT y dimensiones y cero destinos locales inexistentes. `node --check` y `git diff --check` pasan. La vista renderizada en preview y la revisión responsive siguen pendientes; no se afirma aprobación visual ni se modifica producción.
