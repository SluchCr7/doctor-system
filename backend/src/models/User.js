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
      default: 'https://cdn.pixabay.com/photo/2016/11/06/10/35/hospital-1802680_1280.jpg'
    },
    consultationFee: Number,
    // Patient-specific
    age: Number,
    dob: Date,
    bloodType: String,
    insuranceProvider: String,
    emergencyContact: {
      name: String,
      phone: String,
      relation: String
    }
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  refreshToken: String,
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
