// This file is generated automatically, please do not edit it manually.
// Run `flutterfire configure` to regenerate this file.

import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        return windows;
      case TargetPlatform.linux:
        return linux;
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyDemoKeyAndroid123456789',
    appId: '1:123456789:android:abcdef1234567890',
    messagingSenderId: '123456789',
    projectId: 'mis-gastos-app',
    storageBucket: 'mis-gastos-app.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyDemoKeyIOS123456789',
    appId: '1:123456789:ios:abcdef1234567890',
    messagingSenderId: '123456789',
    projectId: 'mis-gastos-app',
    storageBucket: 'mis-gastos-app.appspot.com',
    iosBundleId: 'com.example.misGastosApp',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyDemoKeyMacOS123456789',
    appId: '1:123456789:macos:abcdef1234567890',
    messagingSenderId: '123456789',
    projectId: 'mis-gastos-app',
    storageBucket: 'mis-gastos-app.appspot.com',
    iosBundleId: 'com.example.misGastosApp',
  );

  static const FirebaseOptions windows = FirebaseOptions(
    apiKey: 'AIzaSyDemoKeyWindows123456789',
    appId: '1:123456789:windows:abcdef1234567890',
    messagingSenderId: '123456789',
    projectId: 'mis-gastos-app',
    storageBucket: 'mis-gastos-app.appspot.com',
  );

  static const FirebaseOptions linux = FirebaseOptions(
    apiKey: 'AIzaSyDemoKeyLinux123456789',
    appId: '1:123456789:linux:abcdef1234567890',
    messagingSenderId: '123456789',
    projectId: 'mis-gastos-app',
    storageBucket: 'mis-gastos-app.appspot.com',
  );

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyDemoKeyWeb123456789',
    appId: '1:123456789:web:abcdef1234567890',
    messagingSenderId: '123456789',
    projectId: 'mis-gastos-app',
    authDomain: 'mis-gastos-app.firebaseapp.com',
    storageBucket: 'mis-gastos-app.appspot.com',
  );
}
