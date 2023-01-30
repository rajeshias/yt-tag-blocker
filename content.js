//check for message from background.js and get all links in the tab


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "NEW") {
        const links = document.querySelectorAll('#thumbnail');
        let urls = [];
        links.forEach(link => {
            urls.push(link.href);
        });
        console.log(urls)
        // sendResponse({ urls: urls });
    }
}
);      