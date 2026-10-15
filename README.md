# Mis Gastos - App de Control de Ingresos y Gastos.

Una aplicación Flutter para Android para gestionar tus gastos e ingresos en la nube con Firebase.

## 🚀 Características

- ✅ **Autenticación segura** con Firebase Auth
- 📱 **Sincronización en la nube** con Firestore
- 💰 **Gestión de ingresos y gastos**
- 📊 **Resumen y estadísticas mensuales**
- 🏦 **Preparada para integración bancaria** (Banco Falabella, Banco Estado)
- 🔄 **Transacciones automáticas** desde bancos
- 📂 **Categorías de gastos personalizadas**
- 🎨 **Interfaz moderna y amigable**

## 📋 Requisitos Previos

- Flutter 3.0+
- Dart 3.0+
- Android Studio / Android SDK
- Cuenta de Firebase

## 🔧 Instalación

### 1. **Instalar Flutter**

Si aún no tienes Flutter instalado:
```bash
# Descarga Flutter desde https://flutter.dev
# O usa chocolatey en Windows:
choco install flutter
```

### 2. **Clonar o descargar el proyecto**

```bash
cd C:\mis_gastos_app
```

### 3. **Instalar dependencias**.

```bash
flutter pub get
```

### 4. **Configurar Firebase**

#### A. Crear proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto llamado `mis-gastos-app`
3. Activa **Authentication** (Email/Password)
4. Activa **Firestore Database** (modo de prueba)
5. Descarga el archivo `google-services.json` para Android

#### B. Agregar google-services.json

```bash
# Coloca el archivo descargado aquí:
# C:\mis_gastos_app\android\app\google-services.json
```

#### C. Actualizar firebase_options.dart

Reemplaza los valores demo en `lib/firebase_options.dart` con tus credenciales reales de Firebase.

### 5. **Ejecutar la aplicación**

```bash
flutter run
```

## 📱 Uso de la App

### Registrarse
1. Abre la app
2. Toca "¿No tienes cuenta? Registrate"
3. Ingresa tu email, nombre y contraseña
4. Toca "Registrarse"

### Agregar una Transacción
1. Desde la pantalla principal, toca el botón `+`
2. Selecciona si es **Gasto** o **Ingreso**
3. Ingresa descripción, monto y categoría
4. Selecciona la fecha
5. Toca "Guardar Transacción"

### Ver Transacciones
- Todas tus transacciones se muestran en la pantalla principal
- Toca "Ver todas" para ver el historial completo
- Desliza para eliminar una transacción

## 🏦 Integración Bancaria (Próximas actualizaciones)

La app está preparada para integración con:
- **Banco Falabella** - API de transacciones
- **Banco Estado** - Open Banking

Las transacciones sincronizadas automáticamente desde bancos aparecerán con:
- 🔄 Etiqueta de "automática"
- 🏦 Nombre del banco
- ✅ Sincronización en tiempo real

## 📊 Estructura del Proyecto

```
mis_gastos_app/
├── lib/
│   ├── main.dart                          # Punto de entrada
│   ├── firebase_options.dart              # Config de Firebase
│   ├── models/
│   │   ├── transaction.dart               # Modelo de transacción
│   │   ├── category.dart                  # Categorías
│   │   └── user_model.dart                # Modelo de usuario
│   ├── services/
│   │   ├── firebase_auth_service.dart     # Autenticación
│   │   ├── firebase_transaction_service.dart # Transacciones
│   │   └── app_provider.dart              # State management
│   ├── screens/
│   │   ├── login_screen.dart              # Login/Registro
│   │   ├── home_screen.dart               # Pantalla principal
│   │   ├── add_transaction_screen.dart    # Agregar transacción
│   │   └── transactions_screen.dart       # Historial
│   └── widgets/
│       ├── transaction_card.dart          # Card de transacción
│       └── summary_card.dart              # Card de resumen
├── android/                               # Configuración Android
├── pubspec.yaml                           # Dependencias
└── README.md
```

## 🔐 Seguridad

- Las contraseñas se almacenan de forma segura con Firebase Auth
- Los datos se sincronizan encriptados
- Cada usuario solo ve sus propias transacciones (reglas de Firestore)

## 💾 Firestore Rules (Recomendado)

Copia estas reglas en Firebase Console > Firestore > Reglas:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /transactions/{docId} {
      allow read, write: if request.auth.uid == resource.data.userId || 
                            request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## 🎨 Personalización

### Cambiar colores
Edita `lib/widgets/summary_card.dart` y `lib/screens/login_screen.dart`

### Agregar más categorías
Edita `lib/models/category.dart`

### Cambiar tema
Modifica `main.dart` en la sección de `ThemeData`

## 🐛 Solución de Problemas

### Error: "Firebase not initialized"
- Asegúrate que `google-services.json` esté en `android/app/`
- Ejecuta `flutter clean` y `flutter pub get`

### La app no sincroniza datos
- Verifica tu conexión a Internet
- Revisa las reglas de Firestore
- Comprueba que las credenciales de Firebase sean correctas

### No puedo registrarme
- Revisa que el email sea válido
- La contraseña debe tener al menos 6 caracteres

## 🚀 Próximas Mejoras

- [ ] Integración con APIs bancarias
- [ ] Gráficos y estadísticas avanzadas
- [ ] Presupuestos y alertas
- [ ] Exportar datos a CSV/PDF
- [ ] Modo oscuro
- [ ] Notificaciones push
- [ ] Soporte para múltiples monedas

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 💬 Soporte

Si tienes dudas o sugerencias:
1. Abre un issue en GitHub
2. Contacta al desarrollador

---

**¡Hecho con ❤️ para gestionar tus finanzas personales!**
