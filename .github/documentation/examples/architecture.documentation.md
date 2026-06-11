---
applyTo: "**"
---

# Arquitectura

Proyecto full stack con **Clean Architecture** y **Feature-Based Organization**, optimizado para IA.

## Estructura General

```
ai-baseproject-template/
├── backend/
│   ├── Backend/              # API .NET 8
│   │   ├── Features/         # Módulos de negocio
│   │   │   └── [nombre]/     # Controllers, Services, Repositories, DTOs, Validators, Mappers
│   │   └── Core/             # Compartido (Database, Middleware, Common)
│   └── Backend.Tests/        # xUnit tests
│
├── frontend/
│   └── src/
│       ├── features/         # Módulos de negocio
│       │   └── [nombre]/     # pages, components, hooks, services, models
│       └── core/             # Compartido (components, layouts, hooks, utils, services)
│
└── .github/
    ├── documentation/       # Guías técnicas completas
    ├── prompts/             # Prompts de GitHub Copilot
    └── instructions/        # Contexto automático para Copilot
```

## Principios Arquitectónicos

### Regla de Dependencias

- `Features → Core → Libraries`
- Features NO se conocen entre sí
- Core NO conoce Features
- Cada Feature es autónomo

### Backend: Controller → Service → Repository

```
Request → Controller (valida) → Service (lógica) → Repository (datos) → Database
       ← Response ← DTO ← Entity ← Query ←
```

### Frontend: Page → Hook → Service

```
Page (UI) → Hook (lógica + state) → Service (API) → Backend
         ← componentes ← datos ←
```

## Convenciones

### Nomenclatura

- **Backend**: `PascalCase` (archivos), `camelCase` (métodos), `IInterface` (interfaces)
- **Frontend**: `PascalCase` (componentes/pages), `camelCase` (hooks/utils), `use` prefix (hooks)
- **Rutas API**: `/api/[feature]/[action]` (kebab-case)

### Organización

- **Backend Features**: Controllers/ Services/ Repositories/ Models/ DTOs/ Validators/ Mappers/
- **Frontend Features**: pages/ components/ hooks/ services/ models/ utils/
- **Compartir código**: Solo mediante `core/`, nunca entre features

### Base de Datos

- **Migraciones**: Formato `YYYYMMDDHHMMSS_NombreDescriptivo`
- **Documentación**: Automática en `database-changelog.md`
- **Entidades**: Inherit `BaseEntity` (Id, CreatedAt, UpdatedAt)

📖 **Docs**: `.github/documentation/` · **Prompts**: `.github/prompts/`
