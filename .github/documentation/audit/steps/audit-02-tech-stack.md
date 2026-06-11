# Auditoría: Stack Tecnológico

> 📋 **Objetivo**: Documentar todas las tecnologías utilizadas en el proyecto, organizadas por capas, con versiones exactas y estado de soporte.

---

## 📚 Archivos de Dependencias Recomendados

Para facilitar el análisis automático de versiones, proporciona:

- `package.json` y `package-lock.json` (Node.js/JavaScript)
- `requirements.txt` o `Pipfile` (Python)
- `.csproj` o `packages.config` (.NET)
- `pom.xml` o `build.gradle` (Java/Kotlin)
- `Gemfile` (Ruby), `composer.json` (PHP), `go.mod` (Go)
- Archivos de configuración (`Dockerfile`, `docker-compose.yml`, etc.)

---

## ❓ Preguntas Específicas

El objetivo es completar la siguiente tabla de **Stack Tecnológico**:

| Capa | Tecnología | Versión | Estado de Soporte |
| ---- | ---------- | ------- | ----------------- |
| ...  | ...        | ...     | ...               |

### Definición de Columnas:

- **Capa**: Agrupación lógica de la tecnología (Backend, Frontend, Base de Datos, Infraestructura, Mobile, etc.)
- **Tecnología**: Nombre del lenguaje, framework, librería o herramienta
- **Versión**: Versión específica utilizada en el proyecto
- **Estado de Soporte**: [Activo/LTS/EOL] - Indicar si la versión tiene soporte activo, está en LTS o ya llegó a End of Life

---

### 📋 Preguntas para Documentar el Stack

#### 1. **Backend**

- ¿Qué lenguaje de programación se utiliza y en qué versión? (ej: C# 10, Node.js 18, Python 3.11)
- ¿Qué framework principal se utiliza y en qué versión? (ej: .NET 6, Express 4.18, Django 4.2)
- ¿Qué ORM o herramienta de acceso a datos se usa? (ej: Entity Framework Core 6, Sequelize, Dapper)
- ¿Hay otras librerías críticas del backend que debamos documentar? (autenticación, logging, validación, etc.)

#### 2. **Frontend**

- ¿Qué framework o librería se utiliza y en qué versión? (ej: React 18, Angular 15, Vue 3)
- ¿Qué herramienta de build/bundler se usa? (ej: Create React App, Vite, Webpack, Next.js)
- ¿Qué librería de componentes UI se utiliza? (ej: Material-UI 5, Ant Design, Bootstrap, Tailwind CSS)
- ¿Hay otras librerías críticas del frontend? (manejo de estado, routing, peticiones HTTP, etc.)

#### 3. **Base de Datos**

- ¿Qué sistema de base de datos se utiliza y en qué versión? (ej: MySQL 8.0, PostgreSQL 14, SQL Server 2019, MongoDB 6)
- ¿Se usa alguna herramienta adicional relacionada con BD? (migraciones, seeds, etc.)

#### 4. **Infraestructura/DevOps**

- ¿Se utiliza Docker u otra tecnología de contenedores? ¿Qué versión?
- ¿Qué servidor web se utiliza? (ej: Nginx 1.24, Apache, IIS 10)
- ¿Se usa algún balanceador de carga o proxy reverso?
- ¿Hay herramientas de CI/CD configuradas? (ej: GitHub Actions, GitLab CI, Jenkins, Azure DevOps)
- ¿Se usa Infrastructure as Code? (ej: Terraform, CloudFormation, Ansible)

#### 5. **Mobile** (si aplica)

- ¿Existe aplicación mobile?
- Si sí, ¿qué tecnología se utiliza? (ej: React Native, Flutter, Swift/iOS nativo, Kotlin/Android nativo)
- ¿Qué versión del SDK o framework?

#### 6. **Otras Tecnologías Relevantes**

- ¿Hay otras tecnologías críticas que no encajen en las categorías anteriores?
- Ejemplos: message brokers (RabbitMQ, Kafka), sistemas de caché (Redis), APIs de terceros críticas, etc.

---

## 🔍 Verificación de Estado de Soporte

Para cada tecnología documentada, verificar el estado de soporte:

- **Activo**: Versión con soporte activo y actualizaciones regulares
- **LTS (Long Term Support)**: Versión con soporte extendido pero sin features nuevas
- **EOL (End of Life)**: Versión sin soporte, requiere actualización

**Herramientas recomendadas**:

- Consultar [endoflife.date](https://endoflife.date/) para verificar estado oficial
- Usar `#tool:context7/*` para documentación actualizada de frameworks/librerías en caso de que sea necesario
- Documentar links de verificación para transparencia

---

## 📄 Formato de Output Esperado

Generar documento con:

1. **Tabla completa** de Stack Tecnológico (Capa | Tecnología | Versión | Estado de Soporte)
2. **Resumen por Estado de Soporte** (Activo/LTS/EOL con conteos)
3. **Notas Adicionales** (observaciones relevantes sobre el stack)

> ⚠️ **NO incluir**: Análisis de riesgos, recomendaciones, planes de migración. Solo información factual.

## 📚 Enlaces de Verificación

- [Link 1 a documentación oficial]
- [Link 2 a endoflife.date]
- [Otros enlaces relevantes]

> 📝 **Nota**: Este documento se integrará posteriormente con las demás secciones de la auditoría.

---

## 📌 Recordatorios

- ✅ Si hay archivos de dependencias, hacer análisis automático para complementar
- ✅ Validar estado de soporte con fuentes oficiales cuando sea posible
- ✅ Identificar y marcar supuestos cuando no haya información confirmada
- ✅ **ENFOCARSE SOLO en documentar el stack tecnológico** (qué se usa, versiones, estado)
