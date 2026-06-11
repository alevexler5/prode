---
name: documentation-plan
description: Generador de plan de actualización de documentación - Analiza el proyecto y genera checklist iterativo para actualizar/agregar/eliminar documentación y prompts
argument-hint: Puede ejecutarse después de setup.project-setup o directamente sobre un proyecto existente para preparar documentación y contexto de IA
---

# 📚 Documentation Plan - Generador de Plan de Actualización de Documentación

Este prompt analiza el proyecto actual y crea un plan iterativo para actualizar toda la documentación y prompts al stack tecnológico actual, eliminando referencias obsoletas o inconsistentes.

**⚠️ IMPORTANTE**: Este prompt puede ejecutarse después de `setup.project-setup.prompt.md` o directamente sobre un proyecto existente que ya tenga código y estructura para analizar.

---

## 🎯 Objetivo

Generar el archivo `.github/prompts/setup.documentation-update.prompt.md` que contendrá:

- ✅ Checklist de archivos a **actualizar** (eliminando referencias al stack viejo)
- ✅ Checklist de archivos a **agregar** (componentes sin documentación)
- ✅ Checklist de archivos a **eliminar** (componentes que no existen en el proyecto)
- ✅ Proceso iterativo para cada archivo: analizar → preguntar → generar → actualizar índice

---

## 📋 Requisitos Previos

- [ ] Proyecto inicializado con `setup.project-setup.prompt.md` o repositorio existente con código/documentación para analizar
- [ ] `.github/instructions/architecture.instructions.md` existe
- [ ] `.github/instructions/tech-stack.instructions.md` existe
- [ ] Estructura del proyecto disponible para inspección (generada o preexistente)

---

## 🔍 FASE 1: Análisis del Proyecto Actual

### Paso 1.1: Leer Instrucciones Base

**Acción del Agente**: Lee los archivos de instrucciones actuales:

```
1. Leer: .github/instructions/architecture.instructions.md
2. Leer: .github/instructions/tech-stack.instructions.md
```

### Paso 1.2: Identificar Componentes del Proyecto

Del archivo `architecture.instructions.md`, extraer:

**Componentes Definidos**:
- ¿Qué componentes menciona? (Backend, Frontend, Mobile, Database, etc.)
- ¿Qué carpeta tiene cada componente? (backend/, frontend/, app/, etc.)

Del archivo `tech-stack.instructions.md`, extraer:

**Stack de Cada Componente**:
- Backend: Framework, ORM, Database, Testing
- Frontend: Framework, Build Tool, Estilos, Estado
- Mobile: Framework, Navegación, Estilos
- Database: Sistema, Versión, Herramienta de gestión

### Paso 1.3: Verificar Estructura de Carpetas Existente

**Acción del Agente**: Verifica qué carpetas existen realmente en el proyecto:

```powershell
# Listar carpetas principales
Get-ChildItem -Directory | Select-Object Name
```

**Identificar**:
- ✅ Backend existe: ¿En qué carpeta? (backend/, src/, etc.)
- ✅ Frontend existe: ¿En qué carpeta? (frontend/, web/, etc.)
- ✅ Mobile existe: ¿En qué carpeta? (app/, mobile/, etc.)
- ✅ Database existe: ¿Hay `docker-compose.yml`, carpeta de migraciones, contexto ORM o archivos equivalentes?

### Paso 1.4: Listar Documentación Existente

**Acción del Agente**: Lista todos los archivos de documentación y prompts:

```powershell
# Documentación
Get-ChildItem .github/documentation/*.md | Select-Object Name

# Prompts
Get-ChildItem .github/prompts/*.md | Select-Object Name

# README principal
Test-Path README.md

# READMEs de componentes
Test-Path backend/README.md
Test-Path frontend/README.md
Test-Path app/README.md
```

### Paso 1.5: Leer Ejemplos de Referencia

**Acción del Agente**: Lee los archivos de ejemplo del stack anterior (solo como referencia):

