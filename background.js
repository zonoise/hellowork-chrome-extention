
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
  chrome.contextMenus.create({
    id: "job-detail-menu",
    title: "情報表示",
    contexts: ["page"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "job-detail-menu") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["script/job-detail.js"],
    });
  }
});
