const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { requirePermission } = require("../middleware/permissions");

const { updateSettings } = require("../controllers/settingsController");
const {
  createNavigationItem,
  updateNavigationItem,
  deleteNavigationItem,
  reorderNavigation,
} = require("../controllers/navigationController");
const { updateFooter } = require("../controllers/footerController");
const { updateHomepage } = require("../controllers/homepageController");
const { updateAbout } = require("../controllers/aboutController");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
  reorderNews,
} = require("../controllers/newsController");
const {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
} = require("../controllers/partnerController");
const {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} = require("../controllers/faqController");
const {
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
  exportEnquiriesCsv,
} = require("../controllers/enquiryController");
const { getDashboardStats } = require("../controllers/statsController");

// Mount Admin User Management & Audit Routes (Internal protection handled inside adminUserRoutes)
const adminUserRoutes = require("./adminUserRoutes");
router.use("/", adminUserRoutes);

// Apply protect middleware to ALL admin routes
router.use(protect);

// Dashboard metrics
router.get("/stats/dashboard", requirePermission("dashboard"), getDashboardStats);

// Settings
router.put("/settings", requirePermission("settings"), updateSettings);

// Navigation
router.post("/navigation", requirePermission("navigation"), createNavigationItem);
router.put("/navigation/reorder", requirePermission("navigation"), reorderNavigation);
router.put("/navigation/:id", requirePermission("navigation"), updateNavigationItem);
router.delete("/navigation/:id", requirePermission("navigation"), deleteNavigationItem);

// Footer
router.put("/footer", requirePermission("footer"), updateFooter);

// Homepage
router.put("/homepage", requirePermission("homepage"), updateHomepage);

// About
router.put("/about", requirePermission("about"), updateAbout);

// Products
router.get("/products", requirePermission("products"), getProducts);
router.post("/products", requirePermission("products"), createProduct);
router.put("/products/:id", requirePermission("products"), updateProduct);
router.delete("/products/:id", requirePermission("products"), deleteProduct);

// News
router.get("/news", requirePermission("news"), getAllNews);
router.put("/news/reorder", requirePermission("news"), reorderNews);
router.post("/news", requirePermission("news"), createNews);
router.put("/news/:id", requirePermission("news"), updateNews);
router.delete("/news/:id", requirePermission("news"), deleteNews);

// Partners
router.get("/partners", requirePermission("partners"), getPartners);
router.post("/partners", requirePermission("partners"), createPartner);
router.put("/partners/:id", requirePermission("partners"), updatePartner);
router.delete("/partners/:id", requirePermission("partners"), deletePartner);

// FAQs
router.get("/faqs", requirePermission("faqs"), getFaqs);
router.post("/faqs", requirePermission("faqs"), createFaq);
router.put("/faqs/:id", requirePermission("faqs"), updateFaq);
router.delete("/faqs/:id", requirePermission("faqs"), deleteFaq);

// Enquiries
router.get("/enquiries/export/csv", requirePermission("enquiries"), exportEnquiriesCsv);
router.get("/enquiries", requirePermission("enquiries"), getEnquiries);
router.get("/enquiries/:id", requirePermission("enquiries"), getEnquiryById);
router.put("/enquiries/:id", requirePermission("enquiries"), updateEnquiryStatus);
router.delete("/enquiries/:id", requirePermission("enquiries"), deleteEnquiry);

module.exports = router;
