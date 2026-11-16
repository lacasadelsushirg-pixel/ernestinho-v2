# Registro maestro de continuidad multilingüe

Última actualización: 2026-11-16 UTC

## Fuente de verdad y publicación

- Repositorio: `lacasadelsushirg-pixel/ernestinho-v2`.
- Rama pública de referencia: `revision/rendimiento-traducciones-81a904c`.
- HEAD público comprobado al abrir esta ejecución: `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`.
- Hostinger sirve `/home/u319776719/domains/ernestinhocarioca.com.br/public_html`.
- La raíz pública de Hostinger no tiene actualmente un repositorio Git enlazado. Los únicos despliegues Git configurados apuntan a `ec-translation-stage-20261102`, `fr` y `pt-en-preview-lote1`; por tanto, un PR o commit no cambia por sí solo la portada pública.
- `assets/js/translations/home.js` de Hostinger coincide exactamente con el mismo archivo del HEAD público, salvo el salto de línea final (FNV-1a `b39e36b3`, 18.251 caracteres). Esta comprobación evita basar el lote en una copia distinta de producción.
- Publicado significa únicamente visible y verificado en `https://www.ernestinhocarioca.com.br/`; una rama, un PR o una carpeta auxiliar no cuentan como publicación.

## Lote activo: Inicio PT-BR/EN seguro

Rama: `release/home-pt-en-safe-20261116`

Base: `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`

Commit remoto del contenido y registro previo: `6dec992d29866bcae279fb508df54307297fe398`

