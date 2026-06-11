# Optimizar Prompt

## Objetivo

Analizar un prompt existente para identificar problemas de longitud, redundancia y claridad, y luego optimizarlo manteniendo toda la funcionalidad esencial.

---

## Contexto

Los prompts demasiado largos:
- Consumen más tokens innecesariamente
- Son más difíciles de mantener
- Pueden confundir al modelo con información redundante
- Aumentan el tiempo de procesamiento

Un prompt optimizado debe:
- ✅ Mantener toda la funcionalidad e información crítica
- ✅ Eliminar redundancias y repeticiones
- ✅ Consolidar secciones similares
- ✅ Usar referencias a documentación en lugar de repetir contenido
- ✅ Ser claro, conciso y accionable

---

## Proceso de Optimización

### FASE 1: Análisis del Prompt

**Acción**: Lee el prompt completo que el usuario te proporcione y realiza un análisis detallado.

#### 1.1 Identificar Problemas

Busca y documenta:

**Redundancias**:
- ¿Se repiten conceptos o instrucciones en múltiples secciones?
- ¿Hay bloques de texto casi idénticos?
- ¿Se explica lo mismo de diferentes formas?

**Verbosidad Excesiva**:
- ¿Los mensajes al usuario son demasiado largos?
- ¿Hay explicaciones que podrían ser más concisas?
- ¿Se usan demasiados emojis, separadores o formateo decorativo?

**Estructura Ineficiente**:
- ¿Hay pasos que podrían consolidarse?
- ¿Alguna sección está fragmentada cuando podría ser única?
- ¿La organización actual es la más lógica?

**Contenido Innecesario**:
- ¿Hay ejemplos de código que ya están en documentación?
- ¿Se incluyen detalles de implementación que el agente puede inferir?
- ¿Hay información que no aporta valor al objetivo del prompt?

**Falta de Referencias**:
- ¿Se repite contenido que ya existe en archivos de documentación?
- ¿Se podría referenciar otro archivo en lugar de duplicar información?

#### 1.2 Métricas del Prompt Actual

Documenta:
- **Longitud total**: ~{N} líneas
- **Secciones principales**: {N}
- **Nivel de detalle**: Alto / Medio / Bajo
- **Redundancia estimada**: {X}%

#### 1.3 Generar Reporte de Análisis

**Formato del reporte**:

```markdown
## 📊 Análisis del Prompt: {Nombre del Prompt}

### ❌ Problemas Identificados

1. **Redundancia excesiva**
   - {Descripción específica}
   - Ejemplos: {líneas o secciones afectadas}

2. **Verbosidad en mensajes**
   - {Descripción específica}
   - Ejemplos: {secciones afectadas}

3. **Estructura ineficiente**
   - {Descripción específica}
   - Pasos afectados: {lista}

4. **Contenido innecesario**
   - {Qué tipo de contenido se puede eliminar}
   - Secciones: {lista}

5. **Duplicación de documentación**
   - {Qué contenido ya existe en docs}
   - Archivos relacionados: {lista}

### 📏 Métricas Actuales

- **Longitud**: ~{N} líneas
- **Secciones**: {N}
- **Redundancia estimada**: {X}%
- **Complejidad**: Alta / Media / Baja

### ✅ Optimizaciones Propuestas

1. **{Tipo de optimización 1}**
   - Acción: {descripción}
   - Impacto: {reducción estimada de líneas}
   - Ejemplo: {antes/después resumido}

2. **{Tipo de optimización 2}**
   - Acción: {descripción}
   - Impacto: {reducción estimada de líneas}

3. **{Tipo de optimización 3}**
   - Acción: {descripción}
   - Impacto: {reducción estimada de líneas}

{... continuar con todas las optimizaciones identificadas}

### 💡 Cambios Específicos Sugeridos

**Consolidaciones**:
- [ ] Unificar secciones {A}, {B}, {C} en una sola
- [ ] Compactar mensajes de confirmación en {sección}
- [ ] {otro cambio de consolidación}

**Eliminaciones**:
- [ ] Remover ejemplos de código en {sección} (ya en documentación)
- [ ] Eliminar repeticiones de {concepto} en {secciones}
- [ ] {otra eliminación}

**Simplificaciones**:
- [ ] Reducir formateo excesivo (emojis, separadores)
- [ ] Compactar explicaciones de errores en {paso}
- [ ] {otra simplificación}

**Referencias**:
- [ ] Reemplazar {contenido} con referencia a `.github/documentation/{archivo}.md`
- [ ] {otra referencia}

### 📉 Reducción Estimada

**Longitud actual**: ~{N} líneas
**Longitud optimizada**: ~{M} líneas
**Reducción**: ~{P}% (-{N-M} líneas)

**Beneficios esperados**:
- ✅ Menor consumo de tokens
- ✅ Mayor claridad y mantenibilidad
- ✅ Mismo nivel de funcionalidad
- ✅ Más fácil de actualizar

### ⚠️ Riesgos y Consideraciones

- **Información crítica**: {Qué información NO debe eliminarse}
- **Claridad vs Brevedad**: {Balance a mantener}
- **Casos especiales**: {Secciones que requieren detalle}
```

