const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { requireSuperAdmin } = require("../middleware/permissions");
const { rateLimiter } = require("../middleware/rateLimiter");
const {
  getAdmins,
  createAdmin,
  updateAdmin,
  toggleAdminStatus,
  getAuditLogs,
} = require("../controllers/adminUserController");

// Admin User Management (Strictly Super Admin)
router.get("/users", protect, requireSuperAdmin, getAdmins);
router.post(
  "/users",
  protect,
  requireSuperAdmin,
  rateLimiter({ windowMs: 15 * 60 * 1000, max: 20, message: "Too many admin accounts created from this IP. Please try again later." }),
  createAdmin
);
router.put("/users/:id", protect, requireSuperAdmin, updateAdmin);
router.patch("/users/:id/status", protect, requireSuperAdmin, toggleAdminStatus);

// Security Audit Logs (Strictly Super Admin)
router.get("/audit-logs", protect, requireSuperAdmin, getAuditLogs);

module.exports = router;
