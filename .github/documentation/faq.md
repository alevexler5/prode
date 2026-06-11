# FAQ - Prode del Mundial

Consulta esta guia para dudas frecuentes del producto y del flujo de trabajo del repositorio.

Fuente principal: `PLAN_DESARROLLO_PRODE_MUNDIAL.md`.

## Producto

### Que es este proyecto?

Es una aplicacion web para jugar un Prode del Mundial. Los usuarios se registran, cargan predicciones, suman puntos segun aciertos y compiten en un ranking.

### Que se puede predecir?

En el MVP se pueden predecir:

- Resultados de partidos confirmados.
- Primero y segundo de cada grupo.
- Los 8 mejores terceros que pasan de ronda.

### Se pueden predecir partidos de eliminatorias desde el inicio?

No. Solo se pueden predecir partidos ya confirmados. Un cruce con placeholders, por ejemplo `1A vs 2B`, se muestra en el fixture pero no permite cargar resultado hasta que ambos equipos esten definidos.

### Hasta cuando se puede editar una prediccion?

Una prediccion de partido se puede crear o editar hasta 15 minutos antes del inicio del partido. El backend debe validar esta regla aunque el frontend deshabilite el formulario.

### Cuando se cierran las predicciones de grupos?

Recomendacion inicial: 15 minutos antes del partido inaugural. Luego se calculan cuando termina toda la fase de grupos.

### Como se suman puntos?

Puntaje sugerido para partidos:

- Resultado exacto: 5 puntos.
- Acierto de ganador o empate: 3 puntos.
- Acierto de diferencia de gol: 2 puntos.
- Acierto de goles de un equipo: 1 punto.
- Sin acierto: 0 puntos.

Puntaje sugerido para grupos:

- Primero exacto: 4 puntos.
- Segundo exacto: 4 puntos.
- Top 2 sin posicion exacta: 2 puntos.
- Mejor tercero acertado: 2 puntos.
- Grupo perfecto: bonus de 2 puntos.

### Que pasa si se corrige un resultado real?

El backend debe permitir recalcular puntos del partido afectado, totales de usuarios y ranking.

## Desarrollo

### Cual es el stack?

- Frontend: React + Sass.
- Backend: NestJS.
- Documentacion API: Swagger en `/docs`.
- Base de datos relacional con ORM a definir, recomendado Prisma o TypeORM.

### Donde estan las reglas de arquitectura?

Revisar:

- `.github/instructions/architecture.instructions.md`
- `.github/instructions/tech-stack.instructions.md`
- `.github/instructions/code-standards.instructions.md`
- `.github/documentation/backend.md`
- `.github/documentation/frontend.md`
- `.github/documentation/database.md`

### Donde debe vivir el calculo de puntaje?

En el backend, idealmente dentro de un modulo `scoring`. El frontend puede mostrar estados y previews, pero no debe ser la fuente final de verdad.

### Que tests son prioritarios?

- Scoring de partidos.
- Scoring de clasificados de grupo.
- Bloqueo 15 minutos antes del kickoff.
- Habilitacion de partidos confirmados.
- Auth y ownership de predicciones.
- Ranking y desempates.

## Agentes y flujo de trabajo

### Como empiezo una feature?

Usa `@dev-planner` para preparar plan y contexto, luego `@developer` para implementar.

### Como hago un cambio chico?

Usa `@developer` directamente con una descripcion concreta.

### Como reviso cambios?

Usa `@code-reviewer` antes de mergear o commitear cambios relevantes.

### Como actualizo documentacion?

Usa `@management` o pide directamente actualizar los archivos de `.github/documentation` e `.github/instructions`.
