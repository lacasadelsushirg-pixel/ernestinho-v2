# Actualizar la biblioteca del Carioc-IA

Las respuestas quedan en `assets/js/carioc-ia-library.js`; las respuestas generales existentes continúan en `assets/js/carioc-ia-knowledge.js`. El reconocimiento está en `assets/js/carioc-ia-engine.js`. El widget está en `assets/js/carioc-ia.js`.

## Añadir una intención

1. Confirma que la información está aprobada en una página existente. Registra esa página en `source` y, si aporta una acción útil, enlázala.
2. Añade un `item(...)` con un `id` único, una categoría existente, preguntas naturales en ES/PT/EN y respuestas en los tres idiomas.
3. Incluye sinónimos y formas comunes de preguntar. Evita palabras genéricas aisladas que puedan capturar otro tema. La normalización ignora acentos y puntuación y compara palabras completas.
4. Marca la respuesta verificada con `status: "approved"` y `reviewedOn: "AAAA-MM-DD"`. No declares verificado lo que la página fuente no confirma.

Ejemplo:

```js
item(
  "cristo_accessibility",
  "attractions",
  ["el cristo es accesible", "is christ the redeemer accessible", "o cristo é acessível"],
  t("Respuesta aprobada en español.", "Resposta aprovada em português.", "Approved answer in English."),
  [link("/atracciones/cristo-redentor/", "Guía del Cristo", "Guia do Cristo", "Christ the Redeemer guide")],
  { source: ["/atracciones/cristo-redentor/"], priority: 0 }
)
```

El helper `item` usa por defecto las rutas enlazadas como fuentes y marca la fecha de revisión del lote. Si la fuente difiere del enlace, pásala en `options.source`.

## Preguntas y seguimiento

- Añade frases completas y equivalentes en ES, PT y EN. Evita depender de una coincidencia aislada como `hoy`, `tour`, `centro` o `precio`.
- Para una pregunta de seguimiento, añade la opción a `FOLLOWUP_MAPS` y devuelve un `contextUpdate` desde `resolveQuestion`. Guarda solo el contexto mínimo y en memoria.
- Las intenciones `pending` quedan fuera de `ACTIVE_INTENTS`: se validan como borradores, pero no se muestran al visitante. Añade la fuente que falta. Al aprobarlas, completa idiomas, enlaces y fecha y cambia el estado a `approved`.

## Consultas comerciales y WhatsApp

- No cambies el teléfono comercial sin autorización expresa.
- Ofrece WhatsApp aunque la persona no complete datos.
- Solo se prellenan una experiencia reconocida, una fecha numérica y el tamaño del grupo. Se conservan en memoria de la página, nunca en `localStorage` ni `sessionStorage`, y solo aparecen en el mensaje si la persona abre WhatsApp.
- Construye el enlace con `buildWhatsAppHref` en `assets/js/carioc-ia-whatsapp.js`; el texto base y las etiquetas están localizados en ES/PT/EN.
- No pidas documentos ni datos bancarios y no confirmes disponibilidad ni reservas.

## Enlaces y fuentes

Usa rutas internas existentes y etiquetas ES/PT/EN. `source` identifica la página que respalda la respuesta. No agregues afirmaciones que esa ficha no confirme. Para información aún no aprobada, deja la intención como `pending` o registra el tema en una propuesta editorial; no actives esa respuesta.

## Pruebas antes de integrar

```bash
npm run test:cariocia
node --check assets/js/carioc-ia.js
node --check assets/js/carioc-ia-engine.js
node --check assets/js/carioc-ia-library.js
node --check assets/js/carioc-ia-whatsapp.js
git diff --check
```

La matriz verifica preguntas, ambigüedad, fallbacks, seguimiento, idiomas, fuentes y rutas, además del enlace de WhatsApp. Actualízala cuando cambie una respuesta crítica. Las pruebas de código no sustituyen la revisión visual en escritorio y Safari móvil.

## Evitar conflictos

Antes de editar, revisa `git status`, la rama y el HEAD remoto y guarda una copia de los cambios locales. Compara en GitHub el motor, widget, biblioteca, conocimiento, helper de WhatsApp y referencias de caché; integra únicamente cambios compatibles. No cambies de rama, no hagas rollback ni reemplaces el repositorio por una copia anterior. Mantén CSS y estructura visual fuera de esta tanda salvo autorización concreta.
