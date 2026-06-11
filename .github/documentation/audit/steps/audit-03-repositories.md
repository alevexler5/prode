---
name: audit-03-repositories
description: Auditoría de Repositorios y Calidad de Código - Documenta URLs, estrategia de branching y estado de calidad del código
argument-hint: Proporciona contexto inicial sobre los repositorios del proyecto y tu percepción honesta sobre la calidad del código
---

# Auditoría: Repositorios y Calidad del Código

> 📋 **Objetivo**: Documentar URLs de repositorios, estrategia de branching, proceso de PRs y evaluación honesta del estado de la calidad del código.

> 💡 **Nota**: Sé honesto sobre el estado del código. El objetivo es identificar oportunidades de mejora, no juzgar.

---

## ❓ Preguntas Específicas

### 📦 Información de Repositorios

#### 1. **URLs de Repositorios**

- ¿Cuál es la URL del repositorio principal del proyecto?
- ¿Existen repositorios adicionales? (frontend separado, microservicios, etc.)
  - Si sí, listar URLs

| Repositorio | URL   | Descripción    |
| ----------- | ----- | -------------- |
| [Nombre]    | [URL] | [Qué contiene] |

#### 2. **Plataforma de Control de Versiones**

- ¿Qué plataforma se utiliza? (GitHub, GitLab, Bitbucket, Azure DevOps, otro)
- ¿Es repositorio público o privado?
- ¿Quiénes tienen acceso al repositorio? (todo el equipo, solo seniors, etc.)

#### 3. **Estrategia de Ramas (Branching Strategy)**

- ¿Qué estrategia de branching se utiliza?

  - **GitFlow**: Ramas `main`, `develop`, `feature/*`, `release/*`, `hotfix/*`
  - **GitHub Flow**: Solo `main` + feature branches
  - **Trunk-based Development**: Todo directo a `main` con feature flags
  - **Otra estrategia personalizada**

- ¿Cuáles son las ramas principales del proyecto? (ej: `main`, `master`, `develop`, `production`)

- ¿Cómo se crean las ramas para nuevas funcionalidades?
  - Convención de nombres (ej: `feature/ABC-123-descripcion`)
  - ¿Se crean desde `develop` o desde `main`?

#### 4. **Pull Requests / Merge Requests**

- ¿Se utilizan Pull Requests para integrar código?
- Si sí:
  - ¿Se requiere revisión de código (code review)?
  - ¿Cuántas aprobaciones se necesitan?
  - ¿Existen checks automáticos antes de mergear? (tests, linters, CI/CD)

#### 5. **Convenciones de Commits**

- ¿Existen convenciones para los mensajes de commit?
  - ¿Se usa Conventional Commits? (ej: `feat:`, `fix:`, `chore:`)
  - ¿Se referencian tickets/issues en los commits? (ej: `ABC-123: descripción`)
  - ¿O son commits libres sin convención?

---

### 🔍 Calidad del Código - Evaluación Reflexiva

> ⚠️ **IMPORTANTE**: Esta sección busca una evaluación **honesta y reflexiva** del estado del código basada en tu experiencia trabajando en el proyecto. No es una auditoría técnica automática, sino una oportunidad para identificar áreas de mejora desde la perspectiva del equipo.

#### 6. **Estado General del Código**

En una escala del 1 al 5, ¿cómo calificarías el estado general del código?

- **1**: Código legacy muy problemático, difícil de mantener
- **2**: Código con muchos problemas, requiere refactoring importante
- **3**: Código funcional pero con deuda técnica moderada
- **4**: Código bien estructurado con algunas áreas mejorables
- **5**: Código limpio, bien documentado, fácil de mantener

**Calificación**: [ /5]

**Justificación**: [Explica brevemente por qué esta calificación]

---

#### 7. **Estructura y Organización del Código**

- ¿El código está bien organizado en carpetas/módulos?
- ¿Es fácil ubicar dónde implementar una nueva funcionalidad?
- ¿Existen patrones de diseño o arquitectura definidos? (MVC, Clean Architecture, Vertical Slices, etc.)
- ¿O el código está desorganizado, con archivos muy grandes o difíciles de navegar?

**Describe el estado actual**:

---

#### 8. **Legibilidad y Mantenibilidad**

- ¿El código es fácil de leer y entender?
- ¿Los nombres de variables, funciones y clases son descriptivos?
- ¿O hay mucho código "mágico", difícil de interpretar?
- ¿Existen funciones o archivos extremadamente largos? (más de 300-500 líneas)

