---
name: project-setup-plan
description: Generador de plan de setup - Analiza las instrucciones del proyecto y genera el prompt específico de setup con el stack tecnológico definido
argument-hint: Úsalo cuando quieras generar o regenerar el prompt de setup completo del proyecto desde instrucciones
---

# 📋 Project Setup Plan - Generador de Plan de Setup

Este prompt analiza las instrucciones de tu proyecto y **genera automáticamente** un prompt de setup personalizado con todos los comandos, herramientas y pasos específicos para tu stack tecnológico.

**Úsalo solo si el objetivo es preparar un setup completo o regenerar el prompt de setup.** Si el usuario solo quiere MCPs o actualización documental para trabajo con IA, este prompt no es necesario.

---

## 🎯 Objetivo

Generar el archivo `.github/prompts/setup.project-setup.prompt.md` personalizado que contendrá:

- ✅ Stack tecnológico específico del proyecto
- ✅ Verificación de herramientas con versiones exactas
- ✅ Links de descarga para herramientas faltantes
- ✅ Comandos CLI específicos para cada tecnología
- ✅ Pasos detallados para generar la estructura del proyecto

---

## 📋 Requisitos Previos

Antes de comenzar, verifica que existan y estén completos:

- [ ] `.github/instructions/architecture.instructions.md`
- [ ] `.github/instructions/tech-stack.instructions.md`

---

## 🔍 FASE 1: Análisis de Instrucciones

### Paso 1.1: Leer Archivos de Instrucciones

**Acción del Agente**: Lee completamente ambos archivos de instrucciones:

```
1. Leer: .github/instructions/architecture.instructions.md
2. Leer: .github/instructions/tech-stack.instructions.md
```

### Paso 1.2: Extraer Información de Arquitectura

Del archivo `architecture.instructions.md`, identificar y documentar:

**Componentes del Proyecto**:
- ¿Qué componentes principales tiene? (Backend, Frontend, Mobile, Database, etc.)
- ¿Cuál es la carpeta de cada componente?

**Estructura de Carpetas**:
- ¿Qué estructura se define para cada componente?
- ¿Qué subcarpetas se mencionan? (features/, core/, src/, etc.)

**Principios Arquitectónicos**:
- ¿Qué patrón arquitectónico se usa? (Clean Architecture, MVC, Hexagonal, etc.)
- ¿Qué reglas de dependencias existen?

**Convenciones**:
- ¿Qué convenciones de nomenclatura se definen?
- ¿Cómo se organizan los features?

### Paso 1.3: Extraer Información de Tech Stack

Del archivo `tech-stack.instructions.md`, identificar para cada componente:

**Backend**:
- Framework: ¿Cuál? (NestJS, Django, Spring Boot, Express, FastAPI, etc.)
- Lenguaje y versión
- ORM/Database tool
- Validación
- Testing framework
- Otras herramientas

**Frontend** (si aplica):
- Framework: ¿Cuál? (React, Vue, Angular, Svelte, etc.)
- Lenguaje y versión
- Build tool (Vite, Webpack, etc.)
- Estilos (Tailwind, Styled Components, etc.)
- Estado (Redux, Zustand, Context, etc.)
- Testing framework

**Mobile** (si aplica):
- Framework: ¿Cuál? (React Native, Flutter, Ionic, etc.)
- Lenguaje y versión
- Navegación
- Estilos
- Testing framework

**Database**:
- Sistema: ¿Cuál? (PostgreSQL, MySQL, MongoDB, etc.)
- Versión
- Infraestructura (Docker, Cloud, Local)
- Herramienta de gestión (Prisma, TypeORM, Sequelize, SQLAlchemy, etc.)

**Otras Herramientas**:
- Git
- Docker
- CI/CD
- Linters, formatters

### Paso 1.4: Generar Resumen del Análisis

**Mensaje al usuario**:

