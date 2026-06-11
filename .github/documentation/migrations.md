# Migraciones y seeders

El proyecto debe usar migraciones para versionar la base de datos y seeders o importadores para cargar el fixture inicial del Mundial.

Fuente principal: `PLAN_DESARROLLO_PRODE_MUNDIAL.md`.

## Objetivo

Las migraciones permiten evolucionar el schema de forma controlada. Los seeders/importadores permiten cargar datos base como usuarios administrativos, fixture, grupos y configuraciones iniciales.

## Reglas obligatorias

- Crear tablas solo con migraciones.
- Modificar schema solo con migraciones.
- No cambiar estructura de base manualmente.
- Mantener migraciones pequenas y ordenadas.
- Guardar fechas en UTC.
- No cargar predicciones de prueba en entornos productivos salvo decision explicita.

## Estado actual

El proyecto ya cuenta con una migracion base versionada en:

- `backend/prisma/migrations/20260610_initial_hardening/migration.sql`

Tambien existe:

- `backend/prisma/migrations/migration_lock.toml`

## Datos iniciales esperados

Seeds o importadores:

- Usuario administrador inicial, si se define panel admin.
- Fixture de fase de grupos.
- Partidos eliminatorios con placeholders, si se desea visualizarlos antes de estar confirmados.
- Grupos y equipos.
- Configuracion de reglas de puntaje, si se decide parametrizar.
- Catalogo de equipos.

## Fixture desde JSON

El fixture inicial debe poder cargarse desde JSON.

Campos minimos por partido:

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
- `realScore`

Reglas:

- Los partidos confirmados pueden habilitar prediccion.
- Los partidos con placeholders deben existir como fixture visible, pero no admitir prediccion.
- Si cambia un horario, debe actualizarse el deadline de bloqueo porque depende de `kickoff`.
- El importador debe validar IDs duplicados, fechas invalidas y mezcla invalida de placeholders con equipos reales.

## Convenciones de migraciones

Recomendaciones:

- Usar nombres ordenables por fecha o timestamp.
- Incluir `up` y, cuando sea razonable, `down`.
- Crear indices junto con las tablas o en migraciones especificas.
- Separar cambios no relacionados.
- Probar migraciones desde base vacia.

Ejemplos:

- Crear usuarios.
- Crear partidos.
- Crear predicciones.
- Crear predicciones de grupo.
- Crear tabla de posiciones de grupo.
- Agregar indices de ranking.

## Seeders

Reglas:

- Deben ser idempotentes cuando sea posible.
- No deben duplicar partidos.
- Deben poder actualizar datos del fixture si cambia sede u horario.
- No deben sobrescribir resultados reales o predicciones de usuarios sin una accion administrativa explicita.

## Recalculo despues de migraciones

Si una migracion cambia reglas o campos de puntaje:

1. Documentar el cambio.
2. Ejecutar recalculo controlado de predicciones afectadas.
3. Recalcular totales de usuarios.
4. Verificar ranking.

## Testing

Tests recomendados:

- Crear base vacia y aplicar todas las migraciones.
- Cargar fixture JSON.
- Validar que no se dupliquen partidos al re-ejecutar seeders.
- Validar indices clave.
- Validar que un partido con placeholders queda sin prediccion habilitada.
- Validar que un partido confirmado puede habilitar prediccion.

## Relacion con desarrollo

Cuando se agregue una entidad o campo:

1. Actualizar modelo/entidad del ORM.
2. Crear migracion.
3. Ajustar DTOs si impacta API.
4. Ajustar seeders/importadores si corresponde.
5. Actualizar documentacion.
6. Agregar tests cuando el cambio afecte scoring, deadlines o ranking.
