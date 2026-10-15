import 'package:flutter/material.dart';
import '../models/transaction.dart' as transaction_model;
import 'firebase_auth_service.dart';
import 'firebase_transaction_service.dart';

class AppProvider extends ChangeNotifier {
  final FirebaseAuthService _authService = FirebaseAuthService();
  final FirebaseTransactionService _transactionService = FirebaseTransactionService();

  // Auth State
  bool isLoggedIn = false;
  String? currentUserId;
  String? currentUserEmail;

  // Transacciones
  List<transaction_model.Transaction> transactions = [];
  Map<String, double> summary = {'income': 0, 'expense': 0, 'balance': 0};

  // Inicializar provider
  void initializeAuth() {
    _authService.authStateChanges.listen((user) {
      if (user != null) {
        isLoggedIn = true;
        currentUserId = user.uid;
        currentUserEmail = user.email;
      } else {
        isLoggedIn = false;
        currentUserId = null;
        currentUserEmail = null;
        transactions.clear();
      }
      notifyListeners();
    });
  }

  // Registrarse
  Future<bool> register({
    required String email,
    required String password,
    required String name,
  }) async {
    try {
      await _authService.registerWithEmail(
        email: email,
        password: password,
        name: name,
      );
      return true;
    } catch (e) {
      print('Error registrando: $e');
      return false;
    }
  }

  // Iniciar sesión
  Future<bool> login({
    required String email,
    required String password,
  }) async {
    try {
      await _authService.loginWithEmail(
        email: email,
        password: password,
      );
      return true;
    } catch (e) {
      print('Error iniciando sesión: $e');
      return false;
    }
  }

  // Cerrar sesión
  Future<void> logout() async {
    await _authService.logout();
  }

  // Cargar transacciones
  void loadTransactions(String userId) {
    _transactionService.getUserTransactions(userId).listen((txs) {
      transactions = txs;
      notifyListeners();
    });
  }

  // Agregar transacción
  Future<bool> addTransaction({
    required String description,
    required double amount,
    required transaction_model.TransactionType type,
    required String category,
    required DateTime date,
    String? bankAccount,
    bool isAutomatic = false,
  }) async {
    if (currentUserId == null) return false;

    try {
      await _transactionService.addTransaction(
        userId: currentUserId!,
        description: description,
        amount: amount,
        type: type,
        category: category,
        date: date,
        bankAccount: bankAccount,
        isAutomatic: isAutomatic,
      );
      return true;
    } catch (e) {
      print('Error agregando transacción: $e');
      return false;
    }
  }

  // Actualizar transacción
  Future<bool> updateTransaction({
    required String transactionId,
    String? description,
    double? amount,
    String? category,
    DateTime? date,
  }) async {
    try {
      await _transactionService.updateTransaction(
        transactionId: transactionId,
        description: description,
        amount: amount,
        category: category,
        date: date,
      );
      return true;
    } catch (e) {
      print('Error actualizando: $e');
      return false;
    }
  }

  // Eliminar transacción
  Future<bool> deleteTransaction(String transactionId) async {
    try {
      await _transactionService.deleteTransaction(transactionId);
      return true;
    } catch (e) {
      print('Error eliminando: $e');
      return false;
    }
  }

  // Obtener resumen
  Future<void> loadSummary({
    required DateTime startDate,
    required DateTime endDate,
  }) async {
    if (currentUserId == null) return;

    try {
      summary = await _transactionService.getSummary(
        userId: currentUserId!,
        startDate: startDate,
        endDate: endDate,
      );
      notifyListeners();
    } catch (e) {
      print('Error obteniendo resumen: $e');
    }
  }
}
