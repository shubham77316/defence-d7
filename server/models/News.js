const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "News title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      default: "DEFENCE",
      uppercase: true,
      trim: true,
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase(),
    },
    readTime: {
      type: String,
      default: "2 MIN READ",
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt summary is required"],
    },
    content: {
      type: [String],
      required: [true, "Article paragraphs are required"],
    },
    image: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
    views: {
      type: Number,
      default: 0,
    },
    order: {
      type: Number,
      default: 0,
    },
    subcategories: [
      {
        number: { type: String, default: "01" },
        name: { type: String, required: true },
        subtitle: { type: String, default: "" },
        items: [
          {
            name: { type: String, required: true },
            desc: { type: String, default: "" },
            image: { type: String, default: "" },
            specs: { type: String, default: "" },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

newsSchema.index({ order: 1, createdAt: -1 });
newsSchema.index({ slug: 1, status: 1 });

module.exports = mongoose.model("News", newsSchema);
