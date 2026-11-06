# Revisión de traducciones e indexación — 2 de noviembre de 2026

Se revisaron las 84 variantes del listado de 412 URL que habían superado el umbral de coincidencia textual con español. Distribución: 78 de gastronomía de Río (45 PT y 33 EN), cinco de Compras (dos PT y tres EN) y una de gastronomía de Búzios (EN, Madame Bardot).

La comparación por bloques largos encontró 448 textos distintos coincidentes con la versión española, con 645 apariciones. Este recuento es una señal de revisión, no un criterio de Google ni una prueba automática de que cada coincidencia necesite traducción: direcciones, nombres propios y denominaciones locales pueden coincidir correctamente. La lectura de las fichas confirma párrafos editoriales enteros en español en versiones PT/EN. Los diccionarios existentes no contienen claves exactas para casi todos esos bloques; no corresponde sustituirlos mediante coincidencias aproximadas con textos diferentes.

## Primer lote corregido y publicado

Se priorizaron Nino Cucina Ipanema y Temperarte Bolívar porque son las dos fichas del grupo con impresiones registradas en el informe de octubre (25 y 17, respectivamente, en PT). La consulta histórica de rendimiento no demuestra su estado actual de indexación.

Se añadieron 45 pares de traducción PT/EN a `assets/js/translations/chunks/rio-residual-gastronomia-01.js`, sin reescribir el texto español aprobado. Incluyen narrativa, consejos, información práctica, pies de foto y rótulos pendientes. Algunas claves ya tenían una alternativa aplicada en producción; el parche solo reemplazó los nodos que aún coincidían exactamente con el español.

Publicación incremental en Hostinger: un diccionario y cuatro HTML, con 70 nodos de texto corregidos (17 por variante de Nino y 18 por variante de Temperarte). Las páginas españolas no se sobrescribieron.

| Ficha | PT | EN |
|---|---|---|
| Nino Cucina Ipanema | /pt/gastronomia/nino-cucina-ipanema/ | /en/gastronomia/nino-cucina-ipanema/ |
| Temperarte Bolívar | /pt/gastronomia/temperarte-bolivar/ | /en/gastronomia/temperarte-bolivar/ |

## Conservación y verificación

- Se ejecutó una compilación local limitada explícitamente a dos rutas, seis HTML. Aunque el compilador denomina `full` a este modo sin manifiesto incremental local, registró seis páginas generadas; no se reconstruyó el sitio completo.
- Esa compilación se utilizó para comprobar traducciones. No se publicó su HTML completo: la comparación mostró diferencias ajenas al texto, por lo que se aplicaron sustituciones exactas sobre copias del HTML vigente.
- Se comprobó que el diccionario publicado coincidía con la base de la rama antes de reemplazarlo, para preservar cambios concurrentes.
- Las listas y el orden de imágenes, mapas, enlaces, scripts, hojas de estilo, canonical y alternates se conservaron exactamente en los cuatro HTML publicados. No se modificaron Carioc-IA, sus módulos ni su entrenamiento.
- Las seis URL ES/PT/EN devolvieron HTTP 200, canonical propio, alternates es/pt-BR/en/x-default correctos y ausencia de noindex. Las cuatro páginas traducidas coincidieron byte a byte con los parches publicados y no conservaron párrafos principales largos idénticos al español.
- El sitemap público no cambió y contiene las seis URL. No se publicó sitemap ni manifiesto parcial.
- Verificación visible en navegador: contenido PT de Nino y EN de Temperarte correcto tras cargar los módulos; títulos, idioma y encabezados localizados.
- `node --check` y `git diff --check` sin errores. El comprobador histórico de páginas congeladas sigue señalando las mismas 246 discrepancias de la base; este lote no modifica ningún HTML fuente protegido ni regenera el manifiesto. Restaurar esas páginas históricas eliminaría avances anteriores, por lo que no se realizó esa restauración.

## Pendiente

Se corrigieron cuatro variantes de dos fichas; dos variantes pertenecen al grupo de 84 y otras dos se corrigieron como sus equivalentes de idioma. Quedan 82 variantes señaladas de ese grupo pendientes de corrección editorial. El archivo `revision-traducciones-84-20261102.json` conserva su clasificación, ejemplo de bloque coincidente y prioridad para lotes siguientes. Compras y Madame Bardot quedan en la siguiente prioridad; en Búzios también se confirmó texto español generado por el renderizador de perfiles, que requiere incorporar traducciones en su flujo específico.

Los cambios fuente permanecen en la rama SEO y el PR 12. Deben integrarse mediante una publicación controlada que conserve el trabajo concurrente de Carioc-IA; no se activó una sincronización masiva de public_html.

Siguen vigentes las limitaciones de la auditoría anterior: el Excel contiene únicamente las 412 descubiertas sin indexar; faltan los listados completos de los otros motivos de exclusión y no hubo acceso a estadísticas de rastreo ni inspección individual de Search Console. La correlación con despliegues de octubre no prueba causalidad.

En Search Console: inspeccionar las seis URL y su HTML renderizado, comprobar la versión canónica elegida y solicitar indexación solo para las páginas útiles que proceda. Revisar después su evolución de rastreo, cobertura e impresiones. No se ha solicitado indexación mediante una herramienta ni se afirma que Google haya incorporado estas páginas al índice.
