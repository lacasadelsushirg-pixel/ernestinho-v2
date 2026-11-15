# Recuperación y francés en el PR 24

## Qué está preparado

| Sección | Rutas en el piloto | Revisión ES, PT-BR y EN | Francés |
|---|---|---|---|
| Inicio | `/` | Texto, navegación, servicios y metadatos cotejados | Inicio completo en vista previa |
| Guía de Río | `/guia/`, `/guia/apps/`, `/guia/dinero/`, `/guia/permanencia/` | Paridad de bloques. Alt de imágenes de la portada y Apps corregidos en PT-BR y EN | Portada y tres artículos completos |
| Gastronomía | `/gastronomia/carretao-ipanema/`, `/gastronomia/ct-boucherie/` | Párrafos históricos recuperados o verificados. Cuatro suplementos traducidos. Alt y enlace de Carretão corregidos. Selector duplicado resuelto en ambas fichas. | Dos fichas completas, con las fotografías, horarios, datos prácticos y enlaces de origen |

Se conservaron los HTML fuente aprobados. El francés utiliza una lista explícita de siete rutas y un diccionario editorial. Si una frase o un metadato no tienen entrada, el generador rechaza el piloto. Las fotografías, los mapas incrustados y los enlaces comerciales mantienen sus destinos. Los enlaces internos sin página francesa llevan a la versión española y la vista previa los identifica en su etiqueta informativa. El asistente aún responde en ES/PT-BR/EN. La vista francesa ofrece un enlace marcado al asistente en español y un WhatsApp con mensaje inicial en francés. La integración de un asistente en francés queda pendiente para una publicación.

## Qué se verificó

- La compilación dirigida generó 21 HTML de referencia ES/PT-BR/EN. La simulación incremental regeneró **15 de 3.612**. Cambiaron los bytes de 10 HTML y se conservó el conjunto de rutas. El sitemap fue idéntico byte por byte a la semilla de 3.588 URL.
- La compilación normal no emitió `/fr/`, el diccionario francés ni enlaces al piloto. La vista previa usa un directorio separado, un manifiesto independiente con `publishable: false`, canonicals propios, `noindex, follow` y cero alternates franceses. El sitemap y el manifiesto de tres idiomas son idénticos antes y después de preparar la vista previa.
- Las **28 combinaciones de página e idioma** pasaron el auditor estructural. No quedaron párrafos extensos iguales al español en las siete rutas. Las comprobaciones cubrieron H1, título, descripción, canonical, estructura editorial, selector, medios del contenido francés y enlaces entre rutas francesas.
- Chromium comprobó las siete rutas a 1440 y 390 px, con navegación PT-BR → FR → EN, sin desbordamiento horizontal, y probó el carrusel del Inicio y el enlace de WhatsApp en francés. Las capturas locales bloquean recursos externos. Los archivos de diseño y los controles de publicación protegidos se conservaron.
- El control de contenido aprobado validó 586 archivos y 10 recursos críticos. Las 246 diferencias del control histórico coinciden con la referencia previa del PR.

[Guía a 1440 px](evidencias-fr-2026-11-10/guia-1440.jpg) · [Guía a 390 px](evidencias-fr-2026-11-10/guia-390.jpg)
[Carretão a 1440 px](evidencias-fr-2026-11-10/carretao-1440.jpg) · [Carretão a 390 px](evidencias-fr-2026-11-10/carretao-390.jpg)

## Gastronomía y cobertura pendiente

Las 330 alertas históricas son registros por página e idioma, repartidos en 166 fichas. La clasificación inicial encontró 261 registros con coincidencias extensas e indicios léxicos de español, 67 que requieren cotejar otros elementos y dos corregidos en CT Boucherie. Se identificó un diccionario PT/EN posicional en 321 registros. Su presencia permite buscar traducciones recuperables, pero hace falta cotejar la posición, los párrafos nuevos y la vigencia de cada entrada. Carretão tenía dos suplementos en español en cada idioma, por debajo del umbral histórico, y también se corrigió.

El auditor general pasó de 370 a **368** versiones con tres o más bloques largos idénticos al español. Quedan **328** alertas del grupo de Gastronomía por resolver, además de las de Compras y Destinos. El CSV incluye el tamaño del diccionario disponible, una muestra cuando corresponde y la mejor cifra de impresiones de las ventanas anteriores. Las primeras fichas pendientes con visibilidad documentada incluyen Belmonte Copacabana, Belmonte Ipanema y Polvo Marisqueria. Esa priorización es histórica y no implica posiciones actuales.

El inventario maestro cubre las **1.204 rutas fuente** del manifiesto, incluidas 1.196 indexables en español. El estado editorial y la presencia en producción se registran por separado. «Validado» se refiere al alcance del piloto, con el asistente francés pendiente. La integración del francés en los componentes públicos compartidos y en hreflang queda pendiente de una publicación validada.

[Inventario maestro](INVENTARIO_MAESTRO_CUATRO_IDIOMAS.csv) · [Cobertura por sección](COBERTURA_CUATRO_IDIOMAS.md) · [Alertas de Gastronomía](REVISION_GASTRONOMIA_CUATRO_IDIOMAS.csv)

## Cómo repetir la prueba

El generador local requiere Python con `lxml`. Partir de un `dist` completo de ES/PT-BR/EN. La salida del piloto debe ser un directorio nuevo fuera del repositorio.

```bash
python3 scripts/build_fr_preview.py --dist dist --out ../fr-preview
python3 scripts/audit_fr_preview.py --dist dist --preview ../fr-preview
node scripts/test_fr_preview.mjs ../fr-preview ../fr-preview-capturas
```
