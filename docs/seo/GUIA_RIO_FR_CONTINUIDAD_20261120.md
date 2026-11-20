# Continuidad — Guía de Río FR privada

Fecha: 20-11-2026 (America/Sao_Paulo)

## Base y aislamiento

- Rama: `work/guia-rio-pt-en-20261120`
- Base comprobada: producción `2dce60064291de24ee325a46beacde2f4749e452`.
- El candidato de despliegue incremental de Inicio continúa separado en PR #46; esta rama no debe activar Hostinger ni mezclarse con ese release antes de su revisión humana.
- El guard general de páginas congeladas ya reporta 247 diferencias históricas presentes en la base de producción. No se regeneraron aprobaciones y esta rama no modifica ninguna de esas rutas.

## Sublote 1

| Ruta | ES | PT-BR | EN | FR | Indexación FR | Sitemap FR | Estado real |
|---|---|---|---|---|---|---|---|
| `/guia/accesibilidad/` | conservado | histórico conservado | histórico conservado | 13/13 bloques editoriales, 2 fotos, enlaces y metadatos | `noindex,nofollow` | ausente | preparado para revisión; no publicado |

## Verificaciones ejecutadas

- Delta Git: solo `fr/guia/accesibilidad/index.html` y este registro.
- Cobertura estructural FR: 13 artículos de 13, dos imágenes aprobadas conservadas, navegación, selector ES/PT/EN/FR, canonical FR y hreflang completo.
- Protección SEO: robots y Googlebot en `noindex,nofollow`; ninguna entrada FR añadida al sitemap.
- El render Playwright a 1440/390 no pudo iniciarse en este contenedor: Chromium abortó antes de abrir página por `socket() failed: Operation not permitted`. No se considera QA visual aprobada y la ruta no se cuenta como validada ni publicable.
- `python scripts/check_frozen_pages.py` mantiene el mismo conjunto histórico de diferencias de la base; no se aceptó ni regeneró el baseline.

## Siguiente paso exacto

1. Ejecutar render real de `/fr/guia/accesibilidad/` a 1440 y 390 px en CI con Chromium habilitado; aprobar capturas y comprobar fotografías.
2. Corregir cualquier incidencia visual sin alterar ES, PT-BR, EN, fotos, mapas o componentes.
3. Mantener FR privada hasta superar QA de contenido/SEO/visual.
4. Continuar las rutas FR faltantes en este orden: `alquiler-auto`, `cpf`, `documentos`, `donde-alojarse`, `guarda-equipaje`, `mes-a-mes`, `moverse`, `pix`, `seguro`, `terminales`.
5. Tras la fusión del PR #46, incorporar este punto al `docs/seo/REGISTRO_MAESTRO_CONTINUIDAD.md` sin duplicar ni pisar el registro de release.
