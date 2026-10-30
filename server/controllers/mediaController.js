const Media = require("../models/Media");
const fs = require("fs");
const path = require("path");

// @desc    Upload file and save metadata
// @route   POST /api/media/upload
// @access  Private (Admin)
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    // Mirror to Next.js public/uploads directory so Next.js static asset server serves it instantly
    try {
      const publicUploadsDir = path.join(__dirname, "../../public/uploads");
      if (!fs.existsSync(publicUploadsDir)) {
        fs.mkdirSync(publicUploadsDir, { recursive: true });
      }
      const publicDest = path.join(publicUploadsDir, req.file.filename);
      fs.copyFileSync(req.file.path, publicDest);
    } catch (mirrorErr) {
      console.warn("[MEDIA] Could not mirror file to public/uploads:", mirrorErr.message);
    }

    const media = await Media.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: fileUrl,
      altText: req.body.altText || req.file.originalname,
      folder: req.body.folder || "general",
    });

    res.status(201).json({
      success: true,
      message: "File uploaded successfully.",
      data: media,
      url: fileUrl,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all media items
// @route   GET /api/media
// @access  Private (Admin)
const getAllMedia = async (req, res, next) => {
  try {
    const { folder, search } = req.query;
    const filter = {};

    if (folder && folder !== "all") {
      filter.folder = folder;
    }

    if (search) {
      filter.$or = [
        { originalName: new RegExp(search, "i") },
        { altText: new RegExp(search, "i") },
      ];
    }

    const media = await Media.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: media.length, data: media });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete media item and remove physical file
// @route   DELETE /api/media/:id
// @access  Private (Admin)
const deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: "Media not found." });
    }

    // Attempt to delete physical file from uploads folder
    const filePath = path.join(__dirname, "../uploads", media.filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn(`[MEDIA WARNING] Could not remove physical file: ${filePath}`);
      }
    }

    await Media.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Media removed successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile, getAllMedia, deleteMedia };
