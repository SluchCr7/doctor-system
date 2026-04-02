const mongoose = require('mongoose');

const DayScheduleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  from: String, // e.g., '09:00'
  to: String,   // e.g., '18:00'
  breakFrom: String,
  breakTo: String
}, { _id: false });

const DoctorAvailabilitySchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  days: [DayScheduleSchema],
  slotDuration: {
    type: Number,
    default: 30
  },
  bufferTime: {
    type: Number,
    default: 10
  },
  maxDaily: {
    type: Number,
    default: 24
  },
  emergency: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('DoctorAvailability', DoctorAvailabilitySchema);
