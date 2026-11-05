const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e6);
    cb(null, `${cleanBase}_${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
  const allowedExts = /^(jpeg|jpg|png|webp|svg|gif|pdf|jfif|pjpeg|pjp|bmp|tiff|avif|ico)$/i;
  const isImageMime = file.mimetype.startsWith("image/") || file.mimetype === "application/pdf";

  if (allowedExts.test(ext) || isImageMime) {
    cb(null, true);
  } else {
    cb(new Error("Only images (JPG, PNG, WebP, JFIF, SVG, GIF, etc.) and PDF files are permitted."));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter,
});

module.exports = upload;
