# Continuidad de cobertura y protección de playas de Búzios

Verificación independiente del 2 de noviembre de 2026 (hora de Brasil), base `92d0703f`.

Se recuperó la exportación real de 458 URL. Nueva petición pública por URL: 458 destinos finales HTTP 200; sin noindex ni canonical ausente. Las 412 descubiertas, 9 rastreadas y 2 duplicadas conservan canonical propia, cuatro hreflang y presencia en el sitemap. Las URL antiguas que redirigen se evalúan por su destino; no se pretende indexar sus alias. Sitemap público: 2.550 URL.

Search Console sigue mostrando corte del 22/10/2026: 2.064 indexadas y 458 excluidas. Validación iniciada para 404, descubiertas y rastreadas. La inspección histórica de Gruta do Fado elige la variante sin barra; hoy ambas variantes llegan a la URL con barra. Google aceptó solicitar indexación de esa URL en esta sesión. Estas pruebas no acreditan nueva indexación de las 458 URL.

## Problema de regeneración corregido

El código todavía trataba las 23 playas de Búzios como provisionales: omitía PT/EN, excluía las 69 URL del sitemap y quitaba prefijos de idioma a sus enlaces. Se retiraron esas excepciones. Se mantienen los filtros generales de noindex y alias. No se modificaron HTML fuente, imágenes, estilos ni contenido aprobado.

Validación: compilación selectiva de 23 rutas × 3 idiomas, 69 HTML; canonical propia, idioma y cuatro hreflang correctos en 69/69. No se desplegó el directorio parcial ni su sitemap: producción ya contiene las 69 páginas y el sitemap ampliado. Sintaxis JS y diff correctos.

El comprobador histórico frozen falla en 270 archivos ya diferentes en HEAD. Se comparó cada archivo protegido byte a byte contra HEAD: cero archivos protegidos modificados por esta tarea. No se regeneró su manifiesto ni se restauró contenido histórico sobre avances posteriores.
