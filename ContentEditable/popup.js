var checkbox = document.querySelector("#state");
checkbox.addEventListener('change', function() {
    executes()  
});

window.onload=function(){
    console.log(1)
    getCurrentTab().then(function(params) {
        chrome.scripting.executeScript(
            {
                target: { tabId: params.id },
                function: () => {
                    let state = document.body.contentEditable;
                    console.log(state);
                    return state;
                }
            },
            function(res) {
                console.log(res[0].result)
                if(res[0].result=='true'){
                    console.log(2)
                    document.querySelector("#state").checked=true
                    
                }
            }
        );
        

    });
    
};
function executes(){
    getCurrentTab().then(function(params) {
        console.log(params.id);
        if(document.getElementById("state").checked){
            
            chrome.scripting.executeScript(
                {
                    target: { tabId: params.id },
                    function: () => {
                        document.body.contentEditable=true
                        sessionStorage.setItem('state','true')
                    }
                },
                (res) => {}
            );
        }else{
            
            chrome.scripting.executeScript(
                {
                    target: { tabId: params.id },
                    function: () => {
                        document.body.contentEditable=false
                        sessionStorage.setItem('state','false')
                    }
                },
                (res) => {}
            );

        }

    });
}
async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab.id)
    return tab
  }
  
