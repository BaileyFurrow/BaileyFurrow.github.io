/* This function will take a function page and allow jumping to certain letters
 * by using the letters on the keyboard. */
function index_jump() {
    

    document.addEventListener('keyup', captureKeys);
    document.addEventListener('focus', () => {
        document.removeEventListener(captureKeys);
    });
    document.addEventListener('blur', () => {
        document.addEventListener('keyup', captureKeys);
    });

    function captureKeys(e) {
        let letter = e.key;
        let id = document.querySelector('#' + letter) || document.querySelector('[id*=' + letter + ']');
        id.scrollIntoView();
    }
}