```
1. Leer: .github/documentation/examples/old-architecture.instructions.md (si existe)
2. Leer: .github/documentation/examples/old-tech-stack.instructions.md (si existe)
```

**IMPORTANTE**: Estos archivos son SOLO para entender el contexto histórico. NO deben copiarse al resultado.

### Paso 1.6: Generar Resumen del Análisis

**Mensaje al usuario**:

```markdown
## 📊 Análisis del Proyecto Completado

### 🏗️ Componentes Detectados en Instrucciones

**Según architecture.instructions.md + tech-stack.instructions.md**:

{Para cada componente definido:}
- **{Componente}** (carpeta: `{carpeta}/`)
  - Stack: {framework} + {tecnologías principales}

---

### 📁 Estructura Real del Proyecto

**Carpetas existentes**:

{Lista de carpetas encontradas con ✅}

**Carpetas esperadas pero NO encontradas**:

{Lista de carpetas definidas en instrucciones pero que no existen con ❌}

---

### 📄 Documentación Existente

**Documentation** (`.github/documentation/`):
{Lista de archivos .md encontrados}

**Prompts** (`.github/prompts/`):
{Lista de archivos .md encontrados}

**READMEs**:
- Raíz: {✅ existe / ❌ no existe}
{Para cada componente con carpeta existente:}
- {Componente}: {✅ existe / ❌ no existe}

---

### 🔍 Stack Tecnológico Detectado

{Resumen del stack actual según tech-stack.instructions.md}

**Backend**: {framework} {versión} + {orm} + {database}
**Frontend**: {framework} {versión} + {build tool} + {estilos}
**Mobile**: {framework} {versión} + {navegación}

---

**¿La información es correcta?** Responde "OK" para continuar con el análisis de archivos.
```

**DETENTE aquí y espera confirmación del usuario.**

---

## 🔍 FASE 2: Análisis de Archivos a Actualizar/Agregar/Eliminar

**Solo proceder si el usuario confirmó la información.**

### Paso 2.1: Analizar Archivos de Documentación

Para cada archivo en `.github/documentation/`:

**Acción del Agente**: Lee cada archivo y verifica:

1. **¿Contiene referencias al stack viejo?**
   - Comparar el contenido contra `tech-stack.instructions.md`, `architecture.instructions.md` y la estructura real del proyecto
   - Si contiene tecnologías, comandos, rutas, convenciones o descripciones que ya no coinciden con el stack actual → Marcar como "ACTUALIZAR"

2. **¿El componente asociado existe en el proyecto?**
   - Ejemplo: `frontend.md` pero NO existe carpeta `frontend/`
   - Si el componente NO existe → Marcar como "ELIMINAR"

3. **¿Es documentación core del proyecto?**
   - Archivos como `setup/mcp-setup.md`, `confluence-structure.md` → Siempre revisar por si necesitan actualización

**Resultado**:
- Lista de archivos a ACTUALIZAR con motivo
- Lista de archivos a ELIMINAR con motivo

### Paso 2.2: Identificar Documentación Faltante

**Acción del Agente**: Para cada componente que EXISTE en el proyecto:

1. **¿Tiene documentación específica?**
   - Backend existe → ¿Existe `backend.md`?
   - Frontend existe → ¿Existe `frontend.md`?
   - Mobile existe → ¿Existe `mobile.md`?

2. **¿Hay documentación específica del ORM/tecnología?**
   - Si el proyecto usa ORM, migraciones o tooling de base de datos específico → ¿Existe documentación dedicada y vigente?
   - Si la base de datos tiene flujo operativo propio → ¿Está documentado?

3. **¿Existe README.md en componentes?**
   - Backend sin README → Agregar `backend/README.md`
   - Frontend sin README → Agregar `frontend/README.md`

**Resultado**:
- Lista de archivos a AGREGAR con motivo

### Paso 2.3: Analizar Archivos de Prompts

Para cada archivo en `.github/prompts/`:

**Acción del Agente**: Lee cada prompt y verifica:

