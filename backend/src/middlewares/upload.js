const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create uploads directory if it doesn't exist
const uploadDir = "uploads/temp";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allow all file types for now, but you can restrict based on requirements
  const allowedExts =
    /\.(jpe?g|png|gif|svg|webp|pdf|docx?|pptx?|xlsx?|csv|txt|zip|rar|7z|tar|gz|json|xml|md|html?|css|js|ts|jsx|tsx|figma|sketch|ai|eps|psd)$/i;
  const isAllowedExt = allowedExts.test(path.extname(file.originalname));

  if (isAllowedExt) {
    return cb(null, true);
  } else {
    cb(new Error(`File type not allowed: ${path.extname(file.originalname)}`));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter,
});

module.exports = upload;
