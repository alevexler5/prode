# Frontend - React y Sass

El frontend del Prode del Mundial sera una aplicacion React con Sass. Debe permitir consultar el fixture, cargar predicciones, ver resultados reales y revisar el ranking.

Fuente principal: `PLAN_DESARROLLO_PRODE_MUNDIAL.md`.

## Stack

- React.
- Sass.
- React Router.
- Cliente HTTP para API NestJS.
- Estado local, Context o libreria liviana segun necesidad.

## Responsabilidades

El frontend debe:

- Mostrar login y registro.
- Mostrar fixture con filtros.
- Permitir cargar y editar predicciones habilitadas.
- Mostrar predicciones bloqueadas.
- Permitir cargar predicciones de clasificacion por grupos.
- Mostrar resultados reales.
- Mostrar ranking.
- Mostrar errores claros del backend.

No debe:

- Calcular puntajes finales como fuente de verdad.
- Permitir confiar solo en validaciones del navegador.
- Decidir si una prediccion esta permitida sin consultar datos del backend.

## Paginas principales

- `LoginPage`
- `RegisterPage`
- `FixturePage`
- `GroupPredictionsPage`
- `RankingPage`
- `ResultsPage`
- `AdminPage`

## Componentes esperados

- `MatchCard`: muestra partido, horario, sede, estado y resultado.
- `PredictionForm`: carga goles pronosticados.
- `GroupPredictionForm`: permite elegir primero, segundo y mejores terceros.
- `RankingTable`: lista usuarios ordenados por puntos.
- `FixtureFilters`: filtra por fase, grupo, fecha y equipo.

## Fixture y predicciones

La vista principal debe mostrar:

- Fecha y hora del partido.
- Fase y grupo.
- Equipo local y visitante.
- Sede y estadio.
- Resultado real si existe.
- Prediccion del usuario.
- Estado: programado, bloqueado, en juego o finalizado.
- Puntos obtenidos cuando el partido ya fue calculado.

Reglas de UI:

- Si el partido no esta confirmado, no mostrar formulario de resultado.
- Si faltan menos de 15 minutos, mostrar prediccion bloqueada.
- Si el backend rechaza una edicion, mostrar error claro.
- No ocultar resultados reales de partidos finalizados.

## Predicciones de grupos

La vista debe permitir:

- Elegir primero y segundo de cada grupo.
- Elegir 8 mejores terceros.
- Ver estado editable o bloqueado.
- Ver puntaje obtenido cuando se calcule la fase de grupos.

Recomendacion de experiencia:

- Evitar formularios enormes sin estructura.
- Agrupar por grupo.
- Mostrar selecciones duplicadas como error.
- Mostrar contador de mejores terceros seleccionados.

## Ranking

La tabla debe mostrar:

- Posicion.
- Nombre de usuario.
- Puntaje total.
- Puntos por partidos.
- Puntos por grupos.
- Resultados exactos.
- Aciertos de ganador/empate.
- Predicciones cargadas.

Se puede permitir ver detalle publico de predicciones solo para partidos ya bloqueados o finalizados.

## Estado y API

Estructura sugerida:

```text
src/
  api/
    authApi.ts
    matchesApi.ts
    predictionsApi.ts
    groupPredictionsApi.ts
    rankingApi.ts
  components/
  pages/
  styles/
```

Cada llamada asincronica debe contemplar:

- Cargando.
- Exito.
- Error recuperable.
- Error de permisos.
- Sesion expirada.

## Diseno

La app debe sentirse clara y rapida:

- Layout responsive.
- Tablas y cards escaneables.
- Acciones principales visibles.
- Estados bloqueados faciles de entender.
- Horarios y sedes legibles.
- Ranking facil de comparar.

Evitar una landing page como primera pantalla del producto; la experiencia principal debe ser el fixture o el login segun estado de sesion.
