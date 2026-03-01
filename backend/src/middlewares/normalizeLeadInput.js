// middlewares/normalizeLeadInput.js

function normalizeArea(area) {
    if (!area) return null;

    return area
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function normalizeLeadInput(req, res, next) {
    const {
        fullName,
        email,
        phone,
        lookingFor,
        propertyType,
        budget,
        timeline,
        location,
        additionalRequirements
    } = req.body;

    req.leadInput = {
        // Personal info
        fullName: fullName?.trim() || null,
        email: email ? email.toLowerCase().trim() : null,
        phone: phone?.trim() || null,

        // Property intent (MATCHES FRONTEND KEYS)
        lookingFor: lookingFor || null,
        propertyType: propertyType || null,
        budget: budget || null,
        timeline: timeline || null,

        // Location
        locationRaw: location || null,
        locationNormalized: normalizeArea(location),

        // Source (FORCED FOR MVP)
        source: "landing_page",

        // Extra
        additionalRequirements: additionalRequirements?.trim() || null
    };

    next();
}

module.exports = normalizeLeadInput;