# IMPLEMENTACIÓN BÚZIOS V1

Fecha: 2026-10-04
Base obligatoria: `6a401d9371d978e75b5f772aa08ae0e761184b13`
Rama: `revision/rendimiento-traducciones-81a904c`

## Resultado

Búzios V1 queda construido como segundo núcleo de Ernestinho Carioca, sin desplazar a Río ni confundir la estancia en Búzios con el producto `/experiencias/buzios/` que sale desde Río. La implementación utiliza el sistema visual, multilingüe y de navegación vigente; no crea precios, operadores, horarios ni condiciones no confirmadas.

Se implementaron **21 URLs fuente y 63 versiones localizadas** (ES, PT-BR y EN): 11 páginas editoriales y 10 páginas comerciales preparadas para consulta.

## Arquitectura final

### Editorial

| URL fuente | Función |
|---|---|
| `/destinos/` | Puerta editorial a destinos; Búzios es el único núcleo nuevo publicado. |
| `/destinos/buzios/` | Home propia del destino y distribuidor principal. |
| `/destinos/buzios/playas/` | Comparador editorial de las 23 playas documentadas. |
| `/destinos/buzios/alojamiento/` | Comparación de 12 zonas y estructura preparada para propiedades reales. |
| `/destinos/buzios/como-llegar/` | Río, GIG, SDU y Cabo Frio; bus, privado y auto sin tarifas inventadas. |
| `/destinos/buzios/moverse/` | Caminar, vans, taxi/apps, auto, buggy y movilidad entre playas. |
| `/destinos/buzios/que-hacer/` | Descubrimiento de actividades, naturaleza y planes de lluvia. |
| `/destinos/buzios/comer-y-salir/` | Gastronomía, noche y compras agrupadas por intención y zona. |
| `/destinos/buzios/cruceros/` | Escalas cortas, tender y retorno prudente sin calendario dinámico. |
| `/destinos/buzios/consejos/` | Clima, temporadas, familias, práctica, lluvia e itinerarios orientativos. |
| `/destinos/buzios/experiencias/` | Hub comercial para quien ya está alojado en Búzios. |

### Comerciales preparadas

| URL fuente | Producto confirmado por catálogo | Publicación comercial |
|---|---|---|
| `/destinos/buzios/experiencias/arraial-do-cabo/` | Full Day Arraial do Cabo | Consulta; precio y operación requieren confirmación. |
| `/destinos/buzios/experiencias/cabo-frio/` | Full Day Cabo Frio | Consulta; precio y operación requieren confirmación. |
| `/destinos/buzios/experiencias/rio-desde-buzios/` | Full Day Río / variante AquaRio | Consulta; suplementos históricos no publicados. |
| `/destinos/buzios/experiencias/paseo-barco/` | Escuna Babyloon / Catamarán Libertas | Comparador; no se mezcló con lancha privada. |
| `/destinos/buzios/experiencias/paseo-buggy/` | Paseo en buggy | Separado del alquiler. |
| `/destinos/buzios/experiencias/alquiler-buggy/` | Baby, Bugre, Way y Super | Variantes en una misma landing; precio por carro pendiente. |
| `/destinos/buzios/experiencias/jardinera/` | Paseo panorámico | Recorrido exacto pendiente del operador. |
| `/destinos/buzios/experiencias/trekking/` | Trekking | Separado de la guía editorial de naturaleza. |
| `/destinos/buzios/experiencias/buceo/` | Bautismo de buceo | Fotos/video tratados como inclusión histórica por confirmar. |
| `/destinos/buzios/experiencias/full-day-buzios/` | Full Day Búzios | Estructura histórica explicada como provisional, no como inclusión vigente. |

## Decisiones de agrupación

- Las 23 playas permanecen en una guía profunda y comparativa. No se crearon 23 páginas débiles.
- Las 12 zonas se desarrollan dentro de alojamiento. Las páginas individuales quedan para V2 si aparecen demanda, inventario y material propios.
- Gastronomía, vida nocturna y compras comparten una guía porque la decisión real se organiza por zona, momento y regreso. Pueden separarse cuando exista mantenimiento editorial suficiente.
- Clima, lluvia, familia, información práctica e itinerarios se agrupan en `/consejos/`. Los itinerarios orientan por ritmo y días, sin publicar recorridos premium propietarios.
- Naturaleza y deportes tienen profundidad editorial en qué hacer; el trekking comercial conserva una intención distinta.
- Babyloon y Libertas comparten el núcleo de paseos marítimos. No se creó una landing casi idéntica para cada embarcación.
- El catálogo de apartamentos no se publicó porque no existe inventario real. La guía deja definido el modelo de datos necesario para añadir propiedades sin reconstruir la arquitectura.

## Home y enlazado

La Home conserva el hero y el protagonismo de “Río no se visita. Se vive.” Se añadió después de la introducción principal un bloque editorial amplio de Búzios con imagen temporal interna, texto localizado y CTA a la home del destino.

`/destinos/` distribuye al nuevo núcleo. La home Búzios enlaza playas, alojamiento, llegada, movilidad, consejos y experiencias. Las páginas comerciales enlazan al hub local y usan WhatsApp como consulta, nunca como confirmación automática. El contenido distingue siempre:

- `/experiencias/buzios/`: excursión hacia Búzios saliendo desde Río.
- `/destinos/buzios/experiencias/`: actividades para quien ya se encuentra en Búzios.

Se añadieron siete continuaciones contextuales (21 equivalentes localizados), sin cambiar header/footer ni contenido comercial de Río:

