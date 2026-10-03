# Arquitectura ES/PT/EN y mantenimiento

Fuente inicial: `8ef4bc4fddbf4612995660ec7ddf372b792778e4`, rama `revision/rendimiento-traducciones-81a904c`.

Los 596 HTML fuente permanecen únicos y sin modificaciones editoriales. Los diccionarios y módulos existentes continúan siendo la fuente de traducción. `npm ci && npm run build` genera `dist/`: ES conserva rutas actuales; PT utiliza `/pt/`; EN utiliza `/en/`. Se producen 1.788 documentos, de los cuales 589 por idioma son indexables (1.767). Alias, 404 y documentos noindex se excluyen de canonical/alternates/sitemap según corresponda; se preservan sus funciones.

El build usa Chromium empaquetado, sin descargar Chrome durante el deploy. Las bibliotecas existentes Tailwind 3.4.17 y React/ReactDOM 18.3.1 se incluyen comprimidas como insumos exclusivamente de build, conservando sus avisos de licencia. Las páginas generadas referencian esas mismas versiones de CDN; no se añaden estas bibliotecas a páginas que no las usaban. El build no solicita fotografías, mapas, datos meteorológicos ni widgets externos y no inventa sus respuestas. Los widgets se cargan normalmente en el navegador del usuario.

`scripts/build_multilingual.mjs` ejecuta los renderizadores originales y espera `site.ready` (diccionarios listos). El HTML principal se serializa, con assets/imports resueltos sobre la base original, navegación interna localizada, metadata y JSON-LD de WebPage coherentes. Se conservan el aspecto y contenidos españoles aprobados; no se reescriben introducciones ni headings. No se publican rutas Premium adicionales.

Cada conjunto indexable declara `es`, `pt-BR`, `en` y `x-default` (ES), con enlaces recíprocos y canonical propio. `scripts/build_sitemap.py --root dist` genera el sitemap con los HTML reales; no se modificó el sitemap ES fuente para apuntar a locales aún no publicadas en el dominio principal. El preview contendrá el sitemap nuevo y los canonicals del dominio público final, conforme a su función.

La URL gana frente a preferencias guardadas. No se redirige automáticamente por idioma del navegador/IP/storage. El selector conserva ruta, query y fragmento. Navegación, links agregados por filtros y CTA internos conservan idioma; assets, externos, enlaces de descarga y fragmentos locales no se prefijan. Eventos, que no usaba la cabecera compartida, incorpora únicamente un selector de idioma al pie en la salida generada. Los 33 redirects ES se mantienen y tienen 66 equivalentes PT/EN.

## Cambios SEO de este bloque

`assets/js/seo-metadata.js` define titles/descriptions de 12 páginas prioritarias en tres idiomas (36 títulos y 36 descripciones), con OG y Twitter consistentes. No modifica su contenido editorial. Ver PLAN_SEO.md para intención y alcance. BreadcrumbList se añade solo con páginas padre reales y etiquetas visibles. No se fabrican precios, ofertas, fechas, reviews, LocalBusiness, FAQ ni TouristTrip.

Los adaptadores de build resuelven controles inline anteriores sin alterar HTML fuente: lookup seguro para diccionarios sin entrada ES; `lang()` de Mercado São Pedro renombrado para evitar colisión con la propiedad DOM `lang`; barras de idiomas generadas por JS se regeneran una vez al arrancar para no duplicar listeners. El runtime moderno usa los controles URL de navegación.

## Verificar futuras modificaciones

1. Editar solo fuente/diccionarios; nunca editar dist manualmente.
2. `npm run build` — reconstrucción automática completa.
3. `python3 scripts/audit_multilingual.py` — todos los HTML/sitemap/canonical/alternates/enlaces/schema.
4. `EC_CHROME_PATH=... node scripts/qa_locale_runtime.mjs` — muestra ES/PT/EN en 390 y 1365 px; `--all` recorre todas las URL indexables. Puede usarse el browser empaquetado configurándolo con scripts/build_browser.mjs.
5. `python3 scripts/audit_static.py` y sintaxis de scripts fuente; repetir solamente áreas afectadas según cambios.
6. Commit consolidado en esta rama y preview. Producción requiere revisión/aprobación posterior.

`--routes=/ruta/,/otra/ --update` permite regenerar únicamente rutas afectadas en el entorno local, conservando manifiesto y sitemap completos; el deploy siempre reconstruye todo desde fuente. No es una segunda colección editorial.

## Investigación: límites

72 búsquedas web (24 por idioma) y 813 títulos SERP observados; los candidatos adicionales son expansión propuesta, sin volumen, KD ni rankings. La matriz no demuestra canibalización en Google ni justifica páginas nuevas automáticamente. Petrópolis y otras brechas deben validarse comercial/editorialmente. La arquitectura preserva la limitación previa de certificación lingüística exhaustiva; generar HTML no convierte nombres o frases invariables en faltantes, ni certifica cada oración como traducción humana. No se contactó Search Console ni se publicó producción.
