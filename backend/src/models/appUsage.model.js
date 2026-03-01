const mongoose = require("mongoose");

const appUsageSchema = new mongoose.Schema({
    date: {
        type: String, // YYYY-MM-DD
        required: true,
        unique: true
    },
    aiCallsCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("AppUsage", appUsageSchema);
