# How to Setup Project - Guía de Inicialización

Esta guía te acompaña para inicializar o preparar un proyecto utilizando los prompts automatizados del workspace.

No siempre es necesario ejecutar el flujo completo. En muchos casos solo querrás configurar MCPs, o actualizar la documentación para dejar el repositorio listo para trabajar con IA.

---

## 🔀 Flujos Disponibles

### 0️⃣ Elegir Objetivo Antes de Empezar

Si no hay progreso previo en memoria, no existe un plan generado o el pedido del usuario es ambiguo, el agente de setup debe **preguntar primero qué quiere lograr** antes de asumir el flujo.

Preguntas recomendadas:
- ¿Quieres hacer el setup completo desde cero?
- ¿Quieres preparar un proyecto existente sin regenerar su estructura?
- ¿Quieres solo configurar MCPs y credenciales?
- ¿Quieres solo actualizar documentación y prompts para trabajar con IA?

Regla práctica:
- Si el repositorio ya tiene código y el usuario quiere preparar el entorno para trabajar con IA, normalmente alcanza con los pasos 4 y 5.
- Si el usuario necesita sincronización con GitLab, Jira o Confluence, el paso 1 puede ejecutarse solo o antes del flujo de documentación.
- Si el proyecto todavía no existe realmente y se parte del template, corresponde el flujo completo.

### 1️⃣ Proyecto Existente (Clonado)
Si clonaste un proyecto con documentación y estructura completa:

