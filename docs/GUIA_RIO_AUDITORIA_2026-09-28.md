# Auditoría Guía de Río — 28-09-2026

## Alcance y versión

- Canónico: `lacasadelsushirg-pixel/ernestinho`, commit `28c2407` (rama `main`, 2026-09-26).
- V2 revisada: `guia-rio-final-20260927`, commit `acbf948` (PR #3); la rama `migracion-contenido-20260927` está en `90f4f2c` y V2 `main` en `ecc4c4d`.
- Reconstrucción canónica: `data/guia.json` + `assets/app.js` (`GUIA_TEMAS`, `GUIA_INFO`, integración V6, capítulos V7) + artículo legacy de electricidad + diccionarios de traducción globales. Se buscó una capa V8 de Guía y no se encontró un bloque explícito.
- `Cómo moverse` se contrasta con la instrucción explícita de dirigir al módulo `../transportes/`; no se acepta una ficha independiente simplificada.

Los conteos de V1 incluyen las mutaciones V6/V7 que efectivamente agregan artículos y FAQ. En HTML se añadieron bloques para conservar en español cada título/párrafo ausente; el texto V2 anterior se mantuvo. “Texto exacto” significa que el título o párrafo íntegro aparece en el HTML V2, no que haya parecido semántico. Un texto exacto ausente requiere conciliación; por sí solo no demuestra que ningún dato equivalente exista en otra redacción.

## Matriz maestra

| Ficha | Original estructurado | Expansiones posteriores | Total esperado | V2: tarjetas H2 | Texto exacto V2: títulos / párrafos | Fotos en HTML | Links en V2 | Consejo V1 íntegro | ES/PT/EN del copy V2 actual | Estado |
|---|---:|---:|---:|---:|---|---:|---:|---|---|---|
| Documentos y entrada | 5 | +14 | 19 | 33 | 19/19 · 19/19 | 3 | 15 | Sí | ES/PT/EN con cobertura estática ✓ | Fuente y traducciones presentes; visual pendiente |
| Viajar con menores | 10 | +0 | 10 | 10 | 10/10 · 10/10 | 2 | 8 | Sí | ES/PT/EN con cobertura estática ✓ | Contenido alineado; visual pendiente |
| Permanencia y extensión | 7 | +0 | 7 | 7 | 7/7 · 7/7 | 2 | 7 | Sí | ES/PT/EN con cobertura estática ✓ | Contenido alineado; visual pendiente |
| Viajar solo o sola | 0 | +17 (V6/V7) | 17 | 35 | 17/17 · 17/17¹ | 2 | 14 | Consejo propio presente; Barraca Rio 122 reforzada | ES/PT/EN con cobertura estática ✓ | Fuente y traducciones presentes; visual pendiente |
| Seguro y salud | 8 | +3 | 11 | 14 | 11/11 · 11/11 | 3 | 16 | Sí | ES/PT/EN con cobertura estática ✓ | Fuente y traducciones presentes; visual pendiente |
| Vacunas | 5 | +0 | 5 | 5 | 5/5 · 5/5 | 3 | 7 | Sí | ES/PT/EN con cobertura estática ✓ | Contenido alineado; visual pendiente |
| Dinero y tarjetas | 7 | +1 | 8 | 18 | 8/8 · 8/8 | 4 | 8 | Sí | ES/PT/EN con cobertura estática ✓ | Fuente y traducciones presentes; visual pendiente |
| Internet / chip / eSIM | 6 | +13 | 19 | 23 | 19/19 · 19/19 | 2 | 12 | Sí | ES/PT/EN con cobertura estática ✓ | Fuente y traducciones presentes; visual pendiente |
| Enchufes y voltaje | 7 párrafos del artículo legacy | Sin otra expansión fuente identificada | 7 párrafos + 2 fotos contextuales | 15 | 7/7 párrafos · 2/2 fotos | 3 | 7 | Sí, consejo personal | ES/PT/EN con cobertura estática ✓ | Contenido y fotos legacy restaurados; visual pendiente |
| Apps útiles | 8 | +0 | 8 | 8 | 8/8 · 8/8 | 2 | 13 | Sí | ES/PT/EN con cobertura estática ✓ | Contenido alineado; visual pendiente |
| Salud y emergencias | 9 | +25 (V6/V7) | **34** | **39** | 34/34 · 34/34 | 2 | 16 | Sí | ES/PT/EN con cobertura estática ✓ | 34/34 presente literal; visual pendiente |
| Consulados | 6 | +0 | 6 | 6 | 6/6 · 6/6 | 2 | 8 | Sí | ES/PT/EN con cobertura estática ✓ | Contenido alineado; visual pendiente |
| Accesibilidad / adultos mayores | 9 | +13 | 22 | 26 | 22/22 · 22/22 | 2 | 13 | Sí | ES/PT/EN con cobertura estática ✓ | 22/22 presente literal; visual pendiente |
| Aeropuertos | 8 | +0 | 8 | 8 | 8/8 · 8/8 | 2 | 8 | Sí | ES/PT/EN con cobertura estática ✓ | Contenido alineado; visual pendiente |
| Terminales / Rodoviária / barcas | 8 | +0 | 8 | 8 | 8/8 · 8/8 | 2 | 8 | Sí | ES/PT/EN con cobertura estática ✓ | Contenido alineado; visual pendiente |
| Cómo moverse | 3 | +1 | 4 (canónico) | 0 ficha editorial; enlace a Transportes | No aplica | — | Destino `../transportes/` | No aplica | Destino compartido | Redirección y sitemap corregidos |
| Alquiler de auto | 12 | +0 | 12 | 12 | 12/12 · 12/12 | 3 | 7 | Sí | Cobertura estática ✓ | Contenido alineado; widget pendiente de navegador |

¹ Los 17 títulos y párrafos fuente de Viajar solo constan íntegros en V2 después de la restauración. Se conserva además la recomendación personal **Barraca Rio 122, Posto 4, Copacabana**, incluyendo que trabaja hace años con los clientes de Ernestinho.

## Pasadas independientes

### Pasada 1 — Contenido

**PASA en presencia literal del contenido estructurado**: 194/194 pares título/párrafo en las 15 fichas enumerables están ahora presentes palabra por palabra; las fichas conservan el copy V2 y se añadieron bloques del original donde faltaba texto. Salud y emergencias quedó en 34/34, Internet 19/19, Accesibilidad 22/22, Documentos 19/19, Viajar solo 17/17, Seguro 11/11 y Dinero 8/8. Enchufes añade además los 7 párrafos y las 2 fotos de su artículo legacy; Cómo moverse sigue redirigida al módulo completo. Esta prueba literal no certifica vigencia externa de cada dato. La fuente final también contiene el artículo legacy de electricidad, recuperado por separado; no se encontró un bloque V8 explícito de Guía.

### Pasada 2 — Visual y fotos

**PARCIAL.** Se inventariaron imágenes y se verificaron por URL los activos especiales:

- Documentos: miniatura/portada y foto contextual de Ernestinho mostrando su documento están en la página.
- Vacunas: portada `miniaturas_guia_rio_vacunas.png` y foto contextual `WhatsApp_Image_2026-09-01_at_10.57.13.jpg` están ambas presentes. El `hero` de `GUIA_INFO` apunta por error a la miniatura de Dinero; prevalece la imagen de Vacunas indicada explícitamente en las instrucciones y en `GUIA_TEMAS`.
- Dinero: `billetes_brasil.png` y `monedas_brasil.png` están presentes por separado.
- Auto: portada `alquiler_auto.jpg`, miniatura de Guía y `banner_rent_cars.png` están presentes.
- Enchufes: se recuperaron las fotos contextuales Tipo N y tomacorrientes Río/Búzios del artículo legacy.
- Assist Card: banner `assist_card.png` presente.
- Se completaron los `alt` vacíos de 12 portadas internas con claves ES/PT/EN.
- Se verificó que las 15 miniaturas de `GUIA_TEMAS` para fichas del alcance están en las tarjetas de `guia/index.html`; se corrigió la miniatura de Enchufes. La tarjeta de Viajar solo conserva la portada de V6.

No se hizo comprobación visual de recorte, posición, responsive ni carga real: el navegador integrado bloqueó la URL local con `ERR_BLOCKED_BY_CLIENT`; Playwright está instalado, pero falta su ejecutable Chromium. Tampoco está instalado `agent-browser`.

### Pasada 3 — Links y afiliados

**PARCIAL, revisión estática.** No hay `href` vacíos en las fichas Guía examinadas; los enlaces externos que usan `_blank` tienen `noopener noreferrer`. Se compararon 51 referencias URL fuente (44 destinos distintos) de GUIA_INFO, V6 y V7: todos los destinos externos están presentes tras añadir nueve links oficiales de V7 que faltaban. Las rutas internas de la página V6 de Viajar solo que no existen en V2 se remapearon a las páginas Guía equivalentes. Se verificaron sin cambios accidentales los identificadores de Airalo (`trs=573170`, `shmarker=776744`, `promo_id=8588`, `campaign_id=541`), el token de Assist Card y los links/requestor de Rentcars (`requestor=11142`, UTMs, widget y locale `es` / `pt-br` / `en`). No se hizo una prueba de red del destino afiliado ni del contenido del widget.

La tarjeta Cómo moverse ya apunta a Transportes. La ruta antigua `/guia/moverse/` ahora es una redirección, quedó fuera del sitemap y el generador de sitemap la excluye.

### Pasada 4 — ES/PT/EN

**PASA en cobertura estática.** Las 17 rutas de Guía quedan con **cero cadenas visibles o atributos sin traducción** en el diccionario común y los dos chunks Guía, cargados por `site.js`. Cada chunk queda bajo 250 KB. Se incorporaron traducciones PT/EN para los textos canónicos restaurados y el artículo legacy de enchufes. El cambio dinámico del selector no se pudo verificar en navegador. Airalo conserva PT con fallback ES y ES/EN con sus locales previstos.

### Pasada 5 — Funcional

**PARCIAL.** Tras añadir los bloques canónicos, un chequeo estructural en las 17 rutas detecta cero `href`/`src` vacíos, imágenes sin `alt` y IDs duplicados. La sintaxis de traducciones y `vercel.json` pasa. El auditor global informa 11 errores fuera de las 17 fichas Guía: faltan description, h1 y runtime compartido en `compras/feira-organica/`, `gastronomia/guacamole-copa/` y `gastronomia/pilograma-centro/` (3 errores por página); falta runtime compartido en `transportes/alquiler-vehiculo/` y `vida-nocturna/comuna/` (1 por página). No hubo prueba de navegador, consola, selector dinámico, widget ni responsive.

## Correcciones locales aplicadas

- Redirección permanente de `/guia/moverse` a `/transportes/`, exclusión del sitemap y del generador.
- Texto canónico de la recomendación Barraca Rio 122 en Viajar solo, con traducción PT/EN.
- Restauración literal, sin borrar copy V2, de los puntos fuente que faltaban en Documentos, Seguro, Dinero, Internet, Salud y emergencias, Accesibilidad y Viajar solo.
- Nueve enlaces oficiales V7 y sus traducciones de rótulo; miniatura canónica de Enchufes en el índice.
- Alt descriptivo para las portadas internas que estaban vacías.
- Traducciones PT/EN de títulos, enlaces oficiales y textos canónicos restaurados, separadas en dos chunks para mantener cada archivo bajo 250 KB; cobertura estática sin cadenas visibles pendientes.

### Archivos modificados

- `assets/js/translations/chunks/guia-01.js`
- `assets/js/translations/chunks/guia-02.js`
- `assets/js/site.js`
- `guia/accesibilidad/index.html`
- `guia/aeropuertos/index.html`
- `guia/apps/index.html`
- `guia/consulados/index.html`
- `guia/dinero/index.html`
- `guia/documentos/index.html`
- `guia/emergencias/index.html`
- `guia/enchufes-voltaje/index.html`
- `guia/index.html`
- `guia/internet/index.html`
- `guia/menores/index.html`
- `guia/moverse/index.html`
- `guia/permanencia/index.html`
- `guia/seguro/index.html`
- `guia/terminales/index.html`
- `guia/viajar-solo/index.html`
- `scripts/build_sitemap.py`
- `sitemap.xml`
- `vercel.json`
- `docs/GUIA_RIO_AUDITORIA_2026-09-28.md`

No se generó deployment, no se hizo merge y no se modificó `main` ni producción.

## Puerta pendiente

No crear Preview todavía. La cobertura literal estructurada y la cobertura estática ES/PT/EN ya pasan. Siguen pendientes la inspección visual de posición y responsive, la prueba dinámica de los tres idiomas, la consola, los enlaces de red y los widgets Airalo/Rentcars/Assist Card en navegador. Después repetir las pasadas visual y funcional. Este informe es un registro de hallazgos, no una declaración de terminación.
