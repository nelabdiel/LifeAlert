// background.js
let visitedWebsites = [];

chrome.webNavigation.onCompleted.addListener((details) => {
  const { tabId, url } = details;
  if (!visitedWebsites.includes(url)) {
    chrome.tabs.sendMessage(tabId, { action: "checkLogin" });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "loginDetected") {
    visitedWebsites.push(message.url);
    // Implement your desired alert mechanism here (e.g., notifications, pop-up alert)
    alert(`You are signing in to ${message.url} for the first time.`);
  }
});
