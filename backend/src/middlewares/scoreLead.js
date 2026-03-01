// middlewares/scoreLead.js

function scoreLead(req, res, next) {
    // Only score NEW leads here
    if (req.existingLead) {
        return next();
    }

    let total = 0;

    const breakdown = {
        lookingFor: 0,
        propertyType: 0,
        budget: 0,
        timeline: 0
    };

    // Looking for (buy > rent)
    if (req.leadInput.lookingFor === "buy") {
        breakdown.lookingFor = 10;
        total += 10;
    }

    // Property type
    if (req.leadInput.propertyType) {
        breakdown.propertyType = 10;
        total += 10;
    }

    // Budget
    if (req.leadInput.budget) {
        breakdown.budget = 20;
        total += 20;
    }

    // Timeline urgency
    if (req.leadInput.timeline) {
        if (req.leadInput.timeline === "immediate") {
            breakdown.timeline = 30;
            total += 30;
        } else {
            breakdown.timeline = 15;
            total += 15;
        }
    }

    req.newScore = {
        total,
        breakdown
    };

    req.newHeat =
        total >= 60 ? "hot" :
            total >= 30 ? "warm" :
                "cold";



    next();
}

module.exports = scoreLead;