**Pasos**:
1. [MCP Setup](#paso-1-configuración-de-mcp) - Configura tus credenciales
2. [Project Setup](#paso-3-ejecución-del-setup) - **Indica al agente que los archivos ya existen, solo debe instalar dependencias e iniciar servicios**

⚠️ **Omitir**: `project-setup-plan`, `documentation-plan`, `documentation-update`

### 2️⃣ Solo Documentación para Trabajo con IA
Si ya existe un proyecto y solo quieres dejarlo preparado para trabajar con GitHub Copilot, agentes y documentación contextual:

**Pasos**:
1. [Documentation Plan](#paso-4-generación-del-plan-de-documentación) - Analiza el proyecto actual y detecta qué documentación falta o quedó desactualizada
2. [Documentation Update](#paso-5-actualización-de-documentación) - Actualiza la documentación y prompts en forma iterativa

**Opcional antes de empezar**:
1. [MCP Setup](#paso-1-configuración-de-mcp) - Solo si necesitas sincronizar Confluence, GitLab, Jira o actualizar `about.instructions.md` desde fuentes externas

**Si no existe documentación previa preparada para Copilot**:
- El paso 4 debe iterar con el usuario para detectar qué piezas documentales faltan o conviene incorporar antes de generar el plan final
- Como base, conviene evaluar documentación por capa principal de la arquitectura: backend, frontend, base de datos, integraciones, infraestructura u otras capas relevantes del proyecto
- También conviene revisar artefactos transversales útiles como FAQ, templates de casos de uso, guías de testing, migraciones, setup, deploy u operación

✅ **Usa este flujo cuando**: el código ya existe y no quieres regenerar backend/frontend/base de datos, solo mejorar el contexto documental para trabajar con IA.

### 3️⃣ Solo Configuración de MCPs
Si únicamente necesitas dejar listas las integraciones externas:

**Pasos**:
1. [MCP Setup](#paso-1-configuración-de-mcp)

✅ **Usa este flujo cuando**: solo quieres configurar credenciales, IDs de proyecto y conexiones con GitLab, Jira, Confluence, Context7 o PDF Reader.

### 4️⃣ Proyecto Desde Cero
Si estás creando un nuevo proyecto desde el template, sigue el flujo completo detallado abajo.

---

## 🎯 Objetivos Posibles

Según el flujo elegido, al finalizar tendrás alguno de estos resultados:

- ✅ Herramientas MCP configuradas y validadas
- ✅ Proyecto generado con estructura completa e iniciado
- ✅ Documentación, prompts e instrucciones alineados al stack actual
- ✅ Repositorio preparado para trabajar con IA aunque no se haya ejecutado el setup completo

### Objetivo del Flujo Completo (Proyecto Desde Cero)

Al finalizar estos pasos tendrás:
- ✅ Herramientas MCP configuradas (GitLab, Jira, Confluence, Context7)
- ✅ IDs de proyecto configurados en `tools.instructions.md`
- ✅ Estructura de Confluence sincronizada en el workspace
- ✅ Proyecto generado con estructura completa
- ✅ Servicios iniciados (Backend, Frontend, Database)
- ✅ Documentación y prompts actualizados al stack tecnológico actual

---

## 📋 Flujo de Inicialización

```
0. Elegir objetivo
   ├─ Solo MCPs → 1
   ├─ Solo documentación IA → 4 → 5
   ├─ Proyecto existente → 1 → 3
   └─ Proyecto desde cero → 1 → 2 → 3 → 4 → 5
```

---

## 🚀 Pasos Detallados

### Paso 0: Definir el Alcance del Setup

**Objetivo**: Decidir qué quiere hacer realmente el usuario antes de ejecutar pasos que pueden no ser necesarios.

**El agente debe preguntar**:
- Si quiere setup completo, setup parcial o un paso específico
- Si el repositorio ya tiene código funcional
- Si solo quiere mejorar documentación y contexto para IA
- Si necesita sincronización con herramientas externas

**Resultado**: Flujo elegido y alcance claro antes de ejecutar prompts.

---

### Paso 1: Configuración de MCP

**Prompt**: [setup.mcp-setup.prompt.md](../../prompts/setup.mcp-setup.prompt.md)

**Objetivo**: Configurar herramientas de Model Context Protocol (GitLab, Atlassian, Context7, PDF Reader) y sincronizar configuración del proyecto

**Acciones**:
- Verifica conexiones con servicios externos
- Crea/actualiza `.vscode/mcp.json`
- Configura tokens de acceso
- Agrega `mcp.json` al `.gitignore`
- **Configura IDs de proyecto en `tools.instructions.md`** (GitLab, Jira, Confluence)
- **Sincroniza estructura de Confluence** en `confluence-structure.md`
- **Actualiza `about.instructions.md`** con contenido de Confluence (si existe)

**Resultado**: Herramientas MCP funcionando correctamente y proyecto configurado en las herramientas externas

---

### Paso 2: Generación del Plan de Setup

**Prompt**: [setup.project-setup-plan.prompt.md](../../prompts/setup.project-setup-plan.prompt.md)

**Objetivo**: Analizar instrucciones del proyecto y generar el plan de setup específico

**Acciones**:
- Lee `architecture.instructions.md` y `tech-stack.instructions.md`
- Identifica componentes y stack tecnológico
- Consulta Context7 para obtener documentación actualizada
- Genera `setup.project-setup.prompt.md` personalizado

**Resultado**: Archivo `.github/prompts/setup.project-setup.prompt.md` creado con el plan específico de tu proyecto

---

### Paso 3: Ejecución del Setup

**Prompt**: [setup.project-setup.prompt.md](../../prompts/setup.project-setup.prompt.md) *(generado en paso anterior)*

**Objetivo**: Generar estructura completa del proyecto e iniciar servicios

**Acciones**:
- Verifica herramientas requeridas (Node.js, Docker, etc.)
- Configura nombre del proyecto
- Genera Backend con estructura feature-based
- Genera Frontend con arquitectura definida
- Configura Base de Datos (Docker + Prisma/TypeORM)
- Instala dependencias
- Aplica migraciones
- Inicia todos los servicios

**Resultado**: Proyecto completamente funcional con servicios ejecutándose

---

### Paso 4: Generación del Plan de Documentación

**Prompt**: [setup.documentation-plan.prompt.md](../../prompts/setup.documentation-plan.prompt.md)

**Objetivo**: Analizar el proyecto actual e identificar documentación a actualizar/agregar/eliminar

**Acciones**:
- Analiza estructura del proyecto
- Identifica archivos con referencias al stack anterior
- Detecta documentación faltante
- Identifica archivos obsoletos
- Si no existe documentación base preparada para Copilot, abre una iteración guiada con el usuario para identificar vacíos, prioridades y documentos deseables antes de cerrar el plan
- Sugiere como base mínima revisar documentación para cada capa principal de la arquitectura: frontend, backend, base de datos y cualquier otra capa relevante del proyecto
- Evalúa si conviene incluir documentos transversales como FAQ, templates de casos de uso, guías de testing, migraciones, setup, deploy, operación o troubleshooting
- Valida plan con el usuario
- Genera `setup.documentation-update.prompt.md` con checklist completo

**Resultado**: Archivo `.github/prompts/setup.documentation-update.prompt.md` con plan de actualización validado y, cuando aplique, enriquecido con documentación base y transversal recomendada para trabajar con IA

---

### Paso 5: Actualización de Documentación

**Prompt**: [setup.documentation-update.prompt.md](../../prompts/setup.documentation-update.prompt.md) *(generado en paso anterior)*

**Objetivo**: Actualizar iterativamente toda la documentación al stack actual

**Acciones** (por cada archivo):
- Selecciona item del checklist
- Analiza archivo/proyecto/stack
- Consulta Context7 si es necesario
- Responde preguntas de aclaración
- Genera/actualiza/elimina archivo
- Actualiza `copilot-instructions.md`

**Proceso**: Iterativo - un archivo a la vez hasta completar el checklist

**Resultado**: Documentación y prompts actualizados al stack tecnológico actual, sin referencias obsoletas

---

## ✅ Verificación Final

Verifica solo lo que aplique al flujo elegido:

- [ ] **MCPs funcionando**: GitLab, Jira, Confluence responden correctamente
- [ ] **Configuración de herramientas**: 
  - `tools.instructions.md` tiene IDs/Keys correctos de GitLab, Jira y Confluence
  - `confluence-structure.md` generado con la estructura actual
  - `about.instructions.md` sincronizado (si existe página About en Confluence)
- [ ] **Proyecto generado**: Estructura de carpetas completa (backend/, frontend/, etc.)
- [ ] **Servicios activos**:
  - Base de datos ejecutándose en Docker
  - Backend API respondiendo
  - Frontend dev server activo
- [ ] **Documentación actualizada**:
  - `backend.md`, `frontend.md`, etc. sin referencias al stack viejo
  - Prompts actualizados con comandos del stack actual
  - `copilot-instructions.md` indexa toda la documentación
- [ ] **README principal** documenta el proyecto como orientado a IA

Atajos por flujo:
- **Solo MCPs**: valida únicamente MCPs y configuración de herramientas
- **Solo documentación para IA**: valida únicamente documentación actualizada, prompts e indexación en `copilot-instructions.md`
- **Proyecto existente**: valida MCPs si aplican y que los servicios existentes puedan levantarse
- **Proyecto desde cero**: valida todos los puntos

---

## 📚 Próximos Pasos

Una vez completada la inicialización:

1. **Revisar documentación**: Lee [copilot-instructions.md](../copilot-instructions.md) como menú de trabajo
2. **Configurar branding** (opcional): Ejecuta [setup.branding-setup.prompt.md](../../prompts/setup.branding-setup.prompt.md)
3. **Iniciar desarrollo**: Consulta [how-to-develop-features.md](how-to-develop-features.md)

---

## 🔧 Solución de Problemas

### El agente intenta ejecutar todo el flujo sin preguntar
- Revisa que primero se aplique el [Paso 0](#paso-0-definir-el-alcance-del-setup)
- Si no hay progreso previo en memoria, el agente debe pedir intención antes de elegir pasos

### Solo quiero dejar el proyecto listo para IA
- Ejecuta `documentation-plan.prompt.md`
- Luego ejecuta `documentation-update.prompt.md`
- Ejecuta `mcp-setup.prompt.md` solo si necesitas sincronización externa

### MCPs no funcionan
- Verifica tokens en `.vscode/mcp.json`
- Reinicia VS Code completamente
- Consulta [mcp-setup.md](mcp-setup.md)

### Herramientas faltantes
- El prompt `project-setup-plan` detectará herramientas faltantes
- Proporcionará links de descarga e instrucciones de instalación

### Servicios no inician
- Verifica que Docker Desktop esté ejecutándose
- Verifica puertos disponibles
- Revisa logs de cada servicio

### Documentación desactualizada
- Ejecuta `documentation-plan.prompt.md` nuevamente
- Identifica archivos pendientes en el checklist generado

### No existe documentación base para IA
- Durante el paso 4, itera con el usuario antes de cerrar el plan
- Revisa al menos documentación por capa principal y documentos transversales relevantes
- Prioriza primero lo estructural (backend, frontend, base de datos, setup) y luego lo complementario (FAQ, casos de uso, testing, migraciones, deploy)

---

## 📝 Notas Importantes

- ⏱️ **Tiempo estimado**: 30-60 minutos (dependiendo de la instalación de herramientas)
- 🧭 **Flujo flexible**: El setup debe comenzar eligiendo objetivo, no asumiendo siempre el flujo completo
- 🔄 **Proceso iterativo**: Los pasos 4 y 5 pueden repetirse cuando cambies el stack tecnológico
- 🤖 **Preparación para IA**: En proyectos existentes, muchas veces basta con los pasos 4 y 5
- 🤖 **Orientado a IA**: Este flujo está diseñado para trabajar con GitHub Copilot Agent
- 📖 **Referencias**: Todos los prompts están documentados en `copilot-instructions.md`

---

**Versión**: 1.2.0  
**Última actualización**: 13 de abril de 2026