1. **¿Contiene comandos/tecnologías del stack viejo?**
   - Comparar el prompt contra el stack, comandos y estructura definidos en instructions y en el proyecto real
   - Si contiene tecnologías, comandos, rutas o supuestos que ya no aplican → Marcar como "ACTUALIZAR"

2. **¿El componente asociado existe?**
   - `create-frontend-feature.prompt.md` pero NO hay frontend
   - Si el componente NO existe → Marcar como "ELIMINAR"

3. **¿Es un prompt core/genérico?**
   - `mcp-setup.prompt.md`, `project-setup-plan.prompt.md`, `documentation-plan.prompt.md`
   - Estos se mantienen siempre (revisar por si necesitan actualización)

**Resultado**:
- Lista de prompts a ACTUALIZAR con motivo
- Lista de prompts a ELIMINAR con motivo

### Paso 2.4: Identificar Prompts Faltantes

**Acción del Agente**: Para cada componente que EXISTE:

1. **¿Tiene prompts de creación de features?**
   - Backend existe → ¿Existe `create-backend-feature.prompt.md`?
   - Frontend existe → ¿Existe `create-frontend-feature.prompt.md`?
   - Mobile existe → ¿Existe `create-mobile-feature.prompt.md`?

2. **¿Hay prompts específicos del stack?**
   - Si hay migraciones, testing o tooling específico del stack → ¿Existen prompts adaptados a ese flujo?

3. **¿Hay prompts de documentación en herramientas?**
   - Si usa Confluence → ¿Existen prompts de documentación automática?

**Resultado**:
- Lista de prompts a AGREGAR con motivo

### Paso 2.5: Verificar README.md Principal

**Acción del Agente**: Verifica el README.md de la raíz:

1. **¿Existe README.md?**
   - Si NO existe → Marcar como "AGREGAR"
   - Si existe → Verificar contenido

2. **Si existe, ¿menciona el stack viejo?**
   - Comparar contra el stack actual definido en instructions y contra el proyecto real
   - Si contiene referencias desactualizadas o contradictorias → Marcar como "ACTUALIZAR"

3. **¿Documenta que es un proyecto orientado a IA?**
   - Debe mencionar GitHub Copilot, prompts, instrucciones
   - Si NO lo menciona → Marcar como "ACTUALIZAR"

**Resultado**:
- README.md: AGREGAR o ACTUALIZAR o OK

### Paso 2.6: Presentar Plan Inicial al Usuario

**Mensaje al usuario**:

```markdown
## 📋 Plan de Actualización de Documentación

He analizado el proyecto y generé el siguiente plan:

---

### ✏️ DOCUMENTACIÓN A ACTUALIZAR

{Para cada archivo:}
- **{nombre-archivo.md}**
  - **Motivo**: {contiene referencias a X stack viejo / necesita actualización / etc.}
  - **Acción**: Actualizar al stack actual ({stack})

**Total**: {cantidad} archivo(s)

---

### ➕ DOCUMENTACIÓN A AGREGAR

{Para cada archivo:}
- **{nombre-archivo.md}**
  - **Ubicación**: `.github/documentation/` o `{componente}/README.md`
  - **Motivo**: {componente existe pero no tiene documentación / falta README / etc.}
  - **Contenido**: Documentación de {componente} con {stack}

**Total**: {cantidad} archivo(s)

---

### ❌ DOCUMENTACIÓN A ELIMINAR

{Para cada archivo:}
- **{nombre-archivo.md}**
  - **Motivo**: {componente no existe en el proyecto / documentación obsoleta / etc.}

**Total**: {cantidad} archivo(s)

---

### ✏️ PROMPTS A ACTUALIZAR

{Para cada prompt:}
- **{nombre-prompt.prompt.md}**
  - **Motivo**: {contiene comandos del stack viejo / tecnologías obsoletas / estructura vieja}
  - **Acción**: Actualizar a {stack nuevo}

**Total**: {cantidad} prompt(s)

---

### ➕ PROMPTS A AGREGAR

{Para cada prompt:}
- **{nombre-prompt.prompt.md}**
  - **Ubicación**: `.github/prompts/`
  - **Motivo**: {componente existe pero no tiene prompt de features / falta prompt específico}
  - **Contenido**: Prompt para {acción} en {componente} con {stack}

**Total**: {cantidad} prompt(s)

---

### ❌ PROMPTS A ELIMINAR

{Para cada prompt:}
- **{nombre-prompt.prompt.md}**
  - **Motivo**: {componente no existe / prompt obsoleto}

**Total**: {cantidad} prompt(s)

---

### 📄 README.md (Raíz del Proyecto)

- **Estado**: {AGREGAR / ACTUALIZAR / OK}
- **Acción**: {crear README principal / actualizar para eliminar stack viejo y documentar orientación a IA / ninguna}

---

## ❓ Validación del Plan

**¿El plan es correcto?**

- ¿Hay algún archivo que NO debería actualizarse/agregarse/eliminarse?
- ¿Falta algún archivo que debería estar en el plan?
- ¿Alguna acción debería cambiar? (actualizar → eliminar, agregar → omitir, etc.)

**Responde**:
- "OK" para continuar y generar el prompt de actualización
- Indica los cambios necesarios al plan
```

