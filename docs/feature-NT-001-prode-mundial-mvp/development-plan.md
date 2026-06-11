# Plan de Desarrollo: MVP Prode del Mundial

**Generado**: 2026-06-10 11:47 | **Contexto**: `base-context.md` | **Tipo**: Feature | **Stack**: Backend, Frontend, Database, Testing, Docs

---

## Checklist de Desarrollo

**Nota**: Al completar tareas, los detalles se mueven a `completed-steps.md`.

### Fase 1: Scaffold y decisiones base

- [x] **Crear estructura de monorepo**
  - Definir carpetas `backend/` y `frontend/`.
  - Inicializar backend NestJS con TypeScript.
  - Inicializar frontend React con TypeScript y Sass.
  - Definir gestor de paquetes: recomendado `pnpm` o `npm`.
  - Agregar scripts base para desarrollo, test, lint y build.

- [x] **Definir variables de entorno y configuracion**
  - Backend: puerto, JWT secret o secret de sesion, URL de base de datos, entorno.
  - Frontend: URL base de API.
  - Agregar ejemplos `.env.example` sin secretos reales.

- [x] **Configurar Swagger en NestJS**
  - Publicar documentacion en `/docs`.
  - Documentar autenticacion Bearer si se usa JWT.
  - Agregar tags por modulo: Auth, Users, Matches, Predictions, Group Predictions, Ranking.

- [x] **Elegir y configurar ORM relacional**
  - Recomendado: Prisma por migraciones, tipado y velocidad de MVP.
  - Crear estructura inicial de schema y migraciones.
  - Si se elige TypeORM, ajustar naming de entidades y migrations antes de avanzar.

### Fase 2: Modelo de datos, migraciones y fixture

- [x] **Crear schema de usuarios**
  - Entidad `User`: `id`, `name`, `email`, `passwordHash`, `totalPoints`, timestamps.
  - Indice unico para `email`.
  - Preparar campo de rol o flag admin si se implementa panel administrativo basico.

- [x] **Crear schema de partidos**
  - Entidad `Match`: fase, grupo, equipos, placeholders, kickoff UTC, sede, estadio, estado, resultado real e `isPredictionEnabled`.
  - Indices por `kickoff`, `phase`, `group`, `status` e `isPredictionEnabled`.
  - Estados: `scheduled`, `blocked`, `in_progress`, `finished`.

- [x] **Crear schema de predicciones de partidos**
  - Entidad `Prediction` con relacion a `User` y `Match`.
  - Campos: goles predichos, puntos, `exactHit`, `outcomeHit`, timestamps.
  - Constraint unica `userId + matchId`.

- [x] **Crear schema de predicciones de grupos**
  - Entidad `GroupPrediction`: usuario, grupo, primero, segundo, puntos.
  - Entidad `BestThirdsPrediction`: usuario, lista simple de 8 equipos y puntos.
  - Validar no duplicar primero/segundo ni equipos de mejores terceros.

- [x] **Crear schema de standings reales**
  - Entidad `GroupStanding`: grupo, equipo, posicion, puntos, diferencia de gol, goles a favor y `qualifiedAs`.
  - Valores de `qualifiedAs`: `group_winner`, `group_runner_up`, `best_third`, `eliminated`.

- [x] **Preparar fixture JSON inicial**
  - Crear archivo de datos inicial con partidos de fase de grupos confirmados.
  - Permitir placeholders para eliminatorias visibles pero no predecibles.
  - Asegurar que todo `kickoff` este en UTC.

- [x] **Crear seeder/importador de fixture**
  - Carga idempotente.
  - No duplicar partidos.
  - No sobrescribir resultados reales ni predicciones de usuarios.
  - Permitir actualizar datos no destructivos como sede u horario.

### Fase 3: Backend base y autenticacion

- [x] **Crear modulo `auth`**
  - Endpoints: `POST /auth/register`, `POST /auth/login`, `GET /auth/me`.
  - Hash de contrasenas.
  - DTOs con validaciones y ejemplos Swagger.
  - No exponer `passwordHash`.

- [x] **Crear modulo `users`**
  - Service para busqueda por email/id.
  - Persistencia de usuarios.
  - Response segura para usuario actual.

