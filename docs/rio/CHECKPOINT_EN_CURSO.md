# Río — implementación en curso, 2026-10-06

Base local: `185c43bf0de0356276df8966bbb1bb3e90404162`.
Rama: `revision/rendimiento-traducciones-81a904c`.
Alcance vigente: `MASTER_RIO_20261005.md`, copia del prompt Texto pegado(9).

## Trabajo conservado

- Búzios integrado y publicado en la base, con Preview READY y acceso comprobado.
- Los 89 archivos de Búzios inventariados conservan sus hashes.
- Cuatro guías prácticas nuevas: mascotas, servicios prácticos, barracas/quiosques y estado del mar.
- Doce fichas nuevas de playa, cada una con textos ES/PT/EN propios, metadata y enlaces.
- Hubs de Playas y Consejos enlazan las doce fichas y las cuatro guías con microcopias ES/PT/EN; los destinos de los enlaces conservan su prefijo de idioma.
- QA de integración: 18 rutas (dos hubs y 16 destinos) × 3 idiomas, 54 HTML generados; 48 enlaces de destino comprobados, 0 fallos.
- Cinco hubs gastronómicos nuevos: padarias, casas de suco, espetinhos, lanches cariocas y fast food; conectados desde Gastronomía, con contenido ES/PT/EN y fuentes editoriales/oficiales.
- QA de hubs gastronómicos: seis rutas × 3 idiomas, 18 HTML generados; 15 páginas de guía con título, h1, OG de marca, enlaces de retorno y entradas de hub comprobadas; 0 fallos.
- Las 15 fichas de playas existentes recibieron profundidad editorial acumulativa en ES/PT/EN sin reemplazar el contenido anterior: criterio por tramo, mar/corrientes vs. balneabilidad, servicios y compañía, acceso y regreso.
- QA de playas existentes: 15 rutas × 3 idiomas, 45 HTML; títulos localizados, enlaces a INEA y guías prácticas correctos, imágenes originales preservadas y mapas iguales al origen; 0 fallos.
- Ruta de Arquitectura añadida e integrada en Cultura con ES/PT/EN, fuentes oficiales y SEO; 3 rutas × 3 idiomas (hub, destino, guía) generaron 9 HTML sin fallos. Fotografía propia pendiente.
- Cruceros profundizado en la ruta canónica existente `/guia/terminales/` en ES/PT/EN. Se descartó `/guia/cruceros/` porque duplicaba la ficha existente; Pier Mauá, VLT, MAR, Museu do Amanhã y AquaRio enlazan a sus fuentes oficiales.
- Profundidad editorial añadida a Copacabana, Ipanema, Leblon, Botafogo, Centro, Barra da Tijuca, Recreio, Santa Teresa, Lapa, Urca, Flamengo, Catete, Glória, Maracanã, São Cristóvão, Madureira, Lagoa, Jardim Botânico, São Conrado, Gávea y Guaratiba, además de CADEG, en los tres idiomas; 66 páginas generadas, enlaces locales y fotos originales verificados, 0 fallos.
- Profundidad práctica añadida a 11 fichas de Naturaleza (Bico do Papagaio, Catacumba, Circuito das Grutas, Dois Irmãos, Parque do Flamengo, Pedra Bonita, Pedra da Gávea, Pico da Tijuca, Pedra do Pontal, Cachoeira dos Primatas y Pedra do Telégrafo): 33 páginas ES/PT/EN generadas; URLs de fotos originales preservadas y estructura no textual sin cambios, 0 fallos. La revisión editorial integral de estas rutas sigue abierta.
- Profundidad práctica añadida a 13 páginas de Consejos (itinerarios, lluvia, calor, portugués, equipaje, horarios, compras y cobros, entre otros): 39 páginas ES/PT/EN generadas; fotos y estructura no textual preservadas, 0 fallos. La revisión editorial integral sigue abierta.
- Profundidad práctica añadida a 20 fichas de Vida Nocturna en dos tandas. La segunda cubre Cacique de Ramos, Fogo de Chão Botafogo, Ocya Ilha Primeira, Portela, Mangueira, Salgueiro, Renascença Clube, Vitrinni, Yoo2 y Leviano: 60 páginas ES/PT/EN generadas entre ambas; imágenes originales y estructura no textual preservadas, 0 fallos. Se añadieron orientación sobre formatos de evento, reglas de acceso, respeto a las escuelas de samba y logística de regreso. Revisión editorial integral aún abierta.
- Se añadieron fuentes oficiales Riotur, INEA y MetrôRio al inventario; las fichas no presentan como actuales horarios, servicios, estacionamiento ni condiciones del mar.
- Inventario inicial `FOTOS_PLAYAS_EXISTENTES.json`: 15 playas y 30 imágenes interiores registradas; sin reemplazos visuales. Las licencias no documentadas quedan señaladas y cualquier aprobación anterior debe respetarse.
- Inventario `FOTOS_GASTRONOMIA_NUEVOS_HUBS.json`: los cinco hubs sin fotografía aprobada; no se insertaron imágenes de relleno.
- Inventario de migración `FOTOS_CLOUDINARY_RIO_REEMPLAZO.json`: 618 páginas HTML de Río y 775 fuentes compartidas escaneadas, excluyendo Búzios; 4.796 referencias al host anterior, 2.064 variantes de URL y 1.885 IDs de imagen agrupables. Pausado por indicación del usuario hasta que entregue el commit de migración; no cambiar ahora fotos ni referencias.
- Priorización solicitada de fotos (`FOTOS_RIO_PRIORIDAD_URGENTE.json`): restaurantes 1.073 IDs; museos/cultura 169; atracciones 9; experiencias 58; vida nocturna 1. Registra rutas y referencias del servidor anterior. El cruce con Cloudflare queda pendiente del commit con las nuevas URLs; sin cambios públicos.
- Fuentes concretas en `FUENTES_NUEVAS_GUIAS.json`; no implican permiso de reutilizar fotos.
- Sin cambios de fotografías existentes, main o producción.
- El checkpoint local reúne el trabajo de Río acumulado hasta esta revisión. No se hizo push ni deploy; el alcance integral sigue incompleto.

