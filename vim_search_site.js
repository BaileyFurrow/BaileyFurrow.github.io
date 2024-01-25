/** Captures the slash (/) key when NOT in a text box and focuses input on
 *  website's search field. In other words, activates search vim-style. */
function vimSiteSearch(searchID) {
    async function waitForElem(selector) {
        let promise = new Promise(resolve => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
            }
            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    observer.disconnect();
                    resolve(document.querySelector(selector));
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
        let elem = await promise; 
        return elem;
    }

    waitForElem(searchID).then(SEARCH => {
        
        document.addEventListener("keyup", captureSlash);
        SEARCH.addEventListener("focus", () => {
            document.removeEventListener("keyup", captureSlash);
        });

        SEARCH.addEventListener("blur", () => {
            document.addEventListener("keyup", captureSlash);
        });

        function captureSlash(event) {
            console.log("key press");
            if (event.key == "/" && document.activeElement.tagName != "INPUT") {
                SEARCH.select();
                SEARCH.focus();
                SEARCH.scrollIntoView();
            }
        }
    });
}
