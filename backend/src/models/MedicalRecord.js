const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  appointmentId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Appointment'
  },
  type: {
    type: String,
    enum: ['visit', 'lab_result', 'vaccination', 'allergy', 'medication'],
    default: 'visit'
  },
  title: {
    type: String,
    required: [true, 'Please add a title']
  },
  description: String,
  diagnosis: String,
  prescription: [{
    medicine: String,
    dosage: String,
    duration: String,
    notes: String
  }],
  notes: String,
  date: {
    type: Date,
    default: Date.now
  },
  attachments: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);
