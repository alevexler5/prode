# Plan de Desarrollo: Post-MVP Prode Mundial - Hardening y Beta

**Generado**: 2026-06-10 12:14 | **Contexto**: `base-context.md` | **Tipo**: Enhancement | **Stack**: Backend, Frontend, Database, DevOps, Testing, Docs

---

## Checklist de Desarrollo

**Nota**: Al completar tareas, los detalles se mueven a `completed-steps.md`.

### Fase 1: Entorno Local Reproducible

- [x] **Agregar Docker Compose para PostgreSQL**
  - Crear `docker-compose.yml` con servicio PostgreSQL.
  - Definir volumen persistente local.
  - Alinear credenciales con `backend/.env.example`.
  - Documentar comandos para levantar y resetear la base local.

- [x] **Crear primera migracion Prisma real**
  - Ejecutar migracion inicial a partir de `backend/prisma/schema.prisma`.
  - Confirmar que `prisma migrate dev` funciona desde cero.
  - Verificar que `npm run seed --workspace backend` carga admin y fixture.
  - Documentar el flujo completo en README.

- [x] **Agregar script de setup local**
  - Crear script npm raiz para setup completo: instalar, generar Prisma, migrar y seed.
  - Agregar scripts `db:migrate`, `db:seed`, `db:reset` si corresponde.
  - Mantener comandos claros para Windows/PowerShell.

- [ ] **Validar arranque backend + frontend**
  - Levantar backend contra PostgreSQL local.
  - Levantar frontend contra backend.
  - Confirmar Swagger en `/docs`.
  - Registrar errores encontrados y correcciones en `completed-steps.md`.

### Fase 2: Fixture y Datos del Mundial

- [x] **Normalizar modelo de equipos**
  - Evaluar si conviene agregar entidad `Team` o mantener strings.
  - Si se agrega `Team`, migrar fixture y predicciones sin romper flujo.
  - Definir nombres, codigos y grupo de cada seleccion.

- [x] **Completar fixture de fase de grupos**
  - Reemplazar fixture minimo por fixture completo disponible para fase de grupos.
  - Verificar fechas UTC, sedes, estadios y grupos.
  - Mantener partidos eliminatorios con placeholders no predecibles.

- [x] **Mejorar importador de fixture**
  - Agregar validaciones: IDs duplicados, kickoff invalido, partido confirmado sin equipos, placeholder habilitado por error.
  - Reportar resumen de importacion: creados, actualizados, omitidos.
  - Evitar sobrescribir resultados reales.

- [x] **Agregar tests del importador**
  - Fixture idempotente.
  - No duplicar partidos.
  - No habilitar placeholders.
  - Actualizar horario/sede sin tocar predicciones ni resultados.

### Fase 3: Backend - Robustez de Dominio

- [x] **Corregir y ampliar scoring de partidos**
  - Revisar casos de diferencia de gol vs ganador/empate para reglas excluyentes.
  - Confirmar comportamiento de empates exactos y empates no exactos.
  - Agregar tabla de ejemplos en tests.
  - Documentar si las reglas son excluyentes o acumulativas.

- [x] **Agregar tests de deadlines**
  - Casos: antes del cierre, exactamente en cierre, despues del cierre.
  - Partidos en `in_progress` y `finished`.
  - Partido no confirmado o con placeholders.
  - Usar reloj controlado o inyeccion de fecha para evitar tests fragiles.

- [x] **Agregar tests de ownership y auth**
  - Usuario no puede editar prediccion ajena.
  - Usuario no autenticado no puede crear predicciones.
  - Admin requerido para cargar resultados.
  - Usuario normal no puede recalcular grupos.

- [x] **Mejorar errores de dominio**
  - Definir codigos de error estables para frontend.
  - Diferenciar `MATCH_NOT_CONFIRMED`, `PREDICTION_LOCKED`, `ADMIN_REQUIRED`, `DUPLICATED_GROUP_TEAM`.
  - Mantener mensajes amigables.

- [x] **Agregar endpoint de estado operativo**
  - `GET /health`.
  - Verificar conexion a base de datos.
  - Usarlo para deploy y monitoreo basico.

