const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY,
});

/**
 * Extract public_id from Cloudinary URL
 */
const getPublicIdFromUrl = (url) => {
  if (!url || !url.includes('cloudinary')) return null;
  // Get part after /upload/ and before extension
  const parts = url.split('/upload/');
  if (parts.length < 2) return null;

  // parts[1] might be like v12345/folder/id.jpg
  const pathParts = parts[1].split('/');
  // Filter out version if present (starts with 'v')
  const cleanParts = pathParts.filter(p => !p.startsWith('v'));
  // Join back and remove extension
  const fullPath = cleanParts.join('/');
  return fullPath.split('.')[0];
};

/**
 * Delete image from Cloudinary
 */
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error('Failed to delete from Cloudinary:', err);
  }
};

module.exports = {
  cloudinary,
  getPublicIdFromUrl,
  deleteFromCloudinary
};
