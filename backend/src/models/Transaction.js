const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
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
  amount: {
    type: Number,
    required: [true, 'Please add an amount']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'cash', 'insurance', 'bank_transfer'],
    default: 'card'
  },
  description: String,
  transactionId: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionSchema);
