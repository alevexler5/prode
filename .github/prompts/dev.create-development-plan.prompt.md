---
name: dev.create-development-plan
description: Genera plan de desarrollo técnico detallado a partir del contexto base
argument-hint: Proporciona el path a base-context.md, a una carpeta de trabajo en docs o a use-case.md
---

# Generación de Plan de Desarrollo

## 🚨 IMPORTANTE: ESTE PROMPT SOLO PLANIFICA

**Tu única tarea**: Generar `development-plan.md` con checklist de tareas.

**🚫 PROHIBIDO**:
- ❌ Implementar código
- ❌ Modificar archivos del proyecto
- ❌ Crear componentes/entidades/servicios
- ❌ Escribir código de ningún tipo

**✅ Solo debes**: Leer → Preguntar → Validar → Planificar

**🚨 REGLA DE ORO**: En CADA punto de validación marcado con "⚠️ VALIDACIÓN", SIEMPRE espera confirmación EXPLÍCITA del usuario antes de continuar. NUNCA asumas que "está bien" sin el OK del usuario.

---

## Fase 0: Validación de Pre-requisitos

**OBLIGATORIO**: Este prompt requiere un archivo `base-context.md` existente.

1. Verifica que el usuario haya proporcionado el path a `base-context.md`, a una carpeta de trabajo en `docs/` o a `use-case.md`
2. Resuelve el `base-context.md` así:
  - si el path ya apunta a `base-context.md`, úsalo directamente;
  - si el path apunta a una carpeta de trabajo, busca `base-context.md` dentro de esa carpeta;
  - si el path apunta a `use-case.md`, busca el `base-context.md` hermano dentro de la misma carpeta.
3. Si NO existe:

```
❌ No se encontró archivo de contexto base.

Primero ejecuta: #file:.github/prompts/dev.load-context.prompt.md

Luego vuelve con:
Usa #file:dev.create-development-plan.prompt.md
Contexto: #file:docs/[CARPETA-DE-TRABAJO]/base-context.md

Si ya tienes `use-case.md` o una carpeta de trabajo en `docs/`, reutiliza esa misma carpeta al crear el contexto.

⛔ Proceso detenido.
```

**🚫 DETÉN LA EJECUCIÓN si no hay contexto.**

4. Una vez confirmado, lee el archivo completo y extrae:
   - Tipo de desarrollo (Feature/Fix/Refactor/Enhancement/Hotfix/Chore)
   - Partes del sistema (Backend/Frontend/Database/DevOps/Testing/Docs)
   - Objetivo de negocio
   - Descripción y alcance (IN/OUT)
   - Relaciones y dependencias

---

## Fase 1: Carga de Contexto Técnico

### Documentación del Proyecto

Lee la documentación relevante según las **partes del sistema** identificadas:

| Parte      | Documentación                                       |
| ---------- | --------------------------------------------------- |
| Backend    | `.github/documentation/backend.md`                  |
| Frontend   | `.github/documentation/frontend.md`                 |
| Database   | `.github/documentation/database.md`                 |
| Migraciones| `.github/documentation/migrations.md`               |
| Siempre    | `.github/instructions/architecture.instructions.md` |
| Siempre    | `.github/instructions/tech-stack.instructions.md`   |

**Objetivo**: Entender estructura, convenciones, patrones arquitectónicos, stack tecnológico, flujo de desarrollo.

**⚠️ VALIDACIÓN**: Presenta resumen detallado de:
- Documentación leída
- Patrones arquitectónicos identificados
- Stack y versiones relevantes

**Espera confirmación EXPLÍCITA antes de continuar.**

### Features de Referencia

Busca semánticamente features similares al dominio a desarrollar.

**Ejemplo**: Si es "Products", busca `backend/Backend/Features/products/` o `frontend/src/features/products/`

**⚠️ VALIDACIÓN**: Presenta features encontradas y **espera confirmación** del usuario. Si confirma alguna, lee archivos clave para entender estructura.

