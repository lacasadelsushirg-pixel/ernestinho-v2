# Noveno lote de Gastronomía

| Ficha | Trabajo y estado |
|---|---|
| Nôa Ipanema | Recuperación del arranque PT/EN, ampliación de las traducciones abreviadas y del itinerario, y traducción de consejos y fotos. Francés completo en el piloto. Validación local superada. |
| Bar do Mineiro | Recuperación PT/EN y complemento del inglés sobre platos, contactos, pendientes y regreso nocturno. Francés completo en el piloto. Validación local superada. |
| Brota | Recuperación PT/EN, traducción de consejos y fotos y francés completo en el piloto. Las traducciones superan las pruebas locales, pero la validación editorial del original sigue pendiente por canal oficial genérico y dirección imprecisa. |

Los commits de código son cb01bc8fb9ce0f7624111e8fc3f926fc24c7d9d5 y `435a9d0ed5a8c1711625a2e0ead165a9f48bc232`. Se conservaron las traducciones históricas válidas, completando la información que faltaba en las fichas vigentes. Los datos comerciales reproducen las fichas originales. Su vigencia requiere confirmación cuando se utilicen.

La fuente española de Brota contiene un enlace a la portada de Instagram. Los diccionarios PT/EN lo cambiaban además por #. Se recuperó el mismo destino que el original para evitar esa pérdida, sin inventar un perfil. El generador del inventario conserva el pendiente de Brota y evita marcarlo Validado en futuras ejecuciones. ES queda En revisión y PT-BR/EN/FR Corregido o traducido.

## Validación

Las 34 rutas del piloto pasaron el auditor de estructura, contenido, SEO, enlaces editoriales e aislamiento de francés, y las pruebas de navegación PT-BR → FR → EN a 1440 y 390 px. Tras completar el itinerario de Nôa se repitieron la generación de esa ruta y las comprobaciones del piloto. Se tomaron y revisaron capturas de las tres fichas en PT/EN antes y después, en los dos tamaños. Las solicitudes a terceros se bloquearon para la prueba visual y las URL de fotos y mapas se cotejaron por separado.

La simulación incremental regeneró 96 de 3612 documentos a partir de la fixture local anterior y cambió nueve HTML de las tres fichas. El ajuste final de Nôa se verificó además mediante una compilación dirigida de sus tres versiones. El sitemap de 3588 URL quedó idéntico byte por byte. El texto ES, las URL de medios, canonical y hreflang se conservaron. El único cambio de destino de enlaces fue la recuperación de Instagram genérico en PT/EN de Brota para igualar ES, con su pendiente expresamente registrado.

El control de publicación validó 586 archivos y 10 recursos críticos. El verificador histórico mantuvo las 246 diferencias de la base. La auditoría de contenido pasó de 320 a 314 versiones con tres o más bloques largos idénticos al español. En el inventario gastronómico quedan 274 alertas textuales En revisión y dos filas PT/EN de Brota Corregido o traducido con validación editorial pendiente.

El lote está preparado en el PR 24. FR permanece privado y no indexable. El asistente francés continúa pendiente. La cobertura total es de 34 rutas de piloto, de las que 33 están validadas localmente y Brota mantiene el pendiente documentado. Las siguientes prioridades son Faenza Copacabana, Nino Cucina Ipanema y Koral, según el inventario y el HEAD vigente.

[Inventario maestro](INVENTARIO_MAESTRO_CUATRO_IDIOMAS.csv) · [Cobertura](COBERTURA_CUATRO_IDIOMAS.md) · [Alertas](REVISION_GASTRONOMIA_CUATRO_IDIOMAS.csv)
