const multer = require('multer');

// Use memory storage for direct streaming to Cloudinary
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Check MIME type
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Please upload only image files.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

module.exports = upload;
