# Registro de correcciones — 10 de noviembre de 2026

| Bloque | Archivos principales | Commit | Verificación | Estado y pendiente |
|---|---|---|---|---|
| A · Recuperación histórica | `assets/js/translations/chunks/transportes-01.js`, inventario histórico | `6788b3eb` | Dos rótulos contrastados con `01473cc1`; piloto ES/PT/EN | Preparado en el PR 24 |
| A y B · Guías Búzios | `assets/js/buzios-guide-content.js` | `c39d05d` | 16 y 17 artículos por idioma, canonical, hreflang y capturas 1440/390 px | Preparado en el PR 24; revisión editorial por página |
| A y B · Fichas de Río | `scripts/legacy_locale_routes.mjs`, `assets/js/translations/chunks/rio-residual-compras-01.js` | `c39d05d` | HTML estático y vista con JavaScript en Feira Nocturna y Carretão; regresión posicional revisada; cero coincidencias largas con ES en las dos fichas corregidas | Preparado en el PR 24; revisar textos breves y alt del Carretão |
| B y D · Auditoría y módulos | `scripts/audit_locale_inventory.py`, `scripts/audit_multilingual.py`, `scripts/build_multilingual.mjs` | `c39d05d` | Compilación de referencia 3.612; incremental 702/3.612; prueba con módulo ausente; inventario y prueba estricta con alertas heredadas | Preparado en el PR 24. Pendientes localizaciones y comprobación del fallback Compare en Hostinger |
| C · Search Console y cobertura | `docs/seo/` | Este commit de informes | Rendimiento de septiembre a noviembre, 458 URL históricas comprobadas por HTTP y cruzadas con sitemap y rendimiento | Datos actuales de indexación pendientes de acceso a Search Console |
| E · Sitemap público | `scripts/build_sitemap.py`, `scripts/build_multilingual.mjs` | `9426c42` | Prueba aislada con HTML heredado real; Hostinger regeneró cero HTML; 3.588 URL verificadas en el sitemap y 3.612 documentos en el manifiesto público | Publicado en Hostinger. Revisar equivalencias y enlaces de las 24 URL históricas antes de decidir redirecciones |

La verificación de páginas congeladas sigue mostrando 246 diferencias anteriores al trabajo. Se comparó el resultado con el de la rama original y se verificó que el trabajo no toca sus rutas protegidas. El control de compilación vigente validó 586 archivos y 10 recursos críticos. El PR 23 permanece en borrador. El PR 24 incorpora su historial y parte del commit que se publicó para el sitemap.