## Comprobaciones realizadas

- Build multilingüe completo: 2.070 páginas HTML generadas (ES/PT-BR/EN), 683 URLs indexables por idioma y 2.049 URLs en el sitemap. Sin errores de generación.

- Segunda tanda de profundidad de Vida Nocturna: 10 rutas × 3 idiomas = 30 HTML; traducciones ES/PT/EN presentes, una sola nota práctica añadida por ruta, imágenes Cloudinary idénticas a HEAD y etiquetas no textuales sin cambios; 0 fallos.
- Guías de Accesibilidad, Emergencias, Seguro, Vacunas y Viajar Solo: 5 rutas × 3 idiomas = 15 HTML; se añadieron instrucciones prácticas, se registraron fuentes oficiales para transporte de accesibilidad, emergencias y vacunación, y se verificó que el archivo original sólo cambió por el nuevo párrafo; fotos preservadas, 0 fallos. Build acumulado: 258 páginas generadas.
- Cobertura de matriz tras esta tanda: 146/165 rutas con trabajo registrado (88%); 19 siguen PENDIENTE. Es cobertura de rutas con trabajo registrado, no porcentaje de cierre del proyecto; la revisión editorial integral y el QA completo siguen abiertos.
- QA estático del build completo: 1.860 páginas de Río aprobadas; 0 errores en Río. El auditor registra 57 faltantes de `og:image` en páginas congeladas de Búzios; Búzios permanece intacto y fuera de alcance. Por eso el auditor global devuelve fallo aunque las rutas de Río pasan.
- Para las 12 playas nuevas y 4 guías prácticas, el `og:image` usa el recurso de marca local ya existente (`/assets/brand/ec-mark.png`): 48 versiones ES/PT/EN pasan el chequeo de imagen. La fotografía editorial propia sigue pendiente; no se migraron ni reemplazaron fotos.
- La auditoría estática comprobó metadata, hreflang recíproco, sitemap y destinos de enlaces locales. QA visual desktop/móvil y consola del navegador siguen pendientes; no declarar el cierre integral.

