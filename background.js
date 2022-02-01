//コンテキストメニュー登録
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");

  chrome.contextMenus.create({
    id: "job-detail-menu",
    title: "情報表示",
    contexts: ["page"],
  });

  chrome.contextMenus.create({
    id: "job-open-link-menu",
    title: "リンク先情報表示",
    contexts: ["link", "selection"],
  });
});

//コンテキストメニュー押下時の処理登録
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "job-detail-menu") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["script/job-detail.js"],
    });
  }

  if (info.menuItemId === "job-open-link-menu") {
    console.log(info);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      //content_scriptへメッセージを送る
      chrome.tabs.sendMessage(
        tabs[0].id,
        { message: "open-link" },
        function (response) {
          console.log("background response receive");
          console.log(response);
        }
      );
    });
  }
});
