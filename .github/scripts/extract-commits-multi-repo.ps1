#Requires -Version 5.1

<#
.SYNOPSIS
    Extrae commits de múltiples repositorios git en un rango de fechas.

.DESCRIPTION
    Este script recorre una carpeta que contiene repositorios git y extrae 
    los commits de un usuario específico en un rango de fechas definido.
    Genera un archivo consolidado con información de todos los commits.

.PARAMETER RootPath
    Ruta de la carpeta que contiene los repositorios git.
    Por defecto: carpeta actual

.PARAMETER UserEmail
    Email del usuario para filtrar commits.
    Por defecto: email configurado en git global

.PARAMETER Since
    Fecha desde la cual buscar commits.
    Formato: YYYY-MM-DD
    Por defecto: hace 7 días

.PARAMETER Until
    Fecha hasta la cual buscar commits.
    Formato: YYYY-MM-DD
    Por defecto: hoy

.PARAMETER OutputFile
    Nombre del archivo de salida.
    Por defecto: commits-multi-repo-[fechas].txt

.EXAMPLE
    .\extract-commits-multi-repo.ps1 -RootPath "C:\Work\Optimi" -Since "2025-12-01" -Until "2025-12-26"

.EXAMPLE
    .\extract-commits-multi-repo.ps1 -UserEmail "mi.email@example.com" -Since "2025-12-17"
#>

param(
    [Parameter(Mandatory=$false)]
    [string]$RootPath = (Get-Location).Path,
    
    [Parameter(Mandatory=$false)]
    [string]$UserEmail = "",
    
    [Parameter(Mandatory=$false)]
    [string]$Since = (Get-Date).AddDays(-7).ToString("yyyy-MM-dd"),
    
    [Parameter(Mandatory=$false)]
    [string]$Until = (Get-Date).ToString("yyyy-MM-dd"),
    
    [Parameter(Mandatory=$false)]
    [string]$OutputFile = ""
)

# Función para verificar si una carpeta es un repositorio git
function Test-GitRepository {
    param([string]$Path)
    
    return Test-Path (Join-Path $Path ".git")
}

# Función para obtener el email del usuario de git global si no se especificó
function Get-GitUserEmail {
    if ([string]::IsNullOrWhiteSpace($UserEmail)) {
        try {
            $email = git config --global user.email
            if ([string]::IsNullOrWhiteSpace($email)) {
                Write-Warning "No se pudo obtener el email de git. Use el parámetro -UserEmail"
                return $null
            }
            return $email
        }
        catch {
            Write-Warning "Error al obtener email de git: $_"
            return $null
        }
    }
    return $UserEmail
}

# Función para normalizar nombre de repositorio
function Get-RepositoryName {
    param([string]$Path)
    
    return Split-Path $Path -Leaf
}

# Función para extraer commits de un repositorio
function Get-RepositoryCommits {
    param(
        [string]$RepoPath,
        [string]$UserEmail,
        [string]$Since,
        [string]$Until
    )
    
    $repoName = Get-RepositoryName -Path $RepoPath
    $currentLocation = Get-Location
    
    try {
        Set-Location $RepoPath
        
        # Verificar que es un repo git válido
        if (-not (Test-GitRepository -Path $RepoPath)) {
            Write-Warning "[$repoName] No es un repositorio git válido"
            return @()
        }
        
        Write-Host "Procesando repositorio: $repoName" -ForegroundColor Cyan
        
        # Extraer commits
        $gitCommand = "git log --all --author=`"$UserEmail`" --since=`"$Since`" --until=`"$Until 23:59:59`" --date=format:`"%d/%m/%Y %H:%M:%S`" --pretty=format:`"%ad|%h|%s|%D`""
        
        $commits = Invoke-Expression $gitCommand 2>$null
        
        if ($null -eq $commits -or $commits.Count -eq 0) {
            Write-Host "  No se encontraron commits" -ForegroundColor Yellow
            return @()
        }
        
        # Procesar commits y agregar nombre del repositorio
        $processedCommits = $commits | ForEach-Object {
            if (![string]::IsNullOrWhiteSpace($_)) {
                [PSCustomObject]@{
                    Repository = $repoName
                    RawLine = $_
                }
            }
        }
        
        Write-Host "  Encontrados: $($processedCommits.Count) commits" -ForegroundColor Green
        
        return $processedCommits
    }
    catch {
        Write-Warning "[$repoName] Error al procesar: $_"
        return @()
    }
    finally {
        Set-Location $currentLocation
    }
}

# ==================== MAIN ====================

Write-Host "`n========================================" -ForegroundColor Magenta
Write-Host "  Extractor de Commits Multi-Repositorio" -ForegroundColor Magenta
Write-Host "========================================`n" -ForegroundColor Magenta

# Validar y normalizar parámetros
if (-not (Test-Path $RootPath)) {
    Write-Error "La ruta especificada no existe: $RootPath"
    exit 1
}

$userEmailToUse = Get-GitUserEmail
if ($null -eq $userEmailToUse) {
    Write-Error "Debe especificar un email de usuario con -UserEmail"
    exit 1
}

# Generar nombre de archivo de salida si no se especificó
if ([string]::IsNullOrWhiteSpace($OutputFile)) {
    $sinceFormatted = $Since -replace '-', ''
    $untilFormatted = $Until -replace '-', ''
    $OutputFile = "commits-multi-repo-$sinceFormatted-$untilFormatted.txt"
}

# Información de configuración
Write-Host "Configuración:" -ForegroundColor White
Write-Host "  Ruta raíz:      $RootPath" -ForegroundColor Gray
Write-Host "  Usuario:        $userEmailToUse" -ForegroundColor Gray
Write-Host "  Desde:          $Since" -ForegroundColor Gray
Write-Host "  Hasta:          $Until" -ForegroundColor Gray
Write-Host "  Archivo salida: $OutputFile" -ForegroundColor Gray
Write-Host ""

