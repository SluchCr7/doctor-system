const express = require('express');
const router = express.Router();
const { getPatientProfile, updatePatientProfile, getPatientDashboard, getAllDoctors } = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { profileValidations } = require('../validations/schemas');

router.use(protect);
router.use(authorize('patient', 'admin'));

router.get('/profile', getPatientProfile);
router.put('/profile', validate(profileValidations.updatePatient), updatePatientProfile);
router.get('/dashboard', getPatientDashboard);
router.get('/doctors', getAllDoctors);

module.exports = router;
