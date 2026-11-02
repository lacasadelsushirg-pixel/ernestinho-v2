# Traducciones publicadas en Hostinger — 2 de noviembre de 2026

Se publicó de forma selectiva el lote de los PR #13 y #14: **59 rutas, 177 HTML ES/PT-BR/EN y seis archivos JavaScript**. Base revisada: `58413ec19dee14d447c4d4a6c9ac9061a0f4a87f`. No hubo fusión de ramas ni reconstrucción o sustitución global del sitio.

## Publicación y conservación

- Lista cerrada de 183 archivos únicos; ninguna fotografía, hoja de estilos, archivo de Carioc-IA, sitemap o manifiesto global fue subida.
- Se descargaron copias previas de las páginas y recursos que ya existían. El módulo de metadatos editoriales es nuevo.
- Las 59 fichas conservan el orden y las rutas de las fotografías y mapas frente al HTML de producción previo. El logotipo Cadastur ya se incorporaba mediante el módulo común activo.
- El sitemap y el manifiesto global se verificaron byte a byte antes y después. El manifiesto conserva su identidad global; no se sustituyó por el manifiesto parcial del lote.

## Problemas detectados al ejecutar JavaScript en producción

1. Seis versiones PT/EN de Feira de São Cristóvão, Mercadão de Madureira y Uruguaiana volvían a mostrar textos españoles al reiniciar sus selectores antiguos. Se conserva el HTML traducido y se neutralizan únicamente esos inicializadores en la salida localizada. Los controles de idioma públicos usan enlaces a las rutas ES/PT/EN.
2. Clássico Leme repetía el problema en PT/EN mediante dos inicializadores. Se conserva su contenido generado.
3. Madame Bardot requería los dos módulos de datos/renderizado traducidos del PR #13. Se publicaron sin alterar las fichas de otros restaurantes.
4. Se encontraron títulos españoles y metadatos que volvían al español durante la inicialización. El generador y el módulo común comparten ahora las excepciones editoriales. Se localiza la expresión «guía completa» y se conservan las descripciones revisadas de Compras y Xian.

## Validación

**Resultado final:** 177 respuestas HTTP 200; 177 páginas con párrafos y títulos correctos tras JavaScript; cero fugas españolas en las descripciones auditadas; nueve verificaciones aprobadas sobre la descarga pública. Los 183 archivos únicos coinciden con sus SHA-256 previstos.


- Se compararon los archivos HTTP descargados con las huellas SHA-256 del lote aprobado y de las correcciones posteriores.
- Las nueve verificaciones del workflow se ejecutaron sobre el HTML descargado de producción, usando una lista local limitada a las 59 rutas. El manifiesto global público no se modificó.
- Los controles incluyen las 212 alternativas revisadas, 2.040 posiciones de diccionarios, 1.122 bloques largos, las 82 variantes originalmente pendientes, etiquetas/botones y metadatos/canonical/hreflang de los 177 documentos.
- Se ejecutaron las páginas del dominio real en navegador y se compararon sus párrafos con el HTML aprobado. Se repitieron los casos corregidos y las solicitudes que recibieron HTTP 429, con menor concurrencia. No se ocultaron respuestas limitadas como si fueran páginas aprobadas.
- Las pequeñas diferencias correctas de redacción en las descripciones PT/EN de BB Lanches y Nido Ristorante se conservan; no son fugas de español.

La evidencia por archivo y URL se guarda en `PUBLICACION_HOSTINGER_20261102.json`.

## Límites y pendientes editoriales

Este cierre corresponde al lote de 59 rutas, no certifica la traducción integral de todas las páginas del sitio ni la indexación en Google. Continúan las observaciones editoriales anteriores: identidad de las fotos históricas de Cosmopolita y discrepancia de dirección 82/96 de Nova Capela.

El comprobador histórico de congelación conserva las 249 discrepancias documentadas (246 previas y tres diccionarios internos de Compras). No se alteró su manifiesto para silenciarlas. El contrato de conservación del HTML fuente fuera de scripts de las 59 rutas aprobó.
