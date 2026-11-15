# Gastronomía en cuatro idiomas · sexto lote

| Ficha | Corrección verificada |
|---|---|
| Quartinho | Recuperación de PT-BR y EN. Se tradujeron los consejos nocturnos, las referencias de la renovación de 2026 y los textos de las fotos y el mapa. |
| Deck Buffet | Se completó el diccionario abreviado PT-BR y EN, con el formato de cobro, los servicios, las indicaciones de acceso y la distinción entre horarios confirmados y los que deben verificarse. |
| Pavão Azul | Recuperación de PT-BR y EN, traducción de los consejos sobre petiscos y planificación, y revisión de galería y enlaces. |

Las tres fichas tienen versiones francesas completas. El commit `c1195a3530d8fc360bd503fc599b3e6269706327` actualiza los diccionarios, la inicialización de los renderizadores históricos y el piloto francés. Se cotejaron los diccionarios incorporados en `25a23588` y las ampliaciones posteriores. Los datos comerciales corresponden a las fichas originales y requieren confirmación directa si se van a utilizar.

- La compilación incremental regeneró **69 de 3.612 documentos** y cambió **9 HTML**. Se comprobaron el texto ES, las URL de fotos y mapas, los enlaces editoriales, canonical y hreflang. El sitemap de **3.588 URL** quedó idéntico.
- Las nueve versiones cambiadas pasaron el auditor técnico. El control de publicación validó 586 archivos y 10 recursos críticos. Las 246 diferencias históricas permanecieron idénticas.
- Las **25 rutas** del piloto pasaron la auditoría en cuatro idiomas y la prueba de navegación PT-BR → FR → EN a **1440 y 390 px**. Las capturas comparativas se hicieron con solicitudes a terceros bloqueadas.
- El inventario de Gastronomía pasa de **298 a 292 alertas pendientes**. La auditoría global pasa de 338 a 332 versiones con tres o más bloques largos idénticos al español.

El lote queda preparado en el PR 24. El francés sigue en la vista previa privada con `noindex`. La integración del asistente en francés sigue pendiente.

[Inventario maestro](INVENTARIO_MAESTRO_CUATRO_IDIOMAS.csv) · [Cobertura](COBERTURA_CUATRO_IDIOMAS.md) · [Alertas de Gastronomía](REVISION_GASTRONOMIA_CUATRO_IDIOMAS.csv)
