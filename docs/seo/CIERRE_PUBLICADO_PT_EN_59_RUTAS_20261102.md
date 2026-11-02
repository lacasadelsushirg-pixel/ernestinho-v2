# Cierre de traducciones PT-BR / EN — verificación en producción (02/11/2026)

**ESTADO: PUBLICADO, VERIFICADO, SIN NECESIDAD DE REEMPLAZAR ARCHIVOS.**

## Trabajo verificado
- La revisión semántica de origen comprende **59 rutas**, con **118 URL** PT/EN; fuente: PR #14.
- Comparación entre HTML compilado y HTML actual de Hostinger: **114/118 archivos idénticos byte a byte**.
- Las **4 versiones diferentes** son PT y EN de `gastronomia/adega-perola` y `gastronomia/confeitaria-manon`. La diferencia proviene de **ampliaciones editoriales publicadas después**. No se sobrescribieron.
- Las 84 URL históricamente señaladas por español residual se comprobaron con petición HTTP: **84/84 OK**; después de ejecutar JavaScript en Chromium: **84/84 OK**.
- Auditoría completa del lote (59 rutas × 2 idiomas) en navegador real: **118/118 OK, cero fallos**.
- Comprobó HTTP, idioma, canonical, hreflang, presencia de contenido, títulos/descripciones, ausencia de marcadores españoles y conservación de ampliaciones en las cuatro URLs protegidas.
- Sitemap público: **2.481 URLs**, disponible; `robots.txt` HTTP 200.
- **NO se modificaron ni publicaron archivos de producción** en este cierre, porque la comparación comprobó que las correcciones ya estaban activas. No tocar `site.js`, Carioc-IA, sitemap ni los módulos compartidos.

## Evidencias
- PR de auditoría separado: https://github.com/lacasadelsushirg-pixel/ernestinho-v2/pull/20
- Preflight comparación 118 Hostinger vs código: https://github.com/lacasadelsushirg-pixel/ernestinho-v2/actions/runs/41546151435
- QA 84 HTML y navegador: https://github.com/lacasadelsushirg-pixel/ernestinho-v2/actions/runs/41546485759
- QA 118 URL en Chromium: https://github.com/lacasadelsushirg-pixel/ernestinho-v2/actions/runs/41546767754
- Archivo de auditoría `qa-live-118-translations.json` en el artifact de esta última ejecución.

## Sincronización futura
La rama de trabajo más reciente `tarifas/transporte-privado-20261102` desciende de `seo/cierre-traducciones-revision-20261102`:
comparación GitHub `base=seo/cierre-traducciones-revision-20261102,head=tarifas/transporte-privado-20261102`:
**ahead 154, behind 0** (consultado el 02/11/2026). Es decir, los cambios de origen de las traducciones ya forman parte de la rama actual junto a las actualizaciones posteriores.

**NO confundir este cierre lingüístico con indexación de Google:** Search Console requiere una comprobación independiente de cobertura y solicitud posterior de indexación, cuando corresponda.
