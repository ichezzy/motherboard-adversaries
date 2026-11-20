@echo off
rem Baut das Modul aus dem Vault – nur auf diesem PC, nichts wird hochgeladen.
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul || set "PATH=E:\Apps\nodejs;%PATH%"
if not exist node_modules (
  echo Erster Start: lade die Werkzeuge ...
  call npm install --no-fund --no-audit
)
node werkzeug\bauen.mjs
echo.
pause
