const jwt = require('jsonwebtoken');

/**
 * Generate a JWT signed token
 * @param {string} id User ID
 * @param {string} role User role
 * @returns {string} JWT Token
 */
const getSignedJwtToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

/**
 * Generate a refresh token
 * @param {string} id User ID
 * @returns {string} Refresh Token
 */
const getSignedRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE
  });
};

module.exports = {
  getSignedJwtToken,
  getSignedRefreshToken,
  verifyToken,
  verifyRefreshToken
};

/**
 * Verify a JWT token
 * @param {string} token 
 * @returns {object} Decoded payload
 */
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

/**
 * Verify a refresh token
 * @param {string} token 
 * @returns {object} Decoded payload
 */
function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}
