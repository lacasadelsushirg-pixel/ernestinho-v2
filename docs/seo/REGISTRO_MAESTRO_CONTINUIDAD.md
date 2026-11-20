# Registro maestro de continuidad

Actualización: 20-11-2026 · America/Sao_Paulo

## Estado de release

- Producción GitHub: `2dce60064291de24ee325a46beacde2f4749e452`.
- Reparación incremental de Inicio: PR #46, HEAD `a08077c73f205f8a6eb4dc45984a5fa4a8ef9098`, checks verdes, pendiente de revisión humana independiente.
- Hostinger: último build raíz fallido; queda prohibido relanzar cualquier modo `full` de 3.612 páginas.
- Rama/carpeta FR: `release/fr-public-initial-20261115` → `public_html/fr`.

## Página trabajada

| URL | ES | PT-BR | EN | FR | SEO FR | Publicación HTTP |
|---|---|---|---|---|---|---|
| `/fr/guia/guarda-equipaje/` | intacto | intacto | intacto | 12 bloques, 6 FAQ y flujo completo | `noindex,nofollow`, fuera del sitemap | pendiente; no publicada en esta ejecución |
| `/fr/hospedaje/805/` | intacto | intacto | intacto | ficha completa, 8 servicios, consulta WhatsApp FR y única foto aprobada conservada | `noindex,nofollow`, fuera del sitemap | pendiente; no publicada en esta ejecución |

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
- No se ejecutó `npm run build`, `hosting_deploy` ni se modificó la raíz de `public_html`.

## Bloqueos y siguiente paso exacto

1. Obtener capturas 390/1440 y revisión humana de Guarda equipaje y AP 805, incluido el tratamiento visual sin banners franceses y la galería de una sola foto aprobada.
2. Tras aprobación, avanzar la rama FR vinculada mediante fast-forward y sincronizar únicamente `directory=fr`.
3. Verificar por HTTP ambas rutas, contenido, imagen aprobada, canonical, noindex, navegación y WhatsApp.
4. No publicar `/fr/transportes/transporte-privado/` hasta confirmar tarifas posteriores al 31/10/2026, integrar formulario/WhatsApp FR y disponer de los dos banners FR aprobados.
