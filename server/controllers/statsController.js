const Enquiry = require("../models/Enquiry");
const Product = require("../models/Product");
const News = require("../models/News");
const Partner = require("../models/Partner");
const Media = require("../models/Media");

// @desc    Get dashboard metrics & recent updates
// @route   GET /api/stats/dashboard
// @access  Private (Admin)
const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalEnquiries,
      newEnquiries,
      contactedEnquiries,
      resolvedEnquiries,
      totalProducts,
      aerospaceProducts,
      defenceProducts,
      totalNews,
      totalPartners,
      totalMedia,
      recentEnquiries,
    ] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: "New" }),
      Enquiry.countDocuments({ status: { $in: ["Contacted", "In Progress"] } }),
      Enquiry.countDocuments({ status: "Resolved" }),
      Product.countDocuments(),
      Product.countDocuments({ sector: "aerospace" }),
      Product.countDocuments({ sector: "defence" }),
      News.countDocuments(),
      Partner.countDocuments(),
      Media.countDocuments(),
      Enquiry.find().sort({ createdAt: -1 }).limit(5),
    ]);

    res.status(200).json({
      success: true,
      data: {
        enquiries: {
          total: totalEnquiries,
          new: newEnquiries,
          inProgress: contactedEnquiries,
          resolved: resolvedEnquiries,
        },
        products: {
          total: totalProducts,
          aerospace: aerospaceProducts,
          defence: defenceProducts,
        },
        news: {
          total: totalNews,
        },
        partners: {
          total: totalPartners,
        },
        media: {
          total: totalMedia,
        },
        recentEnquiries,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardStats };
