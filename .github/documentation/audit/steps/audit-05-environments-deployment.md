# Auditoría: Entornos y Proceso de Despliegue

> 📋 **Objetivo**: Documentar entornos disponibles, proceso completo de setup de desarrollo local y proceso de despliegue a producción. Si no hay documentación existente, se construirá de manera colaborativa.

---

## ❓ Preguntas Específicas

### 🌍 Entornos Disponibles

#### 1. **¿Qué entornos tiene el proyecto?**

Identifica todos los entornos disponibles:

| Entorno               | Propósito                               | URL (si aplica) | Quién tiene acceso   |
| --------------------- | --------------------------------------- | --------------- | -------------------- |
| Desarrollo Local      | Desarrollo en máquina del desarrollador | localhost       | Todos los developers |
| [Dev/Development]     | [Propósito]                             | [URL]           | [Quién]              |
| [Staging/QA/Pre-prod] | [Propósito]                             | [URL]           | [Quién]              |
| [Producción]          | [Propósito]                             | [URL]           | [Quién]              |

**Observaciones adicionales**:

---

#### 2. **¿Existe Documentación de Setup/Deployment?**

- ¿Tienes documentación sobre cómo configurar el entorno de desarrollo o hacer deployments?
  - **Sí, documentación completa y actualizada** → Proporciona archivos/links
  - **Sí, pero está desactualizada o incompleta** → Proporciona lo que tengas
  - **No, no hay documentación formal** → Documentaremos paso a paso juntos
  - **Hay documentación informal** (notas, mensajes de Slack/Teams, etc.) → Comparte lo que tengas

**Estado de documentación**: [Respuesta]

---

### 💻 Setup de Desarrollo Local

> **Objetivo**: Documentar cómo un desarrollador nuevo configura su entorno para trabajar en el proyecto.

#### 3. **Prerrequisitos del Sistema**

¿Qué necesita tener instalado un desarrollador en su máquina antes de empezar?

- **Sistema Operativo recomendado**: [Windows/Linux/macOS/Cualquiera]
- **Herramientas requeridas**:
  - [ ] Git
  - [ ] [Lenguaje/Runtime] (ej: Node.js 18, Python 3.11, .NET 6)
  - [ ] [Base de datos local] (ej: MySQL, PostgreSQL, SQL Server)
  - [ ] Docker (¿obligatorio u opcional?)
  - [ ] IDE/Editor recomendado (ej: VS Code, Visual Studio, PyCharm)
  - [ ] Otras herramientas

**Lista completa de prerrequisitos**:

---

#### 4. **Paso a Paso: Configuración del Entorno de Desarrollo**

> Si ya tienes documentación, proporciona el link/archivo. Si no, responderemos esto juntos paso a paso.

Describe el proceso completo para que un desarrollador nuevo pueda trabajar en el proyecto:

**Paso 1: Clonar Repositorio(s)**

- ¿Qué repositorio(s) debe clonar?
- ¿Hay dependencias entre repositorios?

**Paso 2: Instalar Dependencias**

- ¿Qué comandos debe ejecutar? (ej: `npm install`, `pip install -r requirements.txt`, `dotnet restore`)
- ¿Hay dependencias específicas o problemas comunes?

**Paso 3: Configurar Base de Datos Local**

- ¿Debe instalar una BD local o usar Docker?
- ¿Hay scripts de inicialización? (`seed.sql`, migraciones)
- ¿Cómo se ejecutan las migraciones?

**Paso 4: Configurar Variables de Entorno**

- ¿Hay un archivo `.env.example` u similar?
- ¿Qué variables debe configurar? (sin exponer credenciales - solo nombres)
- ¿Dónde obtiene las credenciales? (¿solicitar a alguien? ¿están en gestor de secrets?)

**Paso 5: Ejecutar el Proyecto Localmente**