**DETENTE y espera respuesta del usuario.**

Si el usuario pide cambios, ajusta el plan y vuelve a presentarlo.

---

## 📝 FASE 3: Generación del Prompt de Actualización

**Solo proceder después de validación del usuario.**

### Paso 3.1: Generar Contenido del Prompt

**Acción del Agente**: Genera el contenido completo de `setup.documentation-update.prompt.md`:

````markdown
---
name: documentation-update
description: Actualización iterativa de documentación y prompts al stack tecnológico actual
---

# 📚 Documentation Update - Actualización de Documentación

Este prompt actualiza iterativamente la documentación y prompts del proyecto al stack tecnológico actual.

**Stack Actual**:
- Backend: {framework} + {orm} + {database}
- Frontend: {framework} + {build tool} + {estilos}
{- Mobile: {framework} + {navegación} (si aplica)}

---

## 🎯 Objetivo

Actualizar/agregar/eliminar archivos de documentación y prompts, eliminando toda referencia al stack anterior.

---

## 📋 Checklist de Actualización

### FASE 1: Documentación Core

{Para cada archivo a ACTUALIZAR en documentation/:}
- [ ] **{nombre-archivo.md}**
  - Motivo: {motivo}
  - Stack: {stack}

{Para cada archivo a AGREGAR en documentation/:}
- [ ] **{nombre-archivo.md}** *(nuevo)*
  - Contenido: {descripción}
  - Stack: {stack}

{Para cada archivo a ELIMINAR en documentation/:}
- [ ] **{nombre-archivo.md}** *(eliminar)*
  - Motivo: {motivo}

---

### FASE 2: READMEs

{Si README.md raíz necesita acción:}
- [ ] **README.md** *(raíz del proyecto)*
  - Acción: {AGREGAR / ACTUALIZAR}
  - Debe documentar: Proyecto orientado a IA, stack actual, componentes

{Para cada componente con README a agregar/actualizar:}
- [ ] **{componente}/README.md**
  - Acción: {AGREGAR / ACTUALIZAR}
  - Contenido: Documentación del componente {nombre}

---

### FASE 3: Prompts

{Para cada prompt a ACTUALIZAR:}
- [ ] **{nombre-prompt.prompt.md}**
  - Motivo: {motivo}
  - Stack: {stack}

{Para cada prompt a AGREGAR:}
- [ ] **{nombre-prompt.prompt.md}** *(nuevo)*
  - Contenido: {descripción}
  - Stack: {stack}

{Para cada prompt a ELIMINAR:}
- [ ] **{nombre-prompt.prompt.md}** *(eliminar)*
  - Motivo: {motivo}

---

## 🔄 Proceso Iterativo

Para cada item del checklist, sigue estos pasos:

### Paso A: Selección

