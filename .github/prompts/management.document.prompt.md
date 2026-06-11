---
name: management.document
description: Genera documentación técnica completa de features desarrollados en Confluence o Markdown
argument-hint: Especifica área (backend/frontend/database/etc), fuente (MR/issue/plan/archivos), y formato de salida
---

# Documentar Feature

## Objetivo

Generar documentación técnica completa de un feature desarrollado, analizando código y contexto para crear documentación estructurada en Confluence o Markdown.

**Nota**: Requiere **modo Agent** con MCP Atlassian (Confluence) y/o GitLab (MRs). Ver configuración en `.github/instructions/tools.instructions.md`.

---

## Fase 1: Detección y Carga de Contexto

### Identificar Área y Fuente

**Área a documentar** (preguntar si no está claro): Backend, Frontend, Database, DevOps, Testing, Docs, u otra.

**Fuente de información** (auto-detectar en orden):

1. **Código seleccionado** → Analizar selección + contexto relacionado
2. **Plan de desarrollo** → Si usuario proporciona path al plan
3. **Merge Request** → Si usuario proporciona ID/link de GitLab
4. **Issue de Jira** → Si usuario proporciona issue key + archivos
5. **Archivos/carpetas** → Si usuario especifica paths
6. **Preguntar** → Si ninguno anterior aplica

### Cargar Documentación del Stack

**Lee siempre**:

- `.github/instructions/architecture.instructions.md`
- `.github/instructions/code-standards.instructions.md`
- `.github/instructions/tech-stack.instructions.md`

**Lee según área**: `.github/documentation/{area}.md` (backend, frontend, database, etc).

**Si modo Plan**: `base-context.md`, `development-plan.md`, `memory.md`, `completed-steps.md`.

### Recopilar Información del Feature

**Metadata del desarrollo**:

- Nombre del feature/entidad
- Merge Request (si existe): título, descripción, commits, archivos, fecha merge, autor
- Issue de Jira (si existe): key, título, descripción
- Plan de desarrollo (si existe): archivos del plan

**Análisis del código**: Archivos principales, relaciones, endpoints/rutas, validaciones, tests, migraciones (si aplica).

**🚨 Si hay dudas**: Preguntar al usuario antes de continuar.

Si hay varias dudas juntas o conviene proponer defaults, usa `askQuestions` con opciones recomendadas y agrega al final una pregunta abierta del tipo `¿Algo más que deba considerar?`.

---

## Fase 2: Generar Documentación

### Determinar Formato de Salida

**Auto-detectar**: Si MCP Atlassian conectado → Confluence, sino → Preguntar.

**Markdown**: `docs/features/{area}/{Entidad}{Area}.md`  
**Confluence**: `Features/{Area-capitalize}/{Entidad}/{Entidad}{Area}` (carpeta por entidad para evitar duplicados)

### Estructura Sugerida

**Secciones recomendadas** (adaptar según contenido):

```markdown
# {Entidad}{Area}

> **Estado**: ✅ Completado / 🚧 En Desarrollo  
> **Merge Request**: [MR #{numero}](link) _(si existe)_  
> **Issue Jira**: [DIL-XXX](link) _(si existe)_  
> **Fecha**: {fecha merge o actual}  
> **Autor**: {autor}  
> **Documentación relacionada**: [Ver {OtraArea}](link) _(si existe)_

---

## Resumen

## Funcionalidad

## Modelo de Datos / Interfaces

## API / Integración

## Validaciones

## Base de Datos _(si aplica)_

## Testing _(si aplica)_

## Componentes UI _(si aplica)_

## Estructura de Archivos

## Referencias

## Notas Adicionales
```

**Incluir solo secciones relevantes**. Usar tablas, código con highlight, links a archivos.

---

## Fase 3: Publicar Documentación

### Política de Ejecución

- Si el usuario pidió publicar y formato, destino y contenido ya están claros, publica directamente sin pedir una confirmación final redundante.
- Si falta un dato bloqueante, aparece una duda conceptual o una definición esencial del documento no está clara, pregunta antes de continuar.
- Si faltan metadatos secundarios, por ejemplo labels, owner, prioridad o referencias adicionales, usa defaults, omítelos o déjalos pendientes según lo permita la plataforma.
- Si tienes una recomendación razonable para una decisión no crítica, ofrécela como opción recomendada en lugar de asumirla silenciosamente.
- Si el contenido contiene placeholders o TODOs, publica igual y luego informa qué queda pendiente completar.
- Devuelve siempre el enlace directo o path resultante.

### Crear en Confluence

1. Verificar/crear estructura: `Features/{Area-capitalize}/{Entidad}/`
2. Crear página: `{Entidad}{Area}` (ej: `UsersBackend`)
3. Labels: `{area}`, `feature`, `{entidad-lowercase}`, `documented`
4. Space: ver `tools.instructions.md`

### Crear Markdown Local

1. Path: `docs/features/{area}/{Entidad}{Area}.md`
2. Frontmatter YAML con metadata (title, area, entity, status, mr, jira, date, author, related)
3. Contenido

### Actualizar Referencias

**Confluence**: Actualizar `.github/documentation/confluence-structure.md` con entrada y link.

**Markdown**: Actualizar `docs/README.md` con índice.

### Vincular con Jira

Si hay issue vinculado, agregar comentario con link a documentación.

### Vincular Áreas Relacionadas

Si hay múltiples áreas del mismo feature, vincular documentos entre sí.

---

## Notificación Final

```markdown
✅ **Documentación de {Entidad}{Area} generada exitosamente**

📋 **Detalles**:

- Título: {Entidad}{Area}
- Área: {área}
- Formato: {Confluence/Markdown}
- {Confluence: Page ID y labels / Markdown: Path al archivo}

🔗 **Link directo**: {URL o path}

📝 **Contenido documentado**:

- {N} secciones principales
- {Highlights específicos}

✨ **Referencias actualizadas**:

- {confluence-structure.md / docs/README.md actualizado}
- {Comentario en Jira DIL-XXX si aplica}
- {Vinculado con documentación de {OtraArea} si aplica}
```

---

## Casos Especiales

**Sin MR/Issue**: Advertir, marcar "🚧 En Desarrollo", usar info disponible.  
**Sin Tests**: Advertir, documentar "❌ Sin Tests", sugerir crear tests.  
**Actualizar existente**: Preguntar qué actualizar, mantener historial, actualizar metadata.  
**Multi-entidad**: Documentar principal, referenciar relacionadas, considerar docs separados.  
**Error Confluence**: Verificar permisos/conexión MCP, ofrecer Markdown alternativo.  
**Info incompleta**: Documentar disponible, marcar `[TODO]`, pedir info faltante.

---

## Referencias

- **Configuración**: `.github/instructions/tools.instructions.md`
- **Arquitectura**: `.github/instructions/architecture.instructions.md`
- **Stack**: `.github/instructions/tech-stack.instructions.md`
- **Docs Técnicas**: `.github/documentation/{area}.md`

---

**Versión**: 1.0.0  
**Última actualización**: Enero 2026
