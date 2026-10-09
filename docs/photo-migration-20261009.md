# Migración fotográfica — tanda del 9 de octubre de 2026

Alcance: asignaciones explícitas del propietario en Home, Experiencias, Atracciones, Consejos, Gastronomía y miniaturas de Búzios. Cambios preparados en `revision/rendimiento-traducciones-81a904c`; no se desplegó a producción.

## Conteos separados

- **Fotos disponibles en Hostinger:** 3.085 archivos de imagen con rutas distintas en el listado consultado. La deduplicación es por ruta de origen; el listado no expone hashes para detectar copias idénticas con nombres distintos.
- **Fotos únicas incorporadas en las dos tandas de esta ejecución:** 55 nuevas o corregidas (43 en la primera tanda; 12 en la segunda tanda).
- **Referencias página-foto añadidas:** 59 (45 en la primera tanda y 14 en la segunda). Hay 4 usos adicionales de imágenes ya contadas como únicas: RAPEL (1) aparece en la tarjeta de Experiencias y en su ficha; la portada de Atardeceres aparece en Consejos y en su guía; la foto 1 de Boa Praça Leblon y la foto 1 de Saens Peña aparecen también como portadas de sus listados.
- **Archivos retenidos para después por indicación del propietario:** 42: Penedo (7), buceo/bautismo de Búzios (11), Casa Cândida (11) y Videos TV (13).
- **Lista de 129 asignaciones recibida:** reconciliada. 87 fotos únicas tienen referencia en su página y 42 quedan aparcadas por instrucción expresa. Esto cubre esa lista, no implica que se haya auditado todo el inventario de 3.085 fotos.

## Referencias añadidas

| Destino | Fotos únicas | Referencias | Ubicación |
|---|---:|---:|---|
| Ernestinho | 5 | 5 | Home, bloque que enlaza a su historia |
| Tiempo, viento y mar | 4 | 4 | Home, tarjeta de Río en vivo |
| Portada de Eventos | 1 | 1 | Home, nueva tarjeta que abre Eventos |
| Floresta da Tijuca | 1 | 1 | Full Day Río, imagen del bloque de Floresta |
| Rapel | 4 | 5 | Ficha de Rapel y tarjeta del grupo de deportes extremos |
| The Maze | 3 | 3 | Ficha nueva enlazada desde Atracciones |
| Atardeceres inolvidables | 7 | 8 | Ficha nueva y portada enlazada desde Consejos |
| Plage Café | 6 | 6 | Guía nueva enlazada desde Gastronomía |
| Merci | 3 | 3 | Guía nueva enlazada desde Gastronomía |
| Miniaturas de Búzios | 8 | 8 | Tarjetas de temas ya existentes |
| Pedra do Sal, Pequena África | 1 | 1 reparada | Experiencias, tarjeta de trekking |

La miniatura de Ernestinho en TV ya estaba referenciada correctamente en Home y no se vuelve a contar como nueva. Las 10 fotos de Casa Histórica de Deodoro y MAST se incorporaron en un commit anterior y tampoco se cuentan en esta tanda.

## Búzios

El inventario contiene 30 miniaturas. Había 22 fuentes asociadas a tarjetas de temas; esta tanda asigna las 8 restantes a sus tarjetas existentes: Chile, resolver trámites, eventos, mascotas, Argentina, perfil de viaje, seguridad y accesibilidad. Buceo y bautismo permanecen apartados para la fase de Experiencias, como indicó el propietario.

## Comprobaciones y límites

- Las 55 rutas nuevas o corregidas de imagen aparecen como archivos en el listado de Hostinger; se comprobaron las asociaciones con las páginas y tarjetas indicadas.
- El entorno bloqueó las solicitudes HTTP salientes para comprobar el estado y tipo MIME de las imágenes. Esa comprobación en navegador sigue pendiente; no se declara verificación HTTP de extremo a extremo.
- The Maze, Atardeceres, Rapel, Plage Café y Merci ya tienen página y enlace desde su sección.
- Café Plage se documentó con información de Riotur y el perfil oficial de Plage Café. Merci se incluyó en Gastronomía porque las fuentes consultadas describen comida, coctelería y programación musical en Vogue Square.
- Los 42 archivos retenidos siguen pendientes de referencia válida por decisión del propietario. La auditoría total de las 3.085 fotos todavía requiere un recorrido del resto del sitio.

Además se reparó en Experiencias una referencia a Pedra do Sal: el nombre de la carpeta llevaba la tilde omitida y no coincidía con la ruta existente en Hostinger.

## Reconciliación de las 129 asignaciones

| Estado | Fotos únicas | Detalle |
|---|---:|---|
| Referencias ya existentes antes de esta ejecución | 23 | 22 miniaturas de Búzios y la miniatura de Ernestinho en TV |
| Referencias del commit previo de museos | 10 | 5 Casa Histórica de Deodoro y 5 MAST |
| Referencias nuevas de las dos tandas actuales | 54 | 42 asignaciones originales y 12 rutas encontradas al cuadrar los grupos |
| Apartadas por indicación del propietario | 42 | Penedo (7), buceo/bautismo (11), Casa Cândida (11) y Videos TV (13) |
| **Total** | **129** | 87 referenciadas + 42 apartadas |

Las 87 fotos referenciadas corresponden a 91 asociaciones página-foto; cuatro archivos tienen una segunda colocación válida en una tarjeta de sección.

La segunda tanda incorporó la miniatura de Búzios en Home; cinco fotos de Búzios en Goleta; cuatro fotos y la ficha propia de Boa Praça Leblon; y dos fotos y la ficha de la feria de Saens Peña. La unidad Leblon queda separada de la ficha existente de Ipanema.
