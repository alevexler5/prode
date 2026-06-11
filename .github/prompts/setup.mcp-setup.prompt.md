---
name: setup.mcp-setup
description: Configuración de Model Context Protocol (MCP) para GitLab, Atlassian, Context7, PDF Reader y Stitch
argument-hint: Úsalo cuando necesites configurar o verificar MCPs
---

# 🔧 MCP Setup - Configuración de Model Context Protocol

Este prompt guía la configuración de herramientas MCP para integrar GitLab, Jira, Confluence, Context7, PDF Reader y Stitch con GitHub Copilot.

**⚠️ IMPORTANTE**: Este prompt puede ejecutarse de forma independiente. Es especialmente relevante antes de flujos que dependan de GitLab, Atlassian, Context7 o Stitch. Si vas a usar `UIDesigner`, Stitch debe quedar configurado.

📖 **Documentación completa**: `.github/documentation/setup/mcp-setup.md`

---

## 🎯 Objetivo

Configurar y verificar las siguientes herramientas MCP:

- ✅ **GitLab**: gestión de código, branches, merge requests y CI/CD
- ✅ **Jira**: gestión de issues y sprints
- ✅ **Confluence**: documentación del proyecto
- ✅ **Context7**: documentación técnica actualizada
- ✅ **PDF Reader**: lectura de PDFs del proyecto
- ✅ **Stitch**: design systems, proyectos de diseño y mockups para `UIDesigner`

---

## 📋 Requisitos Previos

- [ ] VS Code instalado
- [ ] GitHub Copilot instalado y activo
- [ ] Acceso a GitLab con permisos de lectura/escritura
- [ ] Acceso a Atlassian (Jira + Confluence)
- [ ] Cuenta en Context7
- [ ] Acceso a Stitch
- [ ] Docker instalado si se va a usar Atlassian MCP
- [ ] Node.js y npm instalados
- [ ] Google Cloud SDK solo si se va a usar OAuth para Stitch en vez de API key

---

## 🔍 Paso 1: Verificación Automática de MCPs

**Acción del Agente**: antes de solicitar configuración, verifica si los MCPs ya están funcionando.

### 1.1 Verificar GitLab

```text
Herramienta: mcp_gitlab_search_repositories
Parámetros: { "search": "", "per_page": 5 }
```

### 1.2 Verificar Jira

```text
Herramienta: mcp_mcp-atlassian_jira_get_all_projects
Parámetros: {}
```

### 1.3 Verificar Confluence

```text
Herramienta: mcp_mcp-atlassian_confluence_search
Parámetros: { "query": "type=space", "limit": 5 }
```

### 1.4 Verificar Context7

```text
Herramienta: mcp_context7_resolve-library-id
Parámetros: { "libraryName": "react" }
```

### 1.5 Verificar Stitch

```text
Herramienta: mcp_stitch_list_projects
Parámetros: { "filter": "view=owned" }
```

### 1.6 Evaluar Resultado

**Si TODAS las herramientas responden correctamente**:

> ✅ **Las herramientas MCP ya están configuradas y funcionando:**
>
> - ✅ **GitLab**: Conectado y accesible
> - ✅ **Jira**: Conectado
> - ✅ **Confluence**: Conectado y accesible
> - ✅ **Context7**: Funcionando correctamente
> - ✅ **Stitch**: Conectado y listo para `UIDesigner`
>
> ℹ️ **PDF Reader** no requiere credenciales; si necesitas validarlo, puedes hacerlo luego con un PDF de muestra.
>
> 🎉 **Configuración MCP completada.**
>
> Puedes continuar con el flujo que corresponda a tu objetivo:
> - `setup.project-setup-plan.prompt.md` si vas a generar el setup completo desde cero
> - `setup.documentation-plan.prompt.md` si solo vas a actualizar documentación y prompts
> - O detenerte aquí si solo querías verificar/configurar MCPs

**FIN DEL PROMPT** - No continuar si todo funciona.

---

**Si ALGUNA herramienta NO funciona**:

