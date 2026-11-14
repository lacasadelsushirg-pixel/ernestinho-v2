# Gastronomía en cuatro idiomas · quinto lote

| Ficha | Corrección verificada |
|---|---|
| Boa Praça Ipanema | Recuperación de PT-BR y EN, traducción de los consejos añadidos y de las etiquetas y pies de foto. El rango de gasto queda atribuido a referencias públicas. |
| Babbo Osteria | Recuperación de PT-BR y EN, traducción de los consejos de reserva, descorche y planificación, y de los pies de foto y mapa. |
| BB Lanches | Recuperación de PT-BR y EN, con la distinción entre atención presencial y delivery. Se localizaron las recomendaciones y los textos de las fotografías. |
| Bar Madrid | Recuperación de PT-BR y EN, y traducción de los consejos sobre platos, porciones y traslado a Tijuca. |
| Clássico Beach Club Urca | Se completó la versión abreviada histórica de PT-BR y EN con la discrepancia horaria, el acceso, los servicios, la reserva y el itinerario detallados en ES. |
| Kilograma Centro | Recuperación de PT-BR y EN, traducción de los consejos del buffet y conservación de la nota que pide confirmar la ubicación. |

Se cotejaron los diccionarios históricos incorporados en `25a23588` con las fichas actuales y se escribieron las seis traducciones francesas completas. Los detalles comerciales se mantuvieron según las fuentes citadas en las fichas. Su vigencia sigue pendiente de confirmación directa.

El commit `eefb194182fd9858294e1c0f14d697bce0513dbd` actualiza los diccionarios de Gastronomía, el arranque de los renderizadores históricos por idioma y el generador y la prueba de la vista previa francesa.

- La compilación incremental regeneró **60 de 3.612 documentos**. Cambiaron **18 HTML**, las seis fichas en ES, PT-BR y EN. Se conservaron el texto ES, enlaces editoriales, fotos, mapas, canonical y hreflang. El sitemap de **3.588 URL** quedó idéntico byte por byte.
- Las 18 versiones cambiadas pasaron el auditor técnico. El control de publicación validó 586 archivos y 10 recursos críticos, y el informe histórico de 246 diferencias permaneció idéntico.
- Las **22 rutas** del piloto pasaron la auditoría de paridad en cuatro idiomas y la prueba de navegación PT-BR → FR → EN a **1440 y 390 px**. Se tomaron capturas de referencia de Boa Praça, BB Lanches y Clássico en los dos tamaños, con recursos externos bloqueados y URL de medios cotejadas por separado.
- El inventario de Gastronomía pasa de **310 a 298 alertas pendientes**. La auditoría global pasa de 350 a 338 versiones con tres o más bloques largos idénticos al español.

El lote queda preparado en el PR 24. FR se genera en la vista previa privada con `noindex` y queda pendiente la integración del asistente en ese idioma.

[Inventario maestro](INVENTARIO_MAESTRO_CUATRO_IDIOMAS.csv) · [Cobertura](COBERTURA_CUATRO_IDIOMAS.md) · [Alertas de Gastronomía](REVISION_GASTRONOMIA_CUATRO_IDIOMAS.csv)
