const Product = require("../models/Product");

// Helper to generate slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

// @desc    Get all products (with optional filter by sector, category, status)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const { sector, category, status, search } = req.query;
    const filter = {};

    // For public website, only show active products unless requested by admin
    if (!req.user && !status) {
      filter.status = "active";
    } else if (status && status !== "all" && status !== "undefined" && status !== "null") {
      filter.status = status;
    }

    if (sector && sector !== "all" && sector !== "undefined" && sector !== "null") {
      const parts = sector
        .split(",")
        .map((s) => s.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .filter(Boolean);
      if (parts.length > 1) {
        filter.sector = { $in: parts.map((p) => new RegExp(`^${p}$`, "i")) };
      } else if (parts.length === 1) {
        filter.sector = new RegExp(`^${parts[0]}$`, "i");
      }
    }

    if (category && category !== "all" && category !== "undefined" && category !== "null") {
      filter.category = new RegExp(category, "i");
    }

    if (search && search.trim() && search !== "undefined" && search !== "null") {
      filter.$or = [
        { name: new RegExp(search.trim(), "i") },
        { desc: new RegExp(search.trim(), "i") },
        { category: new RegExp(search.trim(), "i") },
      ];
    }

    const products = await Product.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by slug or id
// @route   GET /api/products/:slugOrId
// @access  Public
const getProductBySlug = async (req, res, next) => {
  try {
    const { slugOrId } = req.params;
    const query = slugOrId.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: slugOrId }
      : { slug: slugOrId };

    const product = await Product.findOne(query);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin)
const createProduct = async (req, res, next) => {
  try {
    let { name, slug, sector, category, categoryNumber, categorySubtitle, desc, image, specs, applications, highlights, status, order } = req.body;

    if (!slug && name) {
      slug = slugify(name);
    }

    // Ensure unique slug
    let existingSlug = await Product.findOne({ slug });
    if (existingSlug) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const product = await Product.create({
      name,
      slug,
      sector: sector || "defence",
      category,
      categoryNumber: categoryNumber || "01",
      categorySubtitle: categorySubtitle || "",
      desc,
      image: image || "/images/placeholder.jpg",
      specs: specs || [],
      applications: applications || [],
      highlights: highlights || [],
      status: status || "active",
      order: order || 0,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin)
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }
    res.status(200).json({ success: true, message: "Product removed successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
};
