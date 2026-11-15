# Duodécimo lote de Gastronomía

| Ficha | Trabajo y estado |
|---|---|
| Nido Ristorante | Recuperación PT/EN, alineación de los párrafos y traducción de consejos y galería. Francés completo en el piloto. Validación local superada. |
| Corrientes 348 Barra | Recuperación PT/EN, traducción de consejos, fotos y mapa. Se conserva la distinción de la unidad de Barra frente a Marina da Glória. Francés completo. Validación local superada. |
| Praia Skol Copacabana | Recuperación PT/EN, localización de consejos, fotos y mapa y francés completo. Mantiene validación editorial pendiente por discrepancias de horarios y contacto en el original. |

El commit de código es `56e56f414925ee6e6cbf01a08867c64cad0a249b`. Se conservaron las traducciones históricas válidas y se completaron los textos añadidos después. Los datos comerciales y horarios reproducen las fichas de origen y requieren confirmación de vigencia antes de utilizarlos.

Praia Skol conserva en el cuerpo una advertencia para confirmar el horario y el contacto (21) 99095-5015. La ficha práctica indica 24 horas según Riotur y el teléfono (21) 2148-5756. Se mantuvieron las dos referencias de la fuente aprobada y se registró la discrepancia. El generador conserva ES En revisión y PT-BR/EN/FR Corregido o traducido. Los pendientes de Brota, Faenza y Rotisseria continúan visibles.

## Pruebas

Las 43 rutas del piloto pasaron el auditor de estructura, contenido, metadatos, enlaces editoriales e aislamiento de francés y las pruebas de navegación PT-BR → FR → EN a 1440 y 390 px. Se tomaron y revisaron capturas antes y después de las tres fichas en PT/EN en ambos tamaños. Las solicitudes a terceros se bloquearon para la prueba visual. Las URL originales de medios se comprobaron por separado.

La simulación incremental regeneró 123 de 3612 documentos desde la fixture local del lote anterior. Cambiaron exactamente nueve HTML de las tres fichas. El sitemap de 3588 URL quedó idéntico byte por byte. Se conservaron el texto ES, fotos, mapas, enlaces editoriales, canonical y hreflang. Esta simulación no constituye un rastreo actualizado de Hostinger.

El control de publicación validó 586 archivos y 10 recursos críticos. El verificador histórico produjo las mismas 246 diferencias de la base. La auditoría de contenido pasó de 302 a 296 versiones con tres o más bloques largos idénticos al español. El inventario gastronómico conserva 256 alertas textuales En revisión y ocho filas PT/EN de cuatro fichas Corregido o traducido con revisión editorial pendiente.

## Continuidad

Preparado en el PR 24. FR sigue privado y no indexable. El asistente francés sigue pendiente. El piloto contiene 43 rutas, de las cuales 39 están validadas localmente y cuatro mantienen pendientes editoriales. Los CSV conservan los commits de validación de los lotes anteriores.

Las siguientes prioridades son Jojo, Don Camillo y Bar do Omar, seguidos por las rutas restantes ordenadas por impresiones en el inventario vigente. Verificar nombres y HEAD antes de editar. Debe continuarse también con los cuatro pendientes editoriales, manteniéndolos visibles hasta contar con evidencia que permita resolverlos.

[Inventario maestro](INVENTARIO_MAESTRO_CUATRO_IDIOMAS.csv) · [Cobertura](COBERTURA_CUATRO_IDIOMAS.md) · [Alertas](REVISION_GASTRONOMIA_CUATRO_IDIOMAS.csv)
