# Décimo lote de Gastronomía

| Ficha | Trabajo y estado |
|---|---|
| Nino Cucina Ipanema | Recuperación del arranque PT/EN, ampliación de los textos históricos abreviados y localización de consejos, fotos y mapa. Francés completo en el piloto. Validación local superada. |
| Koral | Recuperación PT/EN, traducción de etiquetas, pies de foto y mapa y corrección de la etiqueta de contacto inglesa. Francés completo en el piloto. Validación local superada. |
| Faenza Copacabana | Recuperación PT/EN y francés completo. Se conserva como pendiente editorial la contradicción entre el cuerpo que cita actividad reciente y la nota que deja abierto un cierre o cambio de nombre. |

El commit de código es `d9c2858392abf1fe1f574e1fe51631056832eae7`. Se conservaron los diccionarios históricos válidos y se completaron las ampliaciones posteriores. Horarios, precios y datos comerciales reproducen las fichas de origen. Su vigencia sigue pendiente de confirmación directa. En Faenza, una traducción fiel conserva la contradicción del original y el inventario evita marcar la ficha como Validado hasta resolverla. ES queda En revisión y PT-BR/EN/FR Corregido o traducido. El pendiente anterior de Brota permanece visible.

## Verificación

Las 37 rutas del piloto pasaron la auditoría de estructura, contenido, metadatos, enlaces editoriales e aislamiento del francés, y las pruebas de navegación PT-BR → FR → EN a 1440 y 390 px. Se tomaron y revisaron capturas de las tres fichas en PT/EN antes y después, en los dos tamaños. Las solicitudes a terceros se bloquearon durante la prueba visual. Las URL de fotos y mapas se cotejaron por separado.

La simulación incremental regeneró 105 de 3612 documentos a partir de la fixture local del lote anterior y cambió exactamente nueve HTML de estas fichas. Se conservaron texto ES, medios, enlaces editoriales, canonical y hreflang. El sitemap de 3588 URL quedó idéntico byte por byte. La fixture local no sustituye un rastreo actualizado de Hostinger.

El control de publicación validó 586 archivos y 10 recursos críticos. El verificador histórico conservó las 246 diferencias de la base. La auditoría de contenido pasó de 314 a 308 versiones con tres o más bloques largos idénticos al español. El inventario de Gastronomía recoge 268 alertas textuales En revisión y cuatro filas PT/EN de Brota y Faenza Corregido o traducido con validación editorial pendiente.

## Estado y continuidad

Preparado en el PR 24. FR sigue privado y no indexable. La integración del asistente francés continúa pendiente. La cobertura del piloto contiene 37 rutas, de las cuales 35 están validadas localmente y dos mantienen pendientes editoriales. Se conservaron los commits de validación de los lotes anteriores en los CSV.

Las siguientes prioridades del inventario son Rotisseria Sírio-Libanesa, Casa da Feijoada y Ocyá Leblon, sujetas a comprobar el HEAD remoto. La continuación debe atender también los pendientes editoriales de Brota y Faenza y conservarlos visibles mientras no haya evidencia que los resuelva.

[Inventario maestro](INVENTARIO_MAESTRO_CUATRO_IDIOMAS.csv) · [Cobertura](COBERTURA_CUATRO_IDIOMAS.md) · [Alertas](REVISION_GASTRONOMIA_CUATRO_IDIOMAS.csv)
