const express = require('express');
const uploadController = require('../controllers/uploadController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const router = express.Router();

// All upload routes require authentication
router.use(protect);

// Single file upload
router.post('/single', upload.single('file'), uploadController.uploadSingle);

// Multiple files upload
router.post('/multiple', upload.array('files', 10), uploadController.uploadMultiple);

// Image upload with processing
router.post('/image', upload.single('image'), uploadController.uploadImage);

// Delete file
router.delete('/:fileId', uploadController.deleteFile);

module.exports = router;
