const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

// @desc    Get patient profile
// @route   GET /api/patient/profile
// @access  Private/Patient
exports.getPatientProfile = asyncHandler(async (req, res, next) => {
  const profile = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: profile
  });
});

// @desc    Update patient profile
// @route   PUT /api/patient/profile
// @access  Private/Patient
exports.updatePatientProfile = asyncHandler(async (req, res, next) => {
  const { name, email, profileData } = req.body;

  const updateFields = {};
  if (name) updateFields.name = name;
  if (email) updateFields.email = email;
  if (profileData) updateFields.profileData = profileData;

  const user = await User.findByIdAndUpdate(req.user.id, updateFields, {
    new: true,
    runValidators: true
  });

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