> **¿Qué item quieres actualizar/agregar/eliminar?**
>
> Responde con el nombre del archivo (ej: `backend.md`, `create-backend-feature.prompt.md`, `README.md`)

**Espera respuesta del usuario**

---

### Paso B: Análisis (para ACTUALIZAR o AGREGAR)

**B.1. Leer Archivo Actual** (si existe):

```
Leer el archivo actual para entender su contenido
```

**B.2. Leer Ejemplos de Referencia**:

Leer la documentación de referencia`.github/documentation/examples/`.

**B.3. Analizar Stack y Arquitectura**:

```
- Leer: .github/instructions/architecture.instructions.md
- Leer: .github/instructions/tech-stack.instructions.md
```

**B.4. Analizar Proyecto Actual**:

Para documentación de Backend:
```
- Verificar estructura en backend/
- Leer archivos representativos del stack backend (por ejemplo: `.csproj`, `package.json`, `pom.xml`, `requirements.txt`, etc.)
- Verificar carpetas: features/, core/, etc.
```

Para documentación de Frontend:
```
- Verificar estructura en frontend/
- Leer package.json
- Verificar carpetas: features/, pages/, components/, core/
```

Para documentación de Mobile:
```
- Verificar estructura en app/
- Leer package.json
- Verificar carpetas: features/, screens/, components/, core/
```

**B.5. Consultar Context7** (si es necesario):

Si el archivo trata de una tecnología específica del stack actual (por ejemplo: ASP.NET Core, React, Tailwind, Prisma, React Native, etc.):

```
Herramienta: mcp_context7_resolve-library-id
Parámetros: { "libraryName": "{tecnología}" }

Luego:
Herramienta: mcp_context7_get-library-docs
Parámetros: { "context7CompatibleLibraryID": "{id}", "topic": "{tema relevante}" }
```

---

### Paso C: Preguntas de Aclaración

**⚠️ CRÍTICO: SIEMPRE debes preguntar al usuario ANTES de generar/actualizar cualquier archivo.**

**Este paso NO es opcional. Incluso si crees tener toda la información, presenta un resumen al usuario y espera confirmación.**

**Basándote en el análisis, pregunta al usuario**:

Ejemplos de preguntas según el tipo de archivo:

**Para backend.md**:
- ¿Qué puerto usa la API en desarrollo? (Si no está definido)
- ¿Hay documentación automática (Swagger)? ¿En qué URL?
- ¿Qué convenciones de nomenclatura específicas quieres documentar?

**Para frontend.md**:
- ¿Qué puerto usa el dev server? (Si no está definido)
- ¿Qué componentes UI específicos se usan? (Si no está claro)
- ¿Hay alguna convención de estilos adicional?

**Para prompts**:
- ¿Qué pasos específicos debe seguir el prompt?
- ¿Hay algún comando CLI personalizado del proyecto?
- ¿Alguna convención específica no documentada en instructions?

**Incluso si NO hay dudas, presenta un resumen**:

> 📋 **Resumen para actualizar `{nombre-archivo}`**:
>
> - Componente: {componente}
> - Stack: {stack detectado}
> - Acción: {ACTUALIZAR contenido desalineado / AGREGAR nuevo archivo}
> - Secciones principales: {lista de secciones}
>
> **¿Procedo con la generación?** Responde "OK" para continuar.

**DETENTE y espera confirmación del usuario antes de continuar.**

---

### Paso D: Generación/Actualización

**D.1. Para ACTUALIZAR**:

```
Estrategia optimizada (más rápido):

1. Leer el archivo actual completo para obtener contexto
2. Analizar estructura, secciones y contenido
3. Borrar el archivo actual
4. Generar un archivo NUEVO desde cero con:
   - Estructura similar al original
   - Secciones relevantes mantenidas
    - Todas las referencias desalineadas con el stack actual eliminadas o corregidas
    - Stack actual aplicado según `tech-stack.instructions.md`
    - Comandos CLI, rutas, extensiones y convenciones actualizados según el proyecto real
   - Comandos CLI actualizados

⚠️ IMPORTANTE: NO agregar ejemplos de código a menos que el usuario lo pida explícitamente.
La documentación debe ser ligera y dar contexto fácil al LLM, sin código que la haga pesada.
```

