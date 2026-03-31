const express = require('express');
const router = express.Router();
const { getDoctorDashboard, getDoctorPatients, updateAvailability, getAvailability } = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { profileValidations } = require('../validations/schemas');

router.use(protect);
router.use(authorize('doctor', 'admin'));

router.get('/dashboard', getDoctorDashboard);
router.get('/patients', getDoctorPatients);
router.get('/availability', getAvailability);
router.put('/availability', validate(profileValidations.updateAvailability), updateAvailability);

module.exports = router;
