# Configuración de Model Context Protocol (MCP)

Este documento explica cómo configurar los servidores MCP del proyecto para GitLab, Context7, PDF Reader, Atlassian (Jira/Confluence) y Stitch.

Stitch es especialmente relevante para el agente `UIDesigner`, ya que usa el MCP remoto de Stitch para crear proyectos de diseño, design systems y mockups.

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Paso 1: Crear el archivo de configuración](#paso-1-crear-el-archivo-de-configuración)
- [Paso 2: Configurar GitLab MCP](#paso-2-configurar-gitlab-mcp)
- [Paso 3: Configurar Context7 MCP](#paso-3-configurar-context7-mcp)
- [Paso 4: Configurar PDF Reader MCP](#paso-4-configurar-pdf-reader-mcp)
- [Paso 5: Configurar Atlassian MCP](#paso-5-configurar-atlassian-mcp)
- [Paso 6: Configurar Stitch MCP](#paso-6-configurar-stitch-mcp)
- [Paso 7: Verificar la configuración](#paso-7-verificar-la-configuración)
- [Verificación automática](#verificación-automática)
- [Solución de problemas](#solución-de-problemas)

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener:

- ✅ Acceso al proyecto en GitLab de Diveria
- ✅ Una cuenta en Atlassian (Jira/Confluence) de Diveria
- ✅ Una cuenta en Context7
- ✅ Acceso a Stitch con una cuenta habilitada
- ✅ Docker instalado si vas a usar el MCP de Atlassian
- ✅ Node.js y npm instalados para los MCPs de GitLab, Context7 y PDF Reader
- ✅ Google Cloud SDK solo si vas a usar el flujo alternativo de OAuth para Stitch

> 📌 **Recomendación:** en VS Code local, la forma más simple de configurar Stitch es con **API Key**, tal como recomienda la documentación oficial. Usa OAuth solo si tu entorno no permite guardar secretos persistentes en `mcp.json`.

---

## Paso 1: Crear el archivo de configuración

1. **Copia el template de configuración:**

   En la raíz del proyecto, encontrarás el archivo `.vscode/mcp.template.json`. Copia este archivo y renómbralo a `mcp.json` en el mismo directorio:

   ```powershell
   Copy-Item .vscode\mcp.template.json .vscode\mcp.json
   ```

2. **Verifica el contenido base:**

   El template ya incluye los bloques para:

   - GitLab
   - Atlassian
   - Context7
   - PDF Reader
   - Stitch

3. **Protege el archivo:**

   > ⚠️ **Importante:** `mcp.json` está incluido en `.gitignore` para proteger tus credenciales. **NUNCA** lo subas al repositorio.

---

## Paso 2: Configurar GitLab MCP

### 2.1 Crear un Personal Access Token en GitLab

1. **Accede a la configuración de tokens:**

   Abre el siguiente enlace en tu navegador:

   ```
   https://gitlab.diveria.com/-/user_settings/personal_access_tokens
   ```

2. **Crea un nuevo token:**

   - **Token name:** `MCP GitHub Copilot`
   - **Expiration date:** recomendado 1 año
   - **Select scopes:**
     - ✅ `read_user`
     - ✅ `read_repository`
     - ✅ `api`
     - ✅ `write_registry`
     - ✅ `write_virtual_registry`
     - ✅ `write_repository`
     - ✅ `read_api`

3. **Genera y copia el token:**

   - Haz clic en **Create personal access token**
   - Copia el token inmediatamente

### 2.2 Configurar el token en mcp.json

Abre `.vscode/mcp.json` y reemplaza `personal_access_token`:

```json
"gitlab": {
  "command": "npx",
  "args": ["-y", "@zereight/mcp-gitlab"],
  "env": {
    "GITLAB_PERSONAL_ACCESS_TOKEN": "glpat-tu-token-aqui",
    "GITLAB_API_URL": "https://gitlab.diveria.com/api/v4",
    "GITLAB_READ_ONLY_MODE": "false",
    "USE_GITLAB_WIKI": "false",
    "USE_MILESTONE": "false",
    "USE_PIPELINE": "false"
  }
}
```

---

## Paso 3: Configurar Context7 MCP

### 3.1 Crear una API Key en Context7

1. Abre `https://context7.com/dashboard`
2. Ve a **API Keys**
3. Haz clic en **Generate New API Key**
4. Usa un nombre como `MCP GitHub Copilot`
5. Copia la API key generada

### 3.2 Configurar la API Key en mcp.json

Reemplaza `your_context7_api_key` en `.vscode/mcp.json`:

```json
"context7": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@upstash/context7-mcp", "--api-key", "ctx7sk-tu-api-key-aqui"]
}
```

> 📖 **Nota:** Context7 permite consultar documentación técnica actualizada desde el agente.

---

## Paso 4: Configurar PDF Reader MCP

El MCP de PDF Reader permite al agente leer y extraer información de archivos PDF locales o remotos.

### 4.1 Verificar la configuración

PDF Reader **no requiere credenciales adicionales**. Ya viene configurado en el template:

```json
"pdf-reader": {
  "command": "npx",
  "args": ["-y", "@sylphx/pdf-reader-mcp"]
}
```

### 4.2 Capacidades

El agente puede:

- ✅ Leer contenido de PDFs locales
- ✅ Leer contenido de PDFs desde URLs
- ✅ Extraer metadatos
- ✅ Extraer imágenes embebidas como base64
- ✅ Procesar páginas específicas o rangos

### 4.3 Ejemplo de uso

```text
Lee el contenido del PDF en docs/manual.pdf
Extrae las imágenes de las páginas 5-10 del PDF
Resume el contenido de https://example.com/document.pdf
```

---

## Paso 5: Configurar Atlassian MCP

### 5.1 Crear un API Token en Atlassian

1. Abre `https://id.atlassian.com/manage-profile/security/api-tokens`
2. Haz clic en **Create API token**
3. Usa un nombre descriptivo, por ejemplo `MCP GitHub Copilot`
4. Copia el token generado

### 5.2 Configurar las credenciales en mcp.json

Abre `.vscode/mcp.json` y actualiza las credenciales usando tu email corporativo en ambos servicios:

```json
"mcp-atlassian": {
  "command": "docker",
  "args": [
    "run",
    "-i",
    "--rm",
    "-e",
    "CONFLUENCE_URL",
    "-e",
    "CONFLUENCE_USERNAME",
    "-e",
    "CONFLUENCE_API_TOKEN",
    "-e",
    "JIRA_URL",
    "-e",
    "JIRA_USERNAME",
    "-e",
    "JIRA_API_TOKEN",
    "ghcr.io/sooperset/mcp-atlassian:latest"
  ],
  "env": {
    "CONFLUENCE_URL": "https://diveria.atlassian.net/wiki",
    "CONFLUENCE_USERNAME": "nombre.apellido@diveria.com",
    "CONFLUENCE_API_TOKEN": "tu-token-atlassian",
    "JIRA_URL": "https://diveria.atlassian.net",
    "JIRA_USERNAME": "nombre.apellido@diveria.com",
    "JIRA_API_TOKEN": "tu-token-atlassian"
  }
}
```

---

## Paso 6: Configurar Stitch MCP

Stitch es un **MCP remoto por HTTP**. En este proyecto ya viene declarado en el template; solo necesitas completar la autenticación.

### 6.1 Elegir el método de autenticación

La documentación oficial de Stitch soporta dos opciones:

- **API Key**: recomendada para VS Code local y para este repositorio
- **OAuth**: alternativa útil en entornos donde no se permite guardar claves persistentes en disco

### 6.2 Crear una API Key en Stitch

1. Abre `https://stitch.withgoogle.com/settings`
2. Ve a la sección **API Keys**
3. Haz clic en **Create API Key**
4. Copia la API key y guárdala en un lugar seguro

### 6.3 Configurar la API Key en mcp.json

Si copiaste `.vscode/mcp.template.json`, el bloque ya existe. Solo reemplaza `api-key`:

```json
"stitch": {
  "url": "https://stitch.googleapis.com/mcp",
  "type": "http",
  "headers": {
    "Accept": "application/json",
    "X-Goog-Api-Key": "tu-stitch-api-key"
  }
}
```

---

## Paso 7: Verificar la configuración

### 7.1 Reiniciar VS Code

Una vez configuradas las credenciales:

1. Reinicia VS Code completamente
2. Abre GitHub Copilot en **modo Agent**

### 7.2 Verificar acceso a GitLab

El agente debería poder:

- ✅ Listar repositorios
- ✅ Consultar merge requests
- ✅ Crear branches y commits

### 7.3 Verificar acceso a Context7

El agente debería poder:

- ✅ Buscar documentación de librerías populares
- ✅ Obtener referencias de APIs actualizadas
- ✅ Acceder a guías conceptuales

### 7.4 Verificar acceso a PDF Reader

El agente debería poder:

- ✅ Leer archivos PDF locales
- ✅ Extraer contenido y metadatos
- ✅ Procesar PDFs desde URLs

### 7.5 Verificar acceso a Atlassian

El agente debería poder:

- ✅ Leer issues de Jira
- ✅ Leer páginas de Confluence
- ✅ Crear o actualizar issues y páginas

### 7.6 Verificar acceso a Stitch

El agente debería poder:

- ✅ Listar proyectos de Stitch
- ✅ Crear un proyecto nuevo si no existe uno previo
- ✅ Crear o actualizar design systems
- ✅ Generar pantallas para `UIDesigner`

> 📌 **Nota:** es válido que `list_projects` responda con una lista vacía si todavía no creaste proyectos. Lo importante es que no haya error de autenticación.

---

## Verificación automática

El agente puede verificar automáticamente si los MCPs están configurados correctamente intentando acceder a:

### GitLab

```text
Herramienta: mcp_gitlab_search_repositories
Parámetros: { "search": "", "per_page": 1 }
```

**Resultado esperado:** lista de repositorios accesibles o respuesta vacía sin error de autenticación.

### Jira

```text
Herramienta: mcp_mcp-atlassian_jira_get_all_projects
Parámetros: {}
```

**Resultado esperado:** lista de proyectos accesibles.

### Confluence

```text
Herramienta: mcp_mcp-atlassian_confluence_search
Parámetros: { "query": "type=page", "limit": 1 }
```

**Resultado esperado:** respuesta exitosa, con o sin resultados.

### Context7

```text
Herramienta: mcp_context7_resolve-library-id
Parámetros: { "libraryName": "react" }
```

**Resultado esperado:** lista de librerías coincidentes con documentación disponible.

### PDF Reader

```text
Herramienta: mcp_pdf-reader_read_pdf
Parámetros: {
  "sources": [{"path": "ruta/al/archivo.pdf"}],
  "include_metadata": true,
  "include_page_count": true
}
```

**Resultado esperado:** respuesta exitosa con metadatos del PDF, o error normal si el archivo no existe.

### Stitch

```text
Herramienta: mcp_stitch_list_projects
Parámetros: { "filter": "view=owned" }
```

**Resultado esperado:** respuesta exitosa con proyectos o lista vacía sin error de autenticación.

Si las verificaciones responden sin errores de autenticación o transporte, los MCPs están correctamente configurados y listos para usar.

---

## Solución de problemas

### ❌ Error: "Context7 API key inválida"

**Causa:** la API key de Context7 es incorrecta o expiró.

**Solución:**

1. Verifica que la key comience con `ctx7sk-`
2. Asegúrate de haberla copiado completa
3. Genera una nueva key si es necesario

### ❌ Error: "GitLab token inválido"

**Causa:** el token de GitLab no tiene scopes suficientes o expiró.

**Solución:**

1. Revisa que el token esté completo
2. Verifica los scopes requeridos
3. Genera un nuevo token si hace falta

### ❌ Error: "Atlassian authentication failed"

**Causa:** el API token de Atlassian es incorrecto o el email configurado no coincide.

**Solución:**

1. Verifica que `CONFLUENCE_USERNAME` y `JIRA_USERNAME` usen tu email corporativo
2. Verifica que el token esté completo
3. Genera un nuevo token si es necesario

### ❌ Error: "Stitch API key inválida" o "Unauthenticated"

**Causa:** la API key de Stitch es incorrecta, fue revocada, o el cliente quedó configurado con un token OAuth vencido.

**Solución:**

1. Verifica que `X-Goog-Api-Key` tenga la API key correcta
2. Si usas OAuth, vuelve a generar el access token y actualízalo manualmente en la configuración del cliente
3. Revisa `https://stitch.withgoogle.com/settings` para rotar o recrear la clave

### ❌ Error: "Docker not found" en Atlassian MCP

**Causa:** Docker no está instalado o no está disponible en el PATH.

**Solución:**

1. Instala Docker Desktop
2. Asegúrate de que Docker esté corriendo
3. Verifica con `docker --version`

### ❌ Stitch no aparece en VS Code

**Causa:** el servidor remoto no fue agregado correctamente o VS Code no recargó el archivo `mcp.json`.

**Solución:**

1. Verifica que exista el bloque `stitch` en `.vscode/mcp.json`
2. Revisa que use `"type": "http"` y la URL `https://stitch.googleapis.com/mcp`
3. Reinicia VS Code por completo

### ❌ Los cambios en mcp.json no se aplican

**Causa:** VS Code no recargó la configuración de MCP.

**Solución:**

1. Cierra completamente VS Code
2. Vuelve a abrirlo
3. Espera unos segundos a que GitHub Copilot inicialice los servidores MCP

---

## Información de Seguridad

🔒 **Protección de credenciales:**

- El archivo `mcp.json` debe permanecer fuera de Git
- **NUNCA** compartas tokens o API keys
- **NUNCA** subas `mcp.json` a un repositorio
- Rota las credenciales periódicamente

🔑 **Gestión de secretos:**

- Guarda tokens y API keys en un gestor seguro
- Revoca inmediatamente cualquier credencial comprometida
- Cada desarrollador debe usar credenciales personales

---

## Referencias

- [Documentación oficial MCP GitLab](https://github.com/zereight/mcp-gitlab)
- [Documentación oficial MCP Atlassian](https://github.com/sooperset/mcp-atlassian)
- [Documentación oficial MCP Context7](https://github.com/upstash/context7-mcp)
- [Documentación oficial MCP PDF Reader](https://github.com/sylphx/pdf-reader-mcp)
- [Documentación oficial Stitch MCP Setup](https://stitch.withgoogle.com/docs/mcp/setup)
- [GitLab Personal Access Tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)
- [Atlassian API Tokens](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/)
- [Context7 Dashboard](https://context7.com/dashboard)
- [Stitch Settings](https://stitch.withgoogle.com/settings)