```markdown
## 📊 Análisis de Instrucciones Completado

He analizado las instrucciones de tu proyecto. Aquí está el resumen:

### 🏗️ Arquitectura Detectada

**Componentes**:
1. {Componente 1} (carpeta: `{carpeta}/`)
2. {Componente 2} (carpeta: `{carpeta}/`)
...

**Patrón Arquitectónico**: {patrón detectado}

**Estructura de Carpetas**:
```
{proyecto}/
├── {componente1}/
│   ├── {subcarpetas}
├── {componente2}/
│   ├── {subcarpetas}
...
```

---

### 🛠️ Stack Tecnológico Detectado

**Backend**:
- Framework: {framework} {versión si está especificada}
- Lenguaje: {lenguaje} {versión}
- ORM: {orm}
- Testing: {framework}

**Frontend**:
- Framework: {framework} {versión}
- Build Tool: {tool} {versión}
- Estilos: {framework}
- Estado: {herramienta}

**Mobile**:
- Framework: {framework} {versión}
- ...

**Database**:
- Sistema: {db} {versión}
- Infraestructura: {docker/cloud/local}
- Gestión: {tool}

**Otras Herramientas**:
- {lista de otras herramientas detectadas}

---

### ❓ Preguntas de Aclaración

{Si hay información ambigua o faltante, hacer preguntas}

Ejemplo:
> 📌 Detecté que se menciona "TypeORM o Prisma" para el ORM. ¿Cuál prefieres usar en este proyecto?
> 
> 📌 No se especifica la versión de Node.js. ¿Qué versión deseas usar? (Recomendado: v20 LTS)

---

**¿La información es correcta?** Si hay algo que ajustar, indícalo. De lo contrario, responde "OK" para continuar.
```

**DETENTE aquí y espera confirmación del usuario.**

---

## 🔍 FASE 2: Consulta de Documentación con Context7

**Solo proceder si el usuario confirmó la información.**

### Paso 2.1: Identificar Tecnologías a Consultar

Basándote en el stack detectado, crea una lista de tecnologías que necesitan documentación:

```
Tecnologías a consultar:
1. {Framework Backend} - Para comandos de creación de proyecto
2. {Build Tool Frontend} - Para comandos de scaffolding
3. {Framework Mobile} - Para comandos de inicialización
4. {ORM} - Para configuración inicial
...
```

### Paso 2.2: Consultar Context7 para Cada Tecnología

**Para cada tecnología en la lista**:

**Acción del Agente**:

```
Herramienta: mcp_context7_resolve-library-id
Parámetros: { "libraryName": "{nombre tecnología}" }
```

**Si se resuelve exitosamente**:

```
Herramienta: mcp_context7_get-library-docs
Parámetros: { 
  "context7CompatibleLibraryID": "{id obtenido}",
  "topic": "cli commands project creation initialization setup getting started",
  "mode": "code"
}
```

**Almacenar la información relevante**:
- Comandos CLI para crear proyectos
- Flags y opciones importantes
- Requisitos de instalación
- Versiones recomendadas

**Si Context7 falla o no encuentra la librería**:

> ⚠️ No se pudo obtener documentación actualizada de {tecnología} desde Context7.
> 
> Usando comandos estándar conocidos. Si hay problemas, se deberá consultar la documentación oficial.

### Paso 2.3: Identificar Herramientas Necesarias

Basándote en las tecnologías detectadas, crear lista de herramientas CLI/SDKs necesarias:

**Ejemplo**:
```
Herramientas requeridas:
1. Node.js v{version}+ y npm
   - Para: {Backend Framework}, {Frontend Framework}
   - Download: https://nodejs.org/
   
2. {CLI específico del framework} (ej: NestJS CLI, Vue CLI)
   - Para: {Backend/Frontend}
   - Instalación: npm install -g {cli}
   
3. Docker Desktop
   - Para: PostgreSQL container
   - Download: https://www.docker.com/products/docker-desktop
   
4. Git
   - Para: control de versiones
   - Download: https://git-scm.com/
   
...
```

### Paso 2.4: Generar Comandos Específicos

Para cada componente, preparar los comandos exactos que se usarán:

**Backend**:
```bash
# Comando obtenido de Context7 o estándar
{comando CLI con flags específicos}
```

**Frontend**:
```bash
{comando CLI con flags específicos}
```

**Mobile** (si aplica):
```bash
{comando CLI con flags específicos}
```

**Database**:
- Contenido del `docker-compose.yml`
- Contenido del schema inicial
- Variables de entorno

**Mensaje al usuario**:

> ✅ **Documentación obtenida de Context7**
>
> He recopilado los comandos y configuraciones necesarias para tu stack.
>
> 🚀 Procediendo a generar el prompt de setup personalizado...

---

## 📝 FASE 3: Generación del Prompt de Setup Específico

