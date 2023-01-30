document.addEventListener('DOMContentLoaded', function () {
    let keywordsTextarea = document.querySelector('#keywords');
    let saveButton = document.querySelector('#save');

    // chrome.storage.sync.get(['keywords'], function (result) {
    //     keywordsTextarea.value = result.keywords.join('\n');
    // });

    // saveButton.addEventListener('click', function () {
    //     let keywords = keywordsTextarea.value.split('\n');
    //     chrome.storage.sync.set({ keywords: keywords });
    //     window.close();
    // });
});
    