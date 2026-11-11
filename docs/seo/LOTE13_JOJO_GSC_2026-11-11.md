# Jojo: traducciones preparadas e indexación de Búzios

11 de noviembre de 2026. Base remota del PR #24: `01b90130c2a5845c4ab0bfa76309b2257e099bc7`. Producción comprobada: `9426c42fc0150bdce5fbfee060396da9de518ac7`. Código del lote: `4e6b5e4472f5196525614d343fc87cf0ef0ba47c`. El séptimo lote y Spicy Fish, Amendoeira y Dumaré ya estaban cerrados en el PR; el último cierre registrado era el lote 12.

Se activó el renderizado PT-BR/EN de /gastronomia/jojo/ y se cotejaron los diccionarios de 42d03024, 8570793a y 391d302e (25 de septiembre), incluidos los 19 índices incrustados por idioma. Se conservaron los párrafos históricos correspondientes al contenido vigente, se excluyeron los añadidos del selector posicional y se tradujeron consejos, etiquetas y pies de foto. Los textos suplementarios ya presentes en el chunk de Gastronomía se conservaron. El índice de galería histórica sin párrafo equivalente no se insertó. Se añadió el texto francés completo al diccionario, probado en una vista aislada noindex.

**Pendiente editorial y visual.** El cuerpo sitúa el restaurante en Horto/Jardim Botânico, pero la cabecera, la ficha, Google Maps y Waze mantienen Botafogo; el botón oficial tiene href vacío. No se alteraron los datos ni los enlaces del ES aprobado. La captura PT de escritorio muestra dos filas de idioma en esta fixture; el selector FR de la vista aislada permite navegar, pero falta revisar la duplicación. Jojo queda fuera del piloto compartido de 43 rutas hasta resolver estas incidencias. El inventario registra 254 alertas textuales de Gastronomía y diez filas PT/EN con validación editorial pendiente, dos de Jojo.

## Pruebas y límites

- Compilación selectiva antes/después: tres HTML. El auditor de contenido pasó de ocho bloques largos iguales al ES por idioma a cero. El auditor multilingüe emitió los mismos 16 avisos de destinos locales ausentes por la fixture selectiva; no añadió avisos. La comprobación aislada ES/PT-BR/EN/FR pasó el auditor de estructura, medios y enlaces externos. La navegación PT-BR → FR → EN pasó a 1440 y 390 px. Las capturas bloquearon solicitudes externas.
- Hostinger sirve 3612 documentos en el manifiesto y 3588 URL únicas exactamente iguales a su conjunto indexable, sin FR. La vista aislada no cambia el sitemap ni el manifiesto de referencia. No se ejecutó una simulación incremental completa: requiere una semilla íntegra de 3612 HTML del padre del lote. Pendiente comparar la salida incremental con esa semilla y verificar que solo cambian los documentos de Jojo.
- Guard de publicación PASS, 586 archivos y 10 recursos. El control histórico conserva 246 diferencias. Ninguna página fuente, CSS ni recurso protegido cambió. No se fusionó ni publicó el lote.

## Search Console

Ocho inspecciones nuevas en la propiedad HTTPS con www. Cinco figuran indexadas: Balthazar Bakery ES/PT, Aquário EN, 20 Consejos EN y Carioca da Gema EN. Brava, Caravelas y Ferradura EN conservan 404 registrados por Google entre el 23 y el 25 de octubre. Las tres responden 200 con canonical propio en Hostinger el 11 de noviembre; volver a inspeccionar tras un nuevo rastreo. No clasificar esos 404 como fallos HTTP actuales ni usar la muestra como total de exclusiones de la propiedad. El agregado actualizado de Páginas continúa pendiente.

[Inspecciones de Google](GSC_INSPECCIONES_2026-11-11.json) · [HTTP de Hostinger](GSC_HTTP_2026-11-11.json) · [Capturas de Jojo](JOJO_COMPARACION_2026-11-11.jpg).

## Continuación

Releer el HEAD remoto y el trabajo paralelo antes de incorporar la rama. Incorporar los dos commits solo cuando no haya otro escritor y revisar el diccionario FR si hubo cambios concurrentes. Resolver ubicación, enlaces y selector de Jojo antes de incluirla en el piloto. Continuar con Don Camillo y Bar do Omar, o con las prioridades por impresiones vigentes si esas fichas ya están en otro lote. No publicar sin verificar la simulación incremental y el gate de Hostinger.
