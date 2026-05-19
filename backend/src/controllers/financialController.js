const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction');
const Invoice = require('../models/Invoice');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const MedicalRecord = require('../models/MedicalRecord');

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
  const { appointmentId, invoiceId, amount, paymentMethod, description } = req.body;

  if (invoiceId) {
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    // Generate a random transaction ID
    const transactionId = 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    const transaction = await Transaction.create({
      patientId: invoice.patientId,
      doctorId: invoice.doctorId,
      amount: amount || invoice.total,
      paymentMethod,
      description: description || `Payment for Invoice ${invoice.invoiceNumber}`,
      transactionId,
      status: 'completed'
    });

    invoice.status = 'paid';
    invoice.transactionId = transaction._id;
    invoice.paidDate = new Date();
    await invoice.save();

    // Notify Doctor
    const { createNotification } = require('../utils/notifHelper');
    await createNotification({
      recipient: invoice.doctorId,
      sender: req.user.id,
      title: 'Invoice Paid',
      message: `Invoice ${invoice.invoiceNumber} has been paid ($${amount || invoice.total}).`,
      type: 'invoice',
      relatedId: invoice._id,
      onModel: 'Invoice'
    });

    return res.status(201).json({
      success: true,
      data: transaction
    });
  }

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

  const doctorId = req.user._id || req.user.id;

  // 1. Transaction stats
  const transactions = await Transaction.find({ 
    doctorId,
    status: 'completed'
  });

  const totalRevenue = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  // 2. Pending payments (unpaid invoices)
  const pendingPaymentsCount = await Invoice.countDocuments({
    doctorId,
    status: 'unpaid'
  });

  // 3. Registered patient counts
  const totalPatients = await User.countDocuments({ role: 'patient' });

  // 4. Appointments & cancellation stats
  const totalAppointments = await Appointment.countDocuments({ doctorId });
  const cancelledAppointments = await Appointment.countDocuments({ 
    doctorId, 
    status: { $in: ['cancelled', 'rejected'] } 
  });
  
  const cancellationRate = totalAppointments > 0 
    ? ((cancelledAppointments / totalAppointments) * 100).toFixed(1) 
    : '0.0';

  // 5. Monthly Revenue aggregation for the past 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const monthlyTrans = await Transaction.aggregate([
    {
      $match: {
        doctorId,
        status: 'completed',
        createdAt: { $gte: sixMonthsAgo }
      }
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

  const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
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

  // 6. Diagnoses aggregation
  const diagnosesStats = await MedicalRecord.aggregate([
    { $match: { doctorId } },
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