### Fase 4: Backend - Admin y Operacion del Torneo

- [x] **Ampliar panel admin backend para partidos**
  - Endpoint para editar kickoff, sede, estadio y estado.
  - Endpoint para confirmar cruces eliminatorios y habilitar prediccion.
  - Validar que no se habiliten partidos sin equipos reales.

- [x] **Ampliar admin de resultados**
  - Permitir corregir resultado real con recalculo idempotente.
  - Registrar `updatedAt` y usuario admin que hizo el cambio si se agrega auditoria.
  - Devolver resumen de predicciones recalculadas.

- [x] **Mejorar carga de standings**
  - Validar posiciones unicas por grupo.
  - Validar una sola clasificacion por equipo.
  - Validar exactamente 8 mejores terceros al calcular.
  - Devolver resumen de puntos recalculados.

- [x] **Evaluar auditoria minima**
  - Agregar modelo `AdminActionLog` si resulta necesario.
  - Registrar carga/correccion de resultados, confirmacion de cruces y recalculos.
  - Mostrar ultimas acciones en admin o dejar solo en backend para beta.

### Fase 5: Frontend - Experiencia de Usuario

- [x] **Mejorar navegacion y sesion**
  - Manejar token expirado con redirect automatico a login.
  - Mostrar estado de usuario y total de puntos.
  - Agregar feedback claro de logout.

- [x] **Mejorar fixture**
  - Agrupar partidos por fecha/fase/grupo.
  - Agregar vista compacta para muchos partidos.
  - Mostrar countdown o fecha limite de prediccion.
  - Diferenciar visualmente confirmado, no confirmado, bloqueado y finalizado.

- [x] **Mejorar formulario de prediccion**
  - Evitar reset visual despues de guardar.
  - Mostrar confirmacion inline.
  - Deshabilitar envio si goles invalidos.
  - Mostrar error de backend con mensaje accionable.

- [x] **Mejorar predicciones de grupos**
  - Cargar predicciones existentes al abrir la vista.
  - Evitar duplicados por grupo desde UI.
  - Mostrar progreso: grupos completos y mejores terceros seleccionados.
  - Mostrar estado bloqueado cuando ya paso deadline.

- [x] **Mejorar ranking**
  - Resaltar usuario actual.
  - Agregar orden y columnas responsive.
  - Agregar detalle expandible por usuario o link a detalle.
  - Mostrar fecha de ultima actualizacion si el backend la provee.

### Fase 6: Frontend - Admin Beta

- [x] **Crear dashboard admin**
  - Resumen de partidos pendientes, bloqueados, finalizados y sin resultado.
  - Accesos a cargar resultado, confirmar cruces y standings.
  - Mostrar errores de permisos.

- [ ] **Crear formulario admin de resultados masivo**
  - Listar partidos finalizados/pendientes.
  - Permitir cargar varios resultados con confirmacion.
  - Mostrar resumen de recalculo.

- [x] **Crear formulario admin de standings**
  - Cargar posiciones por grupo.
  - Marcar clasificacion como primero, segundo, mejor tercero o eliminado.
  - Validar antes de enviar.

- [x] **Crear formulario admin de cruces**
  - Seleccionar partido con placeholders.
  - Elegir equipos reales.
  - Habilitar predicciones automaticamente.

### Fase 7: Testing Integral

- [ ] **Agregar tests e2e backend**
  - Auth completa.
  - Crear prediccion.
  - Bloquear prediccion.
  - Cargar resultado.
  - Ver ranking actualizado.

- [ ] **Agregar tests de API para grupos**
  - Guardar clasificados.
  - Bloquear deadline.
  - Cargar standings.
  - Calcular mejores terceros.
  - Ver ranking con puntos de grupos.

- [x] **Agregar smoke tests frontend**
  - Login/registro.
  - Fixture y prediccion.
  - Ranking.
  - Admin resultado.
  - Predicciones de grupos.

- [x] **Agregar datos de prueba controlados**
  - Fixtures especificos para tests.
  - Usuarios admin y usuario comun.
  - Partidos con distintas fechas relativas.

