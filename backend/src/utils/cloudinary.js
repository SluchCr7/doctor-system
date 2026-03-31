const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dxgxbw5r9',
  api_key: process.env.CLOUDINARY_API_KEY || '645318189814427',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'Q-VzW-sJj1G5XpLz89q2JvXz5Uo',
});

module.exports = cloudinary;
