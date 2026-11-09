# Publicación protegida de Ernestinho Carioca — 9 noviembre 2026

## Qué se protege automáticamente
La compilación de Hostinger se detiene ANTES de generar/persistir contenido cuando `scripts/guard_approved_content.mjs` detecta:
- cambios nuevos en cualquiera de las 586 páginas del registro, respecto de la última versión **efectivamente publicada** en Hostinger (commit `02968a27acd166e06b66c95df8f20074de881429`), mediante el snapshot provisional `docs/PUBLISHED_PROTECTION_SNAPSHOT_20261109.json`;
- cambios en el registro de aprobaciones histórico **o** en el snapshot de publicación provisional (ambos anclados dentro del guard);
- cambios en los recursos compartidos críticos de cabecera, estilos, idioma, portada y ruta /quiero/ enumerados en el guard.

El guard se ejecuta con `node scripts/guard_approved_content.mjs` y en CI. **Hallazgo previo:** el manifiesto histórico ya difería en 246 de 586 archivos antes de instalar la barrera; estos 246 NO se consideran aprobados. Para seguir publicando mejoras ajenas sin darles aprobación, el guard bloquea cambios NUEVOS frente al último código publicado y deja intactos los hashes históricos. Ejecutar `node scripts/report_legacy_approval_drift.mjs` para obtener el inventario completo. GitHub Actions publica ese informe como artefacto. Los 246 deben revisarse individualmente, sin actualizar hashes en masa.

## Reglas para los asistentes y Work
1. No tocar páginas aprobadas ni recursos críticos sin autorización *específica* del propietario para cada grupo de cambios. Solicitar autorización ANTES, no después.
2. Los destinos regionales aún en desarrollo pueden seguir recibiendo mejoras sin cambiar la portada y las páginas congeladas. Al aprobarse formalmente un destino o módulo, agregar su snapshot al sistema de protección.
3. No actualizar automáticamente los hashes ni el guard ni el workflow. Si hay una modificación legítima, documentar solicitud, rutas, cambios exactos, prueba visual escritorio/móvil y decisión de aprobación en un PR dedicado.
4. No publicar con `npm run build` ignorando errores; Hostinger debe conservar el despliegue anterior cuando falla la validación. No hacer rollback global ni forzar branch refs.
5. Verificar incrementalidad: una mejora local no debe obligar a recompilar 3.522 páginas si puede evitarse.

## Límite de la protección y paso administrativo obligatorio
Las comprobaciones en el repositorio NO son una autorización criptográfica ni evitan que alguien con permiso de escritura cambie a la vez el guard o el workflow.
Para impedir que Work u otro agente eluda la barrera hay que configurar en GitHub **Settings → Rules → Rulesets** (o Branch protection):
- rama `revision/rendimiento-traducciones-81a904c`: exigir pull request y aprobación de una persona humana distinta de la identidad usada por los agentes;
- exigir el estado verde del workflow `Protect approved content`, prohibir force-push y eludir/bypassear reglas;
- proteger `AGENTS.md`, `scripts/build_multilingual.mjs`, `scripts/guard_approved_content.mjs`, `docs/FROZEN_PAGES_20260930.json` y `.github/workflows/protect-approved.yml` con revisión humana obligatoria;
- conectar publicación Hostinger únicamente a commits que pasen esas verificaciones (revisar política de despliegue automático de Hostinger).

**Sin las reglas de rama y el gate anterior a Hostinger, el control reduce errores involuntarios, pero un agente con permisos puede modificar el mecanismo.**

## Verificaciones de regresión adicionales
Los hashes detectan sustitución/ausencia de contenido fuente, pero no garantizan que una foto remota responda HTTP 200, que el texto se vea bien en el navegador, ni que un componente compartido fuera de la lista no afecte la web. Acompañar con capturas visuales 1440/390 px, prueba de carga de fotos y enlaces, y revisión de las rutas regionales antes de su aprobación final.
