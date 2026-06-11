---
applyTo: "**"
---

# Arquitectura

Este proyecto es una aplicacion web para un Prode del Mundial. La fuente funcional principal es `PLAN_DESARROLLO_PRODE_MUNDIAL.md`.

## Objetivo del sistema

La aplicacion debe permitir:

- Registrar e iniciar sesion de usuarios.
- Consultar fixture del Mundial.
- Cargar predicciones de resultados para partidos confirmados.
- Bloquear predicciones 15 minutos antes del inicio del partido.
- Cargar resultados reales.
- Calcular puntos por aciertos.
- Predecir clasificados de fase de grupos: primero, segundo y mejores terceros.
- Mostrar ranking general de usuarios.

## Componentes principales

### Frontend React

Responsabilidades:

- Renderizar pantallas de login, registro, fixture, predicciones, ranking y resultados.
- Mostrar estados de carga, error, vacio y exito.
- Deshabilitar formularios cuando una prediccion ya no es editable.
- Consumir la API mediante una capa cliente.
- No decidir reglas finales de puntaje ni bloqueo.

### Backend NestJS

Responsabilidades:

- Autenticacion y autorizacion.
- Gestion de usuarios.
- Gestion de partidos y fixture.
- Gestion de predicciones de partidos.
- Gestion de predicciones de clasificacion por grupos.
- Carga de resultados reales.
- Calculo de puntos.
- Ranking y desempates.
- Documentacion Swagger.

### Base de datos

Responsabilidades:

- Persistir usuarios, partidos, predicciones, resultados, standings y puntajes.
- Mantener historico suficiente para recalcular ranking.
- Guardar fechas en UTC.
- Permitir migraciones controladas.

## Patron backend

Usar arquitectura por modulos de NestJS:

```text
Controller -> DTO/Validation -> Service -> Repository/ORM -> Database
```

### Controllers

Responsabilidades:

- Exponer endpoints HTTP.
- Aplicar guards cuando corresponda.
- Recibir DTOs.
- Delegar a services.
- Devolver responses normalizadas.

No deben contener reglas de puntaje ni logica compleja.

### Services

Responsabilidades:

- Implementar casos de uso.
- Validar reglas de negocio.
- Coordinar persistencia.
- Calcular puntajes.
- Bloquear modificaciones fuera de plazo.
- Recalcular ranking cuando corresponda.

### Repositories o capa ORM

Responsabilidades:

- Encapsular consultas.
- Persistir entidades.
- Resolver busquedas por filtros.
- No decidir reglas de negocio.

## Modulos esperados

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
```

## Predicciones de partidos

Reglas:

- Solo se pueden predecir partidos confirmados.
- Al inicio estan habilitados los partidos de fase de grupos.
- Los cruces eliminatorios se habilitan cuando los equipos participantes estan definidos.
- Si un partido tiene placeholders como `1A` o `2B`, no admite prediccion de resultado.
- Toda prediccion se puede crear o editar hasta 15 minutos antes del kickoff.
- El backend debe validar el deadline siempre.

## Predicciones de clasificacion por grupos

Cada usuario puede predecir:

- Primer puesto de cada grupo.
- Segundo puesto de cada grupo.
- Los 8 mejores terceros.

Recomendacion:

- Cerrar estas predicciones 15 minutos antes del partido inaugural.
- Calcularlas al finalizar toda la fase de grupos.
- Guardar puntaje separado para poder mostrar detalle en ranking.

## Scoring

Las reglas de puntaje deben vivir en un modulo centralizado `scoring`.

Puntaje sugerido para partidos:

- Resultado exacto: 5 puntos.
- Acierto de ganador o empate: 3 puntos.
- Acierto de diferencia de gol: 2 puntos.
- Acierto de goles de un equipo: 1 punto.
- Sin aciertos: 0 puntos.

Puntaje sugerido para grupos:

- Acierta primero exacto del grupo: 4 puntos.
- Acierta segundo exacto del grupo: 4 puntos.
- Acierta top 2 sin posicion exacta: 2 puntos.
- Acierta un mejor tercero clasificado: 2 puntos.
- Bonus por grupo perfecto: 2 puntos.

## Ranking

El ranking debe ordenar por:

1. Puntaje total.
2. Mayor cantidad de resultados exactos.
3. Mayor cantidad de aciertos de ganador/empate.
4. Mayor cantidad de predicciones cargadas.
5. Usuario registrado primero.

Debe poder mostrar detalle de:

- Puntos por partidos.
- Puntos por clasificacion de grupos.
- Resultados exactos.
- Aciertos parciales.

## Estructura frontend esperada

```text
src/
  api/
    authApi.ts
    matchesApi.ts
    predictionsApi.ts
    groupPredictionsApi.ts
    rankingApi.ts
  components/
    MatchCard.tsx
    PredictionForm.tsx
    GroupPredictionForm.tsx
    RankingTable.tsx
    FixtureFilters.tsx
  pages/
    LoginPage.tsx
    RegisterPage.tsx
    FixturePage.tsx
    GroupPredictionsPage.tsx
    RankingPage.tsx
    ResultsPage.tsx
    AdminPage.tsx
  styles/
    main.scss
    _variables.scss
    _layout.scss
    _forms.scss
```

## Fechas y zonas horarias

- Guardar `kickoff` en UTC.
- Calcular deadlines en backend.
- Mostrar horarios en la zona del usuario o la definida por producto.
- Evitar comparaciones de fecha basadas solo en el navegador.
