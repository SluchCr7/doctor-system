const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['appointment', 'profile', 'security', 'system'],
    default: 'appointment'
  },
  message: {
    type: String,
    required: [true, 'Please add a message']
  },
  read: {
    type: Boolean,
    default: false
  },
  meta: {
    appointmentId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Appointment'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Notification', NotificationSchema);
