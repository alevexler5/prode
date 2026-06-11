---
applyTo: "**"
---

# Tech Stack

## Backend (.NET 8)

- **Framework**: ASP.NET Core Web API 8.0+
- **ORM**: Entity Framework Core 8.0+ con Npgsql
- **Mapping**: AutoMapper 13+ para Entity ↔ DTO
- **Validación**: FluentValidation 11+ para DTOs
- **Documentación**: Swashbuckle (Swagger) 6.5+
- **Testing**: xUnit + Moq + FluentAssertions

## Frontend (React 18 + JavaScriptcript)

- **Build**: Vite 5.4+
- **Framework UI**: React 18.3+ con JavaScriptcript 5.5+
- **Estilos**: Tailwind CSS 4+ (sin config, todo en CSS)
- **Componentes**: Flowbite React 0.12+
- **Estado**: TanStack Query 5+ (servidor) + Zustand 4+ (global)
- **HTTP**: Axios 1.7+
- **Validación**: Zod 3+
- **Routing**: React Router DOM 6+

## Database

- **RDBMS**: PostgreSQL 16+ en Docker
- **Gestión**: Entity Framework Core Code First
- **Migraciones**: Timestamp automático + documentación
- **Container**: Docker Compose con health checks y persistencia

## MCP (Model Context Protocol)

- **GitLab**: @zereight/mcp-gitlab (API v4) - Gestión de proyectos, merge requests, issues y repositorios
- **Atlassian**: mcp-atlassian (Jira + Confluence) - Gestión de tickets, sprints y documentación colaborativa
- **Context7**: @upstash/context7-mcp - Documentación actualizada de librerías y frameworks
- **PDF Reader**: @sylphx/pdf-reader-mcp - Lectura y extracción de contenido de archivos PDF

📖 **Documentación completa**: `.github/documentation/{backend,frontend,database}.md`