PR de revisión: [#42](https://github.com/lacasadelsushirg-pixel/ernestinho-v2/pull/42)

Objetivo del sublote: mejorar la redacción editorial completa de las 97 claves de Inicio en PT-BR y EN, sin cambiar español, HTML, fotografías, mapas, componentes, rutas, canonical, hreflang ni sitemap. Francés permanece privado con `noindex, nofollow` y fuera del sitemap hasta su QA completo.

| URL | ES | PT-BR | EN | FR | Estado de este sublote |
|---|---|---|---|---|---|
| https://www.ernestinhocarioca.com.br/ | Publicado, preservado | N/A | N/A | N/A | Sin cambios |
| https://www.ernestinhocarioca.com.br/pt/ | N/A | Publicado anterior; candidato editorial 97/97 en PR | N/A | N/A | No publicado todavía |
| https://www.ernestinhocarioca.com.br/en/ | N/A | N/A | Publicado anterior; candidato editorial 97/97 en PR | N/A | No publicado todavía |
| https://www.ernestinhocarioca.com.br/fr/ | N/A | N/A | N/A | Privado en Hostinger con `noindex, nofollow` | No contar como publicada/indexable |

### Verificaciones del candidato

- Sintaxis: `node --check assets/js/translations/home.js` y `node --check scripts/qa_locale_interactions.mjs`: PASS.
- Cobertura: ES 97 claves, PT 97/97, EN 97/97; cero valores vacíos.
- Fidelidad: objeto ES idéntico al de producción; cero coincidencias del detector básico de fragmentos españoles en PT/EN.
- Integridad: `git diff --check`: PASS.
- Build: detenido correctamente por `guard_approved_content.mjs`; no se desactivó ni se actualizó su baseline.
- Protección: el único recurso compartido protegido modificado es `assets/js/translations/home.js`. Se actualiza la aserción editorial correspondiente en `scripts/qa_locale_interactions.mjs`.
- Fotos/layout/HTML/SEO: no se modifican en este sublote.

## Ejecución Hostinger: QA privado de Inicio FR

Rama desplegada en la carpeta privada de Hostinger `fr`: `release/fr-public-initial-20261115`

HEAD remoto y desplegado: `0879dc353a57de1eef5301b4a65602cb324694d4`

URL comprobada: `https://www.ernestinhocarioca.com.br/fr/`

Estado real: visible para QA, pero privado para buscadores con `noindex, nofollow`; no se cuenta como página publicada/indexable ni se incorpora al sitemap.

### Cambios y comprobaciones de esta ejecución

- `b5017ca16d214dd056a1f95f840fb1639c36e7ed`: corrigió cuatro etiquetas de accesibilidad que seguían en español (`Expériences précédentes`, `Expériences suivantes`, `Expériences à la une` y `Rio en direct, Ernestinho à la télévision et événements`).
- `60a935b468332ac70b82fce70b1c6c1c15cdfc28`: añadió pasadas breves de localización después del renderizado asíncrono para evitar que las tarjetas dinámicas reaparezcan en español.
- `4547dda5e21a81cf6fb33696dbdcd4d85b2dee50`: asignó textos alternativos franceses a las 17 tarjetas de secciones y 7 tarjetas de experiencias, usando sus títulos editoriales ya localizados.
- `0879dc353a57de1eef5301b4a65602cb324694d4`: renovó la clave de caché de `fr-home.js` para que la mejora de accesibilidad llegue realmente al navegador.
- Despliegue Git de la rama a la carpeta `fr` de Hostinger: confirmado correctamente.
- Comprobación de archivo en Hostinger: las cuatro etiquetas francesas están presentes; las versiones españolas ya no aparecen; canonical `https://www.ernestinhocarioca.com.br/fr/`; `noindex, nofollow` y Googlebot noindex preservados.
- Comprobación HTTP/renderizado real: las 17 tarjetas dinámicas de Inicio, destacados, selector y botón del asistente se muestran en francés después de cargar la página.
- Sintaxis: `node --check fr-home.js`: PASS. Integridad: `git diff --check`: PASS.
- Fotografías, rutas `/FOTOS/HOME/`, layout, sitemap y la portada ES no se modificaron.
- QA HTTP posterior al despliegue: 17 tarjetas de secciones + 7 experiencias; `alt` vacíos = 0; canonical FR correcto; `robots` y `googlebot` continúan en `noindex, nofollow`; script servido con `?v=fr-public-20261116e`.
- Incidencia preexistente confirmada: cinco imágenes aprobadas referenciadas desde `/FOTOS/HOME/` no cargan porque esos archivos no están presentes en la carpeta de Hostinger (`ernestinho pagina home.png`, miniatura Búzios, clima, TV y eventos). No se sustituyeron, movieron ni subieron fotografías sin revisión.
- Publicaciones indexables nuevas de esta ejecución: **0**. Mejora visible en entorno privado de Hostinger: **1 página** (`/fr/`).

### Bloqueo exacto de publicación

El repositorio exige revisión humana independiente para `assets/js/translations/home.js`. El propietario autorizó las traducciones, pero la protección explícita no permite simular esa segunda revisión. El candidato debe recibir esa aprobación en su PR; después se integra a la rama pública y se publica mediante el flujo controlado hacia la raíz de Hostinger, con respaldo y comprobación HTTP posterior.

No utilizar el PR #41 como release de este sublote: además de Inicio modifica `site.js`, `locale-routing.js`, generador y sitemap, e intenta indexar FR. El candidato seguro actual separa PT/EN para producir el primer cambio visible sin abrir FR antes de QA.

## Siguiente paso exacto

1. Obtener una revisión humana independiente del PR pequeño de Inicio PT/EN.
2. Tras aprobación y checks, integrar en `revision/rendimiento-traducciones-81a904c`.
3. Publicar únicamente `assets/js/translations/home.js` en la raíz real de Hostinger con respaldo previo.
4. Verificar por HTTP `/pt/` y `/en/` a 390 px y 1440 px, contenido 97/97, imágenes, selector, canonical y hreflang.
5. Mantener `/fr/` privado y fuera del sitemap; recuperar desde la fuente aprobada las cinco fotografías faltantes de `/FOTOS/HOME/` antes de completar su QA a 390 px y considerar cualquier indexación.
6. Cuando Inicio esté completo y publicado en los idiomas autorizados, continuar con Guía de Río.

## Referencias concurrentes

- PR #24: rama amplia histórica; no usar como base de este release.
- PR #40: Elena PT/EN, fuera de prioridad mientras Inicio no esté publicado.
- PR #41: candidato amplio de Inicio/FR; no publicado y sin revisiones.
- Producción seguía en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346` al iniciar este registro.
- PR #42 seguía abierto, no borrador, fusionable y sin revisiones registradas. El último SHA remoto anterior a esta actualización documental era `92946f03268562f275dff32d77c95d7facdd7272`; la siguiente ejecución debe volver a leer el HEAD del PR, ya que el propio commit que guarda esta línea necesariamente será posterior.
