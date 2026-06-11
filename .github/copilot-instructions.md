# Instrucciones Generales - Copilot

Este proyecto cuenta con documentación contextual organizada en **instrucciones**, **prompts**, **agentes** y **documentación** para optimizar la experiencia con GitHub Copilot.

# IMPORTANTE:

- SIEMPRE sugiere al usuario que cambie al **modo Agent** para un análisis más profundo del proyecto.
- SIEMPRE, antes de CUALQUIER acción GRANDE, haz al usuario todas las preguntas necesarias para entender el contexto, clarifica dudas y valida. Itera hasta tener el contexto completo.
- SIEMPRE ten en cuenta los archivos indexados en esta guía. Antes de responder preguntas sobre el proyecto, lee los archivos relevantes.
- NUNCA respondas sin contexto. Siempre debes tener contexto del proyecto para responder preguntas.
- **⚡ CUANDO EL USUARIO TENGA DUDAS O PREGUNTE "CÓMO HACER X"**: Lee primero `.github/documentation/faq.md` para guiarlo.

---

## 📋 Instrucciones

Las instrucciones generales se añaden automáticamente al contexto en cada conversación:

- `about.instructions.md` - Descripción del proyecto
- `tech-stack.instructions.md` - Stack tecnológico completo (Backend, Frontend, Database, MCP)
- `architecture.instructions.md` - Arquitectura, estructura de carpetas y convenciones
- `tools.instructions.md` - Configuración de MCPs y claves de proyecto (GitLab, Jira, Confluence)
- `code-standards.instructions.md` - Estándares de código, convenciones de formato y mejores prácticas

## 🎯 Prompts

Prompts reutilizables y probados se encuentran en `.github/prompts/` y se agrupan por actividades:

### Configuración & Setup

- `setup.mcp-setup.prompt.md` - Configuración completa de MCPs (GitLab, Jira, Confluence, Context7, PDF Reader)
- `setup.project-setup-plan.prompt.md` - Generador de plan de setup del proyecto con stack específico
- `setup.project-setup.prompt.md` - Setup completo y automatizado (generado por setup.project-setup-plan)
- `setup.documentation-plan.prompt.md` - Generador de plan para actualizar documentación y prompts
- `setup.documentation-update.prompt.md` - Actualización iterativa de documentación/prompts (generado por setup.documentation-plan)
- `setup.branding-setup.prompt.md` - Configuración de colores y branding (opcional)

> Nota: algunos prompts de setup son **generados dinámicamente** a partir de sus prompts planificadores. Por eso pueden estar documentados aquí aunque no exista todavía un archivo materializado en `.github/prompts/`.

### Desarrollo & Features

- `dev.create-pos-roadmap.prompt.md` - Crear roadmap del POS en varios planes priorizados por fase, sin implementar codigo
- `dev.create-development-plan.prompt.md` - Crear plan detallado de desarrollo para features complejos
- `dev.load-context.prompt.md` - Cargar contexto necesario antes de desarrollar
- `dev.develop.prompt.md` - Ejecutar desarrollo según plan establecido

### Flujo de Trabajo & Gestión

- `management.create-merge-request.prompt.md` - Crear merge requests en GitLab con descripción automática
- `management.document.prompt.md` - Documentar features (backend/frontend) en Confluence o Markdown
- `management.publish-requirement.prompt.md` - Publicar casos de uso, historias de usuario o requerimientos en Jira y/o Confluence
- `management.maintain-documentation.prompt.md` - Mantener y generar documentación interna del proyecto, sincronizando guías, README, FAQ e índices

### Optimización & Mantenimiento

- `optimize-prompt.prompt.md` - Optimizar y refinar prompts existentes
- `create-agent.prompt.md` - Crear nuevos agentes especializados

---

## 🤖 Agentes

Agentes automatizados para tareas complejas en `.github/agents/`:

- `setup.agent.md` - Inicialización completa del proyecto
- `audit.agent.md` - Auditoría exhaustiva del proyecto
- `developer.agent.md` - Agente de desarrollo para implementar features
- `dev-planner.agent.md` - Planificador de desarrollo para features complejos, con soporte para partir desde un caso de uso o carpeta existente en `docs/`
- `code-reviewer.agent.md` - Revisión de código con estándares del proyecto
- `functional-analyst.agent.md` - Análisis funcional iterativo, generación de casos de uso en Markdown y publicación usando el flujo compartido de `Management`
- `ui-designer.agent.md` - Diseño de mockups en Stitch a partir de casos de uso o contexto visual del proyecto, con persistencia opcional de artefactos locales en `docs/`
- `management.agent.md` - Gestión de tareas y flujo de trabajo

---

## 📃 Documentación

Documentación técnica específica en `.github/documentation/`:

### General

- `faq.md` - Flujos de trabajo, preguntas frecuentes y guía rápida del proyecto
- `github-copilot-guide.md` - Guía breve de onboarding, setup inicial y uso recomendado del entorno

### Setup

- `setup/how-to-setup-project.md` - Inicialización del proyecto
- `setup/mcp-setup.md` - Configuración de herramientas externas

### Arquitectura & Decisiones

- `backend.md` - Documentación de backend
- `frontend.md` - Documentación de frontend
- `database.md` - Documentación de base de datos
- `migrations.md` - Gestión de migraciones

### Referencias

- `audit/` - Carpeta con auditorías y reportes del proyecto
- `audit/audit-agent-usage-guide.md` - Guía de uso del agente de auditoría y de su flujo iterativo
- `examples/` - Carpeta con ejemplos y plantillas
- `examples/use-case-template-and-example.md` - Template base y ejemplo completo para casos de uso
