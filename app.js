/**
 * MIS GASTOS & AUTOCONTROL PRO — Plataforma Minimalista e Intuitiva (Versión Completa con todos tus datos)
 *
 * Incluye:
 * 1. Todas las 5 Tarjetas en Deuda exactas de tu captura (Falabella $210.000, Santander $300.000,
 *    Tapp Caja Los Andes $200.000, Nu Colombia $600.000 COP / $1.000.000 COP y Use Tarjeta Mamá BancoEstado $1.000.000)
 *    + tus cuentas de uso diario (CuentaRUT BancoEstado y Efectivo).
 * 2. Todos los gastos exactos de tus capturas:
 *    - Pagados en Mis Gastos: Gasolina ($35.000, $20.000, $20.000), Pago Plan Claro Tía Ceci ($33.003),
 *      Comprar tomar disco ($64.000), Pagar cadena 50 ($50.000), Pagar comisión Uber ($3.000),
 *      Compra Ali Expres ($13.147), Productos limpieza auto ($30.000), Arreglo botón bencina ($35.000),
 *      Compra de GPS y cámara más 15 del señor ($205.000).
 *    - Cargos "Por Pagar" separados en Deudas: LO USE TODO TARJETA MAMA ($1.000.000), LO USE ESO ($600.000 COP),
 *      LO USE TODO ($210.000), LO USE TODO ($300.000), LO QUE DEBO TARJETA MAMA AVANCE ($200.000).
 * 3. Mazda Axela VFCW14 ($4.800.000, 95.000 km, 22/10/2026) con sus 9 registros y turnos Uber (+$118.048).
 * 4. Mejoras inteligentes:
 *    - Apartado "🤝 Me Deben (Por Cobrar)" (Tía Ceci $33.003, devolución chicas disco $40.000).
 *    - Edición con 1 clic (✏️) de cualquier gasto o ingreso.
 *    - Mini calculadora en el campo de monto (ej: 64000-40000) y botones rápidos (+$1k, +$5k, +$10k, +$20k, +$50k).
 *    - Botón "📉 Abonar" en cada tarjeta en deuda para rebajar deuda cuando decidas pagarle algo.
 */

const STORAGE_KEYS = {
  CARDS: 'finanzapro_cards_v6',
  EXPENSES: 'finanzapro_expenses_v6',
  INCOMES: 'finanzapro_incomes_v6',
  RECEIVABLES: 'finanzapro_receivables_v6',
  LONG_TERM_DEBTS: 'finanzapro_longterm_debts_v6',
  VEHICLE: 'finanzapro_vehicle_v6',
  VEHICLE_LOGS: 'finanzapro_vehicle_logs_v6',
  THEME: 'finanzapro_theme_mode_v2',
  ACTIVE_TAB: 'finanzapro_active_tab_v1'
};

/* ==========================================================================
   CATEGORÍAS MINIMALISTAS (IDÉNTICAS A FOTOS 1 Y 2)
   ========================================================================== */

const EXPENSE_CATEGORIES = [
  { id: 'novia',           name: 'NOVIA',           icon: '🧍‍♀️', color: '#c4b454' },
  { id: 'transferencia',   name: 'Transferencia',   icon: '📲', color: '#4f7df3' },
  { id: 'casino',          name: 'Casino',          icon: '💎', color: '#8b5cf6' },
  { id: 'tarjeta',         name: 'Tarjeta',         icon: '💵', color: '#f59e0b' },
  { id: 'compras',         name: 'Compras',         icon: '🛒', color: '#ec4899' },
  { id: 'alimentos',       name: 'Alimentos',       icon: '🍴', color: '#47b897' },
  { id: 'telefono',        name: 'Teléfono',        icon: '📱', color: '#06b6d4' },
  { id: 'entretenimiento', name: 'Entretenimiento', icon: '🎮', color: '#6366f1' },
  { id: 'educacion',       name: 'Educación',       icon: '🎓', color: '#3b82f6' },
  { id: 'belleza',         name: 'Belleza',         icon: '✂️', color: '#f43f5e' },
  { id: 'deportes',        name: 'Deportes',        icon: '🏃', color: '#10b981' },
  { id: 'social',          name: 'Social',          icon: '👥', color: '#0ea5e9' },
  { id: 'transporte',      name: 'Transporte',      icon: '🚌', color: '#f97316' },
  { id: 'ropa',            name: 'Ropa',            icon: '👕', color: '#a855f7' },
  { id: 'auto',            name: 'Bencina / Auto',  icon: '🚗', color: '#ef4444' },
  { id: 'bebidas',         name: 'Bebidas',         icon: '🍷', color: '#e11d48' },
  { id: 'cigarrillos',     name: 'Cigarrillos',     icon: '🚬', color: '#64748b' },
  { id: 'electronicos',    name: 'Electrónicos',    icon: '🖥️', color: '#0284c7' },
  { id: 'viajes',          name: 'Viajes',          icon: '✈️', color: '#14b8a6' },
  { id: 'salud',           name: 'Salud',           icon: '💓', color: '#ef4444' },
  { id: 'mascotas',        name: 'Mascotas',        icon: '🐶', color: '#d97706' },
  { id: 'reparaciones',    name: 'Reparaciones',    icon: '🔧', color: '#475569' },
  { id: 'vivienda',        name: 'Vivienda',        icon: '🏠', color: '#2563eb' },
  { id: 'hogar',           name: 'Hogar',           icon: '🛋️', color: '#0d9488' },
  { id: 'regalos',         name: 'Regalos',         icon: '🎁', color: '#db2777' },
  { id: 'donaciones',      name: 'Donaciones',      icon: '🤲', color: '#f59e0b' },
  { id: 'loteria',         name: 'Lotería',         icon: '🎲', color: '#7c3aed' },
  { id: 'snacks',          name: 'Snacks',          icon: '🍿', color: '#eab308' },
  { id: 'otros',           name: 'Otros Gastos',    icon: '📦', color: '#64748b' }
];

const INCOME_CATEGORIES = [
  { id: 'ahorro',           name: 'Ahorro',           icon: '🤲', color: '#10b981' },
  { id: 'transferencia',    name: 'Transferencia',    icon: '📲', color: '#4cd964' },
  { id: 'gasolina',         name: 'Gasolina',         icon: '⛽', color: '#f59e0b' },
  { id: 'banco_estado',     name: 'Banco estado',     icon: '🏦', color: '#f26822' },
  { id: 'limpieza_vidrios', name: 'limpieza vidrios', icon: '🧽', color: '#06b6d4' },
  { id: 'salario',          name: 'Salario',          icon: '💼', color: '#10b981' },
  { id: 'inversiones',      name: 'Inversiones',      icon: '📈', color: '#3b82f6' },
  { id: 'tiempo_parcial',   name: 'Tiempo parcial',   icon: '🪙', color: '#eab308' },
  { id: 'premios',          name: 'Premios',          icon: '🏆', color: '#f59e0b' },
  { id: 'uber',             name: 'Uber',             icon: '🚕', color: '#059669' },
  { id: 'otros',            name: 'Otros',            icon: '🪙', color: '#64748b' }
];

const ALL_CATEGORIES_MAP = {
  comida:         { name: 'Alimentos',       icon: '🍴', color: '#47b897' },
  supermercado:   { name: 'Compras',         icon: '🛒', color: '#ec4899' },
  cuentas:        { name: 'Vivienda',        icon: '🏠', color: '#2563eb' },
  shopping:       { name: 'Ropa',            icon: '👕', color: '#a855f7' },
  suscripciones:  { name: 'Suscripciones',   icon: '📺', color: '#8b5cf6' },
  sueldo:         { name: 'Salario',         icon: '💼', color: '#10b981' },
  extra:          { name: 'Tiempo parcial',  icon: '🪙', color: '#10b981' },
  inversion:      { name: 'Inversiones',     icon: '📈', color: '#3b82f6' },
  venta:          { name: 'Otros',           icon: '🪙', color: '#10b981' }
};
EXPENSE_CATEGORIES.forEach(c => { ALL_CATEGORIES_MAP[c.id] = c; });
INCOME_CATEGORIES.forEach(c => {
  if (!ALL_CATEGORIES_MAP[c.id]) ALL_CATEGORIES_MAP[c.id] = c;
});

const VEHICLE_CATEGORIES_META = {
  combustible: { name: 'Bencina / Combustible', icon: '⛽', badgeClass: 'badge-cat-bencina' },
  mantencion:  { name: 'Mantención / Taller',   icon: '🔧', badgeClass: 'badge-cat-mantencion' },
  limpieza:    { name: 'Limpieza & Detailing',  icon: '🧼', badgeClass: 'badge-cat-limpieza' },
  documentos:  { name: 'Documentos & Permisos', icon: '📄', badgeClass: 'badge-cat-otrosveh' },
  repuestos:   { name: 'Repuestos & Neumáticos',icon: '🚗', badgeClass: 'badge-cat-otrosveh' },
  peajes:      { name: 'Peajes / TAG Autopista',icon: '🛣️', badgeClass: 'badge-cat-otrosveh' },
  uber_income: { name: 'Ingreso Turno Uber',    icon: '🚕', badgeClass: 'badge-cat-uber' },
  otros:       { name: 'Otros Gastos Auto',     icon: '💡', badgeClass: 'badge-cat-otrosveh' }
};

/* ==========================================================================
   TUS TARJETAS Y CUENTAS EXACTAS (DE TU CAPTURA 4)
   ========================================================================== */

const INITIAL_CARDS = [
  // 5 TARJETAS EN DEUDA (SEPARADAS - POR PAGAR MÁS ADELANTE)
  {
    id: 'card-falabella',
    name: 'CMR Mastercard',
    bank: 'Falabella',
    type: 'Crédito',
    photo: 'assets/falabella.jpg',
    lastDigits: '0987',
    holderName: 'LUIS D.',
    totalLimit: 210000,
    usedLimit: 210000,
    closingDay: 15,
    dueDay: 30,
    color: '#22c55e',
    brandClass: 'falabella',
    currency: 'CLP'
  },
  {
    id: 'card-santander',
    name: 'Santander LATAM Pass',
    bank: 'Santander',
    type: 'Crédito',
    photo: 'assets/santander.jpg',
    lastDigits: '0056',
    holderName: 'LUIS D.',
    totalLimit: 300000,
    usedLimit: 300000,
    closingDay: 25,
    dueDay: 10,
    color: '#ef4444',
    brandClass: 'santander',
    currency: 'CLP'
  },
  {
    id: 'card-tapp',
    name: 'Tapp Prepago Mastercard',
    bank: 'Tapp Caja Los Andes',
    type: 'Crédito',
    photo: 'assets/tapp.jpg',
    lastDigits: '4532',
    holderName: 'LUIS D.',
    totalLimit: 200000,
    usedLimit: 200000,
    closingDay: 10,
    dueDay: 6,
    color: '#06b6d4',
    brandClass: 'tapp',
    currency: 'CLP'
  },
  {
    id: 'card-nu',
    name: 'Tarjeta Nu Colombia',
    bank: 'Nu Colombia',
    type: 'Crédito',
    photo: 'assets/nu.jpg',
    lastDigits: '9012',
    holderName: 'LUIS D.',
    totalLimit: 1000000,
    usedLimit: 600000,
    exchangeRateCopToClp: 0.24,
    closingDay: 18,
    dueDay: 2,
    color: '#a855f7',
    brandClass: 'nu',
    currency: 'COP'
  },
  {
    id: 'card-mama-be',
    name: 'USE TARJETA MAMA',
    bank: 'BancoEstado',
    type: 'Crédito',
    photo: 'assets/bancoestado.jpg',
    lastDigits: '0000',
    holderName: 'LUIS D.',
    totalLimit: 1000000,
    usedLimit: 1000000,
    closingDay: 20,
    dueDay: 5,
    color: '#f97316',
    brandClass: 'bancoestado',
    currency: 'CLP'
  },
  // 2 CUENTAS DE USO DIARIO (PLATA PROPIA - NO ES DEUDA)
  {
    id: 'card-bancoestado',
    name: 'CuentaRUT / Visa Débito',
    bank: 'BancoEstado',
    type: 'Débito',
    photo: 'assets/bancoestado.jpg',
    lastDigits: '0001',
    holderName: 'LUIS D.',
    totalLimit: 350000,
    usedLimit: 0,
    closingDay: null,
    dueDay: null,
    color: '#f26822',
    brandClass: 'bancoestado',
    currency: 'CLP'
  },
  {
    id: 'card-efectivo',
    name: 'Billetera Efectivo (Dinero en Mano)',
    bank: 'Efectivo',
    type: 'Efectivo',
    photo: 'assets/efectivo.jpg',
    lastDigits: 'CLP',
    holderName: 'EFECTIVO',
    totalLimit: 150000,
    usedLimit: 0,
    closingDay: null,
    dueDay: null,
    color: '#10b981',
    brandClass: 'efectivo',
    currency: 'CLP'
  }
];

/* ==========================================================================
   TODOS TUS GASTOS Y CARGOS EXACTOS DE LAS CAPTURAS 1, 2 Y 3
   ========================================================================== */

