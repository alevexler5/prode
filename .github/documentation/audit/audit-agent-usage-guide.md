# Guía de Uso del Agente de Auditoría

## Objetivo de esta guía

Esta guía explica el flujo operativo base para ejecutar una auditoría con el agente Auditoría en un proyecto nuevo.

Su foco es práctico:

- preparar el proyecto a auditar;
- cargar la estructura entregada de `.github` y `.vscode`;
- instalar las dependencias necesarias para ejecutar los MCPs;
- configurar los MCPs necesarios;
- ejecutar los pasos de auditoría del 1 al 8;
- empaquetar y enviar los resultados al final.

---

## Resumen rápido del proceso

1. Reunir en una sola carpeta todo el proyecto que se va a auditar.
2. Copiar dentro de esa carpeta la `.github` entregada para auditoría y la `.vscode` que contiene el `mcp.template.json`.
3. Abrir esa carpeta completa en Visual Studio Code.
4. Instalar los prerrequisitos para ejecutar los MCPs.
5. Copiar `.vscode/mcp.template.json` a `.vscode/mcp.json`.
6. Configurar como mínimo Context7 y PDF Reader, y Atlassian si hace falta consultar documentación existente.
7. Trabajar con GitHub Copilot en modo Agent usando el agente Auditoría.
8. Ejecutar los pasos 1 al 8, uno por vez, respondiendo las preguntas del agente.
9. No ejecutar el paso 9. Ese paso queda reservado para Juan José Le Saint y Agustín Ignacio García.
10. Al finalizar, comprimir la carpeta de resultados de auditoría en un `.rar` y enviarla por mail a los responsables.

---

## Responsables y consultas

Responsables del flujo de auditoría y de la etapa posterior de sincronización:

- Juan José Le Saint - `juanjose.lesaint@diveria.com`
- Agustín Ignacio García - `agustin.garcia@diveria.com`

Ante cualquier duda sobre el flujo, el uso del agente, los materiales entregados o la forma de preparar la información, consultar a cualquiera de los responsables.

---

## 1. Preparación inicial del proyecto

Antes de iniciar la auditoría, el proyecto debe estar preparado dentro de una única carpeta raíz.

### Qué debe haber dentro de esa carpeta

- el código fuente del proyecto;
- configuraciones relevantes;
- documentación disponible;
- archivos de dependencias y build;
- cualquier otra carpeta o archivo que ayude a entender el sistema.

### Estructura mínima esperada para auditar

Dentro de la carpeta raíz del proyecto a auditar se debe copiar lo que se entrega en el paquete de auditoría:

- la carpeta `.github/` con el agente de auditoría, la memoria limpia, los steps y el template de auditoría;
- la carpeta `.vscode/` con el archivo `mcp.template.json`.

### Recomendaciones importantes

- abrir en VS Code la carpeta raíz completa del proyecto, no una subcarpeta aislada;
- verificar que todas las partes del proyecto estén presentes antes de empezar;
- no editar manualmente la memoria del agente salvo que el proceso lo requiera de manera explícita;
- no cargar archivos que no sean de texto, PDFs o imágenes, ya que el agente no puede procesar otros formatos. Ejemplo: si hay archivos de Excel/Word, convertirlos a PDF antes de cargarlos al contexto del agente.

---

## 2. Configuración inicial en VS Code

### Abrir el proyecto correcto

1. Abrir Visual Studio Code.
2. Seleccionar `File > Open Folder`.
3. Elegir la carpeta raíz del proyecto que contiene el código y las carpetas `.github` y `.vscode`.

### Usar GitHub Copilot en modo Agent

Para esta auditoría se debe trabajar con GitHub Copilot en modo Agent.

Recomendación operativa:

- abrir el chat de Copilot;
- usar el modo Agent;
- seleccionar el agente Auditoría.

### Configuración recomendada del modelo

Configuración recomendada para este flujo:

- modelo por defecto: `GPT-5.4`;
- nivel de razonamiento: `High`.

Antes de arrancar un paso, revisar que el modelo y el nivel de razonamiento estén configurados correctamente.

Si el resultado no convence o hace falta otra perspectiva, se puede volver a intentar con:

- `Gemini 3.1 Pro`;
- `Claude Sonnet 4.6`;
- `Claude Sonnet 4.5`;
- o un nivel de razonamiento mayor, teniendo en cuenta que más razonamiento suele implicar más tiempo de respuesta.

> [Placeholder imagen: selector de modelo y nivel de razonamiento en VS Code]

---

## 3. Dependencias necesarias para los MCPs

### 3.1 Node.js y npm

Para ejecutar los MCPs de Context7 y PDF Reader se necesita tener instalado Node.js con npm.

Versión recomendada para este flujo:

- Node.js 22 o superior.

Validación sugerida en terminal:

```powershell
node --version
npm --version
```

Si `node` o `npm` no responden, hay que instalar Node.js antes de continuar. Se recomienda utilizar nvm para gestionar la instalación de Node.js y asegurarse de que quede disponible en el PATH.

### 3.2 Docker

Para ejecutar el MCP de Atlassian en este flujo se utiliza Docker.

Validación sugerida en terminal:

```powershell
docker --version
```

Si Docker no responde, hay que instalarlo y asegurarse de que quede disponible en el PATH antes de seguir.

---

## 4. Configuración de MCPs

### 4.1 Crear el archivo `mcp.json`

Desde la raíz del proyecto, copiar el template entregado, generando el archivo de configuración real `mcp.json`.

Importante:

- `mcp.json` contiene credenciales;
- no debe subirse al repositorio, se debe agregar a `.gitignore` si no está ya incluido;
- se usa solo en el entorno local de quien ejecuta la auditoría.

### 4.2 Configurar Context7

Context7 se utiliza para consultar documentación técnica actualizada cuando haga falta validar versiones, soporte o referencias de librerías y frameworks.

#### Crear la API key de Context7

1. Ir a `https://context7.com/dashboard`.
2. Iniciar sesión o crear la cuenta si todavía no existe.
3. Entrar en la sección de API Keys.
4. Generar una nueva API key.
5. Guardarla en un lugar seguro.

#### Cargar la API key en `mcp.json`

Dentro de `.vscode/mcp.json`, reemplazar el valor de ejemplo de Context7 por la API key real:

```json
"context7": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@upstash/context7-mcp", "--api-key", "tu_api_key_de_context7"]
}
```

### 4.3 Configurar PDF Reader

PDF Reader se utiliza para que el agente pueda leer el template de auditoría y otros archivos PDF que formen parte del material de trabajo.

No requiere credenciales adicionales, pero sí requiere que Node.js y npm estén instalados porque se ejecuta vía `npx`.

Configuración esperada en `mcp.json`:

```json
"pdf-reader": {
  "command": "npx",
  "args": ["-y", "@sylphx/pdf-reader-mcp"]
}
```

### 4.4 Configurar Atlassian con Docker solo si hace falta

El MCP de Atlassian se usa únicamente si durante la auditoría se necesita consultar documentación existente en Confluence o tickets en Jira.

En este flujo, Atlassian se ejecuta con Docker.

Si no se va a usar Atlassian, esta configuración puede dejarse para después.

#### Crear el API token de Atlassian

1. Ir a `https://id.atlassian.com/manage-profile/security/api-tokens`.
2. Crear un nuevo API token.
3. Copiarlo y guardarlo en un lugar seguro.

#### Cargar las credenciales en `mcp.json`

En `.vscode/mcp.json`, completar los valores de Atlassian:

- `CONFLUENCE_USERNAME`
- `CONFLUENCE_API_TOKEN`
- `JIRA_USERNAME`
- `JIRA_API_TOKEN`

Los usuarios suelen seguir el formato corporativo de mail, por ejemplo:

```text
nombre.apellido@diveria.com
```

