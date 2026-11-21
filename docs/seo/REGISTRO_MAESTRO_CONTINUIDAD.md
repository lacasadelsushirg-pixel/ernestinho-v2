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
| `/fr/hospedaje/54/` | intacto | intacto | intacto | texto completo, 8 servicios, WhatsApp FR y galería interactiva de 21 fotos Hostinger aprobadas | `noindex,nofollow`, fuera del sitemap | pendiente; no publicada en esta ejecución |
| `/fr/hospedaje/702/` | intacto | intacto | intacto | ficha completa, 8 servicios, WhatsApp FR y galería interactiva de 8 fotos Hostinger aprobadas | `noindex,nofollow`, fuera del sitemap | pendiente; no publicada en esta ejecución |
| `/fr/hospedaje/217/` | intacto | intacto | intacto | ficha completa, 8 servicios, WhatsApp FR y galería interactiva de 17 fotos Hostinger aprobadas | `noindex,nofollow`, fuera del sitemap | pendiente; no publicada en esta ejecución |
| `/fr/hospedaje/1221/` | intacto | intacto | intacto | ficha completa, 8 servicios, WhatsApp FR y galería interactiva de 25 fotos Hostinger aprobadas | `noindex,nofollow`, fuera del sitemap | pendiente; no publicada en esta ejecución |
| `/fr/hospedaje/1015/` | intacto | intacto | intacto | ficha completa, 10 servicios, WhatsApp FR y galería interactiva de 17 fotos Hostinger aprobadas | `noindex,nofollow`, fuera del sitemap | pendiente; no publicada en esta ejecución |
| `/fr/hospedaje/621/` | intacto | intacto | intacto | ficha completa, 8 servicios, WhatsApp FR y galería interactiva de 16 fotos Hostinger aprobadas | `noindex,nofollow`, fuera del sitemap | pendiente; no publicada en esta ejecución |

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
- Escritura concurrente detectada y preservada: AP 54 existía en el HEAD remoto con texto/SEO/WhatsApp FR y una foto. Se concilió con las 21 rutas Hostinger del inventario vigente y ahora incluye carrusel, controles, contador y alt franceses sin modificar imágenes.
- QA estático AP 54: 21/21 fotos presentes, francés completo, `lang=fr`, noindex, canonical, hreflang, JSON-LD, navegación y WhatsApp específico confirmados.
- AP 702 se preparó desde el HTML ES vigente: capacidad para 4, una habitación, dos camas, baño, ubicación a unos 100 m de la playa y 8 servicios localizados íntegramente.
- QA estático AP 702: 8/8 fotografías Hostinger, carrusel/contador/alt FR, texto sin residuos españoles, noindex, canonical, hreflang, JSON-LD, navegación y WhatsApp confirmados.
- AP 217 se preparó desde el HTML ES vigente: capacidad para 2, una habitación, una cama, baño y 8 servicios localizados íntegramente.
- QA estático AP 217: 17/17 fotografías Hostinger, carrusel/contador/alt FR, francés completo, noindex, canonical, hreflang, JSON-LD, navegación y WhatsApp confirmados.
- AP 1221 conserva las 25 fotografías Hostinger del inventario vigente, capacidad para 4, dos camas, vista al Cristo, cocina y lavadora; QA estático de francés, galería, SEO, navegación y WhatsApp aprobado.
- AP 1015 conserva las 17 fotografías Hostinger, capacidad para 4, formato estudio y sus 10 servicios; QA estático de francés, galería, SEO, navegación y WhatsApp aprobado.
- AP 621 conserva las 16 fotografías Hostinger, capacidad para 2 y sus 8 servicios; QA estático de francés, galería, SEO, navegación y WhatsApp aprobado.
- No se ejecutó `npm run build`, `hosting_deploy` ni se modificó la raíz de `public_html`.

## Bloqueos y siguiente paso exacto

1. Obtener capturas 390/1440 y revisión humana de Guarda equipaje y las nueve fichas privadas de Hospedaje (805, 605, 1008, 54, 702, 217, 1221, 1015 y 621), incluidos carruseles, botones, contadores y fotografías.
2. Tras aprobación, avanzar la rama FR vinculada mediante fast-forward y sincronizar únicamente `directory=fr`.
3. Verificar por HTTP las tres rutas, contenido, imágenes aprobadas, canonical, noindex, navegación, carrusel y WhatsApp.
4. Continuar Hospedaje con Casa Goia, siguiente ficha libre en el orden de navegación, conservando íntegramente su galería Hostinger.
5. No publicar `/fr/transportes/transporte-privado/` hasta confirmar tarifas posteriores al 31/10/2026, integrar formulario/WhatsApp FR y disponer de los dos banners FR aprobados.
6. No fusionar ni sincronizar PR #48 hasta completar QA visual 390/1440 y revisión humana; páginas públicas nuevas de esta ejecución: **0**.

## Checkpoint durable — cierre de sublote 20-11-2026

- PR #48, HEAD remoto previo a este registro: `4e3e4a1476f0cb4ef37f6b6b2872468547bac27f`.
- Nuevas correcciones de esta ejecución: AP 54 pasó de 1 a 21 fotos aprobadas; nuevas fichas completas AP 702 (8 fotos) y AP 217 (17 fotos).
- Producción verificada: `2dce60064291de24ee325a46beacde2f4749e452`.
- PR #46 continúa abierto, mergeable y sin revisiones; no se fusionó ni desplegó.
- HTTP público de las rutas nuevas no pudo verificarse y no hubo sincronización Hostinger. Publicaciones nuevas: **0**.
- Reanudación exacta: AP 1221 desde el HTML ES vigente y su inventario Hostinger; mantener FR privado/noindex.

## Checkpoint durable — sublote Hospedaje 20-11-2026 (continuación)

- Nuevas fichas privadas completas: AP 1221 (25 fotos), AP 1015 (17 fotos) y AP 621 (16 fotos).
- Cada ruta tiene francés editorial completo, canonical y hreflang ES/PT-BR/EN/FR, JSON-LD `fr`, navegación interna FR, WhatsApp específico, carrusel local y `noindex,nofollow`; ninguna fue añadida al sitemap.
- `fr-home.js` reconoce cada ruta solamente después de existir su HTML real.
- No se ejecutó build, no se tocó `public_html`, no hubo despliegue ni verificación HTTP pública. Publicaciones nuevas: **0**.
- Punto remoto antes de guardar este registro: `72b2b555598f8e61a7234b3ce05008f0bdc9c8f1`.
- Reanudación exacta: Casa Goia; después Casa Venti y Casa Ñata. Mantener FR privado/noindex hasta QA visual y revisión humana.
