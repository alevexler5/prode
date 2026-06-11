# Auditoría: Seguridad

> 📋 **Objetivo**: Documentar gestión de credenciales, copias de seguridad, logs, monitoreo y prácticas de seguridad del proyecto.

> ⚠️ **CRÍTICO**: NO expongas credenciales reales, contraseñas o tokens. Solo documenta dónde están, quién tiene acceso y cómo solicitarlas.

---

## ❓ Preguntas Específicas

### 🔐 Gestión de Credenciales

> **Objetivo**: Documentar cómo se gestionan, almacenan y acceden las credenciales del proyecto.

#### 1. **Inventario de Credenciales**

¿Qué tipos de credenciales utiliza el proyecto?

| Tipo de Credencial                | Para qué se usa           | Quién necesita acceso  |
| --------------------------------- | ------------------------- | ---------------------- |
| [BD Producción]                   | [Conexión a BD principal] | [Backend/Devs seniors] |
| [API Keys externas]               | [Servicios de terceros]   | [Backend/Todos]        |
| [Secrets de deployment]           | [CI/CD, deployment]       | [DevOps/Tech Lead]     |
| [Credenciales de servicios cloud] | [AWS/Azure/GCP]           | [DevOps/Infra]         |
| [Certificados SSL]                | [HTTPS]                   | [DevOps/Infra]         |
| [...]                             | [...]                     | [...]                  |

---

#### 2. **Almacenamiento de Credenciales**

¿Cómo se almacenan las credenciales en cada entorno?

**Desarrollo Local**:

- [ ] Archivo `.env` local (no versionado en Git)
- [ ] Variables de entorno del sistema operativo
- [ ] Herramienta de secrets local (ej: dotenv-vault)
- [ ] Hardcoded en código (⚠️ mala práctica)
- [ ] Otro: [Especificar]

**Staging/Producción**:

- [ ] Variables de entorno en servidor
- [ ] Secrets Manager (AWS Secrets Manager, Azure Key Vault, Google Secret Manager)
- [ ] Gestores de secrets (HashiCorp Vault, Doppler, etc.)
- [ ] Archivos de configuración en servidor (protegidos)
- [ ] Hardcoded en código (⚠️ mala práctica)
- [ ] Panel de control del hosting
- [ ] Otro: [Especificar]

**Describe el método actual por entorno**:

---

#### 3. **Acceso a Credenciales**

**Para Desarrollo Local**:

- ¿Cómo obtiene un desarrollador nuevo las credenciales necesarias para trabajar?
- ¿A quién debe solicitarlas?
- ¿Hay un documento/canal donde estén listadas? (sin las credenciales reales, solo los nombres)
- ¿Cuánto tiempo toma obtenerlas?

**Para Deployment/Producción**:

- ¿Quién tiene acceso a las credenciales de producción?
- ¿Cómo se otorga/revoca acceso?
- ¿Hay un proceso de aprobación?

**Describe el proceso actual**:

---

#### 4. **Rotación de Credenciales**

- ¿Se rotan las credenciales periódicamente?

  - Sí, hay política de rotación (cada X meses)
  - Solo cuando hay cambios de personal
  - Solo cuando hay incidentes de seguridad
  - No se rotan

- Si se rotan:
  - ¿Qué credenciales se rotan?
  - ¿Con qué frecuencia?
  - ¿Quién es responsable?
  - ¿Hay alertas de expiración?

**Estado de rotación de credenciales**:

---

#### 5. **Credenciales en Control de Versiones**

- ¿Se ha verificado que NO haya credenciales en el repositorio?

  - Sí, el repositorio está limpio
  - Se encontraron credenciales en commits antiguos (pero se rotaron)
  - No se ha verificado
  - Se encontraron credenciales y AÚN están activas (⚠️ riesgo crítico)

- ¿Se utiliza `.gitignore` para prevenir commits de archivos con credenciales?
  - Sí, está configurado correctamente
  - Está configurado pero incompleto
  - No existe `.gitignore`

**Estado del repositorio**:

---

### 💾 Copias de Seguridad (Backups)

> **Objetivo**: Documentar la estrategia de backups de datos, código y archivos del sistema.

#### 6. **Backups de Base de Datos**

**¿Se realizan backups de la BD?**

- Sí, automáticos
- Sí, manuales
- No se realizan backups (⚠️ riesgo crítico)

Si se realizan:

| Aspecto                | Detalle                                            |
| ---------------------- | -------------------------------------------------- |
| **Frecuencia**         | [Diaria/Semanal/Mensual/Otra]                      |
| **Tipo**               | [Completo/Incremental/Diferencial]                 |
| **Herramienta**        | [mysqldump/pg_dump/Servicio cloud/Otra]            |
| **Ubicación**          | [Dónde se almacenan - sin exponer paths sensibles] |
| **Retención**          | [Cuánto tiempo se guardan]                         |
| **Encriptación**       | [Sí/No]                                            |
| **Quién tiene acceso** | [Roles/personas]                                   |