const INITIAL_EXPENSES = [
  // --- A) GASTOS REALES PAGADOS (EN "MIS GASTOS" - NO SON DEUDA DE TARJETA) ---
  {
    id: 'exp-real-1',
    description: 'Auto: GASOLINA',
    amount: 35000,
    currency: 'CLP',
    date: '2026-11-29',
    cardId: 'card-bancoestado',
    category: 'auto',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },
  {
    id: 'exp-real-2',
    description: 'Auto: GASOLINA',
    amount: 20000,
    currency: 'CLP',
    date: '2026-11-27',
    cardId: 'card-efectivo',
    category: 'auto',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },
  {
    id: 'exp-real-3',
    description: 'Auto: GASOLINA SHELL',
    amount: 20000,
    currency: 'CLP',
    date: '2026-11-02',
    cardId: 'card-bancoestado',
    category: 'auto',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },
  {
    id: 'exp-real-4',
    description: 'PAGO PLA CLARO ME DEBE TIA CECI',
    amount: 33003,
    currency: 'CLP',
    date: '2026-11-02',
    cardId: 'card-efectivo',
    category: 'suscripciones',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },
  {
    id: 'exp-real-5',
    description: 'COMPRE TOMAR DISCO YA ME DEVOLVIERON LAS OTRAS CHICAS LO MIO FUE COMO 24',
    amount: 64000,
    currency: 'CLP',
    date: '2026-11-02',
    cardId: 'card-bancoestado',
    category: 'otros',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },
  {
    id: 'exp-real-6',
    description: 'PAGAR CADENA 50',
    amount: 50000,
    currency: 'CLP',
    date: '2026-11-02',
    cardId: 'card-efectivo',
    category: 'otros',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },
  {
    id: 'exp-real-7',
    description: 'PAGAR COMISION UBER 3000',
    amount: 3000,
    currency: 'CLP',
    date: '2026-11-02',
    cardId: 'card-efectivo',
    category: 'auto',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },
  {
    id: 'exp-real-8',
    description: 'COMPRA ALI EXPRES',
    amount: 13147,
    currency: 'CLP',
    date: '2026-11-02',
    cardId: 'card-efectivo',
    category: 'otros',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },
  {
    id: 'exp-real-9',
    description: 'Auto: COMPRAR PRODUCTOS DE LIMPIEZA AUTO',
    amount: 30000,
    currency: 'CLP',
    date: '2026-11-02',
    cardId: 'card-bancoestado',
    category: 'auto',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },
  {
    id: 'exp-real-10',
    description: 'Auto: ARREGLO BOTON BENCINA',
    amount: 35000,
    currency: 'CLP',
    date: '2026-10-24',
    cardId: 'card-bancoestado',
    category: 'auto',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },
  {
    id: 'exp-real-11',
    description: 'Auto: COMPRA DE GPS Y CAMARA MAS 15 DEL SEÑOR',
    amount: 205000,
    currency: 'CLP',
    date: '2026-10-24',
    cardId: 'card-bancoestado',
    category: 'auto',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },
  {
    id: 'exp-oct-1',
    description: 'auto todo',
    amount: 566900,
    currency: 'CLP',
    date: '2026-10-21',
    cardId: 'card-bancoestado',
    category: 'transferencia',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },
  {
    id: 'exp-oct-2',
    description: 'Marcos gato',
    amount: 35,
    currency: 'CLP',
    date: '2026-10-05',
    cardId: 'card-bancoestado',
    category: 'transferencia',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },
  {
    id: 'exp-oct-3',
    description: 'James 49 Diego 30...',
    amount: 1,
    currency: 'CLP',
    date: '2026-10-03',
    cardId: 'card-bancoestado',
    category: 'transferencia',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },
  {
    id: 'exp-oct-4',
    description: 'gasto Mmm nose',
    amount: 5000,
    currency: 'CLP',
    date: '2026-10-03',
    cardId: 'card-bancoestado',
    category: 'transferencia',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },
  {
    id: 'exp-oct-5',
    description: 'Le di en efectivo',
    amount: 30000,
    currency: 'CLP',
    date: '2026-10-03',
    cardId: 'card-efectivo',
    category: 'novia',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },
  {
    id: 'exp-oct-6',
    description: 'disco',
    amount: 8500,
    currency: 'CLP',
    date: '2026-10-03',
    cardId: 'card-bancoestado',
    category: 'transferencia',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },
  {
    id: 'exp-oct-7',
    description: 'salida amigos',
    amount: 24000,
    currency: 'CLP',
    date: '2026-10-03',
    cardId: 'card-bancoestado',
    category: 'alimentos',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pagado',
    isDebtOnly: false
  },

  // --- B) LOS 5 CARGOS "⏳ POR PAGAR" DE TUS TARJETAS (SEPARADOS EN DEUDAS) ---
  {
    id: 'exp-debt-mama-be',
    description: 'LO USE TODO TARJETA MAMA',
    amount: 1000000,
    currency: 'CLP',
    date: '2026-11-02',
    cardId: 'card-mama-be',
    category: 'otros',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pendiente',
    isDebtOnly: true
  },
  {
    id: 'exp-debt-nu',
    description: 'LO USE ESO',
    amount: 600000,
    currency: 'COP',
    date: '2026-11-02',
    cardId: 'card-nu',
    category: 'otros',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pendiente',
    isDebtOnly: true
  },
  {
    id: 'exp-debt-cmr',
    description: 'LO USE TODO',
    amount: 210000,
    currency: 'CLP',
    date: '2026-11-02',
    cardId: 'card-falabella',
    category: 'otros',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pendiente',
    isDebtOnly: true
  },
  {
    id: 'exp-debt-santander',
    description: 'LO USE TODO',
    amount: 300000,
    currency: 'CLP',
    date: '2026-11-02',
    cardId: 'card-santander',
    category: 'otros',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pendiente',
    isDebtOnly: true
  },
  {
    id: 'exp-debt-tapp-mama',
    description: 'LO QUE DEBO TARJETA MAMA AVANCE',
    amount: 200000,
    currency: 'CLP',
    date: '2026-11-02',
    cardId: 'card-tapp',
    category: 'otros',
    paymentMode: 'contado',
    installmentsTotal: 1,
    currentInstallment: 1,
    status: 'pendiente',
    isDebtOnly: true
  }
];

const INITIAL_INCOMES = [
  {
    id: 'inc-uber-1',
    description: 'Turno Uber (30 viajes, 5 hrs)',
    amount: 83322,
    date: '2026-11-01',
    category: 'uber',
    accountId: 'card-efectivo'
  },
  {
    id: 'inc-disco-dev',
    description: 'Devolución otras chicas tomar disco (de $64.000 lo mío fue $24.000)',
    amount: 40000,
    date: '2026-11-02',
    category: 'transferencia',
    accountId: 'card-bancoestado'
  },
  {
    id: 'inc-uber-2',
    description: 'Turno Uber (4 viajes, 5 hrs)',
    amount: 12530,
    date: '2026-10-31',
    category: 'uber',
    accountId: 'card-efectivo'
  },
  {
    id: 'inc-uber-3',
    description: 'Turno Uber (11 viajes, 5 hrs)',
    amount: 22196,
    date: '2026-10-28',
    category: 'uber',
    accountId: 'card-efectivo'
  },
  {
    id: 'inc-oct-1',
    description: 'santander',
    amount: 150000,
    date: '2026-10-03',
    category: 'transferencia',
    accountId: 'card-bancoestado'
  },
  {
    id: 'inc-oct-2',
    description: 'falabella',
    amount: 121953,
    date: '2026-10-03',
    category: 'transferencia',
    accountId: 'card-bancoestado'
  }
];

// NUEVO APARTADO: "🤝 ME DEBEN / POR COBRAR"
const INITIAL_RECEIVABLES = [
  {
    id: 'rec-tia-ceci',
    person: 'Tía Ceci',
    reason: 'PAGO PLA CLARO ME DEBE TIA CECI',
    amount: 33003,
    date: '2026-11-02',
    status: 'pendiente'
  },
  {
    id: 'rec-chicas-disco',
    person: 'Las Otras Chicas (Disco)',
    reason: 'COMPRE TOMAR DISCO ($64.000 total, lo mío fue $24.000)',
    amount: 40000,
    date: '2026-11-02',
    status: 'cobrado'
  }
];

const INITIAL_LONG_TERM_DEBTS = [];

// DATOS EXACTOS DEL VEHÍCULO (Mazda Axela VFCW14, $4.800.000, 95.000 km, 22/10/2026)
const INITIAL_VEHICLE = {
  model: 'Mazda Axela',
  year: 2017,
  color: 'Rojo Soul Red',
  licensePlate: 'VFCW14',
  odometer: 95000,
  purchasePrice: 4800000,
  acquiredDate: '2026-10-22',
  photo: 'assets/mazda_axela.jpg',
  nextMaintenanceKm: 105000,
  maintenanceNote: 'Cambio de aceite 5W-30 sintético y filtro',
  documents: {
    soap: { name: 'Seguro Obligatorio (SOAP)', dueDate: '2027-03-31', status: 'al_dia' },
    permiso: { name: 'Permiso de Circulación', dueDate: '2027-03-31', status: 'al_dia' },
    revision: { name: 'Revisión Técnica', dueDate: '2027-05-31', status: 'al_dia' }
  }
};

// LOS 9 REGISTROS EXACTOS DE TU MAZDA AXELA (FOTO 5)
const INITIAL_VEHICLE_LOGS = [
  {
    id: 'vlog-real-1',
    date: '2026-11-29',
    category: 'combustible',
    detail: 'GASOLINA',
    odometer: 142500,
    extra: 'Servicio realizado',
    amount: 35000,
    type: 'gasto',
    paymentAccount: 'CuentaRUT / Visa Débito'
  },
  {
    id: 'vlog-real-2',
    date: '2026-11-27',
    category: 'mantencion',
    detail: 'GASOLINA',
    odometer: 142500,
    extra: 'Servicio realizado',
    amount: 20000,
    type: 'gasto',
    paymentAccount: 'Billetera Efectivo (Dinero en Mano)'
  },
  {
    id: 'vlog-real-3',
    date: '2026-11-02',
    category: 'combustible',
    detail: 'GASOLINA SHELL',
    odometer: 142500,
    extra: 'Servicio realizado',
    amount: 20000,
    type: 'gasto',
    paymentAccount: 'CuentaRUT / Visa Débito'
  },
  {
    id: 'vlog-real-4',
    date: '2026-11-02',
    category: 'mantencion',
    detail: 'COMPRAR PRODUCTOS DE LIMPIEZA AUTO',
    odometer: 142500,
    extra: 'Servicio realizado',
    amount: 30000,
    type: 'gasto',
    paymentAccount: 'CuentaRUT / Visa Débito'
  },
  {
    id: 'vlog-real-5',
    date: '2026-11-01',
    category: 'uber_income',
    detail: 'Turno Uber (30 viajes, 5 hrs)',
    odometer: 94500,
    extra: '30 viajes (5 hrs)',
    amount: 83322,
    type: 'ingreso_uber',
    paymentAccount: 'Billetera Efectivo (Dinero en Mano)'
  },
  {
    id: 'vlog-real-6',
    date: '2026-10-31',
    category: 'uber_income',
    detail: 'Turno Uber (4 viajes, 5 hrs)',
    odometer: 95000,
    extra: '4 viajes (5 hrs)',
    amount: 12530,
    type: 'ingreso_uber',
    paymentAccount: 'Billetera Efectivo (Dinero en Mano)'
  },
  {
    id: 'vlog-real-7',
    date: '2026-10-28',
    category: 'uber_income',
    detail: 'Turno Uber (11 viajes, 5 hrs)',
    odometer: 95000,
    extra: '11 viajes (5 hrs)',
    amount: 22196,
    type: 'ingreso_uber',
    paymentAccount: 'Billetera Efectivo (Dinero en Mano)'
  },
  {
    id: 'vlog-real-8',
    date: '2026-10-24',
    category: 'mantencion',
    detail: 'ARREGLO BOTON BENCINA',
    odometer: 142500,
    extra: 'Servicio realizado',
    amount: 35000,
    type: 'gasto',
    paymentAccount: 'CuentaRUT / Visa Débito'
  },
  {
    id: 'vlog-real-9',
    date: '2026-10-24',
    category: 'mantencion',
    detail: 'COMPRA DE GPS Y CAMARA MAS 15 DEL SEÑOR',
    odometer: 142500,
    extra: 'Servicio realizado',
    amount: 205000,
    type: 'gasto',
    paymentAccount: 'CuentaRUT / Visa Débito'
  }
];

/* ==========================================================================
   CARGA Y SINCRONIZACIÓN DE DATOS PROTEGIDOS
   ========================================================================== */

function loadFromStorage(key, defaultData) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(defaultData));
  } catch (err) {
    return JSON.parse(JSON.stringify(defaultData));
  }
}

function loadProtectedArray(key, initialItems) {
  let stored = loadFromStorage(key, null);
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    stored = JSON.parse(JSON.stringify(initialItems));
  } else {
    initialItems.forEach(initItem => {
      if (!stored.some(item => item.id === initItem.id)) {
        stored.push(JSON.parse(JSON.stringify(initItem)));
      }
    });
  }
  localStorage.setItem(key, JSON.stringify(stored));
  return stored;
}

/* ==========================================================================
   ESTADO GLOBAL
   ========================================================================== */

let appState = {
  cards: loadProtectedArray(STORAGE_KEYS.CARDS, INITIAL_CARDS),
  expenses: loadProtectedArray(STORAGE_KEYS.EXPENSES, INITIAL_EXPENSES),
  incomes: loadProtectedArray(STORAGE_KEYS.INCOMES, INITIAL_INCOMES),
  receivables: loadProtectedArray(STORAGE_KEYS.RECEIVABLES, INITIAL_RECEIVABLES),
  longTermDebts: loadFromStorage(STORAGE_KEYS.LONG_TERM_DEBTS, INITIAL_LONG_TERM_DEBTS),
  vehicle: loadFromStorage(STORAGE_KEYS.VEHICLE, INITIAL_VEHICLE),
  vehicleLogs: loadProtectedArray(STORAGE_KEYS.VEHICLE_LOGS, INITIAL_VEHICLE_LOGS),
  activeTab: localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB) || 'tab-dashboard',
  selectedMonth: 'ALL',
  flowFilter: 'ALL',
  searchTerm: '',
  vehicleFilter: 'ALL',
  vehicleSearchTerm: '',
  quickAddMode: 'GASTO',
  quickSelectedCat: 'alimentos',
  theme: localStorage.getItem(STORAGE_KEYS.THEME) || 'light'
};

let chartCatInstance = null;
let chartDebtsInstance = null;
let chartVehicleCategoriesInstance = null;
let chartVehicleEvolutionInstance = null;

/* ==========================================================================
   INICIALIZACIÓN
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(appState.theme);
  setupEventListeners();
  populateMonthSelectOptions();
  renderAllViews();
});

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(appState.cards));
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(appState.expenses));
    localStorage.setItem(STORAGE_KEYS.INCOMES, JSON.stringify(appState.incomes));
    localStorage.setItem(STORAGE_KEYS.RECEIVABLES, JSON.stringify(appState.receivables));
    localStorage.setItem(STORAGE_KEYS.LONG_TERM_DEBTS, JSON.stringify(appState.longTermDebts));
    localStorage.setItem(STORAGE_KEYS.VEHICLE, JSON.stringify(appState.vehicle));
    localStorage.setItem(STORAGE_KEYS.VEHICLE_LOGS, JSON.stringify(appState.vehicleLogs));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, appState.activeTab);
    localStorage.setItem(STORAGE_KEYS.THEME, appState.theme);
  } catch (err) {
    console.error('Error guardando estado:', err);
  }
}

function isCreditOrDeferredExpense(exp) {
  if (exp.isDebtOnly === true) return true;
  if (exp.isDebtOnly === false) return false;
  if (exp.status === 'pendiente') return true;
  const card = appState.cards.find(c => c.id === exp.cardId);
  return !!(card && card.type === 'Crédito');
}

/* ==========================================================================
   RENDERIZADO GLOBAL
   ========================================================================== */