**Muestra este reporte al usuario y DETENTE. Espera su confirmación antes de proceder a la Fase 2.**

---

### FASE 2: Aplicar Optimizaciones

**⚠️ IMPORTANTE**: Solo proceder con esta fase si el usuario aprueba el análisis de la Fase 1.

**Acción**: Aplicar todas las optimizaciones identificadas al prompt.

#### 2.1 Priorización de Cambios

Aplica optimizaciones en este orden:

1. **Eliminaciones** (contenido innecesario, redundancias claras)
2. **Consolidaciones** (unir secciones relacionadas)
3. **Simplificaciones** (reducir verbosidad, compactar mensajes)
4. **Reestructuraciones** (mejorar organización si es necesario)
5. **Referencias** (reemplazar contenido duplicado con links a docs)

#### 2.2 Principios de Optimización

**Mantener SIEMPRE**:
- ✅ Objetivo claro del prompt
- ✅ Todas las fases/pasos críticos del proceso
- ✅ Información técnica esencial
- ✅ Instrucciones específicas de comportamiento
- ✅ Criterios de validación y verificación
- ✅ Manejo de casos especiales y errores

**Eliminar o Reducir**:
- ❌ Repeticiones de conceptos
- ❌ Ejemplos que están en documentación
- ❌ Mensajes excesivamente largos
- ❌ Formateo puramente decorativo
- ❌ Explicaciones redundantes de éxito/error
- ❌ Detalles de implementación que el modelo puede inferir

**Consolidar**:
- 🔄 Pasos secuenciales sin pausas necesarias
- 🔄 Mensajes similares en diferentes secciones
- 🔄 Verificaciones repetidas
- 🔄 Secciones con propósito similar

#### 2.3 Técnicas de Compactación

**Para mensajes al usuario**:

❌ **Antes** (verboso):
```markdown
> ✅ **Backend:** Dependencias instaladas y proyecto compilado correctamente.
>
> **Stack instalado:**
> - ASP.NET Core 8.0
> - Entity Framework Core
> - AutoMapper
> - FluentValidation
> - Swagger/OpenAPI
>
> 🎉 Continuando con el siguiente paso...
```

✅ **Después** (conciso):
```markdown
> ✅ **Backend**: Dependencias instaladas y compilado correctamente
```

**Para instrucciones repetitivas**:

❌ **Antes**:
```markdown
### Paso X: Hacer A

**Si es exitoso:**
> Mensaje de éxito

**Si hay error:**
> Mensaje de error

### Paso Y: Hacer B

**Si es exitoso:**
> Mensaje de éxito

**Si hay error:**
> Mensaje de error
```

✅ **Después**:
```markdown
### Pasos X-Y: Hacer A y B

**Manejo de errores**: En caso de fallo, mostrar error detallado e iterar con el usuario.

**Confirmación**: Notificar éxito al completar ambos pasos.
```

**Para ejemplos de código**:

❌ **Antes**: Incluir código completo en el prompt

✅ **Después**: 
```markdown
**Referencia**: Ver ejemplo completo en `.github/documentation/{archivo}.md`
```

**Para verificaciones repetidas**:

❌ **Antes**: Repetir en cada paso cómo verificar

✅ **Después**: 
```markdown
**Verificación estándar**: Ver sección "Manejo de Errores" al final del prompt
```

#### 2.4 Aplicar Cambios al Archivo

Usa `replace_string_in_file` o `multi_replace_string_in_file` para aplicar todas las optimizaciones al prompt.

**Orden de aplicación**:
1. Eliminaciones grandes (secciones completas)
2. Consolidaciones (unir múltiples secciones)
3. Simplificaciones (reducir verbosidad)
4. Ajustes finales (formateo, referencias)

#### 2.5 Validación Post-Optimización

**Verifica que el prompt optimizado**:
- [ ] Mantiene el objetivo original claramente definido
- [ ] Conserva todos los pasos críticos del proceso
- [ ] Incluye manejo de errores y casos especiales
- [ ] Referencias a documentación están correctas
- [ ] No se perdió información técnica esencial
- [ ] La estructura es lógica y fácil de seguir
- [ ] Los mensajes clave están presentes (aunque más concisos)

#### 2.6 Reporte Final

**Mensaje al usuario**:

