# Memoria de Ejecucion: Post-MVP Prode Mundial - Hardening y Beta

**Ultima actualizacion**: 2026-06-10 | **Plan**: `development-plan.md`

## Decisiones Tomadas

- Este plan continua sobre el MVP ya implementado en `docs/feature-NT-001-prode-mundial-mvp/`.
- Se mantuvo el stack original: npm workspaces, NestJS, Prisma/PostgreSQL, JWT, React, Vite y Sass.
- Se agrego `Team` para normalizar selecciones y `AdminActionLog` para auditoria operativa minima.
- El scoring de partidos quedo definido como **excluyente**: exacto 5, ganador/empate 3, misma diferencia de gol 2, goles de un equipo 1, nada 0.
- `JWT_SECRET` pasa a ser obligatorio y ya no puede quedar con el valor de desarrollo fuera de `NODE_ENV=development`.
- `CORS_ORIGIN` admite lista separada por comas para contemplar ambientes beta o staging.

## Cambios Durante Ejecucion

- Se agregaron `docker-compose.yml`, `backend/Dockerfile`, workflow de CI y scripts raiz para setup local, migraciones, seed y reset.
- Se creo migracion Prisma inicial real y se amplio el schema con `Team` y `AdminActionLog`.
- Se reemplazo el fixture minimo por un fixture de grupos mas grande y se reforzo el importador con validaciones e idempotencia.
- Se agregaron endpoint `/health`, rate limiting para auth, filtro global de errores y codigos de negocio estables para frontend.
- Se ampliaron endpoints admin para editar partidos, confirmar cruces, corregir resultados y recalcular standings de grupos con auditoria.
- Se mejoro el frontend con expiracion de sesion manejada, fixture agrupado por fecha, confirmaciones inline, ranking con highlight del usuario y panel admin con resumen operativo.
- Se agregaron tests unitarios para importador, scoring, deadlines, ownership/auth, guards y configuracion de runtime.
- Se documento la operacion admin, el checklist beta y las decisiones de seguridad sobre `npm audit`.

## Consideraciones Importantes

- La validacion de arranque real backend + frontend contra PostgreSQL local sigue pendiente porque en este entorno no hay Docker disponible.
- Los pendientes mas grandes del plan quedaron concentrados en e2e backend, formulario admin de carga masiva de resultados y estrategia de deploy.
- No se aplicaron upgrades semver-major sugeridos por `npm audit` para no introducir breaking changes de NestJS o Prisma en esta etapa.

## Referencias Adicionales

- `docs/feature-NT-001-prode-mundial-mvp/memory.md`
- `docs/feature-NT-001-prode-mundial-mvp/completed-steps.md`
- `backend/prisma/schema.prisma`
- `backend/src`
- `frontend/src`
