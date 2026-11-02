# Continuación SEO — lote amplio PT/EN (02-11-2026)

**Estado:** trabajo fuente en la rama `seo/traducciones-continuacion-lote2-20261102` y PR #13 (borrador) contra `seo/indexacion-20261102` del PR #12. **NO publicado en Hostinger, NO integrado y NO verificado con Google Search Console.**

## Resultados comprobados en código

- **172 claves de traducción exacta ES → PT y EN añadidas**: 55 en `assets/js/translations/chunks/rio-residual-compras-01.js` y 117 en `assets/js/translations/chunks/rio-residual-gastronomia-01.js`.
- Ambos diccionarios pasan parseo y todas las entradas tienen valores PT y EN no vacíos.
- **16 fichas de Río** auditadas contra los bloques visibles en HTML original (p, div, span, li y encabezados con más de 100 caracteres, sin contar JS dinámico): **161 de 161 bloques cubiertos** por diccionario bilingüe. Esto NO demuestra traducción completa de títulos breves, atributos, código dinámico, metadatos o las copias actualmente publicadas.
- **Madame Bardot, Búzios:** siete campos editoriales traducidos, más cinco párrafos del plan de visita y el título/estilo específico en PT/EN. Dos módulos JS comprobados sintácticamente, pero todavía pendientes de pruebas en navegador.
- Script nuevo, **solo lectura**, `scripts/audit_editorial_translations.mjs`; permite señalar rutas con `--routes=` y consultar resultados en JSON. El script fue comprobado sintácticamente y el análisis equivalente de 16 rutas se realizó por lectura de los archivos GitHub. No se ejecutó dentro de Node con un checkout local.

## Cobertura de bloques HTML largos auditada

| Ruta original | Bloques >100 caracteres | Traducción PT + EN |
|---|---:|---:|
| `/compras/feira-sao-cristovao/` | 1 | 1 |
| `/compras/mercadao-madureira/` | 20 | 20 |
| `/compras/uruguaiana/` | 20 | 20 |
| `/gastronomia/adega-perola/` | 9 | 9 |
| `/gastronomia/aipo-aipim-391/` | 9 | 9 |
| `/gastronomia/aipo-aipim-605/` | 9 | 9 |
| `/gastronomia/angu-do-gomes/` | 9 | 9 |
| `/gastronomia/assador/` | 9 | 9 |
| `/gastronomia/bar-da-gema/` | 10 | 10 |
| `/gastronomia/bafo-da-prainha/` | 9 | 9 |
| `/gastronomia/bar-luiz/` | 8 | 8 |
| `/gastronomia/confeitaria-colombo/` | 10 | 10 |
| `/gastronomia/rio-scenarium/` | 9 | 9 |
| `/gastronomia/cachambeer/` | 9 | 9 |
| `/gastronomia/carretao-siqueira/` | 10 | 10 |
| `/gastronomia/casa-do-sardo/` | 10 | 10 |
| **TOTAL** | **161** | **161** |

La página Feira de São Cristóvão incluye un diccionario propio dentro de HTML y un bloque de historia inyectado por JavaScript: ambos necesitan prueba visual y de idioma por separado. En varias fichas hay títulos cortos y textos dentro de elementos compuestos que este control no captura. El conteo de bloques y claves nuevas no equivale al número de variantes URL resueltas.

## Cómo revisar SIN dañar el sitio

1. Antes de fusionar, comprobar cambios recientes en la rama de producción y en el PR #12, preservando el trabajo simultáneo de Carioc-IA y otros componentes.
2. Ejecutar, en un checkout local, `node scripts/audit_editorial_translations.mjs --routes=/gastronomia/adega-perola/,/compras/uruguaiana/ --json` y ampliar a las 16 rutas.
3. Verificar en navegador ES/PT/EN con la carga real de `assets/js/site.js` y de `assets/js/buzios-restaurant-profile-view.js`, comparando textos al cargar y tras el idioma seleccionado. Registrar diferencias de HTML inicial y DOM final.
4. `scripts/build_multilingual.mjs` admite `--routes=` y `--update`, pero `--update` requiere un `dist/locale-manifest.json` anterior válido. **No ejecutar el build completo ni generar un sitemap basado en un subconjunto sin conservar el manifiesto existente.**
5. Seleccionar/publicar incrementalmente solo los HTML afectados y los JS que requieran sincronización; contrastar con Hostinger antes de sobreescribir. La API de Hostinger aquí solo expone lectura directa y URL de carga TUS que exige un cliente con conectividad, así que no se ha realizado publicación.
6. Verificar HTTP 200, canonical, hreflang, sitemap y que no se alteren fotos, links, estilo ni Carioc-IA. Después, actualizar el informe de las 84 variantes con la evidencia de cada URL real.
7. Seguir corrigiendo el resto de fichas gastronómicas del informe. **No marcar como corregidas las 82 variantes originales** hasta publicación y verificación reales.

## Protección aplicada

Ninguna modificación en contenido fuente español, HTML, estilos CSS, fotos, URL, sitemap, robots o Carioc-IA. Los cambios del PR #13 están limitados a dos diccionarios, dos módulos específicos de Madame Bardot, este documento y un nuevo script de auditoría.

**Conclusión:** avance editorial amplio y verificable a nivel de repositorio; la publicación, QA multilingüe real y recuperación de indexación permanecen pendientes.
