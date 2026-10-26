const Partner = require("../models/Partner");

// @desc    Get all partners/affiliations
// @route   GET /api/partners
// @access  Public
const getPartners = async (req, res, next) => {
  try {
    const { category, status } = req.query;
    const filter = {};

    if (!req.user && !status) {
      filter.status = "active";
    } else if (status && status !== "all" && status !== "undefined" && status !== "null") {
      filter.status = status;
    }

    if (category && category !== "all" && category !== "undefined" && category !== "null") {
      filter.category = category;
    }

    const partners = await Partner.find(filter).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: partners.length, data: partners });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new partner
// @route   POST /api/partners
// @access  Private (Admin)
const createPartner = async (req, res, next) => {
  try {
    const partner = await Partner.create(req.body);
    res.status(201).json({
      success: true,
      message: "Strategic partner created successfully.",
      data: partner,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update partner
// @route   PUT /api/partners/:id
// @access  Private (Admin)
const updatePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!partner) {
      return res.status(404).json({ success: false, message: "Partner not found." });
    }

    res.status(200).json({
      success: true,
      message: "Partner updated successfully.",
      data: partner,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete partner
// @route   DELETE /api/partners/:id
// @access  Private (Admin)
const deletePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) {
      return res.status(404).json({ success: false, message: "Partner not found." });
    }
    res.status(200).json({ success: true, message: "Partner removed successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
};
