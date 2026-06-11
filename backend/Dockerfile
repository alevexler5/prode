FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY backend/package*.json backend/
RUN npm ci --workspace backend

FROM deps AS build
COPY backend backend
RUN npm run prisma:generate --workspace backend
RUN npm run build --workspace backend

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
COPY backend/package*.json backend/
RUN npm ci --omit=dev --workspace backend
COPY --from=build /app/backend/dist backend/dist
COPY --from=build /app/backend/prisma backend/prisma
COPY --from=build /app/node_modules/.prisma node_modules/.prisma
COPY --from=build /app/node_modules/@prisma node_modules/@prisma
EXPOSE 3000
CMD ["node", "backend/dist/main.js"]
