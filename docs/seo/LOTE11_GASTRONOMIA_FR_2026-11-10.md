# Undécimo lote de Gastronomía

| Ficha | Trabajo y estado |
|---|---|
| Casa da Feijoada | Recuperación PT/EN, ampliación de los párrafos abreviados sobre el ritual y los consejos, y traducción de etiquetas y fotos. Francés completo en el piloto. Validación local superada. |
| OCYÁ Leblon | Recuperación PT/EN, separación de los consejos posteriores del diccionario posicional y localización de precios, contacto, accesibilidad, fotos y mapa. Francés completo en el piloto. Validación local superada. |
| Rotisseria Sírio Libaneza | Recuperación PT/EN, alineación de los párrafos y traducción de consejos añadidos, fotos y mapa. Francés completo. Mantiene revisión editorial del original por repetición de consejos genéricos. |

El commit de código es `b087f93ca432c2aef730860d704446dafc6f408d`. Se conservaron los diccionarios históricos válidos y se completaron las ampliaciones posteriores. Los datos comerciales y horarios proceden de las fichas de origen y requieren confirmación de vigencia antes de utilizarlos.

En Rotisseria, la fuente repite recomendaciones sobre visitar en horario de movimiento, pedir una esfiha recién salida y seguir el paseo. Su párrafo de historia menciona genéricamente la relación con Catete y el restaurante vecino. Se tradujo el original íntegro y se registró la necesidad de más información específica, sin reescribir la fuente aprobada. El generador mantiene ES En revisión y PT-BR/EN/FR Corregido o traducido. Los pendientes anteriores de Brota y Faenza siguen visibles.

## Pruebas

Las 40 rutas del piloto pasaron el auditor de estructura, contenido, metadatos, enlaces editoriales e aislamiento de francés y las pruebas de navegación PT-BR → FR → EN a 1440 y 390 px. Se tomaron y revisaron capturas antes y después de las tres fichas en PT/EN en los dos tamaños. Las solicitudes a terceros se bloquearon durante la prueba visual. Las URL originales de medios se cotejaron por separado.

La simulación incremental regeneró 114 de 3612 documentos desde la fixture local del lote anterior. Cambiaron exactamente nueve HTML de las tres fichas. El sitemap de 3588 URL quedó idéntico byte por byte. Se conservaron el texto ES y las URL de fotos, mapas, enlaces editoriales, canonical y hreflang. Esta simulación no sustituye un rastreo actualizado de Hostinger.

El control de publicación validó 586 archivos y 10 recursos críticos. El verificador histórico conservó las 246 diferencias de la base. La auditoría de contenido pasó de 308 a 302 versiones con tres o más bloques largos idénticos al español. El inventario gastronómico conserva 262 alertas textuales En revisión y seis filas PT/EN de Brota, Faenza y Rotisseria Corregido o traducido con validación editorial pendiente.

## Continuidad

Preparado en el PR 24. FR permanece privado y no indexable. El asistente francés sigue pendiente. El piloto contiene 40 rutas, con 37 validadas localmente y tres pendientes editoriales. Los CSV conservan los commits de validación de los lotes anteriores.

Las siguientes prioridades del inventario son Nido Ristorante, Corrientes 348 y Praia Skol Copacabana, sujetas al HEAD remoto y a los nombres de ruta vigentes. Debe continuar también la resolución de los pendientes editoriales, manteniéndolos visibles hasta contar con evidencia.

[Inventario maestro](INVENTARIO_MAESTRO_CUATRO_IDIOMAS.csv) · [Cobertura](COBERTURA_CUATRO_IDIOMAS.md) · [Alertas](REVISION_GASTRONOMIA_CUATRO_IDIOMAS.csv)
