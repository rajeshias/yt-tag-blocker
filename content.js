
function isHidden(el) {
    var style = window.getComputedStyle(el);
    return ((style.display === 'none') || (style.visibility === 'hidden'))
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.type === "NEW" || request.type === "URL_CHANGED") {

        const links = document.querySelectorAll('#thumbnail');

        let urls = [];
        let promises = [];
        let responseMap = {};
        links.forEach(link => {
            if (link.href !== "" && !link.href.includes("/shorts")) {
                urls.push(link.href);
                promises.push(fetch(link.href));
            }
        });

        Promise.all(promises)
            .then((responses) => {
                urls.forEach((url, index) => {
                    responseMap[url] = responses[index];
                });
                return responseMap;
            })
            .then((responseMap) => {
                Object.keys(responseMap).forEach((url, count) => {
                    responseMap[url].text().then((data) => {
                        const parser = new DOMParser();
                        const htmlDoc = parser.parseFromString(data, 'text/html');
                        const content = htmlDoc.querySelector('meta[name=keywords]').getAttribute("content");
                        // console.log(`Content for URL: ${url} is: ${content}`); 

                        // if content contains any of the blacklisted words, remove the element
                        chrome.storage.local.get(["items"]).then((result) => {
                            console.log("Value currently is " + result.items);
                            JSON.parse(result.items).forEach((item) => {
                                console.log(content, item, content.toLowerCase().includes(item.toLowerCase()), "--count--->", count)
                                if (content.toLowerCase().includes(item.toLowerCase())) {
                                    const element = document.querySelector(`#thumbnail[href*="${url.replace("https://www.youtube.com", "")}"]`);
                                    if (element) {
                                        element.closest("ytd-rich-item-renderer").remove();
                                    }
                                    console.log(`Removed element for URL: ${url}, as it contains blacklisted word: ${item}`);
                                }
                            });
                        });
                        // find the element from dom if any id with "#thumbnail" contains href which includes url without "https://www.youtube.com", and remove the immediate parent ytd-rich-item-renderer element
                        // const element = document.querySelector(`#thumbnail[href*="${url.replace("https://www.youtube.com", "")}"]`);
                        // if (element) {
                        //     element.closest("ytd-rich-item-renderer").remove();
                        // }
                    });
                });
            })
            .catch(function handleError(error) {
                console.log("Error" + error);
            });

    }
}
);
