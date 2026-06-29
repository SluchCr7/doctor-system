const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    unique: true,
    required: true
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  appointmentId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Appointment'
  },
  transactionId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Transaction'
  },
  items: [{
    description: String,
    quantity: Number,
    price: Number,
    total: Number
  }],
  consultationFee: {
    type: Number,
    default: 0
  },
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  amountPaid: {
    type: Number,
    default: 0
  },
  clinicShare: {
    type: Number,
    default: 0
  },
  doctorShare: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'visa', 'mastercard', 'fawry', 'instapay', 'insurance', 'bank_transfer', 'Credit Card', 'Debit Card', 'Cash', 'Bank Transfer'],
    default: 'cash'
  },
  status: {
    type: String,
    enum: ['unpaid', 'partially_paid', 'paid', 'void'],
    default: 'unpaid'
  },
  dueDate: Date,
  paidDate: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
