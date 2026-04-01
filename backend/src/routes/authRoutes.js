const express = require('express');
const router = express.Router();
const { register, login, logout, getMe, refreshToken, forgotPassword, getAllUsers, uploadProfileImage, uploadClinicImage } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { authValidations } = require('../validations/schemas');
const upload = require('../middleware/upload');

router.post('/register', validate(authValidations.register), register);
router.post('/login', validate(authValidations.login), login);
router.post('/forgot-password', forgotPassword);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.post('/refresh-token', refreshToken);
router.get('/all-users', getAllUsers);
router.post('/profile-image', protect, upload.single('image'), uploadProfileImage);
router.post('/clinic-image', protect, upload.single('image'), uploadClinicImage);
module.exports = router;