- Familia: profundidad editorial añadida a `/familia/` y `/familia/lluvia/` en ES/PT/EN; se conservan tarjetas, estructura y fotos originales. 6 páginas de idioma comprobadas; Alerta Rio añadida como fuente para decidir ante lluvia intensa.
- Sítio Roberto Burle Marx: orientación práctica sobre recorrido a pie, desnivel, reserva y regreso añadida en ES/PT/EN; 3 páginas comprobadas, fotos y estructura original preservadas, fuentes oficiales registradas.
- Compras: el Mercadão de Madureira se integró al hub existente con una recomendación de visita por zona y verificación operativa; ES/PT/EN, 3 páginas, sin ruta duplicada ni cambios visuales.
- Eventos: Rock in Rio 2026 pasó a archivo tras cierre oficial y se registró que el próximo regreso anunciado es 2028, con fechas pendientes. Se eliminaron marcadores de horario futuro; fuente y traducciones ES/PT/EN incorporadas.
- Vida Nocturna: el buscador del hub mostraba 46 fichas y 50 resultados iniciales, aunque la lista visible contiene 45 tarjetas. Se sincronizaron los tres conteos en ES/PT/EN sin alterar tarjetas, rutas ni fotos; el resultado inicial ahora coincide con las 45 fichas listadas.
- Comuna (Botafogo): el archivo mantiene el cierre de 2020 y enlaza al negocio actual del mismo inmueble, Chopperia Botafogo, abierto a fines de 2025 según VEJA Rio. Fuente registrada; imagen del archivo preservada.
- Canastra Bar (Ipanema): corregí el JSON-LD que aún describía como activo al antiguo bar; ahora coincide con la ficha de archivo y su sucesor Pizzaria Canastra. Se guardó la referencia de reseña reciente solo para verificar identidad/cierre; sin cambiar fotos.
- Galeria Café (Ipanema): el JSON-LD ahora refleja el cierre anunciado en febrero de 2026 y el carácter archivado de la ficha. Registré la nota de VEJA Rio basada en el anuncio de una socia; fotos intactas.
- Xepa (Botafogo): añadí una guía breve para elegir petiscos y un drinque, con enlaces directos a Riotur y VEJA y una nota para confirmar precios (revisados por VEJA en junio de 2026). Traducciones ES/PT/EN; galería original preservada.
- CPF para extranjeros: contrasté la guía existente con tres páginas vigentes de Receita Federal (elegibilidad/cuotas, solicitud desde el exterior y atención presencial para casos de pasaporte) y registré fuentes oficiales. Mantiene el contenido ya desarrollado en ES/PT/EN.
- Bosque Bar (Gávea): añadí en ES/PT/EN las reglas vigentes del FAQ oficial (18+, artículos prohibidos y cierre de puertas), con enlace directo al FAQ. Se generaron y comprobaron las tres páginas; fotos, disposición y resto de la ficha permanecen intactos.
- Brewteco Botafogo: corregí la cifra desactualizada de 24 canillas a las 22 que publica la propia marca y añadí su programación musical semanal en ES/PT/EN, con recomendación de confirmar la fecha. Fuentes oficiales registradas; galería y disposición preservadas.
- Carioca da Gema: precisé horarios de apertura y shows por día, enlacé la política oficial de cancelación de entradas (hasta 24 horas antes y sin cambio por otra fecha) y registré ambas fuentes. Tres idiomas comprobados; fotos y disposición intactas.
- Cultura: la entrada de la Pequena África conecta la ficha del MUHCAB y la guía portuaria, con contexto de memoria afrobrasileña apoyado por la Prefeitura/MUHCAB y UNESCO; sin nuevas rutas ni cambios de imágenes.
- Sintaxis de módulos nuevos y enlaces internos de las 16 rutas.
- QA runtime previo de 16 rutas × 3 idiomas × 2 anchos: 96 combinaciones, 0 fallos.
- Build reciente de integración: 18 rutas × 3 idiomas, 54 HTML; hubs enlazan 12 playas y cuatro consejos en ES/PT/EN.
- Build adicional: seis rutas gastronómicas × 3 idiomas, 18 HTML; cinco hubs nuevos enlazados en Gastronomía en ES/PT/EN.
- Build editorial existente: 15 playas × 3 idiomas, 45 HTML; imágenes y mapas comparados contra HEAD, enlaces localizados comprobados; 0 fallos.
- Build cultura/arquitectura/terminales: 3 rutas × 3 idiomas, 9 HTML; rutas localizadas, SEO técnico y copias ES/PT/EN verificados; 0 fallos.
- Build de barrios prioritarios: 22 rutas × 3 idiomas, 66 HTML; traducciones, fotos y rutas de transporte revisadas; 0 fallos. Las cuatro últimas tandas añadieron 17 rutas × 3 idiomas con orientación de visita y regreso específica de cada barrio.
- QA de toda la sección Barrios: 37 rutas (hub + 36 fichas) × 3 idiomas, 111 HTML. Corregido `assets/js/barrios-editorial.js`: EN mostraba `undefined` en historia y ES/PT mezclaban los párrafos. Verificados los textos ES/PT/EN, metadata, hreflang, 969 enlaces de Barrios (0 rotos) e imágenes fuente frente a HEAD; 0 fallos.
- Nueva pasada editorial en Ilha da Gigóia, Jacarepaguá, Laranjeiras, Sepetiba, Tijuca y Vargens: 6 rutas × 3 idiomas = 18 HTML revisados; orientación de acceso, planificación y regreso añadida al layout existente. Metadata/hreflang y referencias de imagen originales verificados; 0 fallos.
- Profundización de ocho páginas de zonas combinadas (Barra Oeste, Botafogo/Urca, Centro/Mauá, Flamengo/Glória, Gávea/Jardim Botânico/Lagoa, Ipanema/Leblon, Santa Teresa/Lapa y Zona Norte): 8 rutas × 3 idiomas = 24 HTML revisados; consejos de planificación integrados sin cambiar layout ni imágenes, 0 fallos.
- Este resultado no equivale al QA integral editorial/fotográfico del prompt maestro. `npm run check:locales` se ejecutó contra el último build piloto, que sólo materializa 18 HTML; reporta faltantes de las demás 664 rutas del sitio y no sirve como auditoría global en ese estado.
- Los últimos ajustes de mapa de acceso de las selvagens y la palabra española «caminata» se regeneran con el escritor ES y el build parcial.

