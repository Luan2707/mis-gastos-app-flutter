@echo off
setlocal enabledelayedexpansion

echo =========================================
echo Instalador de Flutter - Mis Gastos App
echo =========================================
echo.

REM Verificar si se ejecuta como administrador
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: Este script debe ejecutarse como ADMINISTRADOR
    echo.
    echo Haz clic derecho en cmd.exe o PowerShell y selecciona "Ejecutar como administrador"
    pause
    exit /b 1
)

echo [1/3] Descargando Flutter...
cd %USERPROFILE%

REM Descargar Flutter
powershell -Command "Invoke-WebRequest -Uri 'https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_3.27.0-stable.zip' -OutFile 'flutter.zip' -Verbose"

if not exist flutter.zip (
    echo ERROR: No se pudo descargar Flutter
    pause
    exit /b 1
)

echo [2/3] Extrayendo archivos...
powershell -Command "Expand-Archive -Path flutter.zip -DestinationPath . -Force"

echo [3/3] Agregando Flutter al PATH del sistema...
setx PATH "%USERPROFILE%\flutter\bin;%PATH%"

echo.
echo =========================================
echo ✅ ¡Instalacion completada!
echo =========================================
echo.
echo Proximos pasos:
echo 1. Cierra y vuelve a abrir PowerShell/CMD
echo 2. Ejecuta: cd C:\mis_gastos_app
echo 3. Ejecuta: flutter pub get
echo 4. Ejecuta: flutter run
echo.
pause
