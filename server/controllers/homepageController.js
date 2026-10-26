const Homepage = require("../models/Homepage");

// @desc    Get homepage configuration
// @route   GET /api/homepage
// @access  Public
const getHomepage = async (req, res, next) => {
  try {
    let homepage = await Homepage.findOne();
    if (!homepage) {
      homepage = await Homepage.create({});
    }
    res.status(200).json({ success: true, data: homepage });
  } catch (error) {
    next(error);
  }
};

// @desc    Update homepage configuration
// @route   PUT /api/homepage
// @access  Private (Admin)
const updateHomepage = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const updated = await Homepage.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      message: "Homepage content updated successfully.",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getHomepage, updateHomepage };
