const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
    {
        leadId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            required: true,
            index: true
        },

        actor: {
            type: String,
            enum: ["SYSTEM", "ADMIN", "USER"],
        },

        actorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            default: null
        },

        type: {
            type: String,
            enum: [
                "LEAD_CREATED",
                "LEAD_STATUS_CHANGED",
                "LEAD_HEAT_CHANGED",
                "TASK_CREATED",
                "TASK_STATUS_CHANGED",
                "DUPLICATE_SUBMISSION"
            ],
            required: true
        },

        changes: {
            from: mongoose.Schema.Types.Mixed,
            to: mongoose.Schema.Types.Mixed
        },

        metadata: mongoose.Schema.Types.Mixed
    },
    { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);