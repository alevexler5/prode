# Plan de desarrollo: Prode del Mundial

## 1. Objetivo

Crear una aplicacion web para jugar un prode del Mundial. Los usuarios podran registrarse, iniciar sesion, ver el fixture completo, cargar sus predicciones de resultados y sumar puntos segun el nivel de acierto una vez que los partidos se jueguen.

La aplicacion tendra:

- Frontend en React.
- Estilos con Sass.
- Fixture inicial cargado desde un archivo JSON.
- Backend con NestJS para autenticacion, predicciones, resultados reales y ranking.
- Documentacion de API con Swagger.
- Tabla publica de posiciones con los usuarios participantes.

## 2. Alcance funcional

### 2.1 Registro e inicio de sesion

El backend debera permitir:

- Registro de usuarios.
- Inicio de sesion.
- Cierre de sesion.
- Persistencia segura de contrasenas usando hashing.
- Proteccion de rutas privadas mediante token o sesion.

Datos minimos del usuario:

- Id.
- Nombre visible.
- Email.
- Contrasena hasheada.
- Fecha de creacion.
- Puntaje total acumulado.

### 2.2 Fixture del Mundial

El fixture se obtendra desde un archivo JSON inicial. Ese JSON deberia contener:

- Id del partido.
- Fase: grupos, octavos, cuartos, semifinal, tercer puesto, final.
- Grupo, si aplica.
- Equipo local.
- Equipo visitante.
- Fecha y hora.
- Sede.
- Estadio.
- Resultado real, inicialmente vacio.
- Estado del partido: programado, bloqueado, en juego, finalizado.

Ejemplo de estructura:

```json
{
  "id": "match-001",
  "phase": "groups",
  "group": "A",
  "homeTeam": "Argentina",
  "awayTeam": "Espana",
  "kickoff": "2026-06-11T16:00:00Z",
  "venue": "Ciudad de Mexico",
  "stadium": "Estadio Azteca",
  "status": "scheduled",
  "realScore": {
    "home": null,
    "away": null
  }
}
```

### 2.3 Predicciones del usuario

Cada usuario podra cargar una prediccion por partido:

- Goles del equipo local.
- Goles del equipo visitante.
- Fecha de ultima modificacion.
- Estado de la prediccion: editable, bloqueada, calculada.
- Puntos obtenidos para ese partido.

Regla principal:

- La prediccion se podra modificar hasta 15 minutos antes del inicio del partido.
- Luego de ese momento, el backend debera bloquear la modificacion aunque el frontend oculte el formulario.

### 2.4 Resultados reales

La aplicacion debera permitir cargar o actualizar el resultado real de cada partido. Esto puede resolverse inicialmente con una vista administrativa simple o mediante carga manual desde base de datos/API interna.

Cuando se carga el resultado real:

- Se calcula el puntaje de todas las predicciones de ese partido.
- Se actualiza el puntaje total de cada usuario.
- El partido pasa a estado finalizado.

### 2.5 Partidos habilitados para prediccion

No todos los partidos del Mundial estaran disponibles para pronosticar desde el inicio.

Regla principal:

- Solo se podran predecir partidos que ya esten confirmados.
- Al inicio del torneo, estaran disponibles los partidos de fase de grupos.
- Los cruces de dieciseisavos, octavos, cuartos, semifinales y final se habilitaran cuando los equipos participantes ya esten definidos.
- Un partido con equipos pendientes no debera permitir carga de prediccion de resultado.

Esto evita que el usuario pronostique resultados de partidos que todavia no existen formalmente, por ejemplo "1A vs 2B" antes de saber que selecciones ocuparan esas posiciones.

### 2.6 Predicciones de clasificacion por grupos

Ademas de predecir resultados de partidos, los usuarios podran pronosticar que equipos pasan de ronda desde la fase de grupos.

Para el formato del Mundial 2026:

- Pasan los dos primeros de cada grupo.
- Tambien pasan los 8 mejores terceros.

Cada usuario podra predecir:

- Primer puesto de cada grupo.
- Segundo puesto de cada grupo.
- Equipos que clasifican como mejores terceros.
- Opcionalmente, el orden exacto de los terceros clasificados.

Estas predicciones deberian cerrarse antes del inicio del primer partido del Mundial o antes del inicio del primer partido de cada grupo, segun la regla que se defina.

Recomendacion inicial:

- Cerrar todas las predicciones de clasificacion de grupos 15 minutos antes del partido inaugural.
- Mantenerlas visibles pero no editables durante el torneo.
- Calcular los puntos una vez finalizada toda la fase de grupos.

