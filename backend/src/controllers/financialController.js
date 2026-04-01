const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction');
const Invoice = require('../models/Invoice');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

// @desc    Get all transactions for current user
// @route   GET /api/financial/transactions
// @access  Private
exports.getTransactions = asyncHandler(async (req, res, next) => {
  const query = req.user.role === 'doctor' ? { doctorId: req.user.id } : { patientId: req.user.id };
  
  const transactions = await Transaction.find(query)
    .populate('patientId', 'name email profileImage')
    .populate('doctorId', 'name email profileImage')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: transactions.length,
    data: transactions
  });
});

// @desc    Get all invoices for current user
// @route   GET /api/financial/invoices
// @access  Private
exports.getInvoices = asyncHandler(async (req, res, next) => {
  const query = req.user.role === 'doctor' ? { doctorId: req.user.id } : { patientId: req.user.id };
  
  const invoices = await Invoice.find(query)
    .populate('patientId', 'name email')
    .populate('doctorId', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: invoices.length,
    data: invoices
  });
});

// @desc    Create a transaction (simulated payment)
// @route   POST /api/financial/pay
// @access  Private/Patient
exports.createTransaction = asyncHandler(async (req, res, next) => {
  const { appointmentId, amount, paymentMethod, description } = req.body;

  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }

  // Generate a random transaction ID
  const transactionId = 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  const transaction = await Transaction.create({
    patientId: req.user.id,
    doctorId: appointment.doctorId,
    appointmentId,
    amount,
    paymentMethod,
    description,
    transactionId,
    status: 'completed'
  });

  // Create an invoice automatically
  const invoiceNumber = 'INV-' + Date.now().toString().slice(-6);
  const invoice = await Invoice.create({
    invoiceNumber,
    patientId: req.user.id,
    doctorId: appointment.doctorId,
    transactionId: transaction._id,
    items: [{
      description: description || 'Medical Consultation',
      quantity: 1,
      price: amount,
      total: amount
    }],
    subtotal: amount,
    total: amount,
    status: 'paid',
    paidDate: new Date()
  });

  // Notify Doctor
  const { createNotification } = require('../utils/notifHelper');
  await createNotification({
    recipient: appointment.doctorId,
    sender: req.user.id,
    title: 'Payment Received',
    message: `${req.user.name} has paid $${amount} for ${description || 'Consultation'}.`,
    type: 'invoice',
    relatedId: invoice._id,
    onModel: 'Invoice'
  });

  res.status(201).json({
    success: true,
    data: transaction
  });
});

// @desc    Get financial summary (stats for doctor)
// @route   GET /api/financial/stats
// @access  Private/Doctor
exports.getFinancialStats = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'doctor') {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  const transactions = await Transaction.find({ 
    doctorId: req.user.id,
    status: 'completed'
  });

  const totalRevenue = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const pendingPayments = await Appointment.countDocuments({
    doctorId: req.user.id,
    status: 'completed'
  }); // Simple logic: completed appts usually need payment

  res.status(200).json({
    success: true,
    data: {
      totalRevenue,
      transactionCount: transactions.length,
      recentRevenue: totalRevenue * 0.2, // Simulated growth
      pendingPayments
    }
  });
});
