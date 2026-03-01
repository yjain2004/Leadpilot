const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { _id: false });

const LeadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            lowercase: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        message: {
            type: String
        },
        source: {
            type: String,
            default: "landing_page"
        },
        heat: {
            type: String,
            enum: ["hot", "warm", "cold"],
            index: true
        },
        intent: {
            type: String
        },
        aiSummary: {
            type: String
        },
        aiReplyDraft: {
            type: String
        },
        status: {
            type: String,
            enum: ["new", "contacted", "follow_up", "converted", "lost"],
            default: "new",
            index: true
        },
        followUpDate: {
            type: Date
        },
        activityLog: [ActivityLogSchema]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Lead", LeadSchema);