### Paso 3.1: Generar Contenido del Prompt

**Acción del Agente**: Genera el contenido completo del nuevo archivo `setup.project-setup.prompt.md` con:

**Estructura del prompt generado**:

````markdown
---
name: project-setup
description: Setup completo del proyecto {Nombre} con {stack resumido}
---

# 🚀 Project Setup - {Nombre del Proyecto}

Este prompt configura **completamente** el proyecto con el siguiente stack tecnológico:

**Backend**: {Framework} + {ORM} + {Database}
**Frontend**: {Framework} + {Build Tool}
{Mobile si aplica}: {Framework}

Al finalizar este prompt, tendrás el entorno de desarrollo **completamente funcional** y listo para programar.

---

## 📋 Requisitos Previos

Antes de comenzar, verifica que tengas instalado:

### Herramientas Requeridas:

{Para cada herramienta identificada:}

#### {Nombre Herramienta} {Versión}

**Para qué**: {Propósito}
**Verificar instalación**: `{comando --version}`
**Descargar**: [{link oficial}]({url})
**Instalar**: 
```bash
{comando de instalación si aplica}
```

---

## ⚙️ Paso 1: Verificación de Herramientas

**Acción del Agente**: Ejecuta los siguientes comandos para verificar:

```powershell
{comando1} --version  # Esperado: {versión mínima}
{comando2} --version  # Esperado: {versión mínima}
...
```

**Si todas las herramientas están OK**:

> ✅ **Herramientas verificadas correctamente**
>
> - ✅ {Herramienta 1}: {versión detectada}
> - ✅ {Herramienta 2}: {versión detectada}
>
> Continuando con la generación del proyecto...

**Si falta alguna herramienta**:

> ❌ **Herramientas faltantes detectadas:**
>
> {Para cada faltante:}
> - ❌ {Herramienta X}: No encontrada
>   - **Descargar**: {link}
>   - **Instalar**: `{comando}`
>
> ✋ Instala las herramientas faltantes y avísame para continuar.

**DETENTE hasta confirmación del usuario.**

---

## 🏷️ Paso 2: Configuración del Nombre del Proyecto

> 🏷️ **¿Cuál es el nombre de tu proyecto?**
>
> Este nombre se usará para:
> - Nombres de bases de datos
> - Containers Docker
> - Configuraciones de aplicación
> - Títulos y branding
>
> **Formato recomendado**: `kebab-case` (ej: `mi-proyecto`, `ecommerce-app`)

**Esperar respuesta del usuario**

---

## 🚀 Paso 3: Generar Backend ({Framework Backend})

### 3.1 Crear Proyecto Base

**Comando a ejecutar**:

```powershell
{comando CLI específico obtenido de Context7}
```

**Acción del Agente**: Ejecuta el comando y espera finalización.

**Mensaje**:

> 🔨 **Generando proyecto Backend con {Framework}...**

### 3.2 Crear Estructura de Carpetas

Según la arquitectura definida, crear:

```
{componente-backend}/
├── {estructura específica del proyecto}
```

**Comandos**:

```powershell
cd {carpeta-backend}
{comandos mkdir específicos según arquitectura}
```

### 3.3 Crear Archivos de Configuración

{Para cada archivo de config identificado (schema DB, .env, etc.):}

**Crear `{path/archivo}`**:

```{lenguaje}
{contenido específico del archivo con nombre del proyecto}
```

**Mensaje**:

> ✅ **Backend generado exitosamente**

---

## 🎨 Paso 4: Generar Frontend ({Framework Frontend})

{Similar al backend, con comandos específicos}

---

## 📱 Paso 5: Generar Mobile ({Framework Mobile})

{Si aplica, similar estructura}

---

## 🗄️ Paso 6: Configurar Base de Datos

### 6.1 Crear Docker Compose

**Crear `{path}/docker-compose.yml`**:

```yaml
{contenido específico con nombre del proyecto}
```

### 6.2 Iniciar Container de Base de Datos

**Comando**:

```powershell
cd {carpeta con docker-compose}
docker-compose up -d
```

**Verificar estado**:

```powershell
docker ps
docker logs {nombre-proyecto}-{database}
```

**Mensaje**:

> 🗄️ **Iniciando contenedor {Database}...**

**Si hay error**:
- Verificar que Docker Desktop esté ejecutándose
- Verificar que el puerto no esté ocupado
- Mostrar logs y soluciones

