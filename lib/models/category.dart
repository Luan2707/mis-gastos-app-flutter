class Category {
  final String id;
  final String name;
  final String icon;
  final String color;
  final bool isExpense;

  Category({
    required this.id,
    required this.name,
    required this.icon,
    required this.color,
    required this.isExpense,
  });

  static final List<Category> defaultExpenseCategories = [
    Category(id: '1', name: 'Comida', icon: '🍔', color: '#FF6B6B', isExpense: true),
    Category(id: '2', name: 'Transporte', icon: '🚗', color: '#4ECDC4', isExpense: true),
    Category(id: '3', name: 'Utilidades', icon: '💡', color: '#FFE66D', isExpense: true),
    Category(id: '4', name: 'Entretenimiento', icon: '🎮', color: '#95E1D3', isExpense: true),
    Category(id: '5', name: 'Compras', icon: '🛍️', color: '#F38181', isExpense: true),
    Category(id: '6', name: 'Salud', icon: '🏥', color: '#AA96DA', isExpense: true),
    Category(id: '7', name: 'Educación', icon: '📚', color: '#FCBAD3', isExpense: true),
    Category(id: '8', name: 'Otros', icon: '📌', color: '#A8D8EA', isExpense: true),
  ];

  static final List<Category> defaultIncomeCategories = [
    Category(id: '101', name: 'Salario', icon: '💰', color: '#52B788', isExpense: false),
    Category(id: '102', name: 'Freelance', icon: '💻', color: '#2D6A4F', isExpense: false),
    Category(id: '103', name: 'Inversión', icon: '📈', color: '#40916C', isExpense: false),
    Category(id: '104', name: 'Otros Ingresos', icon: '✨', color: '#1B4332', isExpense: false),
  ];
}
