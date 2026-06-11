---
name: dev.create-pos-roadmap
description: Divide el POS completo en planes de desarrollo ordenados, ejecutables y priorizados
argument-hint: Indica si queres roadmap completo, MVP primero, o planes por modulo
---

# Crear Roadmap de Desarrollo del POS

## Objetivo

Generar una hoja de ruta de desarrollo para organizar por donde empezar el proyecto POS. El agente debe crear uno o varios planes de desarrollo, priorizados y separados por etapas logicas.

Este prompt solo planifica. No debe implementar codigo, instalar dependencias ni crear estructura de aplicacion.

## Fuentes de verdad

Leer siempre:

- `PLAN_DESARROLLO_POS.md`
- `.github/instructions/architecture.instructions.md`
- `.github/instructions/tech-stack.instructions.md`
- `.github/instructions/code-standards.instructions.md`
- `.github/documentation/backend.md`
- `.github/documentation/frontend.md`
- `.github/documentation/database.md`
- `.github/documentation/migrations.md`

Si algun archivo no existe o esta incompleto, indicarlo en el resultado y seguir con la mejor informacion disponible.

## Stack y decisiones ya definidas

- Electron para desktop.
- React en renderer process.
- JavaScript como lenguaje del proyecto.
- Redux Toolkit para estado global y orquestacion de IPC.
- Comunicacion renderer-main mediante Redux -> preload -> IPC.
- Main process con controllers, services y repositories.
- SQLite con Sequelize.
- Umzug para migraciones y seeders.
- Playwright para tests E2E.
- DB en memoria o temporal para tests, con seeds propios.
- Backups antes de migraciones.
- Logs diarios con retencion de 30 dias.
- Validaciones compartidas con Zod o equivalente.
- SOLID y DRY como principios.

## Restricciones

- No implementar codigo.
- No crear estructura `src/`.
- No instalar dependencias.
- No generar migraciones reales.
- No modificar archivos de aplicacion.
- La salida debe ser documentacion de planificacion dentro de `docs/`.

## Resultado esperado

Crear una carpeta:

```text
docs/roadmap-pos/
```

Dentro de esa carpeta, crear:

```text
roadmap.md
plan-01-base-tecnica.md
plan-02-database-migrations-seeds.md
plan-03-auth-roles-permissions.md
plan-04-company-branches-cash-registers.md
plan-05-products-stock-barcodes.md
plan-06-sales-invoices-customer-receipts.md
plan-07-suppliers-invoices-payments.md
plan-08-bi-dashboard.md
plan-09-integrations-packaging.md
plan-10-future-api-web.md
execution-notes.md
```

Si el agente considera que alguna fase debe dividirse mas, puede proponer archivos adicionales, pero debe explicar por que.

## Proceso

### Paso 1 - Leer contexto

Leer las fuentes de verdad y extraer:

- Objetivo del producto.
- MVP.
- Modulos funcionales.
- Entidades principales.
- Arquitectura.
- Stack.
- Restricciones tecnicas.
- Riesgos.
- Criterios de aceptacion.

### Paso 2 - Analisis inicial

Presentar un resumen con:

- Objetivo del producto.
- Modulos funcionales.
- Modulos tecnicos.
- Dependencias entre modulos.
- Riesgos principales.
- Decisiones pendientes.
- Supuestos detectados.

Preguntas sugeridas:

- Queres priorizar MVP operativo o arquitectura base completa?
- El MVP puede usar comprobante interno antes de factura digital/tickeadora fiscal?
- La primera version sera monousuario local o ya debe contemplar varias sucursales/cajas desde UI?
- El scanner inicial sera tipo teclado HID?
- La API/web futura solo se prepara a nivel modelo o se planifica desde ahora?

Validar con el usuario antes de generar planes, salvo que el usuario pida ejecucion directa.

### Paso 3 - Proponer estrategia de planes

Proponer una organizacion en varios planes.

Para cada plan propuesto, indicar:

- Objetivo.
- Por que va en ese orden.
- Dependencias previas.
- Entregable esperado.
- Riesgos.
- Tests E2E principales.

Validar con el usuario antes de crear archivos, salvo que el usuario pida ejecucion directa.

### Paso 4 - Crear roadmap general

Crear `roadmap.md` con:

- Vision general.
- Orden recomendado.
- Tabla de planes.
- Dependencias entre planes.
- MVP sugerido.
- Segunda etapa.
- Decisiones pendientes.
- Riesgos transversales.
- Definicion de listo para cada fase.
- Como usar los planes.

Tabla sugerida:

```markdown
| Orden | Plan | Objetivo | Depende de | Resultado |
| ----- | ---- | -------- | ---------- | --------- |
```

### Paso 5 - Crear planes por fase

Cada plan debe incluir:

- Objetivo.
- Alcance incluido.
- Alcance excluido.
- Dependencias.
- Entregables.
- Entidades involucradas.
- Cambios por capa.
- Checklist accionable.
- Criterios de aceptacion.
- Riesgos.
- Decisiones pendientes.
- Resultado esperado.

## Orden recomendado de planes

