const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      default: "Raise your sovereign trajectory",
    },
    description: {
      type: String,
      default: "Architecting sovereign aerospace platforms, kinetic tactical survivability systems, and specialized industrial petrochemical formulations.",
    },
    inquiriesEmail: {
      type: String,
      default: "contact@skywardens.in",
    },
    copyrightText: {
      type: String,
      default: "SKY WARDENS ALLIANCE PVT. LTD.",
    },
    navLinks: [
      {
        label: { type: String, required: true },
        href: { type: String, required: true },
        order: { type: Number, default: 0 },
      },
    ],
    focusLinks: [
      {
        label: { type: String, required: true },
        href: { type: String, required: true },
        order: { type: Number, default: 0 },
      },
    ],
    socialLinks: [
      {
        label: { type: String, default: "" },
        href: { type: String, required: true },
        platform: { type: String, required: true },
      },
    ],
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("Footer", footerSchema);
