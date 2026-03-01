const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        leadId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            required: true
        },
        title: String,
        type: {
            type: String,
            enum: ["call", "follow_up"]
        },
        priority: {
            type: String,
            enum: ["high", "medium", "low"]
        },
        status: {
            type: String,
            enum: ["pending", "in_progress", "completed", "cancelled"],
            default: "pending"
        },
        dueAt: Date
    },
    { timestamps: true }
);

// ✅ single index definition
taskSchema.index({ leadId: 1 });

module.exports = mongoose.model("Task", taskSchema);