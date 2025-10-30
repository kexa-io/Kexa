$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/kexa-io/kexa"
$InstallDir = "$env:LOCALAPPDATA\kexa"
$BinaryName = "kexa-windows-x64.exe"
$DownloadUrl = "$RepoUrl/releases/latest/download/$BinaryName"

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "   Kexa CLI Installer" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Downloading Kexa CLI..." -ForegroundColor Green
Write-Host "URL: $DownloadUrl"
Write-Host ""

New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null

try {
    Invoke-WebRequest -Uri $DownloadUrl -OutFile "$InstallDir\kexa.exe" -UseBasicParsing
} catch {
    Write-Host "Error downloading Kexa CLI: $_" -ForegroundColor Red
    exit 1
}

$Path = [Environment]::GetEnvironmentVariable("Path", "User")
if ($Path -notlike "*$InstallDir*") {
    Write-Host "Adding Kexa to PATH..." -ForegroundColor Green
    [Environment]::SetEnvironmentVariable("Path", "$Path;$InstallDir", "User")
    $env:Path = "$env:Path;$InstallDir"
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Installation complete!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Kexa CLI installed to: $InstallDir\kexa.exe" -ForegroundColor Cyan
Write-Host ""
Write-Host "Run 'kexa' to get started" -ForegroundColor Yellow
Write-Host "You may need to restart your terminal for PATH changes to take effect" -ForegroundColor Yellow
Write-Host ""