### Context7 (Opcional)

Usa **Context7 MCP** solo si:
- Funcionalidad completamente nueva sin referencia en el código
- API/componente de librería no usado antes
- Patrones específicos de una librería

**No abuses**: Prioriza código de referencia del proyecto.

---

## Fase 2: Preguntas Técnicas Iterativas

Haz preguntas específicas basadas en documentación leída y tipo de desarrollo. **🚨 RECUERDA**: Estás PLANIFICANDO, NO implementando.

### Guía de Preguntas

**Para Features**:
- **Backend**: Entidad (propiedades, relaciones con otras entidades), Endpoints (operaciones necesarias, rutas base, endpoints especiales), Validaciones (reglas específicas, validaciones de negocio), Lógica de negocio (reglas al crear/actualizar/eliminar, permisos/roles)
- **Frontend**: Páginas (cuáles, rutas), Componentes (específicos, basarse en referencia), Estilos (colores, diseño especial), Integraciones (endpoints a llamar, validaciones cliente)

**Para Fixes**:
- Archivos afectados (cuáles, líneas aproximadas)
- Causa raíz (identificada o hay que investigar)
- Impacto (tests de regresión, otros módulos afectados)

**Para Refactors**:
- Alcance (archivos/carpetas específicos, cambio de estructura)
- Objetivo (rendimiento, mantenibilidad, aplicar patrón específico)
- Compatibilidad (mantener APIs existentes, migrar datos)

**Para Enhancements**:
- Base existente (archivos a extender/modificar)
- Adiciones (nuevos archivos/campos/componentes)
- Retrocompatibilidad necesaria

**Itera hasta tener respuestas claras. NO asumas, pregunta.**

**⚠️ VALIDACIÓN**: Presenta resumen completo de requerimientos técnicos y **espera confirmación EXPLÍCITA**.

```
📝 Resumen de requerimientos técnicos:

[Entidades/Modelos]: [Detalles]
[Endpoints/Páginas]: [Detalles]
[Validaciones]: [Detalles]
[Lógica de Negocio]: [Detalles]

✅ ¿Completo y correcto? ¿Falta algo? (Confirma explícitamente)
```

---

## Fase 3: Análisis de Archivos

Basándote en toda la información, identifica archivos a **crear/modificar/eliminar** por parte del sistema.

Presenta lista organizada:

```
📁 Análisis de archivos:

**BACKEND**
Crear:
- [Archivo 1] - [Razón]

Modificar:
- [Archivo 2] - [Qué se modifica]

Eliminar:
- [Archivo 3] - [Por qué]

**FRONTEND**
[... similar ...]

**DATABASE**
[... similar ...]
```

**⚠️ VALIDACIÓN**: **Espera confirmación EXPLÍCITA** del usuario.

```
✅ ¿Correcta esta lista? ¿Falta o sobra algo? (Confirma explícitamente)
```

**🚨 RECUERDA**: Solo estás LISTANDO archivos, NO los crees ni modifiques todavía.

---

## Fase 4: Generar Plan de Desarrollo

Crea 3 archivos en la misma carpeta donde resolviste `base-context.md`, es decir `docs/[carpeta-de-trabajo]/`:

### 1. `development-plan.md`

```markdown
# Plan de Desarrollo: [Título]

**Generado**: [Fecha hora] | **Contexto**: [Link base-context.md] | **Tipo**: [Tipo] | **Stack**: [Partes]

---

## 📋 Checklist de Desarrollo

**Nota**: Al completar tareas, los detalles se mueven a `completed-steps.md`.

### Fase 1: [Nombre]

- [ ] **[Tarea 1]**
  - Descripción clara del objetivo
  - Aclaraciones específicas del usuario
  - Referencias a archivos/componentes de referencia
  - Consideraciones técnicas importantes
  - Casos borde, advertencias críticas

- [ ] **[Tarea 2]**
  - [Detalles específicos]

### Fase 2: [Nombre]
[... más fases según sea necesario ...]

---

## 📚 Referencias

**Features similares**: [Feature] - [Path] - [Por qué es similar]
**Documentación consultada**: [Lista]
**Context7 usado**: [Librería] - [Para qué]

---

## 🎯 Opciones de Ejecución

1. **Paso a paso** (recomendado): Una tarea con validación
2. **Por fases**: Una fase completa
3. **Todo el plan**: Todas las tareas (solo si es simple)
```

