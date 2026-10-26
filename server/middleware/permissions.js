const AuditLog = require("../models/AuditLog");

const CMS_MODULES = [
  "dashboard",
  "enquiries",
  "settings",
  "navigation",
  "homepage",
  "about",
  "products",
  "news",
  "partners",
  "faqs",
  "footer",
  "media",
  "profile",
];

/**
 * Checks if user has Super Admin clearance
 */
const isSuperAdmin = (user) => {
  if (!user) return false;
  return user.role === "SUPER_ADMIN";
};

/**
 * Middleware: Strictly requires SUPER_ADMIN role
 */
const requireSuperAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  if (req.user.role === "SUPER_ADMIN") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Clearance Denied: This operation requires SUPER_ADMIN credentials.",
  });
};

/**
 * Middleware: Checks granular module permission
 * SUPER_ADMIN gets automatic access.
 * Legacy 'admin' role gets backward-compatible access.
 * ADMIN accounts must have the module present in their permissions array.
 */
const requirePermission = (moduleName) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // Super Admin bypasses all module checks
    if (req.user.role === "SUPER_ADMIN" || req.user.role === "admin") {
      return next();
    }

    // Role ADMIN requires explicit module assignment
    const userPermissions = Array.isArray(req.user.permissions) ? req.user.permissions : [];

    if (userPermissions.includes(moduleName)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: `Access Denied: Your account does not have permission for the '${moduleName}' module.`,
      module: moduleName,
    });
  };
};

/**
 * Helper to log security actions asynchronously without blocking response
 */
const logSecurityEvent = async ({
  action,
  performedBy = null,
  targetUser = null,
  details = {},
  req = null,
}) => {
  try {
    const ipAddress =
      req?.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req?.socket?.remoteAddress ||
      "127.0.0.1";
    const userAgent = req?.headers["user-agent"] || "unknown";

    await AuditLog.create({
      action,
      performedBy: performedBy?._id || performedBy?.id || null,
      performedByEmail: performedBy?.email || "SYSTEM",
      targetUser: targetUser?._id || targetUser?.id || null,
      targetUserEmail: targetUser?.email || null,
      details,
      ipAddress,
      userAgent,
    });
  } catch (err) {
    console.error("[AUDIT LOG ERROR]", err.message);
  }
};

module.exports = {
  CMS_MODULES,
  isSuperAdmin,
  requireSuperAdmin,
  requirePermission,
  logSecurityEvent,
};
