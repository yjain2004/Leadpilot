// middlewares/validateLeadInput.js

const validateLeadInput = (req, res, next) => {
    const {
        fullName,
        email,
        phone,
        source
    } = req.body;

    // ---- Basic presence checks ----
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
        return res.status(400).json({
            success: false,
            message: "Full name is required"
        });
    }

    // At least one contact method must exist
    const hasEmail = email && email.trim();
    const hasPhone = phone && phone.trim();

    if (!hasEmail && !hasPhone) {
        return res.status(400).json({
            success: false,
            message: "Either phone number or email is required"
        });
    }

    // ---- Email validation (only if present) ----
    if (hasEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }
    }

    // ---- Phone validation (only if present) ----
    if (hasPhone) {
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Invalid phone number format"
            });
        }
    }

    // ---- Source validation ----
    if (!source || typeof source !== "string" || !source.trim()) {
        return res.status(400).json({
            success: false,
            message: "Lead source is required"
        });
    }

    // ---- Passed validation ----
    next();
};

module.exports = validateLeadInput