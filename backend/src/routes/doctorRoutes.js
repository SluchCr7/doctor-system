const express = require('express');
const router = express.Router();
const { getDoctorDashboard, getDoctorPatients, updateAvailability, getAvailability, getDoctorProfile, updateDoctorProfile } = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { profileValidations } = require('../validations/schemas');

router.use(protect);
router.use(authorize('doctor', 'admin'));

router.get('/profile', getDoctorProfile);
router.put('/profile', validate(profileValidations.updateDoctor), updateDoctorProfile);
router.get('/dashboard', getDoctorDashboard);
router.get('/patients', getDoctorPatients);
router.get('/availability', getAvailability);
router.put('/availability', validate(profileValidations.updateAvailability), updateAvailability);

module.exports = router;