> 🔧 **Es necesario configurar o corregir las herramientas MCP.**
>
> **Estado actual**:
> - {GitLab}: {Estado: ✅ OK / ❌ No configurado / ⚠️ Error}
> - {Jira}: {Estado: ✅ OK / ❌ No configurado / ⚠️ Error}
> - {Confluence}: {Estado: ✅ OK / ❌ No configurado / ⚠️ Error}
> - {Context7}: {Estado: ✅ OK / ❌ No configurado / ⚠️ Error}
> - {Stitch}: {Estado: ✅ OK / ❌ No configurado / ⚠️ Error}
>
> 📖 **Sigue la guía completa**: `.github/documentation/setup/mcp-setup.md`
>
> ℹ️ **PDF Reader** viene en el template y normalmente no requiere acción adicional.
>
> 🔽 Continuando con la configuración paso a paso...

**Procede al Paso 2**

---

## 📝 Paso 2: Crear Archivo de Configuración MCP

### 2.1 Verificar si mcp.json existe

**Acción del Agente**: verifica si existe `.vscode/mcp.json`.

**Si existe**:

> ℹ️ **El archivo `.vscode/mcp.json` ya existe.**
>
> Verificando y completando la configuración pendiente...

**Si NO existe**:

> 📄 **Creando archivo de configuración MCP...**

### 2.2 Copiar Template

**Si no existe `mcp.json`**, cópialo desde el template:

```powershell
Copy-Item .vscode\mcp.template.json .vscode\mcp.json
```

**Mensaje**:

> ✅ **Archivo `.vscode/mcp.json` creado desde template**
>
> ℹ️ El template ya incluye GitLab, Atlassian, Context7, PDF Reader y Stitch. Solo falta completar los placeholders.

### 2.3 Agregar al .gitignore

**Acción del Agente**: verifica si `.vscode/mcp.json` está en `.gitignore`.

**Si NO está**:

```powershell
$gitignore = Get-Content .gitignore -Raw

if ($gitignore -notmatch ".vscode/mcp.json") {
    Add-Content .gitignore "`n# MCP Configuration (contiene tokens privados)`n.vscode/mcp.json"
}
```

**Mensaje**:

> ✅ **`.vscode/mcp.json` agregado al `.gitignore`**
>
> ⚠️ Este archivo contiene tokens y API keys privadas.

**Si YA está**:

> ℹ️ **`.vscode/mcp.json` ya está en `.gitignore`**

---

## 📧 Paso 3: Configurar Email Corporativo para Atlassian

### 3.1 Solicitar Email de Diveria

**Mensaje al usuario**:

> 📧 **Configura tu email corporativo para Atlassian**
>
> Este email se usará en `CONFLUENCE_USERNAME` y `JIRA_USERNAME`.
>
> **Formato**: `tu-usuario@diveria.com`
>
> Por favor, proporciona tu email:

**Espera respuesta del usuario**

### 3.2 Actualizar mcp.json con el Email

**Acción del Agente**: actualiza `.vscode/mcp.json` en el bloque `mcp-atlassian`:

```json
"env": {
  "CONFLUENCE_USERNAME": "tu-email-proporcionado",
  "JIRA_USERNAME": "tu-email-proporcionado"
}
```

**Mensaje**:

> ✅ **Email corporativo configurado para Atlassian en `mcp.json`**

---

## 🔐 Paso 4: Crear y Cargar Credenciales

### 4.1 GitLab Token

**Mensaje al usuario**:

> 🔑 **Crear Personal Access Token de GitLab**
>
> 1. Abre: `https://gitlab.diveria.com/-/user_settings/personal_access_tokens`
> 2. Crea un nuevo token con los scopes requeridos por la guía
> 3. Copia el token generado
>
> ✋ **Pega aquí tu GitLab token:**

**Espera respuesta del usuario**

### 4.2 Atlassian Token

**Mensaje al usuario**:

