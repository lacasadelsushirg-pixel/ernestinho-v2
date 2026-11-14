# Auditoría inicial de traducciones Vercel → Hostinger — 10 de noviembre de 2026

Proyecto: Ernestinho Carioca · repositorio `lacasadelsushirg-pixel/ernestinho-v2`  
Rama publicada: `revision/rendimiento-traducciones-81a904c`  
Rama de trabajo sin publicar: `audit/recuperacion-traducciones-20261110`

## Objetivo y alcance

Comparar los diccionarios editoriales ES/PT-BR/EN conservados en GitHub antes de la migración con su estado actual y evitar regeneraciones parciales de traducciones. Esta es una investigación inicial verificable; **no** equivale a una auditoría lingüística completa de las 3.612 páginas ni a una comprobación de las exclusiones actuales de indexación.

### Evidencias históricas

- Commit del 26-09-2026 `42d03024d2c3765b0d96eb5f9763657d731baf4a`: traducciones de home, guía, transportes y experiencias.
- Commit del 26-09-2026 `8570793a992b262c5fb384a396ec949e6105775c`: traducciones de barrios, playas, atracciones y familia.
- Hostinger informa de 3.612 documentos HTML generados y 1.196 URL indexables por idioma en su última compilación inspeccionada.
- La publicación automática de Hostinger apunta a `revision/rendimiento-traducciones-81a904c`; **esta rama de auditoría no publica cambios**.

## Resultado del cotejo de diccionarios antiguos frente a actuales

Se compararon los valores de cada clave ES con su PT/EN en nueve módulos históricos:

| Módulo | Claves históricas | Claves actuales | Ausentes del mismo módulo | Interpretación |
|---|---:|---:|---:|---|
| atracciones-01 | 39 | 39 | 0 | Conservado |
| barrios-01 | 193 | 725 | 3 | Las tres claves siguen en `common-02` |
| familia-01 | 44 | 45 | 0 | Conservado y ampliado |
| playas-01 | 104 | 103 | 1 | «Playa de Copacabana» sigue en otros módulos activos |
| cafe-rio-01 | 24 | 24 | 0 | Conservado |
| experiencias-01 | 111 | 817 | 0 | Ampliado |
| guia-01 | 275 | 282 | 0 | Conservado y ampliado |
| home-01 | 62 | 75 | 0 | Conservado y ampliado |
| transportes-01 | 257 | 776 | 27 | Parte son claves de navegación compartidas; gran parte pertenece al antiguo BRT, reescrito después |

**Conclusión del cotejo:** no existe evidencia de desaparición masiva de los diccionarios originales en los nueve módulos analizados. Tampoco puede descartarse la pérdida de contenido en módulos adicionales o durante la conversión de un documento en HTML localizado.

## Fallos reproducibles y correcciones preparadas

1. En `/transportes/`, las claves «Traslado Ernestinho» y «CONSULTAR TRASLADO →» se mostraban con valores PT iguales al español. Se restauró la redacción portuguesa editorial «Transfer Ernestinho» y «CONSULTAR TRANSFER →».
2. `assets/js/site.js` cargaba los diccionarios usando `Promise.allSettled` e ignoraba los rechazos. Si algún archivo faltaba o no se podía importar durante una compilación, podía quedar texto español sin lanzar error de compilación. La nueva protección muestra los módulos fallidos y **bloquea compilaciones en localhost**, manteniendo la navegación real más tolerante a errores transitorios.
3. Se añadió `scripts/audit_translation_content.py`, auditoría **de solo lectura** que compara bloques editoriales largos (>120 caracteres) de cada pareja ES/PT y ES/EN generada bajo `dist/`. Produce `docs/seo/QA_TRANSLATION_FALLBACKS.csv`. Con `--strict` falla cuando detecta tres o más párrafos extensos idénticos a los españoles. No presupone que las traducciones estén completas cuando no hay coincidencias exactas.

Ejecutar, después de tener un `dist/` completo en un entorno de pruebas:

```bash
python3 scripts/audit_translation_content.py --dist dist
python3 scripts/audit_translation_content.py --dist dist --strict
python3 scripts/audit_multilingual.py
```

El detector se validó con un pequeño conjunto de archivos sintéticos (identificó los párrafos ES copiados tanto a PT como a EN). **Todavía no se ha ejecutado contra el `dist/` completo de producción**.

## Diferencias de extensión que requieren auditoría editorial

Inventario de archivos publicado en Hostinger: 3.633 HTML de tipo `index.html` revisados; 1.211 conjuntos ES/PT/EN completos por ruta (incluye rutas no indexables).

| Ruta | HTML ES | HTML PT | HTML EN | Nota |
|---|---:|---:|---:|---|
| `/destinos/buzios/guia/viajar-solo/` | 18.836 B | 11.026 B | 10.770 B | PT/EN mucho más cortos: verificar párrafo por párrafo |
| `/destinos/buzios/guia/accesibilidad/` | 19.473 B | 14.119 B | 13.982 B | Verificar paridad editorial |
| `/experiencias/cristo-city-tour/` | 31.682 B | 31.682 B | 31.452 B | Tamaño PT idéntico a ES; por sí solo **no** prueba falta de traducción |

La generación espejo de algunas páginas de Búzios usa el modelo trilingüe `assets/js/buzios-guide-content.js` y no necesariamente el HTML español como único origen. Evitar copiar párrafos ES directamente a PT/EN o borrar bloques revisados: localizar primero la fuente editorial y traducir manualmente la parte faltante.

## Impacto SEO medido en Search Console

Ventanas comparables de 8 días (web, posición ponderada por impresiones):

| Fechas | Impresiones | Clics | Posición media |
|---|---:|---:|---:|
| 05–12/10 | 20.062 | 95 | 10,08 |
| 13–20/10 | 13.994 | 66 | 13,02 |
| 30/10–06/11 | 23.146 | 115 | 11,12 |

El descenso comenzó hacia el 13/10, aproximadamente cuatro días después de la creación del sitio en Hostinger. En las versiones PT y EN la pérdida inicial de impresiones fue especialmente marcada. La correlación temporal **no** acredita por sí sola una penalización o un error de traducción.

Las cifras históricas del 02/11 muestran 412 URL «Descubierta, actualmente sin indexar», 26 con 404, nueve rastreadas sin indexar, nueve con redirección y dos duplicadas (458 en total). Esta auditoría usa el API de rendimiento; no dispone del informe actualizado completo de motivos de exclusión de Google.

## Próximos pasos antes de publicar

1. Ejecutar ambos verificadores sobre un `dist/` completo, generado desde esta rama, sin alterar producción. Corregir por bloques las URL marcadas por `QA_TRANSLATION_FALLBACKS.csv`.
2. Comparar manualmente la guía de viajar solo y la de accesibilidad de Búzios entre ES/PT/EN; completar sus contenidos en los módulos editoriales correctos **sin traducción automática**.
3. Inspeccionar en GSC los ejemplos por motivo de exclusión y cruzarlos con las pérdidas de impresiones: no solicitar indexación indiscriminada de todas las URL.
4. Una vez aprobados los cambios, planear publicación incremental controlada. La modificación de `site.js` puede exigir reconstrucción completa según la lógica actual de `build_multilingual.mjs`; no fusionar sin validar esa compilación y su impacto operativo.

**Estado:** rama preparada y aislada; correcciones no publicadas; auditoría integral de 3.612 páginas pendiente de ejecución sobre el resultado de compilación.
