# Gastronomía en cuatro idiomas · cuarto lote

| Ficha | Corrección verificada |
|---|---|
| Proa Cozinha Bar | Recuperación de la prosa PT-BR y EN. El resumen práctico y los consejos nuevos quedan en su posición, y se restablece el orden de las nueve filas de información práctica. Se localizaron los pies de foto, el mapa y las referencias editoriales. |
| Elena Horto | Recuperación de la prosa PT-BR y EN. Se tradujeron los consejos añadidos sobre la mesa, el regreso y el entorno, y se incorporaron a las indicaciones las referencias actuales a Google Maps, Waze y el punto de partida. |
| Sud, o Pássaro Verde | Recuperación de la prosa y del orden de las nueve filas de información práctica en PT-BR y EN. Se tradujeron los consejos nuevos, los textos de foto y mapa y la discrepancia entre las fuentes sobre el estado del local. |

Las tres fichas tienen versión francesa completa en el piloto privado. Se cotejaron los diccionarios PT-BR y EN incorporados al HTML en el commit `25a23588` del 25 de septiembre con el contenido aprobado actual. El generador ya tenía esas traducciones en el código fuente. La inicialización fija en español y los párrafos añadidos después impedían aplicar correctamente el diccionario posicional. Horarios, precios y estado comercial proceden de las fichas de origen. Su vigencia sigue pendiente de verificación.

El commit `90485f55d4ecc894c0e557431b4f55d606fcd0f7` modifica los diccionarios `piloto-rio.json`, `rio-pilot-labels.mjs` y `rio-restaurantes-piloto.mjs`, la selección de párrafos en `legacy_locale_routes.mjs` y las rutas de generación y prueba del piloto. El ajuste común también corrige el marcado de las etiquetas en negrita de Polvo Marisqueria, que aparecían anidadas, y conserva su texto.

## Validación local

- El piloto suma **16 rutas y 64 combinaciones de ruta e idioma**. Pasó el auditor de paridad y las pruebas de navegación PT-BR → FR → EN en **1440 y 390 px**. Se tomaron capturas antes y después en ambos tamaños. En las capturas se bloquearon las solicitudes a terceros y se cotejaron por separado las URL originales de fotos y mapas.
- La compilación incremental regeneró **42 de 3.612 documentos** y modificó **12 HTML**. Son las tres fichas del lote y Polvo Marisqueria en ES, PT-BR y EN. Las doce versiones pasaron el auditor técnico. Se verificaron las URL canónicas, hreflang, enlaces editoriales, fotos y mapas, el texto original español y la estructura de las fichas prácticas.
- El sitemap de **3.588 URL** quedó idéntico byte por byte y la salida de producción conserva las **1.196 URL indexables por idioma**. El control de publicación validó 586 archivos y 10 recursos críticos. El verificador histórico conserva el mismo informe de 246 diferencias previas al lote.
- La auditoría global de traducciones pasó de **356 a 350** versiones con tres o más bloques largos idénticos al español. Quedan **310 alertas de Gastronomía** por clasificar o corregir. El inventario maestro contiene **1.204 rutas de origen**.

El lote queda preparado en el PR 24. Hostinger sigue sirviendo las tres lenguas de producción y el francés se genera en una vista previa local con `noindex`. Sigue pendiente integrar el asistente en francés. Las próximas fichas según la prioridad de impresiones son Boa Praça Ipanema, Babbo Osteria y B.B. Lanches.

[Inventario maestro](INVENTARIO_MAESTRO_CUATRO_IDIOMAS.csv) · [Cobertura](COBERTURA_CUATRO_IDIOMAS.md) · [Alertas de Gastronomía](REVISION_GASTRONOMIA_CUATRO_IDIOMAS.csv)
