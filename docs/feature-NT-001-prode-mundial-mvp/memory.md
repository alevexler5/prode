# Memoria de Ejecucion: MVP Prode del Mundial

**Ultima actualizacion**: 2026-06-10 | **Plan**: `development-plan.md`

## Decisiones Tomadas

- **Gestor de paquetes**: se uso `npm` con workspaces para `backend` y `frontend`.
- **Backend**: se implemento NestJS con modulos por dominio.
- **Autenticacion**: se implemento JWT con Bearer Token, Passport strategy y guard privado.
- **Admin**: se uso `isAdmin` en `User` para proteger carga de resultados y calculo de grupos.
- **ORM/base**: se uso Prisma con provider PostgreSQL.
- **Fixture**: se agrego `backend/data/fixture.json` y seed idempotente.
- **Scoring**: las reglas viven en `ScoringService` y se cubrieron con tests unitarios.
- **Frontend**: se uso React + Vite + Sass, con cliente API por recurso.

## Cambios Durante Ejecucion

- Se reemplazo `lint` por `tsc --noEmit` en backend y frontend para evitar depender de una configuracion ESLint no definida.
- Se agrego `frontend/src/vite-env.d.ts` para tipar `import.meta.env`.
- Se dejo `RankingPage` y `ResultsPage` publicas; fixture, grupos y admin requieren sesion.

## Consideraciones Importantes

- El backend es la fuente final de verdad para bloqueo, ownership y scoring.
- Los horarios deben guardarse y compararse en UTC.
- Las reglas de puntaje deben vivir en el modulo `scoring`.
- La implementacion evita predecir partidos con placeholders.
- Antes de correr localmente hay que configurar PostgreSQL, aplicar migraciones y ejecutar seed.
- `npm install` reporto vulnerabilidades transitivas; revisar con `npm audit` antes de produccion.

## Referencias Adicionales

- `PLAN_DESARROLLO_PRODE_MUNDIAL.md`
- `.github/documentation/backend.md`
- `.github/documentation/frontend.md`
- `.github/documentation/database.md`
- `.github/documentation/migrations.md`
