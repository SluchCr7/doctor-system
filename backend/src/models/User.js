const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    default: 'patient'
  },
  profileImage: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  },
  profileData: {
    phone: String,
    address: String,
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    // Doctor-specific
    specialization: String,
    qualifications: String,
    experience: Number,
    bio: String,
    languages: [String],
    // Clinic details (doctor)
    clinicName: String,
    clinicAddress: String,
    clinicPhone: String,
    clinicEmail: String,
    clinicImage: {
      type: String,
      default: 'default-clinic.png'
    },
    consultationFee: Number,
    // Patient-specific
    age: Number,
    bloodType: String
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  refreshToken: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
