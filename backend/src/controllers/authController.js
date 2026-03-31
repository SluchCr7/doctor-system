const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const sendTokenResponse = require('../utils/sendTokenResponse');
const { verifyRefreshToken } = require('../utils/tokenUtils');
const bcrypt = require('bcryptjs');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, profileData } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  // Hash password before creating user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    profileData
  });

  await sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide an email and password' });
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  await sendTokenResponse(user, 200, res);
});

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get current logged in user
// @route   POST /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Refresh token
// @route   POST /api/auth/refresh-token
// @access  Public
exports.refreshToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ success: false, message: 'Refresh token mandatory' });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }

    await sendTokenResponse(user, 200, res);
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Refresh token invalid' });
  }
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  // Get reset token
  const crypto = require('crypto');
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    const sendEmail = require('../utils/sendEmail');
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(500).json({ success: false, message: 'Email could not be sent' });
  }
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// @desc    Upload Profile Image
// @route   POST /api/auth/profile-image
// @access  Private
exports.uploadProfileImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload an image file' });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'doctor-system/profiles',
      width: 500,
      height: 500,
      crop: 'fill',
    });

    // Remove file from local temp storage
    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);

    // Update user profile
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: result.secure_url },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile image updated successfully',
      data: user
    });
  } catch (err) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error(err);
    return res.status(500).json({ success: false, message: 'Image upload failed' });
  }
});
