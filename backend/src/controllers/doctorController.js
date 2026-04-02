const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const DoctorAvailability = require('../models/DoctorAvailability');

// @desc    Get doctor profile
// @route   GET /api/doctor/profile
// @access  Private/Doctor
exports.getDoctorProfile = asyncHandler(async (req, res, next) => {
  const doctor = await User.findById(req.user.id).select('-password -refreshToken');
  const availability = await DoctorAvailability.findOne({ doctorId: req.user.id });

  res.status(200).json({
    success: true,
    data: {
      ...doctor.toObject(),
      availability: availability || null
    }
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

  // Stats
  const totalPatients = await Appointment.distinct('patientId', { doctorId, status: 'confirmed' });
  const totalAppointments = await Appointment.countDocuments({ doctorId });
  const pendingRequests = await Appointment.countDocuments({ doctorId, status: 'pending' });

  // Today's appointments (with full patient details)
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const todayAppointments = await Appointment.find({
    doctorId,
    date: { $gte: startOfDay, $lte: endOfDay }
  })
    .populate('patientId', 'name email profileImage profileData')
    .sort({ date: 1 });

  // Upcoming appointments (next 7 days, excluding today)
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  const upcomingAppointments = await Appointment.find({
    doctorId,
    date: { $gt: endOfDay, $lte: sevenDaysFromNow },
    status: 'confirmed'
  })
    .populate('patientId', 'name email profileImage')
    .sort({ date: 1 })
    .limit(5);

  res.status(200).json({
    success: true,
    data: {
      stats: {
        totalPatients: totalPatients.length,
        totalAppointments,
        pendingRequests,
        todayCount: todayAppointments.length
      },
      todayAppointments,
      upcomingAppointments
    }
  });
});

// @desc    Get all patients assigned to/who have booked with this doctor
// @route   GET /api/doctor/patients
// @access  Private/Doctor
exports.getDoctorPatients = asyncHandler(async (req, res, next) => {
  const doctorId = req.user.id;

  // Find all confirmed appointments for this doctor to identify "active" patients
  const appointments = await Appointment.find({ doctorId, status: 'confirmed' })
    .populate('patientId', 'name email profileImage profileData createdAt')
    .sort({ date: -1 });

  // Map to unique patients with their last appointment date
  const patientMap = new Map();

  appointments.forEach(app => {
    if (app.patientId && !patientMap.has(app.patientId._id.toString())) {
      patientMap.set(app.patientId._id.toString(), {
        _id: app.patientId._id,
        name: app.patientId.name,
        email: app.patientId.email,
        profileImage: app.patientId.profileImage,
        profileData: app.patientId.profileData,
        lastAppointment: app.date,
        status: 'Active', // Can be dynamic based on last appointment
        joinedAt: app.patientId.createdAt
      });
    }
  });

  const patients = Array.from(patientMap.values());

  res.status(200).json({
    success: true,
    count: patients.length,
    data: patients
  });
});

/**
 * @desc    Get/Update doctor availability
 * @route   PUT /api/doctor/availability
 * @access  Private/Doctor
 */
exports.updateAvailability = asyncHandler(async (req, res, next) => {
  const { days, slotDuration, bufferTime, maxDaily, emergency } = req.body;
  const doctorId = req.user.id;

  let availability = await DoctorAvailability.findOne({ doctorId });

  const payload = {
    doctorId,
    days,
    slotDuration: slotDuration ? Number(slotDuration) : undefined,
    bufferTime: bufferTime ? Number(bufferTime) : undefined,
    maxDaily: maxDaily ? Number(maxDaily) : undefined,
    emergency: emergency !== undefined ? emergency : undefined
  };

  if (availability) {
    Object.assign(availability, payload);
    await availability.save();
  } else {
    availability = await DoctorAvailability.create(payload);
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