function renderAllViews() {
  renderNavigationState();
  renderDailyMisGastosView();
  renderVehicleSection();
  renderIsolatedDebtsAndCardsView();
  renderReceivablesView();
  renderAccountsView();
  renderQuickAddCategoryGrid();
  if (appState.activeTab === 'tab-charts') {
    renderAllCharts();
  }
}

function renderNavigationState() {
  const validTabs = ['tab-dashboard', 'tab-vehicle', 'tab-debts', 'tab-receivables', 'tab-accounts', 'tab-charts'];
  if (!validTabs.includes(appState.activeTab)) {
    appState.activeTab = 'tab-dashboard';
  }

  const paneMap = {
    'tab-dashboard':   'tabPaneDashboard',
    'tab-vehicle':     'tabPaneVehicle',
    'tab-debts':       'tabPaneDebts',
    'tab-receivables': 'tabPaneReceivables',
    'tab-accounts':    'tabPaneAccounts',
    'tab-charts':      'tabPaneCharts'
  };

  const titleMap = {
    'tab-dashboard':   'Mis Gastos',
    'tab-vehicle':     'AutoControl PRO — Mazda Axela',
    'tab-debts':       'Deudas y Tarjetas (Separadas)',
    'tab-receivables': '¿Quién me debe? (Por Cobrar)',
    'tab-accounts':    'Mis Cuentas y Efectivo',
    'tab-charts':      'Gráficos e Informes'
  };

  const titleEl = document.getElementById('headerSectionTitle');
  if (titleEl) titleEl.textContent = titleMap[appState.activeTab] || 'Mis Gastos';

  Object.entries(paneMap).forEach(([tabKey, paneId]) => {
    const pane = document.getElementById(paneId);
    if (pane) pane.classList.toggle('active', tabKey === appState.activeTab);
  });

  document.querySelectorAll('.dq-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === appState.activeTab);
  });

  document.querySelectorAll('.mg-dock-item[data-tab]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === appState.activeTab);
  });
}

window.setActiveTab = function(tabId) {
  appState.activeTab = tabId;
  saveState();
  renderNavigationState();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (tabId === 'tab-charts') {
    setTimeout(renderAllCharts, 50);
  }
};

/* ==========================================================================
   PESTAÑA 1: "MIS GASTOS" (FLUJO DIARIO LIMPIO Y SEPARADO DE DEUDAS)
   ========================================================================== */

function populateMonthSelectOptions() {
  const select = document.getElementById('selectMonthFilter');
  if (!select) return;

  const monthsSet = new Set(['2026-11', '2026-10']);
  appState.expenses.forEach(e => {
    if (e.date && e.date.length >= 7) monthsSet.add(e.date.slice(0, 7));
  });
  appState.incomes.forEach(i => {
    if (i.date && i.date.length >= 7) monthsSet.add(i.date.slice(0, 7));
  });

  const monthNamesShort = {
    '01': 'ene', '02': 'feb', '03': 'mar', '04': 'abr',
    '05': 'may', '06': 'jun', '07': 'jul', '08': 'ago',
    '09': 'sep', '10': 'oct', '11': 'nov', '12': 'dic'
  };

  const sortedMonths = Array.from(monthsSet).sort().reverse();
  const currentVal = appState.selectedMonth || 'ALL';

  select.innerHTML = `<option value="ALL">Todo ▾</option>`;
  sortedMonths.forEach(ym => {
    const [yr, mo] = ym.split('-');
    const lbl = `${monthNamesShort[mo] || mo} ${yr === '2026' ? '' : yr} ▾`.trim();
    const opt = document.createElement('option');
    opt.value = ym;
    opt.textContent = lbl;
    select.appendChild(opt);
  });

  select.value = currentVal;
}

function renderDailyMisGastosView() {
  const dailyExpenses = appState.expenses.filter(exp => !isCreditOrDeferredExpense(exp));
  const dailyIncomes = appState.incomes || [];

  const monthFilter = appState.selectedMonth || 'ALL';
  const search = (appState.searchTerm || '').toLowerCase().trim();
  const flowFilter = appState.flowFilter || 'ALL';

  const monthExpenses = dailyExpenses.filter(e => monthFilter === 'ALL' || (e.date || '').startsWith(monthFilter));
  const monthIncomes = dailyIncomes.filter(i => monthFilter === 'ALL' || (i.date || '').startsWith(monthFilter));

  const totalGastosMes = monthExpenses.reduce((acc, e) => acc + (parseFloat(e.amount) || 0), 0);
  const totalIngresosMes = monthIncomes.reduce((acc, i) => acc + (parseFloat(i.amount) || 0), 0);
  const saldoMes = totalIngresosMes - totalGastosMes;

  const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setTxt('kpiTotalGastos', formatNumberClean(totalGastosMes));
  setTxt('kpiTotalIngresos', formatNumberClean(totalIngresosMes));
  setTxt('kpiSaldoMes', formatNumberClean(saldoMes));
  setTxt('lblSelectedYear', monthFilter === 'ALL' ? '2026 (Todo)' : monthFilter.split('-')[0]);

  // Actualizar chips inteligentes superiores
  const creditCards = appState.cards.filter(c => c.type === 'Crédito');
  let totalIsolatedDebt = 0;
  creditCards.forEach(c => {
    totalIsolatedDebt += c.currency === 'COP'
      ? Math.round((c.usedLimit || 0) * (c.exchangeRateCopToClp || 0.24))
      : (c.usedLimit || 0);
  });
  (appState.longTermDebts || []).forEach(d => {
    totalIsolatedDebt += (parseFloat(d.remainingAmount) || 0);
  });
  setTxt('chipIsolatedDebtTotal', formatCurrencyCLP(totalIsolatedDebt));

  const pendingReceivables = (appState.receivables || [])
    .filter(r => r.status !== 'cobrado')
    .reduce((acc, r) => acc + (parseFloat(r.amount) || 0), 0);
  setTxt('chipReceivablesTotal', formatCurrencyCLP(pendingReceivables));

  let unifiedMovements = [];

  if (flowFilter !== 'INGRESOS') {
    monthExpenses.forEach(e => {
      if (flowFilter === 'CAT_AUTO' && e.category !== 'auto') return;
      if (flowFilter === 'EFECTIVO' && e.cardId !== 'card-efectivo') return;
      if (flowFilter === 'BANCOESTADO' && e.cardId !== 'card-bancoestado') return;

      if (search) {
        const catInfo = getCategoryMeta(e.category, 'GASTO');
        const match = (e.description || '').toLowerCase().includes(search) ||
                      catInfo.name.toLowerCase().includes(search) ||
                      String(e.amount).includes(search);
        if (!match) return;
      }
      unifiedMovements.push({
        id: e.id,
        kind: 'GASTO',
        description: e.description,
        amount: parseFloat(e.amount) || 0,
        date: e.date || '2026-11-02',
        category: e.category || 'otros',
        accountId: e.cardId
      });
    });
  }

  if (flowFilter === 'ALL' || flowFilter === 'INGRESOS') {
    monthIncomes.forEach(i => {
      if (search) {
        const catInfo = getCategoryMeta(i.category, 'INGRESO');
        const match = (i.description || '').toLowerCase().includes(search) ||
                      catInfo.name.toLowerCase().includes(search) ||
                      String(i.amount).includes(search);
        if (!match) return;
      }
      unifiedMovements.push({
        id: i.id,
        kind: 'INGRESO',
        description: i.description,
        amount: parseFloat(i.amount) || 0,
        date: i.date || '2026-11-01',
        category: i.category || 'transferencia',
        accountId: i.accountId
      });
    });
  }

  const groupedByDate = {};
  unifiedMovements.forEach(mov => {
    if (!groupedByDate[mov.date]) groupedByDate[mov.date] = [];
    groupedByDate[mov.date].push(mov);
  });

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(b) - new Date(a));
  const timelineContainer = document.getElementById('dailyTimelineContainer');
  if (!timelineContainer) return;

  timelineContainer.innerHTML = '';

  if (sortedDates.length === 0) {
    timelineContainer.innerHTML = `
      <div class="mg-day-group" style="padding: 2.5rem 1rem; text-align: center;">
        <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">📋</div>
        <h3 style="font-size: 1rem; margin-bottom: 0.3rem;">No hay movimientos con este filtro</h3>
        <button class="btn btn-primary" style="margin-top: 0.6rem;" onclick="openQuickAddModal('GASTO')">＋ Agregar Movimiento</button>
      </div>
    `;
    return;
  }

  sortedDates.forEach(dateStr => {
    const dayMovements = groupedByDate[dateStr];
    let dayGastos = 0;
    let dayIngresos = 0;

    dayMovements.forEach(m => {
      if (m.kind === 'GASTO') dayGastos += m.amount;
      else dayIngresos += m.amount;
    });

    const dayHeaderLabel = formatDayGroupHeader(dateStr);
    const groupEl = document.createElement('div');
    groupEl.className = 'mg-day-group';

    let rightTotalsHtml = '';
    if (dayGastos > 0) rightTotalsHtml += `<span>Gastos: <strong>${formatNumberClean(dayGastos)}</strong></span>`;
    if (dayIngresos > 0) rightTotalsHtml += `<span>Ingresos: <strong>${formatNumberClean(dayIngresos)}</strong></span>`;

    const rowsHtml = dayMovements.map(m => {
      const catMeta = getCategoryMeta(m.category, m.kind);
      const card = appState.cards.find(c => c.id === m.accountId);
      const accountLabel = card ? (card.type === 'Efectivo' ? '💵 Efectivo' : `🏦 ${card.bank}`) : 'Cuenta';
      const circleBg = m.kind === 'INGRESO' ? '#4cd964' : (catMeta.color || '#4f7df3');
      const signPrefix = m.kind === 'GASTO' ? '-' : '+';
      const amountClass = m.kind === 'INGRESO' ? 'mg-mov-amount is-income' : 'mg-mov-amount';

      return `
        <div class="mg-movement-row">
          <div class="mg-mov-left">
            <div class="mg-mov-circle" style="background: ${circleBg};" title="${escapeHTML(catMeta.name)}">
              ${catMeta.icon}
            </div>
            <div class="mg-mov-texts">
              <div class="mg-mov-title">${escapeHTML(m.description)}</div>
              <div class="mg-mov-sub">
                <span>${escapeHTML(catMeta.name)}</span>
                <span>•</span>
                <span>${escapeHTML(accountLabel)}</span>
                ${m.kind === 'GASTO' ? `<button type="button" class="link-inline-btn" style="font-size: 0.7rem;" onclick="moveExpenseToDebt('${m.id}')">↪ Pasar a Deuda</button>` : ''}
              </div>
            </div>
          </div>
          <div class="mg-mov-right">
            <span class="${amountClass}">${signPrefix} $ ${formatNumberClean(m.amount)}</span>
            <button type="button" class="mg-mov-del-btn" onclick="openEditMovement('${m.kind}', '${m.id}')" title="Editar">✏️</button>
            <button type="button" class="mg-mov-del-btn" onclick="deleteMovement('${m.kind}', '${m.id}')" title="Eliminar">🗑️</button>
          </div>
        </div>
      `;
    }).join('');

    groupEl.innerHTML = `
      <div class="mg-day-header">
        <div class="mg-day-date-left">${dayHeaderLabel}</div>
        <div class="mg-day-totals-right">${rightTotalsHtml}</div>
      </div>
      <div class="mg-day-rows">
        ${rowsHtml}
      </div>
    `;

    timelineContainer.appendChild(groupEl);
  });
}

function getCategoryMeta(catId, kind = 'GASTO') {
  if (ALL_CATEGORIES_MAP[catId]) return ALL_CATEGORIES_MAP[catId];
  if (kind === 'INGRESO') {
    return { name: catId || 'Ingreso', icon: '📲', color: '#4cd964' };
  }
  return { name: catId || 'Gasto', icon: '📦', color: '#64748b' };
}

/* ==========================================================================
   MODAL "AGREGAR / EDITAR" CON MINI CALCULADORA Y CHIPS RÁPIDOS
   ========================================================================== */

window.openQuickAddModal = function(mode = 'GASTO') {
  appState.quickAddMode = mode;
  document.getElementById('quickEditIdInput').value = '';
  document.getElementById('quickModeInput').value = mode;
  document.getElementById('lblQuickModalTitle').textContent = 'Agregar';

  if (mode === 'GASTO') appState.quickSelectedCat = 'alimentos';
  else if (mode === 'INGRESO') appState.quickSelectedCat = 'transferencia';
  else appState.quickSelectedCat = 'tarjeta';

  document.getElementById('quickDateInput').value = new Date().toISOString().split('T')[0];
  document.getElementById('quickNoteInput').value = '';
  document.getElementById('quickAmountInput').value = '';

  renderQuickAddCategoryGrid();
  openModal('modalAddExpense');

  setTimeout(() => {
    document.getElementById('quickNoteInput')?.focus();
  }, 80);
};

window.openEditMovement = function(kind, id) {
  if (kind === 'INGRESO') {
    const inc = appState.incomes.find(i => i.id === id);
    if (!inc) return;
    appState.quickAddMode = 'INGRESO';
    appState.quickSelectedCat = inc.category || 'transferencia';
    document.getElementById('quickEditIdInput').value = inc.id;
    document.getElementById('quickModeInput').value = 'INGRESO';
    document.getElementById('lblQuickModalTitle').textContent = 'Editar Ingreso';
    renderQuickAddCategoryGrid();
    document.getElementById('quickNoteInput').value = inc.description;
    document.getElementById('quickAmountInput').value = inc.amount;
    document.getElementById('quickDateInput').value = inc.date;
    if (inc.accountId) document.getElementById('quickAccountSelect').value = inc.accountId;
    openModal('modalAddExpense');
  } else {
    const exp = appState.expenses.find(e => e.id === id);
    if (!exp) return;
    const isDebt = isCreditOrDeferredExpense(exp);
    appState.quickAddMode = isDebt ? 'DEUDA_TARJETA' : 'GASTO';
    appState.quickSelectedCat = exp.category || 'otros';
    document.getElementById('quickEditIdInput').value = exp.id;
    document.getElementById('quickModeInput').value = appState.quickAddMode;
    document.getElementById('lblQuickModalTitle').textContent = 'Editar Movimiento';
    renderQuickAddCategoryGrid();
    document.getElementById('quickNoteInput').value = exp.description;
    document.getElementById('quickAmountInput').value = exp.amount;
    document.getElementById('quickDateInput').value = exp.date;
    if (exp.cardId) document.getElementById('quickAccountSelect').value = exp.cardId;
    openModal('modalAddExpense');
  }
};

