const cloudinary = require('../services/cloudinaryService');
const logger = require('../utils/logger');
const path = require('path');
const fs = require('fs');

// Helper to cleanup temp file
const cleanupFile = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    logger.error(`Failed to cleanup file ${filePath}:`, err);
  }
};

// Helper to determine resource type
const getResourceType = (mimetype) => {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';

  // Force raw for documents and archives
  const rawTypes = [
    'application/pdf',
    'application/zip',
    'application/x-zip-compressed',
    'application/vnd.rar',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  if (rawTypes.includes(mimetype) || mimetype.includes('application/')) {
      return 'raw';
  }

  return 'auto';
};

// Upload single file
const uploadSingle = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const resourceType = getResourceType(req.file.mimetype);

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'marketplace',
      resource_type: resourceType
    });

    cleanupFile(req.file.path);

    res.json({
      message: 'File uploaded successfully',
      file: {
        id: result.public_id,
        url: result.secure_url,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        resourceType
      }
    });
  } catch (error) {
    if (req.file) cleanupFile(req.file.path);
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

    const uploadPromises = req.files.map(file => {
      const resourceType = getResourceType(file.mimetype);
      const options = {
        folder: 'marketplace',
        resource_type: resourceType
        // NOTE: Using default 'upload' type (public accessible)
        // Security is enforced at application layer via purchase verification
      };

      return cloudinary.uploader.upload(file.path, options).then(result => {
         cleanupFile(file.path);
         return {
             ...result,
             originalFile: file,
             resourceType
         };
      }).catch(err => {
         cleanupFile(file.path);
         throw err;
      });
    });

    const results = await Promise.all(uploadPromises);

    const files = results.map((result) => ({
      id: result.public_id,
      url: result.secure_url,
      originalName: result.originalFile.originalname,
      size: result.originalFile.size,
      mimetype: result.originalFile.mimetype,
      resourceType: result.resourceType
    }));

    res.json({
      message: 'Files uploaded successfully',
      files
    });
  } catch (error) {
    if (req.files) {
        req.files.forEach(file => cleanupFile(file.path));
    }
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
      cleanupFile(req.file.path);
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

    cleanupFile(req.file.path);

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
    if (req.file) cleanupFile(req.file.path);
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
