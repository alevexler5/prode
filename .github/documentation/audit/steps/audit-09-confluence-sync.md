# Auditoría: Sincronización con Confluence

> 📋 **Objetivo**: Publicar y mantener sincronizada la documentación de auditoría en Confluence.

---

## Prerequisitos

- Al menos un archivo de resultado (`*.result.md`) generado
- Acceso a Confluence configurado (MCP Atlassian)
- Acceso a el espacio de auditorías en Confluence

---

## Preguntas al Usuario

### Acción a Realizar

**¿Qué deseas hacer?**

1. **Subir todo**: Crear/actualizar todas las páginas de auditoría
2. **Subir paso específico**: Crear/actualizar solo un paso (especificar número)
3. **Sincronizar**: Revisar y actualizar solo los pasos con cambios

---

## Proceso de Sincronización

### Estructura en Confluence

```
[Space]
  └─ Project (página raíz del espacio)
      └─ [NombreProyecto]-[IDProyecto] (página padre del proyecto)
          ├─ Audit-[NombreProyecto]-[IDProyecto]-01-GeneralTeam
          ├─ Audit-[NombreProyecto]-[IDProyecto]-02-TechStack
          ├─ Audit-[NombreProyecto]-[IDProyecto]-03-Dependencies
          └─ ... (resto de pasos)
```

> ⚠️ **IMPORTANTE - Formato de Títulos**: Los títulos de las páginas en Confluence deben seguir el formato exacto especificado. No se pueden repetir nombres de páginas en el mismo espacio.

### Detección de Cambios (modo "Sincronizar")

**Método 1 - Por fecha**:

- Comparar `Última Actualización` del archivo vs `Última Sincro` en memoria
- Si fecha del archivo > fecha sincro → actualizar

**Método 2 - Por contenido**:

- Comparar contenido completo del `.result.md` vs página en Confluence
- Si hay diferencias → actualizar

### Nomenclatura de Páginas

#### Página Padre del Proyecto

**Formato EXACTO**: `[NombreProyecto]-[IDProyecto]`

- ✅ **Correcto**: `MiProyecto-12345`
- ❌ **Incorrecto**: `Audit-MiProyecto-12345`
- ❌ **Incorrecto**: `MiProyecto-12345-Auditoría`

> 📌 **Regla**: El nombre del proyecto (NombreProyecto) y el ID del proyecto (IDProyecto) se toman tal como aparecen en la memoria/configuración. **No agregar ningún prefijo, sufijo o texto adicional**. Solo: `NombreProyecto-IDProyecto`.

#### Páginas de Pasos de Auditoría

**Formato**: `Audit-[NombreProyecto]-[IDProyecto]-[NumPaso]-[NombrePaso]`

- **NombreProyecto**: Igual que en la página padre (sin espacios, mantener formato original)
- **IDProyecto**: Igual que en la página padre
- **NumPaso**: Número del paso con dos dígitos (`01`, `02`, ..., `08`)
- **NombrePaso**: Nombre corto del paso (ver tabla abajo)

**Ejemplos**:

- `Audit-MiProyecto-12345-01-GeneralTeam`
- `Audit-MiProyecto-12345-02-TechStack`
- `Audit-MiProyecto-12345-08-Conclusions`

**Tabla de Nombres de Pasos**:

| Paso | NombrePaso             |
| ---- | ---------------------- |
| 01   | GeneralTeam            |
| 02   | TechStack              |
| 03   | Repositories           |
| 04   | Infraestructure        |
| 05   | EnvironmentsDeployment |
| 06   | Security               |
| 07   | ManagmentSupport       |
| 08   | Conclusions            |

> ⚠️ **CRÍTICO**: No modificar el formato de los títulos. Confluence no permite páginas con nombres duplicados en el mismo espacio, por lo que es fundamental mantener la nomenclatura exacta.

### Contenido a Publicar

> 🚨 **CRÍTICO - NO MODIFICAR CONTENIDO**: El contenido de las páginas en Confluence DEBE ser EXACTAMENTE igual al contenido del archivo `.result.md` correspondiente. **NO realizar NINGUNA modificación, transformación, reformateo o cambio al contenido**.

**Reglas estrictas**:

1. ✅ **Copiar texto exacto**: Todo el contenido del archivo `.result.md` sin cambios
2. ✅ **Preservar formato**: Mantener markdown tal cual (headers, listas, tablas, negritas, etc.)
3. ✅ **Preservar metadatos**: Los encabezados de Versión/Fecha/Proyecto/Autor van al inicio sin modificar
4. ✅ **Preservar estructura**: Mantener todas las secciones en el mismo orden
5. ❌ **NO reformatear**: No cambiar saltos de línea, indentación o espaciado
6. ❌ **NO parafrasear**: No reescribir frases o párrafos
7. ❌ **NO resumir**: No acortar o condensar contenido
8. ❌ **NO expandir**: No agregar información adicional
9. ❌ **NO reordenar**: No cambiar el orden de secciones o elementos
10. ❌ **NO traducir**: No cambiar idioma o terminología

**Proceso de subida**:

1. Leer archivo `.result.md` completo
2. Copiar contenido tal cual (sin procesamiento)
3. Subir a Confluence usando el contenido sin modificar
4. Confluence renderizará el markdown automáticamente

> ⚠️ **Si el contenido del archivo cambia en alguna ejecución, es un ERROR**. El agente NO debe modificar el contenido bajo ninguna circunstancia.

---

## Actualización de Memoria

Después de cada sincronización, actualizar la tabla de estado:

**Columnas a mantener**:

- Paso
- Estado
- Versión
- Última Actualización (del archivo)
- **Page ID** (ID de la página en Confluence)
- **URL** (enlace directo a la página)
- **Última Sincro** (fecha de última publicación)
- Notas

**Información adicional**:

- Guardar **Page ID de la página padre** (la página con título `[NombreProyecto]-[IDProyecto]`)
- Guardar **Page ID** de cada página de paso individual

---

## Formato de Salida

### NO se genera archivo `09-confluence-sync.result.md`

El paso 9 solo actualiza la memoria con información de sincronización.

### Mensaje de Confirmación

```markdown
✅ **Sincronización completada**

**Páginas creadas/actualizadas**: [N]

- ✅ Paso 01: GeneralTeam → [URL]
- ✅ Paso 02: TechStack → [URL]
- ...

**Memoria actualizada**: Page IDs y URLs guardados

---

¿Deseas realizar otra sincronización o continuar con otra tarea?
```

---

## Notas Técnicas

### Herramientas MCP

- `mcp-atlassian/confluence/*`: Crear páginas, actualizar contenido, buscar páginas existentes
- Consultar documentación de MCP Atlassian para operaciones específicas

### Manejo de Errores

- **Página padre no existe**: Crearla automáticamente con título exacto `[NombreProyecto]-[IDProyecto]` bajo la página "Project"
- **Space Key inválido**: Solicitar al usuario verificar configuración
- **Conflicto de contenido**: Priorizar versión local (archivo `.result.md`) y notificar al usuario
- **Nombre duplicado**: Si ya existe una página con el mismo título, verificar si es la correcta (por Page ID en memoria) o reportar error al usuario
- **Contenido modificado**: Si se detecta que el contenido fue modificado durante la subida, reportar ERROR crítico al usuario

---

**Versión**: 1.0
**Última actualización**: 2026-01-15
