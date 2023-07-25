// content_script.js
function checkLoginForm() {
  const loginForm = document.querySelector("form[action*='login']");
  const loginButton = document.querySelector("button[type='submit'][value*='login']");

  if (loginForm || loginButton) {
    chrome.runtime.sendMessage({ action: "loginDetected", url: window.location.href });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkLoginForm();
});

document.addEventListener("submit", () => {
  checkLoginForm();
});

document.addEventListener("click", () => {
  checkLoginForm();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "checkLogin") {
    checkLoginForm();
  }
});
