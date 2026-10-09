# Migración fotográfica — tanda del 9 de octubre de 2026

Alcance: asignaciones explícitas del propietario en Home, Experiencias, Atracciones, Consejos, Gastronomía, Hospedaje y miniaturas de Búzios. Cambios preparados en `revision/rendimiento-traducciones-81a904c`; no se desplegó a producción.

## Conteos separados

- **Fotos disponibles en Hostinger:** 3.085 archivos de imagen con rutas distintas en el listado consultado. La deduplicación es por ruta de origen; el listado no expone hashes para detectar copias idénticas con nombres distintos.
- **Fotos únicas incorporadas en esta ejecución:** 66 nuevas o corregidas en tres tandas (43, 12 y 11 de Casa Cândida).
- **Referencias página-foto añadidas:** 71 (45 en la primera tanda, 14 en la segunda y 12 de Casa Cândida, con portada más galería). Hay 5 usos adicionales de imágenes ya contadas como únicas: RAPEL (1) aparece en la tarjeta de Experiencias y en su ficha; la portada de Atardeceres aparece en Consejos y en su guía; la foto 1 de Boa Praça Leblon y la foto 1 de Saens Peña aparecen también como portadas de sus listados; la foto de portada de Casa Cândida aparece además en su galería.
- **Archivos retenidos para después por indicación del propietario:** 31: Penedo (7), buceo/bautismo de Búzios (11) y Videos TV (13). Casa Cândida (11) ya tiene página y referencias tras recibir su descripción y comodidades.
- **Lista de 129 asignaciones recibida:** reconciliada. 98 fotos únicas tienen referencia en su página y 31 quedan aparcadas por instrucción expresa. Esto cubre esa lista, no implica que se haya auditado todo el inventario de 3.085 fotos.

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
| Casa Cândida | 11 | 12 | Ficha nueva enlazada desde Hospedaje; portada más galería |
| Miniaturas de Búzios | 8 | 8 | Tarjetas de temas ya existentes |
| Pedra do Sal, Pequena África | 1 | 1 reparada | Experiencias, tarjeta de trekking |

La miniatura de Ernestinho en TV ya estaba referenciada correctamente en Home y no se vuelve a contar como nueva. Las 10 fotos de Casa Histórica de Deodoro y MAST se incorporaron en un commit anterior y tampoco se cuentan en esta tanda.

## Búzios

El inventario contiene 30 miniaturas. Había 22 fuentes asociadas a tarjetas de temas; esta tanda asigna las 8 restantes a sus tarjetas existentes: Chile, resolver trámites, eventos, mascotas, Argentina, perfil de viaje, seguridad y accesibilidad. Buceo y bautismo permanecen apartados para la fase de Experiencias, como indicó el propietario.

## Comprobaciones y límites

- Las 66 rutas nuevas o corregidas de imagen aparecen como archivos en el listado de Hostinger; se comprobaron las asociaciones con las páginas y tarjetas indicadas.
- El entorno bloqueó las solicitudes HTTP salientes para comprobar el estado y tipo MIME de las imágenes. Esa comprobación en navegador sigue pendiente; no se declara verificación HTTP de extremo a extremo.
- The Maze, Atardeceres, Rapel, Plage Café, Merci y Casa Cândida ya tienen página y enlace desde su sección.
- Café Plage se documentó con información de Riotur y el perfil oficial de Plage Café. Merci se incluyó en Gastronomía porque las fuentes consultadas describen comida, coctelería y programación musical en Vogue Square.
- Los 31 archivos retenidos siguen pendientes de referencia válida por decisión del propietario. La auditoría total de las 3.085 fotos todavía requiere un recorrido del resto del sitio.

Además se reparó en Experiencias una referencia a Pedra do Sal: el nombre de la carpeta llevaba la tilde omitida y no coincidía con la ruta existente en Hostinger.

## Reconciliación de las 129 asignaciones

