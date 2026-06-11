---
name: management.create-merge-request
description: Crea merge request en GitLab con descripción automática de cambios
argument-hint: Opcionalmente especifica rama target y issue de Jira (ej. DIL-123)
---

# Crear Merge Request en GitLab

## Objetivo

Crear merge request en GitLab desde la rama actual, verificando contexto y generando descripción automática de cambios.

---

## Fase 1: Verificar Contexto

### Identificar Rama Actual

Ejecuta: `git branch --show-current`

**Evaluación**:

- `main`/`master`/`develop`: ⚠️ Advertir (rama protegida), preguntar si cambiar o crear feature branch
- Otra rama: ✅ Proceder

### Verificar Commits Pendientes

Ejecuta: `git log origin/{rama-actual}..HEAD --oneline`

**Si hay commits sin pushear**:

1. Advertir: "Tienes X commits sin pushear"
2. Listar commits
3. Preguntar: ¿Pushear antes de crear MR?
4. Si sí: `git push origin {rama-actual}`

---

## Fase 2: Recopilar Información

### Solicitar Datos

**Issue de Jira** (opcional): Preguntar si hay issue asociado (ej: DIL-123).

**Rama target**: Preguntar hacia dónde mergear (default: `develop` según `tools.instructions.md`).

### Analizar Cambios

Ejecuta:

```bash
git log origin/{rama-target}..HEAD --oneline
git diff origin/{rama-target}..HEAD --name-status
```

**Extrae**: Commits, archivos modificados/creados/eliminados, áreas afectadas (backend/frontend/docs).

---

## Fase 3: Generar Contenido de la MR

### Título

**Formato**:

- Con issue: `(DIL-XXX): Descripción breve del cambio`
- Sin issue: `feat: Descripción breve` o `fix: Descripción breve`

**Basado en**: Commits, archivos modificados, issue (si hay).

**Ejemplos**:

- `(DIL-456): Implementar CRUD completo de Productos`
- `feat: Agregar paginación a listado de clientes`

### Descripción

```markdown
## Cambios Introducidos

{Resumen breve de 1-6 líneas}

**Issue relacionado**: DIL-XXX (link) _(si aplica)_

## Archivos Modificados

- {Lista de archivos con cambios significativos}

## Tipo de Cambio

- [ ] Nueva funcionalidad (feature)
- [ ] Corrección de bug (fix)
- [ ] Refactorización (refactor)
- [ ] Documentación (docs)
- [ ] Otros: {especificar}

## Commits Incluidos

{Lista de commits con mensajes}
```

**Mostrar al usuario** y preguntar si usar tal cual o modificar.

---

## Fase 4: Crear y Confirmar

### Crear Merge Request

Usa `mcp_gitlab_create_merge_request` con:

- Source: rama actual
- Target: rama confirmada
- Título y descripción generados
- `remove_source_branch: true`
- `squash: false` (ajustable)

### Confirmar Creación

```markdown
✅ **Merge Request creada exitosamente**

📋 **Detalles**:

- Título: {título}
- Source: {rama-actual} → Target: {rama-target}
- MR ID: {id}

🔗 **Link directo**: {url}

📝 **Próximos pasos recomendados**:

- [ ] Revisar diff en GitLab
- [ ] Asignar reviewers
- [ ] Agregar labels/milestone
- [ ] Vincular con Jira

💡 **Sugerencia**: Usa #agent:code-reviewer para analizar los cambios antes de mergear
```

---

## Casos Especiales

**Rama protegida**: Advertir, preguntar confirmación explícita.  
**Sin cambios**: Informar, verificar si ya existe MR para la rama.  
**Conflictos detectados**: Advertir, sugerir pull/rebase antes de crear MR.  
**Sin issue Jira**: OK, crear MR sin vinculación.

---

## Referencias

- **Configuración GitLab**: `.github/instructions/tools.instructions.md`
- **Code Reviewer**: `.github/agents/code-reviewer.agent.md`

---

**Versión**: 1.0.0  
**Última actualización**: Enero 2026
