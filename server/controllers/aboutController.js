const About = require("../models/About");

// @desc    Get about page data
// @route   GET /api/about
// @access  Public
const getAbout = async (req, res, next) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }
    res.status(200).json({ success: true, data: about });
  } catch (error) {
    next(error);
  }
};

// @desc    Update about page data
// @route   PUT /api/about
// @access  Private (Admin)
const updateAbout = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const updated = await About.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      message: "About page content updated.",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAbout, updateAbout };
