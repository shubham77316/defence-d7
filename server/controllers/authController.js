const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { logSecurityEvent } = require("../middleware/permissions");
const { parseClientDevice } = require("../utils/deviceDetector");

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "skywardens_super_secure_jwt_secret_key_2026_defense_grade",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

    // Check user exists with password included
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user) {
      logSecurityEvent({
        action: "LOGIN_FAILED",
        details: { emailAttempted: email, reason: "Account not found" },
        req,
      });
      return res.status(401).json({
        success: false,
        message: "Invalid strategic authorization credentials.",
      });
    }

    // Check if account has been deactivated
    if (user.status === "inactive") {
      logSecurityEvent({
        action: "LOGIN_BLOCKED_DEACTIVATED",
        targetUser: user,
        details: { email: user.email, reason: "Account deactivated" },
        req,
      });
      return res.status(403).json({
        success: false,
        message: "This administrative account has been deactivated. Please contact your Super Administrator.",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      logSecurityEvent({
        action: "LOGIN_FAILED",
        targetUser: user,
        details: { email: user.email, reason: "Invalid password" },
        req,
      });
      return res.status(401).json({
        success: false,
        message: "Invalid strategic authorization credentials.",
      });
    }

    // Parse rich client device telemetry
    const deviceDetails = parseClientDevice(req);

    // Update last login & device details
    user.lastLogin = deviceDetails.loginAt;
    user.lastLoginDetails = deviceDetails;

    if (!Array.isArray(user.loginHistory)) {
      user.loginHistory = [];
    }
    user.loginHistory.unshift(deviceDetails);
    // Keep up to 25 recent login sessions
    if (user.loginHistory.length > 25) {
      user.loginHistory = user.loginHistory.slice(0, 25);
    }
    await user.save();

    const token = generateToken(user._id);

    logSecurityEvent({
      action: "LOGIN_SUCCESS",
      performedBy: user,
      targetUser: user,
      details: {
        role: user.role,
        device: deviceDetails.device,
        deviceModel: deviceDetails.deviceModel,
        os: deviceDetails.os,
        browser: deviceDetails.browser,
        ip: deviceDetails.ip,
      },
      req,
    });

    res.status(200).json({
      success: true,
      message: "Authorization granted.",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        status: user.status || "active",
        permissions: user.permissions || [],
        lastLogin: user.lastLogin,
        lastLoginDetails: user.lastLoginDetails,
        loginHistory: user.loginHistory,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      fullName: req.user.fullName,
      role: req.user.role,
      status: req.user.status || "active",
      permissions: req.user.permissions || [],
      lastLogin: req.user.lastLogin,
      lastLoginDetails: req.user.lastLoginDetails,
      loginHistory: req.user.loginHistory || [],
      createdAt: req.user.createdAt,
    },
  });
};

// @desc    Update admin profile/password
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    user.fullName = req.body.fullName || user.fullName;
    if (req.body.email && req.body.email !== user.email) {
      // Check if email already taken
      const existing = await User.findOne({ email: req.body.email.toLowerCase(), _id: { $ne: user._id } });
      if (existing) {
        return res.status(400).json({ success: false, message: "Email is already taken by another account." });
      }
      user.email = req.body.email.toLowerCase();
    }

    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
      }
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    logSecurityEvent({
      action: "PROFILE_UPDATED",
      performedBy: user,
      targetUser: user,
      details: { changedPassword: !!req.body.password },
      req,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        role: updatedUser.role,
        status: updatedUser.status || "active",
        permissions: updatedUser.permissions || [],
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, getMe, updateProfile };
