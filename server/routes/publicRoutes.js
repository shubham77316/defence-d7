const express = require("express");
const router = express.Router();

const { getSettings } = require("../controllers/settingsController");
const { getNavigation } = require("../controllers/navigationController");
const { getFooter } = require("../controllers/footerController");
const { getHomepage } = require("../controllers/homepageController");
const { getAbout } = require("../controllers/aboutController");
const { getProducts, getProductBySlug } = require("../controllers/productController");
const { getAllNews, getNewsBySlug } = require("../controllers/newsController");
const { getPartners } = require("../controllers/partnerController");
const { getFaqs } = require("../controllers/faqController");
const { submitEnquiry } = require("../controllers/enquiryController");

// Public content endpoints
router.get("/settings", getSettings);
router.get("/navigation", getNavigation);
router.get("/footer", getFooter);
router.get("/homepage", getHomepage);
router.get("/about", getAbout);
router.get("/products", getProducts);
router.get("/products/:slugOrId", getProductBySlug);
router.get("/news", getAllNews);
router.get("/news/:slugOrId", getNewsBySlug);
router.get("/partners", getPartners);
router.get("/faqs", getFaqs);

// Public form submissions
router.post("/contact", submitEnquiry);
router.post("/enquiries", submitEnquiry);
router.post("/inquiry", submitEnquiry);

module.exports = router;
