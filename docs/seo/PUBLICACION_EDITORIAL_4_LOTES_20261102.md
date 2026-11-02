# PUBLICACIÓN VERIFICADA — ERNESTINHO CARIOCA — 2 NOV 2026

**Estado:** PUBLICADO EN HOSTINGER, verificado, no solo código.
**Hora:** 2026-11-02 22:34 UTC aprox. (19:34 BRT).
**Workflow verificable:** https://github.com/lacasadelsushirg-pixel/ernestinho-v2/actions/runs/41537961510
**PR fuente acumulado:** https://github.com/lacasadelsushirg-pixel/ernestinho-v2/pull/18

## Resultado
- 37 rutas actualizadas, 3 idiomas cada una; total **111 páginas HTML**.
- 7 recursos de apoyo CSS/JS por ficha; **118 archivos escritos y comprobados**.
- **113 ficheros existentes respaldados** antes de sobrescribir y **5 recursos nuevos**.
- **0 errores en las 118 comprobaciones HTTP posteriores a publicación** (ver `release-manifest.json` del artifact).
- Se conservaron **sitemap.xml**, **robots.txt**, **index.html principal** y **assets/js/site.js** (navegación/Carioc-IA). **No hubo reconstrucción de todo el sitio**.
- Archivo de backup y manifest en el artifact `hostinger-backup-and-editorial-111-html-release-evidence` del run.
- Se eliminaron archivos cifrados temporales de autorización tras confirmar publicación; no se almacenan credenciales de Hostinger en el repositorio.

## Rutas publicadas (cada una ES/PT/EN)
- `/hospedaje/`
- `/compras/feira-saens-pena/`
- `/compras/mercados-populares/`
- `/consejos/atardeceres-inolvidables/`
- `/experiencias/bioparque/`
- `/experiencias/vidigal/`
- `/destinos/buzios/`
- `/destinos/buzios/playas/`
- `/cultura/nossa-senhora-paz/`
- `/cultura/bonsucesso/`
- `/cultura/capuchinhos/`
- `/cultura/conceicao-boa-morte/`
- `/cultura/copacabana/`
- `/cultura/nossa-senhora-brasil/`
- `/cultura/nossa-senhora-penna/`
- `/cultura/nossa-senhora-saude/`
- `/cultura/santa-margarida/`
- `/cultura/santa-rita/`
- `/cultura/sao-francisco-paula/`
- `/cultura/sao-jose-lagoa/`
- `/cultura/sao-judas/`
- `/gastronomia/merci/`
- `/gastronomia/plage-cafe/`
- `/vida-nocturna/boa-praca-leblon/`
- `/vida-nocturna/portela/`
- `/vida-nocturna/yoo2/`
- `/vida-nocturna/quadra-salgueiro/`
- `/vida-nocturna/canastra-bar/`
- `/vida-nocturna/galeria-cafe/`
- `/gastronomia/delirio-centro/`
- `/gastronomia/fiorino/`
- `/gastronomia/confeitaria-manon/`
- `/gastronomia/curto-cafe/`
- `/gastronomia/casa-cave/`
- `/gastronomia/galeto-liceu/`
- `/gastronomia/adega-perola/`
- `/gastronomia/cafe-lamas/`

## Recursos incluidos
- `assets/css/hospedaje.css`
- `assets/css/editorial-lote1.css`
- `assets/js/hospedaje.js`
- `assets/js/translations/editorial-lote1.js`
- `assets/js/translations/iglesias-lote2.js`
- `assets/js/translations/editorial-lote3.js`
- `assets/js/translations/gastronomia-lote4.js`

## Reglas para los siguientes trabajos
1. No volver a ejecutar `npm run build` de todas las ~2.5k URLs en Hostinger; generación **por rutas**.
2. No reemplazar `public_html` íntegro ni importar un archive como sitio nuevo.
3. Los PR #14/#15/#16/#17/#18 son una cadena de ramas: no tomar la versión antigua de `main` como fuente de verdad para estas 111 URL hasta su integración controlada.
4. Al hacer cambios sobre una ficha, contrastar con producción primero para no revertir traducciones o historial.
5. Publicar cambios solo por reemplazo selectivo con backup previo y verificación HTTP y navegador.
6. La publicación de contenido no equivale a indexación de Google. El sitemap principal no se ha tocado.