**Ejemplos de problemas identificados** (si aplica):

---

#### 9. **Código Espagueti o Legacy**

- ¿Existen secciones del código que son particularmente problemáticas?

  - Código "espagueti" (muy acoplado, difícil de seguir)
  - Código legacy que nadie quiere tocar
  - Funcionalidades que "nadie sabe cómo funcionan exactamente"

- Si sí, ¿en qué módulos o archivos específicos?

**Áreas problemáticas identificadas**:

---

#### 10. **Deuda Técnica y Puntos de Mejora**

- ¿Qué aspectos del código consideras que necesitan mejora urgente?
  - Refactorización de módulos específicos
  - Eliminar código duplicado
  - Mejorar nombres de variables/funciones
  - Separar responsabilidades
  - Documentar código complejo

**Lista de puntos de mejora identificados**:

1.
2.
3.
4.
5.

---

#### 11. **Problemas Recurrentes y Bugs**

- ¿Existen funcionalidades que presentan bugs recurrentemente?
- ¿Hay secciones del código que requieren muchas iteraciones para implementar cambios?
- ¿Cuáles son las áreas más frágiles del proyecto?

**Describe los problemas más frecuentes**:

---

#### 12. **Testing y Cobertura**

- ¿Existen tests en el proyecto?

  - **Sí, tests completos** (unitarios, integración, e2e)
  - **Sí, algunos tests** (cobertura parcial)
  - **No, no hay tests**

- Si existen tests:
  - ¿Qué porcentaje aproximado de cobertura tienen? (estimación)
  - ¿Los tests son confiables o a veces fallan sin razón?
  - ¿Se escriben tests para nuevas funcionalidades?

**Estado de testing**:

---

#### 13. **Linters, Formatters y Herramientas de Calidad**

- ¿Se utilizan herramientas para mantener calidad del código?

  - **Linters** (ESLint, Pylint, RuboCop, etc.)
  - **Formatters** (Prettier, Black, etc.)
  - **Analizadores estáticos** (SonarQube, CodeClimate, etc.)

- Si sí, ¿están configurados y se usan consistentemente?
- ¿O están configurados pero nadie los ejecuta realmente?

**Herramientas utilizadas**:

---

#### 14. **Documentación del Código**

- ¿El código tiene comentarios útiles donde es necesario?
- ¿Existen funciones complejas que necesitan documentación pero no la tienen?
- ¿Hay un README actualizado con información de cómo configurar y ejecutar el proyecto?
- ¿Existe documentación técnica adicional? (wiki, Confluence, etc.)

**Estado de la documentación**:

---

#### 15. **Experiencia del Equipo con el Código**

- ¿Qué tan cómodo se siente el equipo trabajando con el código actual?
- ¿Hay miembros del equipo que evitan tocar ciertas partes del código por miedo a romper algo?
- ¿Se pueden hacer cambios con confianza o siempre hay temor de efectos secundarios?

**Describe la experiencia del equipo**:

---

#### 16. **Oportunidades de Mejora Rápida (Quick Wins)**

- ¿Identificas mejoras que podrían hacerse en poco tiempo (1-2 días) y tendrían alto impacto?
  - Agregar un README decente
  - Configurar un formatter
  - Refactorizar un módulo específico problemático
  - Agregar tests a funcionalidades críticas
  - Documentar funciones complejas

**Lista de quick wins identificados**:

---

## 🔄 Proceso de Iteración y Validación

**IMPORTANTE**: Antes de generar el documento final, sigue este proceso de manera pausada y reflexiva:

### Fase 0: Contexto Inicial

1. Recibir y analizar el contexto inicial proporcionado por el usuario
2. Identificar las áreas problemáticas mencionadas inicialmente
3. Preparar preguntas de seguimiento según el contexto

### Fase 1: Recolección

4. Recopilar respuestas a las preguntas específicas (1-16)
5. Si hay acceso al repositorio, hacer observaciones complementarias
6. Identificar gaps o información que necesita clarificación

### Fase 2: Validación

7. Presentar un resumen de hallazgos al usuario
8. Destacar aspectos importantes identificados:
   - URLs y estrategia de branching clara
   - Estado de calidad del código según evaluación
   - Áreas problemáticas identificadas
   - Oportunidades de mejora rápidas
9. Solicitar validación o información adicional si es necesario

### Fase 3: Refinamiento

10. Iterar con el usuario para completar información faltante
11. Profundizar en áreas problemáticas específicas si es necesario
12. Validar que las oportunidades de mejora sean realistas y priorizables

### Fase 4: Resumen Pre-Generación

13. Generar un resumen ejecutivo de la información recopilada:
    - Información completa de repositorios
    - Estado general de calidad del código (calificación)
    - Principales problemas identificados
    - Oportunidades de mejora priorizadas
14. Listar los puntos principales a documentar
15. Solicitar confirmación final antes de generar documento

### Fase 5: Generación

16. Generar el documento final en formato markdown (las líneas necesarias)
17. Asegurar que toda la información recopilada esté incluida
18. Mantener concisión y claridad
19. **NO incluir análisis de riesgos o recomendaciones finales** - solo documentar información factual y percepciones del equipo

---

## 📄 Output Esperado

Una vez completado el proceso de iteración, genera un documento markdown con la siguiente estructura:

```markdown
# Repositorios y Calidad del Código

## Resumen Ejecutivo

[Resumen breve sobre los repositorios y el estado general de calidad del código]

## 📦 Repositorios

### Información General

| Repositorio | URL   | Descripción   | Plataforma          |
| ----------- | ----- | ------------- | ------------------- |
| [Nombre]    | [URL] | [Descripción] | [GitHub/GitLab/etc] |

**Acceso**: [Quiénes tienen acceso]

### Estrategia de Branching

**Estrategia utilizada**: [GitFlow/GitHub Flow/Trunk-based/Otra]

**Ramas principales**:

- [Rama 1]: [Propósito]
- [Rama 2]: [Propósito]

**Convención de feature branches**: [Descripción]

**Pull Requests**:

- ¿Se utilizan?: [Sí/No]
- ¿Code review obligatorio?: [Sí/No]
- Aprobaciones requeridas: [N]
- Checks automáticos: [Descripción]

**Convenciones de Commits**: [Descripción]

---

## 🔍 Calidad del Código

### Estado General

**Calificación**: [X/5]

**Justificación**: [Explicación]

### Estructura y Organización

[Descripción del estado de la organización del código]

**Patrones/Arquitectura**: [Descripción]

### Legibilidad y Mantenibilidad

[Evaluación de legibilidad]

**Problemas identificados**: [Lista]

### Áreas Problemáticas

**Código Legacy/Espagueti identificado**:

- [Área 1]: [Descripción del problema]
- [Área 2]: [Descripción del problema]

### Deuda Técnica Identificada

1. [Punto 1]
2. [Punto 2]
3. [Punto 3]

### Problemas Recurrentes

[Descripción de bugs/problemas frecuentes y áreas frágiles]

### Testing

**Estado**: [Tests completos/parciales/inexistentes]

**Cobertura estimada**: [X%]

**Observaciones**: [Descripción adicional]

### Herramientas de Calidad de Código

| Herramienta | Tipo                        | Estado de Uso                                                  |
| ----------- | --------------------------- | -------------------------------------------------------------- |
| [Nombre]    | [Linter/Formatter/Analyzer] | [Configurado y usado/Configurado pero no usado/No configurado] |

### Documentación

**Estado de documentación del código**: [Descripción]

**README**: [Existe y está actualizado/Existe pero desactualizado/No existe]

**Documentación técnica adicional**: [Descripción]

### Experiencia del Equipo

[Descripción de cómo el equipo experimenta trabajar con el código actual]

### Oportunidades de Mejora Rápida (Quick Wins)

1. [Quick win 1] - Impacto: [Alto/Medio/Bajo] - Esfuerzo: [1-2 días]
2. [Quick win 2] - Impacto: [Alto/Medio/Bajo] - Esfuerzo: [1-2 días]
3. [Quick win 3] - Impacto: [Alto/Medio/Bajo] - Esfuerzo: [1-2 días]

---

## 📝 Notas Adicionales

[Cualquier observación adicional relevante sobre repositorios o calidad del código]
```

> 📝 **Nota**: Este documento se integrará posteriormente con las demás secciones de la auditoría.

---

## 📌 Recordatorios

- ✅ **Fomentar honestidad** en la evaluación de calidad del código
- ✅ La evaluación de calidad es **subjetiva y reflexiva**, no técnica/automática
- ✅ Identificar áreas problemáticas es positivo - permite mejorar
- ✅ **ENFOCARSE en documentar** repositorios y percepción de calidad
