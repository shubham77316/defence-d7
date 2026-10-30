const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "admin", "editor"],
      default: "ADMIN",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    permissions: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    fullName: {
      type: String,
      default: "System Administrator",
    },
    lastLogin: {
      type: Date,
    },
    lastLoginDetails: {
      loginAt: { type: Date },
      ip: { type: String, default: "127.0.0.1" },
      device: { type: String, default: "Desktop" },
      deviceModel: { type: String, default: "Desktop" },
      os: { type: String, default: "Unknown OS" },
      osName: { type: String, default: "" },
      osVersion: { type: String, default: "" },
      browser: { type: String, default: "Unknown Browser" },
      browserName: { type: String, default: "" },
      browserVersion: { type: String, default: "" },
      userAgent: { type: String, default: "" },
    },
    loginHistory: [
      {
        loginAt: { type: Date, default: Date.now },
        ip: { type: String, default: "127.0.0.1" },
        device: { type: String, default: "Desktop" },
        deviceModel: { type: String, default: "Desktop" },
        os: { type: String, default: "Unknown OS" },
        osName: { type: String, default: "" },
        osVersion: { type: String, default: "" },
        browser: { type: String, default: "Unknown Browser" },
        browserName: { type: String, default: "" },
        browserVersion: { type: String, default: "" },
        userAgent: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
