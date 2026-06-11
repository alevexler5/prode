# Template y Ejemplo de Caso de Uso

Este archivo sirve como referencia para el agente `FunctionalAnalyst`.

- La primera parte contiene el **template base**.
- La segunda parte contiene un **ejemplo completo** con el mismo formato.
- El template puede adaptarse por proyecto, pero conviene conservar la estructura general mientras no exista otra convención validada.

---

## Template Base

```markdown
# Caso de Uso - [CODIGO] - [Nombre del Caso de Uso]

**Basado en Plantilla DVR-RG-012-Caso de Uso v1.1**

---

## Historial de Cambios

| Fecha | Version | Descripcion | Autor |
| ----- | ------- | ----------- | ----- |
|       | 1.0     |             |       |

---

## 1. RESUMEN EJECUTIVO

| Campo              | Descripcion |
| ------------------ | ----------- |
| **Codigo**         |             |
| **Nombre**         |             |
| **Paquete/Modulo** |             |
| **Objetivo**       |             |
| **Frecuencia**     |             |
| **Importancia**    |             |
| **Prioridad**      |             |
| **Dificultad**     |             |
| **Observaciones**  |             |

### Tipo de Asociacion Casos de Uso

| Tipo de Asociacion | Casos de Uso |
| ------------------ | ------------ |
| **Extiende a:**    |              |
| **Incluye a:**     |              |
| **Hereda de:**     |              |
| **Extendido por:** |              |
| **Incluido por:**  |              |

### Temas Pendientes

| Responsable | Descripcion | Fecha de inicio | Fecha de fin |
| ----------- | ----------- | --------------- | ------------ |
|             |             |                 |              |

---

## 2. ESPECIFICACION DEL CASO DE USO

### 2.1 Actores

| Nombre | Descripcion breve |
| ------ | ----------------- |
|        |                   |

**Precondicion:**

**Comentario:**

---

### 2.2 Curso Normal

| Paso | Descripcion | Referencias |
| ---- | ----------- | ----------- |
| 1    |             |             |
| 2    |             |             |
| 3    |             |             |

**Poscondicion:**

**Comentario:**

---

### 2.3 Subflujos

#### Sf001: <NOMBRE_SUBFLUJO>

| N° Paso | Descripcion | Referencias |
| ------- | ----------- | ----------- |
|         |             |             |

#### Sf002: <NOMBRE_SUBFLUJO>

| N° Paso | Descripcion | Referencias |
| ------- | ----------- | ----------- |
|         |             |             |

---

### 2.4 Cursos Excepcionales

#### Ex001: <NOMBRE_CURSO_EXCEPCIONAL>

| N° Paso | Descripcion | Referencias |
| ------- | ----------- | ----------- |
|         |             |             |

#### Ex002: <NOMBRE_CURSO_EXCEPCIONAL>

| N° Paso | Descripcion | Referencias |
| ------- | ----------- | ----------- |
|         |             |             |

---

## 3. CONSIDERACIONES DE DISEÑO

| Consid. | Nombre | Descripcion |
| ------- | ------ | ----------- |
| <DIXXX> |        |             |

---

## 4. REGLAS DE NEGOCIO

| Regla   | Nombre | Descripcion |
| ------- | ------ | ----------- |
| <REXXX> |        |             |

---

## 5. OBSERVACIONES

**Descripcion:**

---

## 6. NOTAS DE TESTING

| Tipo | Escenarios a validar | Datos / Observaciones |
| ---- | -------------------- | --------------------- |
| Funcional | | |
| Validaciones | | |
| Errores / Excepciones | | |
| Permisos / Roles | | |

---

## 7. INTERFACES ASOCIADAS

| Interfaz | Descripcion |
| -------- | ----------- |
| <INTXXX> |             |

> Placeholder de imagen sugerido:
>
> `![Descripcion de la interfaz](assets/images/[CODIGO]-[nombre-descriptivo].png)`

---

## 8. ARCHIVOS ASOCIADOS

| Archivo          | Descripcion | Referencia |
| ---------------- | ----------- | ---------- |
| <NOMBRE_ARCHIVO> |             |            |

---

**Informacion Confidencial - Copia Impresa no valida**
```