- [x] **Configurar autorizacion**
  - Guard para rutas privadas.
  - Decorator/helper para obtener usuario actual.
  - Validar ownership en predicciones.
  - Definir proteccion admin para carga de resultados reales.

### Fase 4: Backend de partidos y predicciones

- [x] **Crear modulo `matches`**
  - Endpoints: `GET /matches`, `GET /matches/:id`, `GET /matches/available-for-prediction`.
  - Filtros por fase, grupo, fecha, equipo y estado.
  - Exponer si el partido esta confirmado y si admite prediccion.

- [x] **Implementar habilitacion de partidos confirmados**
  - Fase de grupos: habilitada desde el fixture si equipos estan definidos.
  - Eliminatorias: no habilitadas mientras existan placeholders.
  - Metodo administrativo o service interno para marcar partido como confirmado.

- [x] **Crear modulo `predictions`**
  - Endpoints: `GET /predictions/me`, `POST /predictions/:matchId`, `PUT /predictions/:matchId`.
  - Validar goles no negativos.
  - Validar partido confirmado.
  - Validar deadline `kickoff - 15 minutos`.
  - Validar una prediccion por usuario/partido.

- [x] **Implementar bloqueo por deadline**
  - Calculo siempre en backend con fechas UTC.
  - Error claro para partido bloqueado.
  - Tests de casos antes, justo en, y despues del deadline.

### Fase 5: Scoring, resultados reales y ranking

- [x] **Crear modulo `scoring`**
  - Funcion pura para puntaje de partido.
  - Reglas excluyentes: exacto 5, ganador/empate 3, diferencia 2, goles de un equipo 1, nada 0.
  - Guardar indicadores `exactHit` y `outcomeHit`.

- [x] **Implementar carga de resultados reales**
  - Endpoint admin `POST /matches/:id/result`.
  - Guardar resultado real y estado finalizado.
  - Recalcular todas las predicciones del partido.
  - Actualizar puntos totales de usuarios afectados.

- [x] **Crear modulo `ranking`**
  - Endpoints: `GET /ranking`, `GET /ranking/:userId`.
  - Mostrar puntaje total, puntos por partidos, puntos por grupos, exactos, aciertos y predicciones cargadas.
  - Aplicar desempates: exactos, aciertos de ganador/empate, cantidad de predicciones, usuario registrado primero.

- [x] **Agregar recalculo idempotente**
  - Recalcular puntos de partido si se corrige resultado real.
  - Recalcular totales de usuarios desde datos persistidos.
  - Evitar sumar dos veces ante ejecuciones repetidas.

### Fase 6: Predicciones de clasificacion por grupos

- [x] **Crear modulo `group-predictions`**
  - Endpoints: `GET /group-predictions/me`, `POST /group-predictions`, `PUT /group-predictions`.
  - Guardar primero y segundo de cada grupo.
  - Guardar lista simple de 8 mejores terceros.

- [x] **Implementar bloqueo de predicciones de grupo**
  - Regla MVP: cerrar 15 minutos antes del partido inaugural.
  - Centralizar deadline en backend.
  - Mostrar error claro cuando este bloqueado.

- [x] **Implementar calculo de grupos**
  - Cargar standings reales al finalizar fase de grupos.
  - Calcular primeros, segundos y mejores terceros.
  - Puntaje: primero exacto 4, segundo exacto 4, top 2 sin posicion 2, mejor tercero 2, bonus grupo perfecto 2.
  - Actualizar puntajes totales y ranking.

### Fase 7: Frontend base y autenticacion

- [x] **Crear estructura frontend**
  - Carpetas `api/`, `components/`, `pages/`, `styles/`.
  - Configurar React Router.
  - Configurar Sass con `main.scss`, variables, layout y forms.

- [x] **Implementar cliente API**
  - `authApi.ts`, `matchesApi.ts`, `predictionsApi.ts`, `groupPredictionsApi.ts`, `rankingApi.ts`.
  - Manejo centralizado de token, errores y sesion expirada.

- [x] **Implementar login y registro**
  - Paginas `LoginPage` y `RegisterPage`.
  - Persistencia de sesion.
  - Rutas privadas.
  - Mensajes claros para credenciales invalidas y email repetido.

### Fase 8: Frontend de fixture, predicciones y resultados

- [x] **Implementar vista de fixture**
  - `FixturePage` con filtros por fase, grupo, fecha y equipo.
  - `MatchCard` con horario, sede, estadio, estado y resultado real.
  - Estado de partido confirmado/no confirmado.