### Fase 8: Seguridad y Calidad

- [x] **Revisar vulnerabilidades npm**
  - Ejecutar `npm audit`.
  - Aplicar upgrades seguros.
  - Documentar vulnerabilidades que no puedan resolverse sin breaking changes.

- [x] **Agregar rate limiting basico**
  - Proteger login/register.
  - Evitar abuso de endpoints sensibles.
  - Documentar limites.

- [x] **Fortalecer validacion**
  - Revisar DTOs.
  - Validar strings vacios.
  - Normalizar emails.
  - Validar limites razonables de goles.

- [x] **Configurar logging basico**
  - Logs de errores backend.
  - No registrar tokens ni passwords.
  - Loguear operaciones admin de forma segura.

- [x] **Revisar CORS y secrets**
  - CORS por entorno.
  - `JWT_SECRET` obligatorio fuera de development.
  - `.env.example` completo y sin secretos reales.

### Fase 9: Preparacion de Deploy

- [ ] **Definir estrategia de deploy**
  - Elegir hosting para backend, frontend y base de datos.
  - Definir variables por entorno.
  - Documentar ambientes: local, staging, production.

- [x] **Agregar Dockerfile backend**
  - Build reproducible.
  - Ejecutar migraciones como paso separado, no implicito si se decide asi.
  - Healthcheck o endpoint `/health`.

- [ ] **Agregar build/deploy frontend**
  - Documentar build Vite.
  - Configurar `VITE_API_URL` por entorno.
  - Validar assets estaticos.

- [x] **Agregar CI basico**
  - Instalar dependencias.
  - Prisma generate.
  - Typecheck backend/frontend.
  - Tests.
  - Build backend/frontend.

### Fase 10: Documentacion y Cierre Beta

- [x] **Actualizar README completo**
  - Setup local con Docker Compose.
  - Migraciones y seed.
  - Usuarios iniciales.
  - Scripts.
  - Troubleshooting.

- [x] **Actualizar documentacion tecnica**
  - `.github/documentation/backend.md`
  - `.github/documentation/frontend.md`
  - `.github/documentation/database.md`
  - `.github/documentation/migrations.md`

- [x] **Crear guia operativa admin**
  - Como cargar resultados.
  - Como corregir resultados.
  - Como cargar standings.
  - Como confirmar cruces.
  - Como recalcular ranking.

- [x] **Crear checklist de beta**
  - Validacion funcional.
  - Validacion datos.
  - Seguridad basica.
  - Deploy staging.
  - Prueba con usuarios reales.

---

## Referencias

**Features similares**:

- MVP implementado: `docs/feature-NT-001-prode-mundial-mvp/`
- Backend actual: `backend/src`
- Frontend actual: `frontend/src`

**Documentacion consultada**:

- `PLAN_DESARROLLO_PRODE_MUNDIAL.md`
- `docs/feature-NT-001-prode-mundial-mvp/development-plan.md`
- `docs/feature-NT-001-prode-mundial-mvp/memory.md`
- `.github/documentation/backend.md`
- `.github/documentation/frontend.md`
- `.github/documentation/database.md`
- `.github/documentation/migrations.md`
- `.github/instructions/architecture.instructions.md`
- `.github/instructions/tech-stack.instructions.md`
- `.github/instructions/code-standards.instructions.md`

**Context7 usado**: No usado.

---

## Opciones de Ejecucion

1. **Paso a paso**: recomendado para Fase 1 y Fase 3, porque conectan entorno real y reglas sensibles.
2. **Por fases**: recomendado desde Fase 5 en adelante.
3. **Todo el plan**: no recomendado; este plan toca datos, seguridad, deploy y UX.

---

## Decisiones pendientes antes de implementar

- Confirmar si se usa Docker Compose local para PostgreSQL.
- Confirmar si se agrega entidad `Team` o se mantienen equipos como strings.
- Confirmar hosting objetivo para deploy.
- Confirmar si se implementa auditoria admin en esta etapa o se deja para un plan posterior.
- Confirmar herramienta para smoke/e2e frontend: Playwright recomendado.
