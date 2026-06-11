# Contexto de Desarrollo: MVP Prode del Mundial

**Generado**: 2026-06-10 | **Ticket**: No tracked | **Tipo**: Feature | **Partes**: Backend, Frontend, Database, Testing, Docs

---

## Informacion Original

**Fuente**: Texto del usuario + `PLAN_DESARROLLO_PRODE_MUNDIAL.md` + `.github/instructions` + `.github/documentation`

**Descripcion Original**:

Crear una aplicacion web para jugar un Prode del Mundial. El sistema debe tener frontend en React y Sass, backend en NestJS con Swagger, fixture obtenido desde JSON, usuarios con registro/login, predicciones de resultados, bloqueo de edicion 15 minutos antes de cada partido, carga de resultados reales, calculo de puntos y ranking. Tambien debe permitir predecir clasificados de grupos: primero, segundo y los 8 mejores terceros.

**Criterios de Aceptacion**:

- [ ] El backend NestJS expone Swagger en `/docs`.
- [ ] Los usuarios pueden registrarse, iniciar sesion y consultar su sesion.
- [ ] El fixture se carga desde JSON y se consulta por API.
- [ ] Solo se pueden predecir partidos confirmados.
- [ ] Las predicciones de partidos se bloquean 15 minutos antes del kickoff.
- [ ] Los usuarios pueden predecir primero, segundo y mejores terceros de fase de grupos.
- [ ] Las predicciones de grupos se bloquean antes del inicio definido para el torneo.
- [ ] La carga de resultados reales recalcula puntos de predicciones.
- [ ] El ranking muestra puntos totales, puntos por partidos, puntos por grupos y desempates.
- [ ] La UI React permite operar login, fixture, predicciones, grupos, resultados y ranking.

---

## Objetivo de Negocio

Permitir organizar un Prode del Mundial de forma digital, con reglas claras, predicciones trazables, ranking automatico y una experiencia simple para que los usuarios carguen pronosticos y sigan su posicion.

---

## Descripcion Detallada

**Que se quiere hacer**: construir el MVP completo de una aplicacion web para jugar el Prode del Mundial. El producto debe iniciar con partidos de fase de grupos confirmados, permitir predicciones de resultados, sumar puntos segun aciertos, incluir predicciones de clasificacion por grupo y mostrar ranking.

**Alcance (IN/OUT)**:

- Incluido: scaffold frontend/backend, base de datos relacional, migraciones, seed/import de fixture JSON, auth, partidos, predicciones, scoring, ranking, Swagger, UI principal y tests criticos.
- Incluido: panel administrativo basico para cargar resultados reales y disparar recalculo.
- Incluido: reglas de partidos confirmados y bloqueo por deadline.
- NO incluido: importacion automatica de resultados desde APIs externas.
- NO incluido: mini ligas privadas entre amigos.
- NO incluido: notificaciones automaticas.
- NO incluido: orden exacto de mejores terceros en el MVP.
- NO incluido: integracion con pagos, premios o apuestas reales.

---

## Relaciones y Dependencias

**Tickets Relacionados**: No aplica.

**Integraciones Externas**: No definidas para el MVP.

**Artefactos locales relacionados**:

- `PLAN_DESARROLLO_PRODE_MUNDIAL.md`
- `.github/instructions/about.instructions.md`
- `.github/instructions/architecture.instructions.md`
- `.github/instructions/tech-stack.instructions.md`
- `.github/instructions/code-standards.instructions.md`
- `.github/documentation/backend.md`
- `.github/documentation/frontend.md`
- `.github/documentation/database.md`
- `.github/documentation/migrations.md`
- `.github/documentation/faq.md`

---

## Notas Adicionales

- El backend es la fuente final de verdad para deadlines, ownership y scoring.
- Guardar horarios y deadlines en UTC.
- Usar TypeScript en frontend y backend.
- ORM recomendado por documentacion: Prisma o TypeORM. El plan propone Prisma por simplicidad de migraciones y tipado, pero puede cambiarse antes de implementar.
- Puntajes del MVP: reglas excluyentes para partidos y lista simple de mejores terceros.

---

## Siguiente Paso

Contexto cargado exitosamente.

Usar el plan tecnico en:

```text
docs/feature-NT-001-prode-mundial-mvp/development-plan.md
```
