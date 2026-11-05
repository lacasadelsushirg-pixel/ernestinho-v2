# Búzios: seis artículos de Guía práctica con el formato de Río

Continúa el primer lote `3b348d10` e integra el lote de Consejos `9ed8dea4` sin reconstruir sus páginas ni sobrescribir su publicación.

Se adaptan aeropuertos, terminal, viajar solo, accesibilidad, salud/emergencias y consulados. El generador reutiliza todos los bloques de estilo originales de cada página equivalente de Río, con el DOM `.guide`, `.items`, `.tip` y `.ext`. Conserva los textos ES/PT/EN existentes de Búzios, añade consejos personales y usa las fotografías locales inventariadas y revisadas visualmente. No añade imágenes nuevas de terceros ni imágenes con texto publicitario. Las fotografías de edificios mantienen su señalética natural.

La ficha de aeropuertos deja de ofrecer la tarifa vencida el 31/10/2026 y remite a cotización del trayecto completo. No se inventan precios, vuelos, horarios ni disponibilidad de servicios. Las fuentes municipales, CNES, Ministerio de Salud y 1001 se revisaron durante la preparación. El programa Mar para Todos sigue identificado como aviso histórico cuya fecha debe confirmarse.

El build reconoce estas seis fuentes y genera directamente ES/PT-BR/EN, sin traducir mecánicamente sus textos ni montar de nuevo el renderizador antiguo sobre el HTML generado. Las URL ya existían; este lote no cambia el sitemap ni el manifiesto de idiomas. La publicación queda limitada a 18 HTML, sin tocar recursos compartidos, Río o Carioc-IA.

Validación local: 36 casos (6 páginas × 3 idiomas × 2 anchos), todos correctos: un H1, un menú de Búzios, un pie, canonical propio, cuatro alternates, sin imágenes rotas, errores JavaScript ni desbordamiento. Comparación real de estilos calculados con Río: 12 casos (6 equivalentes × 1440/390 px); sin diferencias en tipografía, tamaños, colores, fondos, bordes y padding de los componentes principales. Inspección visual de escritorio y móvil. Además, los 18 HTML conservan exactamente los bloques de CSS de sus referencias de Río.

Se respaldan los 18 HTML de producción antes de reemplazarlos. El publicador compara SHA-256 antes y después de cada sustitución y se niega a sobrescribir cambios simultáneos. Su manifiesto registra el resultado individual de cada URL.

`check_frozen_pages.py` conserva los fallos históricos de la propia base, ya documentados en el primer lote. Ningún archivo protegido de Río cambia respecto a esa base; no se revierte material aprobado para hacer pasar ese control.

Pendientes del encargo integral: comprobar el resto de secciones contra Río, completar los demás temas de Consejos, adaptar Mes a mes y Alquiler de auto si la comparación de sus plantillas lo requiere y cerrar el inventario único de fotos al terminar todo el trabajo. Este lote no declara finalizada toda la guía de Búzios.

## Cierre comprobado

Publicados y verificados por SHA-256 los 18 HTML previstos. La revisión directa en producción completó 36 casos (ES/PT-BR/EN a 1440/390 px), todos correctos. Las 12 comparaciones de componentes con sus equivalentes de Río no muestran diferencias. El lote anterior de Consejos y Guía permanece publicado. No se modificó el sitemap ni se hizo una compilación global.
