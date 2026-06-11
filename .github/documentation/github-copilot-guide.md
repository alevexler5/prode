# Guía Breve para Trabajar con GitHub Copilot

Esta guía resume cómo usar este repositorio para preparar cualquier proyecto y trabajar mejor con GitHub Copilot.

Puedes pasar este archivo como contexto a GitHub Copilot, a cualquier chat LLM o a un agente. La idea es que el asistente use esta guía para ayudarte a elegir el flujo correcto, el agente correcto y el siguiente paso correcto.

Esta guía no reemplaza la documentación técnica del proyecto. Sirve como mapa de uso rápido.

## Objetivo de Esta Guía

El objetivo es que cualquier equipo pueda incorporar estas carpetas a su proyecto, configurar el entorno mínimo para trabajar con GitHub Copilot y adoptar un flujo de trabajo consistente con agentes, prompts, instrucciones y memorias.

La intención no es obligar a todos los proyectos a usar exactamente la misma estructura documental. La intención es ofrecer una base reutilizable, adaptable y mantenible.

## Uso Recomendado

- Trabaja preferentemente en modo Agent.
- Indica desde el inicio qué quieres lograr: setup completo, proyecto existente, solo MCPs o solo documentación para IA.
- Para preparar por primera vez el proyecto y adaptar templates, instrucciones, prompts o documentación base, usa preferentemente `@Setup`.
- Usa esta guía para orientar la conversación y deja que Copilot ejecute los pasos concretos.
- Si tienes una duda puntual de "cómo hacer X", carga también [faq.md](faq.md).

## Cómo Obtener Estos Archivos

Si este contenido se comparte por fuera del repositorio, puedes obtenerlo de cualquiera de estas formas:

### Opción 1. Clonar el repositorio

```bash
git clone https://gitlab.diveria.com/dvr/dvr-technology/ai/ai-first-dvr.git
cd ai-first-dvr
```

### Opción 2. Descargar el repositorio

- Descarga el repositorio desde: `https://gitlab.diveria.com/dvr/dvr-technology/ai/ai-first-dvr`
- Extrae el contenido localmente.
- Copia `.github/` y, si aplica, `.vscode/` al proyecto donde vas a trabajar.

### Opción 3. Copiar solo las carpetas necesarias

- Copia la carpeta `.github/` a la raíz del repositorio de trabajo.
- Copia también `.vscode/` si vas a usar configuración MCP u otros archivos de workspace.

## Dónde Deben Ir las Carpetas

La ubicación recomendada es siempre la raíz del repositorio sobre el que vas a trabajar.

- `.github/` debe quedar en la ruta principal del repositorio.
- `.vscode/` debe quedar también en la ruta principal cuando el proyecto necesite configuración local de VS Code o MCPs.

### Si trabajas con un solo repositorio

- Copia `.github/` y `.vscode/` directamente en la raíz del proyecto.

### Si trabajas con varios repositorios relacionados

Tienes tres opciones válidas:

1. Crear una carpeta general, colocar allí todos los repositorios, copiar `.github/` y `.vscode/` en esa carpeta general y abrir VS Code sobre esa raíz.
2. Copiar `.github/` y `.vscode/` dentro de cada repositorio por separado.
3. Abrir un workspace multi-root en VS Code y agregar estas carpetas al workspace si el equipo prefiere centralizar la configuración desde allí.

La mejor opción depende de cómo trabaje el equipo, pero la regla general es simple: Copilot debe ver estas carpetas desde el contexto real con el que vas a trabajar.

## Mínimo Necesario

- VS Code actualizado.
- Extensiones GitHub Copilot y GitHub Copilot Chat instaladas.
- Sesión iniciada con la cuenta corporativa que tenga la licencia activa.
- La carpeta `.github/` y, cuando aplique, la carpeta `.vscode/` copiadas al proyecto.

## Tecnologías y Herramientas que Puedes Necesitar

No todas son obligatorias en todos los proyectos, pero si quieres configurar MCPs completos normalmente vas a necesitar:

- VS Code.
- GitHub Copilot y GitHub Copilot Chat.
- Git.
- Node.js y npm para MCPs ejecutados con `npx`.
- Docker Desktop si vas a usar integraciones que dependan de contenedores.
- Cuenta corporativa de GitHub con licencia activa.
- Acceso corporativo a GitLab, Jira, Confluence y Context7 si el flujo lo requiere.

Como referencia rápida:

- GitLab MCP: requiere Node.js y credenciales de GitLab.
- Context7 MCP: requiere Node.js y API key de Context7.
- PDF Reader MCP: requiere Node.js.
- Atlassian MCP: requiere credenciales de Atlassian y, según la configuración usada, Docker.

## 1. Solicitar la Licencia en la Empresa

Antes de usar este entorno, necesitas tener GitHub Copilot habilitado en tu cuenta corporativa.

Pasos mínimos:

- Solicita la licencia de GitHub Copilot comunicándote con Agustín Ignacio García por mail o Slack.
- Debes tener una cuenta de GitHub con el email corporativo.
- Debes ser un desarrollador activo dentro de la empresa.
- Confirma que la licencia quedó asociada a tu cuenta corporativa.
- Inicia sesión en VS Code con esa cuenta.
- Verifica que GitHub Copilot y GitHub Copilot Chat queden disponibles.

## 2. Elegir el Tipo de Configuración

No todos los proyectos necesitan el flujo completo. Primero define el objetivo.

| Escenario | Flujo sugerido | Qué pedirle a Copilot |
| --- | --- | --- |
| Proyecto desde cero usando el template | 1 → 2 → 3 → 4 → 5 | `@Setup Quiero hacer el setup completo desde cero` |
| Proyecto existente y quieres configurar entorno técnico sin regenerar estructura | 1 → 3 | `@Setup Es un proyecto existente. Configura credenciales e instala lo necesario, sin regenerar la estructura` |
| Proyecto existente y solo quieres dejarlo listo para trabajar con IA | 4 → 5, con 1 opcional | `@Setup Solo quiero dejar este proyecto listo para trabajar con IA` |
| Solo necesitas integraciones externas | 1 | `@Setup Quiero configurar solo los MCPs` |

En la mayoría de los proyectos existentes alcanza con los pasos 4 y 5. El paso 1 solo hace falta si necesitas GitLab, Jira, Confluence, Context7 o PDF Reader.

### Qué hace cada paso del setup

- Paso 1. MCP Setup: configura `.vscode/mcp.json`, credenciales e integraciones externas.
- Paso 2. Project Setup Plan: genera el plan de setup específico del stack actual.
- Paso 3. Project Setup: instala dependencias, levanta servicios y, si corresponde, genera estructura inicial.
- Paso 4. Documentation Plan: detecta documentación faltante, obsoleta o desalineada.
- Paso 5. Documentation Update: actualiza la documentación y los prompts de forma iterativa.

Si quieres el detalle completo del flujo, usa [setup/how-to-setup-project.md](setup/how-to-setup-project.md).

## 3. Antes de Empezar a Usar el Template

Este repositorio incluye archivos que funcionan como base común. Antes de usarlos en un proyecto real, el equipo debe revisar y adaptar lo que corresponda.

- Reemplaza placeholders, nombres genéricos, keys y referencias temporales.
- Configura correctamente `.github/instructions/` según el proyecto real.
- Ajusta o elimina templates que no se vayan a usar.
- No dejes instrucciones ambiguas o referencias a stacks que no aplican.

Regla práctica: cualquier template tecnológico, referencia organizacional temporal o instrucción genérica debe quedar configurada o eliminada antes de empezar a trabajar en serio con el proyecto.

### Primera preparación del proyecto

Para esta primera adaptación del entorno, el agente recomendado es `@Setup`.

- Usa `@Setup` para revisar y adaptar templates, instrucciones, prompts y documentación contextual.
- `@Setup` está preparado para guiar la preparación inicial del proyecto y detectar qué falta, qué quedó obsoleto y qué conviene actualizar.
- Esto aplica especialmente a `.github/instructions/`, `.github/prompts/`, `.github/documentation/` y a la configuración base de `.vscode/` cuando exista.
- Si quieres, puedes editar estos archivos manualmente, pero para la preparación inicial del entorno la recomendación es hacerlo con `@Setup`.

