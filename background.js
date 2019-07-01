console.log('background scripts');

chrome.webRequest.onCompleted.addListener(
        function(details) {
          if(details.method == "GET"){
            console.log(details);
            chrome.tabs.query({
                active: true
              }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"});
                console.log(tabs);
            });

          }
        },
        {
          urls: ["<all_urls>"],
          types: ["xmlhttprequest"]
        }
);
