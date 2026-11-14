# Octavo lote de Gastronomía

| Ficha | Recuperación y corrección |
|---|---|
| Spicy Fish | Arranque PT/EN de los renderizadores históricos, alineación de párrafos y de las nueve filas prácticas, y traducción de consejos, fotos y mapa. |
| Bar da Amendoeira | Recuperación del cuerpo PT/EN y corrección del diccionario mixto. Se incorporaron los horarios y el contacto presentes en el español aprobado y se localizaron reservas, acceso, transporte y consejos. |
| Quiosque Dumaré | Arranque PT/EN y separación de los consejos nuevos y notas posteriores del diccionario posicional. Se localizaron fotos, mapa y consejos. |

Las tres fichas tienen francés editorial íntegro en el piloto privado. El commit de código es `847ca420c527fdde74629188915ae3ad70e8f5b5`. Se conservaron los párrafos históricos válidos de PT/EN y se completaron los textos que el diccionario no cubría o dejaba en español. Los datos comerciales y horarios reproducen las fichas de origen. Su vigencia sigue pendiente de confirmación directa.

## Pruebas

Las 31 rutas del piloto pasaron la auditoría ES/PT-BR/EN/FR, incluidos estructura, contenido, enlaces externos editoriales, metadatos y aislamiento de FR. Pasaron las pruebas de navegación PT-BR → FR → EN a 1440 y 390 px. Se tomaron y revisaron capturas antes y después de las tres fichas en los dos tamaños. Las solicitudes a terceros se bloquearon en la prueba visual y las URL de medios se comprobaron por separado.

La simulación incremental regeneró 87 de 3612 documentos a partir de una fixture local. Se conservaron las rutas y el sitemap de 3588 URL byte por byte. Cambiaron los nueve HTML de las fichas del lote y tres HTML de Feira Nocturna de Copacabana que provenían de una base antigua de la fixture. Para aislar esa diferencia se recompiló Feira con el commit padre 372d886e y se verificó que sus tres resultados eran idénticos byte por byte a los del candidato. Son diferencias de la fixture previa a este lote.

Se cotejaron el contenido ES y las URL de fotos, mapas, enlaces editoriales, canonical y hreflang de las nueve páginas del lote. El control de publicación validó 586 archivos y 10 recursos críticos. El control histórico produjo el mismo informe de 246 diferencias que la base.

El inventario de Gastronomía pasa de 286 a 280 alertas pendientes. La auditoría de contenido de la fixture pasó de 328 a 320 versiones con tres o más bloques largos idénticos al español. Seis corresponden a este lote y dos al contenido de Feira ya corregido en el padre. Esta comparación utiliza la fixture local y no constituye un rastreo nuevo de Hostinger.

## Estado

Preparado en el PR 24. FR continúa privado y no indexable. La integración del asistente en francés sigue pendiente. Los CSV de cobertura mantienen los commits de validación anteriores. Las siguientes prioridades por impresiones son Brota, Noa Ipanema y Bar do Mineiro, sujetas al HEAD remoto y al inventario vigente.

[Inventario maestro](INVENTARIO_MAESTRO_CUATRO_IDIOMAS.csv) · [Cobertura](COBERTURA_CUATRO_IDIOMAS.md) · [Alertas](REVISION_GASTRONOMIA_CUATRO_IDIOMAS.csv)
