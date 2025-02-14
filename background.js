console.log("Phishing Blocker is running...");

// Function to update blocking rules (future updates)
function updateRules(newRules) {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: newRules.map(rule => rule.id),
        addRules: newRules
    });
}
