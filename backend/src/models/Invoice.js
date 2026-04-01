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
  status: {
    type: String,
    enum: ['unpaid', 'paid', 'void'],
    default: 'unpaid'
  },
  dueDate: Date,
  paidDate: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