**Notas**:
- Agrupa por fases lógicas según flujo de trabajo
- Títulos claros con aclaraciones específicas debajo
- Menciona archivos/componentes de referencia
- Nivel de detalle balanceado (ni pseudocódigo ni muy vago)

### 2. `memory.md` (Template vacío para ejecución)

```markdown
# Memoria de Ejecución: [Título]

**Última actualización**: [Fecha] | **Plan**: [Link]

## 💡 Decisiones Tomadas
[Se completa durante ejecución]

## 🔄 Cambios Durante Ejecución
[Se completa durante ejecución]

## ⚠️ Consideraciones Importantes
[Se completa durante ejecución]

## 🔗 Referencias Adicionales
[Se completa durante ejecución]
```

### 3. `completed-steps.md` (Template vacío para ejecución)

```markdown
# Pasos Completados: [Título]

**Última actualización**: [Fecha] | **Plan**: [Link]

## 📋 Registro de Implementación

[Los pasos completados se agregarán aquí durante ejecución]

---

### ✅ Fase X: [Nombre] - [Fecha Hora]
**Tarea**: [Nombre]
**Implementación**: [Detalles]
**Validación**: [Cómo se validó]
**Notas**: [Consideraciones adicionales]
```

### Instrucciones de Guardado

1. Verifica que la carpeta exista (del paso anterior)
2. Guarda los 3 archivos
3. Confirma la carpeta de trabajo al usuario
4. Muestra estadísticas del plan

**⚠️ VALIDACIÓN FINAL**: Presenta resumen completo **y espera confirmación EXPLÍCITA**:

```
📊 Plan de Desarrollo Generado

📁 Archivos creados:
- development-plan.md (X fases, Y tareas totales)
- memory.md (template para decisiones)
- completed-steps.md (template para pasos completados)

📋 Resumen:
- Fase 1: [Nombre] ([N] tareas)
- Fase 2: [Nombre] ([N] tareas)
[...]

🔍 Total archivos a crear: [N]
🔧 Total archivos a modificar: [N]
🗑️ Total archivos a eliminar: [N]

✅ ¿Todo correcto? ¿Algún ajuste antes de proceder? (Confirma explícitamente)
```

**🚫 RECUERDA**: Has generado el PLAN, NO has implementado nada. El código se implementará con `dev.execute-plan.prompt.md`.

---

## Notas Técnicas

**Agrupación de fases**: Por capa completa (DB → Backend → Frontend → Verificación) o por funcionalidad (CRUD Read → CRUD Create → CRUD Update → CRUD Delete).

**Convenciones de nombres de tareas**: Crear (nuevos), Actualizar (agregar funcionalidad), Modificar (cambios), Refactorizar (reestructurar sin cambiar funcionalidad), Eliminar (borrar obsoletos), Configurar (ajustes de configuración).

**Nivel de detalle apropiado**: Balanceado - mencionar referencias a archivos similares, métodos/propiedades clave, consideraciones técnicas importantes. Evitar pseudocódigo línea por línea o tareas muy vagas.

---

## Referencias

- **Contexto previo**: `.github/prompts/dev.load-context.prompt.md`
- **Siguiente paso**: `.github/prompts/dev.execute-plan.prompt.md`
- **Documentación**: `.github/documentation/{backend,frontend,database}.md`
- **Arquitectura**: `.github/instructions/architecture.instructions.md`

---

**Versión**: 2.0.0  
**Última actualización**: Enero 2026  
**Tipo**: Prompt de planificación técnica (🚫 NO implementa código)
