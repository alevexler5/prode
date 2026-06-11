---
name: branding-setup
description: Configuración de colores y branding del proyecto (opcional)
argument-hint: Personaliza la paleta de colores del frontend según tu branding corporativo
---

# 🎨 Branding Setup - Configuración de Colores y Branding

Este prompt configura la paleta de colores personalizada para tu proyecto, generando escalas completas optimizadas para Tailwind CSS.

**⚠️ Este prompt es OPCIONAL** - Úsalo cuando quieras personalizar los colores del proyecto.

---

## 🎯 Objetivo

Configurar una paleta de colores personalizada para:

- ✅ Colores primarios (primary)
- ✅ Colores secundarios (secondary)
- ✅ Colores de acento (accent)
- ✅ Generar escalas completas (50-950) para cada color
- ✅ Actualizar archivos de configuración del frontend

---

## 📋 Requisitos Previos

- [ ] Proyecto frontend existente
- [ ] Archivo de estilos principal accesible (ej: `src/assets/styles/input.css` o equivalente)

**DOCUMENTACIÓN ACTUALIZADA**: Tienes acceso a **Context7** (MCP), una herramienta que te permite consultar la documentación oficial más actualizada de Tailwind CSS. **Úsala cuando necesites configuraciones de tema personalizadas que no estén en el proyecto** (generación de escalas de color, configuraciones avanzadas de tema, customizaciones específicas sin precedente en el archivo de estilos actual).

---

## 🎨 Paso 1: Definir Paleta de Colores

**Mensaje al usuario**:

> 🎨 **Configuración de la paleta de colores del proyecto**
>
> Define los colores primarios, secundarios y de acento para tu aplicación.
>
> **Opciones para definir colores**:
>
> 1️⃣ **Subir imagen de referencia** (mockup, logo, screenshot)
> 2️⃣ **Proporcionar URL de Confluence** con guía de estilos/colores
> 3️⃣ **Describir la paleta** (ej: "azul corporativo oscuro, acentos naranjas")
> 4️⃣ **Proporcionar colores específicos** (hexadecimal)
>
> **Colores a definir**:
>
> - **Primary**: Color principal (botones primarios, links, highlights)
> - **Secondary**: Color secundario (botones secundarios, badges)
> - **Accent**: Color de acento (notificaciones, CTAs importantes)
>
> ¿Cómo prefieres definir los colores?

**Espera respuesta del usuario**

---

## 🖼️ Opción 1: Imagen de Referencia

**Si el usuario proporciona una imagen:**

### 1.1 Analizar Imagen

**Acción del Agente**: Analiza la imagen para extraer colores dominantes.

**Proceso**:
1. Identificar los 3-5 colores más prominentes
2. Extraer valores hexadecimales
3. Clasificar por saturación y brillo

### 1.2 Mostrar Paleta Extraída

**Mensaje**:

> 🎨 **Paleta extraída de la imagen:**
>
> **Colores detectados**:
> - Color 1: #XXXXXX (dominante)
> - Color 2: #XXXXXX
> - Color 3: #XXXXXX
> - Color 4: #XXXXXX (si aplica)
>
> **Asignación sugerida**:
> - **Primary**: #XXXXXX (color más dominante/corporativo)
> - **Secondary**: #XXXXXX (color complementario)
> - **Accent**: #XXXXXX (color vibrante para CTAs)
>
> ¿Apruebas esta asignación o quieres ajustar algo?

**Espera confirmación o ajustes**

---

## 📄 Opción 2: Página de Confluence

**Si el usuario proporciona URL de Confluence:**

### 2.1 Obtener Contenido de Confluence

**Acción del Agente**: Extrae el ID de la página de la URL y obtiene el contenido:

```
Herramienta: mcp_mcp-atlassian_confluence_get_page
Parámetros: { 
  "page_id": "{id_extraído_de_url}",
  "convert_to_markdown": true
}
```

### 2.2 Buscar Referencias a Colores

