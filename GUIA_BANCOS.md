# Guía: Integración con APIs Bancarias

Esta guía te ayudará a integrar la app con **Banco Falabella** y **Banco Estado**.

## 🏦 Banco Falabella

### Requisitos
1. Ser cliente de Banco Falabella
2. Acceso a su API (solicitar credenciales)
3. Documentación: [Falabella Open API](https://developer.falabella.com)

### Implementación

```dart
// En lib/services/banco_falabella_service.dart

import 'package:http/http.dart' as http;
import 'dart:convert';

class BancoFalabellaService {
  final String apiKey = 'TU_API_KEY';
  final String baseUrl = 'https://api.falabella.com/v1';

  Future<List<TransactionFromBank>> getTransactions({
    required String accountId,
    required String token,
    required DateTime startDate,
    required DateTime endDate,
  }) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/accounts/$accountId/transactions'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body)['transactions'];
        return data
            .map((tx) => TransactionFromBank.fromBancoFalabella(tx))
            .toList();
      }
    } catch (e) {
      print('Error obteniendo transacciones: $e');
    }
    return [];
  }

  // Sincronizar transacciones a Firestore
  Future<void> syncTransactions({
    required String userId,
    required String accountId,
    required String token,
  }) async {
    final transactions = await getTransactions(
      accountId: accountId,
      token: token,
      startDate: DateTime.now().subtract(const Duration(days: 30)),
      endDate: DateTime.now(),
    );

    for (var tx in transactions) {
      // Agregar a Firestore como transacción automática
      // ...
    }
  }
}

class TransactionFromBank {
  final String id;
  final String description;
  final double amount;
  final DateTime date;
  final String type; // 'debit' o 'credit'

  TransactionFromBank({
    required this.id,
    required this.description,
    required this.amount,
    required this.date,
    required this.type,
  });

  factory TransactionFromBank.fromBancoFalabella(Map<String, dynamic> json) {
    return TransactionFromBank(
      id: json['id'],
      description: json['description'],
      amount: (json['amount'] as num).toDouble(),
      date: DateTime.parse(json['date']),
      type: json['type'],
    );
  }
}
```

## 🏦 Banco Estado

### Requisitos
1. Ser cliente de Banco Estado
2. Open Banking Chile: [Acceso API](https://www.banstico.cl/open-banking)
3. Obtener credenciales OAuth2

### Implementación

```dart
// En lib/services/banco_estado_service.dart

import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_appauth/flutter_appauth.dart';

class BancoEstadoService {
  final String clientId = 'TU_CLIENT_ID';
  final String clientSecret = 'TU_CLIENT_SECRET';
  final String redirectUrl = 'com.example.mis_gastos_app://oauth-callback';
  final FlutterAppAuth _appAuth = const FlutterAppAuth();

  // Autenticarse con OAuth2
  Future<String?> authenticate() async {
    try {
      final result = await _appAuth.authorizeAndExchangeCode(
        AuthorizationTokenRequest(
          clientId,
          redirectUrl,
          clientSecret: clientSecret,
          discoveryUrl:
              'https://api.bancoestado.cl/.well-known/openid-configuration',
          scopes: [
            'openid',
            'profile',
            'accounts',
            'transactions',
          ],
        ),
      );

      return result?.accessToken;
    } catch (e) {
      print('Error en autenticación: $e');
      return null;
    }
  }

  // Obtener cuentas
  Future<List<Account>> getAccounts(String token) async {
    try {
      final response = await http.get(
        Uri.parse('https://api.bancoestado.cl/v1/accounts'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body)['accounts'];
        return data.map((acc) => Account.fromJson(acc)).toList();
      }
    } catch (e) {
      print('Error obteniendo cuentas: $e');
    }
    return [];
  }

  // Obtener transacciones de una cuenta
  Future<List<TransactionFromBank>> getTransactions({
    required String token,
    required String accountId,
    required DateTime startDate,
    required DateTime endDate,
  }) async {
    try {
      final response = await http.get(
        Uri.parse(
            'https://api.bancoestado.cl/v1/accounts/$accountId/transactions')
            .replace(
          queryParameters: {
            'from_booking_date_time': startDate.toIso8601String(),
            'to_booking_date_time': endDate.toIso8601String(),
          },
        ),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        final List<dynamic> data =
            jsonDecode(response.body)['transactions'];
        return data
            .map((tx) => TransactionFromBank.fromBancoEstado(tx))
            .toList();
      }
    } catch (e) {
      print('Error obteniendo transacciones: $e');
    }
    return [];
  }
}

class Account {
  final String id;
  final String name;
  final double balance;

  Account({
    required this.id,
    required this.name,
    required this.balance,
  });

  factory Account.fromJson(Map<String, dynamic> json) {
    return Account(
      id: json['account_id'],
      name: json['name'],
      balance: (json['balance'] as num).toDouble(),
    );
  }
}
```

## 📱 Integración en AppProvider

Agrega esto a `lib/services/app_provider.dart`:

```dart
final BancoFalabellaService _falabellaService = BancoFalabellaService();
final BancoEstadoService _bancoEstadoService = BancoEstadoService();

// Conectar Banco Falabella
Future<bool> connectBancoFalabella() async {
  try {
    // Solicitar autenticación con Banco Falabella
    // Guardar token y sincronizar transacciones
    return true;
  } catch (e) {
    print('Error conectando a Falabella: $e');
    return false;
  }
}

// Conectar Banco Estado
Future<bool> connectBancoEstado() async {
  try {
    final token = await _bancoEstadoService.authenticate();
    if (token != null) {
      // Guardar token
      // Sincronizar transacciones
      return true;
    }
  } catch (e) {
    print('Error conectando a Banco Estado: $e');
  }
  return false;
}

// Sincronizar transacciones automáticas
Future<void> syncBankTransactions() async {
  if (currentUserId == null) return;

  // Sincronizar de Banco Falabella
  // Sincronizar de Banco Estado
  // Actualizar UI
  notifyListeners();
}
```

## 🔑 Pasos para Obtener Credenciales

### Banco Falabella
1. [Registro de desarrollador](https://developer.falabella.com/register)
2. Crear aplicación
3. Copiar API Key
4. Documentación completa en https://developer.falabella.com/docs

### Banco Estado
1. [Solicitar acceso Open Banking](https://www.banstico.cl/open-banking)
2. Registrar aplicación
3. Obtener Client ID y Client Secret
4. Configurar redirect URLs

## 🧪 Pruebas

Para probar sin datos reales, usa el entorno sandbox de cada banco:

```dart
// Para Banco Falabella
const String API_URL = 'https://sandbox.api.falabella.com/v1';

// Para Banco Estado
const String API_URL = 'https://sandbox.api.bancoestado.cl/v1';
```

## 📝 Notas de Seguridad

⚠️ **NUNCA** almacenes credenciales directamente en el código. Usa:
- Variables de entorno
- Secure storage (flutter_secure_storage)
- Servidor backend para manejar tokens

## ❓ Próximas Preguntas

Si necesitas ayuda:
1. Consulta la documentación oficial del banco
2. Revisa los errores en el panel de Firebase
3. Contacta al equipo de soporte

---

¡Llámame cuando estés listo para integrar los bancos!