**D.2. Para AGREGAR**:

```
1. Usar los ejemplos de referencia (si existen) como guía de estructura
2. Seguir la estructura de otros archivos similares
3. Documentar basándose en:
   - Stack definido en tech-stack.instructions.md
   - Arquitectura definida en architecture.instructions.md
   - Proyecto generado (carpetas, archivos, package.json)
4. Incluir comandos CLI específicos del stack
5. Enfocarse en explicar conceptos, convenciones y estructura

⚠️ IMPORTANTE: NO agregar ejemplos de código a menos que el usuario lo pida explícitamente.
La documentación debe ser ligera y proporcionar contexto claro sin código que la sobrecargue.
```

**D.3. Para README.md Principal**:

```
Debe incluir:
- Título del proyecto
- Descripción: Proyecto orientado a desarrollo con IA (GitHub Copilot)
- Stack tecnológico actual
- Componentes del proyecto
- Estructura de carpetas
- Cómo iniciar el proyecto
- Referencia a documentación (.github/documentation/)
- Referencia a prompts (.github/prompts/)
```

**Acción del Agente**: Genera o actualiza el archivo correspondiente.

---

### Paso E: Eliminación (para ELIMINAR)

**Acción del Agente**: Elimina el archivo.

```powershell
Remove-Item .github/{documentation o prompts}/{nombre-archivo}
```

**Mensaje**:

> ✅ **{nombre-archivo} eliminado correctamente**

---

### Paso F: Actualizar Copilot Instructions

**Acción del Agente**: Actualiza `.github/copilot-instructions.md`:

**Si se AGREGÓ un archivo de documentación**:

1. Leer el archivo `.github/copilot-instructions.md`
2. Buscar la sección `## 📃 Documentación`
3. Agregar una entrada:
   ```
   - `{nombre-archivo.md}` - {Descripción breve de 1 línea}
   ```
4. Guardar el archivo

**Si se AGREGÓ un prompt**:

1. Leer el archivo `.github/copilot-instructions.md`
2. Buscar la sección `## 🎯 Prompts`
3. Agregar una entrada en la subsección correspondiente (Proyecto/Backend/Frontend):
   ```
   - `{nombre-prompt.prompt.md}` - {Descripción breve de 1 línea}
   ```
4. Guardar el archivo

**Si se ACTUALIZÓ un archivo**:

1. Verificar si la entrada existe en `copilot-instructions.md`
2. Si existe, actualizar la descripción si es necesario
3. Si NO existe, agregarla

**Si se ELIMINÓ un archivo**:

1. Leer el archivo `.github/copilot-instructions.md`
2. Buscar y eliminar la entrada correspondiente
3. Guardar el archivo

**Mensaje**:

> ✅ **`copilot-instructions.md` actualizado**

---

### Paso G: Confirmación

**Mensaje al usuario**:

> ✅ **{nombre-archivo} actualizado/agregado/eliminado correctamente**
>
> **Próximo paso**: Marca el item como completado en el checklist y selecciona el siguiente.
>
> **Items restantes**: {cantidad}
>
> ¿Qué item quieres trabajar ahora? (o "TERMINAR" si completaste todo)

**Volver al Paso A** hasta que el usuario responda "TERMINAR"

---

## ✅ FASE 4: Finalización

**Cuando el usuario responde "TERMINAR"**:

**Mensaje**:

