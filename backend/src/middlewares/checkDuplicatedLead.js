

const Lead = require("../models/lead.model")

const checkDuplicateLead = async (req, res, next) => {
    const { email, phone } = req.leadInput;

    const existingLead = await Lead.findOne({
        $or: [
            email ? { "personalInfo.email": email } : null,
            phone ? { "personalInfo.phone": phone } : null
        ].filter(Boolean)
    });

    req.existingLead = existingLead || null;

    next();
};

module.exports = checkDuplicateLead