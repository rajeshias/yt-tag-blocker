async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // console.log("this tab is updated with the new tabID: " + tabId + " and the changeInfo: " + JSON.stringify(changeInfo) + " and the tab: " + JSON.stringify(tab))
    if (tab.url && tab.url.includes("youtube.com") && changeInfo.status === "complete") {
        chrome.tabs.sendMessage(
            tabId,
            { type: "NEW" }
        )
        console.log(tabId,
            { type: "NEW" })

    }
    if (changeInfo.url && tab.url.includes("youtube.com")) {
        chrome.tabs.sendMessage(tabId, { type: "URL_CHANGED", url: changeInfo.url });
        console.log(tabId, { type: "URL_CHANGED", url: changeInfo.url });
    }
});
