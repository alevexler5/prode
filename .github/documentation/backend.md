# Backend - NestJS API

El backend del Prode del Mundial se desarrollara con NestJS y sera la fuente final de verdad para autenticacion, predicciones, resultados reales, puntajes y ranking.

Fuente principal: `PLAN_DESARROLLO_PRODE_MUNDIAL.md`.

## Responsabilidades

El backend debe:

- Registrar usuarios.
- Autenticar usuarios.
- Proteger rutas privadas.
- Exponer fixture y resultados reales.
- Permitir predicciones de partidos confirmados.
- Bloquear predicciones 15 minutos antes del kickoff.
- Gestionar predicciones de clasificacion por grupos.
- Cargar resultados reales.
- Calcular puntos.
- Recalcular ranking.
- Documentar la API con Swagger en `/docs`.
- Exponer `GET /health` para chequeo operativo.
- Registrar acciones administrativas relevantes.

## Arquitectura

Patron recomendado:

```text
Controller -> DTO/Validation -> Service -> Repository/ORM -> Database
```

Modulos esperados:

```text
src/
  auth/
  users/
  matches/
  predictions/
  group-predictions/
  ranking/
  scoring/
  common/
  health/
```

## Autenticacion

Endpoints sugeridos:

```text
POST /auth/register
POST /auth/login
GET  /auth/me
```

Reglas:

- Hashear contrasenas.
- No devolver `passwordHash`.
- Usar token o sesion, a definir al inicializar el proyecto.
- Proteger endpoints privados con guards.

## Partidos

Endpoints sugeridos:

```text
GET  /matches
GET  /matches/:id
GET  /matches/available-for-prediction
POST /matches/:id/result
```

Reglas:

- El fixture inicial puede importarse desde JSON.
- Los partidos de fase de grupos estan disponibles desde el inicio.
- Los partidos eliminatorios se habilitan para prediccion cuando ambos equipos estan confirmados.
- Un partido con placeholders no debe aceptar predicciones de resultado.
- El admin puede confirmar un cruce y habilitar prediccion cuando ambos equipos reales ya estan definidos.

## Predicciones de partidos

Endpoints sugeridos:

```text
GET  /predictions/me
POST /predictions/:matchId
PUT  /predictions/:matchId
```

Reglas:

- Cada usuario puede tener una prediccion por partido.
- Solo el owner puede crear o editar su prediccion.
- La prediccion se bloquea 15 minutos antes del kickoff.
- El frontend puede ocultar o deshabilitar inputs, pero el backend debe validar siempre.
- Los errores de negocio deben devolverse con codigos estables para que el frontend pueda reaccionar.

## Predicciones de clasificacion por grupos

Endpoints sugeridos:

```text
GET  /group-predictions/me
POST /group-predictions
PUT  /group-predictions
POST /group-predictions/calculate
```

Cada usuario puede predecir:

- Primero de cada grupo.
- Segundo de cada grupo.
- Los 8 mejores terceros.

Recomendacion:

- Cerrar estas predicciones 15 minutos antes del partido inaugural.
- Calcular puntaje cuando finalice toda la fase de grupos.
- Validar exactamente 8 mejores terceros al momento del calculo.

## Scoring

El modulo `scoring` debe centralizar el calculo de puntos.

Puntaje recomendado para partidos:

- Resultado exacto: 5 puntos.
- Acierto de ganador o empate: 3 puntos.
- Acierto de diferencia de gol: 2 puntos.
- Acierto de goles de un equipo: 1 punto.
- Sin acierto: 0 puntos.

Regla aplicada en esta base:

- El scoring es excluyente.
- `diferencia de gol` se interpreta como mismo margen absoluto, aun si el ganador no coincide.
- Los empates no exactos puntuan como `ganador o empate` con 3 puntos, no como diferencia.

Puntaje recomendado para grupos:

- Primero exacto: 4 puntos.
- Segundo exacto: 4 puntos.
- Top 2 sin posicion exacta: 2 puntos.
- Mejor tercero acertado: 2 puntos.
- Grupo perfecto: bonus de 2 puntos.

## Ranking

Endpoints sugeridos:

```text
GET /ranking
GET /ranking/:userId
```

El ranking debe mostrar:

- Posicion.
- Usuario.
- Puntaje total.
- Puntos por partidos.
- Puntos por grupos.
- Resultados exactos.
- Aciertos de ganador/empate.
- Predicciones cargadas.

Desempates:

1. Mayor cantidad de resultados exactos.
2. Mayor cantidad de aciertos de ganador/empate.
3. Mayor cantidad de predicciones cargadas.
4. Usuario registrado primero.

## Salud y operaciones

Endpoints sugeridos adicionales:

```text
GET /health
GET /matches/admin/summary
PATCH /matches/:id
POST /matches/:id/confirm
```

El backend registra acciones administrativas en `AdminActionLog` para poder auditar:

- confirmacion de cruces;
- carga o correccion de resultados;
- recalculo de standings de grupos.

## Swagger

Reglas:

- Publicar documentacion en `/docs`.
- Documentar DTOs con ejemplos.
- Documentar autenticacion.
- Documentar errores frecuentes: no autenticado, no autorizado, partido bloqueado, partido no confirmado y prediccion inexistente.
- Mantener visibles los codigos de negocio consumidos por frontend, por ejemplo `ADMIN_REQUIRED`, `PREDICTION_LOCKED` y `PREDICTION_NOT_FOUND`.

## Errores esperados

Casos que deben manejarse claramente:

- Usuario intenta predecir partido no confirmado.
- Usuario intenta editar fuera de plazo.
- Usuario intenta editar prediccion de otro usuario.
- Resultado real se carga dos veces o se corrige.
- Ranking necesita recalculo.
- Fixture cambia por postergacion.
