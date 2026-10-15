import 'package:cloud_firestore/cloud_firestore.dart';

enum TransactionType { income, expense }

class Transaction {
  final String id;
  final String userId;
  final String description;
  final double amount;
  final TransactionType type;
  final String category;
  final DateTime date;
  final String? bankAccount; // Para indicar de cuál cuenta viene (Falabella, BancoEstado)
  final bool isAutomatic; // Si fue sincronizada automáticamente
  final DateTime createdAt;
  final DateTime? updatedAt;

  Transaction({
    required this.id,
    required this.userId,
    required this.description,
    required this.amount,
    required this.type,
    required this.category,
    required this.date,
    this.bankAccount,
    this.isAutomatic = false,
    required this.createdAt,
    this.updatedAt,
  });

  // Convertir a JSON para Firestore
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'description': description,
      'amount': amount,
      'type': type.toString().split('.').last,
      'category': category,
      'date': date,
      'bankAccount': bankAccount,
      'isAutomatic': isAutomatic,
      'createdAt': createdAt,
      'updatedAt': updatedAt,
    };
  }

  // Crear desde Firestore
  factory Transaction.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return Transaction(
      id: doc.id,
      userId: data['userId'] ?? '',
      description: data['description'] ?? '',
      amount: (data['amount'] ?? 0).toDouble(),
      type: data['type'] == 'income' ? TransactionType.income : TransactionType.expense,
      category: data['category'] ?? '',
      date: (data['date'] as Timestamp).toDate(),
      bankAccount: data['bankAccount'],
      isAutomatic: data['isAutomatic'] ?? false,
      createdAt: (data['createdAt'] as Timestamp).toDate(),
      updatedAt: data['updatedAt'] != null ? (data['updatedAt'] as Timestamp).toDate() : null,
    );
  }

  // Copiar con cambios
  Transaction copyWith({
    String? id,
    String? userId,
    String? description,
    double? amount,
    TransactionType? type,
    String? category,
    DateTime? date,
    String? bankAccount,
    bool? isAutomatic,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Transaction(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      description: description ?? this.description,
      amount: amount ?? this.amount,
      type: type ?? this.type,
      category: category ?? this.category,
      date: date ?? this.date,
      bankAccount: bankAccount ?? this.bankAccount,
      isAutomatic: isAutomatic ?? this.isAutomatic,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  @override
  String toString() => 'Transaction(id: $id, description: $description, amount: $amount, type: $type)';
}
