import 'package:flutter/material.dart';
import '../models/category.dart';
import '../models/transaction.dart' as trans;

class TransactionCard extends StatelessWidget {
  final trans.Transaction transaction;
  final VoidCallback? onTap;
  final VoidCallback? onDelete;

  const TransactionCard({
    Key? key,
    required this.transaction,
    this.onTap,
    this.onDelete,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isIncome = transaction.type == trans.TransactionType.income;
    final color = isIncome ? Colors.green : Colors.red;

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: ListTile(
        onTap: onTap,
        leading: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: color.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(
            _getCategoryIcon(),
            style: const TextStyle(fontSize: 20),
          ),
        ),
        title: Text(transaction.description),
        subtitle: Text(
          '${transaction.category}${transaction.bankAccount != null ? ' • ${transaction.bankAccount}' : ''}',
          style: TextStyle(fontSize: 12, color: Colors.grey[600]),
        ),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              '${isIncome ? '+' : '-'}\$${transaction.amount.toStringAsFixed(2)}',
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
            if (onDelete != null)
              IconButton(
                icon: const Icon(Icons.delete, size: 18, color: Colors.red),
                onPressed: onDelete,
              ),
          ],
        ),
      ),
    );
  }

  String _getCategoryIcon() {
    final allCategories = [
      ...Category.defaultExpenseCategories,
      ...Category.defaultIncomeCategories,
    ];
    final category = allCategories.firstWhere(
      (c) => c.name == transaction.category,
      orElse: () => Category(
        id: '0',
        name: 'Otros',
        icon: '📌',
        color: '#A8D8EA',
        isExpense: true,
      ),
    );
    return category.icon;
  }
}
