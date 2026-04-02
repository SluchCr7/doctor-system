const express = require('express');
const router = express.Router();
const { getPatientProfile, updatePatientProfile, getPatientDashboard, getAllDoctors, getPatientById } = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { profileValidations } = require('../validations/schemas');

router.use(protect);

// Patient specific routes
router.get('/profile', authorize('patient', 'admin'), getPatientProfile);
router.put('/profile', authorize('patient', 'admin'), validate(profileValidations.updatePatient), updatePatientProfile);
router.get('/dashboard', authorize('patient', 'admin'), getPatientDashboard);
router.get('/doctors', authorize('patient', 'doctor', 'admin'), getAllDoctors);

// Doctors/Admins search for specifically identified patients
router.get('/:id', authorize('doctor', 'admin'), getPatientById);

module.exports = router;
