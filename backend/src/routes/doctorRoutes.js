const express = require('express');
const router = express.Router();
const { 
  getDoctorDashboard, 
  getDoctorPatients, 
  updateAvailability, 
  getAvailability, 
  getDoctorProfile, 
  updateDoctorProfile,
  getDoctorById 
} = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { profileValidations } = require('../validations/schemas');

router.use(protect);

// Routes for both patients and doctors (View doctor details)
// Note: We avoid shadowing by defining /dashboard etc. later or using more specific paths
// Actually, let's keep it simple: specific routes first, THEN the ID route.

// Specific routes requiring DOCTOR role
router.get('/profile', authorize('doctor', 'admin'), getDoctorProfile);
router.put('/profile', authorize('doctor', 'admin'), validate(profileValidations.updateDoctor), updateDoctorProfile);
router.get('/dashboard', authorize('doctor', 'admin'), getDoctorDashboard);
router.get('/patients', authorize('doctor', 'admin'), getDoctorPatients);
router.get('/availability', authorize('doctor', 'admin'), getAvailability);
router.put('/availability', authorize('doctor', 'admin'), updateAvailability);

// Generic ID route for public/patient viewing (Must be last to avoid catching sub-routes)
router.get('/:id', getDoctorById);

module.exports = router;