**Última vez que se verificó un backup** (test de restore):

- Se hizo test de restore: [Fecha]
- Nunca se ha probado restaurar un backup (⚠️ riesgo)
- No aplica (no hay backups)

---

#### 7. **Backups de Código/Repositorios**

**¿Cómo se respalda el código?**

- [ ] Git en plataforma cloud (GitHub/GitLab/Bitbucket) → Automáticamente respaldado
- [ ] Git en servidor propio → ¿Hay mirror/backup del servidor?
- [ ] Backups manuales del repositorio
- [ ] No hay backups del código (⚠️ riesgo)

**Si es servidor propio con Git**:

- ¿Se hace mirror a otra ubicación?
- ¿Con qué frecuencia?

**Estado de backups de código**:

---

#### 8. **Backups de Archivos/Assets del Sistema**

¿El sistema tiene archivos subidos por usuarios o assets importantes? (uploads, documentos, imágenes, etc.)

- Sí → ¿Se respaldan?
- No → Skip esta sección

Si sí:

| Aspecto                  | Detalle                                         |
| ------------------------ | ----------------------------------------------- |
| **Tipo de archivos**     | [Uploads de usuarios/Documentos/Imágenes/Otros] |
| **Ubicación**            | [Servidor/S3/Azure Blob/Otro]                   |
| **¿Se respaldan?**       | [Sí/No]                                         |
| **Frecuencia**           | [Diaria/Semanal/Otra]                           |
| **Ubicación del backup** | [Dónde]                                         |
| **Retención**            | [Cuánto tiempo]                                 |

---

#### 9. **Proceso de Recuperación (Disaster Recovery)**

- ¿Existe un plan documentado de recuperación ante desastres?
  - Sí, documentado y probado
  - Sí, documentado pero nunca probado
  - No hay plan formal
- Si hay plan:
  - ¿Cuánto tiempo tomaría restaurar el sistema completo desde backups?
  - ¿Quién es responsable de ejecutar el proceso?
  - ¿Se ha practicado alguna vez?

**Estado de disaster recovery**:

---

### 📊 Logs y Monitoreo

> **Objetivo**: Documentar qué se loguea, dónde están los logs, monitoreo activo y retención.

#### 10. **Logging del Sistema**

**¿El sistema genera logs?**

- Sí, completos (aplicación, servidor web, sistema operativo)
- Sí, solo de la aplicación
- Sí, pero mínimos
- No genera logs (⚠️ problema para debugging)

**¿Qué se loguea?**

| Tipo de Log           | ¿Se loguea? | Nivel         | Ejemplo                         |
| --------------------- | ----------- | ------------- | ------------------------------- |
| Errores de aplicación | [Sí/No]     | [ERROR/FATAL] | [Excepciones, crashes]          |
| Warnings              | [Sí/No]     | [WARN]        | [Operaciones sospechosas]       |
| Información general   | [Sí/No]     | [INFO]        | [Inicio de servicios, requests] |
| Debug                 | [Sí/No]     | [DEBUG]       | [Flujo detallado]               |
| Accesos de usuarios   | [Sí/No]     | [INFO]        | [Login, logout, acciones]       |
| Queries a BD          | [Sí/No]     | [DEBUG]       | [SQL ejecutado]                 |
| Peticiones HTTP       | [Sí/No]     | [INFO]        | [Requests entrantes]            |

---

#### 11. **Ubicación y Acceso a Logs**

**¿Dónde se almacenan los logs?**

**Logs de Aplicación**:

- [ ] Archivos en servidor (ej: `/var/log/app/`)
- [ ] Servicio de logging cloud (CloudWatch, Azure Monitor, Google Cloud Logging)
- [ ] Plataforma de logging (Datadog, Splunk, ELK Stack, Graylog)
- [ ] Consola/stdout (en contenedores)
- [ ] No se almacenan

**Logs de Servidor Web** (Nginx, Apache, IIS):

- [ ] Archivos en servidor
- [ ] Servicio cloud
- [ ] No se almacenan

**Logs de Base de Datos**:

- [ ] Archivos en servidor BD
- [ ] Servicio cloud
- [ ] No se almacenan

**¿Quién tiene acceso a los logs?**

- [Roles/personas que pueden consultar logs]

**¿Cómo se accede a los logs?**

- [SSH al servidor / Dashboard web / CLI / Otro]

---

#### 12. **Retención de Logs**

**¿Cuánto tiempo se conservan los logs?**

