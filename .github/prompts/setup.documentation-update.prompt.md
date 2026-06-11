---
name: documentation-update
description: Actualizacion iterativa de documentacion e instrucciones para el POS Electron + React + SQLite
---

# Documentation Update - POS Desktop

Este prompt actualiza la documentacion del proyecto usando como fuente de verdad:

- `PLAN_DESARROLLO_POS.md`
- `.github/instructions/architecture.instructions.md`
- `.github/instructions/tech-stack.instructions.md`
- `.github/instructions/code-standards.instructions.md`

No debe generar codigo de features ni estructura de aplicacion. El objetivo es dejar la documentacion lista para trabajar con IA.

## Stack actual

- Desktop: Electron.
- Renderer: React + Vite + JavaScript.
- Estado global: Redux Toolkit.
- Comunicacion renderer-main: Redux -> preload -> IPC -> controllers.
- Main process: controllers -> services -> repositories.
- Base de datos: SQLite.
- ORM: Sequelize.
- Migraciones y seeders: Umzug.
- Testing: Playwright E2E con DB en memoria o temporal y seeds propios.
- Validacion: Zod o libreria equivalente.
- Logs: archivo diario, retencion 30 dias.
- Backup: automatico antes de migraciones.

## Checklist de actualizacion

### Fase 1 - Instrucciones core

- [ ] `.github/instructions/architecture.instructions.md`
  - Estado esperado: actualizado.
  - Verificar que documente Electron main/preload/renderer, Redux, IPC, controllers/services/repositories, transacciones, logs, backups, DB y API futura.

- [ ] `.github/instructions/tech-stack.instructions.md`
  - Estado esperado: actualizado.
  - Verificar que documente Electron, React, Redux Toolkit, SQLite, Sequelize, Umzug, Playwright, Zod, logs, packaging e integraciones.

- [ ] `.github/instructions/code-standards.instructions.md`
  - Estado esperado: actualizado.
  - Verificar SOLID, DRY, seguridad Electron, validaciones, transacciones, E2E y reglas funcionales criticas.

- [ ] `.github/instructions/about.instructions.md`
  - Accion: actualizar.
  - Debe describir el producto, objetivo funcional, usuarios, alcance MVP y vision futura con API/web administrativa.

### Fase 2 - Documentacion tecnica

- [ ] `.github/documentation/backend.md`
  - Accion: crear/actualizar.
  - Debe cubrir main process como backend local, controllers IPC, services, repositories, permisos, transacciones, logs, backups, fiscal, scanner y errores.

- [ ] `.github/documentation/frontend.md`
  - Accion: crear/actualizar.
  - Debe cubrir renderer React, componentes presentacionales/contenedores, Redux Toolkit, thunks/listeners para IPC, rutas, formularios, estados de carga/error y dashboard.

- [ ] `.github/documentation/database.md`
  - Accion: crear/actualizar.
  - Debe cubrir SQLite, Sequelize, modelos, relaciones, entidades principales, indices, baja logica, auditoria y preparacion para sincronizacion futura.

- [ ] `.github/documentation/migrations.md`
  - Accion: crear/actualizar.
  - Debe cubrir Umzug, migraciones, seeders, backup antes de migrar, bloqueo ante fallas, version de schema y tests E2E de migraciones.

- [ ] `.github/documentation/testing.md`
  - Accion: agregar.
  - Debe cubrir Playwright E2E, DB en memoria o temporal, seeds consistentes, flujos prioritarios y aislamiento de datos reales.

- [ ] `.github/documentation/operations.md`
  - Accion: agregar.
  - Debe cubrir logs diarios, retencion 30 dias, backups, restore, actualizaciones, diagnostico, rutas locales y soporte.

- [ ] `.github/documentation/integrations.md`
  - Accion: agregar.
  - Debe cubrir scanner de codigo de barras, factura digital/tickeadora fiscal, impresoras, adaptadores y decisiones pendientes.

### Fase 3 - Documentacion funcional

- [ ] `.github/documentation/functional-scope.md`
  - Accion: agregar.
  - Debe resumir modulos funcionales: usuarios, roles, empresa, sucursales, cajas, clientes, productos, ventas, facturas, recibos, proveedores y dashboard BI.

- [ ] `.github/documentation/bi-dashboard.md`
  - Accion: agregar.
  - Debe documentar metricas iniciales, filtros, consultas agregadas, KPIs y reglas de datos.

- [ ] `.github/documentation/faq.md`
  - Accion: actualizar.
  - Debe agregar preguntas frecuentes especificas del POS, flujo de setup documental, testing E2E, migraciones y arquitectura Electron.

### Fase 4 - Indice y prompts

- [ ] `.github/copilot-instructions.md`
  - Accion: actualizar.
  - Debe indexar los nuevos documentos y mantener instrucciones para leer contexto antes de responder.

- [ ] `.github/prompts/dev.create-development-plan.prompt.md`
  - Accion: revisar/actualizar solo si contiene supuestos incompatibles.
  - Debe indicar que los planes de desarrollo deben respetar el POS, Electron, Redux, Sequelize, Umzug, Playwright E2E, SOLID y DRY.

- [ ] `.github/prompts/dev.develop.prompt.md`
  - Accion: revisar/actualizar solo si contiene supuestos incompatibles.
  - Debe reforzar que no se accede a DB desde renderer y que se usan services/repositories.

## Proceso iterativo

Para cada item del checklist:

1. Leer el archivo actual si existe.
2. Leer `PLAN_DESARROLLO_POS.md`.
3. Leer las instrucciones core relevantes.
4. Presentar un resumen breve del cambio propuesto.
5. Esperar confirmacion del usuario antes de escribir si el usuario no pidio ejecucion automatica.
6. Crear o reemplazar el archivo completo con documentacion ligera y precisa.
7. Evitar ejemplos extensos de codigo salvo pedido explicito.
8. Actualizar `.github/copilot-instructions.md` si se agrega o elimina documentacion.
9. Marcar el item como completado en el resumen de avance.

## Orden recomendado

1. `about.instructions.md`
2. `backend.md`
3. `frontend.md`
4. `database.md`
5. `migrations.md`
6. `testing.md`
7. `operations.md`
8. `integrations.md`
9. `functional-scope.md`
10. `bi-dashboard.md`
11. `faq.md`
12. `copilot-instructions.md`
13. Prompts de desarrollo si corresponde.

## Criterios de aceptacion

- La documentacion no contiene referencias a stacks no usados.
- Backend, frontend y database quedan documentados para guiar a agentes IA.
- Las instrucciones core reflejan el plan del POS.
- Las migraciones con Umzug y backups previos quedan documentados.
- Playwright E2E con DB aislada y seeds propios queda documentado.
- Redux como capa de estado y comunicacion IPC queda documentado.
- Controllers, services y repositories quedan documentados.
- SOLID y DRY quedan presentes en instrucciones y documentacion.
- `copilot-instructions.md` indexa todos los documentos relevantes.

## Notas

- No ejecutar setup completo.
- No crear codigo de app.
- No instalar dependencias.
- No crear estructura `src/` todavia.
- Este prompt pertenece al flujo parcial "Solo documentacion para IA".
