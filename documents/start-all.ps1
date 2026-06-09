# ============================================================
#  StratRoom - start all 7 services
# ============================================================
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot"
$env:PATH      = "$env:JAVA_HOME\bin;$env:PATH"

$base = "C:\Users\sibi\Desktop\Stratroom-Source"
$logs = "C:\Users\sibi\Desktop\service-logs"
New-Item -ItemType Directory -Force $logs | Out-Null

# service name -> port  (start order: backends first, web last)
$services = [ordered]@{
    "licenseservice"    = 9080
    "authservice"       = 8081
    "userservice"       = 8082
    "db-service"        = 8083
    "scorecard-service" = 8084
    "etl-service"       = 8086
    "stratroom-web"     = 8080
}

foreach ($svc in $services.Keys) {
    $dir  = Join-Path $base $svc
    $args = "spring-boot:run"
    # stratroom-web needs its external config directory passed in
    if ($svc -eq "stratroom-web") {
        $args = "spring-boot:run `"-Dspring-boot.run.jvmArguments=-Dconfig.directory=$dir`""
    }
    Start-Process -FilePath "mvn" -ArgumentList $args `
        -WorkingDirectory $dir `
        -RedirectStandardOutput "$logs\$svc.log" `
        -RedirectStandardError  "$logs\$svc-err.log" `
        -NoNewWindow
    Write-Host ("Starting {0,-18} on port {1} ... log: {2}\{0}.log" -f $svc, $services[$svc], $logs)
}

Write-Host ""
Write-Host "All 7 services launching. Give them ~30-45s, then open:" -ForegroundColor Green
Write-Host "    http://localhost:8080/stratroom/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Check status with:  .\status.ps1   (or netstat below)"