| Tipo de Log        | Tiempo de Retención                       |
| ------------------ | ----------------------------------------- |
| Logs de aplicación | [7 días/30 días/90 días/1 año/Indefinido] |
| Logs de acceso     | [Tiempo]                                  |
| Logs de errores    | [Tiempo]                                  |
| Logs de BD         | [Tiempo]                                  |

**¿Se hace rotación de logs?**

- Sí, automática
- Manual
- No se hace (⚠️ puede llenar disco)

---

#### 13. **Monitoreo Activo**

**¿Se monitorea el sistema activamente?**

- Sí, con alertas configuradas
- Sí, pero sin alertas (solo revisión manual)
- No hay monitoreo (⚠️ no se detectan problemas proactivamente)

**Si hay monitoreo, ¿qué se monitorea?**

| Métrica                       | Herramienta                         | Alerta Configurada |
| ----------------------------- | ----------------------------------- | ------------------ |
| Uptime (sistema arriba/abajo) | [UptimeRobot/Pingdom/Custom]        | [Sí/No]            |
| Uso de CPU/RAM                | [Datadog/New Relic/CloudWatch/Otro] | [Sí/No]            |
| Uso de disco                  | [Herramienta]                       | [Sí/No]            |
| Tiempo de respuesta           | [Herramienta]                       | [Sí/No]            |
| Tasa de errores (4xx, 5xx)    | [Herramienta]                       | [Sí/No]            |
| Conexiones a BD               | [Herramienta]                       | [Sí/No]            |
| Colas/Jobs pendientes         | [Herramienta]                       | [Sí/No]            |

**¿A quién llegan las alertas?**

- [Email/Slack/SMS/PagerDuty - A quién]

---

#### 14. **Información Sensible en Logs**

⚠️ **Verificación de seguridad importante**:

- ¿Se loguean contraseñas o tokens? (NO debería)

  - No, están filtrados/enmascarados
  - Sí, se loguean (⚠️ riesgo crítico)
  - No se ha verificado

- ¿Se loguea información personal sensible (PII)? (emails, nombres, direcciones, etc.)
  - No se loguea PII
  - Se loguea pero enmascarada
  - Se loguea sin enmascarar (⚠️ problema de compliance/GDPR)

**Estado de información sensible en logs**:

---

### 🔒 Seguridad General del Sistema

> **Objetivo**: Documentar otras prácticas de seguridad del proyecto.

#### 15. **SSL/TLS y HTTPS**

- ¿El sistema usa HTTPS?

  - Sí, 100% HTTPS
  - Sí, pero hay partes en HTTP
  - No usa HTTPS (⚠️ riesgo)