## 3. Ideas de reglas de puntaje

Se propone empezar con un sistema simple y facil de entender.

### Opcion recomendada

- Resultado exacto: 5 puntos.
- Acierto de ganador o empate: 3 puntos.
- Acierto de diferencia de gol: 2 puntos.
- Acierto de goles de un equipo: 1 punto.
- Sin aciertos: 0 puntos.

### Puntaje para clasificados de grupo

Opcion recomendada:

- Acierta el primero exacto del grupo: 4 puntos.
- Acierta el segundo exacto del grupo: 4 puntos.
- Acierta que un equipo clasifica en top 2, aunque no en la posicion exacta: 2 puntos.
- Acierta un mejor tercero clasificado: 2 puntos por equipo.
- Acierta todos los clasificados de un grupo en posicion exacta: bonus de 2 puntos.

Ejemplos:

- Real Grupo A: 1 Argentina, 2 Mexico. Prediccion: 1 Argentina, 2 Mexico. Suma 8 puntos + 2 de bonus.
- Real Grupo A: 1 Argentina, 2 Mexico. Prediccion: 1 Mexico, 2 Argentina. Acierta ambos clasificados, pero no posicion: 4 puntos.
- Mejores terceros reales: Chile, Uruguay, Japon, Senegal, Croacia, Canada, Marruecos, Corea. Si el usuario acierta 5 de esos 8, suma 10 puntos.

Decision pendiente:

- Definir si los mejores terceros se pronostican como una lista simple de 8 equipos o con orden exacto.

Recomendacion:

- Usar lista simple de 8 equipos para que sea mas amigable.
- No exigir orden exacto de mejores terceros en el MVP.

Ejemplos:

- Real: Argentina 2 - 1 Brasil. Prediccion: Argentina 2 - 1 Brasil. Resultado exacto: 5 puntos.
- Real: Argentina 2 - 1 Brasil. Prediccion: Argentina 1 - 0 Brasil. Acierta ganador y diferencia de gol: 3 puntos o 4 si se decide acumular diferencia.
- Real: Argentina 2 - 1 Brasil. Prediccion: Argentina 3 - 1 Brasil. Acierta ganador y goles de Brasil: 3 puntos + 1 opcional.
- Real: Argentina 2 - 2 Brasil. Prediccion: Argentina 1 - 1 Brasil. Acierta empate: 3 puntos.

### Reglas de desempate para ranking

En caso de igualdad de puntos, el ranking puede ordenarse por:

1. Mayor cantidad de resultados exactos.
2. Mayor cantidad de aciertos de ganador/empate.
3. Mayor cantidad de partidos pronosticados.
4. Usuario que se registro primero.

## 4. Vistas principales

### 4.1 Login y registro

Pantallas necesarias:

- Registro de usuario.
- Inicio de sesion.
- Recuperacion de sesion si el token sigue vigente.
- Mensajes de error claros para credenciales invalidas o email ya utilizado.

### 4.2 Fixture y predicciones

Vista principal del usuario autenticado.

Debe mostrar:

- Listado de partidos.
- Filtros por fase, grupo, fecha y equipo.
- Horario del partido.
- Sede y estadio.
- Resultado real si ya fue jugado.
- Prediccion del usuario.
- Formulario para editar prediccion si el partido sigue habilitado.
- Indicador de cierre de prediccion: por ejemplo, "editable hasta 15 minutos antes".
- Puntos obtenidos en partidos ya calculados.

### 4.3 Ranking

Vista publica o privada con:

- Posicion.
- Nombre del usuario.
- Puntaje total.
- Resultados exactos.
- Aciertos de ganador/empate.
- Cantidad de predicciones cargadas.

Desde el ranking se podria permitir ver el detalle publico de predicciones de cada usuario solo para partidos ya bloqueados o finalizados. Esto evita que otros copien predicciones antes del cierre.

### 4.4 Resultados y fixture publico

Vista para consultar:

- Fixture completo.
- Resultados reales.
- Horarios.
- Sedes.
- Estadios.
- Estado de cada partido.

### 4.5 Panel administrativo

Puede desarrollarse en una etapa posterior.

Funciones posibles:

- Crear, editar o importar partidos.
- Cargar resultados reales.
- Recalcular puntajes.
- Bloquear manualmente un partido.
- Ver predicciones por partido.

## 5. Arquitectura propuesta

### 5.1 Frontend

Tecnologias:

