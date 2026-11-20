@echo off
rem Baut das Modul, zeigt was sich geändert hat, fragt nach und lädt dann eine neue Version auf GitHub hoch.
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul || set "PATH=E:\Apps\nodejs;%PATH%"
where git >nul 2>nul || set "PATH=E:\Apps\Git\cmd;%PATH%"
where gh >nul 2>nul || set "PATH=C:\Program Files\GitHub CLI;%PATH%"
if not exist node_modules (
  echo Erster Start: lade die Werkzeuge ...
  call npm install --no-fund --no-audit
)
node werkzeug\veroeffentlichen.mjs
echo.
pause