```markdown
✅ **Prompt optimizado exitosamente: `{nombre-prompt}.prompt.md`**

### 📊 Resultados de Optimización

**Antes**:
- Longitud: ~{N} líneas
- Secciones: {X}
- Redundancia: {Y}%

**Después**:
- Longitud: ~{M} líneas
- Secciones: {Z}
- Redundancia: <5%

**Reducción**: {P}% (-{N-M} líneas)

### 🔧 Cambios Aplicados

1. ✅ {Tipo de cambio 1}: {breve descripción}
2. ✅ {Tipo de cambio 2}: {breve descripción}
3. ✅ {Tipo de cambio 3}: {breve descripción}
{... lista completa}

### ✅ Validación

- ✅ Funcionalidad completa preservada
- ✅ Todos los pasos críticos presentes
- ✅ Referencias a documentación actualizadas
- ✅ Estructura lógica mejorada

### 📝 Recomendaciones

{Si hay recomendaciones adicionales para mejorar el prompt a futuro}

---

**El prompt está listo para usar.** Puedes probarlo en una nueva sesión de chat para verificar su efectividad.
```

---

## Casos Especiales

### Prompt Muy Complejo

Si el prompt tiene >1000 líneas o >10 pasos principales:

1. Considera dividirlo en múltiples prompts más específicos
2. Evalúa si hay sub-procesos que podrían ser prompts independientes
3. Sugiere arquitectura modular de prompts

### Prompt Técnico Denso

Si contiene mucha información técnica que no puede eliminarse:

1. Prioriza consolidación sobre eliminación
2. Usa subsecciones colapsables (en Confluence)
3. Mantén detalles críticos, compacta explicaciones

### Prompt con Ejemplos Extensos

Si tiene muchos ejemplos de código o estructuras:

1. Evalúa si los ejemplos están en documentación
2. Si no: considera moverlos a documentación y referenciar
3. Si deben permanecer: mantén solo los más representativos

---

## Instrucciones para el Usuario

**Para usar este prompt**:

1. **Inicia una nueva sesión de chat** (para no saturar contexto)
2. **Proporciona el prompt a optimizar**:
   - Pega el contenido completo, O
   - Indica la ruta del archivo, O
   - Adjunta el archivo
3. **Espera el análisis** (Fase 1) con el reporte completo
4. **Revisa las optimizaciones propuestas**
5. **Aprueba con "OK" o "Adelante"** para aplicar cambios (Fase 2)
6. **Valida el resultado** en una nueva sesión probando el prompt optimizado

**Ejemplo de uso**:

```
Usuario: Quiero optimizar el prompt `create-backend-feature.prompt.md`

Agente: [Adjunta o pega el contenido del prompt]

Agente: [Ejecuta Fase 1 y muestra análisis completo]

Usuario: OK, adelante con las optimizaciones

Agente: [Ejecuta Fase 2 y aplica cambios]
```

---

## Checklist de Optimización

**Fase 1 - Análisis**:
- [ ] Prompt leído completamente
- [ ] Problemas identificados y categorizados
- [ ] Métricas actuales documentadas
- [ ] Optimizaciones propuestas con impacto estimado
- [ ] Cambios específicos listados
- [ ] Reducción estimada calculada
- [ ] Reporte mostrado al usuario
- [ ] **PAUSAR** - Esperar aprobación

**Fase 2 - Aplicación**:
- [ ] Confirmación del usuario recibida
- [ ] Eliminaciones aplicadas
- [ ] Consolidaciones aplicadas
- [ ] Simplificaciones aplicadas
- [ ] Referencias actualizadas
- [ ] Validación post-optimización completada
- [ ] Reporte final generado
- [ ] Usuario notificado

---

## Notas Importantes

### Balance entre Brevedad y Claridad

No optimizar excesivamente si compromete la claridad. Un prompt debe ser:
- **Suficientemente detallado** para que el modelo entienda el proceso completo
- **Suficientemente conciso** para no consumir tokens innecesarios
- **Bien estructurado** para facilitar seguimiento y mantenimiento

### Mantener Contexto Crítico

Nunca eliminar:
- Objetivos y propósito del prompt
- Prerequisitos técnicos
- Pasos críticos del flujo
- Validaciones de seguridad o calidad
- Manejo de casos especiales
- Referencias a documentación relacionada

### Iteración con Usuario

Si el usuario pide ajustes después de la optimización:
- Aplica cambios específicos solicitados
- Re-evalúa el balance claridad/brevedad
- Genera reporte actualizado

---

## Referencias

Este prompt sigue las mejores prácticas de:
- **Documentación del Proyecto**: `.github/documentation/`
- **Otros Prompts Optimizados**: `.github/prompts/`

---

**Versión**: 1.0.0  
**Última actualización**: Noviembre 2025