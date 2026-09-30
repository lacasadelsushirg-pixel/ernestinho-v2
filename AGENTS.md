# Ernestinho: conservación obligatoria

El usuario ha congelado el contenido, diseño, fotografías, banners, widgets, enlaces y estructura aprobados. Traducir NO autoriza reescribir, sustituir, simplificar ni eliminar ninguno de esos elementos.

Antes de trabajar, ejecutar git fetch origin y confirmar que la base contiene el commit de recuperación registrado en docs/RECOVERY_20260930.md. No iniciar desde main o un checkout antiguo ni sustituir directorios completos con una versión histórica.

Las traducciones deben hacerse en los diccionarios de assets/js/translations/, conservando el HTML aprobado. Cualquier cambio de HTML, estilos, imágenes, widgets o contenido cerrado requiere autorización expresa del usuario para ese cambio concreto.

Ejecutar python scripts/check_frozen_pages.py antes de cada commit/deploy. No regenerar el manifiesto para esconder cambios. Si falla, restaurar los elementos protegidos y conservar únicamente las traducciones autorizadas.

No hacer force-push ni rollback global: posteriores avances de Experiencias, Playas, Familia, Eventos y otras áreas deben conservarse.
