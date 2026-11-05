/**
 * SKY WARDENS Sovereign Strategic Systems
 * Complete Dynamic Website CMS - Express & MongoDB Backend Server
 */

const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// Import Route Handlers
const authRoutes = require("./routes/authRoutes");
const publicRoutes = require("./routes/publicRoutes");
const adminRoutes = require("./routes/adminRoutes");
const mediaRoutes = require("./routes/mediaRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  process.env.ADMIN_URL || "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        callback(new Error("Strategic CORS policy violation: Origin not allowed"));
      }
    },
    credentials: true,
  })
);

// Body Parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request Logger
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Static folders for uploaded media and images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/images", express.static(path.join(__dirname, "../public/images")));

// System Health Status API
app.get("/api/health", (req, res) => {
  const mongoose = require("mongoose");
  const isDbConnected = mongoose.connection.readyState === 1;

  res.status(200).json({
    status: "operational",
    brand: "Sky Wardens Sovereign Defence",
    version: "3.0.0-full-cms",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      connected: isDbConnected,
      status: isDbConnected ? "connected" : "disconnected",
      host: mongoose.connection.host || "N/A",
      name: mongoose.connection.name || "N/A",
    },
    services: {
      inquiryGateway: "active",
      contentManagement: "active",
      mediaStorage: "active",
      authentication: "active",
    },
  });
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api", publicRoutes);

// Root Welcome Route
app.get("/", (req, res) => {
  res.status(200).json({
    brand: "Sky Wardens Sovereign Defence Systems",
    service: "CMS Backend REST API",
    status: "active",
    documentation: "/api/health",
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start Server if run directly
if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`========================================================`);
    console.log(`SKY WARDENS CMS BACKEND SERVER LISTENING ON PORT ${PORT}`);
    console.log(`API URL:        http://localhost:${PORT}/api`);
    console.log(`HEALTH CHECK:   http://localhost:${PORT}/api/health`);
    console.log(`CLIENT ORIGIN:  ${process.env.CLIENT_URL || "http://localhost:3000"}`);
    console.log(`ADMIN ORIGIN:   ${process.env.ADMIN_URL || "http://localhost:5174"}`);
    console.log(`========================================================`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`[FATAL] Port ${PORT} is already in use by another process.`);
    } else {
      console.error("[SERVER ERROR]", err);
    }
  });

  // Graceful Shutdown
  const shutdown = () => {
    console.log("\n[SYSTEM] Received shutdown signal. Closing server...");
    server.close(() => {
      console.log("[SYSTEM] HTTP server closed.");
      const mongoose = require("mongoose");
      mongoose.connection.close(false, () => {
        console.log("[SYSTEM] MongoDB connection closed.");
        process.exit(0);
      });
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

module.exports = app;
