@echo off
:: Force le script à se placer dans le dossier actuel
cd /d "%~dp0"

echo Verification des dossiers...

:: Test si les dossiers existent
if not exist "service-livres" (
    echo ERREUR CRITIQUE : Le dossier "service-livres" est introuvable ici !
    echo Verifiez que le fichier .bat est bien a la racine du projet.
    pause
    exit
)

if not exist "service-abonnes" (
    echo ERREUR CRITIQUE : Le dossier "service-abonnes" est introuvable ici !
    pause
    exit
)

if not exist "service-emprunts" (
    echo ERREUR CRITIQUE : Le dossier "service-emprunts" est introuvable ici !
    pause
    exit
)

echo Dossiers trouves. Lancement des services...

:: Lancement des services
start "LIVRES (8001)" cmd /k "cd service-livres && echo Installation... && npm install && echo Demarrage... && node server.js"
start "ABONNES (8002)" cmd /k "cd service-abonnes && echo Installation... && npm install && echo Demarrage... && node server.js"
start "EMPRUNTS (8003)" cmd /k "cd service-emprunts && echo Installation... && npm install && echo Demarrage... && node server.js"

echo.
echo Tout est lance ! Gardez les 3 fenetres noires ouvertes.
echo Vous pouvez fermer cette fenetre-ci.
pause