> 🔑 **Crear API Token de Atlassian**
>
> 1. Abre: `https://id.atlassian.com/manage-profile/security/api-tokens`
> 2. Haz clic en **Create API token**
> 3. Dale un nombre descriptivo
> 4. Copia el token generado
>
> ⚠️ Este token se usa tanto para Jira como para Confluence.
>
> ✋ **Pega aquí tu Atlassian token:**

**Espera respuesta del usuario**

### 4.3 Context7 API Key

**Mensaje al usuario**:

> 🔑 **Crear API Key de Context7**
>
> 1. Abre: `https://context7.com/dashboard`
> 2. Ve a **API Keys**
> 3. Genera una nueva API key
> 4. Copia la key completa
>
> ✋ **Pega aquí tu API key de Context7:**

**Espera respuesta del usuario**

### 4.4 Stitch API Key

**Mensaje al usuario**:

> 🔑 **Crear API Key de Stitch**
>
> 1. Abre: `https://stitch.withgoogle.com/settings`
> 2. Ve a la sección **API Keys**
> 3. Haz clic en **Create API Key**
> 4. Copia la key completa
>
> ✋ **Pega aquí tu API key de Stitch:**

**Espera respuesta del usuario**

### 4.5 Actualizar mcp.json con las credenciales

**Acción del Agente**: actualiza `.vscode/mcp.json` con los valores provistos.

Valores a reemplazar:

- `GITLAB_PERSONAL_ACCESS_TOKEN` con `{gitlab_token}`
- `CONFLUENCE_USERNAME` con `{email}`
- `CONFLUENCE_API_TOKEN` con `{atlassian_token}`
- `JIRA_USERNAME` con `{email}`
- `JIRA_API_TOKEN` con `{atlassian_token}`
- `your_context7_api_key` con `{context7_api_key}`
- `X-Goog-Api-Key` de `stitch` con `{stitch_api_key}`

**Mensaje**:

> ✅ **Credenciales configuradas en `mcp.json`**
>
> ⚠️ Recuerda: no debes subir este archivo a Git.

---

## ✅ Paso 5: Verificación de la Configuración

**Acción del Agente**: una vez que el usuario confirma que completó la guía y reinició VS Code, verifica las herramientas.

### 5.1 Verificar GitLab

```text
Herramienta: mcp_gitlab_search_repositories
Parámetros: { "search": "", "per_page": 5 }
```

### 5.2 Verificar Jira

```text
Herramienta: mcp_mcp-atlassian_jira_get_all_projects
Parámetros: {}
```

### 5.3 Verificar Confluence

```text
Herramienta: mcp_mcp-atlassian_confluence_search
Parámetros: { "query": "type=space", "limit": 5 }
```

### 5.4 Verificar Context7

```text
Herramienta: mcp_context7_resolve-library-id
Parámetros: { "libraryName": "react" }
```

### 5.5 Verificar Stitch

```text
Herramienta: mcp_stitch_list_projects
Parámetros: { "filter": "view=owned" }
```

### 5.6 Verificar PDF Reader si aplica

Solo si el usuario tiene un PDF de prueba disponible:

```text
Herramienta: mcp_pdf-reader_read_pdf
Parámetros: {
  "sources": [{"path": "ruta/al/archivo.pdf"}],
  "include_metadata": true,
  "include_page_count": true
}
```

### 5.7 Evaluar Resultado Final

**Si TODAS las herramientas necesarias funcionan**:

> ✅ **Herramientas MCP verificadas exitosamente**
>
> - ✅ **GitLab**: {cantidad} repositorios accesibles
> - ✅ **Jira**: {cantidad} proyectos accesibles
> - ✅ **Confluence**: {cantidad} espacios accesibles
> - ✅ **Context7**: Funcionando correctamente
> - ✅ **Stitch**: Funcionando correctamente
>
> ℹ️ `UIDesigner` ya puede crear o reutilizar proyectos de Stitch cuando los necesites.
>
> Si tu objetivo incluye configurar IDs de proyecto y sincronizar Confluence, continúa con el Paso 6.
> Si solo querías dejar los MCPs funcionando, puedes finalizar aquí.

