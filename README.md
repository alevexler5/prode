# Prode Mundial

Aplicacion web para jugar un Prode del Mundial con React, Sass, NestJS, Prisma, PostgreSQL y Swagger.

## Requisitos

- Node.js 20+
- npm 10+
- Docker + Docker Compose

## Setup local

1. Crear archivos de entorno:

```bash
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env
```

2. Levantar PostgreSQL:

```bash
docker compose up -d
```

3. Instalar dependencias y preparar DB:

```bash
npm install
npm run prisma:generate --workspace backend
npm run db:migrate
npm run db:seed
```

Tambien podes usar:

```bash
npm run setup:local
```

## Desarrollo

Backend:

```bash
npm run dev:backend
```

Frontend:

```bash
npm run dev:frontend
```

Swagger:

- `http://localhost:3000/docs`

Healthcheck:

- `http://localhost:3000/health`

## Scripts utiles

```bash
npm run build
npm run test
npm run lint
npm run db:migrate
npm run db:seed
npm run db:reset
```

## Datos iniciales

- Usuario admin: `admin@prode.local`
- Password inicial: `admin123`

## Variables

- `backend/.env.example`
- `frontend/.env.example`
- `JWT_SECRET` es obligatorio; en `production` o `staging` no debe quedar con `change-me-in-development`.
- `CORS_ORIGIN` acepta uno o varios origins separados por coma.

## Troubleshooting

- Si Prisma cambia schema, correr de nuevo `npm run prisma:generate --workspace backend`.
- Si queres reiniciar base local: `docker compose down -v` y luego `npm run db:reset`.
- Si el frontend expulsa la sesion, revisar `JWT_SECRET`, `VITE_API_URL` y el estado de `/health`.

## Seguridad y dependencias

- `npm audit --omit=dev` reporta vulnerabilidades transitivas y directas del stack actual.
- No se aplicaron upgrades semver-major automaticos en esta etapa para no romper compatibilidad de NestJS/Prisma.
