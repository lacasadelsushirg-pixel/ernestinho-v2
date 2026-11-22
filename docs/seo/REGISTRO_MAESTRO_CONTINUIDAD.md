# Registro maestro de continuidad

Actualización: 20-11-2026 · America/Sao_Paulo

## Estado de release

- Producción GitHub: `2dce60064291de24ee325a46beacde2f4749e452`.
- Reparación incremental de Inicio: PR #46, HEAD `a08077c73f205f8a6eb4dc45984a5fa4a8ef9098`, checks verdes, pendiente de revisión humana independiente.
- Verificación 20-11-2026: producción continúa exactamente en `2dce60064291de24ee325a46beacde2f4749e452`; PR #46 continúa abierto, mergeable y sin ninguna revisión registrada. Los dos workflows propios del repositorio (`Protect approved content` y `Petrópolis preview QA`) concluyeron correctamente.
- Hostinger: último build raíz fallido; queda prohibido relanzar cualquier modo `full` de 3.612 páginas.
- Rama/carpeta FR: `release/fr-public-initial-20261115` → `public_html/fr`.
- PR FR #48: base `release/fr-public-initial-20261115` en `5b1636da327bf3e7a9688108cfebff2a87772418`; rama `release/fr-public-continuation-20261120`, punto remoto previo a este registro `707afb9822fb278ac469f763a0bdf609a9d46871`; abierto, mergeable, borrador y sin revisión.

## Página trabajada

| URL | ES | PT-BR | EN | FR | SEO FR | Publicación HTTP |
|---|---|---|---|---|---|---|
| `/fr/guia/guarda-equipaje/` | intacto | intacto | intacto | 12 bloques, 6 FAQ y flujo completo | `noindex,nofollow`, fuera del sitemap | pendiente; no publicada en esta ejecución |
| `/fr/hospedaje/805/` | intacto | intacto | intacto | ficha completa, 8 servicios, consulta WhatsApp FR y única foto aprobada conservada | `noindex,nofollow`, fuera del sitemap | pendiente; no publicada en esta ejecución |
| `/fr/hospedaje/605/` | intacto | intacto | intacto | ficha completa, 8 servicios, WhatsApp FR y galería interactiva de 24 fotos aprobadas | `noindex,nofollow`, fuera del sitemap | pendiente; no publicada en esta ejecución |
| `/fr/hospedaje/1008/` | intacto | intacto | intacto | ficha completa, 8 servicios, WhatsApp FR y galería interactiva de 15 fotos aprobadas | `noindex,nofollow`, fuera del sitemap | pendiente; no publicada en esta ejecución |
| `/fr/hospedaje/54/` | intacto | intacto | intacto | texto completo y 1 foto mostrada; inventario Hostinger de 21 fotos aún pendiente de conciliación/QA | `noindex,nofollow`, fuera del sitemap | pendiente; no publicada; no contar como ficha validada completa |

## Pruebas y decisiones

- Traducción editorial procedente del PR #25, cotejada contra la página ES actual y su contenido dinámico.
- Canonical FR y alternates ES/PT-BR/EN/FR presentes.
- Enlace y disclosure Bounce conservados en francés.
- No se mostraron banners ES/PT/EN dentro de la página FR porque no existe material FR aprobado.
- Hostinger confirmó que la ruta no existía antes del trabajo.
- AP 805 se generó desde el HTML ES vigente sin editar el original: capacidad, distribución, dirección, servicios y CTA se conservaron y se localizaron íntegramente al francés.
- La única fotografía que la fuente vigente asigna a AP 805 se conserva exactamente en hero y galería; no se añadió, sustituyó ni movió ninguna imagen.
- AP 805 no carga los renderizadores trilingües `site.js`/`hospedaje.js`, evitando que sobrescriban el francés; usa el enrutador FR y fue añadido a `readyRoutes` solamente después de existir su HTML real.
- QA estático AP 805: `lang=fr`, robots, canonical, hreflang ES/PT-BR/EN/FR, JSON-LD `inLanguage=fr`, enlace WhatsApp francés y ausencia de fragmentos españoles confirmados.
- AP 605 conserva sus 24 fotografías Hostinger aprobadas y añade un carrusel local con controles/contador/alt franceses, sin depender del renderizador trilingüe.
- QA estático AP 605: texto visible íntegro en francés, capacidad/distribución/8 servicios, `lang=fr`, noindex, canonical, hreflang, JSON-LD, navegación y WhatsApp específicos confirmados.
- `fr-home.js` ahora conserva mensajes WhatsApp ya redactados en francés y solo aplica el mensaje genérico cuando el enlace aún no está localizado.
- AP 1008 conserva sus 15 fotografías Hostinger aprobadas y su información vigente para 6 personas, dos habitaciones y ubicación a 50 m de la playa.
- QA estático AP 1008: francés completo, carrusel/contador/alt FR, canonical, hreflang, JSON-LD, noindex, navegación y WhatsApp específico confirmados.
- Escritura concurrente detectada y preservada: AP 54 existe en el HEAD remoto y `fr-home.js` reconoce su ruta. Su texto/SEO/WhatsApp están localizados, pero la página muestra solo una foto mientras el inventario vigente enumera 21; requiere conciliación de galería y QA antes de contarla como completa.
- No se ejecutó `npm run build`, `hosting_deploy` ni se modificó la raíz de `public_html`.

