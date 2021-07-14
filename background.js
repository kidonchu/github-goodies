chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.status === 'complete' && tab.url.includes('/pulls')) {
        chrome.tabs.sendMessage(tabId, 'pull requests loaded');
    }
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // without this dummy listener, you get an error
        // `Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.`
        console.log('listening from background');
    }
);