**Procede al Paso 6 solo si necesitas configuración de proyecto y sincronización externa**

---

**Si ALGUNA herramienta NO funciona**:

> ❌ **Problema de conexión con MCP**
>
> 📖 Revisa la sección **Solución de problemas** en `.github/documentation/setup/mcp-setup.md`
>
> **Pasos rápidos**:
> 1. Verifica que los tokens y API keys estén correctamente copiados en `mcp.json`
> 2. Revisa los permisos y scopes según la guía
> 3. Reinicia VS Code completamente
> 4. Si falla Stitch con OAuth, regenera el access token y actualiza manualmente la configuración del cliente
> 5. Si el problema persiste, consulta la documentación completa
>
> ✋ **Una vez hayas verificado, avísame para intentar de nuevo**

**Itera con el usuario hasta resolver el problema**

---

## 🔧 Paso 6: Configuración de IDs de Proyecto

**Este paso es opcional**. Ejecútalo solo si vas a trabajar con un proyecto concreto usando GitLab, Jira y Confluence desde este workspace.

> ℹ️ **Stitch no requiere configurar un Project ID en `tools.instructions.md`.** Si no existe un proyecto de diseño, `UIDesigner` puede crearlo cuando haga falta.

### 6.1 Listar Recursos Disponibles

**GitLab - Listar Repositorios**:

```text
Herramienta: mcp_gitlab_search_repositories
Parámetros: { "search": "", "per_page": 50 }
```

**Jira - Listar Proyectos**:

```text
Herramienta: mcp_mcp-atlassian_jira_get_all_projects
Parámetros: {}
```

**Confluence - Listar Espacios**:

```text
Herramienta: mcp_mcp-atlassian_confluence_search
Parámetros: { "query": "type=space", "limit": 50 }
```

### 6.2 Solicitar Configuración al Usuario

**Mensaje al usuario**:

> 📋 **Configuración del Proyecto en Herramientas**
>
> Para que el agente pueda trabajar con tu proyecto, necesito estos identificadores:
>
> ---
>
> **📂 GitLab - Repositorios Disponibles:**
>
> {Lista numerada con formato: Nombre (ID: XXX)}
>
> ---
>
> **🎯 Jira - Proyectos Disponibles:**
>
> {Lista numerada con formato: Nombre (Key: XXX)}
>
> ---
>
> **📚 Confluence - Espacios Disponibles:**
>
> {Lista numerada con formato: Nombre (Key: XXX)}
>
> ---
>
> ### 📝 Proporciona los siguientes datos:
>
> 1. **GitLab Project ID**
> 2. **Rama por defecto para Merge Requests**
> 3. **Jira Project Key**
> 4. **Confluence Space Key**

**Espera respuesta del usuario**

### 6.3 Actualizar tools.instructions.md

**Acción del Agente**: una vez recibidos los datos, actualiza `.github/instructions/tools.instructions.md`.

**Mensaje**:

> ✅ **Configuración del proyecto guardada en `tools.instructions.md`**
>
> - ✅ GitLab Project ID: `{id}`
> - ✅ Rama por defecto: `{branch}`
> - ✅ Jira Project Key: `{key}`
> - ✅ Confluence Space Key: `{key}`
>
> 🔽 **Continuando con la sincronización de Confluence...**

**Procede al Paso 7**

---

## 📚 Paso 7: Sincronización con Confluence

**Acción del Agente**: obtén la estructura actual de Confluence y sincroniza con el workspace.

### 7.1 Obtener Estructura de Confluence

**Buscar páginas del espacio**:

```text
Herramienta: mcp_mcp-atlassian_confluence_search
Parámetros: {
  "query": "space = {Confluence_Space_Key}",
  "limit": 50
}
```

**Procesar resultados**:

1. Filtrar attachments y comentarios
2. Construir árbol jerárquico usando relaciones parent/child
3. Formatear el árbol de salida

