@echo off
REM Script para configurar el proyecto Flutter en Windows

echo 🚀 Configurando Mis Gastos App...
echo.

REM Instalar dependencias
echo 📦 Instalando dependencias...
flutter pub get

REM Limpiar builds anteriores
echo 🧹 Limpiando builds anteriores...
flutter clean

echo.
echo ✅ ¡Configuración completada!
echo.
echo Próximos pasos:
echo 1. Configura Firebase:
echo    - Ve a https://console.firebase.google.com/
echo    - Crea un proyecto llamado 'mis-gastos-app'
echo    - Activa Firestore Database y Authentication
echo    - Descarga google-services.json y colócalo en android\app\
echo.
echo 2. Actualiza firebase_options.dart con tus credenciales
echo.
echo 3. Ejecuta: flutter run
echo.
pause
