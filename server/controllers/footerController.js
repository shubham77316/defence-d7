const Footer = require("../models/Footer");

// @desc    Get footer content and links
// @route   GET /api/footer
// @access  Public
const getFooter = async (req, res, next) => {
  try {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = await Footer.create({});
    }
    res.status(200).json({ success: true, data: footer });
  } catch (error) {
    next(error);
  }
};

// @desc    Update footer content and links
// @route   PUT /api/footer
// @access  Private (Admin)
const updateFooter = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const updated = await Footer.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      message: "Footer updated successfully.",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFooter, updateFooter };