**Acción del Agente**: Busca en el contenido:
- Valores hexadecimales (#XXXXXX)
- Valores RGB (rgb(X, X, X))
- Nombres de colores descriptivos

### 2.3 Mostrar Colores Encontrados

**Mensaje**:

> 🎨 **Colores encontrados en Confluence:**
>
> {Lista de colores extraídos con contexto}
>
> Por favor, indica cuál usar para cada categoría:
>
> - **Primary** (color principal):
> - **Secondary** (color secundario):
> - **Accent** (color de acento):

**Espera respuesta del usuario**

---

## 💬 Opción 3: Descripción Directa

**Si el usuario describe la paleta:**

### 3.1 Interpretar Descripción

**Acción del Agente**: Interpreta la descripción y sugiere colores específicos.

**Ejemplos de interpretación**:
- "azul oscuro corporativo" → #1e3a8a
- "verde vibrante" → #10b981
- "naranja cálido" → #f97316
- "gris neutro" → #64748b

### 3.2 Sugerir Paleta

**Mensaje**:

> 🎨 **Paleta sugerida basada en tu descripción:**
>
> - **Primary**: #XXXXXX (azul oscuro corporativo)
>   - Descripción: Profesional, confiable, corporativo
>
> - **Secondary**: #XXXXXX (gris neutro)
>   - Descripción: Complementario, versátil
>
> - **Accent**: #XXXXXX (naranja vibrante)
>   - Descripción: Llamativo, energético, para CTAs
>
> ¿Apruebas esta paleta? Si quieres ajustes, indícalos.

**Espera confirmación o ajustes**

---

## 🎨 Opción 4: Colores Específicos

**Si el usuario proporciona colores directamente:**

### 4.1 Validar Formato

**Acción del Agente**: Verifica que los colores estén en formato hexadecimal válido.

### 4.2 Confirmar Colores

**Mensaje**:

> ✅ **Colores recibidos:**
>
> - **Primary**: {color_hex}
> - **Secondary**: {color_hex}
> - **Accent**: {color_hex}
>
> Generando escalas de color...

---

## 🌈 Paso 2: Generar Escalas de Color

**Acción del Agente**: Una vez definidos los colores base, genera las escalas completas (50-950) para cada color.

### 2.1 Algoritmo de Escalas

Para cada color base (ej: Primary #1e3a8a):

1. **Generar tonos más claros** (50-500):
   - Aumentar luminosidad progresivamente
   - Mantener saturación similar

2. **Color base** = 600

3. **Generar tonos más oscuros** (700-950):
   - Disminuir luminosidad progresivamente
   - Ajustar saturación para mantener vibración

### 2.2 Mostrar Escalas Generadas

**Mensaje**:

> 🌈 **Escalas de color generadas:**
>
> **Primary**:
> - 50: #XXXXXX (muy claro)
> - 100: #XXXXXX
> - 200: #XXXXXX
> - 300: #XXXXXX
> - 400: #XXXXXX
> - 500: #XXXXXX
> - 600: #XXXXXX ← **Base**
> - 700: #XXXXXX
> - 800: #XXXXXX
> - 900: #XXXXXX
> - 950: #XXXXXX (muy oscuro)
>
> {Similar para Secondary y Accent}
>
> ¿Apruebas estas escalas?

**Espera confirmación**

---

## 📝 Paso 3: Actualizar Archivos de Configuración

### 3.1 Identificar Archivo de Estilos Principal

**Acción del Agente**: Busca el archivo principal de estilos según el framework:

- **Tailwind CSS 4**: `src/assets/styles/input.css` o `src/index.css`
- **Tailwind CSS 3**: `tailwind.config.js` o `tailwind.config.ts`
- **Otro**: Preguntar al usuario

### 3.2 Actualizar Configuración

**Para Tailwind CSS 4** (usando `@theme`):

Actualiza el archivo con:

```css
@theme {
  /* Colores Primary */
  --color-primary-50: #...;
  --color-primary-100: #...;
  --color-primary-200: #...;
  --color-primary-300: #...;
  --color-primary-400: #...;
  --color-primary-500: #...;
  --color-primary-600: #...;  /* Base */
  --color-primary-700: #...;
  --color-primary-800: #...;
  --color-primary-900: #...;
  --color-primary-950: #...;

  /* Colores Secondary */
  --color-secondary-50: #...;
  --color-secondary-100: #...;
  --color-secondary-200: #...;
  --color-secondary-300: #...;
  --color-secondary-400: #...;
  --color-secondary-500: #...;
  --color-secondary-600: #...;  /* Base */
  --color-secondary-700: #...;
  --color-secondary-800: #...;
  --color-secondary-900: #...;
  --color-secondary-950: #...;

  /* Colores Accent */
  --color-accent-50: #...;
  --color-accent-100: #...;
  --color-accent-200: #...;
  --color-accent-300: #...;
  --color-accent-400: #...;
  --color-accent-500: #...;
  --color-accent-600: #...;  /* Base */
  --color-accent-700: #...;
  --color-accent-800: #...;
  --color-accent-900: #...;
  --color-accent-950: #...;
}
```

**Para Tailwind CSS 3** (usando `tailwind.config`):

Actualiza `tailwind.config.js`:

```JavaScript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#...',
          100: '#...',
          // ... resto de escalas
          950: '#...',
        },
        secondary: {
          50: '#...',
          // ... resto de escalas
        },
        accent: {
          50: '#...',
          // ... resto de escalas
        },
      },
    },
  },
};
```

**Mensaje**:

> ✅ **Configuración actualizada en `{archivo}`**

---

## 📚 Paso 4: Crear Guía de Uso

### 4.1 Generar Documentación de Colores

**Acción del Agente**: Crea un archivo de referencia en `.github/documentation/colors.md`:

```markdown
# Guía de Colores del Proyecto

## Paleta Principal

### Primary
- **Base**: #{color_hex}
- **Uso**: Botones primarios, links, highlights principales

**Escalas disponibles**:
- `bg-primary-50` a `bg-primary-950`
- `text-primary-50` a `text-primary-950`
- `border-primary-50` a `border-primary-950`

**Ejemplos de uso**:
```tsx
<button className="bg-primary-600 hover:bg-primary-700">
  Botón Primario
</button>
```

### Secondary
{Similar estructura}

### Accent
{Similar estructura}

## Combinaciones Recomendadas

- **Botones primarios**: `bg-primary-600 hover:bg-primary-700 text-white`
- **Botones secundarios**: `bg-secondary-100 hover:bg-secondary-200 text-secondary-700`
- **Links**: `text-primary-600 hover:text-primary-700`
- **Badges de acento**: `bg-accent-100 text-accent-700`

**Mensaje**:

> 📚 **Documentación de colores creada en `.github/documentation/colors.md`**

---

## ✅ Paso 5: Verificación y Preview

**Mensaje al usuario**:

> 🎉 **¡Paleta de colores configurada exitosamente!**
>
> ### 📋 Resumen:
>
> **Primary**: {color_hex}
> - 11 escalas generadas (50-950)
> - Uso: Botones principales, navegación, highlights
>
> **Secondary**: {color_hex}
> - 11 escalas generadas (50-950)
> - Uso: Botones secundarios, backgrounds sutiles
>
> **Accent**: {color_hex}
> - 11 escalas generadas (50-950)
> - Uso: CTAs, notificaciones, elementos destacados
>
> ---
>
> ### 📝 Archivos Actualizados:
>
> - ✅ `{archivo-estilos-principal}`
> - ✅ `.github/documentation/colors.md` (guía de uso)
>
> ---
>
> ### 🎨 Cómo Usar en tu Código:
>
> **Botones primarios**:
> ```tsx
> className="bg-primary-600 hover:bg-primary-700 text-white"
> ```
>
> **Links**:
> ```tsx
> className="text-primary-600 hover:text-primary-700"
> ```
>
> **Badges**:
> ```tsx
> className="bg-accent-100 text-accent-700 border border-accent-200"
> ```
>
> ---
>
> ### 🚀 Próximos Pasos:
>
> 1. Reinicia el servidor de desarrollo del frontend si está corriendo
> 2. Los nuevos colores estarán disponibles automáticamente
> 3. Consulta `.github/documentation/colors.md` para más ejemplos
>
> ✅ **Configuración de branding completada.**

---

## 🔧 Manejo de Errores

### Error: Archivo de Estilos No Encontrado

> ❌ **No se encontró el archivo de estilos principal**
>
> Por favor indica la ruta del archivo donde configurar los colores:
> - Para Tailwind 4: `src/index.css` o similar
> - Para Tailwind 3: `tailwind.config.js`

### Error: Colores Inválidos

> ❌ **Formato de color inválido**
>
> Por favor proporciona colores en formato hexadecimal:
> - Válido: `#1e3a8a`, `#10b981`
> - Inválido: `blue`, `rgb(30, 58, 138)`

---

## 📝 Notas Importantes

### Cuando Ejecutar Este Prompt

- **Después** de `setup.project-setup.prompt.md` o sobre cualquier proyecto que ya tenga frontend y archivo de estilos disponible
- **En cualquier momento** que quieras personalizar o cambiar los colores
- **Antes de empezar a desarrollar componentes UI** (recomendado)
- **Cuando recibas una nueva guía de branding** del equipo de diseño
### Volver a Ejecutar

Puedes ejecutar este prompt múltiples veces para:
- Probar diferentes paletas
- Ajustar colores existentes
- Actualizar branding

### Backup

Antes de re-ejecutar, considera hacer backup del archivo de estilos actual si ya tenías colores personalizados.

---

## Checklist de Branding

**Antes de finalizar, verifica**:

- [ ] Colores primary, secondary y accent definidos
- [ ] Escalas completas generadas (50-950)
- [ ] Archivo de estilos actualizado
- [ ] Documentación de colores creada
- [ ] Guía de uso incluida
- [ ] Usuario notificado sobre cómo usar los colores

---

**Versión**: 1.1.0  
**Última actualización**: Abril 2026
