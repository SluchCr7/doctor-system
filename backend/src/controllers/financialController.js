const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction');
const Invoice = require('../models/Invoice');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const MedicalRecord = require('../models/MedicalRecord');

// @desc    Get all transactions for current user (Filtered by role)
// @route   GET /api/financial/transactions
// @access  Private
exports.getTransactions = asyncHandler(async (req, res, next) => {
  let query = {};
  if (req.user.role === 'doctor') {
    query = { doctorId: req.user.id };
  } else if (req.user.role === 'patient') {
    query = { patientId: req.user.id };
  } else if (req.user.role === 'admin') {
    query = {}; // Admin sees all
  }
  
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

// @desc    Get all invoices for current user (Filtered by role)
// @route   GET /api/financial/invoices
// @access  Private
exports.getInvoices = asyncHandler(async (req, res, next) => {
  let query = {};
  if (req.user.role === 'doctor') {
    query = { doctorId: req.user.id };
  } else if (req.user.role === 'patient') {
    query = { patientId: req.user.id };
  } else if (req.user.role === 'admin') {
    query = {}; // Admin sees all
  }
  
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

// @desc    Create a transaction (simulated payment with partial payment support)
// @route   POST /api/financial/pay
// @access  Private/Patient/Doctor/Admin
exports.createTransaction = asyncHandler(async (req, res, next) => {
  const { appointmentId, invoiceId, amount, paymentMethod, description } = req.body;

  // Handle payments with an invoice
  if (invoiceId) {
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    // Default payment amount to remaining balance if not provided
    const remainingBalance = invoice.total - (invoice.amountPaid || 0);
    const paymentAmount = amount !== undefined ? Number(amount) : remainingBalance;

    if (paymentAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Payment amount must be greater than zero' });
    }

    // Generate transaction ID
    const txnId = 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    const transaction = await Transaction.create({
      patientId: invoice.patientId,
      doctorId: invoice.doctorId,
      appointmentId: invoice.appointmentId,
      amount: paymentAmount,
      paymentMethod: paymentMethod ? paymentMethod.toLowerCase() : 'card',
      description: description || `Payment for Invoice ${invoice.invoiceNumber}`,
      transactionId: txnId,
      status: 'completed'
    });

    // Update invoice state
    invoice.amountPaid = (invoice.amountPaid || 0) + paymentAmount;
    invoice.paymentMethod = paymentMethod ? paymentMethod.toLowerCase() : 'card';
    invoice.transactionId = transaction._id;
    invoice.paidDate = new Date();

    if (invoice.amountPaid >= invoice.total) {
      invoice.status = 'paid';
    } else {
      invoice.status = 'partially_paid';
    }

    await invoice.save();

    // Notify Doctor
    const { createNotification } = require('../utils/notifHelper');
    await createNotification({
      recipient: invoice.doctorId,
      sender: req.user.id,
      title: invoice.status === 'paid' ? 'Invoice Paid' : 'Partial Payment Received',
      message: `Invoice ${invoice.invoiceNumber} has been updated. Paid amount: $${paymentAmount}. Status: ${invoice.status}`,
      type: 'invoice',
      relatedId: invoice._id,
      onModel: 'Invoice'
    });

    return res.status(201).json({
      success: true,
      data: transaction
    });
  }

  // Handle payments without an invoice (direct booking payments)
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }

  const paymentAmount = Number(amount);
  if (isNaN(paymentAmount) || paymentAmount <= 0) {
    return res.status(400).json({ success: false, message: 'Payment amount is required and must be positive' });
  }

  // Generate transaction ID
  const txnId = 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  const transaction = await Transaction.create({
    patientId: req.user.id,
    doctorId: appointment.doctorId,
    appointmentId,
    amount: paymentAmount,
    paymentMethod: paymentMethod ? paymentMethod.toLowerCase() : 'card',
    description,
    transactionId: txnId,
    status: 'completed'
  });

  // Calculate split commission shares (20% clinic, 80% doctor)
  const commissionRate = 0.20;
  const clinicShare = Math.round((paymentAmount * commissionRate) * 100) / 100;
  const doctorShare = Math.round((paymentAmount * (1 - commissionRate)) * 100) / 100;

  // Create invoice automatically
  const invoiceNumber = 'INV-' + Date.now().toString().slice(-6) + Math.floor(10 + Math.random() * 90);
  const invoice = await Invoice.create({
    invoiceNumber,
    patientId: req.user.id,
    doctorId: appointment.doctorId,
    appointmentId,
    transactionId: transaction._id,
    items: [{
      description: description || 'Medical Consultation',
      quantity: 1,
      price: paymentAmount,
      total: paymentAmount
    }],
    consultationFee: paymentAmount,
    subtotal: paymentAmount,
    tax: 0,
    total: paymentAmount,
    amountPaid: paymentAmount,
    clinicShare,
    doctorShare,
    paymentMethod: paymentMethod ? paymentMethod.toLowerCase() : 'card',
    status: 'paid',
    paidDate: new Date()
  });

  // Notify Doctor
  const { createNotification } = require('../utils/notifHelper');
  await createNotification({
    recipient: appointment.doctorId,
    sender: req.user.id,
    title: 'Payment Received',
    message: `${req.user.name} has paid $${paymentAmount} for ${description || 'Consultation'}.`,
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
  if (req.user.role !== 'doctor' && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  const doctorId = req.user.id;

  // Filter stats strictly by doctor if role is doctor
  const query = req.user.role === 'doctor' ? { doctorId } : {};

  // 1. Transaction stats
  const transactions = await Transaction.find({ 
    ...query,
    status: 'completed'
  });

  const totalRevenue = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  // 2. Pending payments (unpaid & partially paid invoices)
  const pendingPaymentsCount = await Invoice.countDocuments({
    ...query,
    status: { $in: ['unpaid', 'partially_paid'] }
  });

  // 3. Registered patient counts
  const totalPatients = await User.countDocuments({ role: 'patient' });

  // 4. Appointments & cancellation stats
  const totalAppointments = await Appointment.countDocuments(query);
  const cancelledAppointments = await Appointment.countDocuments({ 
    ...query,
    status: 'cancelled' 
  });
  
  const cancellationRate = totalAppointments > 0 
    ? ((cancelledAppointments / totalAppointments) * 100).toFixed(1) 
    : '0.0';

  // 5. Monthly Revenue aggregation for the past 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const matchQuery = {
    status: 'completed',
    createdAt: { $gte: sixMonthsAgo }
  };
  if (req.user.role === 'doctor') {
    matchQuery.doctorId = req.user._id || req.user.id;
  }

  const monthlyTrans = await Transaction.aggregate([
    {
      $match: matchQuery
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        total: { $sum: '$amount' }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } }
  ]);

  const revenueTrend = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const monthName = d.toLocaleString('en-US', { month: 'short' });
    const monthNum = d.getMonth() + 1;
    const yearNum = d.getFullYear();

    const match = monthlyTrans.find(m => m._id.month === monthNum && m._id.year === yearNum);
    revenueTrend.push({
      m: monthName,
      v: match ? match.total : 0
    });
  }

  // 6. Diagnoses aggregation (only if doctorId is relevant)
  const diagMatch = req.user.role === 'doctor' ? { doctorId } : {};
  const diagnosesStats = await MedicalRecord.aggregate([
    { $match: diagMatch },
    { $group: { _id: '$diagnosis', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 4 }
  ]);

  const totalDiagnosesCount = diagnosesStats.reduce((acc, curr) => acc + curr.count, 0);
  const diagnosesColors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-slate-200'];

  const diagnosesDistribution = diagnosesStats.length > 0
    ? diagnosesStats.map((d, index) => ({
        label: d._id || 'General Checkup',
        val: totalDiagnosesCount > 0 ? `${Math.round((d.count / totalDiagnosesCount) * 100)}%` : '0%',
        color: diagnosesColors[index % diagnosesColors.length]
      }))
    : [
        { label: "Hypertension", val: "35%", color: "bg-primary" },
        { label: "Diabetes Type 2", val: "28%", color: "bg-secondary" },
        { label: "Respiratory", val: "22%", color: "bg-accent" },
        { label: "Other", val: "15%", color: "bg-slate-200" }
      ];

  res.status(200).json({
    success: true,
    data: {
      totalRevenue,
      transactionCount: transactions.length,
      pendingPayments: pendingPaymentsCount,
      totalPatients,
      totalAppointments,
      cancellationRate,
      revenueTrend,
      diagnosesDistribution
    }
  });
});
