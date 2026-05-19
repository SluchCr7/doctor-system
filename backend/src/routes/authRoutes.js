const express = require('express');
const router = express.Router();
const { register, login, logout, getMe, refreshToken, forgotPassword, getAllUsers, resetPassword, uploadProfileImage, uploadClinicImage, updateThemePreference } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { authValidations } = require('../validations/schemas');
const upload = require('../middleware/upload');

router.post('/register', validate(authValidations.register), register);
router.post('/login', validate(authValidations.login), login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', validate(authValidations.resetPassword), resetPassword);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.post('/refresh-token', refreshToken);
router.get('/all-users', protect, authorize('admin'), getAllUsers);
router.post('/profile-image', protect, upload.single('image'), uploadProfileImage);
router.post('/clinic-image', protect, upload.single('image'), uploadClinicImage);
router.patch('/theme', protect, updateThemePreference);

module.exports = router;
