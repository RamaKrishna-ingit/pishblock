console.log("Phishing Blocker is running...");

// Show a notification that the extension is running
chrome.notifications.create('', {
    type: 'basic',
    iconUrl: '/global-security.png',  
    title: 'Phishing Blocker Extension',
    message: 'Phishing Blocker extension is active and running!',
    priority: 2
}, function(notificationId) {
    console.log("Notification shown: " + notificationId);
});

// List of known phishing domains
const phishingDomains = [
    "paypal-login.com", "bit.ly", "verify-update.com"
];

// Listen for all web requests
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    // Check if the domain is in the phishing list
    const isPhishing = phishingDomains.some(domain => details.url.includes(domain));

    if (isPhishing) {
        // Show notification for blocked phishing site
        showBlockedNotification(details.url);
        return { cancel: true };  // Block the request
    } else {
        // Show notification for safe site
        showSafeSiteNotification(details.url);
    }
}, { urls: ["<all_urls>"] }); // This listens to **all URLs**

function showBlockedNotification(url) {
    chrome.notifications.create('', {
        type: 'basic',
        iconUrl: '/alarm.png',  // Same icon as before
        title: 'Phishing Blocked!',
        message: `The site ${url} has been blocked because it is a phishing site.`,
        priority: 2
    }, function(notificationId) {
        console.log("Blocked site notification shown: " + notificationId);
    });
}

// Function to show a notification when a safe site is visited
function showSafeSiteNotification(url) {
    chrome.notifications.create('', {
        type: 'basic',
        iconUrl: '/shield.png',  // Same icon as before
        title: 'Safe Site!',
        message: `You're visiting a safe site: ${url}`,
        priority: 2
    }, function(notificationId) {
        console.log("Safe site notification shown: " + notificationId);
    });
}

// Function to update blocking rules (future updates)
function updateRules(newRules) {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: newRules.map(rule => rule.id),
        addRules: newRules
    });

    console.log("Rules updated:", newRules);
}