**Si es exitoso**:

> ✅ **{Database} iniciado correctamente**
>
> - Container: `{nombre-proyecto}-{database}`
> - Database: `{nombre-proyecto}_dev`
> - Puerto: {puerto}

---

## 📚 Paso 7: Crear Documentación Base

### 7.1 Crear README.md

**Crear `README.md`** en el root:

```markdown
# {Nombre del Proyecto}

{Descripción generada según arquitectura y stack}
```

### 7.2 Crear Estructura .github

```powershell
mkdir -p .github/documentation .github/prompts .github/instructions
```

**Mensaje**:

> ✅ **Documentación base creada**

### 7.3 Agregar carpetas y archivos a .gitignore

Se debe agregar a `.gitignore` todos los archivos y carpetas generados que no deban versionarse.

---

## 📦 Paso 8: Instalar Dependencias

### 8.1 Instalar Dependencias del Backend

**Comando**:

```powershell
cd {carpeta-backend}
{comando de instalación específico del gestor de paquetes}
```

**Mensaje**:

> 📦 **Instalando dependencias del Backend...**

**Si es exitoso**:

> ✅ **Backend**: Dependencias instaladas correctamente

### 8.2 Instalar Dependencias del Frontend

**Comando**:

```powershell
cd {carpeta-frontend}
{comando de instalación específico}
```

**Mensaje**:

> 📦 **Instalando dependencias del Frontend...**

**Si es exitoso**:

> ✅ **Frontend**: Dependencias instaladas correctamente

### 8.3 Instalar Dependencias del Mobile

{Si aplica}

**Comando**:

```powershell
cd {carpeta-mobile}
{comando de instalación específico}
```

**Mensaje**:

> 📦 **Instalando dependencias del Mobile...**

**Si es exitoso**:

> ✅ **Mobile**: Dependencias instaladas correctamente

---

## 🔄 Paso 9: Aplicar Migraciones de Base de Datos

{Si el ORM requiere migraciones}

**Comando**:

```powershell
cd {carpeta-backend}
{comando de migración específico del ORM}
```

**Mensaje**:

> 🔄 **Aplicando migraciones de {ORM}...**

**Si es exitoso**:

> ✅ **Migraciones aplicadas correctamente**

---

## 🚀 Paso 10: Iniciar Servicios

### 10.1 Ejecutar Backend

**Comando en terminal separada**:

```powershell
cd {carpeta-backend}
{comando para ejecutar en modo desarrollo}
```

**Mensaje**:

> ⚙️ **Ejecutando Backend API...**
>
> Terminal Backend iniciada. Esperando que la API esté lista...

**Verificar**:
- API escuchando en `{url backend}`
- {Documentación API si aplica} disponible en `{url docs}`

**Si es exitoso**:

> ✅ **Backend ejecutándose correctamente**
>
> - API: `{url backend}`
> {- Docs: `{url docs}` si aplica}

### 10.2 Ejecutar Frontend

**Comando en terminal separada**:

```powershell
cd {carpeta-frontend}
{comando para ejecutar en modo desarrollo}
```

**Mensaje**:

> 🎨 **Iniciando servidor de desarrollo {Framework}...**

**Verificar**:
- Dev server en `{url frontend}`

**Si es exitoso**:

> ✅ **Frontend ejecutándose correctamente**
>
> - App: `{url frontend}`

### 10.3 Ejecutar Mobile

{Si aplica}

**Comando en terminal separada**:

```powershell
cd {carpeta-mobile}
{comando para ejecutar en modo desarrollo}
```

**Mensaje**:

> 📱 **Iniciando {Framework Mobile}...**

**Si es exitoso**:

> ✅ **Mobile ejecutándose correctamente**

---

## ✅ Paso 11: Verificación Final del Entorno

**Mensaje**:

> 🎉 **¡Entorno de desarrollo inicializado exitosamente!**
>
> **Servicios activos**:
>
> - ✅ {Database}: `{host}:{puerto}`
> - ✅ Backend API: `{url backend}`
> {- ✅ API Docs: `{url docs}` si aplica}
> - ✅ Frontend: `{url frontend}`
> {- ✅ Mobile: `{info mobile}` si aplica}
>
> ---
>
> ### 🧪 Verificación de Funcionamiento:
>
> {Instrucciones específicas según el stack para verificar que todo funciona}
> {Por ejemplo: abrir el frontend, hacer una llamada a la API, etc.}
>
> **¿Todo funciona correctamente?** (Responde Sí/No)

