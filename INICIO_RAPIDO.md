# 🚀 INICIO RÁPIDO - Mis Gastos App

## ⚠️ PROBLEMA: Flutter no está instalado

Por ahora, Flutter no está disponible en tu sistema. Necesitamos instalarlo.

## ✅ SOLUCIÓN (3 pasos)

### **Paso 1: Ejecutar el instalador como ADMINISTRADOR**

1. **Abre el Explorador de archivos**
2. **Ve a:** `C:\mis_gastos_app`
3. **Encuentra:** `INSTALAR_FLUTTER.bat`
4. **Haz clic derecho** → **"Ejecutar como administrador"**
5. **Presiona cualquier tecla** cuando pida confirmación

⏳ **Espera 5-10 minutos** (descargará ~600 MB)

---

### **Paso 2: Configurar Firebase (5 minutos)**

Mientras Flutter se descarga:

1. **Ve a:** https://console.firebase.google.com/
2. **Crea nuevo proyecto:** Nombre = `mis-gastos-app`
3. **Activa Authentication:**
   - Ve a "Authentication"
   - Click "Comenzar"
   - Selecciona "Email/Password"
   - Click "Habilitar"

4. **Activa Firestore:**
   - Ve a "Firestore Database"
   - Click "Crear base de datos"
   - Selecciona "Modo prueba" (para empezar)
   - Región: `us-central1`

5. **Descarga configuración Android:**
   - Ve a Project Settings ⚙️
   - Tab "Sus aplicaciones"
   - Busca tu app Android
   - Click "google-services.json"
   - Guarda en: `C:\mis_gastos_app\android\app\google-services.json`

---

### **Paso 3: Ejecutar la App**

**Cuando Flutter termine de instalar:**

1. **Abre PowerShell** (o CMD)
2. **Escribe:**
   ```powershell
   cd C:\mis_gastos_app
   flutter pub get
   flutter run
   ```

3. **¡Espera a que compile!** (Primera vez toma 2-3 minutos)

---

## 🎨 Estructura del Proyecto

```
C:\mis_gastos_app\
├── lib\
│   ├── main.dart                  ← Punto de entrada
│   ├── firebase_options.dart      ← Editar con credenciales
│   ├── models\                    ← Modelos de datos
│   ├── services\                  ← Lógica de Firebase
│   ├── screens\                   ← Pantallas de la app
│   └── widgets\                   ← Componentes reutilizables
├── android\                       ← Configuración Android
├── pubspec.yaml                   ← Dependencias
└── README.md                      ← Documentación
```

---

## 📋 Checklist

- [ ] Ejecutaste `INSTALAR_FLUTTER.bat` como administrador
- [ ] Flutter se instaló exitosamente
- [ ] Creaste proyecto en Firebase Console
- [ ] Descargaste `google-services.json`
- [ ] Lo colocaste en `android\app\`
- [ ] Actualizaste `firebase_options.dart` con credenciales
- [ ] Ejecutaste `flutter pub get`
- [ ] Ejecutaste `flutter run`

---

## 🐛 Solución de Problemas

### "Flutter not found"
- ✅ Cierra y vuelve a abrir PowerShell **completamente**
- ✅ Verifica que Flutter esté en: `C:\Users\tu_usuario\flutter\bin`

### "google-services.json not found"
- ✅ Descarga el archivo desde Firebase Console
- ✅ Colócalo exactamente en: `C:\mis_gastos_app\android\app\google-services.json`

### "No Device Found"
- ✅ Conecta un teléfono Android
- ✅ O usa un emulador de Android Studio

### "Gradle build failed"
- ✅ Ejecuta: `flutter clean`
- ✅ Luego: `flutter pub get`
- ✅ Luego: `flutter run`

---

## 🚀 Una Vez Que Funcione

1. **Abre VS Code:** `code C:\mis_gastos_app`
2. **Instala extensión Flutter:** `ms-flutter.flutter`
3. **Abre el archivo** `lib/main.dart`
4. **Presiona F5** para ejecutar con debugger

---

## 📚 Archivos Importantes

| Archivo | Descripción |
|---------|-------------|
| `lib/main.dart` | Punto de entrada de la app |
| `lib/firebase_options.dart` | ⚠️ **EDITAR** con credenciales Firebase |
| `lib/services/app_provider.dart` | Lógica principal (state management) |
| `lib/screens/login_screen.dart` | Pantalla de login/registro |
| `lib/screens/home_screen.dart` | Pantalla principal |
| `pubspec.yaml` | Dependencias y configuración |
| `android/app/build.gradle` | Configuración Gradle |

---

## 🔐 Firestore Security Rules (Copiar después en Firebase)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /transactions/{docId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

---

## 🎯 Siguiente Paso

**Ejecuta el instalador de Flutter como administrador:**
1. Abre `C:\mis_gastos_app\INSTALAR_FLUTTER.bat` con botón derecho
2. Selecciona "Ejecutar como administrador"
3. ¡Espera a que termine!

**¡Llámame cuando Flutter esté instalado! 🚀**