- ¿Qué comando(s) ejecuta para levantar el proyecto? (ej: `npm start`, `dotnet run`, `docker-compose up`)
- ¿Se levanta todo junto o hay que iniciar componentes por separado?
- ¿Cómo sabe que está funcionando correctamente?

**Paso 6: Verificación del Setup**

- ¿Cómo puede verificar que todo está correcto?
- ¿Hay una página de health check o similar?
- ¿Hay tests que pueda ejecutar para validar?

**Paso 7: Problemas Comunes y Soluciones**

- ¿Cuáles son los problemas más comunes que enfrentan los developers nuevos?
- ¿Cómo se resuelven?

---

#### 5. **Tiempo Estimado de Setup**

- ¿Cuánto tiempo le toma a un desarrollador nuevo configurar su entorno desde cero?
  - Menos de 1 hora
  - 1-3 horas
  - Medio día
  - Día completo
  - Más de un día

**Tiempo estimado**: [Respuesta]

**Factores que lo afectan**: [Ej: velocidad de internet, experiencia del dev, problemas con dependencias]

---

### 🚀 Proceso de Despliegue a Producción

> **Objetivo**: Documentar cómo se despliega una nueva versión a producción.

#### 6. **Tipo de Despliegue**

¿Cómo se despliega actualmente el proyecto a producción?

- [ ] **Completamente manual** - Alguien ejecuta comandos/scripts manualmente
- [ ] **Parcialmente automatizado** - Hay CI/CD pero requiere pasos manuales
- [ ] **Completamente automatizado** - CI/CD despliega automáticamente tras merge/tag
- [ ] **Despliegue continuo (CD)** - Cada commit a main/master despliega automáticamente

**Tipo de despliegue**: [Respuesta]

---

#### 7. **Herramientas de CI/CD**

¿Se utiliza alguna herramienta de CI/CD?

- [ ] GitHub Actions
- [ ] GitLab CI/CD
- [ ] Jenkins
- [ ] Azure DevOps
- [ ] CircleCI
- [ ] Travis CI
- [ ] Otra: [Especificar]
- [ ] No se utiliza CI/CD

Si se usa CI/CD:

- ¿Dónde está la configuración? (archivo y ubicación)
- ¿Qué stages tiene el pipeline? (build, test, deploy, etc.)
- ¿Qué triggers tiene? (push, merge, tag, manual)

---

#### 8. **Quién Puede Hacer Deploy a Producción**

- ¿Quién tiene permisos para desplegar a producción?

  - Todo el equipo
  - Solo Tech Lead / Senior
  - Solo DevOps / Infra
  - Requiere aprobación múltiple

- ¿Cómo se solicita/autoriza un deploy?

**Permisos actuales**: [Respuesta]

---

#### 9. **Frecuencia de Deployments**

- ¿Con qué frecuencia se despliega a producción?
  - Múltiples veces al día
  - Diariamente
  - Semanalmente
  - Quincenalmente
  - Mensualmente
  - Ad-hoc / cuando se necesita

**Frecuencia actual**: [Respuesta]

---

#### 10. **Paso a Paso: Proceso de Despliegue a Producción**

> Si ya tienes documentación, proporciona el link/archivo. Si no, responderemos esto juntos paso a paso.

**Para Despliegue Manual:**

Describe el proceso completo:

1. **Pre-deploy**:

   - ¿Qué verificaciones se hacen antes de desplegar? (tests, code review, approval)
   - ¿Se crea un tag/release en Git?
   - ¿Se notifica al equipo?

2. **Build**:

   - ¿Cómo se genera el build? (comandos, donde se ejecuta)
   - ¿Dónde se almacenan los artefactos?

3. **Deploy**:

   - ¿Qué comandos/scripts se ejecutan para desplegar?
   - ¿Se hace conexión SSH al servidor?
   - ¿Se sube código vía FTP/SFTP?
   - ¿Se ejecuta un script de deployment?

