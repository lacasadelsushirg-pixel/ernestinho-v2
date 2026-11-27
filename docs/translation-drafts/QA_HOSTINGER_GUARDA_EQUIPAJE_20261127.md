# QA del piloto de traducción — 27-11-2026

## Fuente viva

Se leyó con la integración autorizada de Hostinger `/home/u319776719/domains/ernestinhocarioca.com.br/public_html/guia/guarda-equipaje/index.html`. El archivo medía 35.454 bytes en la API; el volcado normalizado con salto final tiene 35.455 bytes y SHA-256 `1be033d2c6e95f72bc7594ca3003fd6eb495686fe2afcd845720d610038af0d9`. La copia Git local mide 3.093 bytes (SHA-256 `04d6327d1628751f0cd0ae2dc2e76eb064bc8e0533147549f6f2684dcda47b03`), por lo que no se usó para reemplazar la fuente viva.

## Borradores candidatos

Ubicación exclusiva bajo `docs/translation-drafts/guarda-equipaje-20261127/`; no se añadieron páginas a rutas de producción.

- ES conserva el volcado vivo.
- PT-BR, EN y FR contienen 111 unidades inventariadas: respectivamente 14, 10 y 11 sin traducir. La memoria reutiliza 6 unidades revisadas/importadas por idioma; el resto de las salidas NMT permanece `machine_unreviewed`.
- Canonical y cuatro alternates por idioma verificados en el HTML candidato. PT/EN/FR conservan `noindex,nofollow`.
- Firmas de scripts de página (excluido JSON-LD), src/srcset de imágenes, acciones/métodos/IDs de formularios y anclas comparados con la fuente: PASS.
- Títulos/descripciones y campos correspondientes de Open Graph, Twitter y JSON-LD se localizaron en los candidatos de idioma. Las propuestas de texto aún necesitan revisión humana.
- El archivo ES candidato coincide exactamente con la fuente viva.

## QA pendiente / protección de publicación

No se completaron pruebas visuales a 390/1440 px ni interacción real del formulario y navegación, ni HTTP posterior a un despliegue. Las traducciones están incompletas. Por tanto, no publicar este lote, no alterar sitemap ni indexar PT-BR/EN/FR. El HEAD de producción permanece `d917494286c5b1ebab90f0c1a82ffda2007049b7`; en esta tanda se publicaron 0 páginas.

## Siguiente paso exacto

Completar y revisar las unidades faltantes y las salidas de modelo, probar visualmente y los flujos interactivos en staging/preview autorizado; después comparar la fuente Hostinger de nuevo antes de cualquier promoción. Mantener el guard de idioma/SEO activo.
