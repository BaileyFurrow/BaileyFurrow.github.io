function vimSiteSearch(searchID) {
  console.log('testing');
  const SEARCH = document.querySelector(searchID);

  document.addEventListener('keyup', captureSlash);
  SEARCH.addEventListener('focus', () => {
      document.removeEventListener('keyup', captureSlash);
  });

  SEARCH.addEventListener('blur', () => {
      document.addEventListener('keyup', captureSlash);
  });

  function captureSlash(event) {
      console.log('key press');
      if (event.key == '/' && document.activeElement.tagName != 'INPUT') {
          SEARCH.focus();
      }
  }
}
