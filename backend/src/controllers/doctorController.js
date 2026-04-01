const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const DoctorAvailability = require('../models/DoctorAvailability');

// @desc    Get doctor profile
// @route   GET /api/doctor/profile
// @access  Private/Doctor
exports.getDoctorProfile = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: profile
  });
});

/**
 * @desc    Get single doctor by ID (Public view)
 * @route   GET /api/doctor/:id
 * @access  Private
 */
exports.getDoctorById = asyncHandler(async (req, res, next) => {
  const doctor = await User.findOne({ _id: req.params.id, role: 'doctor' }).select('-password -refreshToken');
  
  if (!doctor) {
    return res.status(404).json({ success: false, message: 'Doctor not found' });
  }

  const availability = await DoctorAvailability.findOne({ doctorId: doctor._id });

  res.status(200).json({
    success: true,
    data: {
      ...doctor.toObject(),
      availability: availability || null
    }
  });
});

// @desc    Update doctor profile
// @route   PUT /api/doctor/profile
// @access  Private/Doctor
exports.updateDoctorProfile = asyncHandler(async (req, res, next) => {
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

// @desc    Get doctor dashboard statistics
// @route   GET /api/doctor/dashboard
// @access  Private/Doctor
exports.getDoctorDashboard = asyncHandler(async (req, res, next) => {
  const doctorId = req.user.id;

  // Total patients who ever booked with this doctor
  const totalPatients = await Appointment.distinct('patientId', { doctorId });

  // Upcoming appointments
  const upcomingAppointments = await Appointment.countDocuments({
    doctorId,
    date: { $gte: new Date() },
    status: { $in: ['pending', 'confirmed'] }
  });

  // Today's appointments
  const startOfDay = new Date();
  startOfDay.setHours(0,0,0,0);
  const endOfDay = new Date();
  endOfDay.setHours(23,59,59,999);

  const todayAppointments = await Appointment.find({
    doctorId,
    date: { $gte: startOfDay, $lte: endOfDay }
  }).populate('patientId', 'name email');

  res.status(200).json({
    success: true,
    data: {
      totalPatients: totalPatients.length,
      upcomingAppointments,
      todayAppointments
    }
  });
});

// @desc    Get all patients assigned to/who have booked with this doctor
// @route   GET /api/doctor/patients
// @access  Private/Doctor
exports.getDoctorPatients = asyncHandler(async (req, res, next) => {
  const doctorId = req.user.id;
  
  // Find all appointments for this doctor and extract unique patient IDs
  const patientIds = await Appointment.distinct('patientId', { doctorId });
  
  const patients = await User.find({ _id: { $in: patientIds } })
    .select('name email profileData createdAt');

  res.status(200).json({
    success: true,
    count: patients.length,
    data: patients
  });
});

// @desc    Get/Update doctor availability
// @route   GET/PUT /api/doctor/availability
// @access  Private/Doctor
exports.updateAvailability = asyncHandler(async (req, res, next) => {
  const { availableDays, timeSlots, workingHours } = req.body;
  const doctorId = req.user.id;

  let availability = await DoctorAvailability.findOne({ doctorId });

  if (availability) {
    availability.availableDays = availableDays || availability.availableDays;
    availability.timeSlots = timeSlots || availability.timeSlots;
    availability.workingHours = workingHours || availability.workingHours;
    await availability.save();
  } else {
    availability = await DoctorAvailability.create({
      doctorId,
      availableDays,
      timeSlots,
      workingHours
    });
  }

  res.status(200).json({
    success: true,
    data: availability
  });
});

exports.getAvailability = asyncHandler(async (req, res, next) => {
  const availability = await DoctorAvailability.findOne({ doctorId: req.user.id });
  
  res.status(200).json({
    success: true,
    data: availability || {}
  });
});