4. **Configuración**:

   - ¿Hay que configurar variables de entorno en producción?
   - ¿Hay que ejecutar migraciones de BD?
   - ¿Hay que reiniciar servicios?

5. **Verificación Post-Deploy**:

   - ¿Cómo se verifica que el deploy fue exitoso?
   - ¿Hay smoke tests o health checks?
   - ¿Se monitorea algo específico?

6. **Comunicación**:
   - ¿Se notifica al equipo/cliente que se desplegó?

---

**Para Despliegue Automatizado (CI/CD):**

Describe el flujo:

1. **Trigger**:

   - ¿Qué dispara el deployment? (merge a main, crear tag, botón manual)

2. **Pipeline**:

   - ¿Qué stages ejecuta el pipeline?
   - ¿Hay gates de aprobación manual?

3. **Verificaciones Automáticas**:

   - ¿Qué tests se ejecutan?
   - ¿Hay análisis de código?

4. **Deploy Automático**:

   - ¿Cómo despliega? (kubectl, scripts, APIs de cloud provider)
   - ¿Despliega de manera gradual (blue-green, canary)?

5. **Post-Deploy**:
   - ¿Hay verificaciones automáticas post-deploy?
   - ¿Rollback automático si falla?

---

#### 11. **Versionado**

- ¿Cómo se versionan los releases?
  - Semantic Versioning (1.2.3)
  - Fecha (2024-12-19)
  - Git tags
  - Otro sistema
  - No se versiona

**Sistema de versionado**: [Respuesta]

---

#### 12. **Downtime Durante Deploy**

- ¿El deploy a producción causa downtime?

  - Sí, siempre (¿cuánto tiempo?)
  - A veces (¿cuándo?)
  - No, es zero-downtime

- Si hay downtime:
  - ¿Se programa en horarios específicos?
  - ¿Se notifica a los usuarios?

**Estado de downtime**: [Respuesta]

---

#### 13. **Proceso de Rollback**

- ¿Existe un proceso de rollback si algo falla?

  - Sí, documentado y probado
  - Sí, existe pero nunca se ha usado
  - No hay proceso formal
  - Rollback es muy complicado/imposible

- Si existe:
  - ¿Cómo se hace el rollback?
  - ¿Cuánto tiempo toma?
  - ¿Se ha usado alguna vez?

**Proceso de rollback**: [Respuesta]

---

#### 14. **Configuración de Entornos**

- ¿Cómo se gestionan las diferencias de configuración entre entornos?

  - Archivos `.env` diferentes por entorno
  - Variables de entorno en servidor/cloud
  - Archivos de configuración (appsettings.json, config.py, etc.)
  - Secrets manager (AWS Secrets Manager, Azure Key Vault, etc.)
  - Hardcodeado en el código (⚠️ mala práctica)

- ¿Dónde se documentan las variables necesarias por entorno?

**Gestión de configuración**: [Respuesta]

> ⚠️ **Nota**: No expongas credenciales aquí. Solo indica cómo se gestionan. Los detalles de seguridad se documentarán en el Prompt 6.

---

#### 15. **Pruebas Pre-Deployment**

- ¿Qué pruebas se ejecutan antes de desplegar a producción?
  - [ ] Tests unitarios
  - [ ] Tests de integración
  - [ ] Tests E2E
  - [ ] Pruebas manuales en staging
  - [ ] Code review obligatorio
  - [ ] Aprobación de QA
  - [ ] Aprobación de cliente/stakeholder
  - [ ] No hay pruebas formales

**Pruebas actuales**: [Lista]

---

#### 16. **Problemas Comunes en Deployments**

- ¿Cuáles son los problemas más frecuentes durante deployments?
- ¿Cómo se resuelven?
- ¿Hay deployments que típicamente fallan o requieren múltiples intentos?

**Problemas identificados**: [Descripción]

---

### 🔄 Construcción Iterativa de Documentación (Si no existe)

> Esta sección solo se ejecuta si **NO** existe documentación previa de setup o deployment.

