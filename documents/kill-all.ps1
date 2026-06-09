# ============================================================
#  StratRoom - kill everything listening on the service ports
# ============================================================
$ports = 8080,8081,8082,8083,8084,8086,9080

foreach ($port in $ports) {
    $lines = netstat -ano | Select-String "0.0.0.0:$port\s.*LISTENING"
    if (-not $lines) {
        Write-Host ("port {0,-5} : nothing running" -f $port)
        continue
    }
    foreach ($line in $lines) {
        $procId = ($line -replace '.*LISTENING\s+','').Trim()
        try {
            $name = (Get-Process -Id $procId -ErrorAction Stop).ProcessName
            Stop-Process -Id $procId -Force -ErrorAction Stop
            Write-Host ("port {0,-5} : killed PID {1} ({2})" -f $port, $procId, $name) -ForegroundColor Yellow
        } catch {
            Write-Host ("port {0,-5} : could not kill PID {1}" -f $port, $procId) -ForegroundColor Red
        }
    }
}
Write-Host ""
Write-Host "Done. All StratRoom services stopped." -ForegroundColor Green
