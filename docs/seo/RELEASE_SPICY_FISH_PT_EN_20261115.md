# Spicy Fish — recuperación PT-BR/EN y QA (15/11/2026)

## Estado

- Ruta: `/gastronomia/spicy-fish/`.
- Producción Hostinger: `revision/rendimiento-traducciones-81a904c` en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; no se publicó este lote.
- PR de candidato: [#36](https://github.com/lacasadelsushirg-pixel/ernestinho-v2/pull/36), rama `release/cervantes-pt-en-20261115`, commit de código `ed946011f04c68bef110c8db0f4eab484b20a246`, privado y no fusionado.
- ES queda como la fuente vigente. PT-BR y EN se recuperaron en render local selectivo. FR no se generó ni se anuncia en canonical/hreflang/sitemap. Resultado de ficha completa de cuatro idiomas: **no cuenta**.

## Traducción y procedencia

La página actual en producción (blob `6c49d747f9a7a5712a8a4cb7927462bcf44c378d`) se comparó con los diccionarios posicionales históricos en `42d03024d2c3765b0d96eb5f9763657d731baf4a` y `8570793a992b262c5fb384a396ec949e6105775c`. Ambos commits contienen 19 pares. La correspondencia se revisó contra el texto ES vigente; el par histórico índice 18 se excluyó porque su contenido ya no existe en el español actual. Los textos agregados posteriormente recibieron suplementos PT-BR/EN editoriales manuales. El sexto `alt` fue corregido sin alterar la imagen.

El generador aplica la compatibilidad posicional a esta ficha de forma explícita; no cambia la lógica de Don Camillo/Bar do Omar. Se conservaron estructura, datos, fotos, mapas, navegación, anchors y widgets.

## QA ejecutado

- Build incremental selectivo completó 9 de 3.612 documentos (ES/PT/EN de Don Camillo, Bar do Omar y Spicy Fish). No fue una reconstrucción completa.
- Sitemap candidato: 3.588 URLs; comparación exacta con snapshot Hostinger: mismo conjunto, 0 nuevas y 0 removidas. Manifest: 3.612 documentos, 1.196 por idioma indexable.
- Spicy Fish ES/PT/EN: título, descripción, idioma, H1/H2, secciones, textos, alts, enlaces, tablas, mapas, estructura, canonical/hreflang inspeccionados. Un H1, 12 H2, 24 párrafos visibles en `main`, seis imágenes con mismas URLs que la fuente, cuatro enlaces, dos mapas y nueve saltos/énfasis estructurales. Párrafos PT/EN no son copia exacta del ES. No hay alternates FR.
- Search Console/OpenSEO, proyecto `7172f2fb-7456-4b35-b581-d9b11c0040f4`, propiedad principal, 2026-08-12 a 2026-11-12: 428 impresiones ES, 92 PT, 67 EN; 3 clics totales. Inspecciones 3/3 enviadas e indexadas, robots permitido, fetch exitoso y canonical Google igual al declarado. Breadcrumb PASS con un item sin nombre; usabilidad móvil `VERDICT_UNSPECIFIED`. No hay exclusión/error confirmado.
- Capturas de revisión antes/después a 1440 y 390 px: [escritorio](captures/spicy-fish-pt-en-20261115/desktop-review.jpg) y [móvil](captures/spicy-fish-pt-en-20261115/mobile-review.jpg); la carpeta también conserva QA JSON. La visualización local falla al descargar los recursos fotográficos desde `mediumturquoise-stinkbug-270478.hostingersite.com` con `net::ERR_EMPTY_RESPONSE`; ocurre antes y después. No se verificó un 404 HTTP. Por ello no se aprueba QA visual y no se propone publicación hasta comprobar el origen de medios.

## Controles

- `node --check scripts/build_multilingual.mjs`: PASS.
- `node --check assets/js/translations/spicy-fish-release.js`: PASS.
- `git diff --check`: PASS.
- `guard_approved_content.mjs`: PASS; 586 HTML/10 assets, reporta 247 alertas de drift histórico.
- `check_frozen_pages.py`: falla con 247 cambios protegidos, igual que en el árbol base; no se regeneró ningún manifiesto.
- `audit_multilingual.py`: falla en base/candidato por `KeyError: 'lang'` (esquema actual usa `language`).
- `audit_translations.mjs`: falla en base/candidato por `Invalid dictionary: buzios-approved-blocks.js`.
- `audit_static.py`: la huella de salida base y candidata coincide (`96bdbe5d…`); 279 avisos/errors globales preexistentes. No se identificó regresión nueva de Spicy.

## Bloqueos y continuación

Esta página es un candidato PT/EN privado, no una página publicada ni una ficha de cuatro idiomas. El bloqueo de QA es concreto: falta confirmar por qué el host externo de fotos responde `ERR_EMPTY_RESPONSE`; no se cambiaron las URLs ni imágenes. Se requiere QA visual independiente después de que esas imágenes sean accesibles. La revisión humana independiente del repositorio también es obligatoria antes de cualquier publicación; no sustituye el QA pendiente.

El siguiente elemento por impresiones es `/gastronomia/dumare/` (648 impresiones ES/PT/EN en el periodo consultado), luego Amendoeira (310, invalidar estado “Validado” hasta cotejo semántico) y Dumaré Copa (60). El sitemap, canonical y hreflang FR deben permanecer sin cambios mientras una ficha no pase todos los controles.
