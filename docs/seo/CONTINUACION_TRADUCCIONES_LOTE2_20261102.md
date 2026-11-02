# SEO — Continuación de traducciones, lote amplio (2 de noviembre de 2026)

## Alcance y estado

**Rama:** `seo/traducciones-continuacion-lote2-20261102`, derivada de `seo/indexacion-20261102` (código del PR SEO #12).

**Estado:** modificaciones de código fuente confirmadas en GitHub. NO publicadas en Hostinger. NO se integró el PR #12, no se reconstruyó el sitio, no se subió un sitemap ni se solicitó indexación. No equiparar diccionarios corregidos con variantes de producción corregidas.

## Resultado detallado

- **55 claves nuevas ES → PT/EN en Compras**, en `assets/js/translations/chunks/rio-residual-compras-01.js`.
- **54 claves nuevas ES → PT/EN en Gastronomía Río**, en `assets/js/translations/chunks/rio-residual-gastronomia-01.js`.
- Total: **109 bloques de traducción exacta**, con ambos idiomas. La sintaxis de ambos objetos fue validada mediante parseo estructural; todos los registros tienen PT y EN no vacíos.
- **Madame Bardot (Búzios):** localización específica de 7 campos editoriales con `tr(es,pt,en)` sin afectar las demás fichas, título y estilo localizados, más los cinco párrafos del plan de visita en PT/EN. Se comprobó sintaxis JavaScript de ambos módulos mediante parseo en código.
- El área de Río original, imágenes, rutas, URL, canonical y hreflang fuente no fueron modificados.

### Páginas cuyos bloques editoriales largos extraídos del HTML fuente tienen traducción exacta en el diccionario

| Ficha | Bloques largos examinados | Cobertura en diccionario |
|---|---:|---:|
| Compras — Feira São Cristóvão | 1 | 1 |
| Compras — Mercadão Madureira | 20 | 20 |
| Compras — Uruguaiana | 20 | 20 |
| Gastronomía — Adega Pérola | 9 | 9 |
| Gastronomía — Aipo & Aipim 391 | 9 | 9 |
| Gastronomía — Aipo & Aipim 605 | 9 | 9 |
| Gastronomía — Angu do Gomes | 9 | 9 |
| Gastronomía — Assador | 9 | 9 |
| Gastronomía — Bar da Gema | 10 | 10 |

La cobertura mide bloques textuales largos extraídos mediante patrón de etiquetas HTML (más de 100 caracteres), no demuestra que todos los textos cortos, atributos, fragmentos JS o párrafos generados dinámicamente estén completos. La página Feira São Cristóvão contiene además un diccionario propio integrado en HTML, que necesita comprobación específica en navegador.

Los módulos de traducción están ya referenciados desde `assets/js/site.js`: Compras incluye `rio-residual-compras-01.js` y Gastronomía incluye `rio-residual-gastronomia-01.js`. El mecanismo de traducción busca claves exactas de texto y se debe validar en su ejecución real.

## Estado del PR SEO #12 y publicación

El trabajo de este lote parte de la rama fuente del PR #12, NO de la rama de publicación. Antes de mezclar:

1. Comparar la rama SEO con el estado actual de publicación; preservar cambios concurrentes, especialmente Carioc-IA.
2. Validar en navegador local las variantes PT/EN de estas nueve fichas y de Madame Bardot con el renderizador real y verificar idioma tanto en el HTML inicial como después de JavaScript.
3. Contrastar el contenido vigente en producción antes de cualquier carga; aplicar exclusivamente sustituciones exactas sobre los HTML publicados, sin regenerar masivamente páginas.
4. Publicar incrementos por ruta solo después de comprobar imágenes, enlaces, scripts, canonical, hreflang y sitemap.
5. Reevaluar el informe `revision-traducciones-84-20261102.json` después de la publicación y pruebas. **Las 82 variantes que Work dejó pendientes NO pueden descontarse por el simple hecho de incorporar traducciones fuente.**
6. Mantener el resto de gastronomía, otras secciones y las limitaciones de acceso a Google Search Console como trabajos pendientes separados.

## Restricciones cumplidas

- Ninguna operación de publicación en Hostinger ni despliegue Git.
- Ninguna modificación de HTML original ni del diseño Río, fotografías o rutas.
- Ninguna modificación de archivos Carioc-IA.
- No se ejecutó un build masivo del sitio, ni se tocaron sitemap, robots o canonical.
- El resultado es un avance en fuente, **no una afirmación de indexación ni de corrección pública**.
