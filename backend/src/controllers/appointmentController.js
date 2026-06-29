const asyncHandler = require('express-async-handler');
const Appointment = require('../models/Appointment');
const Notification = require('../models/Notification');
const User = require('../models/User');
const DoctorAvailability = require('../models/DoctorAvailability');
const Invoice = require('../models/Invoice');

/**
 * Check if doctor is available at the requested date/time, and verify no double-bookings exist.
 */
const checkDoctorAvailabilityAndConflict = async (doctorId, appointmentDate, excludeAppointmentId = null) => {
  const date = new Date(appointmentDate);
  if (isNaN(date.getTime())) {
    return { available: false, message: 'Invalid appointment date format' };
  }

  // 1. Get Doctor availability
  let availability = await DoctorAvailability.findOne({ doctorId });
  if (!availability) {
    // Fallback to standard clinic working hours
    availability = {
      slotDuration: 30,
      bufferTime: 10,
      days: [
        { name: 'Monday', active: true, from: '09:00', to: '18:00', breakFrom: '13:00', breakTo: '14:00' },
        { name: 'Tuesday', active: true, from: '09:00', to: '18:00', breakFrom: '13:00', breakTo: '14:00' },
        { name: 'Wednesday', active: true, from: '09:00', to: '18:00', breakFrom: '13:00', breakTo: '14:00' },
        { name: 'Thursday', active: true, from: '09:00', to: '18:00', breakFrom: '13:00', breakTo: '14:00' },
        { name: 'Friday', active: true, from: '09:00', to: '18:00', breakFrom: '13:00', breakTo: '14:00' },
        { name: 'Saturday', active: false, from: '09:00', to: '18:00' },
        { name: 'Sunday', active: false, from: '09:00', to: '18:00' }
      ]
    };
  }

  // 2. Identify the day of week
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = dayNames[date.getDay()];

  const daySchedule = availability.days.find(d => d.name === dayName);
  if (!daySchedule || !daySchedule.active) {
    return { available: false, message: `Doctor is not available on ${dayName}` };
  }

  // 3. Check working hours
  const appMinutes = date.getHours() * 60 + date.getMinutes();
  const duration = availability.slotDuration || 30;
  const appEndMinutes = appMinutes + duration;

  const [fromHour, fromMin] = daySchedule.from.split(':').map(Number);
  const fromMinutes = fromHour * 60 + fromMin;
  
  const [toHour, toMin] = daySchedule.to.split(':').map(Number);
  const toMinutes = toHour * 60 + toMin;

  if (appMinutes < fromMinutes || appEndMinutes > toMinutes) {
    return { 
      available: false, 
      message: `Requested slot starts/ends outside working hours (${daySchedule.from} - ${daySchedule.to})` 
    };
  }

  // 4. Check break time
  if (daySchedule.breakFrom && daySchedule.breakTo) {
    const [bfHour, bfMin] = daySchedule.breakFrom.split(':').map(Number);
    const breakFromMinutes = bfHour * 60 + bfMin;

    const [btHour, btMin] = daySchedule.breakTo.split(':').map(Number);
    const breakToMinutes = btHour * 60 + btMin;

    if (appMinutes < breakToMinutes && appEndMinutes > breakFromMinutes) {
      return { 
        available: false, 
        message: `Requested time slot is during doctor's break (${daySchedule.breakFrom} - ${daySchedule.breakTo})` 
      };
    }
  }

  // 5. Prevent double booking: check overlap with existing active appointments
  const reqStart = date;
  const reqEnd = new Date(reqStart.getTime() + duration * 60 * 1000);

  const query = {
    doctorId,
    status: { $in: ['pending', 'confirmed'] },
    date: {
      $gt: new Date(reqStart.getTime() - duration * 60 * 1000),
      $lt: reqEnd
    }
  };

  if (excludeAppointmentId) {
    query._id = { $ne: excludeAppointmentId };
  }

  const conflict = await Appointment.findOne(query);
  if (conflict) {
    return { 
      available: false, 
      message: 'This time slot is no longer available (double-booking conflict)' 
    };
  }

  return { available: true, availabilityDoc: availability };
};

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private/Patient
exports.bookAppointment = asyncHandler(async (req, res, next) => {
  const { doctorId, date, notes } = req.body;
  const patientId = req.user.id;

  // Check if doctor exists
  const doctor = await User.findOne({ _id: doctorId, role: 'doctor' });

  if (!doctor) {
    return res.status(404).json({ success: false, message: 'Doctor not found' });
  }

  // Validate working hours, breaks, and conflict
  const validation = await checkDoctorAvailabilityAndConflict(doctorId, date);
  if (!validation.available) {
    return res.status(400).json({ success: false, message: validation.message });
  }

  // Create appointment
  const appointment = await Appointment.create({
    patientId,
    doctorId,
    date,
    notes
  });

  // Calculate fees & taxes
  const consultationFee = doctor.profileData?.consultationFee || 100;
  const subtotal = consultationFee;
  const taxRate = 0.10; // 10% tax
  const tax = Math.round((subtotal * taxRate) * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  // Revenue split: 20% clinic, 80% doctor
  const commissionRate = 0.20;
  const clinicShare = Math.round((total * commissionRate) * 100) / 100;
  const doctorShare = Math.round((total * (1 - commissionRate)) * 100) / 100;

  const invoiceNumber = 'INV-' + Date.now().toString().slice(-6) + Math.floor(10 + Math.random() * 90);

  // Automatically generate invoice
  await Invoice.create({
    invoiceNumber,
    patientId,
    doctorId,
    appointmentId: appointment._id,
    items: [{
      description: 'Medical Consultation',
      quantity: 1,
      price: consultationFee,
      total: consultationFee
    }],
    consultationFee,
    subtotal,
    tax,
    total,
    amountPaid: 0,
    clinicShare,
    doctorShare,
    status: 'unpaid'
  });

  // Notify doctor
  const { createNotification } = require('../utils/notifHelper');
  await createNotification({
    recipient: doctorId,
    sender: req.user.id,
    title: 'New Appointment Request',
    message: `${req.user.name} has requested a new appointment on ${new Date(date).toLocaleString()}`,
    type: 'appointment',
    relatedId: appointment._id,
    onModel: 'Appointment'
  });

  res.status(201).json({
    success: true,
    data: appointment
  });
});

// @desc    Get all appointments (Filtered by role)
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = asyncHandler(async (req, res, next) => {
  let query;
  if (req.user.role === 'patient') {
    query = Appointment.find({ patientId: req.user.id }).populate('doctorId', 'name email profileData');
  } else if (req.user.role === 'doctor') {
    query = Appointment.find({ doctorId: req.user.id }).populate('patientId', 'name email profileData');
  } else {
    // Admin can see all
    query = Appointment.find().populate('patientId doctorId', 'name email profileData');
  }

  const appointments = await query.sort({ date: -1 });

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

// @desc    Update appointment status/notes
// @route   PATCH /api/appointments/:id
// @access  Private
exports.updateAppointment = asyncHandler(async (req, res, next) => {
  const appointmentId = req.params.id;
  const { status, date, notes } = req.body;

  let appointment = await Appointment.findById(appointmentId);

  if (!appointment) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }

  // Permission check
  if (req.user.role === 'patient' && appointment.patientId.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized to update this appointment' });
  } else if (req.user.role === 'doctor' && appointment.doctorId.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized to update this appointment' });
  }

  // State Machine Validation
  if (appointment.status === 'completed' || appointment.status === 'cancelled') {
    return res.status(400).json({ 
      success: false, 
      message: `Cannot update an appointment that is already ${appointment.status}` 
    });
  }

  // Check state transitions
  if (status) {
    const validTransitions = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['completed', 'cancelled'],
      completed: [],
      cancelled: []
    };
    const allowed = validTransitions[appointment.status] || [];
    if (!allowed.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: `Invalid state transition from ${appointment.status} to ${status}` 
      });
    }
  }

  // Check availability & double-booking if date is updated
  if (date) {
    const validation = await checkDoctorAvailabilityAndConflict(appointment.doctorId.toString(), date, appointment._id);
    if (!validation.available) {
      return res.status(400).json({ success: false, message: validation.message });
    }
  }

  const updateFields = {};
  if (status && req.user.role === 'doctor') updateFields.status = status;
  if (date) updateFields.date = date;
  if (notes) updateFields.notes = notes;

  appointment = await Appointment.findByIdAndUpdate(appointmentId, updateFields, {
    new: true,
    runValidators: true
  });

  // Void invoice if cancelled
  if (status === 'cancelled') {
    await Invoice.findOneAndUpdate({ appointmentId: appointment._id }, { status: 'void' });
  }

  // Notify parties
  if (status) {
    const { createNotification } = require('../utils/notifHelper');
    await createNotification({
      recipient: appointment.patientId,
      sender: req.user.id,
      title: 'Appointment Status Update',
      message: `Your appointment status with ${req.user.name} has been updated to: ${status}`,
      type: 'appointment',
      relatedId: appointment._id,
      onModel: 'Appointment'
    });
  }

  res.status(200).json({
    success: true,
    data: appointment
  });
});

