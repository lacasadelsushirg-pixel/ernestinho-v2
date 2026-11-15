# Recuperación PT-BR/EN de Cervantes Copacabana — 15/11/2026

## Estado de publicación

**No publicado.** Hostinger conserva como producción el commit `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. No se desplegó ni se cambió ningún archivo del alojamiento. El candidato se prepara desde ese HEAD en `release/cervantes-pt-en-20261115`; requiere revisión humana independiente antes de integrar.

La inspección directa de la ruta PT publicada confirmó que título, introducción y controles de idioma ya están en portugués, mientras que el cuerpo editorial extenso sigue en español. Se vio el mismo cuerpo mezclado en EN. El piloto privado remoto `audit/continuidad-50-cervantes` (`213c9af40a3508870302eeff2d24777131df08e6`) ya contiene la traducción francesa y varias claves PT/EN; esa ficha figuraba como 11/50 probadas y aún no aptas para publicación. Reutilizamos esos antecedentes, sin contar Cervantes como una ficha nueva de la tanda. El CSV maestro se tomó de ese último inventario remoto y se actualizó únicamente en la fila Cervantes; el resto de las 1.203 filas conserva sus estados previos y requiere recuento antes de considerarse actual. La fuente del CSV queda explícita para evitar presentarlo como una auditoría global nueva.

El avance local indicado `332a700d` no está en los objetos/ref remotos consultados ni en este checkout; no se le atribuye trabajo. El PR #24 seguía abierto en borrador, con cabeza `586a0e3457c41071ada753bbf4d1c08484600d25` sobre base antigua `9426c42fc0150bdce5fbfee060396da9de518ac7`, 50 archivos, sin revisión independiente y con Vercel pendiente. No se añadieron cambios a esa rama desvinculada.

## Alcance del candidato

- El generador carga un diccionario manual PT/EN específico de Cervantes y lo aplica al HTML renderizado, no solo al selector cliente. El alcance incremental de ese diccionario es únicamente `/gastronomia/cervantes-copacabana/` y sus tres variantes ES/PT/EN.
- Se conservan HTML fuente, fotos/URLs, mapa, enlaces, widgets, estructura y estilos. No se añade FR al sitemap ni a `hreflang`; la vista FR continúa privada y `noindex`.
- Los textos nuevos se basan en el contenido ES vigente. Las claves PT/EN preexistentes se cotejaron con el piloto remoto; las ampliaciones de contenido mantienen la cautela editorial sobre horarios y operación, sin asegurar que la sucursal esté abierta.

## Validación ejecutada

- Generador selectivo: 3 documentos HTML renderizados de 3.612; el manifiesto de la fuente reporta 1.204 documentos, 1.196 URL indexables por idioma y 3.588 URL ES/PT/EN. No se reconstruyó el conjunto completo.
- Fixture aislado de sitemap: 3 URL de esta ruta (ES/PT/EN), con `canonical` autorreferente y alternates recíprocos `es`, `pt-BR`, `en` y `x-default`. Es un fixture de ruta, **no** el sitemap actual de producción.
- El contenido PT/EN contiene las traducciones del cuerpo y no filtra los párrafos ES cotejados. Los ocho recursos fotográficos visibles tienen los mismos `src` que ES; el `iframe` de mapa, Google Maps, Waze e Instagram permanecen. El enlace de WhatsApp conserva su destino y presenta el mensaje localizado que ya define el renderizador.
- Se capturaron vistas locales 1440 px y 390 px para ES/PT/EN en `docs/seo/captures/cervantes-20261115/`. No hay desbordamiento horizontal; H1 y `lang` fueron comprobados. La carga de imágenes externas no quedó confirmada desde este entorno: aparecen placeholders, y en la vista publicada de escritorio también se observó el hero sin imagen. Se preservó el estado existente y no se cambiaron medios.
- `node scripts/guard_approved_content.mjs`: PASS; 586 HTML protegidos intactos y 10 assets críticos fijados. Advierte 247 divergencias del manifiesto histórico.
- `python3 scripts/check_frozen_pages.py`: falla en producción y candidato con salida idéntica (SHA-256 `e5573a8feb30aeeefa0f4912a4f0e72f4d38e02d9e0b9d40b8977344b72e0815`), enumerando 247 divergencias heredadas. No se ocultó ni se regeneró ninguna aprobación.
- `python3 scripts/audit_multilingual.py` sobre un manifiesto de prueba normalizado para estas tres variantes: 3/3 auditadas, 0 errores; incluye canonical, alternates recíprocos y enlaces locales del fixture. `scripts/build_sitemap.py` produjo y verificó 3 URL en la prueba de alcance. La producción continúa con 3.588 URL; la fixture no reemplaza ese sitemap.
- El auditor global `node scripts/audit_translations.mjs` aborta antes de recorrer el sitio con `Invalid dictionary: buzios-approved-blocks.js`, archivo existente no modificado en producción ni en este candidato. `scripts/audit_translation_content.py` no existe en el HEAD de producción. No se reporta una auditoría integral de contenido como aprobada.
- Capturas antes/después generadas para ES/PT/EN a 1440 y 390 px y entregadas como evidencia de esta ejecución. La inspección visual no está aprobada aún: el host externo de medios no cargó las fotos en las capturas locales, y el selector duplicado también se ve en la página publicada. La estructura del candidato conserva las imágenes y no cambia el layout.

## Revisión pendiente y continuidad

El cambio está preparado para una revisión independiente del PR. No es un despliegue y no se cuentan páginas nuevas como publicadas. Antes de permitir integración/publicación, la persona revisora debe confirmar que el fallo congelado es únicamente el drift heredado, que el hero y fotos existentes son aceptables, y que el CI y la prueba real en Hostinger pasan. FR seguirá `noindex` y fuera del sitemap hasta el QA completo de esa ficha.

Continuación de la tanda documentada en `docs/seo/TANDA50_CONTINUIDAD_2026-11-14.md`: permanecer en 11/50 fichas probadas en vistas privadas; siguientes fichas libres identificadas: Lasai y Chez Claude. No contar como cerrada ninguna que no tenga los cuatro idiomas, controles SEO y capturas completos; publicaciones nuevas en esta ejecución: 0.
