---
name: management.publish-requirement
description: Publica casos de uso, historias de usuario o requerimientos validados en Jira y/o Confluence
argument-hint: Especifica fuente (archivo, texto o salida previa) y destino (Jira, Confluence o ambos)
---

# Publicar Requerimiento

## Objetivo

Tomar un requerimiento ya definido, por ejemplo un caso de uso, una historia de usuario o un texto funcional estructurado, y publicarlo en Jira, en Confluence o en ambos destinos.

Este prompt es la **source of truth compartida** para la publicación desde `Management` y desde `FunctionalAnalyst`. Si el flujo se ejecuta desde `FunctionalAnalyst`, debe explicitar que está aplicando el comportamiento compartido definido por `Management`.

Este flujo debe priorizar la continuidad del trabajo: si el usuario ya pidió publicar y la información crítica está clara, publica directamente sin pedir una confirmación final redundante.

Al mismo tiempo, si existe una duda conceptual real sobre qué se está publicando, cómo debe interpretarse el contenido o cómo debe mapearse a la plataforma destino, debes preguntar antes de continuar.

Cuando necesites relevar varias definiciones o validar supuestos, prioriza `askQuestions` con opciones recomendadas y una última pregunta abierta para capturar contexto adicional.

---

## Fase 1: Detectar Fuente y Destino

### Identificar la Fuente

Detecta la fuente en este orden:

1. **Archivo o path provisto**
2. **Carpeta de trabajo provista dentro de `docs/`**
3. **Contenido seleccionado en el editor**
4. **Salida previa del agente `FunctionalAnalyst` o de otra conversación actual**
5. **Texto pegado por el usuario**
6. **Ticket o página existente que se usará como base**
7. **Preguntar** solo si la fuente no está clara

Si la fuente es una carpeta de trabajo en `docs/`, prioriza este orden de lectura:

1. `use-case.md`
2. `mockup.md` o `mockup.html`
3. `base-context.md`
4. otros artefactos auxiliares de esa misma carpeta que agreguen trazabilidad real al contenido a publicar

### Identificar el Destino

Detecta el destino según la instrucción del usuario:

- "sube ticket", "crea issue", "llévalo a Jira" → **Jira**
- "publica página", "créalo en Confluence" → **Confluence**
- "publica ambos" o indicación explícita → **Jira + Confluence**

Si el destino no es deducible, pregunta de forma directa y breve.

---

## Fase 2: Cargar Contexto Mínimo Necesario

Lee lo mínimo necesario para publicar correctamente:

- `.github/instructions/tools.instructions.md` para obtener claves de proyecto y espacio
- `.github/agents/memories/functional-analyst.memory.md` como contexto auxiliar para defaults útiles, nomenclaturas, espacios, proyectos o referencias detectadas previamente
- el artefacto fuente completo
- si la fuente es una carpeta de trabajo en `docs/`, los archivos compañeros de esa misma carpeta solo cuando ayuden a completar trazabilidad, título, descripción, links pendientes o contexto visual relevante
- cualquier ticket, página o referencia que el usuario haya indicado como base

Si la memoria de `FunctionalAnalyst` no existe, está vacía o no aporta nada útil al caso, continúa sin bloquear el flujo.

Si el usuario marca fuentes adicionales, revísalas solo si ayudan a completar campos bloqueantes, formato o trazabilidad.

Si la publicación se ejecuta desde `FunctionalAnalyst`, aclara brevemente antes de crear el artefacto que estás aplicando el flujo compartido definido por `Management`.

---

## Fase 3: Preparar el Artefacto

Extrae y estructura como mínimo:

- título o resumen
- tipo de artefacto: caso de uso, historia de usuario, requerimiento, task u otro
- módulo o dominio si aplica
- cuerpo principal o descripción completa
- placeholders, TODOs o referencias pendientes
- referencias a otros tickets, páginas o documentación si existen

### Política de Completitud

- Si el contenido principal está claro, publícalo.
- Si faltan datos secundarios como assignee, prioridad, estado, labels, watchers o campos extra, usa defaults de la plataforma o deja esos campos sin completar cuando sea válido.
- Si aparece una duda conceptual real sobre el alcance, la interpretación del contenido, el tipo de artefacto o el mapeo al destino, pregunta antes de publicar.
- Si tienes una opción razonable para resolver un punto no crítico, proponla como opción recomendada en el formulario en lugar de asumirla directamente.
- Solo pregunta por datos faltantes si son realmente bloqueantes para crear el artefacto o si podrían desviar materialmente el resultado.
- Si hay placeholders o referencias pendientes, publica igual y luego informa al usuario qué debe completar.

