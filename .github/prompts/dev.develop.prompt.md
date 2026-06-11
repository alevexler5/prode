---
name: dev.develop
description: Implementa desarrollo de software siguiendo un plan o de forma directa para cambios rápidos
argument-hint: Proporciona el path al plan (opcional) o describe qué desarrollar
---

# Desarrollo e Implementación

## Objetivo

Implementar código siguiendo un plan de desarrollo existente, o realizar cambios rápidos sin plan previo.

**🚨 REGLA DE ORO**: Ante CUALQUIER duda, ambigüedad o situación no cubierta, **SIEMPRE valida con el usuario**. NUNCA asumas decisiones técnicas, interpretaciones o cambios sin confirmar.

---

## Fase 0: Detección de Modo de Trabajo

### Paso 1: ¿Hay un plan de desarrollo?

Busca si el usuario proporcionó un archivo `development-plan.md` o si existe en `docs/`.

**Caso A - CON PLAN**: Continúa en [Fase 1: Modo con Plan](#fase-1-modo-con-plan)  
**Caso B - SIN PLAN**: Continúa en [Fase 2: Modo sin Plan (Rápido)](#fase-2-modo-sin-plan-rápido)

---

## Fase 1: Modo con Plan

### Paso 1: Leer Contexto y Plan

Lee los archivos de la carpeta de trabajo donde vive `development-plan.md`, normalmente `docs/[carpeta-de-trabajo]/`:

1. `base-context.md` - Contexto de negocio y alcance
2. `development-plan.md` - Plan técnico con checklist
3. `memory.md` - Decisiones, restricciones, consideraciones importantes
4. `completed-steps.md` - Pasos ya implementados con detalle

Si en esa misma carpeta existen `use-case.md`, `mockup.md` o `mockup.html`, úsalos como contexto adicional cuando ayuden a entender mejor el alcance funcional o visual del plan.

**IMPORTANTE**: Lee **SIEMPRE** `memory.md` para conocer:
- ❌ **Restricciones**: Qué NO hacer
- ⚠️ **Errores previos**: Qué se intentó y no funcionó
- 💡 **Decisiones tomadas**: Valores/opciones ya definidas
- 📌 **Consideraciones críticas**: Aspectos importantes a tener en cuenta

Extrae:

- **Tipo de desarrollo**: Feature/Fix/Refactor/Enhancement
- **Partes del sistema**: Backend/Frontend/Database/etc.
- **Alcance definido**: IN/OUT del contexto base
- **Tareas pendientes**: Checkboxes sin marcar `- [ ]`
- **Restricciones y consideraciones**: De memory.md

### Paso 2: Identificar Siguiente Tarea

**Si hay tareas pendientes**:

Presenta:
- Progreso actual (X/Y tareas, porcentaje)
- Próxima tarea con descripción y detalles del plan
- **Contexto de memoria relevante**: Restricciones, decisiones previas, errores a evitar, consideraciones

Opciones:
1. Ejecutar solo esta tarea (Recomendado)
2. Ejecutar múltiples tareas (especificar cuáles)
3. Ejecutar toda la fase actual
4. Ejecutar todo el plan (solo si quedan pocas tareas simples)
5. Revisar/editar el plan
6. Actualizar memoria

**Si todas las tareas están completadas**:

```
✅ ¡Plan completado!

Todas las tareas del plan han sido implementadas.

¿Qué quieres hacer ahora?
1. Generar reporte de lo implementado
2. Crear merge request (usa #file:management.create-merge-request.prompt.md)
3. Documentar en Confluence (usa #file:document-*-in-confluence.prompt.md)
4. Cerrar ticket en Jira

```

### Paso 3: Continuar en Fase 3 (Carga de Documentación)

---

## Fase 2: Modo sin Plan (Rápido)

### Paso 1: Recopilar Contexto Mínimo

No se detectó plan de desarrollo. Modo rápido para cambios sin plan previo.

Pregunta al usuario:
- **Tipo**: Fix/Hotfix/Enhancement/Chore
- **Parte(s) del sistema**: Backend/Frontend/Database/DevOps/Docs
- **Tests**: Sí (unitarios/integración) / No / Actualizar existentes
- **Descripción**: ¿Qué hay que hacer específicamente?
- **Archivos involucrados** (si los conoce)

**Guarda en memoria del chat** (no crear archivo).

### Paso 2: Continuar en Fase 3 (Carga de Documentación)

---

## Fase 3: Carga de Documentación Técnica

### Paso 1: Determinar Documentación Necesaria

Basándote en las **partes del sistema** identificadas (del plan o del contexto mínimo), lee la documentación técnica relevante de la carpeta `.github/documentation/`.

**IMPORTANTE**: Lee **SIEMPRE** la documentación necesaria, **EXCEPTO** si detectas que en este mismo chat ya la leíste previamente (verifica tu historial de mensajes en esta conversación).

**Ante la duda, lee nuevamente la documentación.**

### Paso 2: Leer Documentación

Lee los archivos necesarios y confirma brevemente.

---

## Fase 4: Gestión de Rama Git

Verifica rama actual con `git branch --show-current`.

**Si estás en rama principal** (main/master/develop):
- NO puedes desarrollar aquí
- DEBES crear nueva rama o cambiar a una existente

**Si estás en otra rama**:
- Pregunta: ¿Continuar en esta rama o crear nueva?

**Para crear nueva rama**:
- Sugiere nombre basado en contexto
- Formato: `[tipo]/[TICKET-ID]-[descripcion]` (si hay Jira) o `[tipo]/[descripcion-kebab-case]`
- Tipos: feature, fix, hotfix, refactor, enhancement, chore
- Crea la rama y cambia a ella
- Confirma rama activa

---

## Fase 5: Análisis Previo de la Tarea

**Lee archivos relevantes** (a modificar, referencia, componentes relacionados) y presenta análisis unificado:

- **Objetivo** y estrategia de implementación (pasos principales)
- **Archivos a crear/modificar** con estado actual
- **Componentes/servicios** a reutilizar (si aplica)
- **Casos borde** identificados
- **Tests** a implementar (si aplica)
- **Verificación de alcance**: Dentro del IN ✅, sin incluir OUT ❌
- **Verificación de memoria**: No viola restricciones, respeta decisiones tomadas

**🚨 VALIDACIÓN OBLIGATORIA**: Confirma análisis completo antes de continuar.

**Preguntas clave**: ¿Análisis correcto? ¿Falta algo? ¿Dentro del alcance? ¿Consideraciones adicionales?

**⛔ NO CONTINÚES sin confirmación explícita del usuario.**

---

## Fase 6: Implementación

Implementa según el modo:
- **Con Plan (una tarea)**: Solo la tarea seleccionada, siguiendo detalles específicos
- **Con Plan (múltiples)**: Todas cohesivamente, manteniendo consistencia
- **Sin Plan (rápido)**: El cambio descrito

**Siempre**:
- Respeta restricciones de memory.md
- Sigue convenciones del proyecto
- Usa componentes/servicios reutilizables mencionados

**🚨 Validaciones durante implementación**:
- **REFACTORS**: Valida que NO cambies funcionalidad (solo reestructuras código). Si cambias funcionalidad, requiere aprobación explícita.
- **LÓGICA COMPLEJA**: Valida la lógica (pseudocódigo, casos normal/borde) antes de implementar.

**Si hay dudas durante implementación, pregunta antes de continuar.**

---

## Fase 7: Validación y Confirmación

Presenta resultado de implementación:
- **Tareas completadas**
- **Archivos creados/modificados** (qué cambió en cada uno)
- **Tests implementados** (si aplica)
- **Decisiones tomadas** (con razones)
- **Restricciones respetadas**
- **Verificación de alcance**: Dentro del IN ✅ / No incluye OUT ❌

**🚨 VALIDACIÓN OBLIGATORIA**:

Checklist: Código (convenciones, lógica, sintaxis), alcance (solo lo definido), restricciones (respeta memory.md), pruebas funcionales.

**⛔ NO marcar como completado sin confirmación explícita.**

**Opciones**: APROBAR / CORREGIR (indica cambios) / REVISAR archivo / PAUSAR (probar y volver) / AGREGAR A MEMORIA

**Si correcciones**: Resume → implementa → valida nuevamente → espera confirmación. Repite hasta confirmar que está correcto.

---

## Fase 8: Actualización de Archivos del Plan (Solo si hay plan)

**⚠️ Solo tras confirmación EXPLÍCITA del usuario.**

Actualiza 3 archivos:

1. **`completed-steps.md`**: Agrega paso con timestamp, objetivo, archivos creados/modificados/tests (con descripciones), decisiones técnicas, componentes reutilizados, validación, notas (si aplica)

2. **`memory.md`**: Agrega según corresponda:
   - Decisiones Tomadas: Nombre, valor, contexto/razón, fase/fecha
   - Restricciones Nuevas: ❌ Qué NO hacer, por qué, fase
   - Errores Corregidos: ⚠️ Qué se intentó → Por qué falló → Cómo se corrigió
   - Consideraciones Importantes: Tema, consideración crítica

3. **`development-plan.md`**: Marca `[x]` y simplifica (detalle va a completed-steps.md)

Guarda y confirma: Progreso (X/Y tareas, %), próxima tarea, ¿continuar?

---

## Fase 9: Siguiente Acción

**Si quedan tareas** (con plan): Muestra progreso (X/Y tareas), próxima tarea, opciones (continuar una/múltiples/pausar/revisar)

**Si plan completado**: Resumen (tareas/archivos creados/modificados), próximos pasos (testing E2E, MR con #file:management.create-merge-request.prompt.md, docs con #file:management.document.prompt.md, cerrar Jira)

**Si modo rápido**: Archivos modificados, opciones (otro cambio/MR/finalizar)

---

## Referencias

- **Contexto previo**: `.github/prompts/dev.load-context.prompt.md`
- **Planificación**: `.github/prompts/dev.create-development-plan.prompt.md`
- **Documentación**: `.github/documentation/{backend,frontend,database}.md`
- **Arquitectura**: `.github/instructions/architecture.instructions.md`

---

**Versión**: 2.0.0  
**Última actualización**: Enero 2026  
**Tipo**: Prompt de implementación y desarrollo