| Estado | Fotos únicas | Detalle |
|---|---:|---|
| Referencias ya existentes antes de esta ejecución | 23 | 22 miniaturas de Búzios y la miniatura de Ernestinho en TV |
| Referencias del commit previo de museos | 10 | 5 Casa Histórica de Deodoro y 5 MAST |
| Referencias nuevas de esta ejecución | 65 | 42 asignaciones originales, 12 rutas encontradas al cuadrar los grupos y 11 fotos de Casa Cândida |
| Apartadas por indicación del propietario | 31 | Penedo (7), buceo/bautismo (11) y Videos TV (13) |
| **Total** | **129** | 98 referenciadas + 31 apartadas |

Las 98 fotos referenciadas corresponden a 103 asociaciones página-foto; cuatro archivos tienen una segunda colocación válida en una tarjeta de sección.

La segunda tanda incorporó la miniatura de Búzios en Home; cinco fotos de Búzios en Goleta; cuatro fotos y la ficha propia de Boa Praça Leblon; y dos fotos y la ficha de la feria de Saens Peña. La unidad Leblon queda separada de la ficha existente de Ipanema. Esta tanda añadió Casa Cândida con sus 11 fotos propias; su tarjeta se genera desde el catálogo de hospedaje y su URL figura en el sitemap.


## Auditoría completa de referencias — 9 de octubre de 2026

Este corte recorre el inventario completo de Hostinger y el código de páginas de la rama. Una foto se considera referenciada únicamente si la ruta exacta aparece asociada a una página existente. La mera presencia en el inventario no cuenta como migración.

- **Fotos únicas en el inventario:** 3.085 rutas distintas de imágenes. Es unicidad por ruta; no se calcularon hashes de contenido para encontrar copias renombradas.
- **Fotos únicas con al menos una referencia válida:** 3.051.
- **Referencias válidas página-foto:** 3.303.
- **Archivos pendientes de referencia válida:** 34: 31 sin referencia exacta y 3 con diferencia de mayúsculas/minúsculas en una referencia directa.
- **Cobertura de código:** se revisaron 854 archivos fuente; el mapa de referencias masivas contiene 2.892 rutas para 453 páginas. Las páginas asociadas incluyen `assets/js/site.js`, que carga el integrador.
- Las asociaciones existen en el código y las rutas coinciden con el inventario, pero algunas fotos se muestran mediante una galería genérica insertada al final del contenido. Por ello, este conteo acredita referencia en la página, no la ubicación editorial exacta ni una comprobación visual de cada foto.
- La respuesta HTTP y el tipo MIME de las imágenes no se pudieron verificar desde este entorno. No se declara comprobación de carga extremo a extremo.
- No se cambió el código del sitio ni se desplegó a producción. Las tres rutas con diferencias de mayúsculas están en páginas congeladas y quedan fuera del conteo válido.

### Pendientes identificados

| Grupo | Archivos | Estado |
|---|---:|---|
| Buceo y bautismo de Búzios | 11 | Aplazados para Experiencias, por instrucción del propietario |
| Videos TV sin referencia | 11 | Aplazados; 2 elementos adicionales de esa carpeta ya tienen referencia en Televisión |
| Penedo | 7 | Fuera por instrucción del propietario |
| Restaurante con nombre UUID | 1 | Destino sin confirmar |
| Portada de Experiencia Búzios | 1 | Pendiente de confirmar destino; su página está congelada |
| Referencias con mayúsculas/minúsculas distintas | 3 | No cuentan como válidas: dos fotos de Casa Goia y la portada de Alquiler de Vehículo |
| **Total** | **34** | **Pendientes de referencia válida** |

Los CSV adjuntos registran por separado el inventario de fotos únicas, las asociaciones página-foto válidas y cada pendiente. Esta auditoría total complementa la reconciliación anterior de la lista de 129; no modifica sus conteos de esa tanda.
