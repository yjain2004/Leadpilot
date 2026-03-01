function buildTaskFromHeat(leadId, heat) {
    const now = Date.now();

    if (heat === "hot") {
        return {
            leadId,
            title: "Call lead immediately",
            type: "call",
            priority: "high",
            dueAt: new Date(now + 15 * 60 * 1000)
        };
    }

    if (heat === "warm") {
        return {
            leadId,
            title: "Follow up with lead",
            type: "follow_up",
            priority: "medium",
            dueAt: new Date(now + 24 * 60 * 60 * 1000)
        };
    }

    return {
        leadId,
        title: "Follow up later",
        type: "follow_up",
        priority: "low",
        dueAt: new Date(now + 3 * 24 * 60 * 60 * 1000)
    };
}

module.exports = buildTaskFromHeat;