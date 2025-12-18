@echo off
cd /d "%~dp0"

echo Lancement de l'architecture Micro-services...

:: 1. Les Backends
start "LIVRES (8001)" cmd /k "cd src/app/services/service-livres && npm install && node server.js"
start "ABONNES (8002)" cmd /k "cd src/app/services/service-abonnes && npm install && node server.js"
start "EMPRUNTS (8003)" cmd /k "cd src/app/services/service-emprunts && npm install && node server.js"

:: 2. Le Frontend (Le Site Web)
start "SITE WEB (8080)" cmd /k "cd src/app/services/service-front && npm install && node server.js"

echo.
echo Tout est lancé !
echo.
echo 👉 Ouvrez votre navigateur sur : http://localhost:8080
pause