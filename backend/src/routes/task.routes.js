const express = require("express");
const router = express.Router();

//importing controller
const { fetchAllTasks, fetchSingleTask, updateTask } = require("../controllers/task.controller");

const { authenticateAdmin } = require("../middlewares/auth.middleware");

router.use(authenticateAdmin);

router.get("/", fetchAllTasks);
router.get("/:id", fetchSingleTask);
router.patch("/:id", updateTask);

module.exports = router;
