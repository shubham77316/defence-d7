const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { protect } = require("../middleware/auth");
const { requirePermission } = require("../middleware/permissions");
const {
  uploadFile,
  getAllMedia,
  deleteMedia,
} = require("../controllers/mediaController");

// Protected upload and media management
router.use(protect, requirePermission("media"));

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getAllMedia);
router.delete("/:id", deleteMedia);

module.exports = router;
