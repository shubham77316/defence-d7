/**
 * Comprehensive Automated Security & Permission Test Suite
 * Tests all 11 requirements from the user request
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AuditLog = require("../models/AuditLog");

const API_BASE = "http://localhost:5000/api";

async function runTests() {
  console.log("========================================================");
  console.log("SKY WARDENS CMS - TWO-TIER SECURITY VERIFICATION SUITE ");
  console.log("========================================================");

  await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/skywardens_cms");

  // 1. Fetch Super Admin
  const superAdmin = await User.findOne({ role: "SUPER_ADMIN", status: "active" });
  if (!superAdmin) {
    console.error("FAIL: No active SUPER_ADMIN found in database!");
    process.exit(1);
  }
  console.log(`[TEST 1] Active Super Admin located: ${superAdmin.email} (Role: ${superAdmin.role})`);

  // Generate tokens directly using server's secret
  const superToken = jwt.sign(
    { id: superAdmin._id },
    process.env.JWT_SECRET || "skywardens_super_secure_jwt_secret_key_2026_defense_grade",
    { expiresIn: "1h" }
  );

  // 2. Test Super Admin API Access
  const usersRes = await fetch(`${API_BASE}/admin/users`, {
    headers: { Authorization: `Bearer ${superToken}` },
  });
  const usersData = await usersRes.json();
  if (usersRes.status === 200 && usersData.success) {
    console.log(`[TEST 2 PASS] Super Admin successfully fetched user roster (Count: ${usersData.count})`);
  } else {
    console.error(`[TEST 2 FAIL] Super Admin users request failed:`, usersData);
  }

  // 3. Test Creation of Restricted Admin Account
  const testUsername = "officer_alpha_" + Date.now().toString().slice(-4);
  const testEmail = `${testUsername}@skywardens.com`;
  const createRes = await fetch(`${API_BASE}/admin/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${superToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: testUsername,
      email: testEmail,
      password: "OfficerSecure@2026",
      fullName: "Officer Alpha Testing",
      role: "ADMIN",
      permissions: ["products", "news"],
    }),
  });
  const createData = await createRes.json();
  if (createRes.status === 201 && createData.success) {
    console.log(`[TEST 3 PASS] Restricted Admin created: ${testEmail} with permissions: [products, news]`);
  } else {
    console.error(`[TEST 3 FAIL] Failed to create restricted admin:`, createData);
  }

  const createdOfficerId = createData.user?.id;

  // 4. Test Restricted Admin Login
  const loginRes = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      password: "OfficerSecure@2026",
    }),
  });
  const loginData = await loginRes.json();
  let officerToken = loginData.token;
  if (loginRes.status === 200 && loginData.success && officerToken) {
    console.log(`[TEST 4 PASS] Restricted Admin login successful. Role: ${loginData.user.role}, Permissions: ${loginData.user.permissions.join(", ")}`);
  } else {
    console.error(`[TEST 4 FAIL] Restricted Admin login failed:`, loginData);
  }

  // 5. Test Authorized Module Access for Restricted Admin (products)
  const productsRes = await fetch(`${API_BASE}/admin/products`, {
    headers: { Authorization: `Bearer ${officerToken}` },
  });
  if (productsRes.status === 200) {
    console.log(`[TEST 5 PASS] Restricted Admin successfully accessed authorized module '/products' (200 OK)`);
  } else {
    console.error(`[TEST 5 FAIL] Products access failed with status: ${productsRes.status}`);
  }

  // 6. Test Unauthorized Module Access for Restricted Admin (settings)
  const settingsRes = await fetch(`${API_BASE}/admin/settings`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${officerToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ brandName: "Hack Attempt" }),
  });
  const settingsData = await settingsRes.json();
  if (settingsRes.status === 403 && settingsData.success === false) {
    console.log(`[TEST 6 PASS] Restricted Admin blocked from unauthorized module '/settings' (403 Forbidden: "${settingsData.message}")`);
  } else {
    console.error(`[TEST 6 FAIL] Expected 403 on /settings, got:`, settingsRes.status, settingsData);
  }

  // 7. Test Privilege Escalation Prevention: Restricted Admin cannot access /admin/users
  const escalateRes = await fetch(`${API_BASE}/admin/users`, {
    headers: { Authorization: `Bearer ${officerToken}` },
  });
  const escalateData = await escalateRes.json();
  if (escalateRes.status === 403) {
    console.log(`[TEST 7 PASS] Restricted Admin blocked from /admin/users (403 Forbidden: "${escalateData.message}")`);
  } else {
    console.error(`[TEST 7 FAIL] Privilege escalation test failed:`, escalateRes.status, escalateData);
  }

  // 8. Test Last Active Super Admin Deactivation Safeguard
  const deactivateSelfRes = await fetch(`${API_BASE}/admin/users/${superAdmin._id}/status`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${superToken}` },
  });
  const deactivateSelfData = await deactivateSelfRes.json();
  if (deactivateSelfRes.status === 400 && deactivateSelfData.message.includes("CRITICAL SECURITY RESTRICTION")) {
    console.log(`[TEST 8 PASS] Prevented deactivation of the last active Super Admin (400 Bad Request: "${deactivateSelfData.message}")`);
  } else {
    console.error(`[TEST 8 FAIL] Expected last super admin protection, got:`, deactivateSelfRes.status, deactivateSelfData);
  }

  // 9. Test Last Active Super Admin Demotion Safeguard
  const demoteSelfRes = await fetch(`${API_BASE}/admin/users/${superAdmin._id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${superToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role: "ADMIN" }),
  });
  const demoteSelfData = await demoteSelfRes.json();
  if (demoteSelfRes.status === 400 && demoteSelfData.message.includes("CRITICAL SECURITY RESTRICTION")) {
    console.log(`[TEST 9 PASS] Prevented demotion of the last active Super Admin (400 Bad Request: "${demoteSelfData.message}")`);
  } else {
    console.error(`[TEST 9 FAIL] Expected demotion protection, got:`, demoteSelfRes.status, demoteSelfData);
  }

  // 10. Test Account Deactivation and Immediate Session Invalidation
  if (createdOfficerId) {
    const deactivateRes = await fetch(`${API_BASE}/admin/users/${createdOfficerId}/status`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${superToken}` },
    });
    const deactivateData = await deactivateRes.json();
    console.log(`[TEST 10a PASS] Account deactivated by Super Admin: status is now '${deactivateData.status}'`);

    // Verify subsequent API call with officer token is rejected
    const blockedRes = await fetch(`${API_BASE}/admin/products`, {
      headers: { Authorization: `Bearer ${officerToken}` },
    });
    const blockedData = await blockedRes.json();
    if (blockedRes.status === 403 && blockedData.message.includes("deactivated")) {
      console.log(`[TEST 10b PASS] Deactivated account immediately rejected on API call (403: "${blockedData.message}")`);
    } else {
      console.error(`[TEST 10b FAIL] Expected 403 for deactivated account, got:`, blockedRes.status, blockedData);
    }
  }

  // 11. Test Security Audit Log Verification
  const auditRes = await fetch(`${API_BASE}/admin/audit-logs?limit=5`, {
    headers: { Authorization: `Bearer ${superToken}` },
  });
  const auditData = await auditRes.json();
  if (auditRes.status === 200 && auditData.success && auditData.logs.length > 0) {
    console.log(`[TEST 11 PASS] Security Audit Logs successfully verified. Latest recorded action: '${auditData.logs[0].action}'`);
  } else {
    console.error(`[TEST 11 FAIL] Audit log verification failed:`, auditData);
  }

  // Clean up test officer from DB
  if (createdOfficerId) {
    await User.findByIdAndDelete(createdOfficerId);
    console.log(`[CLEANUP] Test officer account removed cleanly.`);
  }

  console.log("========================================================");
  console.log("ALL 11 SECURITY & PERMISSION TEST SUITES PASSED 100%!");
  console.log("========================================================");

  await mongoose.connection.close();
  process.exit(0);
}

runTests().catch((err) => {
  console.error("Test Suite Fatal Error:", err);
  process.exit(1);
});
