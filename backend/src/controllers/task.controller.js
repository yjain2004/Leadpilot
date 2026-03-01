const Lead = require("../models/lead.model.js");
const Activity = require("../models/activity.model.js");
const Task = require("../models/task.model.js");

const fetchAllTasks = async (req, res) => {
    try {
        const { status = "pending" } = req.query;

        const query = { status };

        // employees only see tasks for their leads
        if (req.admin && req.admin.role === "EMPLOYEE") {
            const leadIds = await Lead.find({ assignedTo: req.admin._id }).select("_id");
            query.leadId = { $in: leadIds.map(l => l._id) };
        }

        const tasks = await Task.find(query)
            .sort({ dueAt: 1 });

        return res.status(200).json({
            success: true,
            data: tasks
        });
    } catch (error) {
        console.error("Fetch all tasks error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch tasks"
        });
    }
};

async function fetchSingleTask(req, res) {
    try {
        const task = await Task.findOne({
            _id: req.params.id
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        if (req.admin && req.admin.role === "EMPLOYEE") {
            const lead = await Lead.findById(task.leadId);
            if (!lead || !lead.assignedTo || !lead.assignedTo.equals(req.admin._id)) {
                return res.status(403).json({
                    success: false,
                    message: "You are not allowed to view this task"
                });
            }
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        console.error("Fetch single task error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch task"
        });
    }
}

async function updateTask(req, res) {
    try {
        const { status } = req.body || {};

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required"
            });
        }

        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        if (req.admin && req.admin.role === "EMPLOYEE") {
            const lead = await Lead.findById(task.leadId);
            if (!lead || !lead.assignedTo || !lead.assignedTo.equals(req.admin._id)) {
                return res.status(403).json({
                    success: false,
                    message: "You are not allowed to update this task"
                });
            }
        }

        task.status = status;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated"
        });
    } catch (error) {
        console.error("Update task error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update task"
        });
    }
}

module.exports = {
    fetchAllTasks,
    fetchSingleTask,
    updateTask
};
