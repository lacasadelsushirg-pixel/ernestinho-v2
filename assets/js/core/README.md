# Ernestinho Core — Fase 4 B1

Capa canónica V55. Aditiva: no reemplaza HTML rico hasta alcanzar paridad y QA.

Reglas:
- Un hecho existe una vez y puede tener muchas vistas editoriales.
- IDs: `ec:{kind}:{slug}`; el idioma nunca forma parte del ID.
- Lugar, barrio, playa, venue, producto, occurrence, signal y guide son conceptos distintos.
- Copy traducible vive separado de datos neutrales: es / pt-BR / en.
- Producción no mezcla silenciosamente un fallback ES dentro de otro idioma.
- UNKNOWN nunca equivale a SAFE ni a FALSE.
- Hechos sensibles/dinámicos requieren provenance/freshness a nivel de campo.
- Relaciones apuntan a IDs canónicos y no pueden quedar huérfanas.
- Alias no duplica contenido ni puede formar ciclos.
- Accesibilidad no es un booleano simple.
- Precios/disponibilidad de hospedaje permanecen ocultos según política.
- Secuencia, navegación, tiempos, narrativa y detours Premium no se almacenan en guías públicas.
- La migración conserva texto, fotos, URLs, mapas y notas; lo que no encaje va a migrationNotes, no se descarta.
