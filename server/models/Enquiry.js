const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Organization/Company is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: "N/A",
      trim: true,
    },
    country: {
      type: String,
      default: "India",
      trim: true,
    },
    city: {
      type: String,
      default: "",
      trim: true,
    },
    areaOfInterest: {
      type: String,
      default: "General Inquiry",
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Resolved", "Archived"],
      default: "New",
    },
    priority: {
      type: String,
      enum: ["Normal", "High", "Urgent"],
      default: "Normal",
    },
    notes: [
      {
        author: { type: String, default: "Admin" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    ipAddress: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

enquirySchema.index({ referenceId: 1, email: 1, status: 1, createdAt: -1 });

module.exports = mongoose.model("Enquiry", enquirySchema);