### Actualización posterior de documentación

Una vez que el proyecto ya quedó preparado, `@Management` se puede usar sin problemas para generar o actualizar documentación del trabajo cotidiano.

- Úsalo para documentar features, cambios implementados, merge requests o documentación operativa asociada al trabajo del equipo.
- Si el cambio vuelve a afectar templates compartidos, instrucciones base o la estructura documental inicial, conviene volver a `@Setup`.
- La edición manual sigue siendo válida cuando el equipo la prefiera, pero la recomendación es elegir el agente según el momento del proyecto.

## 4. Qué Aporta Este Repositorio

Al incorporar este repositorio a un proyecto, GitHub Copilot deja de trabajar solo con el código visible y gana contexto operativo.

Esto agrega:

- Instrucciones base en `.github/instructions/` para arquitectura, stack, herramientas y estándares.
- Prompts reutilizables en `.github/prompts/` para setup, planificación, desarrollo, documentación y merge requests.
- Agentes especializados en `.github/agents/` para resolver tareas frecuentes con flujos más consistentes.
- Integraciones opcionales vía MCP para GitLab, Jira, Confluence, Context7 y PDF Reader.
- Memorias de agentes para registrar progreso, restricciones, decisiones y elementos reutilizables.

En términos prácticos, esto convierte a Copilot en un asistente con contexto, flujo y memoria, no solo en un autocompletador o chat genérico.

## 5. Flujo Sugerido de Trabajo

La utilidad de seguir un flujo no es burocrática. Sirve para separar bien cada etapa.

- Primero se aclara el objetivo y el alcance.
- Después se planifica con suficiente contexto.
- Luego se implementa con menos improvisación.
- Después se revisa antes de mergear.
- Finalmente se documenta y se ordena el cierre.

Esto reduce cambios inconsistentes, evita perder contexto entre sesiones y mejora lo que Copilot puede hacer por el equipo.

### Para features o cambios complejos

`@DevPlanner → @Developer → @CodeReviewer → @Management`

- `@DevPlanner` arma el contexto base y el plan técnico.
- `@Developer` implementa el cambio siguiendo el plan.
- `@CodeReviewer` revisa riesgos, calidad y faltantes antes del merge.
- `@Management` crea la MR y/o actualiza documentación.

### Para iniciativas guiadas por caso de uso o mockup

`@FunctionalAnalyst → @UIDesigner → @DevPlanner → @Developer → @CodeReviewer → @Management`

- `@FunctionalAnalyst` documenta el caso de uso y puede publicar usando el flujo compartido de `@Management`.
- `@UIDesigner` genera el mockup y puede guardar artefactos locales en la misma carpeta de trabajo bajo `docs/`.
- `@DevPlanner` reutiliza esa carpeta para crear `base-context.md` y el plan técnico.

### Para cambios rápidos o acotados

`@Developer → @CodeReviewer → @Management` opcional

### Para setup o preparación del repositorio

`@Setup`

- Es el agente recomendado para la primera preparación del proyecto y para adaptar templates, instrucciones, prompts y documentación base.

### Para documentación posterior o mantenimiento operativo

`@Management`

- Úsalo cuando el proyecto ya está preparado y necesites generar o actualizar documentación del trabajo diario.

### Para auditorías amplias del proyecto

`@Auditoría`

- Recorre auditorías por pasos, mantiene progreso en memoria y ordena resultados iterativos.
- Su guía de uso está en [audit/audit-agent-usage-guide.md](audit/audit-agent-usage-guide.md).

Si no sabes por dónde empezar, la referencia más rápida es [faq.md](faq.md).

## 6. Agentes Disponibles

