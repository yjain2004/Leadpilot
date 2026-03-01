const express = require("express");
const router = express.Router();

const {
    login,
    me,
    logout
} = require("../../controllers/admin/auth.controller");
const { authenticateAdmin } = require("../../middlewares/auth.middleware");

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authenticateAdmin, me);

module.exports = router;
