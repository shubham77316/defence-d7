const Faq = require("../models/Faq");

// @desc    Get all FAQs
// @route   GET /api/faqs
// @access  Public
const getFaqs = async (req, res, next) => {
  try {
    const isPublic = !req.user;
    const filter = isPublic ? { isVisible: true } : {};
    const faqs = await Faq.find(filter).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: faqs.length, data: faqs });
  } catch (error) {
    next(error);
  }
};

// @desc    Create FAQ item
// @route   POST /api/faqs
// @access  Private (Admin)
const createFaq = async (req, res, next) => {
  try {
    const faq = await Faq.create(req.body);
    res.status(201).json({
      success: true,
      message: "FAQ item created.",
      data: faq,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update FAQ item
// @route   PUT /api/faqs/:id
// @access  Private (Admin)
const updateFaq = async (req, res, next) => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ item not found." });
    }

    res.status(200).json({
      success: true,
      message: "FAQ item updated.",
      data: faq,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete FAQ item
// @route   DELETE /api/faqs/:id
// @access  Private (Admin)
const deleteFaq = async (req, res, next) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ item not found." });
    }
    res.status(200).json({ success: true, message: "FAQ item removed." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
};
