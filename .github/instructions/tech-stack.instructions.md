---
applyTo: "**"
---

# Tech Stack

Este proyecto es una aplicacion web para un Prode del Mundial. La fuente funcional principal es `PLAN_DESARROLLO_PRODE_MUNDIAL.md`.

## Runtime y lenguaje

- Lenguaje principal recomendado: TypeScript.
- Runtime backend: Node.js.
- Gestor de paquetes: definir al inicializar el proyecto, recomendado `npm` o `pnpm`.

## Frontend

- React para la interfaz.
- Sass para estilos.
- React Router para navegacion.
- Cliente HTTP para consumir la API.
- Manejo de estado simple con Context, hooks propios o una libreria liviana si el proyecto crece.

Paginas principales:

- Login.
- Registro.
- Fixture y predicciones de partidos.
- Predicciones de clasificacion por grupos.
- Ranking.
- Resultados y fixture publico.
- Panel administrativo basico.

## Backend

- NestJS como framework backend.
- Swagger/OpenAPI para documentacion de API.
- DTOs para request/response.
- Validacion de entradas en DTOs.
- Guards para rutas privadas.
- Services para reglas de negocio.
- Modules por dominio.

Modulos esperados:

- `auth`
- `users`
- `matches`
- `predictions`
- `group-predictions`
- `ranking`
- `scoring`
- `common`

## API y Swagger

- Swagger debe estar disponible en `/docs`.
- Los endpoints privados deben documentar el mecanismo de autenticacion elegido.
- Cada DTO importante debe tener ejemplos de request y response.
- No exponer contrasenas, hashes ni secretos en responses.

## Fixture

- El fixture inicial se carga desde JSON.
- Los partidos deben incluir fase, grupo, equipos, fecha/hora, sede, estadio, estado y resultado real.
- Los partidos de eliminatorias pueden existir con placeholders, pero solo se habilitan para prediccion cuando ambos equipos estan confirmados.

## Base de datos

- Usar una base relacional.
- ORM recomendado: Prisma o TypeORM, a definir al inicializar el proyecto.
- Toda evolucion de schema debe realizarse con migraciones.
- El fixture base puede cargarse con seeders o importador controlado.

Entidades principales:

- `User`
- `Match`
- `Prediction`
- `GroupPrediction`
- `BestThirdsPrediction`
- `GroupStanding`
- `RankingSnapshot`, opcional

## Testing

- Unit tests para reglas de puntaje.
- Tests de services para bloqueo de predicciones.
- Tests de API para autenticacion, predicciones y ranking.
- Tests de frontend para flujos criticos cuando exista UI.

Flujos prioritarios:

- Registro/login.
- Listado de fixture.
- Carga y edicion de prediccion antes del cierre.
- Bloqueo 15 minutos antes del partido.
- Calculo de puntos por resultado exacto y acierto parcial.
- Prediccion de clasificados por grupo y mejores terceros.
- Ranking con desempates.

## Logs y seguridad

- No registrar contrasenas, tokens ni datos sensibles.
- Hashear contrasenas.
- Validar permisos en backend aunque el frontend oculte acciones.
- Usar fechas consistentes en UTC para horarios de partido y deadlines.

## Principios de desarrollo

- Separacion clara entre UI, API, reglas de negocio y persistencia.
- Reglas de puntaje centralizadas en el modulo `scoring`.
- Backend como fuente final de verdad para bloqueos y puntajes.
- Evitar duplicar logica critica en el frontend.
