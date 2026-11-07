# Auditoría técnica ampliada de destinos regionales — 2026-11-07

## Alcance y límite
Inspección de lectura del generador `scripts/build_regional_destinations.mjs`, manifiesto `assets/data/regional-destination-photos.json` y módulos de traducción de Petrópolis, Arraial do Cabo, Cabo Frio y Paraty en rama `revision/rendimiento-traducciones-81a904c`. No se ejecutó build, navegador, descarga ni despliegue. Este archivo de diagnóstico se crea por separado para no modificar módulos potencialmente trabajados por Work.

## Hallazgos verificables (código fuente)
1. **Mapa saliente sistemático**: `build_regional_destinations.mjs`, función de acciones, líneas aproximadas 68–70: `action.map` se transforma en `https://www.google.com/maps/search/?api=1&query=...` mediante `external(...)`. No hay mapa interactivo propio en ese flujo. Prioridad P0 para requisito de navegación interna. No sustituir ciegamente por un marcador sin coordenadas verificadas.
2. **Enlaces externos de acción**: `action.url` se convierte en enlace `target="_blank"` (línea aprox. 72). Clasificar cada destino: fuentes institucionales, transporte/transacción y guías de terceros. El contenido principal debe ser autónomo, sin mandar a otra guía turística.
3. **Fotografías insuficientes para 13 secciones**: el manifiesto contiene solo 9 entradas para Petrópolis (barrios, compras, cultura, eventos, familia, fotografías, guía, home, naturaleza), 3 para Arraial (barrios, cultura, home), 6 para Cabo Frio (barrios, cultura, familia, guía, home, naturaleza) y 4 para Paraty (cultura, familia, home, naturaleza). Una entrada es un metadato, no evidencia de archivo existente ni foto correcta. El generador usa fallback a `home` cuando falta foto, de modo que diferentes secciones pueden repetir portada; esto no satisface miniaturas únicas.
4. **Créditos y licencias**: el generador construye una página `/destinos/creditos-fotos/` con autor, origen y licencia; conservar atribución y revisar requisitos particulares de cada licencia. No eliminar atribuciones legalmente obligatorias.
5. **Tres idiomas**: el generador usa `langs` y traducciones `t(...)`; los cuatro módulos tienen contenido trilingüe. La existencia de traducciones no certifica su integridad ni que todas las rutas se hayan generado.
6. **Mapas en datos**: Petrópolis contiene 21 apariciones de `map:` y 8 de `url:`; Arraial, Cabo Frio y Paraty usan funciones auxiliares `map(place)`, por lo que contar el texto literal `map:` no equivale al número de enlaces de mapas efectivamente renderizados.
7. **Rutas y cabeceras**: el generador define 13 secciones de portada, enlaces internos y un encabezado de destino. Falta comparar visualmente con Río y comprobar persistencia real del encabezado en móvil/escritorio.

## Matriz priorizada
| Destino | Entradas fotográficas declaradas | Riesgo editorial/visual prioritario |
|---|---:|---|
| Arraial do Cabo | 3 | Miniaturas únicas, galerías de playas y miradores, transporte marítimo, mapas internos |
| Paraty | 4 | Miniaturas por sección, patrimonio y cultura caiçara, rutas de Trindade, mapas internos |
| Cabo Frio | 6 | Playas y barrios con fotografías verificadas, movilidad urbana e interurbana, mapas |
| Petrópolis | 9 | Equivalencia visual y temática con Río, accesos a Itaipava, mapa de atractivos |

## Orden seguro de implementación
1. Antes de editar: comprobar commits recientes y archivos activos de Work; no sobreescribir ni regenerar su trabajo.
2. Inventariar todas las secciones, guías y fichas de cada destino y comparar estructura con las páginas homólogas de Río. Distinguir portada, ficha, mapa, fotos, ES/PT/EN.
3. Crear registro geográfico por lugar con ID estable, nombre, coordenadas comprobadas, destino, categoría, slug interno y procedencia del dato.
4. Implementar componente de mapa **interno** con MapLibre y datos/teselas licenciados; tarjetas con enlaces internos. Atribución cartográfica obligatoria visible según licencia, sin enlaces promocionales a otras guías.
5. Completar fotografías locales auténticas y verificadas con licencias compatibles; no usar fotos de otros lugares ni ocultar créditos obligatorios. Probar archivos realmente existentes.
6. Auditar y completar contenido específico, especialmente transportes dentro de cada ciudad y hacia destinos cercanos, sin derivar la explicación a terceros.
7. Generar en carpeta temporal con `--stage`, comparar escritorio 1440 y móvil 390, probar JS, accesibilidad, enlaces, H1, canonicals, imágenes y traducciones.
8. Solo entonces publicar incrementalmente en Hostinger, documentando rutas efectivamente publicadas y resultado.

## Recomendación de trabajo inmediato
**No cambiar automáticamente la función `action.map` por un enlace interno vacío.** Primero construir el conjunto de coordenadas y el componente cartográfico real. Mientras tanto, mantener el hallazgo abierto y preparar contenido/fotografías/QA sin romper las rutas actuales. No afirmar que se completaron mapas, fotos, pruebas ni despliegue.