Configuración esperada del servidor Atlassian:

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
  ]
}
```

_Importante_: el token generado debe ser tratado con cuidado, ya que otorga acceso a la información de Jira y Confluence. No compartirlo ni exponerlo en lugares públicos. Además, este token debe tener permisos adecuados para acceder a los espacios de Confluence y proyectos de Jira que se van a consultar durante la auditoría.

### 4.5 Reiniciar VS Code

Una vez guardado `mcp.json`:

1. cerrar VS Code;
2. volver a abrir el proyecto;
3. abrir Copilot nuevamente en modo Agent;
4. abrir `mcp.json`;
5. verificar que los MCPs de Context7, PDF Reader y Atlassian (si se va a usar) estén disponibles y funcionando.

> [Placeholder imagen: ejemplo de `.vscode/mcp.json` configurado]

---

## 5. Opcional: dictado por voz en VS Code

Si se quiere agilizar la auditoría mediante voz, se puede instalar soporte de transcripción en VS Code.

### Extensiones a instalar

- `ms-vscode.vscode-speech` - VS Code Speech
- `ms-vscode.vscode-speech-language-pack-es-mx` - Spanish (Mexico) language support for VS Code Speech

### Cómo instalar las extensiones

1. Abrir la vista de extensiones en VS Code.
2. Buscar `VS Code Speech` e instalarla.
3. Buscar `Spanish (Mexico) language support for VS Code Speech` e instalarla.
4. Reiniciar VS Code si la extensión lo solicita.

### Cuándo conviene usar voz

- cuando el usuario quiere responder muchas preguntas rápidamente;
- cuando conviene dictar contexto largo sobre un paso;
- cuando resulta más práctico hablar y luego corregir el texto transcripto.

> El uso de voz es opcional. Todas las respuestas del proceso también pueden cargarse por escrito.

> [Placeholder imagen: instalación de VS Code Speech y language pack es-mx]

---

## 6. Cómo ejecutar la auditoría

### Perfil sugerido para ejecutar la auditoría

Se recomienda contar al menos con:

- una persona con expertise de dominio y/o técnico sobre el proyecto;
- una persona con conocimiento de la gestión del proyecto, sus flujos, acuerdos, stakeholders y operación.

El análisis de cada paso en particular dejará indicado con más precisión qué pasos requieren más peso de perfil técnico, de dominio o de gestión.

### Regla general de trabajo

La auditoría se ejecuta paso por paso. No se deben mezclar varios pasos al mismo tiempo.

La mecánica esperada es:

1. seleccionar el agente de auditoría en el chat de Copilot;
2. iniciar un paso;
3. responder las preguntas del agente;
4. validar el contenido generado;
5. guardar el resultado;
6. generar un nuevo chat para el siguiente paso, seleccionando nuevamente el agente de auditoría;
7. continuar con el paso siguiente.

### Cómo iniciar un paso

Ejemplos de mensajes útiles para arrancar:

```text
Quiero trabajar en el paso 1
```

```text
Continuemos con el siguiente paso
```

```text
Revisar paso 3
```

### Plantilla base para iniciar un chat

Una forma simple de arrancar cualquier paso es usar una plantilla como esta y completar solo lo que aplique:

```text
Quiero trabajar en el paso [NÚMERO].
Tengo como contexto inicial: [breve descripción].
Ya cargué estos archivos o referencias: [archivos o "ninguno"].
Quiero que me guies para completar el paso, que me hagas las preguntas faltantes y que avances de forma iterativa hasta dejar un resultado listo para revisar.
```

### Ejemplos de inicio según escenario

#### Escenario 1: sabe exactamente qué paso quiere hacer

```text
Quiero trabajar en el paso 2.
Ya hice una recorrida general del proyecto y quiero documentar el stack tecnológico.
Recorre el proyecto, detecta las tecnologías y preguntame si son correctas antes de cerrar el resultado.
```

#### Escenario 2: tiene archivos ya cargados o identificados

```text
Quiero trabajar en el paso 5.
Ya cargué README, docker-compose.yml y unas notas internas de deployment.
Usa ese material como contexto inicial y después haceme solo las preguntas que falten para dejar documentado el setup y el despliegue.
```

#### Escenario 3: no sabe por dónde empezar

```text
Quiero trabajar en el paso 3 pero no sé bien por donde arrancar.
Guiame con un primer relevamiento, decime qué archivos te conviene revisar y empeza con preguntas cortas para destrabar el paso.
```

#### Escenario 4: quiere que el agente lo lleve con preguntas guiadas o formulario

```text
Quiero hacer el paso 1.
No tengo toda la información ordenada, así que prefiero que me guies con preguntas concretas o un formulario corto para ir completándolo.
```

#### Escenario 5: viene de otro chat o ya tiene trabajo previo

```text
Quiero continuar con el paso 8.
Ya tengo generados los resultados de los pasos 1 al 7 en la carpeta results.
Toma esos archivos como base y hagamos la consolidación de forma iterativa, sección por sección.
```

#### Escenario 6: quiere revisar o corregir un paso ya trabajado

```text
Quiero revisar el paso 4.
Ya tengo un borrador inicial, pero quiero que detectes huecos, inconsistencias, dudas pendientes y que me propongas cómo mejorarlo antes de generar la versión final.
```

#### Escenario 7: tiene información parcial y quiere que el agente complete el resto

```text
Quiero trabajar en el paso 6.
Ya sé cómo se manejan los accesos y las credenciales, pero no tengo tan claro el tema de backups y monitoreo.
Toma lo que sí conozco como punto de partida y ayudame a identificar lo que falta relevar.
```

### Recomendación para promptear mejor

Cuanto mejor sea el mensaje inicial, más fácil será que el agente arranque bien el paso. Siempre suma aclarar:

- qué paso se quiere trabajar;
- qué tanto conoce la persona sobre ese tema;
- si ya hay archivos cargados o no;
- si quiere preguntas guiadas, formulario, relevamiento automático o revisión de un borrador;
- si espera un primer análisis o directamente empezar a completar el resultado.

### Cómo responder al agente

El agente puede pedir información de distintas maneras:

- como preguntas abiertas en el chat;
- como formularios o preguntas estructuradas;
- como pedidos de archivos o contexto adicional.

Se puede responder en el formato que resulte más cómodo:

- texto libre;
- listas;
- tablas simples;
- respuestas cortas en formularios cuando aparezcan.

### Buenas prácticas durante la ejecución

- responder con información factual y concreta;
- si falta información, indicarlo claramente en vez de inventarla;
- apelar a la honestidad en los pasos que lo requieran y reflexionar sobre el proyecto en su completitud;
- adjuntar o señalar archivos útiles cuando el agente los pida;
- revisar el resultado generado al finalizar cada paso e iterarlo si hay puntos a corregir, completar o reformular;
- revisar cada salida antes de pasar al siguiente paso;
- referenciar pasos anteriores si el agente lo solicita o si se considera que es relevante para el paso actual;
- pedir al agente que revise o complemente respuestas anteriores si se considera que falta algo importante;
- pedir al agente que tome la iniciativa de preguntar lo que haga falta para completar un paso;
- ejecutar idealmente cada paso en una instancia nueva de chat para prevenir saturación de contexto;
- si una respuesta no convence, probar con otro modelo o aumentar el razonamiento antes de descartar el paso;
- ir commiteando los archivos generados en el repositorio principal a medida que se avanza;
- revisar siempre que no se suban credenciales, tokens ni archivos sensibles al repositorio;
- dejar que el agente gestione la memoria del proceso, pero recordándole los puntos importantes cuando sea necesario.

---

## 7. Detalle de los pasos de auditoría

### Mapa rápido de steps y resultados

| Paso | Step base                             | Resultado esperado                           |
| ---- | ------------------------------------- | -------------------------------------------- |
| 1    | `audit-01-general-team.md`            | `audit-01-general-team.result.md`            |
| 2    | `audit-02-tech-stack.md`              | `audit-02-tech-stack.result.md`              |
| 3    | `audit-03-repositories.md`            | `audit-03-repositories.result.md`            |
| 4    | `audit-04-infrastructure.md`          | `audit-04-infrastructure.result.md`          |
| 5    | `audit-05-environments-deployment.md` | `audit-05-environments-deployment.result.md` |
| 6    | `audit-06-security.md`                | `audit-06-security.result.md`                |
| 7    | `audit-07-management-support.md`      | `audit-07-management-support.result.md`      |
| 8    | `audit-08-conclusions.md`             | `audit-08-conclusions.result.md`             |
| 9    | `audit-09-confluence-sync.md`         | No ejecutar en este flujo                    |

### Consideraciones transversales para todos los pasos

- si la persona no sabe por dónde comenzar, pedir al agente que la ayude a iniciar ese paso con preguntas guía, un formulario o un primer relevamiento orientativo;
- si aparecen códigos, identificadores o datos que no se conocen, dejarlos explícitamente marcados como pendientes en lugar de inventarlos;
- revisar y, si hace falta, iterar el resultado de cada paso antes de continuar con el siguiente.

### Paso 1: Información general, equipo y stakeholders

Objetivo:

- relevar datos básicos del proyecto;
- identificar cliente, descripción, contexto de negocio;
- documentar composición del equipo y stakeholders.

Resultado esperado:

- archivo de salida con el relevamiento general del proyecto y del equipo.

Perfil recomendado:

- preferentemente alguien que conozca el proyecto;
- también puede llevarlo adelante alguien con contacto razonable con el cliente y contexto general del trabajo.

Consideraciones prácticas:

- es un buen paso para arrancar la auditoría;
- si se piden códigos o identificadores que no se conocen, dejarlos aclarados como pendientes;
- esos datos pueden completarse luego por Juan José Le Saint o por quien tenga la información correcta.

### Paso 2: Stack tecnológico

Objetivo:

- identificar tecnologías por capa;
- registrar versiones;
- validar estado de soporte cuando corresponda.

Resultado esperado:

- inventario técnico del stack usado por el proyecto.

Perfil recomendado:

- muy recomendable que valide este paso alguien con conocimiento técnico del proyecto.

Consideraciones prácticas:

- recorrer todo el proyecto para identificar las tecnologías involucradas, no solo una parte aislada del sistema;
- validar con la persona responsable si las tecnologías detectadas por el agente son correctas;
- usar el set de herramientas disponible para identificar versiones, frameworks, librerías y estado de soporte;
- cuanto mejor sea la recorrida técnica en este paso, mejor base va a tener toda la auditoría posterior.

### Paso 3: Repositorios y calidad del código

Objetivo:

- documentar repositorios y URLs;
- registrar estrategia de ramas, PRs y convenciones;
- dejar una evaluación honesta del estado general del código.

Resultado esperado:

- documento de repositorios y calidad de código.

Perfil recomendado:

- recomendable alguien con conocimiento técnico y experiencia real trabajando sobre el código.

Consideraciones prácticas:

- hacer una evaluación honesta, lo más honesta posible, del estado general del proyecto;
- mencionar cosas que no funcionan bien, zonas que cuesta entender, piezas que generan fricción al trabajar y secciones que quedaron en desuso pero siguen ensuciando la solución;
- cuando sume valor, referenciar archivos, módulos o sectores concretos del sistema;
- extenderse en todo lo que pueda ser útil como insumo para mejoras futuras.

### Paso 4: Infraestructura y arquitectura

Objetivo:

- relevar hosting, accesos, dominios y componentes principales;
- construir una representación de arquitectura cuando sea necesario.

Resultado esperado:

- documento de infraestructura y arquitectura.

Perfil recomendado:

- importante que este paso sea validado por alguien con conocimiento técnico.

Consideraciones prácticas:

- pedir una recorrida real del sistema y de su estructura técnica;
- si no existe una definición previa de arquitectura, construir un mapa durante este paso;
- cuando haga falta representar la arquitectura, priorizar Mermaid;
- validar que el mapa o la descripción reflejen lo que realmente existe hoy en el proyecto.

### Paso 5: Entornos y proceso de despliegue

Objetivo:

- identificar entornos disponibles;
- documentar setup local;
- describir el proceso de despliegue.

Resultado esperado:

- documento de entornos y deployment.

Perfil recomendado:

- requiere alguien con conocimiento técnico del proyecto.

Consideraciones prácticas:

- documentar cómo hacer un setup desde cero, pensando en una persona nueva en el proyecto;
- describir con claridad cómo se realiza un despliegue real, no uno idealizado;
- relevar prerrequisitos, comandos, pasos manuales, dependencias entre componentes y condiciones necesarias para que el sistema quede operativo.

### Paso 6: Seguridad

Objetivo:

- documentar manejo de credenciales;
- relevar backups, logs, monitoreo y prácticas de seguridad.

Resultado esperado:

- documento factual de seguridad.

Nota importante:

- nunca compartir secretos reales, tokens reales o contraseñas reales dentro de la auditoría.

Perfil recomendado:

- muy deseable alguien con conocimiento técnico;
- también ayuda alguien que conozca las políticas o prácticas reales del proyecto para backups, accesos y seguridad.

Consideraciones prácticas:

- relevar backups, credenciales, accesos, monitoreo, logs y políticas de seguridad vigentes;
- distinguir entre lo que está formalmente definido y lo que hoy se hace por práctica del equipo;
- documentar el estado real sin exponer información sensible.

### Paso 7: Gestión y soporte

Objetivo:

- documentar herramientas de gestión;
- registrar metodología de trabajo;
- relevar canales de soporte y estado de la documentación.

Resultado esperado:

- documento de gestión operativa y soporte.

Perfil recomendado:

- conviene que lo lidere alguien con conocimiento de la gestión del proyecto.

Consideraciones prácticas:

- registrar metodología, dinámica de trabajo, puntos de contacto y forma real de operar;
- si hace falta, apoyarse en Jira u otra herramienta de gestión para relevar el flujo actual;
- validar y completar todos los contactos relevantes del cliente y del equipo.

### Paso 8: Conclusiones finales

Objetivo:

- consolidar los resultados de los pasos 1 al 7;
- construir el análisis final del proyecto;
- generar conclusiones y priorizaciones.

Resultado esperado:

- documento final de conclusiones de auditoría.

Perfil recomendado:

- puede hacerlo la dupla completa o una sola persona, siempre que cubra adecuadamente la mirada técnica, de dominio y de gestión.

Consideraciones prácticas:

- tratarlo como un paso de consolidación real;
- ejecutar el análisis paso a paso, sin saltearse ninguna sección previa;
- apoyarse en lo producido en los pasos 1 al 7 y no inventar conclusiones sin base en la evidencia relevada.

### Paso 9: Sincronización con Confluence

Este paso no debe ejecutarse por el equipo que realiza la auditoría operativa.

Responsables habilitados para ejecutarlo:

- Juan José Le Saint - `juanjose.lesaint@diveria.com`
- Agustín Ignacio García - `agustin.garcia@diveria.com`

Indicación explícita:

- no correr el paso 9;
- no publicar resultados en Confluence por cuenta propia;
- dejar esa sincronización al equipo responsable.

---

## 8. Archivos de salida esperados

Los resultados deben quedar dentro de:

```text
.github/documentation/audit/results/
```

---

## 9. Cierre y entrega

Cuando la auditoría esté finalizada:

1. revisar que los pasos 1 al 8 tengan su archivo de resultado correspondiente;
2. comprimir la carpeta de resultados en un archivo `.rar`;
3. enviar ese `.rar` por mail a los responsables designados para recepcionarlo.

Antes de empaquetar y enviar, conviene dejar commiteados en el repositorio principal los archivos de auditoría generados, verificando nuevamente que no se hayan agregado credenciales o configuraciones sensibles.

Contenido mínimo a enviar:

- la carpeta de resultados de auditoría;
- cualquier nota complementaria que se desee anexar.

> [Placeholder imagen: carpeta `results` lista para comprimir y enviar]

---

## 10. Checklist rápido antes de empezar

- [ ] El proyecto está abierto en VS Code desde su carpeta raíz.
- [ ] La carpeta `.github` de auditoría ya fue copiada dentro del proyecto.
- [ ] La carpeta `.vscode` con `mcp.template.json` ya fue copiada dentro del proyecto.
- [ ] Node.js 22+ y npm están instalados.
- [ ] Docker está instalado y funcionando.
- [ ] Existe `.vscode/mcp.json` creado a partir del template.
- [ ] Context7 está configurado.
- [ ] PDF Reader está disponible en la configuración MCP.
- [ ] Atlassian está configurado si se va a consultar Jira o Confluence.
- [ ] GitHub Copilot está en modo Agent.
- [ ] El agente Auditoría está seleccionado.
- [ ] El modelo seleccionado es `GPT-5.4` con razonamiento en `High`.
- [ ] Está definida la/s persona/s que aportarán perfil técnico/dominio y gestión durante la auditoría.
- [ ] Está claro que solo se ejecutan los pasos 1 al 8.

## 11. Checklist rápido antes de entregar

- [ ] Los resultados están en `.github/documentation/audit/results/`.
- [ ] Los nombres de los archivos `.result.md` coinciden con los steps.
- [ ] Cada paso fue revisado y, si hacía falta, iterado antes de darse por cerrado.
- [ ] La carpeta de resultados ya fue comprimida en `.rar`.
- [ ] No se subieron credenciales ni archivos sensibles al repositorio.
- [ ] El envío por mail a responsables está listo.