| Origen | Destino |
|---|---|
| `/experiencias/` | `/destinos/buzios/experiencias/` |
| `/experiencias/buzios/` | `/destinos/buzios/` |
| `/hospedaje/` | `/destinos/buzios/alojamiento/` |
| `/transportes/` | `/destinos/buzios/como-llegar/` |
| `/guia/` | `/destinos/buzios/` |
| `/playas/` | `/destinos/buzios/playas/` |
| `/familia/` | `/destinos/buzios/consejos/` |

## SEO y localización

Todas las URLs se generan en ES, PT-BR y EN mediante el sistema existente. Cada versión define `lang`, title, description, OG, canonical propio, hreflang recíproco y `x-default`. Los enlaces permanecen dentro del idioma. El generador vigente incorpora las rutas al sitemap.

Los textos no son traducciones literales: PT-BR utiliza formulación brasileña, EN es natural y ES prioriza las dudas del viajero latinoamericano. No se publicaron porcentajes históricos como datos actuales.

## Investigación incorporada

Además del Master, se contrastaron el portal oficial de Turismo de Búzios, fuentes oficiales de Cabo Frio, páginas oficiales de operadores de escuna/catamarán/jardinera y referencias de buceo y senderos. Su función fue confirmar que las modalidades existen y enriquecer el contexto editorial; **sus condiciones no se trasladaron al producto de Ernesto**. Las altas nuevas están registradas en `FUENTES_BUZIOS.csv`.

## Precios y catálogo histórico

El tarifario “NETOS JUNIO 2026 — SALIENDO DESDE BÚZIOS” se usó solo como prueba interna de catálogo. Ningún neto de junio, tasa, suplemento ni fórmula `neto + R$30` aparece como precio vigente en las páginas públicas. Los alquileres mantienen un modelo diferente y no recibieron un aumento automático.

Las páginas muestran equivalentes de “consultar valor actualizado” y “consultar disponibilidad”. Los campos de precio desde, promoción, tasas, inclusiones y condiciones quedan preparados para datos confirmados.

## Imágenes

La interfaz no depende de una imagen externa dudosa. Se reutilizan temporalmente activos Búzios ya existentes en el repositorio y se identifican como material a reemplazar. `IMAGENES_BUZIOS.csv` mantiene el inventario de HERO, CARD, GALERÍA, PRODUCTO, ALOJAMIENTO, PLAYA, ZONA, GASTRONOMÍA y ACTIVIDAD, con carpeta Cloudinary futura y alt localizado.

El inventario contiene 56 necesidades de fotografía, incluidas las propuestas futuras conservadas del Master. Los activos temporales son IMG_3079, IMG_3080, IMG_3081 y IMG_3082; no se subieron imágenes nuevas a Cloudinary. Las fotos genéricas del destino no se presentan como imagen de la embarcación, vehículo o apartamento concreto.

## Desviaciones respecto al Master

- El Master proponía 19 conceptos V1. La nueva confirmación comercial justificó 21 URLs fuente: se añadió un hub de experiencias local y se incorporaron diez productos diferenciados.
- Se adelantaron a V1 paseo en buggy, jardinera, trekking, buceo, Río desde Búzios y Full Day Búzios porque el tarifario confirma que existen en el catálogo, aunque sus condiciones actuales siguen pendientes.
- No se adelantaron apartamentos, lancha privada, snorkel, surf, transfers dedicados ni páginas individuales de playas/zonas: falta inventario propio o la intención todavía se resuelve mejor dentro de una guía.

## REQUIERE ERNESTO

La lista operativa y priorizada está en `REQUIERE_ERNESTO.md`. Ningún pendiente impide publicar el núcleo editorial; los datos de precio, operador, recogida, horarios, inclusiones, políticas, propiedades y fotografías bloquean presentar cada producto como reservable con condiciones cerradas.

## QA antes del commit

- Build completo: 1851 HTML generados; 1830 URLs indexables en sitemap, 610 por idioma. Las actualizaciones finales se regeneraron con el mismo generador sobre las rutas afectadas.
- QA focalizado: 21 fuentes / 63 versiones nuevas, cero fallos de canonical, hreflang, `lang`, title, description, OG, H1, sitemap, enlaces locales, WhatsApp o precios históricos. Evidencia: `QA_BUZIOS_V1.json`.
- Navegador: 174 combinaciones de ruta/idioma/viewport, desktop 1365 px y móvil 390 px; cero errores de runtime, HTTP, metadata, selector, escape de idioma u overflow. Incluye Home y siete puntos de integración con Río. Evidencia: `QA_RUNTIME_BUZIOS_V1.json`.
- QA visual con imágenes reales: seis combinaciones de Home Búzios, playas y barco; 18 navegaciones reales ES→PT→EN→ES conservando query y fragment; cero errores o imágenes rotas. También se inspeccionó el bloque Búzios de Home en desktop/móvil. Evidencia: `QA_VISUAL_BUZIOS_V1.json`.
- Sintaxis de módulos y scripts nuevos; JSON/CSV válidos; `git diff --check` sin errores.
- Control congelado obligatorio: sigue reportando las 586 diferencias históricas ya cerradas; no se reabrieron ni se modificó su manifest. El diff de Río se limita a Home y siete scripts de continuación contextual autorizados.
- Afiliados: ningún ID, token, banner, widget ni enlace existente fue modificado.

Dependencias técnicas necesarias: el build aplica el renderer Búzios después del traductor global para preservar su metadata localizada; el QA reutiliza el navegador portátil ya incluido en el proyecto y permite guardar evidencia separada en `docs/buzios/`.

El SHA final y el preview READY se entregan al cerrar la ejecución. Se usa un único commit, push y preview; no producción ni merge a main.