- React.
- Sass.
- React Router para navegacion.
- Cliente HTTP para consumir el backend.
- Manejo de estado simple con Context o una libreria liviana si el proyecto crece.

Estructura sugerida:

```text
src/
  api/
    authApi.js
    matchesApi.js
    predictionsApi.js
    groupPredictionsApi.js
    rankingApi.js
  components/
    MatchCard.jsx
    PredictionForm.jsx
    GroupPredictionForm.jsx
    RankingTable.jsx
    FixtureFilters.jsx
  pages/
    LoginPage.jsx
    RegisterPage.jsx
    FixturePage.jsx
    GroupPredictionsPage.jsx
    RankingPage.jsx
    ResultsPage.jsx
    AdminPage.jsx
  styles/
    main.scss
    _variables.scss
    _layout.scss
    _forms.scss
```

### 5.2 Backend

Tecnologias:

- NestJS.
- Swagger/OpenAPI para documentar y probar endpoints.
- Validacion de DTOs.
- Guards para proteger rutas privadas.
- Modulos separados por dominio.

Responsabilidades:

- Autenticacion.
- Autorizacion.
- Gestion de usuarios.
- Gestion de partidos.
- Gestion de predicciones.
- Gestion de predicciones de clasificacion por grupo.
- Calculo de puntajes.
- Ranking.
- Exposicion de documentacion Swagger.

Estructura sugerida:

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

Endpoints sugeridos:

```text
POST   /auth/register
POST   /auth/login
GET    /auth/me

GET    /matches
GET    /matches/:id
GET    /matches/available-for-prediction
POST   /matches/:id/result

GET    /predictions/me
POST   /predictions/:matchId
PUT    /predictions/:matchId

GET    /group-predictions/me
POST   /group-predictions
PUT    /group-predictions
POST   /group-predictions/calculate

GET    /ranking
GET    /ranking/:userId

GET    /docs
```

Notas de Swagger:

- La documentacion debera estar disponible en `/docs`.
- Cada DTO debera exponer ejemplos de request y response.
- Los endpoints privados deberan documentar el uso de Bearer Token o el mecanismo de autenticacion elegido.

### 5.3 Base de datos

Entidades principales:

- Users.
- Matches.
- Predictions.
- GroupPredictions.
- Scores o RankingSnapshot, opcional.

Modelo conceptual:

```text
User
  id
  name
  email
  passwordHash
  totalPoints
  createdAt

Match
  id
  phase
  group
  homeTeam
  awayTeam
  homePlaceholder
  awayPlaceholder
  kickoff
  venue
  stadium
  status
  isPredictionEnabled
  realHomeScore
  realAwayScore

Prediction
  id
  userId
  matchId
  predictedHomeScore
  predictedAwayScore
  points
  exactHit
  outcomeHit
  createdAt
  updatedAt

GroupPrediction
  id
  userId
  group
  predictedFirstTeam
  predictedSecondTeam
  points
  createdAt
  updatedAt

BestThirdsPrediction
  id
  userId
  predictedTeams
  points
  createdAt
  updatedAt
```

## 6. Logica de bloqueo de predicciones

La validacion debe estar en backend.

Regla:

```text
deadline = kickoff - 15 minutos
si fechaActual >= deadline, no se puede crear ni editar la prediccion
```

El frontend tambien deberia reflejarlo:

- Deshabilitar inputs.
- Mostrar estado bloqueado.
- Mostrar cuenta regresiva o fecha limite.

Pero el backend siempre sera la fuente final de verdad.

Para partidos de fases eliminatorias:

- Si el partido todavia tiene placeholders, por ejemplo "1A vs 2B", no se permite predecir resultado.
- Cuando ambos equipos quedan definidos, el backend puede marcar el partido como `isPredictionEnabled = true`.
- A partir de ese momento aplica la misma regla de cierre: 15 minutos antes del inicio.

Para predicciones de clasificacion por grupo:

```text
deadline = kickoff del primer partido del torneo - 15 minutos
si fechaActual >= deadline, no se puede crear ni editar la prediccion de grupos
```

Si se decide cerrar por grupo:

```text
deadline = kickoff del primer partido del grupo - 15 minutos
```

## 7. Calculo de puntaje

Funcion conceptual:

```text
si prediccion == resultado real:
  puntos = 5
sino si acierta ganador o empate:
  puntos = 3
sino si acierta diferencia de gol:
  puntos = 2
sino si acierta goles de algun equipo:
  puntos = 1
sino:
  puntos = 0
```

Decision pendiente:

- Definir si los puntos son excluyentes o acumulativos.

Recomendacion inicial:

