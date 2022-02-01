console.log("content-script.js loaded");

const openLink = () => {

    let selection = document.getSelection();
    let ele = selection.baseNode.parentElement;
    console.log(ele);

    if(ele){
        if(ele.href){
            let url1 = ele.href;
            //page htmlに依存する処理。
            let url2 = url1.replace("action=kyujinhyoBtn","action=dispDetailBtn");
            window.open(url2, '_blank');
        }
    }

    console.log(selection);
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log("content-script received message");
    
      if (request.message === "open-link"){
        openLink();
        sendResponse({farewell: "goodbye"});    
      }
    }
  );