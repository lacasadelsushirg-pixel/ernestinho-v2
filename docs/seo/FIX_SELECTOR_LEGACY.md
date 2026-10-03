# Control antiguo junto al selector moderno

Base: 871bf3ad. Corrección exclusiva de `ensureTools()` en site.js: algunos headers tienen un botón ES sin id ni atributo; el selector global solo reconocía #lang/data-lang-toggle y dejaba ese botón como hermano del grupo moderno. Se retiran únicamente botones directos del contenedor tools cuyo texto es ES/PT/PT-BR/EN, preservando el grupo y todos sus controles. También limpia HTML previamente prerenderizado.

Sin cambios de HTML editorial, CSS, imágenes, tamaños, colores, navegación o lógica del selector moderno. Búsqueda específica de botones sin marcar en fuentes: Experiencias; solución compartida para cualquier ruta que presente el patrón.

QA afectado: 84 comprobaciones de 14 rutas × ES/PT/EN × desktop/móvil, cero fallos; selector equivalente disponible y sin botón antiguo. 18 combinaciones de nueve hubs desktop/móvil y 54 navegaciones reales ES→PT→EN→ES, cero fallos; conservan ruta/query/hash. Sintaxis site.js y auditor MJS: PASS. No auditoría general ni diferencias históricas. Un commit y preview, sin producción.