**Si el usuario responde "Sí"**:

> ✅ **¡Perfecto! El entorno está completamente funcional.**
>
> 🎨 **Ya puedes empezar a desarrollar.**
>
> **Próximos pasos sugeridos**:
> - Crear tu primer feature backend
> - Crear tu primer feature frontend
> - Configurar CI/CD (si aplica)

**Si el usuario responde "No"**:

> ❌ **Describe el problema que encontraste:**
>
> (El agente iterará para resolver el problema)

---

## 🔧 Manejo de Errores

### Error: Instalación de Dependencias Falla

{Soluciones específicas según el gestor de paquetes}

### Error: Puerto Ocupado

{Soluciones para cada servicio}

### Error: Migraciones Fallan

{Soluciones específicas del ORM}

### Error: Servicio No Inicia

{Troubleshooting específico de cada tecnología}

---

## 📝 Resumen del Entorno Configurado

**Arquitectura**: {Patrón arquitectónico}

**Stack Tecnológico**:
- Backend: {Framework} + {ORM} + {Database}
- Frontend: {Framework} + {Build Tool}
{- Mobile: {Framework} si aplica}

**URLs de Desarrollo**:
- Backend: `{url}`
{- API Docs: `{url}` si aplica}
- Frontend: `{url}`
{- Mobile: {info} si aplica}

**Base de Datos**:
- Sistema: {Database} {versión}
- Host: `{host}:{puerto}`
- Database: `{nombre-proyecto}_dev`

---

## Checklist de Setup Completo

**Antes de finalizar, verifica**:

- [ ] Herramientas verificadas y correctas
- [ ] Nombre del proyecto configurado
- [ ] Backend generado con estructura correcta
- [ ] Frontend generado con estructura correcta
- [ ] Mobile generado (si aplica)
- [ ] Base de datos iniciada en Docker
- [ ] .gitignore actualizado
- [ ] Documentación base creada
- [ ] Dependencias del backend instaladas
- [ ] Dependencias del frontend instaladas
- [ ] Dependencias del mobile instaladas (si aplica)
- [ ] Migraciones aplicadas (si aplica)
- [ ] Backend ejecutándose correctamente
- [ ] Frontend ejecutándose correctamente
- [ ] Mobile ejecutándose (si aplica)
- [ ] Verificación de funcionamiento exitosa
- [ ] Usuario puede empezar a desarrollar

---

**Versión**: Generado automáticamente por `project-setup-plan.prompt.md`
**Fecha de generación**: {fecha}

````

### Paso 3.2: Guardar el Prompt Generado

**Acción del Agente**: Guarda el contenido generado en:

```
.github/prompts/setup.project-setup.prompt.md
```

**Mensaje al usuario**:

> 📄 **Prompt de setup personalizado generado exitosamente**
>
> **Archivo creado**: `.github/prompts/setup.project-setup.prompt.md`
>
> Este prompt contiene:
> - ✅ Verificación de herramientas específicas para tu stack
> - ✅ Links de descarga para herramientas faltantes
> - ✅ Comandos CLI exactos para {Backend Framework}, {Frontend Framework}, etc.
> - ✅ Configuración de {Database} en Docker
> - ✅ Estructura de carpetas según tu arquitectura
> - ✅ Archivos de configuración base
>
> ---
>
> ### 🚀 Próximo Paso:
>
> **Ejecuta el prompt generado para hacer el setup de tu proyecto**:
>
> 1. Abre el archivo: `.github/prompts/setup.project-setup.prompt.md`
> 2. Sigue las instrucciones paso a paso
> 3. El prompt te guiará en la instalación de herramientas y generación de la estructura

### Paso 3.3: Actualizar Copilot Instructions

**Acción del Agente**: Actualiza `.github/copilot-instructions.md` para documentar el nuevo prompt:

Si la sección de prompts no menciona `setup.project-setup.prompt.md`, añadir la entrada:

```markdown
- `setup.project-setup.prompt.md` - Setup del proyecto generado por project-setup-plan con stack tecnológico específico y herramientas requeridas
```

**Mensaje al usuario**:

