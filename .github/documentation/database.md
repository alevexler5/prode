# Database - Modelo de datos

La base de datos del Prode del Mundial debe persistir usuarios, partidos, predicciones, resultados reales, clasificaciones de grupo y ranking.

Fuente principal: `PLAN_DESARROLLO_PRODE_MUNDIAL.md`.

## Reglas generales

- Usar base relacional.
- Definir ORM al inicializar el proyecto, recomendado Prisma o TypeORM.
- Evolucionar schema solo con migraciones.
- Guardar fechas en UTC.
- Usar indices para consultas de ranking, usuario, partido y filtros de fixture.
- Evitar borrar datos historicos que afecten puntajes.

## Entidades nuevas post-MVP

Ademas del modelo inicial, la base ya contempla:

- `Team`: catalogo de selecciones con codigo, nombre y grupo.
- `AdminActionLog`: auditoria minima de operaciones administrativas.

## Entidades principales

### User

Campos sugeridos:

- `id`
- `name`
- `email`
- `passwordHash`
- `totalPoints`
- `createdAt`
- `updatedAt`

Reglas:

- `email` debe ser unico.
- `passwordHash` nunca se expone por API.
- `totalPoints` puede recalcularse desde predicciones si hace falta.

### Match

Campos sugeridos:

- `id`
- `phase`
- `group`
- `homeTeam`
- `awayTeam`
- `homePlaceholder`
- `awayPlaceholder`
- `kickoff`
- `venue`
- `stadium`
- `status`
- `isPredictionEnabled`
- `realHomeScore`
- `realAwayScore`
- `createdAt`
- `updatedAt`

Estados sugeridos:

- `scheduled`
- `blocked`
- `in_progress`
- `finished`

Reglas:

- Si tiene placeholders y no equipos definidos, no admite prediccion.
- `kickoff` debe guardarse en UTC.
- `isPredictionEnabled` debe ser falso hasta que el partido este confirmado.
- Puede recibir correcciones administrativas de kickoff, sede, estadio y estado.

### Prediction

Campos sugeridos:

- `id`
- `userId`
- `matchId`
- `predictedHomeScore`
- `predictedAwayScore`
- `points`
- `exactHit`
- `outcomeHit`
- `createdAt`
- `updatedAt`

Reglas:

- Un usuario solo puede tener una prediccion por partido.
- La combinacion `userId + matchId` debe ser unica.
- `points` se calcula cuando existe resultado real.

### GroupPrediction

Campos sugeridos:

- `id`
- `userId`
- `group`
- `predictedFirstTeam`
- `predictedSecondTeam`
- `points`
- `createdAt`
- `updatedAt`

Reglas:

- Un usuario debe tener una prediccion por grupo.
- No puede repetir el mismo equipo como primero y segundo.
- Se calcula al finalizar la fase de grupos.

### BestThirdsPrediction

Campos sugeridos:

- `id`
- `userId`
- `predictedTeams`
- `points`
- `createdAt`
- `updatedAt`

Reglas:

- Debe contener 8 equipos.
- No debe contener equipos duplicados.
- Se calcula comparando contra los 8 mejores terceros reales.

### GroupStanding

Campos sugeridos:

- `id`
- `group`
- `team`
- `position`
- `points`
- `goalDifference`
- `goalsFor`
- `qualifiedAs`
- `createdAt`
- `updatedAt`

Valores sugeridos para `qualifiedAs`:

- `group_winner`
- `group_runner_up`
- `best_third`
- `eliminated`

### Team

Campos sugeridos:

- `id`
- `code`
- `name`
- `group`
- `createdAt`
- `updatedAt`

Reglas:

- `code` y `name` unicos.
- Sirve para normalizar fixture, picks y standings.

### AdminActionLog

Campos sugeridos:

- `id`
- `userId`
- `action`
- `entity`
- `entityId`
- `details`
- `createdAt`

Reglas:

- No reemplaza logs tecnicos; guarda auditoria funcional.
- Debe registrar cambios administrativos sensibles.

## Relaciones

- Un `User` tiene muchas `Prediction`.
- Un `Match` tiene muchas `Prediction`.
- Un `User` tiene muchas `GroupPrediction`.
- Un `User` tiene una `BestThirdsPrediction`.
- `GroupStanding` representa la tabla real de cada grupo al finalizar la fase.
- Un `User` puede tener muchas `AdminActionLog`.

## Indices recomendados

- `users.email`
- `matches.kickoff`
- `matches.phase`
- `matches.group`
- `matches.status`
- `matches.isPredictionEnabled`
- `predictions.userId`
- `predictions.matchId`
- `predictions.userId + predictions.matchId`
- `group_predictions.userId`
- `group_predictions.group`
- `group_standings.group`
- `group_standings.position`
- `group_standings.qualifiedAs`
- `teams.code`
- `teams.group`
- `admin_action_logs.userId`
- `admin_action_logs.entity`
- `admin_action_logs.entityId`

## Recalculo

El modelo debe permitir recalcular:

- Puntos de un partido si cambia el resultado real.
- Puntos de grupos si se corrige una tabla.
- Puntaje total de usuarios.
- Ranking completo.

Recomendacion:

- Guardar puntos por prediccion para consultas rapidas.
- Mantener funciones de recalculo idempotentes.
