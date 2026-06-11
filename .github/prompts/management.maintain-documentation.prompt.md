---
name: management.maintain-documentation
description: Mantiene y genera documentación interna del proyecto, guías operativas, README, FAQ e índices relacionados
argument-hint: Especifica qué documentación interna crear o actualizar, la fuente y el formato de salida si aplica
---

# Mantener Documentación Interna

## Objetivo

Crear, actualizar, reorganizar o sincronizar documentación interna del proyecto, manteniendo alineadas las referencias y los índices que ayudan a descubrirla.

Este prompt está pensado para trabajo documental de mantenimiento, por ejemplo:

- guías operativas;
- onboarding;
- FAQ;
- `README.md`;
- documentación en `.github/documentation/`;
- guías de uso de agentes, prompts o flujos;
- documentación interna en Confluence;
- índices y referencias cruzadas.

**No usar este prompt para documentar un feature implementado**. Para eso usa `.github/prompts/management.document.prompt.md`.

**Si el pedido corresponde a la primera adaptación del template o a la preparación inicial del proyecto**, deriva el trabajo al agente `@Setup` en lugar de continuar con este prompt.

---

## Fase 1: Detectar el Tipo de Trabajo

Identifica cuál de estos casos aplica:

1. **Crear documentación interna nueva**
2. **Actualizar documentación existente**
3. **Reorganizar o renombrar documentación**
4. **Sincronizar referencias e índices**
5. **Publicar o replicar documentación en Confluence**

**Triggers frecuentes**:

- "actualiza la guía"
- "mantén esta documentación"
- "sincroniza README y FAQ"
- "crea una guía interna"
- "actualiza copilot-instructions"
- "agrega documentación de onboarding"
- "ordena la documentación"

Si la solicitud es ambigua, pregunta:

- cuál es el documento objetivo;
- si se trata de creación o mantenimiento;
- si el resultado debe quedar en Markdown, Confluence o ambos;
- qué archivos o fuentes deben considerarse como verdad actual.

---

## Fase 2: Carga de Contexto

### Leer el Documento Objetivo

Si el documento ya existe, léelo completo antes de proponer cambios.

### Leer Referencias Relacionadas

Según el caso, carga también los archivos que puedan quedar afectados por la actualización.

**Lee siempre cuando aplique**:

- `.github/copilot-instructions.md`
- `.github/documentation/faq.md`
- `.github/documentation/github-copilot-guide.md`
- `README.md`
- `.github/documentation/confluence-structure.md`

**Lee además**:

- agentes, prompts o instrucciones relacionados si la documentación habla de ellos;
- documentación técnica vinculada si la guía explica flujos reales del proyecto;
- la página o issue fuente si el pedido viene de Confluence, Jira o GitLab.

### Fuente de Verdad

Identifica de dónde sale la información correcta para la actualización:

1. documento actual;
2. código o estructura del repo;
3. prompt o agente relacionado;
4. merge request o commits;
5. issue de Jira;
6. indicaciones explícitas del usuario.

Si encuentras contradicciones, no asumas. Resume el conflicto y pregunta al usuario.

---

## Fase 3: Plan de Actualización

Antes de editar, presenta un resumen breve con:

- documentos a crear, modificar o eliminar;
- objetivo de cada cambio;
- referencias que deberán sincronizarse;
- dudas pendientes, si las hay.

Ejemplo:

```markdown
📝 Plan de actualización de documentación

- Actualizar: `.github/documentation/github-copilot-guide.md`
- Actualizar: `.github/documentation/faq.md`
- Actualizar: `.github/copilot-instructions.md`
- Objetivo: reflejar el nuevo flujo de uso del agente Management
- Sincronización: índice de documentación y referencias de acceso rápido

✅ ¿Procedo con estos cambios?
```

Espera confirmación explícita del usuario antes de aplicar cambios si el alcance no era obvio o si hay riesgo de tocar varios documentos.

---

## Fase 4: Ejecutar la Actualización

### Reglas de Edición

- Mantén el tono y la estructura de la documentación existente.
- Sé concreto; evita texto decorativo.
- No dupliques contenido si puedes enlazar o centralizar.
- Si un documento quedó obsoleto, propón consolidarlo, moverlo o eliminarlo.

### Ubicaciones Típicas

- Documentación interna del entorno IA: `.github/documentation/`
- Índice general de documentación IA: `.github/copilot-instructions.md`
- FAQ operativa: `.github/documentation/faq.md`
- Onboarding o guía breve: `.github/documentation/github-copilot-guide.md`
- README de entrada: `README.md`
- Publicación externa o wiki: Confluence, si el usuario lo pide o el flujo lo requiere

### Sincronización Obligatoria de Referencias

Cuando crees, renombres, elimines o cambies significativamente documentación interna, revisa y actualiza también lo que corresponda:

- `.github/copilot-instructions.md` para mantener indexados prompts, agentes y documentación relevante;
- `.github/documentation/faq.md` cuando cambie la navegación operativa o los flujos recomendados;
- `.github/documentation/github-copilot-guide.md` cuando cambie onboarding, setup o uso recomendado;
- `README.md` si cambia la forma de entrada al repositorio;
- `.github/documentation/confluence-structure.md` si hubo publicación o cambio en Confluence.

Si una referencia ya no aplica, elimínala o reemplázala. No la dejes desactualizada.

---

## Fase 5: Confirmación Final

Al terminar, informa:

- qué documentos se crearon o actualizaron;
- qué referencias quedaron sincronizadas;
- si quedó algo pendiente por falta de contexto o decisión del usuario;
- si conviene publicar la misma documentación en Confluence.

Ejemplo:

```markdown
✅ Documentación interna actualizada

- Actualizado: `.github/documentation/github-copilot-guide.md`
- Actualizado: `.github/documentation/faq.md`
- Actualizado: `.github/copilot-instructions.md`

🔗 Referencias sincronizadas correctamente.

Pendiente opcional:
- publicar la guía también en Confluence
```

---

## Casos Especiales

**El pedido en realidad es setup inicial**  
Detén este flujo y deriva a `@Setup`.

**El pedido en realidad es documentación de feature**  
Usa `.github/prompts/management.document.prompt.md`.

**No existe un documento objetivo todavía**  
Propón ubicación, nombre y alcance antes de crearlo.

**La documentación afecta agentes, prompts o instrucciones**  
Lee esos archivos antes de editar la guía y sincroniza `.github/copilot-instructions.md`.

**Hay varias guías superpuestas**  
Propón consolidación y explica qué archivo debería quedar como fuente principal.

---

## Referencias

- `.github/prompts/management.document.prompt.md`
- `.github/prompts/management.create-merge-request.prompt.md`
- `.github/instructions/architecture.instructions.md`
- `.github/instructions/tools.instructions.md`
- `.github/copilot-instructions.md`

---

**Versión**: 1.0.0  
**Última actualización**: Abril 2026