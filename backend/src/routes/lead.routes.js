const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const {
    createLead,
    fetchAllLeads,
    fetchSingleLead,
    updateLead,
    sendEmailToLead
} = require("../controllers/lead.controller");

const { authenticateAdmin } = require("../middlewares/auth.middleware");

// 1. RATE LIMITING (IP BASED)
const leadSubmissionLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 3, // Limit each IP to 3 requests per `window` (here, per hour)
    message: { success: false, message: "Rate limit exceeded. Please try again later." },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// public – lead form submissions
router.post("/", leadSubmissionLimiter, createLead);

// protected – admin only
router.use(authenticateAdmin);

router.get("/", fetchAllLeads);
router.get("/:id", fetchSingleLead);
router.patch("/:id", updateLead); // For status, followUpDate, and AI draft updates
router.post("/:id/send-email", sendEmailToLead);

module.exports = router;