function renderQuickAddCategoryGrid() {
  const mode = appState.quickAddMode || 'GASTO';
  const grid = document.getElementById('quickCategoriesGrid');
  if (!grid) return;

  document.querySelectorAll('.mg-seg-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.addMode === mode);
  });

  const categoriesList = mode === 'INGRESO' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  if (!categoriesList.some(c => c.id === appState.quickSelectedCat)) {
    appState.quickSelectedCat = categoriesList[0].id;
  }

  const selectedObj = categoriesList.find(c => c.id === appState.quickSelectedCat) || categoriesList[0];
  const lblSelected = document.getElementById('lblQuickSelectedCategory');
  if (lblSelected) lblSelected.textContent = `${selectedObj.icon} ${selectedObj.name}`;
  document.getElementById('quickCategoryInput').value = selectedObj.id;

  grid.innerHTML = '';
  categoriesList.forEach(cat => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `mg-cat-item ${cat.id === appState.quickSelectedCat ? 'active' : ''}`;
    btn.innerHTML = `
      <div class="mg-cat-circle">${cat.icon}</div>
      <span class="mg-cat-label">${escapeHTML(cat.name)}</span>
    `;
    btn.addEventListener('click', () => {
      appState.quickSelectedCat = cat.id;
      document.getElementById('quickCategoryInput').value = cat.id;
      renderQuickAddCategoryGrid();
      document.getElementById('quickNoteInput')?.focus();
    });
    grid.appendChild(btn);
  });

  const selectAcc = document.getElementById('quickAccountSelect');
  const lblAcc = document.getElementById('lblQuickAccountSelect');
  const wrapInst = document.getElementById('wrapQuickInstallments');

  if (selectAcc) {
    selectAcc.innerHTML = '';
    if (mode === 'DEUDA_TARJETA') {
      if (lblAcc) lblAcc.textContent = '💳 Tarjeta:';
      if (wrapInst) wrapInst.style.display = 'flex';
      const creditCards = appState.cards.filter(c => c.type === 'Crédito');
      creditCards.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = `${c.name} (${c.bank})`;
        selectAcc.appendChild(opt);
      });
    } else {
      if (lblAcc) lblAcc.textContent = '🏦 Medio:';
      if (wrapInst) wrapInst.style.display = 'none';
      const liquidCards = appState.cards.filter(c => c.type !== 'Crédito');
      liquidCards.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = `${c.bank} (${c.type})`;
        selectAcc.appendChild(opt);
      });
    }
  }
}

/**
 * Evalúa sumas o restas simples en el campo de monto (ej: "20000+15000" o "64000-40000")
 */
function parseSmartMathAmount(rawStr) {
  if (!rawStr) return NaN;
  const cleaned = String(rawStr).replace(/\./g, '').replace(/,/g, '.').trim();
  if (/^[\d.+\-*\/() ]+$/.test(cleaned)) {
    try {
      const result = Function(`"use strict"; return (${cleaned});`)();
      return typeof result === 'number' && isFinite(result) ? Math.round(result) : NaN;
    } catch (_) {
      return parseFloat(cleaned);
    }
  }
  return parseFloat(cleaned);
}

function handleQuickMovementSubmit(e) {
  e.preventDefault();

  const editId = document.getElementById('quickEditIdInput').value;
  const mode = document.getElementById('quickModeInput').value || 'GASTO';
  const category = document.getElementById('quickCategoryInput').value || 'alimentos';
  const accountId = document.getElementById('quickAccountSelect').value;
  const date = document.getElementById('quickDateInput').value || new Date().toISOString().split('T')[0];
  let note = document.getElementById('quickNoteInput').value.trim();
  let amount = parseSmartMathAmount(document.getElementById('quickAmountInput').value);

  if ((isNaN(amount) || amount <= 0) && note) {
    const match = note.match(/^(.*?)\s+(\d+(?:[.,]\d+)?)$/);
    if (match) {
      note = match[1].trim();
      amount = parseSmartMathAmount(match[2]);
    }
  }

  if (isNaN(amount) || amount <= 0) {
    showToast('Ingresa un monto válido.', '⚠️');
    return;
  }

  const catMeta = getCategoryMeta(category, mode);
  if (!note) note = catMeta.name;

  // Si estamos editando un movimiento existente
  if (editId) {
    if (mode === 'INGRESO') {
      const inc = appState.incomes.find(i => i.id === editId);
      if (inc) {
        Object.assign(inc, { description: note, amount, date, category, accountId });
      }
    } else {
      const exp = appState.expenses.find(x => x.id === editId);
      if (exp) {
        Object.assign(exp, {
          description: note,
          amount,
          date,
          category,
          cardId: accountId,
          isDebtOnly: mode === 'DEUDA_TARJETA'
        });
      }
    }
    saveState();
    populateMonthSelectOptions();
    renderAllViews();
    closeModal('modalAddExpense');
    showToast('✏️ Movimiento actualizado.', '✅');
    return;
  }

  if (mode === 'INGRESO') {
    appState.incomes.unshift({
      id: 'inc-' + Date.now(),
      description: note,
      amount,
      date,
      category,
      accountId
    });
    showToast(`💰 Ingreso "+$${formatNumberClean(amount)}" agregado`, '✅');
  } else if (mode === 'DEUDA_TARJETA') {
    const cuotas = parseInt(document.getElementById('quickInstallmentsSelect')?.value || '1') || 1;
    const card = appState.cards.find(c => c.id === accountId);
    const isCOP = card && card.currency === 'COP';

    appState.expenses.unshift({
      id: 'exp-' + Date.now(),
      description: note,
      amount,
      currency: isCOP ? 'COP' : 'CLP',
      date,
      cardId: accountId,
      category,
      paymentMode: cuotas > 1 ? 'cuotas' : 'contado',
      installmentsTotal: cuotas,
      currentInstallment: 1,
      status: 'pendiente',
      isDebtOnly: true
    });

    if (card) card.usedLimit = (card.usedLimit || 0) + amount;
    showToast(`💳 Cargo anotado en ${card ? card.name : 'Tarjeta'} (Separado en Deudas)`, '🔒');
  } else {
    appState.expenses.unshift({
      id: 'exp-' + Date.now(),
      description: note,
      amount,
      currency: 'CLP',
      date,
      cardId: accountId,
      category,
      paymentMode: 'contado',
      installmentsTotal: 1,
      currentInstallment: 1,
      status: 'pagado',
      isDebtOnly: false
    });
    showToast(`📋 Gasto "-$${formatNumberClean(amount)}" registrado en Mis Gastos`, '✅');
  }

  saveState();
  populateMonthSelectOptions();
  renderAllViews();
  closeModal('modalAddExpense');
}

window.deleteMovement = function(kind, id) {
  if (!confirm('¿Eliminar este movimiento?')) return;
  if (kind === 'INGRESO') {
    appState.incomes = appState.incomes.filter(i => i.id !== id);
  } else {
    appState.expenses = appState.expenses.filter(e => e.id !== id);
  }
  saveState();
  renderAllViews();
  showToast('Movimiento eliminado.', '🗑️');
};

window.moveExpenseToDebt = function(expId) {
  const exp = appState.expenses.find(e => e.id === expId);
  if (!exp) return;
  exp.isDebtOnly = true;
  exp.status = 'pendiente';
  saveState();
  renderAllViews();
  showToast('🔒 Movimiento separado en Deudas / Tarjetas.', '💳');
};

window.moveDebtToDailyExpense = function(expId) {
  const exp = appState.expenses.find(e => e.id === expId);
  if (!exp) return;
  exp.isDebtOnly = false;
  exp.status = 'pagado';
  saveState();
  renderAllViews();
  showToast('📋 Movimiento pasado a Mis Gastos pagados.', '✅');
};

/* ==========================================================================
   PESTAÑA 2: AUTOCONTROL PRO & UBER (MAZDA AXELA VFCW14)
   ========================================================================== */

function renderVehicleSection() {
  const veh = appState.vehicle || INITIAL_VEHICLE;
  const logs = appState.vehicleLogs || [];

  const setText = (id, txt) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  };

  setText('vehTitleDisplay', veh.model || 'Mazda Axela');
  setText('vehYearBadge', `Año ${veh.year || 2017}`);
  setText('vehColorBadge', `🔴 ${veh.color || 'Rojo Soul Red'}`);
  setText('vehPlateBadge', veh.licensePlate || 'VFCW14');
  setText('vehOdometerDisplay', `${Number(veh.odometer || 95000).toLocaleString('es-CL')} km`);
  setText('vehAcquiredDisplay', formatReadableDate(veh.acquiredDate) || '22/10/2026');

  const purchasePrice = parseFloat(veh.purchasePrice) || 4800000;
  let operatingExpenses = 0;
  let operatingCount = 0;
  let fuelTotal = 0;
  let fuelCount = 0;
  let maintTotal = 0;
  let maintCount = 0;
  let cleanTotal = 0;
  let cleanCount = 0;
  let novExpenses = 0;

  let uberGrossEarnings = 0;
  let uberTripsCount = 0;
  let uberHoursCount = 0;
  let uberDrivingExpenses = 0;

  logs.forEach(log => {
    const amt = parseFloat(log.amount) || 0;
    const isNov = (log.date || '').startsWith('2026-11');

    if (log.type === 'ingreso_uber' || log.category === 'uber_income') {
      uberGrossEarnings += amt;
      const tMatch = (log.extra || log.detail || '').match(/(\d+)\s*viajes?/i);
      if (tMatch) uberTripsCount += parseInt(tMatch[1]);
      else uberTripsCount += 1;

      const hMatch = (log.extra || log.detail || '').match(/([\d.]+)\s*hrs?/i);
      if (hMatch) uberHoursCount += parseFloat(hMatch[1]);
    } else {
      operatingExpenses += amt;
      operatingCount++;
      if (isNov) novExpenses += amt;

      if (log.category === 'combustible') {
        fuelTotal += amt;
        fuelCount++;
        uberDrivingExpenses += amt;
      } else if (log.category === 'mantencion') {
        maintTotal += amt;
        maintCount++;
      } else if (log.category === 'limpieza') {
        cleanTotal += amt;
        cleanCount++;
      } else if (log.category === 'peajes') {
        uberDrivingExpenses += amt;
      }
    }
  });

  const totalInvestment = purchasePrice + operatingExpenses;
  const uberNetProfit = uberGrossEarnings - uberDrivingExpenses;
  const uberMargin = uberGrossEarnings > 0 ? Math.round((uberNetProfit / uberGrossEarnings) * 100) : 0;
  const avgPerTrip = uberTripsCount > 0 ? Math.round(uberGrossEarnings / uberTripsCount) : 0;
  const avgPerHour = uberHoursCount > 0 ? Math.round(uberGrossEarnings / uberHoursCount) : 0;

  setText('vehKpiPurchasePrice', formatCurrencyCLP(purchasePrice));
  setText('vehKpiOperatingExpenses', formatCurrencyCLP(operatingExpenses));
  setText('vehKpiOperatingSub', `${operatingCount} gastos registrados`);
  setText('vehKpiTotalInvestment', formatCurrencyCLP(totalInvestment));

  setText('vehKpiFuel', formatCurrencyCLP(fuelTotal));
  setText('vehKpiFuelLiters', `${fuelCount} cargas registradas`);
  setText('vehKpiMaintenance', formatCurrencyCLP(maintTotal));
  setText('vehKpiMaintenanceCount', `${maintCount} servicios`);
  setText('vehKpiCleaning', formatCurrencyCLP(cleanTotal));
  setText('vehKpiCleaningCount', `${cleanCount} cuidados`);
  setText('vehKpiMonth', formatCurrencyCLP(novExpenses));
  setText('vehKpiMonthLabel', 'Noviembre 2026');

  setText('uberKpiGrossEarnings', `+ ${formatCurrencyCLP(uberGrossEarnings)}`);
  setText('uberKpiTripsCount', `${uberTripsCount} viajes registrados`);
  setText('uberKpiDrivingExpenses', `- ${formatCurrencyCLP(uberDrivingExpenses)}`);
  setText('uberKpiNetProfit', `+${formatCurrencyCLP(uberNetProfit)}`);
  setText('uberKpiProfitMargin', `Margen de Ganancia: ${uberMargin}%`);
  setText('uberKpiAvgPerTrip', `${formatCurrencyCLP(avgPerTrip)} / viaje`);
  setText('uberKpiAvgPerHour', `≈ ${formatCurrencyCLP(avgPerHour)} por hora (${uberHoursCount || 15} hrs)`);
  setText('chipUberNetProfit', `+ ${formatCurrencyCLP(uberNetProfit)}`);

  renderVehicleLogsTable();
  populateVehicleAccountSelects();
}

