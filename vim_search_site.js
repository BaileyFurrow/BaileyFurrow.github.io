/** Captures the slash (/) key when NOT in a text box and focuses input on
 *  website's search field. In other words, activates search vim-style. */
function vimSiteSearch(searchID) {
    function waitForElem(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }
            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    observer.disconnect();
                    resolve(document.querySelector(selector));
                }
            });
            observer.observe(document.body, {
                chistList: true,
                subtree: true
            });
        });
    }
    const SEARCH = await waitForElem(searchID);

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
}