- [x] **Implementar formulario de prediccion de partido**
  - `PredictionForm` con goles local/visitante.
  - Deshabilitar si esta bloqueado o no confirmado.
  - Mostrar puntos obtenidos cuando este calculado.
  - Manejar errores del backend como fuente final.

- [x] **Implementar vista de resultados publica**
  - `ResultsPage` con fixture completo, resultados reales, horarios, sedes y estado.
  - No requerir login si se decide que sea publica.

- [x] **Implementar panel admin basico**
  - Vista minima para cargar resultado real.
  - Proteger acceso desde backend.
  - Mostrar confirmacion de recalculo.

### Fase 9: Frontend de grupos y ranking

- [x] **Implementar predicciones de grupos**
  - `GroupPredictionsPage` y `GroupPredictionForm`.
  - Elegir primero y segundo por grupo.
  - Elegir 8 mejores terceros con contador.
  - Validar duplicados en UI y backend.
  - Mostrar estado editable/bloqueado y puntos calculados.

- [x] **Implementar ranking**
  - `RankingPage` y `RankingTable`.
  - Mostrar posicion, usuario, puntos totales, puntos por partidos, puntos por grupos, exactos, aciertos y predicciones.
  - Mantener tabla responsive y escaneable.

- [x] **Pulir estados de UI**
  - Cargando, sin datos, error recuperable, permisos, sesion expirada y operacion exitosa.
  - Mensajes para prediccion bloqueada y partido no confirmado.

### Fase 10: Testing, calidad y cierre MVP

- [x] **Agregar tests unitarios de scoring**
  - Resultado exacto.
  - Ganador/empate.
  - Diferencia de gol.
  - Goles de un equipo.
  - Sin acierto.
  - Clasificados de grupos y mejores terceros.

- [x] **Agregar tests de services backend**
  - Bloqueo 15 minutos antes.
  - Partido con placeholders no predecible.
  - Ownership de predicciones.
  - Recalculo idempotente de ranking.

- [x] **Agregar tests de API**
  - Auth.
  - Fixture.
  - Predicciones.
  - Resultados reales.
  - Ranking.

- [x] **Agregar smoke tests frontend**
  - Login.
  - Fixture.
  - Carga de prediccion.
  - Predicciones de grupos.
  - Ranking.

- [x] **Actualizar documentacion final**
  - README con setup local.
  - Documentar comandos.
  - Documentar variables de entorno.
  - Confirmar links a Swagger.

---

## Referencias

**Features similares**: No existen features implementadas en el repo; el proyecto esta en etapa de planificacion.

**Documentacion consultada**:

- `PLAN_DESARROLLO_PRODE_MUNDIAL.md`
- `.github/agents/dev-planner.agent.md`
- `.github/prompts/dev.load-context.prompt.md`
- `.github/prompts/dev.create-development-plan.prompt.md`
- `.github/instructions/architecture.instructions.md`
- `.github/instructions/tech-stack.instructions.md`
- `.github/instructions/code-standards.instructions.md`
- `.github/documentation/backend.md`
- `.github/documentation/frontend.md`
- `.github/documentation/database.md`
- `.github/documentation/migrations.md`
- `.github/documentation/faq.md`

**Context7 usado**: No usado. No habia implementacion existente ni necesidad de consultar APIs de librerias en esta etapa documental.

---

## Opciones de Ejecucion

1. **Paso a paso**: recomendado para iniciar el proyecto sin perder control de decisiones.
2. **Por fases**: recomendable una vez elegido ORM, gestor de paquetes y autenticacion.
3. **Todo el plan**: no recomendado para este MVP porque toca backend, frontend, DB, auth y scoring.

---

## Decisiones pendientes antes de implementar

- Elegir gestor de paquetes: `npm` o `pnpm`.
- Confirmar ORM: Prisma recomendado, TypeORM alternativo.
- Confirmar base de datos inicial: PostgreSQL recomendado para entorno real; una base relacional liviana podria servir para prototipo.
- Confirmar autenticacion: JWT recomendado para API web.
- Confirmar si `ResultsPage` y `RankingPage` son publicas o requieren login.
- Confirmar si admin sera un rol en `User` o una configuracion inicial simple.
