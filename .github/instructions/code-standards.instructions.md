---
applyTo: "**"
---

# Estandares de Codigo

Este documento establece reglas de desarrollo para el Prode del Mundial. Aplicar estas reglas junto con `architecture.instructions.md`, `tech-stack.instructions.md` y `PLAN_DESARROLLO_PRODE_MUNDIAL.md`.

## Principios generales

- Mantener codigo simple, legible y orientado a casos de uso.
- Separar UI, API, reglas de negocio y persistencia.
- Centralizar reglas de puntaje y bloqueo en backend.
- Evitar abstracciones prematuras.
- Preferir TypeScript para frontend y backend.
- No duplicar logica critica entre frontend y backend.

## React

- Usar componentes reutilizables para fixture, partidos, formularios y ranking.
- Mantener las reglas finales de negocio fuera de componentes.
- Usar estado local para formularios simples.
- Usar estado global solo si el dato se comparte entre pantallas.
- Mostrar estados de carga, error, vacio, bloqueado y calculado.
- Deshabilitar predicciones cerradas, pero recordar que la validacion final es del backend.

## Sass

- Organizar estilos por base, layout, componentes y paginas.
- Evitar estilos globales fragiles.
- Usar variables para colores, espaciado, tipografia y breakpoints.
- La UI debe ser clara, responsive y orientada a consulta/carga rapida.

## NestJS

- Organizar el backend por modulos de dominio.
- Controllers delgados, services con casos de uso.
- Usar DTOs para entradas y salidas relevantes.
- Validar inputs con pipes y decoradores.
- Usar guards para rutas autenticadas.
- Documentar endpoints y DTOs con Swagger.
- No devolver hashes de contrasena ni campos internos sensibles.

## API

- Usar respuestas consistentes.
- Usar codigos HTTP correctos.
- Validar autenticacion en rutas privadas.
- Validar permisos en endpoints administrativos.
- Exponer `/docs` para Swagger.
- Mantener nombres de endpoints claros y orientados a recursos.

## Base de datos

- Crear y modificar schema solo con migraciones.
- Usar seeders o importadores controlados para fixture inicial.
- Guardar fechas en UTC.
- Agregar indices para campos usados en ranking, filtros, usuario, partido y deadlines.
- No eliminar fisicamente datos que afecten historico de puntajes sin una decision explicita.

## Reglas funcionales criticas

- Solo se pueden predecir partidos confirmados.
- Un partido con placeholders no admite prediccion de resultado.
- Una prediccion de partido se bloquea 15 minutos antes del kickoff.
- Las predicciones de grupo se bloquean antes del inicio definido para el torneo.
- El backend es la fuente final de verdad para bloqueos.
- El puntaje debe poder recalcularse si se corrige un resultado real.
- El ranking debe usar desempates definidos y deterministas.

## Scoring

- Mantener funciones puras para calculo de puntaje cuando sea posible.
- Cubrir con tests los casos de resultado exacto, ganador/empate, diferencia de gol, goles de equipos y sin acierto.
- Cubrir con tests clasificados de grupo y mejores terceros.
- Guardar indicadores como `exactHit` y `outcomeHit` si ayudan al ranking.

## Seguridad

- Hashear contrasenas.
- No registrar contrasenas, tokens ni secretos.
- No confiar en datos del cliente.
- Validar ownership: un usuario solo puede crear/editar sus propias predicciones.
- Proteger endpoints administrativos.

## Testing

- Priorizar tests unitarios para scoring.
- Agregar tests de services para deadlines y habilitacion de partidos.
- Agregar tests de API para auth, predicciones y ranking.
- Agregar tests de frontend para flujos principales cuando exista UI.

## Nomenclatura recomendada

- Services: `PredictionService`, `ScoringService`, `RankingService`.
- Controllers: `predictions.controller.ts`, `matches.controller.ts`.
- DTOs: `CreatePredictionDto`, `UpdatePredictionDto`, `GroupPredictionDto`.
- Frontend APIs: `predictionsApi.ts`, `groupPredictionsApi.ts`.
- Componentes: `MatchCard`, `PredictionForm`, `RankingTable`.
