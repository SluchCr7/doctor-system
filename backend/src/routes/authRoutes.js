const express = require('express');
const router = express.Router();
const { register, login, logout, getMe, refreshToken, forgotPassword, getAllUsers } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { authValidations } = require('../validations/schemas');

router.post('/register', validate(authValidations.register), register);
router.post('/login', validate(authValidations.login), login);
router.post('/forgot-password', forgotPassword);
router.get('/logout', logout);
router.post('/me', protect, getMe);
router.post('/refresh-token', refreshToken);
router.get('/all-users', getAllUsers);
module.exports = router;