## Bloqueos y siguiente paso exacto

1. Obtener capturas 390/1440 y revisión humana de Guarda equipaje, AP 805, AP 605 y AP 1008, incluidos carruseles, botones, contadores y fotografías.
2. Tras aprobación, avanzar la rama FR vinculada mediante fast-forward y sincronizar únicamente `directory=fr`.
3. Verificar por HTTP las tres rutas, contenido, imágenes aprobadas, canonical, noindex, navegación, carrusel y WhatsApp.
4. Conciliar AP 54 con sus 21 fotos Hostinger aprobadas, sin sustituir rutas, y validar carrusel/390/1440 antes de contar la ficha como completa.
5. No publicar `/fr/transportes/transporte-privado/` hasta confirmar tarifas posteriores al 31/10/2026, integrar formulario/WhatsApp FR y disponer de los dos banners FR aprobados.
6. No fusionar ni sincronizar PR #48 hasta completar QA visual 390/1440 y revisión humana; páginas públicas nuevas de esta ejecución: **0**.

## Checkpoint operativo — 2026-11-21 — Hostinger FR y revisión independiente

Esta comprobación posterior corrige los estados HTTP pendientes anotados arriba; no implica que las rutas sean indexables.

- HEAD de producción GitHub comprobado por API: `2dce60064291de24ee325a46beacde2f4749e452`.
- Hostinger confirma `release/fr-public-initial-20261115` enlazada únicamente al directorio `/fr`. El inventario actual de ese directorio contiene 145 archivos `index.html`: Guía 21, Transportes 12, Gastronomía 100, Hospedaje 11 e Inicio 1. HEAD enlazado observado desde PR #62: `34b89a2943f97920a3b759bc0b960d0393b79c0b`.
- HTTP Hostinger: `/fr/guia/guarda-equipaje/` 200; `/fr/hospedaje/805/` 200; `/fr/hospedaje/goia/` 200; `/fr/experiencias/` 404; `/fr/transportes/transporte-privado/` 404.
- Las tres primeras rutas responden con `noindex,nofollow`, canonical francés propio y alternates ES/PT-BR/EN/FR/x-default. Nuevas URL indexables publicadas en esta sesión: **0**.
- QA visual de escritorio de AP 805: la página carga y el contenido está en francés. El HTML conserva un texto WhatsApp específico para alojamiento, pero `fr-home.js` lo reemplaza visualmente por «j’aimerais découvrir Rio avec vous». Se preparó la corrección mínima de un solo archivo en PR #62 (head `ebfc786647c4abbad54a0a05d0069a59fd50f523`): conservar cualquier texto de WhatsApp francés que empiece por «Bonjour» y dejar el genérico como fallback. No se modifican rutas, fotos, HTML de ES, CSS, canonical, hreflang, sitemap ni noindex.
- PR #62: abierto y fusionable, 1 commit/1 archivo, 0 revisiones humanas. No integrar ni desplegar hasta revisión independiente y QA responsive 390/1440.
- PR #46: abierto para el cambio incremental de 6 páginas; 0 revisiones humanas registradas. PR #48: abierto, en borrador, no fusionable, 107 commits/32 archivos y 0 revisiones; no sincronizar en bloque.
- Builds y despliegues de Hostinger realizados en esta sesión: ninguno. Rutas FR nuevas creadas: **0**.

### Próximo paso seguro

1. Obtener revisión independiente de una persona distinta del autor para PR #62 y terminar QA responsive 390/1440.
2. Solo con aprobación real y checks verdes, integrar el cambio unitario en `release/fr-public-initial-20261115`; el vínculo de Hostinger debe actualizar únicamente `/fr`.
3. Verificar después por HTTP el enlace WhatsApp renderizado de AP 805 y conservar canonical/hreflang/noindex. No ejecutar build del sitio raíz.
4. Mantener PR #48 sin despliegue y PR #46 sin fusión hasta sus propias aprobaciones humanas y gates.
