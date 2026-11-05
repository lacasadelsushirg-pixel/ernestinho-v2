# Búzios: Consejos y Guía — lote 2

Base `3b348d102191285fce6e39b5cd22a192a4d14407`. Trabajo aislado en `fix/buzios-consejos-guia-20261105`.

Se desarrollan ocho artículos de Consejos en ES/PT-BR/EN, la portada de Consejos, la portada de Guía con 21 temas y la página de vacunas. Los artículos reutilizan el DOM y estilos reales de cada equivalente de Río; no se crea un sistema de diseño nuevo. Los templates extraídos se conservan en `assets/data/buzios-advice-templates.json`. La única adaptación de CSS externo es el watermark BÚZIOS en una copia del CSS maestro de Guía; Río no se modifica.

Los veinte consejos contienen veinte recomendaciones; las cincuenta preguntas contienen exactamente cincuenta respuestas distribuidas 10/8/12/8/7/5. Los itinerarios cubren 1/2/3/5 días. El contenido está escrito para Búzios, en tono práctico y personal, sin fabricar visitas vividas, tarifas ni horarios. Referencias sanitarias: Ministerio de Salud y Anvisa; mar y balneabilidad: Marinha e INEA; Porto da Barra y Casas Brancas: canales oficiales.

El inventario completo de temas de Río y sus equivalencias queda en `equivalencias-consejos-20261105.csv`; no se considera toda la cobertura editorial terminada por publicar los ocho artículos iniciales.

Se usan imágenes ya disponibles en los recursos del proyecto, identificando el lugar u objeto. Los productos del mercado se muestran como productos, sin atribuirlos a un establecimiento concreto de Búzios. Las fotos no disponibles se mantienen en un registro interno acumulativo; la lista única se entregará al terminar el encargo completo, conforme a la instrucción del usuario. No se añaden placeholders ni imágenes generadas para sustituir material turístico.

Validación: versiones ES/PT-BR/EN; comparación real a 1440 y 390 px; estilos calculados de los componentes; capturas; navegación; imágenes; veinte consejos; cincuenta preguntas; canonical y cuatro alternates. El espaciado del vocabulario de Supermercados se corrigió reutilizando el mismo elemento del template original.

Publicación: 33 HTML renderizados de manera selectiva, cinco recursos propios de este lote y adición de 27 URL al sitemap actual, preservando todas las entradas existentes. Respaldo y comparación SHA-256 antes de sustituir; páginas antes que portadas y sitemap al final. No se modifica Carioc-IA, páginas originales de Río ni otros contenidos de Búzios. No hay build global, merges ni despliegue alternativo a Hostinger.
