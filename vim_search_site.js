/** Captures the slash (/) key when NOT in a text box and focuses input on
 *  website's search field. In other words, activates search vim-style. */
function vimSiteSearch(searchID) {
    const SEARCH = Node.prototype.isPrototypeOf(searchID)
        ? searchID
        : document.querySelector(searchID);

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
