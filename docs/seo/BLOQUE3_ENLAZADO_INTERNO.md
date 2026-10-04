# Bloque 3 — Enlazado interno P1 → P0

Base: `92d028d9e0aa7e226c20887c6a0d59a300a28ddb`, rama `revision/rendimiento-traducciones-81a904c`.
Decisiones tomadas exclusivamente de PLAN_CRECIMIENTO_EC.md y SEO_ACTION_MAP.csv existentes. Sin nueva investigación ni auditoría general.

## Implementación

9 fuentes ES, equivalentes PT-BR/EN: 27 páginas renderizadas. 18 relaciones nuevas por idioma, 54 enlaces localizados. Diez párrafos breves contextuales; contenido anterior conservado íntegramente. Nueve HTML y seis diccionarios de traducción, más estos dos informes. Sin cambios en destinos comerciales, precios, imágenes, CSS, header/footer, URLs, canonical/hreflang ni sitemap.

| Origen | Destino |
|---|---|
| `/guia/` | `/experiencias/` |
| `/consejos/rio-1-a-7-dias/` | `/experiencias/full-day-rio/` |
| `/consejos/rio-1-a-7-dias/` | `/experiencias/cristo-city-tour/` |
| `/consejos/rio-1-a-7-dias/` | `/experiencias/buzios/` |
| `/consejos/rio-1-a-7-dias/` | `/experiencias/arraial-do-cabo/` |
| `/consejos/rio-1-a-7-dias/` | `/experiencias/angra-ilha-grande/` |
| `/atracciones/cristo-redentor/` | `/experiencias/cristo-city-tour/` |
| `/atracciones/cristo-redentor/` | `/experiencias/full-day-rio/` |
| `/atracciones/pao-de-acucar/` | `/experiencias/full-day-rio/` |
| `/atracciones/maracana/` | `/experiencias/maracana-experience/` |
| `/atracciones/maracana/` | `/experiencias/partido-maracana/` |
| `/barrios/maracana/` | `/experiencias/maracana-experience/` |
| `/barrios/maracana/` | `/experiencias/partido-maracana/` |
| `/familia/maracana-tour/` | `/experiencias/maracana-experience/` |
| `/familia/maracana-tour/` | `/experiencias/partido-maracana/` |
| `/playas/copacabana/` | `/hospedaje/` |
| `/playas/sao-conrado/` | `/experiencias/vuelo-en-parapente/` |
| `/playas/sao-conrado/` | `/experiencias/ala-delta/` |

Cada enlace permanece en su idioma mediante el enrutador existente. No se suprimieron queries/fragments: ninguno de los enlaces añadidos los requiere.

## Profundidad y selección

Comparación acotada de HTML renderizado (incluye navegación generada por JS), no auditoría de orfandad. En 16 pares origen→destino se pasa de dos clics vía Experiencias a uno directo. Guía→Experiencias y Copacabana→Hospedaje ya tenían acceso de un clic en la navegación: aportan contexto editorial. La distancia mínima desde portada no disminuye en el grafo acotado; no se declara ninguna página deshuérfana ni reducción global.

Descartados: Aeropuertos→transporte privado, guía de alojamiento→Hospedaje y barrio Copacabana→Hospedaje ya tenían enlaces (incluidos componentes/JS); barrio São Conrado ya enlaza Rocinha. Cultura genérica→tours no tenía contexto editorial suficiente. AquaRio/BioParque no tenían asignación comercial concreta en el mapa para este lote. Las 12 páginas de Naturaleza a cuatro clics son destinos informativos, fuera de la dirección P1→P0. Sin protagonismo para estudio-1-1 ni rutas cuestionadas.

## QA acotado

27 salidas ES/PT/EN con canonical/hreflang idénticos al estado base. Sintaxis de HTML/JS y seis diccionarios válida; entradas previas de diccionarios intactas. Eliminando únicamente los párrafos nuevos, cada fuente coincide byte por byte con su versión base. Sitemap idéntico. Comprobador congelado: misma línea base heredada de 586 diferencias, sin reabrirlas.

54 combinaciones de navegador (9×3 idiomas×desktop/móvil), 54 navegaciones reales del selector ES→PT→EN→ES, 33 destinos localizados HTTP 200 y seis comprobaciones de CTA/WhatsApp existentes. Cero fallos nuevos. Comparación de capturas antes/después, estilos y geometría; revisión visual desktop/móvil. Vídeos externos no reproducidos en QA. No se enviaron mensajes WhatsApp.

Contradicciones 805/605/Casa Venti y diferencia Angra conservadas; selector ES de Partido Maracanã e imagen externa Maracanã Tour no modificados, conforme al alcance. Un único commit y preview automático de rama; sin producción. El preview se verificará una vez READY y se informará en la entrega.