---

## Ejemplo Completo

```markdown
# Caso de Uso - CUB001 - Crear Sucursal

**Basado en Plantilla DVR-RG-012-Caso de Uso v1.1**

---

## Historial de Cambios

| Fecha | Version | Descripcion | Autor |
| ----- | ------- | ----------- | ----- |
| 2026-04-21 | 1.0 | Alta inicial del caso de uso | Equipo Funcional |

---

## 1. RESUMEN EJECUTIVO

| Campo              | Descripcion |
| ------------------ | ----------- |
| **Codigo**         | CUB001 |
| **Nombre**         | Crear Sucursal |
| **Paquete/Modulo** | Backoffice |
| **Objetivo**       | Permitir que un administrador registre una nueva sucursal operativa con sus datos principales y configuración inicial. |
| **Frecuencia**     | Baja a media |
| **Importancia**    | Alta |
| **Prioridad**      | Alta |
| **Dificultad**     | Media |
| **Observaciones**  | El alta requiere validar unicidad de codigo interno y consistencia de datos de contacto y dirección. |

### Tipo de Asociacion Casos de Uso

| Tipo de Asociacion | Casos de Uso |
| ------------------ | ------------ |
| **Extiende a:**    | Ninguno |
| **Incluye a:**     | CUADM005 - Consultar Localidades |
| **Hereda de:**     | Ninguno |
| **Extendido por:** | Ninguno |
| **Incluido por:**  | Ninguno |

### Temas Pendientes

| Responsable | Descripcion | Fecha de inicio | Fecha de fin |
| ----------- | ----------- | --------------- | ------------ |
| Negocio | Confirmar si la sucursal puede quedar operativa sin responsable asignado. | 2026-04-21 | |

---

## 2. ESPECIFICACION DEL CASO DE USO

### 2.1 Actores

| Nombre | Descripcion breve |
| ------ | ----------------- |
| Administrador de Backoffice | Usuario con permisos para crear y configurar sucursales. |
| Responsable de Operaciones | Actor consultado para validar datos operativos de la nueva sucursal. |

**Precondicion:**

1. El Administrador de Backoffice inicio sesión correctamente.
2. El usuario posee permiso de alta de sucursales.
3. Existen localidades cargadas para asociar a la sucursal.

**Comentario:**

La asignación del Responsable de Operaciones puede ser obligatoria o diferida según la política vigente del proyecto.

---

### 2.2 Curso Normal

| Paso | Descripcion | Referencias |
| ---- | ----------- | ----------- |
| 1 | El Administrador de Backoffice accede a la opción de alta de sucursal. | |
| 2 | El sistema presenta el formulario de creación con campos obligatorios y opcionales. | |
| 3 | El actor completa código interno, nombre, dirección, localidad, email, teléfono y estado inicial. | RN001, RN002 |
| 4 | El actor solicita guardar la sucursal. | |
| 5 | El sistema valida obligatoriedad, formato de datos y unicidad del código interno. | Sf001, RN001, RN003 |
| 6 | El sistema registra la sucursal y deja trazabilidad del alta. | RN004 |
| 7 | El sistema confirma el alta y muestra el resumen de la nueva sucursal. | |

**Poscondicion:**

1. La nueva sucursal queda registrada con identificador único.
2. La operación queda auditada con usuario y fecha de alta.

**Comentario:**

Si la política del negocio lo permite, la sucursal puede quedar en estado borrador hasta completar datos operativos pendientes.

---

### 2.3 Subflujos

#### Sf001: Validacion de datos de alta

| N° Paso | Descripcion | Referencias |
| ------- | ----------- | ----------- |
| 1 | El sistema verifica que los campos obligatorios tengan valor. | RN001 |
| 2 | El sistema valida formato de email y teléfono si fueron informados. | RN002 |
| 3 | El sistema consulta si el código interno ya existe. | RN003 |
| 4 | Si todas las validaciones son correctas, el flujo retorna al paso 6 del curso normal. | |

#### Sf002: Asignacion posterior de responsable

| N° Paso | Descripcion | Referencias |
| ------- | ----------- | ----------- |
| 1 | El sistema registra la sucursal sin responsable asignado. | RN005 |
| 2 | El sistema marca la sucursal con seguimiento pendiente. | |

---

### 2.4 Cursos Excepcionales

#### Ex001: Codigo interno duplicado

| N° Paso | Descripcion | Referencias |
| ------- | ----------- | ----------- |
| 1 | En el paso 5 del curso normal, el sistema detecta que el código interno ya existe. | RN003 |
| 2 | El sistema informa el error y solicita corregir el dato. | |
| 3 | El flujo vuelve al paso 3 del curso normal. | |

#### Ex002: Datos incompletos o invalidos

| N° Paso | Descripcion | Referencias |
| ------- | ----------- | ----------- |
| 1 | En el paso 5 del curso normal, el sistema detecta campos obligatorios vacíos o formatos inválidos. | RN001, RN002 |
| 2 | El sistema muestra mensajes de validación asociados a cada campo. | |
| 3 | El flujo vuelve al paso 3 del curso normal. | |

---

## 3. CONSIDERACIONES DE DISEÑO

| Consid. | Nombre | Descripcion |
| ------- | ------ | ----------- |
| DI001 | Validaciones inmediatas | Las validaciones de formato deben resolverse en pantalla antes del envío final para reducir errores evitables. |
| DI002 | Trazabilidad de alta | Debe persistirse usuario creador, fecha y origen de la operación para auditoría. |

---

## 4. REGLAS DE NEGOCIO

| Regla   | Nombre | Descripcion |
| ------- | ------ | ----------- |
| RN001 | Campos obligatorios | Código interno, nombre, localidad y estado inicial son obligatorios para crear una sucursal. |
| RN002 | Validación de contacto | Email y teléfono deben respetar formato válido si se informan. |
| RN003 | Unicidad de código interno | No puede existir más de una sucursal con el mismo código interno. |
| RN004 | Auditoría obligatoria | Toda alta debe registrar usuario, fecha y canal de origen. |
| RN005 | Responsable diferido | Si la política operativa lo permite, la sucursal puede crearse sin responsable asignado y quedar con seguimiento pendiente. |

---

## 5. OBSERVACIONES

**Descripcion:**

Este caso de uso debe revisarse junto con la política de activación de sucursales para confirmar si el estado inicial por defecto es "Borrador" o "Activa".

---

## 6. NOTAS DE TESTING

| Tipo | Escenarios a validar | Datos / Observaciones |
| ---- | -------------------- | --------------------- |
| Funcional | Alta exitosa con datos completos. Alta exitosa sin responsable si la regla RN005 está habilitada. | Validar persistencia y mensaje final. |
| Validaciones | Campos obligatorios vacíos, email inválido, teléfono inválido, localidad inexistente. | Verificar mensajes por campo y bloqueo de guardado. |
| Errores / Excepciones | Código interno duplicado, error de persistencia, falta de permisos. | Confirmar comportamiento esperado y trazabilidad del incidente. |
| Permisos / Roles | Usuario con permiso de alta vs usuario sin permiso. | Verificar visibilidad de la opción y respuesta del sistema. |

---

## 7. INTERFACES ASOCIADAS

| Interfaz | Descripcion |
| -------- | ----------- |
| INT001 | Pantalla de alta de sucursal en Backoffice. |
| INT002 | Modal o selector de localidades para completar la dirección. |

> Placeholder de imagen sugerido:
>
> `![Pantalla de alta de sucursal](assets/images/CUB001-crear-sucursal.png)`

---

## 8. ARCHIVOS ASOCIADOS

| Archivo | Descripcion | Referencia |
| ------- | ----------- | ---------- |
| Transcripcion-reunion-alta-sucursal.md | Resumen de la reunión de relevamiento funcional. | Material fuente |
| Mockup-alta-sucursal.png | Mockup preliminar de la pantalla de alta. | Evidencia visual |

---

**Informacion Confidencial - Copia Impresa no valida**
```