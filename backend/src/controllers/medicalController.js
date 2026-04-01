const asyncHandler = require('express-async-handler');
const MedicalRecord = require('../models/MedicalRecord');
const User = require('../models/User');

// @desc    Get all medical records for a patient
// @route   GET /api/medical
// @access  Private
exports.getMedicalRecords = asyncHandler(async (req, res, next) => {
  let query = req.user.role === 'doctor' ? { doctorId: req.user.id } : { patientId: req.user.id };
  
  // If doctor specified a specific patient
  if (req.user.role === 'doctor' && req.query.patientId) {
    query = { patientId: req.query.patientId };
  }

  const records = await MedicalRecord.find(query)
    .populate('patientId', 'name email profileImage')
    .populate('doctorId', 'name email profileImage')
    .sort({ date: -1 });

  res.status(200).json({
    success: true,
    count: records.length,
    data: records
  });
});

// @desc    Create a medical record
// @route   POST /api/medical
// @access  Private/Doctor
exports.createMedicalRecord = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'doctor' && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  const { patientId, title, description, diagnosis, prescription, type, notes } = req.body;

  const record = await MedicalRecord.create({
    patientId,
    doctorId: req.user.id,
    title,
    description,
    diagnosis,
    prescription,
    type,
    notes
  });

  // Notify Patient
  const { createNotification } = require('../utils/notifHelper');
  await createNotification({
    recipient: patientId,
    sender: req.user.id,
    title: 'New Medical Record Added',
    message: `Dr. ${req.user.name} has added a new medical record: ${title}`,
    type: 'medical_record',
    relatedId: record._id,
    onModel: 'MedicalRecord'
  });

  res.status(201).json({
    success: true,
    data: record
  });
});

// @desc    Get a single medical record
// @route   GET /api/medical/:id
// @access  Private
exports.getMedicalRecord = asyncHandler(async (req, res, next) => {
  const record = await MedicalRecord.findById(req.params.id)
    .populate('patientId', 'name email')
    .populate('doctorId', 'name email');

  if (!record) {
    return res.status(404).json({ success: false, message: 'Record not found' });
  }

  // Check if they are allowed to see it
  if (record.patientId._id.toString() !== req.user.id && record.doctorId._id.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  res.status(200).json({
    success: true,
    data: record
  });
});