## Continuar sin reiniciar

1. Conservar las rutas y diccionarios nuevos. No usar checkout remoto, reset ni reconstrucción.
2. Profundidad de las 15 playas existentes completada y registrada en la matriz; la revisión editorial integral y las fuentes/licencias fotográficas siguen abiertas, respetando imágenes ya aprobadas.
3. Arquitectura integrada a Cultura; cruceros profundizado en Terminales; 36 fichas de barrio y polos con profundidad editorial añadida. Playas y guías prioritarias tienen lotes editoriales con QA localizado; seguir cubriendo páginas pendientes de familia, compras, cultura, naturaleza y vida nocturna.
4. Dejar en pausa cualquier trabajo de fotos o servidor hasta recibir el commit nuevo del usuario. Búzios queda fuera.
5. Completar las dos pasadas de QA integral, sincronizar el HEAD sin sobrescribir avances remotos y publicar un solo commit lógico cuando el alcance esté completo.

Respaldo lógico adicional fuera del repositorio: `../integration-backup/rio-new-guides-20261005.tar.gz` (29 archivos nuevos al momento de crearlo). El árbol local contiene los ajustes posteriores; conservar ambos.

## Herramientas de esta implementación

`scripts/write_rio_practical.mjs` escribe únicamente ES desde diccionarios nuevos. `--beaches` selecciona las doce playas. PT/EN continúan generándose mediante el build multilingüe existente; no se mantienen tres copias de HTML.

Datos de ruta: `assets/js/translations/rio-practical.js` y `rio-beaches.js`.
Mensajes comunes: `rio-page-messages.js`.
Renderer: `assets/js/rio-practical-page.js`.
Estilo limitado a las guías nuevas: `assets/css/rio-practical.css`.

Los archivos nuevos no deben descartarse por estar todavía sin seguimiento Git.