> ✅ **`copilot-instructions.md` actualizado**
>
> El nuevo prompt de setup ha sido documentado en el índice.

---

## 🎉 FASE 4: Finalización

**Mensaje al usuario**:

```markdown
🎉 **¡Plan de setup generado exitosamente!**

### 📋 Resumen:

**Archivo generado**: `.github/prompts/setup.project-setup.prompt.md`

**Contenido del prompt**:
- 🔍 Verificación de herramientas para tu stack
- 📥 Links de descarga: {lista de herramientas}
- 🚀 Comandos específicos:
  - Backend: `{comando principal}`
  - Frontend: `{comando principal}`
  {Mobile si aplica}
- 🗄️ Configuración de {Database} en Docker
- 📂 Estructura de carpetas según tu arquitectura
- 📦 **Instalación de dependencias** completa
- 🔄 **Aplicación de migraciones** (si aplica)
- 🚀 **Inicialización de servicios** (Backend, Frontend, Mobile)
- ✅ **Verificación de funcionamiento**

---

### 🚀 Siguiente Acción:

**Ejecuta el prompt de setup que acabo de generar**:

1. Abre: `.github/prompts/setup.project-setup.prompt.md`
2. Ejecuta cada paso secuencialmente
3. Al finalizar, tendrás el entorno **completamente funcional** y listo para desarrollar

---

✅ **Tu proyecto estará listo para empezar a programar.**
```

---

## 🔧 Manejo de Errores

### Error: Instrucciones Incompletas

Si los archivos de instrucciones no tienen suficiente información:

> ❌ **Información insuficiente en las instrucciones**
>
> No pude determinar {información faltante}.
>
> Por favor, actualiza `.github/instructions/{archivo}.md` con:
> - {detalle 1}
> - {detalle 2}

### Error: Context7 No Disponible

Si Context7 falla completamente:

> ⚠️ **Context7 no disponible**
>
> Generaré el prompt con comandos estándar de la industria.
> 
> ⚠️ **Importante**: Verifica los comandos en la documentación oficial antes de ejecutar.

### Error: Tecnología Desconocida

Si se detecta una tecnología que el agente no conoce:

> ❓ **Tecnología no reconocida: {tecnología}**
>
> Por favor proporciona:
> - Comando CLI para crear proyecto (si existe)
> - Link a documentación oficial
> - Requisitos de instalación
>
> O sugiere una alternativa similar que pueda usar como referencia.

---

## 📝 Notas Importantes

### Archivo Generado es Específico

El archivo `setup.project-setup.prompt.md` generado es **específico de tu proyecto** y debe:
- Ser versionado en Git
- Servir como documentación del setup
- Ser actualizado si cambia el stack

### Re-ejecución

Si cambias el stack tecnológico en las instrucciones:
- Ejecuta nuevamente `project-setup-plan.prompt.md`
- Esto regenerará `setup.project-setup.prompt.md` con el nuevo stack
- El archivo anterior será sobrescrito

### Personalización Post-Generación

Después de generar, puedes:
- Ajustar manualmente el prompt generado
- Añadir pasos específicos de tu proyecto
- Modificar comandos según necesidades

---

## Checklist de Generación

**Antes de finalizar, verifica**:

- [ ] Instrucciones de arquitectura leídas y analizadas
- [ ] Instrucciones de tech stack leídas y analizadas
- [ ] Información confirmada con el usuario
- [ ] Context7 consultado para tecnologías principales
- [ ] Herramientas necesarias identificadas con links de descarga
- [ ] Comandos CLI específicos obtenidos
- [ ] Archivos de configuración preparados
- [ ] Prompt `setup.project-setup.prompt.md` generado completamente
- [ ] Prompt incluye verificación de herramientas
- [ ] Prompt incluye generación de estructura
- [ ] Prompt incluye instalación de dependencias
- [ ] Prompt incluye inicialización de base de datos
- [ ] Prompt incluye aplicación de migraciones (si aplica)
- [ ] Prompt incluye actualización de .gitignore
- [ ] Prompt incluye ejecución de servicios
- [ ] Prompt incluye verificación de funcionamiento
- [ ] Prompt incluye manejo de errores
- [ ] `copilot-instructions.md` actualizado
- [ ] Usuario notificado sobre próximos pasos

---

**Versión**: 1.1.0  
**Última actualización**: Abril 2026