# Buscar todos los repositorios git (recursivamente)
Write-Host "Buscando repositorios git (recursivo)..." -ForegroundColor White

$repositories = @()
$excludedDirs = @('.git', 'node_modules', 'bin', 'obj', '.vs', '.vscode', 'dist', 'build', 'target')

# Buscar recursivamente todas las carpetas .git
$gitDirs = Get-ChildItem -Path $RootPath -Force -Recurse -ErrorAction SilentlyContinue |
    Where-Object { $_.PSIsContainer -and $_.Name -eq '.git' }

# Obtener el directorio padre de cada .git encontrado (ese es el repositorio)
$repositories = $gitDirs | ForEach-Object {
    Get-Item (Split-Path $_.FullName -Parent)
} | Where-Object {
    # Excluir carpetas dentro de node_modules, bin, obj, etc.
    $path = $_.FullName
    $shouldInclude = $true
    foreach ($excluded in $excludedDirs) {
        if ($path -like "*\$excluded\*") {
            $shouldInclude = $false
            break
        }
    }
    $shouldInclude
} | Sort-Object FullName -Unique

if ($repositories.Count -eq 0) {
    Write-Warning "No se encontraron repositorios git en: $RootPath (búsqueda recursiva)"
    exit 0
}

Write-Host "Encontrados $($repositories.Count) repositorios (en todos los niveles)`n" -ForegroundColor Green

# Mostrar lista de repositorios encontrados con su ruta relativa
Write-Host "Repositorios a procesar:" -ForegroundColor White
foreach ($repo in $repositories) {
    $relativePath = $repo.FullName.Replace($RootPath, "").TrimStart('\', '/')
    if ([string]::IsNullOrWhiteSpace($relativePath)) {
        $relativePath = "."
    }
    Write-Host "  - $relativePath" -ForegroundColor Gray
}
Write-Host ""

# Procesar cada repositorio
$allCommits = @()

foreach ($repo in $repositories) {
    $commits = Get-RepositoryCommits -RepoPath $repo.FullName -UserEmail $userEmailToUse -Since $Since -Until $Until
    
    if ($commits.Count -gt 0) {
        $allCommits += $commits
    }
}

# Verificar si hay commits
if ($allCommits.Count -eq 0) {
    Write-Warning "`nNo se encontraron commits en el rango de fechas especificado."
    exit 0
}

# Generar archivo de salida
Write-Host "`nGenerando archivo de salida..." -ForegroundColor White

try {
    # Crear encabezado
    $output = @"
========================================
REPORTE DE COMMITS - MÚLTIPLES REPOSITORIOS
========================================

Usuario:  $userEmailToUse
Período:  $Since al $Until
Generado: $(Get-Date -Format "dd/MM/yyyy HH:mm:ss")
Total commits: $($allCommits.Count)

========================================

"@

    # Agrupar por fecha para mejor organización
    $commitsByDate = $allCommits | ForEach-Object {
        $parts = $_.RawLine -split '\|'
        $dateStr = $parts[0]
        
        [PSCustomObject]@{
            Date = $dateStr
            Repository = $_.Repository
            Hash = $parts[1]
            Message = $parts[2]
            Refs = if ($parts.Count -gt 3) { $parts[3] } else { "" }
        }
    } | Sort-Object { [DateTime]::ParseExact($_.Date, "dd/MM/yyyy HH:mm:ss", $null) } -Descending

    # Agrupar por fecha
    $groupedByDate = $commitsByDate | Group-Object { $_.Date.Split(' ')[0] }

    foreach ($dateGroup in $groupedByDate) {
        $output += "`n=== $($dateGroup.Name) ===`n"
        
        # Agrupar por repositorio dentro de cada fecha
        $groupedByRepo = $dateGroup.Group | Group-Object Repository
        
        foreach ($repoGroup in $groupedByRepo) {
            $output += "`n[$($repoGroup.Name)]`n"
            
            foreach ($commit in $repoGroup.Group) {
                $output += "$($commit.Date) - $($commit.Hash) - $($commit.Message)"
                if (![string]::IsNullOrWhiteSpace($commit.Refs)) {
                    $output += "`n  Refs: $($commit.Refs)"
                }
                $output += "`n"
            }
        }
    }

    # Agregar resumen por repositorio
    $output += "`n`n========================================`n"
    $output += "RESUMEN POR REPOSITORIO`n"
    $output += "========================================`n`n"

    $repoSummary = $allCommits | Group-Object Repository | Sort-Object Count -Descending

    foreach ($repo in $repoSummary) {
        $output += "$($repo.Name): $($repo.Count) commits`n"
    }

    # Guardar archivo
    $output | Out-File -FilePath $OutputFile -Encoding UTF8
    
    Write-Host "Archivo generado exitosamente: $OutputFile" -ForegroundColor Green
    Write-Host "`nResumen:" -ForegroundColor White
    Write-Host "  Total de commits: $($allCommits.Count)" -ForegroundColor Gray
    Write-Host "  Repositorios con commits: $($repoSummary.Count)" -ForegroundColor Gray
    Write-Host ""
    
    # Mostrar resumen por repositorio
    Write-Host "Commits por repositorio:" -ForegroundColor White
    foreach ($repo in $repoSummary) {
        Write-Host "  $($repo.Name): $($repo.Count)" -ForegroundColor Cyan
    }
}
catch {
    Write-Error "Error al generar archivo: $_"
    exit 1
}

Write-Host "`nProceso completado exitosamente`n" -ForegroundColor Green
