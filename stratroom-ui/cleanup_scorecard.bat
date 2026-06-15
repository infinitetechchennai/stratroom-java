@echo off
set BASE=D:\Stratroom-Source\Stratroom-Source\stratroom-ui\src\pages\scorecard

echo Removing src folder...
if exist "%BASE%\src" rd /s /q "%BASE%\src"

echo Removing public folder...
if exist "%BASE%\public" rd /s /q "%BASE%\public"

echo Removing package.json...
if exist "%BASE%\package.json" del /f /q "%BASE%\package.json"

echo Removing package-lock.json...
if exist "%BASE%\package-lock.json" del /f /q "%BASE%\package-lock.json"

echo Removing vite.config.js...
if exist "%BASE%\vite.config.js" del /f /q "%BASE%\vite.config.js"

echo Removing index.html...
if exist "%BASE%\index.html" del /f /q "%BASE%\index.html"

echo Removing README.md...
if exist "%BASE%\README.md" del /f /q "%BASE%\README.md"

echo Removing .gitignore...
if exist "%BASE%\.gitignore" del /f /q "%BASE%\.gitignore"

echo Done! Remaining contents:
dir "%BASE%"
