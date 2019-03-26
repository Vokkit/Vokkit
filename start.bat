@echo off
title Vokkit v2.0.0
:main
cls

echo.
echo ┍──────────────────────────────
echo │  
echo │    Vokkit v2.0.0
echo │  
echo │  
echo │   1. Start Server
echo │  
echo │   2. Go to Github
echo │  
echo │   3. Quit
echo │  
echo │  
echo │  Created by Scripter36, Astro36, Su-Yong
echo │  
echo ┕──────────────────────────────

set /p a=Choose: 
if %a%==1 goto startServer
if %a%==2 goto github
if %a%==3 goto quit
cls
goto main

:startServer
cls
node build/server/Vokkit.js
cls
goto main

:github
cls
explorer https://github.com/Vokkit/Vokkit
goto main

:quit
cls
