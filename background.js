chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("youtube.com")) {
        chrome.tabs.sendMessage(
            tabId,
            { type: "NEW" }
        )
        console.log(tabId,
            { type: "NEW" })
    }
});

