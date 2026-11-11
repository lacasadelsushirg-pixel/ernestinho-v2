# Séptimo lote de Gastronomía y recuperación del entorno

K08, Delírio Tropical Rio Sul y Fogo de Chão Botafogo tienen recuperación de PT-BR y EN y traducción francesa en el commit 6b39c3668be49e3dbc71f4ceae0438af5c2f8f69. Se conservaron los diccionarios históricos válidos, se tradujeron las ampliaciones y se recuperó el enlace oficial de Fogo de Chão que el diccionario sustituía por #.

## Verificación repetida

El entorno restaurado conservaba un checkout antiguo con objetos alternativos ausentes. Se creó un clon independiente desde el HEAD remoto del PR 24 y se comprobó su ascendencia de recuperación. Se reconstruyeron localmente las 28 rutas del piloto en ES, PT-BR y EN, 84 documentos en total. La vista previa francesa pasó el auditor de paridad y las pruebas de navegación PT-BR → FR → EN a 1440 y 390 px.

Para la vista previa se utilizaron los 84 documentos recién generados y, fuera del piloto, los documentos de la base local de sitemap ya disponible. Este conjunto es una fixture de validación y no constituye un despliegue ni una compilación nueva de toda producción. El sitemap se conservó entre la fixture y la vista previa. La simulación incremental anterior registrada en el PR regeneró 78 documentos y cambió 9 HTML. Ese resultado histórico queda separado de las pruebas repetidas de esta ejecución.

Se reforzó scripts/audit_fr_preview.py para comparar el conjunto de enlaces externos editoriales del contenido principal con ES en cada idioma. Los enlaces de WhatsApp se excluyen porque su mensaje se localiza. La prueba de regresión sustituyó temporalmente el enlace oficial de Fogo de Chão en PT por # y comprobó que el auditor lo rechazaba. Se restauró después la fixture y se repitió la auditoría correcta.

## Inventarios y pendientes

Se actualizaron los CSV del inventario maestro, las alertas de Gastronomía y la cobertura, conservando las referencias a los commits de los lotes anteriores. El inventario recoge 1204 rutas originales y 28 rutas de piloto validadas, 112 combinaciones de ruta e idioma. Las alertas pendientes de Gastronomía pasan de 292 a 286. Las incidencias históricas en las filas siguen siendo evidencia del diagnóstico inicial, mientras el estado y el recuento actual reflejan la validación.

El verificador histórico conserva las mismas 246 diferencias que la base. El control de publicación valida los 586 archivos y 10 recursos críticos. No se alteraron esos manifiestos.

FR permanece privado y no indexable. La integración del asistente en francés sigue pendiente. El lote está preparado en el PR 24. La siguiente prioridad editorial es Spicy Fish, Amendoeira y Dumaré. Se requiere seguir cotejando sus diccionarios históricos y traducir FR antes de validar esas rutas. La vigencia de los datos comerciales requiere confirmación cuando se revise editorialmente cada ficha.