- Usar reglas excluyentes para que el calculo sea simple.
- Guardar indicadores como `exactHit` y `outcomeHit` para mostrar estadisticas en el ranking.
- Separar el puntaje por resultados de partidos y el puntaje por clasificacion de grupos para mostrar el detalle en el ranking.

## 8. Calculo de clasificacion por grupos

Una vez terminada la fase de grupos:

- Se cargan o calculan las posiciones reales de cada grupo.
- Se identifican los dos primeros de cada grupo.
- Se identifican los 8 mejores terceros.
- Se calculan los puntos de las predicciones de clasificacion.
- Se actualiza el puntaje total de cada usuario.

Datos reales necesarios:

```text
GroupStanding
  group
  team
  position
  points
  goalDifference
  goalsFor
  qualifiedAs
```

`qualifiedAs` puede tener valores como:

- `group_winner`
- `group_runner_up`
- `best_third`
- `eliminated`

## 9. Etapas de desarrollo

### Etapa 1: Base del proyecto

- Crear frontend React con Sass.
- Crear backend con NestJS.
- Configurar Swagger en `/docs`.
- Configurar variables de entorno.
- Definir estructura de carpetas.
- Agregar fixture JSON inicial.

### Etapa 2: Autenticacion

- Registro.
- Login.
- Proteccion de rutas.
- Persistencia de sesion en frontend.

### Etapa 3: Fixture

- Importar fixture desde JSON.
- Endpoint para listar partidos.
- Vista de fixture con filtros.
- Mostrar horario, sede, estadio y estado.

### Etapa 4: Predicciones

- Formulario para cargar resultados pronosticados.
- Edicion de predicciones.
- Bloqueo 15 minutos antes del partido.
- Habilitacion de predicciones solo para partidos confirmados.
- Vista de predicciones del usuario.

### Etapa 5: Predicciones de clasificacion por grupos

- Formulario para elegir primero y segundo de cada grupo.
- Formulario para elegir los 8 mejores terceros.
- Bloqueo de predicciones de grupo antes del inicio del torneo.
- Calculo de puntos al finalizar la fase de grupos.

### Etapa 6: Resultados reales y puntaje

- Carga de resultado real.
- Calculo de puntos por partido.
- Actualizacion del puntaje total.
- Tests para reglas de puntaje.

### Etapa 7: Ranking

- Endpoint de ranking.
- Tabla de usuarios ordenada por puntos.
- Desempates.
- Detalle de aciertos por usuario.
- Separacion visual entre puntos por partidos y puntos por clasificacion de grupos.

### Etapa 8: Pulido y control

- Validaciones visuales.
- Manejo de errores.
- Estados de carga.
- Responsive design.
- Panel administrativo basico.
- Preparacion para deploy.

## 10. Casos importantes a contemplar

- Usuario intenta editar una prediccion despues del cierre.
- Usuario no cargo prediccion para un partido.
- Partido se posterga y cambia el horario.
- Partido eliminatorio aun no definido.
- Partido eliminatorio se define y debe habilitarse para prediccion.
- Usuario intenta predecir un cruce con placeholders.
- Resultado real se corrige despues de cargado.
- Recalculo de ranking.
- Empates en ranking.
- Diferentes zonas horarias entre servidor, fixture y usuario.
- Predicciones para fase eliminatoria con alargue o penales.
- Predicciones de clasificacion de grupos ya bloqueadas.
- Recalculo de mejores terceros cuando termina la fase de grupos.

## 11. Decision sobre partidos eliminatorios

Para fases eliminatorias se debe definir si el resultado valido sera:

- Resultado al finalizar los 90 minutos.
- Resultado despues de alargue.
- Resultado final incluyendo penales.

Recomendacion:

- Para simplificar, usar el resultado oficial al final del partido sin contar la tanda de penales como goles.
- Agregar un campo separado para ganador por penales si hace falta.

## 12. Prioridades iniciales

MVP recomendado:

1. Registro e inicio de sesion.
2. Backend NestJS con Swagger.
3. Fixture desde JSON.
4. Predicciones de partidos confirmados editables hasta 15 minutos antes.
5. Predicciones de clasificados por grupo y mejores terceros.
6. Carga manual de resultados reales.
7. Calculo de puntaje.
8. Ranking.

Luego se puede mejorar con:

- Panel admin completo.
- Importacion automatica de resultados.
- Notificaciones de partidos por cerrar.
- Estadisticas por usuario.
- Mini ligas privadas entre amigos.
- Vista comparativa de predicciones despues del cierre.
