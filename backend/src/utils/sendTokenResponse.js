const { getSignedJwtToken, getSignedRefreshToken } = require('./tokenUtils');

// Get token from model, create cookie and send response
const sendTokenResponse = async (user, statusCode, res) => {
  // Create token
  const token = getSignedJwtToken(user._id, user.role);
  const refreshToken = getSignedRefreshToken(user._id);

  // Save refresh token to user
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      }
    });
};

module.exports = sendTokenResponse;
