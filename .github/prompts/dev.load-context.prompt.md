---
name: dev.load-context
description: Carga contexto inicial para cualquier tarea de desarrollo desde múltiples fuentes
argument-hint: Describe la tarea, pega texto, comparte una carpeta/path de docs o escribe "jira" para buscar tickets asignados
---

# Carga de Contexto para Desarrollo

## Objetivo

Recopilar y estructurar toda la información necesaria para **entender la intención** de una tarea de desarrollo, independientemente de la fuente de información.

**IMPORTANTE**: Este prompt se enfoca en el **QUÉ** (intención, objetivo de negocio, alcance funcional), NO en el **CÓMO** (análisis técnico, arquitectura, archivos específicos). El análisis técnico se realizará en el prompt de planificación (`dev.create-development-plan.prompt.md`).

**🚨 REGLA DE ORO**: Ante CUALQUIER duda o ambigüedad, **SIEMPRE valida con el usuario**. NUNCA asumas información, interpretaciones o decisiones por tu cuenta.

**Nota**: Si deseas consultar tickets de Jira, requiere **modo Agent** con acceso a herramientas MCP de Jira. Para otras fuentes (texto, audio, archivos), el modo Agent es opcional.

---

## Fase 1: Recopilación de Información

Identifica automáticamente la fuente proporcionada y extrae información relevante:

### Fuentes Soportadas

**1. Jira Ticket**
- Trigger: "jira", "ticket", o ID específico (ej: "DIL-123")
- Si solo escriben "jira": Consulta `assignee = currentUser() AND status NOT IN (Done, Closed) AND project = {PROJECT_KEY}`, muestra lista, pregunta cuál trabajar
- Si dan ID: Consulta directamente ese ticket
- **Información a extraer**: summary, description, status, priority, labels, issueType, acceptance criteria, issueLinks, comments (últimos 5), assignee, sprint, parent

**2. Descripción de Texto**
- Lee y analiza el texto proporcionado
- Si es muy breve (< 50 palabras): **Pregunta por más detalles**

**3. Transcripción de Audio**
- Lee la transcripción e identifica requerimientos
- Si es ambigua: **Pide aclaraciones**

**4. Archivo Adjunto**
- Lee el contenido (Markdown, TXT, PDF con MCP)
- Extrae requerimientos y contexto

**5. Múltiples Fuentes**
- Integra información de todas
- Si hay conflictos: **Pregunta al usuario cuál es correcta**

**6. Carpeta o caso de uso existente en `docs/`**
- Si el usuario comparte una carpeta de trabajo o un `use-case.md`, reutiliza esa carpeta como ancla del flujo
- Lee primero `use-case.md` y luego `mockup.md`, `mockup.html` o artefactos vecinos solo si aportan contexto funcional real
- Si la carpeta ya contiene material útil, crea `base-context.md` allí mismo en lugar de abrir una carpeta paralela

---

## Fase 2: Análisis y Clasificación

### Tipo de Desarrollo

Identifica el tipo basándote en la información:

| Tipo            | Descripción                                          | Indicadores                                                     |
| --------------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| **Feature**     | Nueva funcionalidad desde cero                       | "agregar", "crear", "nueva", "implementar", labels: feature     |
| **Fix**         | Corrección de un error o bug                         | "bug", "error", "no funciona", "arreglar", labels: bug          |
| **Refactor**    | Reestructuración de código sin cambiar funcionalidad | "refactorizar", "mejorar código", "optimizar", labels: refactor |
| **Enhancement** | Mejora o extensión de funcionalidad existente        | "mejorar", "extender", "agregar a", labels: enhancement         |
| **Hotfix**      | Corrección urgente en producción                     | "urgente", "crítico", "producción", priority: Highest           |
| **Chore**       | Tareas de mantenimiento (dependencias, config, docs) | "actualizar", "configurar", "documentar", labels: chore         |

**Si no es claro**: Presenta opciones y **pregunta al usuario**.

### Partes del Sistema Involucradas

Determina qué partes del stack se verán afectadas:

| Parte        | Descripción                            | Indicadores                                                     |
| ------------ | -------------------------------------- | --------------------------------------------------------------- |
| **Backend**  | API, servicios, lógica de negocio      | "endpoint", "API", "servicio", "base de datos", labels: backend |
| **Frontend** | UI, componentes React, páginas         | "página", "formulario", "componente", "botón", labels: frontend |
| **Database** | Esquema, migraciones, queries          | "tabla", "migración", "modelo", "entidad", "PostgreSQL"         |
| **DevOps**   | CI/CD, Docker, deploy, infraestructura | "deploy", "docker", "pipeline", "AWS", labels: devops           |
| **Testing**  | Tests unitarios, integración, E2E      | "test", "prueba", "cobertura", labels: testing                  |
| **Docs**     | Documentación técnica o de usuario     | "documentación", "README", "guía", labels: documentation        |

**Si no es claro**: **Pregunta al usuario** qué partes están involucradas.

### Necesidad de Tests

**Analiza el contexto** y **pregunta explícitamente** si se deben implementar tests (unitarios, integración, regresión). Guarda la respuesta para la planificación.

### Descripción de Alto Nivel