```markdown
🎉 **¡Actualización de Documentación Completada!**

### 📊 Resumen:

**Archivos Actualizados**: {cantidad}
{Lista de archivos actualizados}

**Archivos Agregados**: {cantidad}
{Lista de archivos agregados}

**Archivos Eliminados**: {cantidad}
{Lista de archivos eliminados}

---

### ✅ Verificación Final

**Documenta que se actualizó**:
- ✅ Documentación core actualizada al stack {stack}
- ✅ READMEs creados/actualizados
- ✅ Prompts actualizados al stack {stack}
- ✅ `copilot-instructions.md` actualizado con todos los cambios

---

### 📖 El proyecto ahora cuenta con:

- Documentación técnica completa y actualizada
- Prompts optimizados para el stack actual
- README principal documentando orientación a IA
- Índice actualizado en `copilot-instructions.md`

---

**🎨 Ya puedes empezar a desarrollar con documentación actualizada.**

**Próximos pasos sugeridos**:
- Revisar `copilot-instructions.md` como menú de trabajo
- Usar los prompts para crear features
- Documentar features en Confluence (si aplica)
```

---

## 🔧 Manejo de Errores

### Error: Archivo No Existe

Si el usuario selecciona un archivo que no está en el checklist o no existe:

> ❌ **El archivo `{nombre}` no está en el checklist o no existe.**
>
> Selecciona uno de los items del checklist.

### Error: No Se Puede Actualizar Archivo

Si hay error al escribir el archivo:

> ❌ **No se pudo actualizar `{nombre-archivo}`**
>
> **Error**: {descripción del error}
>
> **Solución**: {posible solución}

### Error: Context7 No Responde

Si Context7 falla al consultar documentación:

> ⚠️ **No se pudo obtener documentación de {tecnología} desde Context7**
>
> Usando información conocida y estructura de proyecto. Si necesitas información específica, consulta la documentación oficial de {tecnología}.

---

## 📝 Notas Importantes

### Sobre Referencias Desactualizadas

- ⚠️ **ELIMINAR o corregir** toda mención que no coincida con el stack actual del proyecto
- ✅ **REEMPLAZAR** siempre usando `tech-stack.instructions.md`, `architecture.instructions.md` y el código real como fuente de verdad
- 📚 Los archivos en `.github/documentation/examples/` son SOLO referencia interna, nunca deben copiarse literalmente

### Sobre Ejemplos de Código

- ⚠️ **NO agregar ejemplos de código** a menos que el usuario lo solicite explícitamente
- ✅ La documentación debe ser **ligera y conceptual**, enfocada en dar contexto al LLM
- 📋 Priorizar: estructura, convenciones, comandos CLI, explicaciones claras
- ❌ Evitar: bloques de código extensos que hagan la documentación pesada

### Orden Sugerido de Actualización

Se recomienda seguir este orden:

1. **Documentación Core** primero (backend.md, frontend.md, database.md)
2. **READMEs** segundo (README.md principal, componentes)
3. **Prompts** tercero (usando la documentación actualizada como referencia)

### Iteración

- El proceso es **completamente iterativo**: un archivo a la vez
- El usuario controla el orden (puede seguir el sugerido o elegir libremente)
- Cada archivo se analiza, genera y documenta antes de continuar al siguiente
- **SIEMPRE preguntar antes de generar/actualizar**: presentar resumen y esperar confirmación

### Proceso Optimizado de Actualización

- Para archivos existentes: **leer → borrar → generar nuevo** (más rápido que actualizar partes)
- Mantener estructura y secciones relevantes del archivo original
- Aplicar todos los cambios de stack en la generación completa

---

**Versión**: Generado automáticamente por `documentation-plan.prompt.md`
**Fecha de generación**: {fecha}
**Stack**: {stack resumido}
````

### Paso 3.2: Guardar el Prompt Generado

**Acción del Agente**: Guarda el contenido en:

```
.github/prompts/setup.documentation-update.prompt.md
```

**Mensaje al usuario**:

