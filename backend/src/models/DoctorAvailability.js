const mongoose = require('mongoose');

const DoctorAvailabilitySchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  availableDays: {
    type: [String],
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: [true, 'Please add at least one available day']
  },
  timeSlots: [
    {
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      }
    }
  ],
  workingHours: {
    type: String, // e.g., '09:00 - 17:00'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('DoctorAvailability', DoctorAvailabilitySchema);
