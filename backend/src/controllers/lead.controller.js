const Lead = require("../models/lead.model.js");
const { analyzeLead } = require("../services/aiService");
const { sendEmail } = require("../services/emailService");

exports.createLead = async (req, res) => {
    try {
        const { name, email, phone, message, source, lookingFor, propertyType, location, budget, timeline } = req.body;

        // Construct an enriched message from all form fields
        let enrichedMessage = [];
        if (lookingFor) enrichedMessage.push(`Looking For: ${lookingFor}`);
        if (propertyType) enrichedMessage.push(`Property Type: ${propertyType}`);
        if (location) enrichedMessage.push(`Location: ${location}`);
        if (budget) enrichedMessage.push(`Budget: ${budget}`);
        if (timeline) enrichedMessage.push(`Timeline: ${timeline}`);
        if (message) enrichedMessage.push(`Additional Requirements: ${message}`);

        const finalMessage = enrichedMessage.length > 0 ? enrichedMessage.join(" | ") : "No details provided.";

        // 1. Save raw lead in DB
        const lead = await Lead.create({
            name,
            email,
            phone,
            message: finalMessage,
            source,
            status: "new",
            activityLog: [{ action: "Lead submitted" }]
        });

        // Return quickly, and process AI in background
        res.status(201).json({ success: true, leadId: lead._id, message: "Lead saved." });

        // 3. Process AI logic asynchronously (Caches if already processed)
        if (lead.aiSummary) {
            console.log("AI already processed for this lead. Skipping.");
            return;
        }

        try {
            const aiResults = await analyzeLead(finalMessage || "No message provided.");

            lead.heat = aiResults.heat;
            lead.intent = aiResults.intent;
            lead.aiSummary = aiResults.summary;
            lead.aiReplyDraft = aiResults.replyDraft;
            lead.activityLog.push({ action: "AI analysis completed" });

            await lead.save();
        } catch (aiError) {
            console.error("AI processing failed for lead:", lead._id, aiError);
            lead.activityLog.push({ action: "AI analysis failed" });
            await lead.save();
        }

    } catch (error) {
        console.error("Create lead error:", error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: "Failed to create lead" });
        }
    }
};

exports.fetchAllLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: leads });
    } catch (error) {
        console.error("Fetch all leads error:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch leads" });
    }
};

exports.fetchSingleLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });

        return res.status(200).json({ success: true, data: lead });
    } catch (error) {
        console.error("Fetch single lead error:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch lead" });
    }
};

exports.updateLead = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; // status, followUpDate, aiReplyDraft, etc.

        const lead = await Lead.findById(id);
        if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });

        if (updates.status && updates.status !== lead.status) {
            lead.activityLog.push({ action: `Status changed from ${lead.status} to ${updates.status}` });
        }

        if (updates.followUpDate) {
            lead.activityLog.push({ action: "Follow-up date set" });
            updates.status = "follow_up"; // as per rules: When follow-up date set -> status = follow_up
        }

        // Apply updates
        Object.keys(updates).forEach(key => {
            lead[key] = updates[key];
        });

        await lead.save();

        return res.status(200).json({ success: true, data: lead });
    } catch (error) {
        console.error("Update lead error:", error);
        res.status(500).json({ success: false, message: "Failed to update lead" });
    }
};

exports.sendEmailToLead = async (req, res) => {
    try {
        const { id } = req.params;
        const { emailContent } = req.body;

        const lead = await Lead.findById(id);
        if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });
        if (!lead.email) return res.status(400).json({ success: false, message: "Lead has no email" });

        await sendEmail(lead.email, "Response to your inquiry", emailContent);

        // 3. Log activity
        lead.activityLog.push({ action: `Email sent to ${lead.email}` });
        // 4. Update status = contacted
        lead.status = "contacted";
        // 5. Save updated lead
        await lead.save();

        return res.status(200).json({ success: true, message: "Email sent successfully", data: lead });
    } catch (error) {
        console.error("Send email error:", error);
        return res.status(500).json({ success: false, message: "Failed to send email" });
    }
};