- `@Setup`: guía el setup, elige el flujo correcto, ejecuta los pasos necesarios y es el agente recomendado para la preparación inicial del proyecto y la adaptación de templates, instrucciones, prompts y documentación base.
- `@FunctionalAnalyst`: transforma material funcional disperso en un `use-case.md` y también puede publicar ese resultado usando el flujo compartido de `@Management`.
- `@UIDesigner`: releva contexto visual y genera mockups en Stitch, con opción de guardar `mockup.md` y `mockup.html` en la carpeta del caso.
- `@DevPlanner`: transforma una idea, ticket, requerimiento o carpeta de caso de uso existente en `base-context.md` y `development-plan.md`.
- `@Developer`: implementa cambios con plan o en modo rápido, y puede registrar conocimiento reusable.
- `@CodeReviewer`: revisa código o cambios de rama sin modificar archivos.
- `@Management`: gestiona documentación, merge requests y tareas con GitLab, Jira o Confluence, y comparte con `@FunctionalAnalyst` el flujo de publicación de requerimientos.
- `@Auditoría`: ejecuta auditorías iterativas con seguimiento de progreso, memoria y resultados por etapa. Ver [audit/audit-agent-usage-guide.md](audit/audit-agent-usage-guide.md).

## 7. Ejemplos de Uso de Agentes

### Setup

- `@Setup Quiero hacer el setup completo desde cero.`
- `@Setup Este proyecto ya existe. Solo quiero configurar credenciales e instalar lo necesario.`
- `@Setup Solo quiero dejar este repositorio listo para trabajar con IA.`
- `@Setup Quiero configurar solo los MCPs.`

### FunctionalAnalyst

- `@FunctionalAnalyst Convierte esta reunión y este PDF en un caso de uso y guárdalo en una carpeta nueva bajo docs.`
- `@FunctionalAnalyst Publica este caso de uso validado en Jira usando el flujo compartido de Management.`

### UIDesigner

- `@UIDesigner Genera el mockup de esta pantalla a partir de docs/.../use-case.md y guarda el HTML en la misma carpeta.`
- `@UIDesigner Reutiliza la carpeta docs/... y crea un mockup exploratorio para este flujo.`

### DevPlanner

- `@DevPlanner Nuevo feature: alta y edición de clientes con validaciones y tests.`
- `@DevPlanner Crea un plan a partir del ticket DIL-123.`
- `@DevPlanner Continúa este caso de uso: docs/.../use-case.md`.

### Developer

- `@Developer Implementa este plan: docs/.../development-plan.md`.
- `@Developer Necesito un fix rápido en el formulario de login.`

### CodeReviewer

- `@CodeReviewer Revisa esta rama contra main y enumera riesgos, regresiones y faltantes.`
- `@CodeReviewer Revisa estos archivos y prioriza hallazgos críticos.`

### Management

- `@Management Crea la merge request desde mi rama actual.`
- `@Management Documenta este feature en Markdown.`
- `@Management Busca mis tickets pendientes en Jira.`

### Auditoría

- `@Auditoría siguiente`
- `@Auditoría revisar paso 3`

## 8. Cómo Funciona la Memoria de los Agentes

Este entorno usa memorias simples para no repetir contexto importante entre sesiones.

- `setup.memory.md`: guarda el flujo elegido y el estado de cada paso del setup.
- `functional-analyst.memory.md`: guarda convenciones funcionales, naming de carpetas de trabajo y referencias útiles para casos de uso.
- `ui-designer.memory.md`: guarda referencias visuales persistentes, proyecto Stitch por defecto y convenciones de salida local.
- `developer-backend.memory.md`, `developer-frontend.memory.md` y `developer-database.memory.md`: guardan prácticas comunes, elementos reutilizables y decisiones importantes por área.
- `audit.memory.md`: guarda el progreso de la auditoría y comentarios relevantes para pasos futuros.

Buenas prácticas para memorias:

- Guarda solo decisiones, restricciones y patrones que realmente convenga reutilizar.
- No uses la memoria como bitácora larga de conversación.
- Actualiza o elimina reglas que hayan quedado obsoletas.
- Si notas que un agente no actualizó su memoria, pídeselo explícitamente.
- Define dentro del equipo quién mantiene memorias generales y quién valida que sigan vigentes.

## 9. Ejemplos de MCPs y Configuración

