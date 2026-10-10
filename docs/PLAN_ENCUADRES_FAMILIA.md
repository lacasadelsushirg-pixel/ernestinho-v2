# Plan y estado de encuadres — Familia

## Corrección global de galerías

`assets/css/familia.css` ya no fija las fotos interiores a 18 o 27 rem de alto. Las imágenes se muestran con ancho adaptable, alto automático y proporción intrínseca, dentro de un ancho máximo de 56 rem y una altura máxima de 48 rem. La columna centra el contenido y conserva el radio del diseño. Así, las fotos 4:3 de BioParque dejan de convertirse en franjas panorámicas; las imágenes verticales se reducen sin cortarse.

La regla no usa `object-fit: contain` como solución general. La proporción se conserva mediante alto automático. Las tarjetas siguen en 4:3 con `cover`; los héroes mantienen el diseño existente con `cover` y foco centrado. No se alteraron los archivos originales.

## Encuadres revisados en escritorio

| Foto o grupo | Escritorio | Móvil | Estado |
|---|---|---|---|
| BioParque, portada aérea | `cover` conserva la vista del parque; se comprobó en preview. | No fue posible emular viewport móvil. | Correcta en escritorio; móvil pendiente. |
| BioParque, interiores 1, 2, león y otro animal | Las cuatro imágenes cargan y conservan 4:3 en marcos de 896×672 CSS px en el preview revisado. | Alto automático y ancho fluido; la captura móvil no está disponible en esta sesión. | Correctas en escritorio. |
| Bosque da Barra, capibaras | La nueva toma reemplaza una selfie repetida y mantiene a Ernestinho y los animales visibles. | Galería adaptable. | Correcta en escritorio; móvil pendiente. |
| Bosque da Barra, jacaré | La panorámica conserva la proporción 16:9; se ubica después del bloque de experiencia. | Alto automático; verificar al abrir en móvil. | Integrada; móvil pendiente. |
| Parque Lage, `PARQL2.jpg` y `PARQLA1.jpg` | Derivados JPEG cargan y se muestran sin deformación ni recorte fijo. | Alto automático y ancho fluido. | Correctas en escritorio. |
| Carnaval Experience, espacio de Zeca Pagodinho | El grupo y la escena cargan en JPEG y se conservan completos en la galería. | Alto automático y ancho fluido. | Correcta en escritorio; identidad confirmada por Ernesto. |
| Jardim Botânico | La pérgola es portada; jardín y palmeras son las dos interiores. Las tres fuentes locales cargan. | Las interiores conservan proporción; héroe sigue `cover`. | Correctas en escritorio; héroe móvil pendiente. |
| Ilha Fiscal | El palacio usa una portada horizontal y una vista vertical interior; ya no se repite la portada. | Galería adaptable; foco del héroe móvil pendiente. | Correctas en escritorio. |
| Feira de São Cristóvão | La toma del acordeonista y el letrero se muestra en proporción original. | Galería adaptable. | Correcta en escritorio. |
| Miniaturas Familia | Se conservan las 21 ilustraciones originales con 4:3 y `cover`; se revisó su correspondencia en escritorio. | El navegador disponible no permite emular el viewport. | Móvil pendiente para todas las miniaturas. |

## Pendientes de revisión visual móvil

La verificación exacta a un ancho móvil no pudo hacerse con el navegador disponible. Revisar en un dispositivo real o emulador compatible estas zonas que todavía usan `cover`: 21 miniaturas de la portada, héroes de las 21 fichas, y en particular BioParque, Bosque da Barra, Jardim Botânico e Ilha Fiscal. El CSS responsive no fuerza recortes adicionales en las galerías.

La página se probó en escritorio en el preview de Hostinger. No se recomienda retocar `object-position` sin ver el encuadre móvil, porque cambiar el foco podría mejorar una vista y empeorar la otra.