Si no tienes documentación, trabajaremos juntos para construirla:

#### Paso 1: Exploración de Archivos

Exploraremos:

- Scripts de deployment existentes
- Archivos de CI/CD
- READMEs o comentarios en el código
- Configuraciones de Docker

#### Paso 2: Preguntas Específicas

Te haré preguntas específicas sobre cada paso del proceso para documentarlo correctamente.

#### Paso 3: Validación Práctica

Si es posible, simularemos el proceso paso a paso para validar que la documentación es correcta.

#### Paso 4: Documentación Final

Generaremos una documentación completa y clara que cualquier desarrollador pueda seguir.

---

## 🔄 Proceso de Iteración y Validación

**IMPORTANTE**: Antes de generar el documento final, sigue este proceso de manera pausada y reflexiva:

### Fase 0: Contexto Inicial

1. Recibir y analizar el contexto inicial proporcionado por el usuario
2. Identificar si existe documentación previa o no
3. Determinar el enfoque: validación de documentación existente vs construcción paso a paso

### Fase 1: Recolección

4. Recopilar respuestas a las preguntas específicas (1-16)
5. Si hay documentación, analizarla y verificar completitud
6. Si NO hay documentación, explorar repositorio y archivos de configuración
7. Hacer preguntas de seguimiento según sea necesario
8. Identificar gaps o información que necesita clarificación

### Fase 2: Validación

9. Presentar un resumen de hallazgos al usuario
10. Si se construyó documentación nueva, presentar borrador para validación
11. Destacar aspectos importantes:
    - Entornos disponibles claramente identificados
    - Setup de desarrollo documentado paso a paso
    - Proceso de deployment claro (manual/automatizado)
    - Proceso de rollback definido
    - Problemas comunes y soluciones documentados
12. Solicitar validación o información adicional si es necesario

### Fase 3: Refinamiento

13. Iterar con el usuario para completar información faltante
14. Si se está construyendo documentación nueva, refinar según feedback
15. Validar que todos los pasos sean claros y ejecutables
16. Confirmar tiempos estimados y problemas comunes

### Fase 4: Resumen Pre-Generación

17. Generar un resumen ejecutivo de la información recopilada:
    - Entornos disponibles documentados
    - Setup de desarrollo completo
    - Proceso de deployment claro y actualizado
    - Gestión de configuración definida
18. Listar los puntos principales a documentar
19. Solicitar confirmación final antes de generar documento

### Fase 5: Generación

20. Generar el documento final en formato markdown (las líneas necesarias)
21. Incluir paso a paso detallado para setup y deployment
22. Asegurar que toda la información recopilada esté incluida
23. Mantener concisión y claridad
24. **NO incluir credenciales o secrets específicos** - solo mencionar que se necesitan
25. **NO incluir análisis de riesgos o recomendaciones finales** - eso va en el Prompt 8

---

## 📄 Output Esperado

Una vez completado el proceso de iteración, genera un documento markdown con la siguiente estructura:

````markdown
# Entornos y Proceso de Despliegue

## Resumen Ejecutivo

[Resumen breve sobre los entornos disponibles, proceso de setup y deployment]

## 🌍 Entornos Disponibles

| Entorno            | Propósito   | URL       | Acceso  |
| ------------------ | ----------- | --------- | ------- |
| [Desarrollo Local] | [Propósito] | localhost | [Quién] |
| [Dev/Staging]      | [Propósito] | [URL]     | [Quién] |
| [Producción]       | [Propósito] | [URL]     | [Quién] |

---

## 💻 Setup de Desarrollo Local

### Prerrequisitos

**Sistema Operativo**: [Recomendado]

**Herramientas Requeridas**:

- [Herramienta 1] - [Versión]
- [Herramienta 2] - [Versión]
- ...

### Paso a Paso: Configuración del Entorno

#### 1. Clonar Repositorio(s)

