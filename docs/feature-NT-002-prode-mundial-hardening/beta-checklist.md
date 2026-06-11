# Checklist de Beta

- [ ] PostgreSQL levanta con `docker compose up -d`
- [ ] `npm run db:migrate` funciona desde cero
- [ ] `npm run db:seed` carga admin y fixture
- [ ] Backend responde en `/health`
- [ ] Swagger carga en `/docs`
- [ ] Registro e inicio de sesion funcionan
- [ ] Fixture lista partidos confirmados y no confirmados
- [ ] Se puede crear y editar una prediccion antes del deadline
- [ ] No se puede editar una prediccion despues del deadline
- [ ] No se puede predecir un partido con placeholders
- [ ] El admin puede cargar resultados
- [ ] El admin puede confirmar cruces
- [ ] El admin puede cargar standings
- [ ] Ranking refleja puntos de partidos y grupos
- [ ] Frontend build y backend build pasan
- [ ] `npm audit --omit=dev` fue revisado
