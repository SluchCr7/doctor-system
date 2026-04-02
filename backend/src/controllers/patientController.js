const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

// @desc    Get patient profile
// @route   GET /api/patient/profile
// @access  Private/Patient
exports.getPatientProfile = asyncHandler(async (req, res, next) => {
  const patient = await User.findById(req.user.id).select('-password -refreshToken');
  res.status(200).json({
    success: true,
    data: patient
  });
});

/**
 * @desc    Get single patient by ID (For doctors/admins)
 * @route   GET /api/patient/:id
 * @access  Private/Doctor/Admin
 */
exports.getPatientById = asyncHandler(async (req, res, next) => {
  const patient = await User.findOne({ _id: req.params.id, role: 'patient' }).select('-password -refreshToken');
  
  if (!patient) {
    return res.status(404).json({ success: false, message: 'Patient not found' });
  }

  // Security: Check if this doctor has an appointment with this patient
  const hasAppointment = await Appointment.exists({ doctorId: req.user.id, patientId: patient._id });
  
  if (!hasAppointment && req.user.role !== 'admin') {
    // Optionally allow viewing but restrict medical history if no relation
    // For now, let's allow it if they are a doctor (as per requirement: "clicks on any patient")
  }

  res.status(200).json({
    success: true,
    data: patient
  });
});

// @desc    Update patient profile
// @route   PUT /api/patient/profile
// @access  Private/Patient
exports.updatePatientProfile = asyncHandler(async (req, res, next) => {
  const { name, profileData, profileImage } = req.body;

  // Build $set payload using dot-notation so only sent fields are updated
  const setFields = {};
  if (name) setFields.name = name;
  if (profileImage !== undefined) setFields.profileImage = profileImage;

  if (profileData && typeof profileData === 'object') {
    for (const [key, value] of Object.entries(profileData)) {
      if (value !== undefined) {
        setFields[`profileData.${key}`] = value;
      }
    }
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: setFields },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Get patient appointments summary (dashboard)
// @route   GET /api/patient/dashboard
// @access  Private/Patient
exports.getPatientDashboard = asyncHandler(async (req, res, next) => {
  const patientId = req.user.id;

  const upcomingAppointments = await Appointment.find({
    patientId,
    date: { $gte: new Date() },
    status: { $in: ['pending', 'confirmed'] }
  }).populate('doctorId', 'name email profileData');

  const pastAppointments = await Appointment.find({
    patientId,
    date: { $lt: new Date() }
  }).sort({ date: -1 }).limit(5).populate('doctorId', 'name email profileData');

  res.status(200).json({
    success: true,
    data: {
      upcoming: upcomingAppointments,
      past: pastAppointments
    }
  });
});

// @desc    Get list of all doctors for booking
// @route   GET /api/patient/doctors
// @access  Private/Patient
exports.getAllDoctors = asyncHandler(async (req, res, next) => {
  const doctors = await User.find({ role: 'doctor' })
    .select('name email profileData');

  res.status(200).json({
    success: true,
    count: doctors.length,
    data: doctors
  });
});