### Plan 01 - Base tecnica

Debe cubrir:

- Electron + React + Vite + JavaScript.
- Estructura base.
- Preload e IPC base.
- Redux Toolkit base.
- Validaciones compartidas.
- Playwright E2E base.
- Convenciones SOLID y DRY.

### Plan 02 - Database, migraciones y seeds

Debe cubrir:

- SQLite.
- Sequelize.
- Umzug.
- Migraciones iniciales.
- Seeders base.
- Backup antes de migraciones.
- Logs diarios.
- Limpieza de logs mayores a 30 dias.

### Plan 03 - Auth, roles y permisos

Debe cubrir:

- Usuarios.
- Roles.
- Permisos.
- Login.
- Sesion local.
- Proteccion de rutas.
- Validacion de permisos en main/services.

### Plan 04 - Empresa, sucursales y cajas

Debe cubrir:

- Empresa.
- Sucursales.
- Cajas.
- Caja activa.
- Sesiones de caja.
- Movimientos de caja.
- Asociacion de ventas/cobros/pagos a caja.

### Plan 05 - Productos, stock y codigos de barras

Debe cubrir:

- Productos.
- Categorias.
- Codigos de barras.
- Scanner HID.
- Stock.
- Movimientos de stock.
- Bajo stock.

### Plan 06 - Ventas, facturas y recibos de clientes

Debe cubrir:

- Pantalla de ventas.
- Carrito.
- Venta contado.
- Venta cuenta corriente.
- Facturas emitidas.
- Recibos de clientes.
- Pagos parciales.
- Cancelaciones/anulaciones.
- Transacciones y stock.

### Plan 07 - Proveedores, facturas y pagos

Debe cubrir:

- Proveedores.
- Facturas de proveedor.
- Pago contado.
- Pago posterior.
- Pagos parciales.
- Actualizacion de stock por compras.
- Cuentas por pagar.

### Plan 08 - Dashboard BI

Debe cubrir:

- KPIs.
- Productos mas vendidos.
- Bajo stock.
- Ventas por periodo.
- Ticket promedio.
- Saldos de clientes.
- Saldos a proveedores.
- Filtros.
- Consultas agregadas.

### Plan 09 - Integraciones y packaging

Debe cubrir:

- Factura digital o tickeadora fiscal.
- Impresion/exportacion.
- Backup/restore avanzado.
- Logs y diagnostico.
- Empaquetado.

### Plan 10 - API/web futura

Debe cubrir:

- Preparacion de modelo para sincronizacion.
- Campos de auditoria.
- Identificadores estables.
- Dashboard web administrativo futuro.
- Estrategia de sincronizacion futura.

## Formato de cada plan

Usar esta estructura:

```markdown
# Plan XX - Nombre

## Objetivo

## Alcance Incluido

## Alcance Excluido

## Dependencias

## Entregables

## Entidades Involucradas

## Plan por Capa

### Database / Migraciones / Seeders

### Main Process

### Preload / IPC

### Renderer / Redux / UI

### Tests E2E

### Documentacion

## Checklist

- [ ] Tarea concreta
  - Capa afectada:
  - Resultado verificable:
  - Referencias:

## Modelo de Datos Afectado

## IPC / Redux / Services Afectados

## Validaciones

## Transacciones

## Tests E2E

## Riesgos

## Decisiones Pendientes

## Criterios de Aceptacion

## Resultado Esperado
```

## Archivo execution-notes.md

Crear `execution-notes.md` con:

- Como elegir la primera fase.
- Como pasar de un plan a implementacion.
- Reglas para no avanzar de fase si faltan criterios de aceptacion.
- Como registrar decisiones durante ejecucion.
- Como actualizar los planes cuando cambie una decision funcional.

## Nivel de detalle esperado

- El plan debe ser suficientemente concreto para que luego un agente developer pueda implementar fase por fase.
- No incluir pseudocodigo largo.
- No incluir codigo real salvo nombres de archivos, entidades, services, slices o tests sugeridos.
- Priorizar tareas verificables.
- Incluir tests E2E con Playwright cuando aplique.
- Incluir migraciones y seeders cuando haya entidades nuevas.
- Marcar decisiones pendientes.
- Respetar JavaScript, no TypeScript.
- Respetar Redux como capa de comunicacion IPC desde renderer.
- Respetar controllers/services/repositories en main process.
- Respetar SOLID y DRY sin crear abstracciones prematuras.

## Reglas de orden

- No planificar UI antes de tener contratos de datos minimos.
- No planificar ventas antes de productos, stock, clientes, caja y permisos basicos.
- No planificar dashboard BI antes de tener datos persistidos de ventas, facturas, recibos y stock.
- No planificar integracion fiscal definitiva antes de relevar factura digital vs tickeadora fiscal.

## Validacion final

Al terminar, presentar:

- Archivos creados.
- Cantidad de planes.
- Orden recomendado.
- Que planes forman el MVP.
- Primera fase recomendada.
- Dependencias criticas.
- Decisiones pendientes que deberian resolverse antes de implementar.

Recordar que no se implemento codigo.

