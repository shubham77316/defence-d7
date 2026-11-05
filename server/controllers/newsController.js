const News = require("../models/News");

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

// @desc    Get all news articles
// @route   GET /api/news
// @access  Public
const getAllNews = async (req, res, next) => {
  try {
    const { status, category, featured, search } = req.query;
    const filter = {};

    if (!req.user && !status) {
      filter.status = "published";
    } else if (status && status !== "all" && status !== "undefined" && status !== "null") {
      filter.status = status;
    }

    if (category && category !== "all" && category !== "undefined" && category !== "null") {
      filter.category = new RegExp(category, "i");
    }

    if (featured === "true") {
      filter.featured = true;
    }

    if (search && search.trim() && search !== "undefined" && search !== "null") {
      filter.$or = [
        { title: new RegExp(search.trim(), "i") },
        { excerpt: new RegExp(search.trim(), "i") },
        { category: new RegExp(search.trim(), "i") },
      ];
    }

    const news = await News.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: news.length, data: news });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single news article by slug or id
// @route   GET /api/news/:slugOrId
// @access  Public
const getNewsBySlug = async (req, res, next) => {
  try {
    const { slugOrId } = req.params;
    const query = slugOrId.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: slugOrId }
      : { slug: new RegExp(`^${slugOrId}$`, "i") };

    const article = await News.findOne(query);
    if (!article) {
      return res.status(404).json({ success: false, message: "Article not found." });
    }

    // Increment view count
    article.views = (article.views || 0) + 1;
    await article.save();

    res.status(200).json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new news article
// @route   POST /api/news
// @access  Private (Admin)
const createNews = async (req, res, next) => {
  try {
    let { title, slug, category, date, readTime, excerpt, content, image, featured, status } = req.body;

    if (!slug && title) {
      slug = slugify(title);
    }

    let existingSlug = await News.findOne({ slug });
    if (existingSlug) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    // Ensure content is array of paragraphs
    if (typeof content === "string") {
      content = content.split("\n\n").filter(Boolean);
    }

    const article = await News.create({
      title,
      slug,
      category: category || "DEFENCE",
      date: date || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase(),
      readTime: readTime || "2 MIN READ",
      excerpt,
      content: content || [],
      image: image && typeof image === "string" ? image.trim() : "",
      featured: featured === true || featured === "true",
      status: status || "published",
    });

    res.status(201).json({
      success: true,
      message: "News article published successfully.",
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update news article
// @route   PUT /api/news/:id
// @access  Private (Admin)
const updateNews = async (req, res, next) => {
  try {
    if (typeof req.body.content === "string") {
      req.body.content = req.body.content.split("\n\n").filter(Boolean);
    }

    const article = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!article) {
      return res.status(404).json({ success: false, message: "Article not found." });
    }

    res.status(200).json({
      success: true,
      message: "News article updated successfully.",
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete news article
// @route   DELETE /api/news/:id
// @access  Private (Admin)
const deleteNews = async (req, res, next) => {
  try {
    const article = await News.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: "Article not found." });
    }
    res.status(200).json({ success: true, message: "News article removed." });
  } catch (error) {
    next(error);
  }
};

// @desc    Reorder news articles
// @route   PUT /api/admin/news/reorder
// @access  Private (Admin)
const reorderNews = async (req, res, next) => {
  try {
    const { items } = req.body; // array of { id, order }
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: "Items array is required." });
    }

    const updates = items.map((el) =>
      News.findByIdAndUpdate(el.id, { order: el.order })
    );
    await Promise.all(updates);

    const updatedList = await News.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, message: "News order updated successfully.", data: updatedList });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllNews,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews,
  reorderNews,
};
