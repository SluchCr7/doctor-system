const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const sendTokenResponse = require('../utils/sendTokenResponse');
const { verifyRefreshToken } = require('../utils/tokenUtils');
const bcrypt = require('bcryptjs');
const { cloudinary, getPublicIdFromUrl, deleteFromCloudinary } = require('../utils/cloudinary');
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
  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  };

  res
    .cookie('token', 'none', cookieOptions)
    .cookie('refreshToken', 'none', cookieOptions)
    .status(200)
    .json({
      success: true,
      data: {}
    });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password -refreshToken');
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const userData = user.toObject();
  
  // If doctor, attach availability
  if (user.role === 'doctor') {
    const DoctorAvailability = require('../models/DoctorAvailability');
    const availability = await DoctorAvailability.findOne({ doctorId: user.id });
    userData.availability = availability || null;
  }

  res.status(200).json({
    success: true,
    data: userData
  });
});

// @desc    Refresh token
// @route   POST /api/auth/refresh-token
// @access  Public
exports.refreshToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

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
  const users = await User.find().select('-password -refreshToken');
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resetToken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = require('crypto')
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  }).select('+password');

  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
  }

  const { password } = req.body;
  if (!password || password.length < 6) {
    return res.status(400).json({ success: false, message: 'A new password of at least 6 characters is required' });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  await sendTokenResponse(user, 200, res);
});

// @desc    Upload Profile Image
// @route   POST /api/auth/profile-image
// @access  Private
exports.uploadProfileImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload an image file (field: image)' });
  }

  try {
    // Stream upload from buffer using Cloudinary's upload_stream
    const uploadFromBuffer = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'doctor-system/profiles',
            resource_type: 'image',
            transformation: [{ width: 500, height: 500, crop: 'fill', gravity: 'face' }]
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(fileBuffer);
      });
    };

    const result = await uploadFromBuffer(req.file.buffer);
    
    // Find user to get old image
    const oldUser = await User.findById(req.user.id).select('-password -refreshToken');
    const oldImagePublicId = getPublicIdFromUrl(oldUser?.profileImage);

    // Update user profile
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: result.secure_url },
      { new: true, runValidators: true, select: '-password -refreshToken' }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Delete old image from Cloudinary (ONLY if not a placeholder)
    if (oldImagePublicId && !oldUser.profileImage.includes('pixabay') && !oldUser.profileImage.includes('dicebear')) {
      await deleteFromCloudinary(oldImagePublicId);
    }

    const userData = user.toObject();
    userData.id = userData._id;

    res.status(200).json({
      success: true,
      message: 'Profile image updated successfully',
      data: userData
    });
  } catch (err) {
    console.error('Profile Upload Error:', err);
    return res.status(500).json({ success: false, message: `Image upload failed: ${err.message}` });
  }
});
// @desc    Upload Clinic Image
// @route   POST /api/auth/clinic-image
// @access  Private/Doctor
exports.uploadClinicImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload an image file (field: image)' });
  }

  try {
    const uploadFromBuffer = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'doctor-system/clinics',
            resource_type: 'image',
            transformation: [{ width: 1000, height: 600, crop: 'fit' }]
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(fileBuffer);
      });
    };

    const result = await uploadFromBuffer(req.file.buffer);

    // Update clinic image in user's profileData
    const user = await User.findById(req.user.id).select('-password -refreshToken');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    if (user.role !== 'doctor') {
      return res.status(403).json({ success: false, message: 'Only doctor accounts can have clinic images' });
    }

    // Get old clinic image public ID
    const oldClinicImagePublicId = getPublicIdFromUrl(user.profileData?.clinicImage);

    if (!user.profileData) {
      user.profileData = {};
    }

    user.profileData.clinicImage = result.secure_url;
    user.markModified('profileData');
    
    await user.save({ validateBeforeSave: false });

    // Delete old clinical image (ONLY if not a placeholder)
    if (oldClinicImagePublicId && !user.profileData?.clinicImage?.includes('pixabay')) {
       await deleteFromCloudinary(oldClinicImagePublicId);
    }

    const userData = user.toObject();
    userData.id = userData._id;

    res.status(200).json({
      success: true,
      message: 'Clinic image updated successfully',
      data: userData
    });
  } catch (err) {
    console.error('Clinic Upload Error:', err);
    return res.status(500).json({ success: false, message: `Clinic image upload failed: ${err.message}` });
  }
});

// @desc    Update and persist theme preference
// @route   PATCH /api/auth/theme
// @access  Private
exports.updateThemePreference = asyncHandler(async (req, res, next) => {
  const { theme } = req.body;

  if (!theme || !['light', 'dark'].includes(theme)) {
    return res.status(400).json({ success: false, message: 'Invalid theme specified. Choose light or dark.' });
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { theme },
    { new: true, runValidators: true }
  );

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({
    success: true,
    message: `Theme updated to ${theme} successfully`,
    data: { theme: user.theme }
  });
});