La guía detallada está en [setup/mcp-setup.md](setup/mcp-setup.md), pero estos son ejemplos rápidos de cómo arrancar.

### Ejemplo de pedido para configurar MCPs

- `@Setup Quiero configurar GitLab, Jira, Confluence, Context7 y PDF Reader para este proyecto.`
- `@Setup Configura solo Context7 y PDF Reader.`

### Qué debería terminar haciendo ese flujo

- Crear o completar `.vscode/mcp.json` a partir del template.
- Configurar tokens o credenciales necesarias.
- Verificar que las integraciones respondan correctamente.
- Ajustar `tools.instructions.md` con los IDs o keys reales del proyecto.

## 10. Prompts Útiles para Empezar

Puedes copiar y adaptar cualquiera de estos pedidos.

- `@Setup Solo quiero dejar este proyecto listo para trabajar con IA. No regeneres estructura y prioriza documentación y prompts.`
- `@Setup Quiero configurar MCPs para GitLab, Jira, Confluence, Context7 y PDF Reader.`
- `@FunctionalAnalyst Documenta este requerimiento como caso de uso y publícalo luego en Jira.`
- `@UIDesigner Usa docs/.../use-case.md para crear un mockup y deja el HTML en la misma carpeta.`
- `@DevPlanner Nuevo feature: [describe el objetivo de negocio y el alcance].`
- `@DevPlanner Continúa desde docs/.../use-case.md y genera el plan en esa misma carpeta.`
- `@Developer Implementa este plan: docs/.../development-plan.md`.
- `@CodeReviewer Revisa esta rama contra main y enumera riesgos, regresiones y faltantes.`
- `@Management Crea la merge request desde mi rama actual y genera la descripción automáticamente.`

## 11. Aclaraciones Importantes

- Usa modo Agent siempre que necesites que Copilot investigue, planifique o ejecute un flujo completo.
- Cada equipo puede decidir cuánta documentación quiere mantener. No todos los proyectos necesitan la misma cantidad de archivos.
- Cada equipo debería definir responsables para mantener instrucciones, prompts, memorias y documentación contextual.
- Si un archivo template no aplica a tu proyecto, configúralo correctamente o elimínalo. No conviene dejarlo como ruido contextual.
- Si el flujo cambia, actualiza la documentación base antes de seguir acumulando contexto desactualizado.

## 12. Extender y Compartir el Entorno

Este repositorio no está cerrado. Se puede extender.

- Puedes crear nuevos prompts, agentes, instrucciones o skills específicos para tu equipo o tu stack.
- Si una mejora puede servir a más proyectos, lo ideal es proponerla al repositorio compartido.
- El mecanismo recomendado es abrir una merge request en GitLab con la mejora documentada y justificada.

Ejemplos de aportes útiles:

- Nuevos agentes especializados.
- Nuevos prompts de setup o desarrollo.
- Nuevas instrucciones por stack o arquitectura.
- Nuevas skills reutilizables.
- Mejoras a las guías de uso y onboarding.

## 13. Dónde Profundizar

- [faq.md](faq.md): guía rápida para dudas operativas y elección de agente.
- [audit/audit-agent-usage-guide.md](audit/audit-agent-usage-guide.md): guía operativa para ejecutar auditorías con el agente Auditoría.
- [setup/how-to-setup-project.md](setup/how-to-setup-project.md): flujo completo de setup y criterio para elegir pasos.
- [setup/mcp-setup.md](setup/mcp-setup.md): configuración de credenciales e integraciones MCP.
- [backend.md](backend.md), [frontend.md](frontend.md), [database.md](database.md) y [migrations.md](migrations.md): contexto técnico por capa del proyecto.

## 14. Recomendación Final

La forma más eficiente de trabajar con este entorno es:

1. Elegir el objetivo del setup.
2. Ejecutar solo el flujo que realmente aplica.
3. Usar agentes especializados en lugar de un chat genérico.
4. Mantener la documentación y las memorias al día.

Si el proyecto ya existe, empieza por documentación para IA. En la mayoría de los casos, ese es el mejor punto de entrada.