// @desc    Cancel/Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
exports.deleteAppointment = asyncHandler(async (req, res, next) => {
  const appointmentId = req.params.id;
  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }

  // Permission check
  if (req.user.role === 'patient' && appointment.patientId.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized to delete this appointment' });
  } else if (req.user.role === 'doctor' && appointment.doctorId.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized to delete this appointment' });
  }

  // Void Invoice
  await Invoice.findOneAndUpdate({ appointmentId: appointmentId }, { status: 'void' });

  await appointment.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Accept appointment
// @route   PATCH /api/appointments/:id/accept
// @access  Private/Doctor
exports.acceptAppointment = asyncHandler(async (req, res, next) => {
  let appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }

  if (appointment.doctorId.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized to accept this appointment' });
  }

  // State Machine check
  if (appointment.status !== 'pending') {
    return res.status(400).json({ success: false, message: `Cannot accept appointment in ${appointment.status} state` });
  }

  appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: 'confirmed' }, {
    new: true,
    runValidators: true
  });

  // Notify patient
  const { createNotification } = require('../utils/notifHelper');
  await createNotification({
    recipient: appointment.patientId,
    sender: req.user.id,
    title: 'Appointment Accepted',
    message: `Your appointment with Dr. ${req.user.name} has been accepted.`,
    type: 'appointment',
    relatedId: appointment._id,
    onModel: 'Appointment'
  });

  res.status(200).json({
    success: true,
    data: appointment
  });
});

// @desc    Reject appointment
// @route   PATCH /api/appointments/:id/reject
// @access  Private/Doctor
exports.rejectAppointment = asyncHandler(async (req, res, next) => {
  let appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }

  if (appointment.doctorId.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized to reject this appointment' });
  }

  // State Machine check
  if (appointment.status !== 'pending') {
    return res.status(400).json({ success: false, message: `Cannot reject appointment in ${appointment.status} state` });
  }

  appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, {
    new: true,
    runValidators: true
  });

  // Void Invoice
  await Invoice.findOneAndUpdate({ appointmentId: appointment._id }, { status: 'void' });

  // Notify patient
  const { createNotification } = require('../utils/notifHelper');
  await createNotification({
    recipient: appointment.patientId,
    sender: req.user.id,
    title: 'Appointment Rejected',
    message: `Your appointment with Dr. ${req.user.name} was not accepted.`,
    type: 'appointment',
    relatedId: appointment._id,
    onModel: 'Appointment'
  });

  res.status(200).json({
    success: true,
    data: appointment
  });
});