### 7.2 Actualizar confluence-structure.md

**Acción del Agente**: actualiza `.github/documentation/confluence-structure.md` con la estructura obtenida.

### 7.3 Buscar y Sincronizar Página "About"

**Acción del Agente**: busca una página llamada `About` en el espacio.

**Buscar página `About`**:

```text
Herramienta: mcp_mcp-atlassian_confluence_search
Parámetros: {
  "query": "space = {Space_Key} AND title ~ 'About'",
  "limit": 10
}
```

**Si se encuentra la página `About`**:

1. Obtener el contenido completo en Markdown
2. Extraer un resumen breve
3. Actualizar `.github/instructions/about.instructions.md`

**Mensaje**:

> ✅ **Página `About` sincronizada desde Confluence**
>
> - ✅ Contenido extraído de Confluence
> - ✅ `about.instructions.md` actualizado

**Si NO se encuentra la página `About`**:

> ℹ️ **No se encontró página `About` en Confluence**
>
> Puedes crearla más adelante si quieres sincronizar esa referencia.

### 7.4 Finalización de Sincronización

**Mensaje al usuario**:

> ✅ **Sincronización con Confluence completada**
>
> **Archivos actualizados:**
> - ✅ `tools.instructions.md`
> - ✅ `confluence-structure.md`
> - ✅ `about.instructions.md` si se encontró la página correspondiente
>
> 🎉 **¡Configuración MCP completada exitosamente!**
>
> `UIDesigner` ya puede usar Stitch, y el resto de agentes ya puede trabajar con GitLab, Atlassian y Context7.

**FIN DEL PROMPT**

---

## 🔧 Manejo de Errores

Para cualquier error, consulta:

📖 **Sección `Solución de problemas`** en `.github/documentation/setup/mcp-setup.md`

Incluye soluciones para:

- errores de creación de archivos
- tokens o API keys inválidas
- VS Code no carga MCPs
- problemas de permisos
- errores de conexión
- problemas de autenticación de Stitch

---

## 📝 Notas Importantes

### Seguridad

- ⚠️ **NUNCA** subas `mcp.json` a Git
- 🔒 Los tokens y API keys son sensibles
- 🔄 Rota las credenciales periódicamente

### Tokens Expirados

Si expiran o se revocan:

1. Genera una nueva credencial en el servicio correspondiente
2. Actualiza `.vscode/mcp.json`
3. Reinicia VS Code

### OAuth de Stitch

Si usas OAuth para Stitch:

1. Recuerda que el token de acceso es temporal
2. Si aparece `Unauthenticated`, vuelve a generar el token
3. Actualiza manualmente la configuración del cliente MCP

### Múltiples Proyectos

Si trabajas en múltiples proyectos:

- Cada workspace tiene su propio `mcp.json`
- Puedes reutilizar credenciales cuando la política interna lo permita
- Stitch puede reutilizar o crear proyectos de diseño según el flujo

---

## Checklist de Configuración

**Antes de finalizar, verifica**:

- [ ] `.vscode/mcp.json` existe y está configurado
- [ ] `mcp.json` está en `.gitignore`
- [ ] Email corporativo configurado para Atlassian
- [ ] GitLab token creado y configurado
- [ ] Atlassian token creado y configurado
- [ ] Context7 API key creada y configurada
- [ ] Stitch API key creada y configurada, o flujo OAuth resuelto
- [ ] VS Code reiniciado
- [ ] GitLab responde correctamente
- [ ] Jira responde correctamente
- [ ] Confluence responde correctamente
- [ ] Context7 responde correctamente
- [ ] Stitch responde correctamente
- [ ] PDF Reader validado si aplica
- [ ] `tools.instructions.md` actualizado si corresponde
- [ ] `confluence-structure.md` generado si corresponde
- [ ] `about.instructions.md` sincronizado si corresponde
- [ ] Usuario notificado sobre el próximo paso

---

**Versión**: 1.2.0
**Última actualización**: Abril 2026
