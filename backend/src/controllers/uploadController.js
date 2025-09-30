const cloudinary = require('../services/cloudinaryService');
const logger = require('../utils/logger');
const path = require('path');

// Upload single file
const uploadSingle = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'marketplace',
      resource_type: 'auto'
    });

    res.json({
      message: 'File uploaded successfully',
      file: {
        id: result.public_id,
        url: result.secure_url,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    logger.error('Upload single file error:', error);
    res.status(500).json({ message: 'Upload failed' });
  }
};

// Upload multiple files
const uploadMultiple = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadPromises = req.files.map(file =>
      cloudinary.uploader.upload(file.path, {
        folder: 'marketplace',
        resource_type: 'auto'
      })
    );

    const results = await Promise.all(uploadPromises);

    const files = results.map((result, index) => ({
      id: result.public_id,
      url: result.secure_url,
      originalName: req.files[index].originalname,
      size: req.files[index].size,
      mimetype: req.files[index].mimetype
    }));

    res.json({
      message: 'Files uploaded successfully',
      files
    });
  } catch (error) {
    logger.error('Upload multiple files error:', error);
    res.status(500).json({ message: 'Upload failed' });
  }
};

// Upload and process image
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // Check if file is an image
    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({ message: 'File must be an image' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'marketplace/images',
      transformation: [
        { width: 1200, height: 800, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });

    // Generate thumbnail
    const thumbnailUrl = cloudinary.url(result.public_id, {
      width: 300,
      height: 200,
      crop: 'fill',
      quality: 'auto',
      fetch_format: 'auto'
    });

    res.json({
      message: 'Image uploaded successfully',
      image: {
        id: result.public_id,
        url: result.secure_url,
        thumbnailUrl,
        originalName: req.file.originalname,
        size: req.file.size,
        dimensions: {
          width: result.width,
          height: result.height
        }
      }
    });
  } catch (error) {
    logger.error('Upload image error:', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
};

// Delete file
const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    await cloudinary.uploader.destroy(fileId);

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    logger.error('Delete file error:', error);
    res.status(500).json({ message: 'File deletion failed' });
  }
};

module.exports = {
  uploadSingle,
  uploadMultiple,
  uploadImage,
  deleteFile
};
