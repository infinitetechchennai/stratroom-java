# Run stratroom-backend locally with environment variables from .env.local
param(
    [string]$EnvFile = ".env.local"
)

if (-not (Test-Path $EnvFile)) {
    Write-Error "Env file '$EnvFile' not found. Copy .env.local and fill in your values."
    exit 1
}

# Parse and export each KEY=VALUE line (skip blanks and comments)
Get-Content $EnvFile | Where-Object { $_ -match '^\s*[^#\s]' } | ForEach-Object {
    if ($_ -match '^\s*([^=]+?)\s*=\s*(.*)\s*$') {
        [System.Environment]::SetEnvironmentVariable($Matches[1], $Matches[2], 'Process')
        Write-Host "  Set $($Matches[1])"
    }
}

Write-Host ""
Write-Host "Starting stratroom-backend..."
mvn spring-boot:run