### Cuándo Preguntar

Pregunta solo si falta alguno de estos puntos y no puedes resolverlo con configuración o defaults:

- destino real;
- proyecto o espacio cuando no está configurado;
- issue type obligatorio;
- parent page obligatoria;
- título o resumen insuficiente para crear el artefacto;
- duda conceptual sobre el contenido, su alcance o cómo traducirlo al artefacto destino;
- ambigüedad fuerte entre crear algo nuevo o actualizar algo existente.

Cuando necesites preguntar más de un dato, agrupa las preguntas y usa preguntas estructuradas cuando ayuden a responder rápido.

Si usas preguntas estructuradas:

- marca como recomendadas las opciones que mejor encajen con el contexto;
- evita convertir una recomendación en hecho sin respuesta del usuario;
- agrega una última pregunta abierta: `¿Algo más que deba considerar?`.

---

## Fase 4: Publicar en Jira

### Reglas

1. Usa el proyecto configurado en `.github/instructions/tools.instructions.md` salvo que el usuario indique otro.
2. Construye un resumen claro y corto.
3. Usa una descripción completa, preservando estructura útil, placeholders y pendientes.
4. Si hay referencias externas ya conocidas, inclúyelas.
5. Si faltan referencias o enlaces todavía no disponibles, agrega una sección de pendientes al final del ticket.

### Metadatos

- **Assignee**: asignar solo si el usuario lo indicó o si hay una convención clara; si no, dejar default.
- **Prioridad**: usar la indicada por el usuario; si no, dejar default.
- **Estado**: no forzar uno especial salvo que el flujo del proyecto lo requiera; usar default.
- **Campos extra**: completar solo si son obligatorios o si el usuario los pidió.

### Resultado Esperado

Después de crear el issue, devuelve:

- issue key
- resumen
- proyecto
- enlace directo
- metadatos aplicados o dejados en default
- placeholders o referencias pendientes que el usuario deberá completar luego

---

## Fase 5: Publicar en Confluence

### Reglas

1. Usa el espacio configurado en `.github/instructions/tools.instructions.md` salvo indicación contraria.
2. Mantén el contenido lo más completo posible.
3. Conserva placeholders, TODOs y referencias pendientes en el cuerpo si todavía no están resueltos.
4. Si existe una estructura o página padre claramente definida, úsala.
5. Si la ubicación no está clara y es bloqueante, pregunta.

### Resultado Esperado

Después de crear la página, devuelve:

- título
- espacio
- page ID si está disponible
- enlace directo
- ubicación o parent utilizada
- placeholders o referencias pendientes que el usuario deberá completar luego

---

## Fase 6: Cierre

Al finalizar:

1. Resume qué se creó.
2. Devuelve siempre el enlace directo de cada artefacto externo cuando esté disponible o se pueda derivar de forma segura.
3. Informa qué datos quedaron con defaults.
4. Informa qué placeholders, referencias o enlaces debe completar luego el usuario.

Ejemplo:

```markdown
✅ Publicación completada

- Jira: DIL-1234
- Confluence: Caso de Uso - Alta de Sucursal

🔗 Links directos:
- Jira: {url}
- Confluence: {url}

ℹ️ Metadatos en default:
- assignee
- prioridad

📝 Pendientes para completar:
- vincular ticket relacionado DIL-999
- reemplazar placeholder de mockup principal
```

---

## Casos Especiales

**La fuente tiene placeholders**  
Publica igual y deja los pendientes explícitos al final.

**La fuente es una carpeta de trabajo bajo `docs/`**  
Usa `use-case.md` como base principal y toma `mockup.html`, `mockup.md`, `base-context.md` u otros archivos vecinos solo si agregan contexto directo útil para la publicación.

**Falta assignee, prioridad o estado**  
No bloquees la creación salvo que el proyecto lo exija. Usa defaults o deja vacío.

**No está claro si crear o actualizar**  
Pregunta antes de tocar un artefacto existente.

**No hay conexión a Jira o Confluence**  
Informa la limitación y ofrece dejar el contenido preparado en Markdown para publicar después.

---

## Referencias

- `.github/instructions/tools.instructions.md`
- `.github/agents/functional-analyst.agent.md`
- `.github/documentation/examples/use-case-template-and-example.md`

---

**Versión**: 1.1.0  
**Última actualización**: Abril 2026