function renderVehicleLogsTable() {
  const tableBody = document.getElementById('vehicleTableBody');
  const emptyState = document.getElementById('vehicleEmptyState');
  if (!tableBody) return;

  tableBody.innerHTML = '';
  const logs = appState.vehicleLogs || [];

  const counts = {
    ALL: logs.length,
    combustible: logs.filter(l => l.category === 'combustible').length,
    mantencion: logs.filter(l => l.category === 'mantencion').length,
    limpieza: logs.filter(l => l.category === 'limpieza').length,
    documentos: logs.filter(l => l.category === 'documentos').length,
    repuestos: logs.filter(l => l.category === 'repuestos').length,
    peajes: logs.filter(l => l.category === 'peajes').length,
    uber_income: logs.filter(l => l.category === 'uber_income' || l.type === 'ingreso_uber').length,
    otros: logs.filter(l => l.category === 'otros').length
  };

  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('countVehAll', counts.ALL);
  setEl('countVehFuel', counts.combustible);
  setEl('countVehMaint', counts.mantencion);
  setEl('countVehClean', counts.limpieza);
  setEl('countVehDocs', counts.documentos);
  setEl('countVehParts', counts.repuestos);
  setEl('countVehTolls', counts.peajes);
  setEl('countVehUber', counts.uber_income);
  setEl('countVehOthers', counts.otros);

  const searchTerm = (appState.vehicleSearchTerm || '').toLowerCase();
  const filterCat = appState.vehicleFilter || 'ALL';

  let filtered = logs.filter(log => {
    if (filterCat !== 'ALL') {
      if (filterCat === 'uber_income') {
        if (log.category !== 'uber_income' && log.type !== 'ingreso_uber') return false;
      } else if (log.category !== filterCat) {
        return false;
      }
    }
    if (searchTerm) {
      const m1 = (log.detail || '').toLowerCase().includes(searchTerm);
      const m2 = (log.extra || '').toLowerCase().includes(searchTerm);
      const m3 = (log.paymentAccount || '').toLowerCase().includes(searchTerm);
      if (!m1 && !m2 && !m3) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    return;
  }
  if (emptyState) emptyState.style.display = 'none';

  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  filtered.forEach(log => {
    const isUber = log.type === 'ingreso_uber' || log.category === 'uber_income';
    const catMeta = VEHICLE_CATEGORIES_META[log.category] || {
      name: isUber ? 'Ingreso Turno Uber' : 'Gasto Auto',
      icon: isUber ? '🚕' : '🚗',
      badgeClass: isUber ? 'badge-cat-uber' : 'badge-cat-otrosveh'
    };

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-family: var(--font-mono); font-size: 0.8rem; white-space: nowrap;">
        📅 ${formatReadableDate(log.date)}
      </td>
      <td>
        <span class="badge-veh ${catMeta.badgeClass}">
          ${catMeta.icon} ${catMeta.name}
        </span>
      </td>
      <td>
        <strong style="font-size: 0.86rem;">${escapeHTML(log.detail)}</strong>
        ${log.paymentAccount ? `<div style="font-size: 0.72rem; color: var(--text-muted);">💳 ${escapeHTML(log.paymentAccount)}</div>` : ''}
      </td>
      <td style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent-info);">
        ${log.odometer ? `${Number(log.odometer).toLocaleString('es-CL')} km` : '—'}
      </td>
      <td style="font-size: 0.78rem; color: var(--text-secondary);">
        ${escapeHTML(log.extra || 'Servicio realizado')}
      </td>
      <td style="font-family: var(--font-mono); font-weight: 800; white-space: nowrap; ${isUber ? 'color: #10b981;' : 'color: #ef4444;'}">
        ${isUber ? '+ ' : '- '}${formatCurrencyCLP(log.amount)}
      </td>
      <td>
        <button class="mg-mov-del-btn" onclick="deleteVehicleLog('${log.id}')" title="Eliminar">🗑️</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

function populateVehicleAccountSelects() {
  ['fuelAccount', 'vehExpAccount', 'uberAccount'].forEach(selectId => {
    const el = document.getElementById(selectId);
    if (!el) return;
    el.innerHTML = '';
    appState.cards.filter(c => c.type !== 'Crédito').forEach(card => {
      const opt = document.createElement('option');
      opt.value = card.name;
      opt.textContent = `${card.name} (${card.bank})`;
      el.appendChild(opt);
    });
  });
}

/* ==========================================================================
   PESTAÑA 3: TUS 5 TARJETAS EN DEUDA VISUALES (IDÉNTICAS A TU FOTO 4)
   ========================================================================== */

function renderIsolatedDebtsAndCardsView() {
  const creditCards = appState.cards.filter(c => c.type === 'Crédito');
  const creditExpenses = appState.expenses.filter(exp => isCreditOrDeferredExpense(exp));
  const longTermDebts = appState.longTermDebts || [];

  let totalCLPOnly = 0;
  let totalNuCLP = 0;

  creditCards.forEach(c => {
    if (c.currency === 'COP') {
      totalNuCLP += Math.round((c.usedLimit || 0) * (c.exchangeRateCopToClp || 0.24));
    } else {
      totalCLPOnly += (c.usedLimit || 0);
    }
  });

  const totalLongTermCLP = longTermDebts.reduce((acc, d) => acc + (parseFloat(d.remainingAmount) || 0), 0);
  const totalAllIsolatedDebt = totalCLPOnly + totalNuCLP + totalLongTermCLP;

  const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setTxt('kpiIsolatedCardsCLP', formatCurrencyCLP(totalCLPOnly));
  setTxt('kpiIsolatedNuCLP', formatCurrencyCLP(totalNuCLP));
  setTxt('kpiIsolatedTotalDebt', formatCurrencyCLP(totalAllIsolatedDebt));
  setTxt('navBadgeDebtsCount', creditCards.length);

  // Renderizar las 5 Tarjetas con Diseño Visual (Foto Real + Chip + Barra de Deuda)
  const creditGrid = document.getElementById('creditCardsGridContainer');
  if (creditGrid) {
    creditGrid.innerHTML = '';
    creditCards.forEach(card => {
      const isCOP = card.currency === 'COP';
      const rate = card.exchangeRateCopToClp || 0.24;
      const used = card.usedLimit || 0;
      const total = card.totalLimit || 1;
      const avail = Math.max(0, total - used);
      const pct = Math.min(100, Math.round((used / total) * 100));

      const usedStr = isCOP ? `${formatCurrencyCOP(used)} COP` : formatCurrencyCLP(used);
      const totalStr = isCOP ? `${formatCurrencyCOP(total)} COP` : formatCurrencyCLP(total);
      const availStr = isCOP ? `${formatCurrencyCOP(avail)} COP` : formatCurrencyCLP(avail);

      let nuExtraHtml = '';
      if (isCOP) {
        nuExtraHtml = `
          <div style="margin-top: 0.3rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.3rem;">
            <span style="background: rgba(168,85,247,0.25); border: 1px solid rgba(168,85,247,0.5); color: #e9d5ff; padding: 0.15rem 0.5rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700;">
              🇨🇴 Deuda: ≈ ${formatCurrencyCLP(used * rate)} CLP
            </span>
            <span style="font-size: 0.7rem; color: #d8b4fe; font-family: var(--font-mono);">
              Disponible: ≈ ${formatCurrencyCLP(avail * rate)} CLP
            </span>
          </div>
        `;
      }

      const box = document.createElement('div');
      box.className = 'visual-credit-card-box';
      box.innerHTML = `
        <div class="vcc-front" style="background-image: url('${card.photo}');">
          <div class="vcc-overlay">
            <div class="vcc-top-row">
              <span class="vcc-bank-pill">${escapeHTML(card.bank)}</span>
              <div class="vcc-chip"></div>
            </div>
            <div class="vcc-digits">•••• •••• •••• ${escapeHTML(card.lastDigits || '0000')}</div>
            <div class="vcc-bottom-row">
              <div>
                <div class="vcc-title">${escapeHTML(card.name)}</div>
                <span class="vcc-badge-debt">💳 Crédito (Deuda)</span>
              </div>
              <span class="vcc-holder">${escapeHTML(card.holderName || 'LUIS D.')}</span>
            </div>
          </div>
        </div>

        <div class="vcc-stats">
          <div class="vcc-quota-row">
            <span>Deuda Utilizada: <strong style="color: #f87171; font-family: var(--font-mono);">${usedStr}</strong> (${pct}%)</span>
            <span>Cupo Total: <strong style="color: #94a3b8; font-family: var(--font-mono);">${totalStr}</strong></span>
          </div>
          <div class="progress-bar-track" style="background: #1e293b; height: 8px;">
            <div class="progress-bar-fill" style="width: ${pct}%; background: ${card.color || '#ef4444'};"></div>
          </div>
          <div class="vcc-quota-row" style="margin-top: 0.15rem;">
            <span style="color: #34d399; font-weight: 700;">Cupo Disponible: ${availStr}</span>
            <span style="color: #64748b;">${card.closingDay ? `Corte: día ${card.closingDay}` : 'Mensual'}</span>
          </div>
          ${nuExtraHtml}
        </div>

        <div class="vcc-footer">
          <span class="vcc-due-pill">📅 Vence día ${card.dueDay || 10}</span>
          <div style="display: flex; gap: 0.35rem;">
            <button type="button" class="vcc-btn" onclick="openPayCardDebtModal('${card.id}')" title="Abonar o rebajar deuda de esta tarjeta">📉 Abonar</button>
            <button type="button" class="vcc-btn" onclick="openQuickAddForSpecificCard('${card.id}')">＋ Gasto</button>
            <button type="button" class="vcc-btn" onclick="openEditCardModal('${card.id}')">✏️ Modificar</button>
          </div>
        </div>
      `;
      creditGrid.appendChild(box);
    });
  }

  // Renderizar los 5 cargos "⏳ Por Pagar"
  const debtListEl = document.getElementById('cardDebtsListContainer');
  if (debtListEl) {
    debtListEl.innerHTML = '';
    if (creditExpenses.length === 0) {
      debtListEl.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted);">No hay cargos individuales por pagar.</div>`;
    } else {
      creditExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
      creditExpenses.forEach(exp => {
        const card = appState.cards.find(c => c.id === exp.cardId);
        const isCOP = exp.currency === 'COP' || (card && card.currency === 'COP');
        const rate = (card && card.exchangeRateCopToClp) || 0.24;
        const amtText = isCOP
          ? `${formatCurrencyCOP(exp.amount)} COP (≈ ${formatCurrencyCLP(exp.amount * rate)} CLP)`
          : formatCurrencyCLP(exp.amount);

        const row = document.createElement('div');
        row.className = 'mg-movement-row';
        row.innerHTML = `
          <div class="mg-mov-left">
            <div class="mg-mov-circle" style="background: ${card ? card.color : '#ef4444'};">📦</div>
            <div class="mg-mov-texts">
              <div class="mg-mov-title">${escapeHTML(exp.description)}</div>
              <div class="mg-mov-sub">
                <span>💳 ${escapeHTML(card ? `${card.bank} (${card.name})` : 'Tarjeta')}</span>
                <span>•</span>
                <span style="color: #d97706; font-weight: 700;">⏳ Por Pagar</span>
                <span>•</span>
                <span>📅 ${formatReadableDate(exp.date)}</span>
                <button type="button" class="link-inline-btn" style="font-size: 0.7rem;" onclick="moveDebtToDailyExpense('${exp.id}')">✅ Marcar Pagado</button>
              </div>
            </div>
          </div>
          <div class="mg-mov-right">
            <span class="mg-mov-amount" style="color: #ef4444;">${amtText}</span>
            <button type="button" class="mg-mov-del-btn" onclick="openEditMovement('GASTO', '${exp.id}')">✏️</button>
            <button type="button" class="mg-mov-del-btn" onclick="deleteMovement('GASTO', '${exp.id}')">🗑️</button>
          </div>
        `;
        debtListEl.appendChild(row);
      });
    }
  }

  // Renderizar Deudas a Largo Plazo adicionales
  const ltGrid = document.getElementById('longtermDebtsGridContainer');
  if (ltGrid) {
    ltGrid.innerHTML = '';
    if (longTermDebts.length === 0) {
      ltGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 1.2rem; text-align: center; color: var(--text-muted); font-size: 0.84rem; background: var(--bg-card); border-radius: 12px; border: 1px dashed var(--border-strong);">
          Todas tus deudas principales ya están registradas arriba en tus 5 tarjetas. Si tienes otro préstamo adicional, usa <strong>＋ Nueva Deuda</strong>.
        </div>
      `;
    } else {
      longTermDebts.forEach(debt => {
        const total = Math.max(1, parseFloat(debt.totalAmount) || 1);
        const rem = Math.max(0, parseFloat(debt.remainingAmount) || 0);
        const paid = Math.max(0, total - rem);
        const pctPaid = Math.min(100, Math.round((paid / total) * 100));

        const card = document.createElement('div');
        card.className = 'minimal-card-box';
        card.innerHTML = `
          <div class="minimal-card-top">
            <div>
              <div class="minimal-card-name">${escapeHTML(debt.title)}</div>
              <div class="minimal-card-bank">👤 Acreedor: ${escapeHTML(debt.creditor)}</div>
            </div>
            <span class="badge-veh" style="background: rgba(245,158,11,0.15); color: #d97706;">⏳ A Plazo</span>
          </div>
          <div class="minimal-card-numbers">
            <div class="mc-num-col">
              <span class="mc-num-lbl">Saldo por Pagar</span>
              <strong class="mc-num-val" style="color: #f59e0b;">${formatCurrencyCLP(rem)}</strong>
            </div>
            <div class="mc-num-col" style="text-align: right;">
              <span class="mc-num-lbl">Original</span>
              <strong class="mc-num-val" style="font-size: 0.95rem;">${formatCurrencyCLP(total)}</strong>
            </div>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" style="width: ${pctPaid}%; background: #10b981;"></div>
          </div>
          <div class="minimal-card-actions">
            <button class="mg-btn-outline" onclick="openAddDebtPaymentModal('${debt.id}')">💵 Abonar</button>
            <button class="mg-btn-outline" onclick="openEditLongTermDebtModal('${debt.id}')">✏️ Editar</button>
            <button class="mg-mov-del-btn" onclick="deleteLongTermDebt('${debt.id}')">🗑️</button>
          </div>
        `;
        ltGrid.appendChild(card);
      });
    }
  }
}

window.openQuickAddForSpecificCard = function(cardId) {
  openQuickAddModal('DEUDA_TARJETA');
  const sel = document.getElementById('quickAccountSelect');
  if (sel) sel.value = cardId;
};

window.openPayCardDebtModal = function(cardId) {
  const card = appState.cards.find(c => c.id === cardId);
  if (!card) return;
  document.getElementById('payCardDebtId').value = card.id;
  document.getElementById('lblPayCardName').textContent = `${card.name} (${card.bank})`;
  const cur = card.currency === 'COP' ? 'COP' : 'CLP';
  document.getElementById('lblPayCardCurrentDebt').textContent = `Deuda actual ocupada: $ ${Number(card.usedLimit || 0).toLocaleString('es-CL')} ${cur}`;
  document.getElementById('payCardAmount').value = '';
  document.getElementById('payCardDate').value = new Date().toISOString().split('T')[0];
  openModal('modalPayCardDebt');
};

function handlePayCardDebtSubmit(e) {
  e.preventDefault();
  const cardId = document.getElementById('payCardDebtId').value;
  const card = appState.cards.find(c => c.id === cardId);
  if (!card) return;

  const amt = parseFloat(document.getElementById('payCardAmount').value);
  const date = document.getElementById('payCardDate').value;
  const recordDaily = document.getElementById('payCardRecordAsDailyExpense').checked;

  if (isNaN(amt) || amt <= 0) return;

  card.usedLimit = Math.max(0, (card.usedLimit || 0) - amt);

  if (recordDaily) {
    const clpAmt = card.currency === 'COP' ? Math.round(amt * (card.exchangeRateCopToClp || 0.24)) : amt;
    appState.expenses.unshift({
      id: 'exp-' + Date.now(),
      description: `Abono a tarjeta ${card.name} (${card.bank})`,
      amount: clpAmt,
      currency: 'CLP',
      date,
      cardId: 'card-bancoestado',
      category: 'tarjeta',
      paymentMode: 'contado',
      installmentsTotal: 1,
      currentInstallment: 1,
      status: 'pagado',
      isDebtOnly: false
    });
  }

  saveState();
  renderAllViews();
  closeModal('modalPayCardDebt');
  showToast(`📉 Abono aplicado a ${card.name}.`, '✅');
}

/* ==========================================================================
   PESTAÑA 4 (NUEVA): "🤝 ME DEBEN / POR COBRAR" (TÍA CECI, AMIGOS, ETC.)
   ========================================================================== */

function renderReceivablesView() {
  const list = appState.receivables || [];
  let pendingTotal = 0;
  let collectedTotal = 0;

  list.forEach(r => {
    const amt = parseFloat(r.amount) || 0;
    if (r.status === 'cobrado') collectedTotal += amt;
    else pendingTotal += amt;
  });

  const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setTxt('kpiReceivablesPending', formatCurrencyCLP(pendingTotal));
  setTxt('kpiReceivablesCollected', formatCurrencyCLP(collectedTotal));

  const container = document.getElementById('receivablesListContainer');
  if (!container) return;
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--text-muted);">Nadie te debe plata en este momento.</div>`;
    return;
  }

  list.forEach(r => {
    const isPaid = r.status === 'cobrado';
    const row = document.createElement('div');
    row.className = 'mg-movement-row';
    row.innerHTML = `
      <div class="mg-mov-left">
        <div class="mg-mov-circle" style="background: ${isPaid ? '#10b981' : '#f59e0b'};">
          ${isPaid ? '✅' : '🤝'}
        </div>
        <div class="mg-mov-texts">
          <div class="mg-mov-title">${escapeHTML(r.person)} — ${escapeHTML(r.reason)}</div>
          <div class="mg-mov-sub">
            <span>📅 ${formatReadableDate(r.date)}</span>
            <span>•</span>
            <span style="font-weight: 700; color: ${isPaid ? '#10b981' : '#d97706'};">
              ${isPaid ? '✅ Ya me devolvió' : '⏳ Pendiente de cobro'}
            </span>
          </div>
        </div>
      </div>
      <div class="mg-mov-right">
        <span class="mg-mov-amount" style="color: ${isPaid ? '#10b981' : '#d97706'};">
          ${formatCurrencyCLP(r.amount)}
        </span>
        <button type="button" class="mg-btn-outline" onclick="toggleReceivableStatus('${r.id}')">
          ${isPaid ? 'Reabrir' : '✅ Ya me pagó'}
        </button>
        <button type="button" class="mg-mov-del-btn" onclick="deleteReceivable('${r.id}')">🗑️</button>
      </div>
    `;
    container.appendChild(row);
  });
}

function handleAddReceivableSubmit(e) {
  e.preventDefault();
  const person = document.getElementById('recPerson').value.trim();
  const reason = document.getElementById('recReason').value.trim();
  const amount = parseFloat(document.getElementById('recAmount').value);
  const date = document.getElementById('recDate').value;

  if (!person || isNaN(amount) || amount <= 0) return;

  appState.receivables.unshift({
    id: 'rec-' + Date.now(),
    person,
    reason,
    amount,
    date,
    status: 'pendiente'
  });

  saveState();
  renderAllViews();
  closeModal('modalAddReceivable');
  document.getElementById('formAddReceivable').reset();
  showToast(`🤝 Anotado: ${person} te debe ${formatCurrencyCLP(amount)}`, '✅');
}

window.toggleReceivableStatus = function(recId) {
  const rec = (appState.receivables || []).find(r => r.id === recId);
  if (!rec) return;

  if (rec.status === 'cobrado') {
    rec.status = 'pendiente';
    showToast(`Marcado como pendiente de cobro.`, '⏳');
  } else {
    rec.status = 'cobrado';
    if (confirm(`¿Quieres sumar estos ${formatCurrencyCLP(rec.amount)} que te pagó ${rec.person} a tus Ingresos en "Mis Gastos"?`)) {
      appState.incomes.unshift({
        id: 'inc-' + Date.now(),
        description: `Pago recibido de ${rec.person} (${rec.reason})`,
        amount: rec.amount,
        date: new Date().toISOString().split('T')[0],
        category: 'transferencia',
        accountId: 'card-bancoestado'
      });
    }
    showToast(`🎉 ¡Cobrado a ${rec.person}!`, '✅');
  }
  saveState();
  renderAllViews();
};

window.deleteReceivable = function(recId) {
  if (!confirm('¿Eliminar este registro de cuenta por cobrar?')) return;
  appState.receivables = appState.receivables.filter(r => r.id !== recId);
  saveState();
  renderAllViews();
};

/* ==========================================================================
   PESTAÑA 5: MIS CUENTAS Y EFECTIVO ("LO QUE TENGO")
   ========================================================================== */

function renderAccountsView() {
  const debitCards = appState.cards.filter(c => c.type !== 'Crédito');
  const dailyExpenses = appState.expenses.filter(exp => !isCreditOrDeferredExpense(exp));

  const totalLiquid = debitCards.reduce((acc, c) => acc + Math.max(0, (c.totalLimit || 0) - (c.usedLimit || 0)), 0);
  const totalIncomes = (appState.incomes || []).reduce((acc, i) => acc + (parseFloat(i.amount) || 0), 0);
  const totalDailyExp = dailyExpenses.reduce((acc, e) => acc + (parseFloat(e.amount) || 0), 0);

  const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setTxt('bannerTotalLiquid', formatCurrencyCLP(totalLiquid));
  setTxt('bannerTotalIncomes', formatCurrencyCLP(totalIncomes));
  setTxt('bannerTotalDailyExpenses', formatCurrencyCLP(totalDailyExp));

  const grid = document.getElementById('debitCardsGridContainer');
  if (!grid) return;
  grid.innerHTML = '';

  debitCards.forEach(card => {
    const avail = Math.max(0, (card.totalLimit || 0) - (card.usedLimit || 0));
    const box = document.createElement('div');
    box.className = 'minimal-card-box';
    box.innerHTML = `
      <div class="minimal-card-top">
        <div class="minimal-card-brand">
          <img src="${card.photo}" class="minimal-card-thumb" alt="${escapeHTML(card.bank)}" onerror="this.src='assets/bancoestado.jpg'">
          <div>
            <div class="minimal-card-name">${escapeHTML(card.name)}</div>
            <div class="minimal-card-bank">${escapeHTML(card.bank)} (${escapeHTML(card.type)})</div>
          </div>
        </div>
        <span class="badge-veh" style="background: rgba(16,185,129,0.15); color: #059669;">💵 Mi Plata</span>
      </div>

      <div class="minimal-card-numbers">
        <div class="mc-num-col">
          <span class="mc-num-lbl">Saldo Disponible Actual</span>
          <strong class="mc-num-val" style="color: #10b981;">${formatCurrencyCLP(avail)}</strong>
        </div>
      </div>

      <div class="minimal-card-actions">
        <button class="mg-btn-outline" onclick="openEditCardModal('${card.id}')">✏️ Cambiar Saldo</button>
        <button class="mg-btn-outline" onclick="openQuickAddModal('INGRESO')">＋ Sumar Ingreso</button>
      </div>
    `;
    grid.appendChild(box);
  });
}

/* ==========================================================================
   EDICIÓN DE TARJETAS, DEUDAS Y VEHÍCULO
   ========================================================================== */

window.openEditCardModal = function(cardId) {
  const card = appState.cards.find(c => c.id === cardId);
  if (!card) return;

  document.getElementById('editCardId').value = card.id;
  document.getElementById('editCardName').value = card.name;
  document.getElementById('editCardBank').value = card.bank;
  document.getElementById('editCardType').value = card.type;
  document.getElementById('editCardUsedLimit').value = card.usedLimit || 0;
  document.getElementById('editCardTotalLimit').value = card.totalLimit || 0;
  document.getElementById('editCardLastDigits').value = card.lastDigits || '';
  document.getElementById('editCardDueDay').value = card.dueDay || '';

  const isCredit = card.type === 'Crédito';
  const cur = card.currency === 'COP' ? 'COP' : 'CLP';
  document.getElementById('lblEditUsedLimit').textContent = isCredit
    ? `🔴 Deuda Utilizada ($ ${cur}) *`
    : `Gastado ($ ${cur})`;
  document.getElementById('lblEditLimit').textContent = isCredit
    ? `💰 Cupo Total ($ ${cur}) *`
    : `💵 Saldo Disponible ($ ${cur}) *`;

  openModal('modalEditCard');
};

function handleEditCardSubmit(e) {
  e.preventDefault();
  const cardId = document.getElementById('editCardId').value;
  const card = appState.cards.find(c => c.id === cardId);
  if (!card) return;

  card.name = document.getElementById('editCardName').value.trim();
  card.bank = document.getElementById('editCardBank').value.trim();
  card.type = document.getElementById('editCardType').value;
  card.usedLimit = Math.max(0, parseFloat(document.getElementById('editCardUsedLimit').value) || 0);
  card.totalLimit = Math.max(0, parseFloat(document.getElementById('editCardTotalLimit').value) || 0);
  card.lastDigits = document.getElementById('editCardLastDigits').value.trim();
  card.dueDay = parseInt(document.getElementById('editCardDueDay').value) || null;

  saveState();
  renderAllViews();
  closeModal('modalEditCard');
  showToast('✅ Tarjeta actualizada.', '💳');
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('cardName').value.trim();
  const bank = document.getElementById('cardBank').value;
  const type = document.getElementById('cardType').value;
  const usedLimit = Math.max(0, parseFloat(document.getElementById('cardUsedLimit').value) || 0);
  const totalLimit = Math.max(0, parseFloat(document.getElementById('cardTotalLimit').value) || 0);
  const lastDigits = document.getElementById('cardLastDigits').value.trim() || '0000';
  const dueDay = parseInt(document.getElementById('cardDueDay').value) || null;

  let photo = 'assets/bancoestado.jpg';
  let currency = 'CLP';
  let color = '#6366f1';

  if (bank.toLowerCase().includes('falabella')) { photo = 'assets/falabella.jpg'; color = '#22c55e'; }
  else if (bank.toLowerCase().includes('santander')) { photo = 'assets/santander.jpg'; color = '#ef4444'; }
  else if (bank.toLowerCase().includes('tapp')) { photo = 'assets/tapp.jpg'; color = '#06b6d4'; }
  else if (bank.toLowerCase().includes('nu')) { photo = 'assets/nu.jpg'; color = '#a855f7'; currency = 'COP'; }
  else if (type === 'Efectivo') { photo = 'assets/efectivo.jpg'; color = '#10b981'; }

  appState.cards.push({
    id: 'card-' + Date.now(),
    name,
    bank,
    type,
    photo,
    lastDigits,
    holderName: 'LUIS D.',
    totalLimit,
    usedLimit,
    dueDay,
    color,
    currency,
    exchangeRateCopToClp: currency === 'COP' ? 0.24 : undefined
  });

  saveState();
  renderAllViews();
  closeModal('modalAddCard');
  document.getElementById('formAddCard').reset();
  showToast('💳 Nueva tarjeta agregada.', '✅');
}

window.openAdjustBalancesModal = function() {
  const container = document.getElementById('adjustBalancesInputsContainer');
  if (!container) return;
  container.innerHTML = '';

  const liquidCards = appState.cards.filter(c => c.type !== 'Crédito');
  liquidCards.forEach(card => {
    const avail = Math.max(0, (card.totalLimit || 0) - (card.usedLimit || 0));
    const div = document.createElement('div');
    div.className = 'form-group';
    div.innerHTML = `
      <label class="form-label">${escapeHTML(card.name)} (${escapeHTML(card.bank)})</label>
      <input type="number" class="form-input" data-card-id="${card.id}" value="${avail}" min="0" required>
    `;
    container.appendChild(div);
  });

  openModal('modalAdjustBalances');
};

function handleAdjustBalancesSubmit(e) {
  e.preventDefault();
  document.querySelectorAll('#adjustBalancesInputsContainer input[data-card-id]').forEach(inp => {
    const card = appState.cards.find(c => c.id === inp.dataset.cardId);
    const val = parseFloat(inp.value);
    if (card && !isNaN(val) && val >= 0) {
      card.totalLimit = val;
      card.usedLimit = 0;
    }
  });
  saveState();
  renderAllViews();
  closeModal('modalAdjustBalances');
  showToast('✅ Saldos actualizados.', '💵');
}

window.openEditExchangeRateModal = function() {
  const nuCard = appState.cards.find(c => c.currency === 'COP');
  const inp = document.getElementById('inputExchangeRateCop');
  if (inp && nuCard) inp.value = nuCard.exchangeRateCopToClp || 0.24;
  openModal('modalEditExchangeRate');
};

function handleEditExchangeRateSubmit(e) {
  e.preventDefault();
  const rate = parseFloat(document.getElementById('inputExchangeRateCop').value);
  if (!isNaN(rate) && rate > 0) {
    appState.cards.forEach(c => {
      if (c.currency === 'COP') c.exchangeRateCopToClp = rate;
    });
    saveState();
    renderAllViews();
    closeModal('modalEditExchangeRate');
    showToast(`🇨🇴 Tasa actualizada: 1 COP = $${rate} CLP`, '✅');
  }
}

/* Deudas a Largo Plazo */
window.openAddLongTermDebtModal = function() {
  document.getElementById('formAddLongTermDebt').reset();
  document.getElementById('editLongTermDebtId').value = '';
  document.getElementById('ltdStartDate').value = new Date().toISOString().split('T')[0];
  openModal('modalAddLongTermDebt');
};

window.openEditLongTermDebtModal = function(debtId) {
  const debt = (appState.longTermDebts || []).find(d => d.id === debtId);
  if (!debt) return;
  document.getElementById('editLongTermDebtId').value = debt.id;
  document.getElementById('ltdTitle').value = debt.title;
  document.getElementById('ltdCreditor').value = debt.creditor;
  document.getElementById('ltdTotalAmount').value = debt.totalAmount;
  document.getElementById('ltdRemainingAmount').value = debt.remainingAmount;
  document.getElementById('ltdMinPayment').value = debt.minPayment || '';
  document.getElementById('ltdStartDate').value = debt.startDate || '';
  document.getElementById('ltdDueDate').value = debt.dueDate || '';
  document.getElementById('ltdNotes').value = debt.notes || '';
  openModal('modalAddLongTermDebt');
};

function handleAddLongTermDebtSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('editLongTermDebtId').value;
  const title = document.getElementById('ltdTitle').value.trim();
  const creditor = document.getElementById('ltdCreditor').value.trim();
  const totalAmount = parseFloat(document.getElementById('ltdTotalAmount').value) || 0;
  const remainingAmount = parseFloat(document.getElementById('ltdRemainingAmount').value);
  const minPayment = parseFloat(document.getElementById('ltdMinPayment').value) || 0;
  const startDate = document.getElementById('ltdStartDate').value;
  const dueDate = document.getElementById('ltdDueDate').value;
  const notes = document.getElementById('ltdNotes').value.trim();

  if (editId) {
    const existing = appState.longTermDebts.find(d => d.id === editId);
    if (existing) {
      Object.assign(existing, {
        title, creditor, totalAmount,
        remainingAmount: isNaN(remainingAmount) ? totalAmount : remainingAmount,
        minPayment, startDate, dueDate, notes
      });
    }
  } else {
    appState.longTermDebts.unshift({
      id: 'ltd-' + Date.now(),
      title, creditor, totalAmount,
      remainingAmount: isNaN(remainingAmount) ? totalAmount : remainingAmount,
      minPayment, startDate, dueDate,
      includeInTotal: false,
      notes,
      payments: []
    });
  }

  saveState();
  renderAllViews();
  closeModal('modalAddLongTermDebt');
  showToast('⏳ Deuda guardada.', '✅');
}

window.openAddDebtPaymentModal = function(debtId) {
  const debt = (appState.longTermDebts || []).find(d => d.id === debtId);
  if (!debt) return;
  document.getElementById('paymentDebtId').value = debt.id;
  document.getElementById('lblPaymentDebtName').textContent = debt.title;
  document.getElementById('lblPaymentDebtRemaining').textContent = `Pendiente: ${formatCurrencyCLP(debt.remainingAmount)}`;
  document.getElementById('paymentAmount').value = debt.minPayment || '';
  document.getElementById('paymentDate').value = new Date().toISOString().split('T')[0];

  const sel = document.getElementById('paymentAccount');
  if (sel) {
    sel.innerHTML = '';
    appState.cards.filter(c => c.type !== 'Crédito').forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = `${c.name} (${c.bank})`;
      sel.appendChild(opt);
    });
  }
  openModal('modalAddDebtPayment');
};

function handleAddDebtPaymentSubmit(e) {
  e.preventDefault();
  const debtId = document.getElementById('paymentDebtId').value;
  const debt = (appState.longTermDebts || []).find(d => d.id === debtId);
  if (!debt) return;

  const amount = parseFloat(document.getElementById('paymentAmount').value);
  const date = document.getElementById('paymentDate').value;
  const accountId = document.getElementById('paymentAccount').value;
  const autoDeduct = document.getElementById('paymentAutoDeduct').checked;
  const note = document.getElementById('paymentNote').value.trim();

  if (isNaN(amount) || amount <= 0) return;

  debt.remainingAmount = Math.max(0, (parseFloat(debt.remainingAmount) || 0) - amount);
  if (!debt.payments) debt.payments = [];
  debt.payments.push({ date, amount, accountId, note });

  if (autoDeduct) {
    const card = appState.cards.find(c => c.id === accountId);
    if (card) card.totalLimit = Math.max(0, (card.totalLimit || 0) - amount);
  }

  saveState();
  renderAllViews();
  closeModal('modalAddDebtPayment');
  showToast(`💵 Abono de ${formatCurrencyCLP(amount)} registrado.`, '✅');
}

window.deleteLongTermDebt = function(debtId) {
  if (!confirm('¿Eliminar esta deuda a largo plazo?')) return;
  appState.longTermDebts = appState.longTermDebts.filter(d => d.id !== debtId);
  saveState();
  renderAllViews();
  showToast('Deuda eliminada.', '🗑️');
};

/* ==========================================================================
   ACCIONES DEL VEHÍCULO (MAZDA AXELA VFCW14 & UBER)
   ========================================================================== */

window.openFastFuelModal = function() {
  document.getElementById('formFastFuel').reset();
  document.getElementById('fuelDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('fuelOdometer').value = 142500;
  document.getElementById('fuelStation').value = 'GASOLINA SHELL';
  populateVehicleAccountSelects();
  openModal('modalFastFuel');
};

function handleFastFuelSubmit(e) {
  e.preventDefault();
  const totalAmount = parseFloat(document.getElementById('fuelTotalAmount').value);
  const date = document.getElementById('fuelDate').value;
  const station = document.getElementById('fuelStation').value.trim() || 'GASOLINA';
  const odometer = parseInt(document.getElementById('fuelOdometer').value) || 142500;
  const accountName = document.getElementById('fuelAccount').value;
  const syncGeneral = document.getElementById('fuelSyncGeneralExpense').checked;

  if (isNaN(totalAmount) || totalAmount <= 0) return;

  appState.vehicleLogs.unshift({
    id: 'vlog-' + Date.now(),
    date,
    category: 'combustible',
    detail: station.toUpperCase(),
    odometer,
    extra: 'Servicio realizado',
    amount: totalAmount,
    type: 'gasto',
    paymentAccount: accountName
  });

  if (syncGeneral) {
    const card = appState.cards.find(c => c.name === accountName) || appState.cards.find(c => c.type !== 'Crédito');
    appState.expenses.unshift({
      id: 'exp-' + Date.now(),
      description: `Auto: ${station.toUpperCase()}`,
      amount: totalAmount,
      currency: 'CLP',
      date,
      cardId: card ? card.id : 'card-bancoestado',
      category: 'auto',
      paymentMode: 'contado',
      installmentsTotal: 1,
      currentInstallment: 1,
      status: 'pagado',
      isDebtOnly: false
    });
  }

  saveState();
  renderAllViews();
  closeModal('modalFastFuel');
  showToast('⛽ Carga de bencina guardada en Mazda Axela.', '✅');
}

window.openVehicleExpenseModal = function() {
  document.getElementById('formAddVehicleExpense').reset();
  document.getElementById('vehExpDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('vehExpOdometer').value = 142500;
  populateVehicleAccountSelects();
  openModal('modalAddVehicleExpense');
};

function handleVehicleExpenseSubmit(e) {
  e.preventDefault();
  const category = document.getElementById('vehExpCategory').value;
  const detail = document.getElementById('vehExpDetail').value.trim();
  const amount = parseFloat(document.getElementById('vehExpAmount').value);
  const date = document.getElementById('vehExpDate').value;
  const odometer = parseInt(document.getElementById('vehExpOdometer').value) || 142500;
  const accountName = document.getElementById('vehExpAccount').value;
  const syncGeneral = document.getElementById('vehExpSyncGeneral').checked;

  if (!detail || isNaN(amount) || amount <= 0) return;

  appState.vehicleLogs.unshift({
    id: 'vlog-' + Date.now(),
    date,
    category,
    detail: detail.toUpperCase(),
    odometer,
    extra: 'Servicio realizado',
    amount,
    type: 'gasto',
    paymentAccount: accountName
  });

  if (syncGeneral) {
    const card = appState.cards.find(c => c.name === accountName) || appState.cards.find(c => c.type !== 'Crédito');
    appState.expenses.unshift({
      id: 'exp-' + Date.now(),
      description: `Auto: ${detail.toUpperCase()}`,
      amount,
      currency: 'CLP',
      date,
      cardId: card ? card.id : 'card-bancoestado',
      category: 'auto',
      paymentMode: 'contado',
      installmentsTotal: 1,
      currentInstallment: 1,
      status: 'pagado',
      isDebtOnly: false
    });
  }

  saveState();
  renderAllViews();
  closeModal('modalAddVehicleExpense');
  showToast('🚗 Gasto del Mazda Axela registrado.', '✅');
}

window.openUberShiftModal = function() {
  document.getElementById('formAddUberShift').reset();
  document.getElementById('uberDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('uberOdometer').value = appState.vehicle.odometer || 95000;
  populateVehicleAccountSelects();
  openModal('modalAddUberShift');
};

function handleUberShiftSubmit(e) {
  e.preventDefault();
  const amount = parseFloat(document.getElementById('uberAmount').value);
  const date = document.getElementById('uberDate').value;
  const trips = parseInt(document.getElementById('uberTrips').value) || 1;
  const hours = parseFloat(document.getElementById('uberHours').value) || 5;
  const odometer = parseInt(document.getElementById('uberOdometer').value) || 95000;
  const accountName = document.getElementById('uberAccount').value;
  const syncIncome = document.getElementById('uberSyncIncomeGeneral').checked;

  if (isNaN(amount) || amount <= 0) return;

  appState.vehicleLogs.unshift({
    id: 'vlog-' + Date.now(),
    date,
    category: 'uber_income',
    detail: `Turno Uber (${trips} viajes, ${hours} hrs)`,
    odometer,
    extra: `${trips} viajes (${hours} hrs)`,
    amount,
    type: 'ingreso_uber',
    paymentAccount: accountName
  });

  if (syncIncome) {
    const card = appState.cards.find(c => c.name === accountName) || appState.cards.find(c => c.type !== 'Crédito');
    appState.incomes.unshift({
      id: 'inc-' + Date.now(),
      description: `Turno Uber (${trips} viajes, ${hours} hrs)`,
      amount,
      date,
      category: 'uber',
      accountId: card ? card.id : 'card-efectivo'
    });
  }

  saveState();
  renderAllViews();
  closeModal('modalAddUberShift');
  showToast(`🚕 Turno Uber (+ ${formatCurrencyCLP(amount)}) guardado.`, '🎉');
}

window.openEditVehicleModal = function() {
  const veh = appState.vehicle || INITIAL_VEHICLE;
  document.getElementById('editVehModel').value = veh.model || 'Mazda Axela';
  document.getElementById('editVehPlate').value = veh.licensePlate || 'VFCW14';
  document.getElementById('editVehYear').value = veh.year || 2017;
  document.getElementById('editVehColor').value = veh.color || 'Rojo Soul Red';
  document.getElementById('editVehOdometer').value = veh.odometer || 95000;
  document.getElementById('editVehPurchasePrice').value = veh.purchasePrice || 4800000;
  document.getElementById('editVehAcquiredDate').value = veh.acquiredDate || '2026-10-22';
  document.getElementById('editVehNextMaintenance').value = veh.nextMaintenanceKm || 105000;
  openModal('modalEditVehicle');
};

function handleEditVehicleSubmit(e) {
  e.preventDefault();
  appState.vehicle = {
    ...appState.vehicle,
    model: document.getElementById('editVehModel').value.trim() || 'Mazda Axela',
    licensePlate: document.getElementById('editVehPlate').value.trim() || 'VFCW14',
    year: parseInt(document.getElementById('editVehYear').value) || 2017,
    color: document.getElementById('editVehColor').value.trim() || 'Rojo Soul Red',
    odometer: parseInt(document.getElementById('editVehOdometer').value) || 95000,
    purchasePrice: parseFloat(document.getElementById('editVehPurchasePrice').value) || 4800000,
    acquiredDate: document.getElementById('editVehAcquiredDate').value || '2026-10-22',
    nextMaintenanceKm: parseInt(document.getElementById('editVehNextMaintenance').value) || 105000,
    photo: 'assets/mazda_axela.jpg'
  };
  saveState();
  renderAllViews();
  closeModal('modalEditVehicle');
  showToast('⚙️ Datos del Mazda Axela actualizados.', '✅');
}

window.deleteVehicleLog = function(logId) {
  if (!confirm('¿Eliminar este registro del vehículo?')) return;
  appState.vehicleLogs = appState.vehicleLogs.filter(l => l.id !== logId);
  saveState();
  renderAllViews();
  showToast('Registro eliminado.', '🗑️');
};

/* ==========================================================================
   GRÁFICOS E INFORMES (PESTAÑA 6)
   ========================================================================== */

function renderAllCharts() {
  if (typeof Chart === 'undefined') return;

  const ctxCat = document.getElementById('chartExpensesByCategory');
  if (ctxCat) {
    const dailyExpenses = appState.expenses.filter(e => !isCreditOrDeferredExpense(e));
    const sums = {};
    dailyExpenses.forEach(e => {
      const m = getCategoryMeta(e.category, 'GASTO');
      sums[m.name] = (sums[m.name] || 0) + (parseFloat(e.amount) || 0);
    });
    if (chartCatInstance) chartCatInstance.destroy();
    chartCatInstance = new Chart(ctxCat, {
      type: 'doughnut',
      data: {
        labels: Object.keys(sums),
        datasets: [{
          data: Object.values(sums),
          backgroundColor: ['#ef4444', '#4f7df3', '#64748b', '#8b5cf6', '#c4b454', '#47b897', '#f59e0b']
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const ctxDebts = document.getElementById('chartDebtsByCard');
  if (ctxDebts) {
    const creditCards = appState.cards.filter(c => c.type === 'Crédito');
    if (chartDebtsInstance) chartDebtsInstance.destroy();
    chartDebtsInstance = new Chart(ctxDebts, {
      type: 'bar',
      data: {
        labels: creditCards.map(c => c.name),
        datasets: [{
          label: 'Deuda CLP',
          data: creditCards.map(c => c.currency === 'COP' ? Math.round((c.usedLimit || 0) * (c.exchangeRateCopToClp || 0.24)) : (c.usedLimit || 0)),
          backgroundColor: creditCards.map(c => c.color || '#ef4444'),
          borderRadius: 8
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const ctxVehCat = document.getElementById('chartVehicleCategories');
  if (ctxVehCat) {
    let fuel = 0, maint = 0, clean = 0;
    (appState.vehicleLogs || []).forEach(l => {
      if (l.category === 'combustible') fuel += l.amount;
      else if (l.category === 'mantencion') maint += l.amount;
      else if (l.category === 'limpieza') clean += l.amount;
    });
    if (chartVehicleCategoriesInstance) chartVehicleCategoriesInstance.destroy();
    chartVehicleCategoriesInstance = new Chart(ctxVehCat, {
      type: 'doughnut',
      data: {
        labels: ['Combustible ($55.000)', 'Mantención ($290.000)', 'Limpieza'],
        datasets: [{
          data: [fuel, maint, clean],
          backgroundColor: ['#f59e0b', '#0284c7', '#ec4899']
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const ctxVehEvo = document.getElementById('chartVehicleEvolution');
  if (ctxVehEvo) {
    let uberSum = 0, fuelSum = 0, maintSum = 0;
    (appState.vehicleLogs || []).forEach(l => {
      if (l.type === 'ingreso_uber' || l.category === 'uber_income') uberSum += l.amount;
      else if (l.category === 'combustible') fuelSum += l.amount;
      else maintSum += l.amount;
    });
    if (chartVehicleEvolutionInstance) chartVehicleEvolutionInstance.destroy();
    chartVehicleEvolutionInstance = new Chart(ctxVehEvo, {
      type: 'bar',
      data: {
        labels: ['Ganancias Uber', 'Bencina Conducción', 'Mantención Auto'],
        datasets: [{
          label: 'Monto ($ CLP)',
          data: [uberSum, fuelSum, maintSum],
          backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
          borderRadius: 8
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
}

/* ==========================================================================
   EXPORTACIÓN Y COPIAS DE SEGURIDAD
   ========================================================================== */

function exportExpensesToCSV() {
  const headers = ['Tipo', 'Fecha', 'Categoria', 'Descripcion', 'Monto_CLP', 'Separado_En_Deuda'];
  const rows = [headers];

  appState.expenses.forEach(e => {
    rows.push(['GASTO', e.date, e.category, `"${(e.description || '').replace(/"/g, '""')}"`, e.amount, isCreditOrDeferredExpense(e) ? 'SI' : 'NO']);
  });
  appState.incomes.forEach(i => {
    rows.push(['INGRESO', i.date, i.category, `"${(i.description || '').replace(/"/g, '""')}"`, i.amount, 'NO']);
  });

  const csvContent = '\uFEFF' + rows.map(r => r.join(';')).join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MisGastos_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('📊 Planilla Excel descargada.', '✅');
}

window.exportVehicleToCSV = function() {
  const headers = ['Fecha', 'Categoria', 'Detalle', 'Kilometraje', 'Extra', 'Monto_CLP', 'Cuenta'];
  const rows = [headers];
  (appState.vehicleLogs || []).forEach(l => {
    rows.push([l.date, l.category, `"${(l.detail || '').replace(/"/g, '""')}"`, l.odometer || '', `"${l.extra || ''}"`, l.amount, `"${l.paymentAccount || ''}"`]);
  });
  const csvContent = '\uFEFF' + rows.map(r => r.join(';')).join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MazdaAxela_VFCW14_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('🚗 Excel del Mazda Axela descargado.', '✅');
};

function exportJsonBackup() {
  const data = {
    exportedAt: new Date().toISOString(),
    cards: appState.cards,
    expenses: appState.expenses,
    incomes: appState.incomes,
    receivables: appState.receivables,
    longTermDebts: appState.longTermDebts,
    vehicle: appState.vehicle,
    vehicleLogs: appState.vehicleLogs
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Respaldo_MisGastos_MazdaAxela_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('💾 Respaldo descargado.', '✅');
}

function importJsonBackup(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const data = JSON.parse(evt.target.result);
      if (data.cards) appState.cards = data.cards;
      if (data.expenses) appState.expenses = data.expenses;
      if (data.incomes) appState.incomes = data.incomes;
      if (data.receivables) appState.receivables = data.receivables;
      if (data.longTermDebts) appState.longTermDebts = data.longTermDebts;
      if (data.vehicle) appState.vehicle = data.vehicle;
      if (data.vehicleLogs) appState.vehicleLogs = data.vehicleLogs;
      saveState();
      renderAllViews();
      closeModal('modalSettings');
      showToast('🎉 Respaldo restaurado con éxito.', '✅');
    } catch (err) {
      alert('Archivo inválido: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function resetToDefaults() {
  if (!confirm('¿Recargar todos tus datos protegidos (las 5 tarjetas en deuda, todos los gastos de Noviembre/Octubre, Tía Ceci y el Mazda Axela VFCW14)?')) return;
  appState.cards = JSON.parse(JSON.stringify(INITIAL_CARDS));
  appState.expenses = JSON.parse(JSON.stringify(INITIAL_EXPENSES));
  appState.incomes = JSON.parse(JSON.stringify(INITIAL_INCOMES));
  appState.receivables = JSON.parse(JSON.stringify(INITIAL_RECEIVABLES));
  appState.longTermDebts = JSON.parse(JSON.stringify(INITIAL_LONG_TERM_DEBTS));
  appState.vehicle = JSON.parse(JSON.stringify(INITIAL_VEHICLE));
  appState.vehicleLogs = JSON.parse(JSON.stringify(INITIAL_VEHICLE_LOGS));
  saveState();
  populateMonthSelectOptions();
  renderAllViews();
  closeModal('modalSettings');
  showToast('🔄 Todos tus datos protegidos fueron recargados.', '✅');
}

/* ==========================================================================
   EVENT LISTENERS
   ========================================================================== */

function setupEventListeners() {
  document.querySelectorAll('.dq-tab[data-tab], .mg-dock-item[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => setActiveTab(btn.dataset.tab));
  });

  // Abrir Modal "Agregar"
  document.getElementById('navMobileAdd')?.addEventListener('click', () => openQuickAddModal('GASTO'));
  document.getElementById('btnHeaderQuickAdd')?.addEventListener('click', () => openQuickAddModal('GASTO'));
  document.getElementById('btnOpenAddMovementInline')?.addEventListener('click', () => openQuickAddModal('GASTO'));
  document.getElementById('btnOpenAddCardDebtModal')?.addEventListener('click', () => openQuickAddModal('DEUDA_TARJETA'));
  document.getElementById('btnCloseExpenseModal')?.addEventListener('click', () => closeModal('modalAddExpense'));

  // Chips de monto rápido (+1k, +5k, +10k, +20k, +50k)
  document.querySelectorAll('.amt-chip[data-add-amt]').forEach(chip => {
    chip.addEventListener('click', () => {
      const inp = document.getElementById('quickAmountInput');
      if (!inp) return;
      const cur = parseSmartMathAmount(inp.value) || 0;
      const add = parseInt(chip.dataset.addAmt, 10) || 0;
      inp.value = cur + add;
      inp.focus();
    });
  });
  document.getElementById('btnClearQuickAmt')?.addEventListener('click', () => {
    const inp = document.getElementById('quickAmountInput');
    if (inp) { inp.value = ''; inp.focus(); }
  });

  // Selector segmentado Gasto | Ingreso | Deuda
  document.querySelectorAll('.mg-seg-btn[data-add-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      appState.quickAddMode = btn.dataset.addMode;
      document.getElementById('quickModeInput').value = appState.quickAddMode;
      renderQuickAddCategoryGrid();
    });
  });

  document.getElementById('formQuickMovement')?.addEventListener('submit', handleQuickMovementSubmit);

  document.getElementById('selectMonthFilter')?.addEventListener('change', (e) => {
    appState.selectedMonth = e.target.value;
    renderDailyMisGastosView();
  });

  document.querySelectorAll('.flow-pill[data-flow]').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.flow-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      appState.flowFilter = pill.dataset.flow;
      renderDailyMisGastosView();
    });
  });

  document.getElementById('inputSearchExpenses')?.addEventListener('input', (e) => {
    appState.searchTerm = e.target.value;
    renderDailyMisGastosView();
  });

  // Modal Me Deben (Cuentas por cobrar)
  document.getElementById('btnOpenAddReceivableModal')?.addEventListener('click', () => {
    document.getElementById('formAddReceivable')?.reset();
    document.getElementById('recDate').value = new Date().toISOString().split('T')[0];
    openModal('modalAddReceivable');
  });
  document.getElementById('btnCloseReceivableModal')?.addEventListener('click', () => closeModal('modalAddReceivable'));
  document.getElementById('btnCancelReceivableModal')?.addEventListener('click', () => closeModal('modalAddReceivable'));
  document.getElementById('formAddReceivable')?.addEventListener('submit', handleAddReceivableSubmit);

  // Modal Abonar a Tarjeta de Crédito
  document.getElementById('btnClosePayCardDebtModal')?.addEventListener('click', () => closeModal('modalPayCardDebt'));
  document.getElementById('btnCancelPayCardDebtModal')?.addEventListener('click', () => closeModal('modalPayCardDebt'));
  document.getElementById('formPayCardDebt')?.addEventListener('submit', handlePayCardDebtSubmit);

  // Vehículo (Mazda Axela VFCW14 & Uber)
  document.getElementById('btnOpenFastFuelModal')?.addEventListener('click', openFastFuelModal);
  document.getElementById('btnCloseFastFuelModal')?.addEventListener('click', () => closeModal('modalFastFuel'));
  document.getElementById('btnCancelFastFuelModal')?.addEventListener('click', () => closeModal('modalFastFuel'));
  document.getElementById('formFastFuel')?.addEventListener('submit', handleFastFuelSubmit);

  document.getElementById('btnOpenVehicleExpenseModal')?.addEventListener('click', openVehicleExpenseModal);
  document.getElementById('btnCloseVehicleExpenseModal')?.addEventListener('click', () => closeModal('modalAddVehicleExpense'));
  document.getElementById('btnCancelVehicleExpenseModal')?.addEventListener('click', () => closeModal('modalAddVehicleExpense'));
  document.getElementById('formAddVehicleExpense')?.addEventListener('submit', handleVehicleExpenseSubmit);

  document.getElementById('btnOpenUberShiftModal')?.addEventListener('click', openUberShiftModal);
  document.getElementById('btnCloseUberShiftModal')?.addEventListener('click', () => closeModal('modalAddUberShift'));
  document.getElementById('btnCancelUberShiftModal')?.addEventListener('click', () => closeModal('modalAddUberShift'));
  document.getElementById('formAddUberShift')?.addEventListener('submit', handleUberShiftSubmit);

  document.getElementById('btnOpenEditVehicleModal')?.addEventListener('click', openEditVehicleModal);
  document.getElementById('btnCloseEditVehicleModal')?.addEventListener('click', () => closeModal('modalEditVehicle'));
  document.getElementById('btnCancelEditVehicleModal')?.addEventListener('click', () => closeModal('modalEditVehicle'));
  document.getElementById('formEditVehicle')?.addEventListener('submit', handleEditVehicleSubmit);

  document.getElementById('btnExportVehicleExcel')?.addEventListener('click', exportVehicleToCSV);

  document.getElementById('inputSearchVehicle')?.addEventListener('input', (e) => {
    appState.vehicleSearchTerm = e.target.value;
    renderVehicleLogsTable();
  });

  document.getElementById('vehicleFilterPillsContainer')?.addEventListener('click', (e) => {
    const pill = e.target.closest('.filter-pill');
    if (pill && pill.dataset.vehFilter) {
      document.querySelectorAll('#vehicleFilterPillsContainer .filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      appState.vehicleFilter = pill.dataset.vehFilter;
      renderVehicleLogsTable();
    }
  });

  // Tarjetas y Cuentas
  document.getElementById('btnCloseEditCardModal')?.addEventListener('click', () => closeModal('modalEditCard'));
  document.getElementById('btnCancelEditCardModal')?.addEventListener('click', () => closeModal('modalEditCard'));
  document.getElementById('formEditCard')?.addEventListener('submit', handleEditCardSubmit);

  document.getElementById('btnOpenAddCardModal')?.addEventListener('click', () => openModal('modalAddCard'));
  document.getElementById('btnQuickAddAccount')?.addEventListener('click', () => openModal('modalAddCard'));
  document.getElementById('btnCloseCardModal')?.addEventListener('click', () => closeModal('modalAddCard'));
  document.getElementById('btnCancelCardModal')?.addEventListener('click', () => closeModal('modalAddCard'));
  document.getElementById('formAddCard')?.addEventListener('submit', handleAddCardSubmit);

  document.getElementById('btnQuickAdjustBalances')?.addEventListener('click', openAdjustBalancesModal);
  document.getElementById('btnCloseAdjustBalancesModal')?.addEventListener('click', () => closeModal('modalAdjustBalances'));
  document.getElementById('btnCancelAdjustBalancesModal')?.addEventListener('click', () => closeModal('modalAdjustBalances'));
  document.getElementById('formAdjustBalances')?.addEventListener('submit', handleAdjustBalancesSubmit);

  document.getElementById('btnCloseExchangeRateModal')?.addEventListener('click', () => closeModal('modalEditExchangeRate'));
  document.getElementById('btnCancelExchangeRateModal')?.addEventListener('click', () => closeModal('modalEditExchangeRate'));
  document.getElementById('formEditExchangeRate')?.addEventListener('submit', handleEditExchangeRateSubmit);

  // Deudas a largo plazo
  document.getElementById('btnOpenAddLongTermDebtModal')?.addEventListener('click', openAddLongTermDebtModal);
  document.getElementById('btnCloseLongTermDebtModal')?.addEventListener('click', () => closeModal('modalAddLongTermDebt'));
  document.getElementById('btnCancelLongTermDebtModal')?.addEventListener('click', () => closeModal('modalAddLongTermDebt'));
  document.getElementById('formAddLongTermDebt')?.addEventListener('submit', handleAddLongTermDebtSubmit);

  document.getElementById('btnCloseDebtPaymentModal')?.addEventListener('click', () => closeModal('modalAddDebtPayment'));
  document.getElementById('btnCancelDebtPaymentModal')?.addEventListener('click', () => closeModal('modalAddDebtPayment'));
  document.getElementById('formAddDebtPayment')?.addEventListener('submit', handleAddDebtPaymentSubmit);

  // Configuración y Respaldo
  document.getElementById('btnOpenSettingsModal')?.addEventListener('click', () => openModal('modalSettings'));
  document.getElementById('btnCloseSettingsModal')?.addEventListener('click', () => closeModal('modalSettings'));
  document.getElementById('btnCloseSettingsModalFooter')?.addEventListener('click', () => closeModal('modalSettings'));
  document.getElementById('btnExportExcel')?.addEventListener('click', exportExpensesToCSV);
  document.getElementById('btnExportExcelFromSettings')?.addEventListener('click', exportExpensesToCSV);
  document.getElementById('btnDownloadJsonBackup')?.addEventListener('click', exportJsonBackup);
  document.getElementById('inputRestoreJson')?.addEventListener('change', importJsonBackup);
  document.getElementById('btnResetToDefaults')?.addEventListener('click', resetToDefaults);

  // Tema Claro / Oscuro
  document.getElementById('btnToggleTheme')?.addEventListener('click', toggleTheme);
}

/* ==========================================================================
   UTILIDADES Y FORMATO
   ========================================================================== */

window.openModal = function(modalId) {
  document.getElementById(modalId)?.classList.add('active');
};

window.closeModal = function(modalId) {
  document.getElementById(modalId)?.classList.remove('active');
};

function applyTheme(theme) {
  appState.theme = theme;
  document.body.className = theme === 'dark' ? 'theme-dark' : 'theme-minimal-light';
  const icon = document.getElementById('themeToggleIcon');
  if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  saveState();
}

function toggleTheme() {
  applyTheme(appState.theme === 'dark' ? 'light' : 'dark');
}

function showToast(message, icon = '✅') {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMsg');
  const iconEl = document.getElementById('toastIcon');
  if (!toast || !msgEl || !iconEl) return;

  msgEl.textContent = message;
  iconEl.textContent = icon;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 3200);
}

function formatNumberClean(amount) {
  return Math.round(amount || 0).toLocaleString('es-CL');
}

function formatCurrencyCLP(amount) {
  return '$ ' + Math.round(amount || 0).toLocaleString('es-CL');
}

function formatCurrencyCOP(amount) {
  return '$ ' + Math.round(amount || 0).toLocaleString('es-CO');
}

function formatReadableDate(dateString) {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateString;
}

function formatDayGroupHeader(dateString) {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const d = new Date(year, month, day);

  const monthsShort = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const daysWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  return `<strong>${day} ${monthsShort[month] || ''}</strong> <span>${daysWeek[d.getDay()] || ''}</span>`;
}

function escapeHTML(str) {
  if (!str) return '';
  return str.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
