const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    sector: {
      type: String,
      required: [true, "Sector is required"],
      lowercase: true,
      trim: true,
      default: "defence",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    categoryNumber: {
      type: String,
      default: "01",
    },
    categorySubtitle: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
    },
    overview: {
      type: String,
      default: "",
    },
    overviewTitle: {
      type: String,
      default: "",
    },
    information: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "/images/placeholder.jpg",
    },
    specsTitle: {
      type: String,
      default: "",
    },
    specsLayout: {
      type: String,
      default: "",
    },
    featuresTitle: {
      type: String,
      default: "",
    },
    features: {
      type: [String],
      default: [],
    },
    featureSections: {
      type: Array,
      default: [],
    },
    specs: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    applications: {
      type: [String],
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "draft"],
      default: "active",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.index({ sector: 1, category: 1, status: 1 });

module.exports = mongoose.model("Product", productSchema);
