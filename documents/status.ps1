# StratRoom - show which services are up
$map = [ordered]@{
    8080="stratroom-web"; 8081="authservice"; 8082="userservice";
    8083="db-service"; 8084="scorecard-service"; 8086="etl-service"; 9080="licenseservice"
}
foreach ($port in $map.Keys) {
    $up = netstat -ano | Select-String "0.0.0.0:$port\s.*LISTENING"
    $state = if ($up) { "UP  " } else { "DOWN" }
    $color = if ($up) { "Green" } else { "DarkGray" }
    Write-Host ("[{0}] {1,-18} port {2}" -f $state, $map[$port], $port) -ForegroundColor $color
}
