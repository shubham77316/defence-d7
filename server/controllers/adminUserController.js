const User = require("../models/User");
const AuditLog = require("../models/AuditLog");
const { logSecurityEvent, CMS_MODULES } = require("../middleware/permissions");

/**
 * @desc    Get all admin users (Super Admin only)
 * @route   GET /api/admin/users
 * @access  Private / SUPER_ADMIN
 */
const getAdmins = async (req, res, next) => {
  try {
    const { search, role, status } = req.query;
    const query = {};

    if (search) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [{ username: regex }, { email: regex }, { fullName: regex }];
    }

    if (role && role !== "ALL") {
      query.role = role;
    }

    if (status && status !== "ALL") {
      query.status = status;
    }

    const admins = await User.find(query)
      .select("-password")
      .populate("createdBy", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: admins.length,
      users: admins,
      availableModules: CMS_MODULES,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new admin account (Super Admin only)
 * @route   POST /api/admin/users
 * @access  Private / SUPER_ADMIN
 */
const createAdmin = async (req, res, next) => {
  try {
    const { username, email, password, fullName, role = "ADMIN", permissions = [] } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long for administrative security.",
      });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Check existing
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.trim() }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email or username already exists.",
      });
    }

    const targetRole = role === "SUPER_ADMIN" ? "SUPER_ADMIN" : "ADMIN";

    // Filter permissions to valid CMS modules
    const validatedPermissions = Array.isArray(permissions)
      ? permissions.filter((p) => CMS_MODULES.includes(p))
      : [];

    const newAdmin = await User.create({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password,
      fullName: fullName?.trim() || "Strategic Administrator",
      role: targetRole,
      status: "active",
      permissions: targetRole === "SUPER_ADMIN" ? CMS_MODULES : validatedPermissions,
      createdBy: req.user._id,
    });

    await logSecurityEvent({
      action: "ADMIN_CREATED",
      performedBy: req.user,
      targetUser: newAdmin,
      details: {
        role: targetRole,
        permissionsCount: newAdmin.permissions.length,
      },
      req,
    });

    res.status(201).json({
      success: true,
      message: `Administrator account for ${newAdmin.fullName} created successfully.`,
      user: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        fullName: newAdmin.fullName,
        role: newAdmin.role,
        status: newAdmin.status,
        permissions: newAdmin.permissions,
        createdAt: newAdmin.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update admin user details, role & permissions (Super Admin only)
 * @route   PUT /api/admin/users/:id
 * @access  Private / SUPER_ADMIN
 */
const updateAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fullName, email, role, permissions, password } = req.body;

    const targetUser = await User.findById(id).select("+password");
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "Administrator account not found.",
      });
    }

    // Safeguard: Demoting a Super Admin
    if (targetUser.role === "SUPER_ADMIN" && role && role !== "SUPER_ADMIN") {
      const activeSuperAdmins = await User.countDocuments({
        role: "SUPER_ADMIN",
        status: "active",
      });
      if (activeSuperAdmins <= 1) {
        return res.status(400).json({
          success: false,
          message:
            "CRITICAL SECURITY RESTRICTION: Cannot demote the last active Super Admin. Another active Super Admin must exist first.",
        });
      }
    }

    if (fullName) targetUser.fullName = fullName.trim();

    if (email && email.toLowerCase() !== targetUser.email) {
      const existing = await User.findOne({
        email: email.toLowerCase().trim(),
        _id: { $ne: targetUser._id },
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Email address is already in use by another administrator.",
        });
      }
      targetUser.email = email.toLowerCase().trim();
    }

    if (role && ["SUPER_ADMIN", "ADMIN"].includes(role)) {
      targetUser.role = role;
    }

    if (permissions !== undefined) {
      if (targetUser.role === "SUPER_ADMIN") {
        targetUser.permissions = CMS_MODULES;
      } else if (Array.isArray(permissions)) {
        targetUser.permissions = permissions.filter((p) => CMS_MODULES.includes(p));
      }
    }

    if (password) {
      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "New password must be at least 8 characters long.",
        });
      }
      targetUser.password = password;
    }

    await targetUser.save();

    await logSecurityEvent({
      action: "ADMIN_UPDATED",
      performedBy: req.user,
      targetUser,
      details: {
        updatedRole: targetUser.role,
        permissionsCount: targetUser.permissions.length,
        passwordChanged: !!password,
      },
      req,
    });

    res.status(200).json({
      success: true,
      message: "Administrator account updated successfully.",
      user: {
        id: targetUser._id,
        username: targetUser.username,
        email: targetUser.email,
        fullName: targetUser.fullName,
        role: targetUser.role,
        status: targetUser.status,
        permissions: targetUser.permissions,
        updatedAt: targetUser.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle admin status (active/inactive) with last Super Admin safeguard
 * @route   PATCH /api/admin/users/:id/status
 * @access  Private / SUPER_ADMIN
 */
const toggleAdminStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const targetUser = await User.findById(id);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "Administrator account not found.",
      });
    }

    // Check safeguard if deactivating an active Super Admin
    if (targetUser.role === "SUPER_ADMIN" && targetUser.status === "active") {
      const activeSuperAdmins = await User.countDocuments({
        role: "SUPER_ADMIN",
        status: "active",
      });

      if (activeSuperAdmins <= 1) {
        return res.status(400).json({
          success: false,
          message:
            "CRITICAL SECURITY RESTRICTION: Cannot deactivate the last active Super Admin. At least one Super Admin must always remain operational.",
        });
      }
    }

    const nextStatus = targetUser.status === "active" ? "inactive" : "active";
    targetUser.status = nextStatus;
    await targetUser.save();

    await logSecurityEvent({
      action: nextStatus === "active" ? "ADMIN_ACTIVATED" : "ADMIN_DEACTIVATED",
      performedBy: req.user,
      targetUser,
      details: { newStatus: nextStatus },
      req,
    });

    res.status(200).json({
      success: true,
      message: `Account for ${targetUser.fullName} is now ${nextStatus}.`,
      status: nextStatus,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch security audit logs (Super Admin only)
 * @route   GET /api/admin/audit-logs
 * @access  Private / SUPER_ADMIN
 */
const getAuditLogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, action } = req.query;
    const query = {};

    if (action && action !== "ALL") {
      query.action = action;
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const [logs, total] = await Promise.all([
      AuditLog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit, 10))
        .populate("performedBy", "fullName email")
        .populate("targetUser", "fullName email"),
      AuditLog.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page, 10),
      totalPages: Math.ceil(total / parseInt(limit, 10)),
      logs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdmins,
  createAdmin,
  updateAdmin,
  toggleAdminStatus,
  getAuditLogs,
};
