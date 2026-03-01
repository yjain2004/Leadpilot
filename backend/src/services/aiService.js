const { OpenAI } = require("openai");
const AppUsage = require("../models/appUsage.model");

let openai = null;
if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
}

const DAILY_AI_LIMIT = parseInt(process.env.DAILY_AI_LIMIT) || 5;

const getFallbackResponse = (type = "error") => {
    if (type === "limit_reached") {
        return {
            heat: "unknown",
            intent: "AI disabled (demo limit reached)",
            summary: "AI analysis unavailable in demo mode.",
            replyDraft: "Thank you for your message. Our team will get back to you shortly."
        };
    }
    return {
        heat: "warm",
        intent: "Interested in property details",
        summary: "(Mocked AI) The lead is expressing interest in learning more about available properties.",
        replyDraft: "Hello,\n\nThank you for reaching out! I'd be happy to assist you with your property search. Could you please let me know a preferred time to discuss your requirements in more detail?\n\nBest regards,\nLeadPilot Assistant"
    };
};

async function generateLeadAnalysis(leadMessage) {
    try {
        // 1. Check Global Daily Usage
        const todayStr = new Date().toISOString().split("T")[0];
        let usageRecord = await AppUsage.findOne({ date: todayStr });

        if (!usageRecord) {
            usageRecord = await AppUsage.create({ date: todayStr, aiCallsCount: 0 });
        }

        // 2. Enforce Limit
        if (usageRecord.aiCallsCount >= DAILY_AI_LIMIT) {
            console.warn(`Daily AI limit reached (${DAILY_AI_LIMIT}). Skipping OpenAI call.`);
            return getFallbackResponse("limit_reached");
        }

        // 3. Process with OpenAI
        if (!openai) {
            console.warn("OPENAI_API_KEY is not set. Throwing error for fallback.");
            throw new Error("Missing OpenAI API Key");
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are an AI sales assistant. Analyze the incoming lead message. 
Return ONLY a valid JSON object with EXACTLY these four keys:
- 'heat': string, one of "hot", "warm", "cold" based on urgency and interest.
- 'intent': A short summary of their intent (e.g., "Wants to buy a 3BHK", "Checking pricing").
- 'summary': A 1-2 sentence summary of their message.
- 'replyDraft': A professional, polite draft reply to this lead. Keep it concise.

Make sure it is strict JSON without markdown formatting like \`\`\`json.`
                },
                {
                    role: "user",
                    content: leadMessage || "No message provided."
                }
            ],
            temperature: 0.3
        });

        // 4. Update usage record
        usageRecord.aiCallsCount += 1;
        await usageRecord.save();

        const rawContent = response.choices[0].message.content;

        try {
            const parsed = JSON.parse(rawContent);
            return {
                heat: parsed.heat || "cold",
                intent: parsed.intent || "Unknown intent",
                summary: parsed.summary || "No summary generated",
                replyDraft: parsed.replyDraft || "Thank you for reaching out. We will get back to you soon."
            };
        } catch (jsonErr) {
            console.error("Failed to parse OpenAI response as JSON:", rawContent);
            return getFallbackResponse("error");
        }

    } catch (error) {
        console.error("AI Service Error:", error.message || error);
        return getFallbackResponse("error");
    }
}

// Keeping original export name analyzeLead mapping to generateLeadAnalysis to minimize controller breakage if they are tracking it there
module.exports = {
    analyzeLead: generateLeadAnalysis,
    generateLeadAnalysis
};

