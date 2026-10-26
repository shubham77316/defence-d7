const Navigation = require("../models/Navigation");

// @desc    Get all navigation items
// @route   GET /api/navigation
// @access  Public
const getNavigation = async (req, res, next) => {
  try {
    const isPublic = !req.user;
    const filter = isPublic ? { isVisible: true } : {};
    const items = await Navigation.find(filter).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new navigation item
// @route   POST /api/navigation
// @access  Private (Admin)
const createNavigationItem = async (req, res, next) => {
  try {
    const item = await Navigation.create(req.body);
    res.status(201).json({
      success: true,
      message: "Navigation item created.",
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update navigation item
// @route   PUT /api/navigation/:id
// @access  Private (Admin)
const updateNavigationItem = async (req, res, next) => {
  try {
    const item = await Navigation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ success: false, message: "Navigation item not found." });
    }
    res.status(200).json({
      success: true,
      message: "Navigation item updated.",
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete navigation item
// @route   DELETE /api/navigation/:id
// @access  Private (Admin)
const deleteNavigationItem = async (req, res, next) => {
  try {
    const item = await Navigation.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Navigation item not found." });
    }
    res.status(200).json({ success: true, message: "Navigation item removed." });
  } catch (error) {
    next(error);
  }
};

// @desc    Reorder navigation items
// @route   PUT /api/navigation/reorder
// @access  Private (Admin)
const reorderNavigation = async (req, res, next) => {
  try {
    const { items } = req.body; // array of { id, order }
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: "Items array is required." });
    }

    const updates = items.map((el) =>
      Navigation.findByIdAndUpdate(el.id, { order: el.order })
    );
    await Promise.all(updates);

    const updatedList = await Navigation.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: updatedList });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNavigation,
  createNavigationItem,
  updateNavigationItem,
  deleteNavigationItem,
  reorderNavigation,
};