```bash
[Comandos para clonar]
```
````

#### 2. Instalar Dependencias

```bash
[Comandos de instalación]
```

#### 3. Configurar Base de Datos Local

[Descripción del proceso]

```bash
[Comandos de configuración de BD]
```

#### 4. Configurar Variables de Entorno

[Descripción - sin exponer credenciales]

- Copiar archivo de ejemplo: `cp .env.example .env`
- Solicitar credenciales a: [Persona/Canal]
- Variables requeridas: [Lista de nombres de variables]

#### 5. Ejecutar el Proyecto

```bash
[Comando para levantar el proyecto]
```

**Verificación**: [Cómo verificar que funciona]

#### 6. Problemas Comunes

| Problema     | Solución   |
| ------------ | ---------- |
| [Problema 1] | [Solución] |
| [Problema 2] | [Solución] |

### Tiempo Estimado de Setup

**Tiempo**: [X horas]

**Factores**: [Descripción]

---

## 🚀 Proceso de Despliegue a Producción

### Tipo de Despliegue

**Tipo**: [Manual/Parcialmente automatizado/Completamente automatizado]

**Descripción**: [Breve descripción del proceso]

### Herramientas de CI/CD

**Herramienta**: [Nombre]

**Configuración**: [Ubicación del archivo]

**Pipeline Stages**:

1. [Stage 1]
2. [Stage 2]
3. [Stage 3]

### Permisos de Deployment

**Quién puede desplegar**: [Descripción]

**Proceso de autorización**: [Descripción]

### Frecuencia de Deployments

**Frecuencia actual**: [Descripción]

### Paso a Paso: Deployment a Producción

#### Pre-Deploy

1. [Paso 1]
2. [Paso 2]

#### Build

[Descripción del proceso de build]

#### Deploy

[Descripción paso a paso del deployment]

```bash
[Comandos relevantes si es manual]
```

#### Verificación Post-Deploy

[Cómo verificar que el deploy fue exitoso]

#### Comunicación

[Cómo se notifica al equipo/cliente]

### Versionado

**Sistema**: [Descripción del sistema de versionado]

### Downtime

**¿Hay downtime?**: [Sí/No - Descripción]

### Proceso de Rollback

**¿Existe proceso?**: [Sí/No]

**Descripción del rollback** (si existe):

[Paso a paso para hacer rollback]

### Configuración de Entornos

**Gestión de configuración**: [Descripción de cómo se manejan las configs por entorno]

**Ubicación de variables**: [Dónde están definidas]

> ⚠️ **Nota**: Ver sección de Seguridad para detalles sobre gestión de credenciales.

### Pruebas Pre-Deployment

**Pruebas ejecutadas**:

- [Tipo 1]
- [Tipo 2]
- [Tipo 3]

### Problemas Comunes en Deployments

| Problema     | Frecuencia        | Solución   |
| ------------ | ----------------- | ---------- |
| [Problema 1] | [Alta/Media/Baja] | [Solución] |
| [Problema 2] | [Alta/Media/Baja] | [Solución] |

---

## 📝 Notas Adicionales

[Cualquier observación adicional relevante sobre entornos, setup o deployment]

---

## 📚 Documentación de Referencia

- [Link a documentación existente de setup]
- [Link a documentación de deployment]
- [Scripts relevantes en el repositorio]
- [Otros recursos]

> 📝 **Nota**: Este documento se integrará posteriormente con las demás secciones de la auditoría.

---

## 📌 Recordatorios

- ✅ **Adaptarse al contexto**: Si hay documentación, validarla; si no, construir paso a paso
- ✅ Hacer preguntas específicas y claras para obtener todos los pasos
- ✅ **NO exponer credenciales o secrets** - solo mencionar que se necesitan
- ✅ Incluir comandos específicos cuando sea posible
- ✅ Documentar problemas comunes y soluciones
- ✅ **ENFOCARSE en documentar** procesos de setup y deployment
