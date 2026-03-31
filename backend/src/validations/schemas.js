const Joi = require('joi');

const authValidations = {
  register: Joi.object({
    name: Joi.string().required().min(2).max(50).trim(),
    email: Joi.string().email().required().lowercase().trim(),
    password: Joi.string().required().min(6).max(100),
    role: Joi.string().valid('patient', 'doctor').default('patient'),
    profileData: Joi.object({
      phone: Joi.string().pattern(/^\+?[0-9\s-]{7,15}$/).allow('', null).message('Please provide a valid phone number'),
      address: Joi.string().max(200).allow('', null),
      specialization: Joi.string().max(100).allow('', null),
      qualifications: Joi.string().max(200).allow('', null),
      age: Joi.number().min(0).max(120),
      gender: Joi.string().valid('male', 'female', 'other')
    })
  }),

  login: Joi.object({
    email: Joi.string().email().required().lowercase().trim(),
    password: Joi.string().required()
  })
};

const appointmentValidations = {
  create: Joi.object({
    doctorId: Joi.string().length(24).hex().required().messages({
      'string.length': 'Invalid doctor ID format'
    }),
    date: Joi.date().iso().required().greater('now').messages({
      'date.greater': 'Appointment date must be in the future'
    }),
    notes: Joi.string().max(500).allow('', null)
  }),

  update: Joi.object({
    date: Joi.date().iso().greater('now'),
    status: Joi.string().valid('pending', 'confirmed', 'cancelled', 'completed'),
    notes: Joi.string().max(500).allow('', null)
  }).min(1) // At least one field must be provided for update
};

const profileValidations = {
  updatePatient: Joi.object({
    name: Joi.string().min(2).max(50).trim(),
    profileData: Joi.object({
      phone: Joi.string().pattern(/^\+?[0-9\s-]{7,15}$/),
      address: Joi.string().max(200),
      age: Joi.number().min(0).max(120),
      gender: Joi.string().valid('male', 'female', 'other')
    })
  }).min(1),

  updateAvailability: Joi.object({
    availableDays: Joi.array().items(Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
    timeSlots: Joi.array().items(Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)),
    workingHours: Joi.object({
      start: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
      end: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    })
  }).min(1)
};

module.exports = {
  authValidations,
  appointmentValidations,
  profileValidations
};