**Haz preguntas al usuario para entender la intención de negocio** (NO detalles técnicos):

**Para Features**:
- ¿Cuál es el objetivo de negocio? ¿Qué problema resuelve?
- ¿Qué debe poder hacer el usuario final?
- ¿Hay reglas de negocio importantes? (permisos, validaciones)
- ¿Integra con sistemas externos?

**Para Fixes**:
- ¿Comportamiento actual (erróneo) vs esperado?
- ¿Cómo reproducir el error?
- ¿Mensajes de error o logs relevantes?

**Para Refactors**:
- ¿Qué parte refactorizar y por qué?
- ¿Cambia algo del comportamiento visible?

**Para Enhancements**:
- ¿Qué funcionalidad se mejora?
- ¿Qué cambia desde la perspectiva del usuario?
- ¿Afecta funcionalidad existente?

**🚨 No continúes sin respuestas claras. NO asumas, pregunta.**

---

## Fase 3: Determinar Carpeta de Trabajo

### Reutilizar Carpeta Existente

- **Si el usuario proporcionó una carpeta en `docs/`**: reutilízala
- **Si el usuario proporcionó `use-case.md`**: usa su carpeta contenedora
- **Si detectas una carpeta existente claramente asociada al caso**: propón reutilizarla antes de crear una nueva

Si reutilizas una carpeta existente, no la renombres automáticamente aunque luego aparezca un ticket. Solo cambia el nombre si el usuario lo pide explícitamente.

### Crear Nueva Carpeta

### Ticket ID

- **Si hay ticket de Jira**: Usa el ID (ej: `DIL-123`)
- **Si NO hay ticket**: Busca en `docs/` carpetas con prefijo `NT-`, identifica siguiente número (`NT-001`, `NT-002`...), **verifica que no exista**

### Entidad de Dominio

Analiza el contexto e identifica la entidad principal (ej: `users`, `authentication`, `products`, `reports-dashboard`).

**Si hay múltiples entidades o no es claro**: **Pregunta al usuario** cómo nombrar la carpeta.

### Convención de Carpeta Nueva

- Si el usuario ya indicó un nombre de carpeta, respétalo.
- Si no indicó uno y no hay carpeta reutilizable, propón por defecto `docs/[tipo-lowercase]-[ticket-id]-[entidad]/`.

### Confirmación

**Siempre confirma con el usuario**: `📁 Carpeta de trabajo propuesta: docs/[carpeta-de-trabajo]/ ¿OK o prefieres cambiarla?`

---

## Fase 4: Generar Archivo de Contexto

Crea `docs/[carpeta-de-trabajo]/base-context.md` con:

```markdown
# Contexto de Desarrollo: [Título]

**Generado**: [Fecha] | **Ticket**: [ID o "No tracked"] | **Tipo**: [Tipo] | **Partes**: [Partes]

---

## 📋 Información Original

**Fuente**: [Jira/Texto/Audio/Archivo]

**Descripción Original**: [Transcripción literal]

**Criterios de Aceptación** (si aplican):
- [ ] Criterio 1
- [ ] Criterio 2

---

## 🎯 Objetivo de Negocio

[PARA QUÉ se hace esto, valor de negocio, problema que resuelve]

---

## 📝 Descripción Detallada

**Qué se quiere hacer**: [Descripción extendida y clara]

**Alcance (IN/OUT)**:
- ✅ Incluido: [Lista]
- ❌ NO incluido: [Lista]

---

## 🔗 Relaciones y Dependencias

**Tickets Relacionados**: [Si aplica]
- Depende de: [...]
- Bloqueado por: [...]

**Integraciones Externas**: [Si aplica]

**Artefactos locales relacionados**: [Lista de `use-case.md`, `mockup.html`, `mockup.md` u otros archivos de la misma carpeta, si aplican]

---

## 📝 Notas Adicionales

[Información extra relevante]

---

## 🚦 Siguiente Paso

✨ **Contexto cargado exitosamente**

```
Usa #file:dev.create-development-plan.prompt.md
Contexto: #file:docs/[CARPETA-DE-TRABAJO]/base-context.md
```

El prompt de planificación usará este contexto para análisis técnico y especificación del CÓMO.
```

**Instrucciones de guardado**:
1. Verifica que la carpeta no exista
2. Crea directorios si es necesario
3. Guarda el archivo
4. Confirma ubicación al usuario

---

## Notas Técnicas

**Ticket ID No Tracked**: Formato `NT-001`, padding de 3 dígitos. Verificar existencia en `docs/` antes de asignar cuando se vaya a crear una carpeta nueva.

**Nombres de Carpeta**: minúsculas, guiones para separar palabras (ej: `users-management`), descriptivos pero concisos. Si ya existe una carpeta asociada al caso, reutilízala antes de crear otra.

---

## Referencias

- **Project Key**: `.github/instructions/tools.instructions.md`
- **Stack Tecnológico**: `.github/instructions/tech-stack.instructions.md`
- **Arquitectura**: `.github/instructions/architecture.instructions.md`
- **Siguiente prompt**: `.github/prompts/dev.create-development-plan.prompt.md`

---

**Versión**: 2.0.0  
**Última actualización**: Enero 2026  
**Tipo**: Prompt de entrada para flujo de desarrollo
