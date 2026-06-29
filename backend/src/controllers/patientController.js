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
  if (req.user.role === 'doctor') {
    const hasAppointment = await Appointment.exists({ doctorId: req.user.id, patientId: patient._id });
    if (!hasAppointment) {
      return res.status(403).json({ success: false, message: 'Access denied: You can only view patients booked with you.' });
    }
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

  if (!req.user.id) {
    return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
  }

  // Build $set payload using dot-notation so only sent fields are updated
  const setFields = {};
  if (name && name.trim()) setFields.name = name.trim();
  if (profileImage !== undefined) setFields.profileImage = profileImage;

  if (profileData && typeof profileData === 'object') {
    for (const [key, value] of Object.entries(profileData)) {
      if (value !== undefined && value !== null) {
        // Skip nested objects that should be handled separately
        if (typeof value === 'object' && !Array.isArray(value)) {
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            if (nestedValue !== undefined && nestedValue !== null) {
              setFields[`profileData.${key}.${nestedKey}`] = nestedValue;
            }
          }
        } else {
          setFields[`profileData.${key}`] = value;
        }
      }
    }
  }

  if (Object.keys(setFields).length === 0) {
    return res.status(400).json({ success: false, message: 'No valid fields to update' });
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: setFields },
    { new: true, runValidators: true, select: '-password -refreshToken' }
  );

  if (!user) {
    return res.status(404).json({ success: false, message: 'Patient profile not found' });
  }

  const userData = user.toObject();
  userData.id = userData._id;

  res.status(200).json({
    success: true,
    message: 'Patient profile updated successfully',
    data: userData
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

// @desc    Update patient profile by ID (for doctors/admins)
// @route   PUT /api/patient/:id
// @access  Private/Doctor|Admin
exports.updatePatientById = asyncHandler(async (req, res, next) => {
  const patientId = req.params.id;

  // Authorization: doctors may only update patients they have an appointment with
  if (req.user.role === 'doctor') {
    const hasAppointment = await Appointment.exists({ doctorId: req.user.id, patientId });
    if (!hasAppointment) {
      return res.status(403).json({ success: false, message: 'You are not allowed to update this patient' });
    }
  }

  const { name, profileData, profileImage } = req.body;

  const setFields = {};
  if (name && name.trim()) setFields.name = name.trim();
  if (profileImage !== undefined) setFields.profileImage = profileImage;

  if (profileData && typeof profileData === 'object') {
    for (const [key, value] of Object.entries(profileData)) {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            if (nestedValue !== undefined && nestedValue !== null) {
              setFields[`profileData.${key}.${nestedKey}`] = nestedValue;
            }
          }
        } else {
          setFields[`profileData.${key}`] = value;
        }
      }
    }
  }

  if (Object.keys(setFields).length === 0) {
    return res.status(400).json({ success: false, message: 'No valid fields to update' });
  }

  const user = await User.findOneAndUpdate(
    { _id: patientId, role: 'patient' },
    { $set: setFields },
    { new: true, runValidators: true, select: '-password -refreshToken' }
  );

  if (!user) {
    return res.status(404).json({ success: false, message: 'Patient not found' });
  }

  const userData = user.toObject();
  userData.id = userData._id;

  res.status(200).json({
    success: true,
    message: 'Patient profile updated successfully',
    data: userData
  });
});
