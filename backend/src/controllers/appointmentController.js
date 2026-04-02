const asyncHandler = require('express-async-handler');
const Appointment = require('../models/Appointment');
const Notification = require('../models/Notification');
const User = require('../models/User');

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

  // Create appointment
  const appointment = await Appointment.create({
    patientId,
    doctorId,
    date,
    notes
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
  // Doctor can update status
  // Patient can update notes/date (if pending)
  if (req.user.role === 'patient' && appointment.patientId.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized to update this appointment' });
  } else if (req.user.role === 'doctor' && appointment.doctorId.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized to update this appointment' });
  }

  const updateFields = {};
  if (status && req.user.role === 'doctor') updateFields.status = status;
  if (date) updateFields.date = date;
  if (notes) updateFields.notes = notes;

  appointment = await Appointment.findByIdAndUpdate(appointmentId, updateFields, {
    new: true,
    runValidators: true
  });

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

  appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, {
    new: true,
    runValidators: true
  });

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
