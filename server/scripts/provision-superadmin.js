/**
 * SKY WARDENS CMS - Secure Super Admin Provisioning Script
 * 
 * Safely provisions or upgrades an initial Super Admin account without resetting
 * existing content or passwords.
 * 
 * Usage:
 *   node scripts/provision-superadmin.js [optional_email]
 */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const User = require("../models/User");
const AuditLog = require("../models/AuditLog");
const { CMS_MODULES } = require("../middleware/permissions");

const targetEmail = (process.argv[2] || process.env.INITIAL_SUPERADMIN_EMAIL || "admin@skywardens.com").toLowerCase().trim();

async function provisionSuperAdmin() {
  console.log("========================================================");
  console.log(" SKY WARDENS - STRATEGIC SUPER ADMIN PROVISIONING TOOL  ");
  console.log("========================================================");
  console.log(`[TARGET ACCOUNT]: ${targetEmail}`);

  try {
    const mongoUri =
      process.env.MONGODB_URI ||
      process.env.MONGO_URI ||
      "mongodb://127.0.0.1:27017/skywardens";

    await mongoose.connect(mongoUri);
    console.log("[DATABASE]: Connected to MongoDB successfully.");

    let user = await User.findOne({ email: targetEmail });

    if (user) {
      console.log(`[FOUND]: Existing account detected (${user.fullName}, username: ${user.username}, role: ${user.role})`);
      user.role = "SUPER_ADMIN";
      user.status = "active";
      user.permissions = CMS_MODULES;
      await user.save();
      console.log("[SUCCESS]: Upgraded account to SUPER_ADMIN with full module permissions.");
    } else {
      console.log("[INFO]: No account found for this email. Creating new initial Super Admin...");
      const defaultPassword = process.env.INITIAL_SUPERADMIN_PASSWORD || "SkyWardens@2026";
      user = await User.create({
        username: "superadmin",
        email: targetEmail,
        password: defaultPassword,
        fullName: "Sky Wardens Command Super Admin",
        role: "SUPER_ADMIN",
        status: "active",
        permissions: CMS_MODULES,
      });
      console.log(`[SUCCESS]: Initial Super Admin created with email: ${targetEmail}`);
      console.log(`[NOTE]: Default password assigned. Please change it immediately via CMS Admin Profile.`);
    }

    // Record Security Audit Entry
    await AuditLog.create({
      action: "SUPERADMIN_PROVISIONED",
      performedBy: user._id,
      performedByEmail: user.email,
      targetUser: user._id,
      targetUserEmail: user.email,
      details: {
        role: "SUPER_ADMIN",
        method: "CLI_BOOTSTRAP_PROVISIONING",
        modulesAssigned: CMS_MODULES.length,
      },
      ipAddress: "127.0.0.1 (CLI Host)",
      userAgent: "SkyWardens-Provisioner/1.0",
    });

    console.log("[AUDIT]: Security event logged in AuditLog collection.");
    console.log("========================================================");
    console.log("PROVISIONING COMPLETED SUCCESSFULLY. SUPER ADMIN READY.");
    console.log("========================================================");
  } catch (err) {
    console.error("[CRITICAL PROVISIONING ERROR]:", err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

provisionSuperAdmin();
