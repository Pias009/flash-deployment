const multer = require("multer");

const allowedTypes = [
  "image/jpeg", // JPEG
  "image/jpg", // JPG (alias)
  "image/png", // PNG
  "image/webp", // WebP
  "image/gif", // GIF
  "image/svg+xml", // SVG
  "image/avif", // AVIF
  "image/heic", // HEIC (iOS photos)
  "image/heif", // HEIF (iOS photos)
  "image/tiff", // TIFF
  "image/bmp", // Bitmap
];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) return cb(null, true);
  cb(new Error("Invalid file type"));
};

const storage = multer.memoryStorage();
const fileSize = 1 * 1024 * 1024;

const upload = multer({
  storage,
  fileFilter,
  limits: fileSize,
});

const uploadSingle = upload.single("image");

module.exports = { uploadSingle };
