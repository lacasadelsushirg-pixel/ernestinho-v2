# Traducción ES/PT/EN — continuidad

Autorización: traducir toda la V2 por bloques, comprobar todos los botones y generar commits. Conservar contenido, fotos, banners, widgets, enlaces y diseño. No resumir. Temas cerrados: solo traducciones y arreglos necesarios de botones.

Repositorio: lacasadelsushirg-pixel/ernestinho-v2. Rama: revision/guia-rio-hospedaje-traducciones. Estado inicial: 5afb41e. No usar main como estado actual. Revisar HEAD remoto antes de publicar para conservar cambios concurrentes.

Continuación automática solicitada y programada para cinco horas después del inicio. Leer este archivo y commits recientes antes de continuar. No declarar la página completa hasta auditar las rutas y textos dinámicos en los tres idiomas.

Bloque 1: navegación compartida, pie, últimos textos de Home/Transportes; selector desktop deja de dispararse a sí mismo al buscar controles incrustados; traducción por frases respeta elementos data-i18n/data-live; idioma almacenado se vuelve a aplicar tras instalar el puente de controles.

Brechas iniciales (inventario de textos estáticos; incluye nombres propios y textos ya gestionados por otros renderizadores, NO porcentaje real): familia 538, fotografía 51, hospedaje 127, café 45, experiencias 479, guía 84, compras 677, eventos 299, gastronomía 4282, vida nocturna 898, playas 81, barrios 103, cultura 2276, naturaleza 142, historia 72. Revisar cobertura exacta antes de traducir: algunas fichas tienen ES/PT/EN embebido.

Bloque 2: últimas incorporaciones de Guía de Río (documentación, visados, salud, dinero y movilidad), horarios/luz en Fotografía, conexión de Café Río al evento global y ec-lang, y dos enlaces rotos de barrios corregidos. Café ya tenía traducciones propias completas, pero el selector común no las activaba. Hospedaje también tiene diccionario propio y datos ES/PT/EN; no tomar sus textos estáticos como faltantes sin verificar ese renderizador.

Validación estática inicial: 582 rutas y 63251 enlaces/recursos; 16 incidencias iniciales, algunas son páginas de redirección deliberadas. Navegador local no disponible (Playwright sin ejecutable; descarga restringida falló), por lo que la prueba visual de botones sigue pendiente. No confundir revisión de sintaxis con prueba visual.