- Si usa HTTPS:
  - Tipo de certificado: [Let's Encrypt/Pago/Cloud provider]
  - ¿Quién gestiona la renovación?
  - ¿Hay alertas de expiración?
  - Última renovación: [Fecha]

**Estado de SSL/TLS**: [Ya cubierto en Prompt 4 - referenciar]

---

#### 16. **Autenticación y Autorización**

**Autenticación (¿cómo se verifica la identidad?)**:

- [ ] Usuario y contraseña
- [ ] OAuth 2.0 / OpenID Connect
- [ ] Single Sign-On (SSO)
- [ ] Multi-Factor Authentication (MFA/2FA)
- [ ] Tokens JWT
- [ ] API Keys
- [ ] Otro: [Especificar]

**Autorización (¿cómo se gestionan permisos?)**:

- [ ] Roles y permisos (RBAC)
- [ ] ACL (Access Control Lists)
- [ ] Todo usuario tiene los mismos permisos
- [ ] No hay sistema de autorización formal

**¿Las contraseñas se almacenan hasheadas?**

- Sí, con algoritmo seguro (bcrypt, Argon2, etc.)
- Sí, pero con algoritmo débil (MD5, SHA1 - ⚠️ inseguro)
- No sé
- Se almacenan en texto plano (⚠️ riesgo crítico)

**Describe el sistema de autenticación/autorización**:

---

#### 17. **Seguridad de APIs**

Si el proyecto tiene APIs:

**¿Cómo se protegen las APIs?**

- [ ] API Keys
- [ ] Tokens JWT
- [ ] OAuth 2.0
- [ ] Rate limiting
- [ ] No tienen protección (⚠️ riesgo)

**CORS (Cross-Origin Resource Sharing)**:

- [ ] Configurado correctamente (solo orígenes permitidos)
- [ ] Configurado pero permite todos los orígenes (`*`) (⚠️ riesgo)
- [ ] No está configurado
- [ ] No aplica (no hay frontend externo)

**Validación de input**:

- [ ] Se valida todo input del usuario
- [ ] Se valida parcialmente
- [ ] No se valida (⚠️ riesgo de inyección)

**Estado de seguridad de APIs**:

---

#### 18. **Vulnerabilidades Conocidas**

- ¿Se han realizado auditorías de seguridad o pentesting?

  - Sí, recientemente (última: [Fecha])
  - Sí, hace tiempo
  - Nunca

- ¿Existen vulnerabilidades conocidas sin resolver?

  - No
  - Sí, pero son de baja prioridad
  - Sí, algunas críticas pendientes (⚠️)

- ¿Se escanean las dependencias en busca de vulnerabilidades?
  - Sí, automáticamente (Dependabot, Snyk, etc.)
  - Sí, manualmente
  - No se escanean

**Estado de vulnerabilidades**:

---

#### 19. **Actualizaciones de Seguridad**

- ¿Cómo se gestionan las actualizaciones de seguridad de dependencias?

  - Hay proceso automático o regular
  - Se actualizan cuando hay tiempo
  - No se actualizan regularmente (⚠️ riesgo)

- ¿Cuándo fue la última actualización de dependencias críticas?
  - [Fecha aproximada]

**Proceso de actualizaciones**:

---

#### 20. **Compliance y Regulaciones**

¿El sistema debe cumplir con alguna regulación o estándar?

- [ ] GDPR (General Data Protection Regulation)
- [ ] HIPAA (datos de salud)
- [ ] PCI-DSS (datos de tarjetas de crédito)
- [ ] SOC 2
- [ ] ISO 27001
- [ ] Regulaciones locales específicas
- [ ] No aplica ninguna regulación específica

Si aplica:

- ¿El sistema cumple actualmente?
  - Sí, completamente
  - Parcialmente
  - No se ha verificado
  - No cumple (⚠️)

**Estado de compliance**:

---

#### 21. **Incidentes de Seguridad Previos**

- ¿Ha habido incidentes de seguridad en el proyecto?

  - No, nunca
  - Sí, incidentes menores (describir sin detalles sensibles)
  - Sí, incidentes críticos (describir sin detalles sensibles)

- Si hubo incidentes:
  - ¿Cómo se manejaron?
  - ¿Se documentó el post-mortem?
  - ¿Se implementaron mejoras para prevenir recurrencia?

**Historial de incidentes** (general, sin exponer detalles sensibles):

---

## 🔄 Proceso de Iteración y Validación

### Fase 0: Contexto Inicial

1. Analizar contexto inicial y nivel de madurez de seguridad
2. Adaptar preguntas según el contexto

### Fase 1: Recolección

3. Recopilar respuestas (preguntas 1-21)
4. **VERIFICAR que NO se expongan credenciales reales**
5. Identificar gaps críticos

### Fase 2: Validación

6. Presentar resumen con aspectos importantes y ⚠️ riesgos identificados
7. Solicitar validación adicional

### Fase 3: Refinamiento

8. Completar información faltante
9. Confirmar accesos y ubicaciones

### Fase 4: Resumen Pre-Generación

10. Generar resumen ejecutivo
11. Solicitar confirmación final

### Fase 5: Generación

12. Generar documento markdown
13. **VERIFICAR que NO haya credenciales expuestas**
14. **NO incluir recomendaciones** - solo documentar estado actual

---

## 📄 Output Esperado

Genera un documento markdown con esta estructura:

```markdown
# Seguridad

## Resumen Ejecutivo

[Resumen del estado de seguridad, credenciales, backups y logging]

## 🔐 Gestión de Credenciales

- Inventario (tabla)
- Almacenamiento por entorno
- Proceso de acceso
- Rotación
- Estado del repositorio

## 💾 Copias de Seguridad

- Backups de BD (tabla con frecuencia, ubicación, retención)
- Backups de código
- Backups de archivos
- Disaster recovery

## 📊 Logs y Monitoreo

- Qué se loguea (tabla)
- Ubicación y acceso
- Retención
- Monitoreo activo (tabla de métricas)
- Información sensible

## 🔒 Seguridad General

- SSL/TLS
- Autenticación/Autorización
- Seguridad de APIs
- Vulnerabilidades
- Actualizaciones
- Compliance
- Incidentes previos

## 📝 Notas Adicionales

[Observaciones relevantes]

> ⚠️ Este documento NO contiene credenciales reales.
```

---

## 📌 Recordatorios

- ✅ **NUNCA exponer credenciales, contraseñas o tokens reales**
- ✅ Solo documentar QUÉ credenciales existen, DÓNDE están y CÓMO obtenerlas
- ✅ No todas las preguntas aplicarán a todos los proyectos
- ✅ Marcar claramente riesgos críticos con ⚠️ pero SIN proponer soluciones
- ✅ **ENFOCARSE en documentar** el estado actual de seguridad
- ✅ **NO incluir recomendaciones de mejora**
