import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:uuid/uuid.dart';
import '../models/transaction.dart' as transaction_model;

class FirebaseTransactionService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final String _collectionPath = 'transactions';

  // Agregar nueva transacción
  Future<String> addTransaction({
    required String userId,
    required String description,
    required double amount,
    required transaction_model.TransactionType type,
    required String category,
    required DateTime date,
    String? bankAccount,
    bool isAutomatic = false,
  }) async {
    try {
      final transactionId = const Uuid().v4();
      final now = DateTime.now();

      final transaction = transaction_model.Transaction(
        id: transactionId,
        userId: userId,
        description: description,
        amount: amount,
        type: type,
        category: category,
        date: date,
        bankAccount: bankAccount,
        isAutomatic: isAutomatic,
        createdAt: now,
        updatedAt: now,
      );

      await _firestore
          .collection(_collectionPath)
          .doc(transactionId)
          .set(transaction.toJson());

      return transactionId;
    } catch (e) {
      print('Error agregando transacción: $e');
      rethrow;
    }
  }

  // Obtener transacciones del usuario
  Stream<List<transaction_model.Transaction>> getUserTransactions(String userId) {
    try {
      return _firestore
          .collection(_collectionPath)
          .where('userId', isEqualTo: userId)
          .orderBy('date', descending: true)
          .snapshots()
          .map((snapshot) => snapshot.docs
              .map((doc) => transaction_model.Transaction.fromFirestore(doc))
              .toList());
    } catch (e) {
      print('Error obteniendo transacciones: $e');
      return Stream.value([]);
    }
  }

  // Obtener transacciones por rango de fecha
  Stream<List<transaction_model.Transaction>> getTransactionsByDateRange({
    required String userId,
    required DateTime startDate,
    required DateTime endDate,
  }) {
    try {
      return _firestore
          .collection(_collectionPath)
          .where('userId', isEqualTo: userId)
          .where('date', isGreaterThanOrEqualTo: startDate)
          .where('date', isLessThanOrEqualTo: endDate)
          .orderBy('date', descending: true)
          .snapshots()
          .map((snapshot) => snapshot.docs
              .map((doc) => transaction_model.Transaction.fromFirestore(doc))
              .toList());
    } catch (e) {
      print('Error obteniendo transacciones por rango: $e');
      return Stream.value([]);
    }
  }

  // Obtener transacciones por categoría
  Stream<List<transaction_model.Transaction>> getTransactionsByCategory({
    required String userId,
    required String category,
  }) {
    try {
      return _firestore
          .collection(_collectionPath)
          .where('userId', isEqualTo: userId)
          .where('category', isEqualTo: category)
          .orderBy('date', descending: true)
          .snapshots()
          .map((snapshot) => snapshot.docs
              .map((doc) => transaction_model.Transaction.fromFirestore(doc))
              .toList());
    } catch (e) {
      print('Error obteniendo transacciones por categoría: $e');
      return Stream.value([]);
    }
  }

  // Actualizar transacción
  Future<void> updateTransaction({
    required String transactionId,
    String? description,
    double? amount,
    String? category,
    DateTime? date,
  }) async {
    try {
      Map<String, dynamic> updates = {
        'updatedAt': DateTime.now(),
      };

      if (description != null) updates['description'] = description;
      if (amount != null) updates['amount'] = amount;
      if (category != null) updates['category'] = category;
      if (date != null) updates['date'] = date;

      await _firestore
          .collection(_collectionPath)
          .doc(transactionId)
          .update(updates);
    } catch (e) {
      print('Error actualizando transacción: $e');
      rethrow;
    }
  }

  // Eliminar transacción
  Future<void> deleteTransaction(String transactionId) async {
    try {
      await _firestore
          .collection(_collectionPath)
          .doc(transactionId)
          .delete();
    } catch (e) {
      print('Error eliminando transacción: $e');
      rethrow;
    }
  }

  // Obtener resumen de gastos e ingresos
  Future<Map<String, double>> getSummary({
    required String userId,
    required DateTime startDate,
    required DateTime endDate,
  }) async {
    try {
      final snapshot = await _firestore
          .collection(_collectionPath)
          .where('userId', isEqualTo: userId)
          .where('date', isGreaterThanOrEqualTo: startDate)
          .where('date', isLessThanOrEqualTo: endDate)
          .get();

      double totalIncome = 0;
      double totalExpense = 0;

      for (var doc in snapshot.docs) {
        final transaction = transaction_model.Transaction.fromFirestore(doc);
        if (transaction.type == transaction_model.TransactionType.income) {
          totalIncome += transaction.amount;
        } else {
          totalExpense += transaction.amount;
        }
      }

      return {
        'income': totalIncome,
        'expense': totalExpense,
        'balance': totalIncome - totalExpense,
      };
    } catch (e) {
      print('Error obteniendo resumen: $e');
      return {'income': 0, 'expense': 0, 'balance': 0};
    }
  }

  // Obtener transacciones automáticas (desde bancos)
  Stream<List<transaction_model.Transaction>> getAutomaticTransactions(String userId) {
    try {
      return _firestore
          .collection(_collectionPath)
          .where('userId', isEqualTo: userId)
          .where('isAutomatic', isEqualTo: true)
          .orderBy('date', descending: true)
          .snapshots()
          .map((snapshot) => snapshot.docs
              .map((doc) => transaction_model.Transaction.fromFirestore(doc))
              .toList());
    } catch (e) {
      print('Error obteniendo transacciones automáticas: $e');
      return Stream.value([]);
    }
  }
}
