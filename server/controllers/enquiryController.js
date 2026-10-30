const Enquiry = require("../models/Enquiry");

// @desc    Submit website contact enquiry
// @route   POST /api/contact OR /api/enquiries
// @access  Public
const submitEnquiry = async (req, res, next) => {
  try {
    const {
      fullName,
      firstName,
      company,
      email,
      phone,
      contactNo,
      country,
      city,
      areaOfInterest,
      enquiryType,
      message,
    } = req.body;

    const resolvedName = fullName || firstName || "";
    const resolvedCompany = company || "Individual / Direct Liaison";
    const resolvedPhone = phone || contactNo || "N/A";
    const resolvedInterest = areaOfInterest || enquiryType || "General Inquiry";

    // Validations
    if (!resolvedName || resolvedName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Valid full name is required (minimum 2 characters).",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "A valid corporate or institutional email address is required.",
      });
    }

    if (!message || message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Inquiry message must contain at least 5 characters.",
      });
    }

    // Generate unique Sovereign reference ID: ANV-XXXX-XXXX
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomHex = Math.floor(Math.random() * 0xffff)
      .toString(16)
      .toUpperCase();
    const referenceId = `ANV-${timestamp}-${randomHex}`;

    // Get client IP address
    const ipAddress =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";

    const enquiry = await Enquiry.create({
      referenceId,
      fullName: resolvedName.trim(),
      company: resolvedCompany.trim(),
      email: email.trim().toLowerCase(),
      phone: resolvedPhone.trim(),
      country: country ? country.trim() : "India",
      city: city ? city.trim() : "",
      areaOfInterest: resolvedInterest.trim(),
      message: message.trim(),
      ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
      status: "New",
      priority: "Normal",
    });

    console.log(`[ENQUIRY RECEIVED] Reference: ${referenceId} from ${enquiry.email}`);

    res.status(201).json({
      success: true,
      referenceId,
      message: "Transmission received and logged into sovereign liaison desk.",
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all enquiries with search, filter, and pagination
// @route   GET /api/enquiries
// @access  Private (Admin)
const getEnquiries = async (req, res, next) => {
  try {
    const { status, priority, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (priority && priority !== "all") {
      query.priority = priority;
    }

    if (search) {
      query.$or = [
        { fullName: new RegExp(search, "i") },
        { company: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
        { referenceId: new RegExp(search, "i") },
        { country: new RegExp(search, "i") },
        { areaOfInterest: new RegExp(search, "i") },
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Enquiry.countDocuments(query);
    const enquiries = await Enquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: enquiries.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single enquiry by ID
// @route   GET /api/enquiries/:id
// @access  Private (Admin)
const getEnquiryById = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found." });
    }
    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Update enquiry status, priority, or add internal note
// @route   PUT /api/enquiries/:id
// @access  Private (Admin)
const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status, priority, note } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found." });
    }

    if (status) enquiry.status = status;
    if (priority) enquiry.priority = priority;

    if (note && note.trim()) {
      enquiry.notes.push({
        author: req.user?.fullName || "Admin",
        text: note.trim(),
        createdAt: new Date(),
      });
    }

    const updated = await enquiry.save();

    res.status(200).json({
      success: true,
      message: "Enquiry updated successfully.",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Admin)
const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found." });
    }
    res.status(200).json({ success: true, message: "Enquiry record deleted." });
  } catch (error) {
    next(error);
  }
};

// @desc    Export enquiries as CSV
// @route   GET /api/enquiries/export/csv
// @access  Private (Admin)
const exportEnquiriesCsv = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    const headers = [
      "Reference ID",
      "Full Name",
      "Company",
      "Email",
      "Phone",
      "Country",
      "City",
      "Area of Interest",
      "Status",
      "Priority",
      "Created At",
      "Message",
    ];

    const rows = enquiries.map((item) => [
      item.referenceId,
      `"${(item.fullName || "").replace(/"/g, '""')}"`,
      `"${(item.company || "").replace(/"/g, '""')}"`,
      item.email,
      item.phone,
      `"${(item.country || "").replace(/"/g, '""')}"`,
      `"${(item.city || "").replace(/"/g, '""')}"`,
      `"${(item.areaOfInterest || "").replace(/"/g, '""')}"`,
      item.status,
      item.priority,
      new Date(item.createdAt).toISOString(),
      `"${(item.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="skywardens_enquiries_${Date.now()}.csv"`
    );
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
  exportEnquiriesCsv,
};
