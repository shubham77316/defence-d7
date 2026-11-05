const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: "Sky Wardens",
    },
    companyName: {
      type: String,
      default: "Sky Wardens Alliance Private Limited",
    },
    tagline: {
      type: String,
      default: "Engineering Strategic Capability For The Next Era",
    },
    subTagline: {
      type: String,
      default: "Aerospace / Defence / Advanced Systems / Petrochemical",
    },
    foundingVision: {
      type: String,
      default: "Sky Wardens was established to develop durable industrial capability, engineering systems and strategic technologies designed for long-term impact.",
    },
    corporateOffice: {
      type: String,
      default: "Sky Wardens Strategic Engineering Centre, Defence & Aerospace Tech Corridor, India",
    },
    contactEmail: {
      type: String,
      default: "liaison@skywardens.com",
    },
    inquiriesEmail: {
      type: String,
      default: "contact@skywardens.in",
    },
    phone: {
      type: String,
      default: "+91 (0) 11 4988 2000",
    },
    workingHours: {
      type: String,
      default: "0900 – 1800 IST (Mon – Fri)",
    },
    clearanceNotice: {
      type: String,
      default: "Institutional and government procurement inquiries are routed through secure, verified liaison protocols.",
    },
    logoUrl: {
      type: String,
      default: "/images/skywardens-logo.png",
    },
    faviconUrl: {
      type: String,
      default: "/favicon.ico",
    },
    socialLinks: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
        icon: { type: String },
      },
    ],
    seoDefaults: {
      metaTitle: {
        type: String,
        default: "Sky Wardens — Sovereign Aerospace & Defence Engineering Group",
      },
      metaDescription: {
        type: String,
        default: "Sky Wardens architects and manufactures sovereign aerospace platforms, kinetic tactical survivability systems, and specialized industrial petrochemical formulations.",
      },
      keywords: {
        type: [String],
        default: ["Sky Wardens", "Defence Engineering", "Aerospace Systems", "UAV Platforms", "Sovereign Capability"],
      },
    },
    copyrightText: {
      type: String,
      default: "SKY WARDENS ALLIANCE PVT. LTD.",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