> 📄 **Prompt de actualización generado exitosamente**
>
> **Archivo creado**: `.github/prompts/setup.documentation-update.prompt.md`
>
> Este prompt contiene:
> - ✅ Checklist completo de {total de items} items
>   - {cantidad} a actualizar
>   - {cantidad} a agregar
>   - {cantidad} a eliminar
> - ✅ Proceso iterativo: selección → análisis → preguntas → generación → actualización de índice
> - ✅ Integración con Context7 para documentación actualizada
> - ✅ Actualización automática de `copilot-instructions.md`
>
> ---
>
> ### 🚀 Próximo Paso:
>
> **Ejecuta el prompt generado para actualizar la documentación**:
>
> 1. Abre: `.github/prompts/setup.documentation-update.prompt.md`
> 2. Sigue el proceso iterativo
> 3. Selecciona item por item del checklist
> 4. El prompt te guiará en cada actualización

### Paso 3.3: Actualizar Copilot Instructions

**Acción del Agente**: Actualiza `.github/copilot-instructions.md` para documentar el nuevo prompt:

Si la sección de prompts no menciona `setup.documentation-plan.prompt.md` o `setup.documentation-update.prompt.md`, añadir las entradas:

En la sección de Prompts → Proyecto:

```markdown
- `setup.documentation-plan.prompt.md` - Generador de plan de actualización: analiza proyecto y genera `setup.documentation-update.prompt.md` con checklist de archivos a actualizar/agregar/eliminar
- `setup.documentation-update.prompt.md` - Actualización iterativa de documentación/prompts al stack actual (generado por documentation-plan)
```

**Mensaje al usuario**:

> ✅ **`copilot-instructions.md` actualizado**
>
> Los nuevos prompts han sido documentados en el índice.

---

## 🎉 FASE 4: Finalización

**Mensaje al usuario**:

```markdown
🎉 **¡Plan de actualización de documentación generado exitosamente!**

### 📋 Resumen del Plan:

**Archivo generado**: `.github/prompts/setup.documentation-update.prompt.md`

**Contenido del prompt**:
- 📝 **Documentación a actualizar**: {cantidad} archivo(s)
- ➕ **Documentación a agregar**: {cantidad} archivo(s)
- ❌ **Documentación a eliminar**: {cantidad} archivo(s)
- 📝 **Prompts a actualizar**: {cantidad} archivo(s)
- ➕ **Prompts a agregar**: {cantidad} archivo(s)
- ❌ **Prompts a eliminar**: {cantidad} archivo(s)
- 📄 **README.md**: {AGREGAR / ACTUALIZAR / OK}

**Total de items**: {total} archivo(s) a procesar

---

### 🔄 Proceso de Actualización:

El prompt `setup.documentation-update.prompt.md` te guiará en un proceso iterativo:

1. **Seleccionar** un item del checklist
2. **Analizar** el archivo/proyecto/stack
3. **Responder** preguntas de aclaración (si las hay)
4. **Generar/Actualizar** el archivo automáticamente
5. **Actualizar** `copilot-instructions.md`
6. **Repetir** hasta completar todos los items

---

### 🎯 Orden Recomendado:

1. **Documentación Core** (backend.md, frontend.md, database.md, etc.)
2. **READMEs** (README.md principal, componentes)
3. **Prompts** (usando la documentación actualizada como base)

---

### 🚀 Ejecuta el Prompt Ahora:

```
Abre: .github/prompts/setup.documentation-update.prompt.md
```

El prompt está listo para ejecutarse y actualizará toda tu documentación al stack actual.

---

**✅ `documentation-plan.prompt.md` completado**
```

---

## Checklist de Generación Completada

**Verifica**:

- [ ] Proyecto analizado correctamente
- [ ] Componentes identificados según architecture.instructions.md
- [ ] Stack detectado según tech-stack.instructions.md
- [ ] Archivos de documentación listados
- [ ] Archivos de prompts listados
- [ ] READMEs verificados
- [ ] Plan validado por el usuario
- [ ] `setup.documentation-update.prompt.md` generado con checklist completo
- [ ] Proceso iterativo documentado
- [ ] Integración con Context7 incluida
- [ ] Actualización de copilot-instructions.md incluida
- [ ] `copilot-instructions.md` actualizado con nuevos prompts
- [ ] Usuario notificado sobre próximo paso

---

**Versión**: 1.1.0  
**Última actualización**: Abril 2026
