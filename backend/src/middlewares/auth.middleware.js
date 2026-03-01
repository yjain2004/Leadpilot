const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");

async function authenticateAdmin(req, res, next) {
    try {
        const bearerToken = req.headers.authorization;
        let token = null;

        if (bearerToken && bearerToken.startsWith("Bearer ")) {
            token = bearerToken.split(" ")[1];
        } else if (req.cookies && req.cookies.admin_token) {
            token = req.cookies.admin_token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findById(decoded.id);

        if (!admin || !admin.isActive) {
            return res.status(401).json({
                success: false,
                message: "Admin not found or inactive"
            });
        }

        req.admin = admin;
        next();
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

module.exports = {
    authenticateAdmin
};
