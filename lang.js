// The language switch of the public pages. Both languages are in the HTML; this
// script hides the one not chosen and shows the buttons. If it never loads, both
// stay visible, one under the other. It stores nothing: the choice comes from
// the address (#cs, #en), else from the browser's language.
(function () {
  var switcher = document.querySelector('[data-langswitch]');
  var docs = document.querySelectorAll('[data-lang-doc]');
  var separator = document.querySelector('[data-lang-sep]');
  if (!switcher || docs.length < 2) return;
  var buttons = switcher.querySelectorAll('button[data-lang]');

  function apply(lang) {
    docs.forEach(function (doc) {
      doc.hidden = doc.getAttribute('data-lang-doc') !== lang;
    });
    buttons.forEach(function (button) {
      var chosen = button.getAttribute('data-lang') === lang;
      button.setAttribute('aria-pressed', chosen ? 'true' : 'false');
    });
    document.documentElement.lang = lang;
  }

  function initial() {
    var hash = location.hash.replace('#', '');
    if (hash === 'cs' || hash === 'en') return hash;
    return (navigator.language || '').toLowerCase().indexOf('cs') === 0
      ? 'cs'
      : 'en';
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var lang = button.getAttribute('data-lang');
      history.replaceState(null, '', '#' + lang);
      apply(lang);
    });
  });
  switcher.hidden = false;
  if (separator) separator.hidden = true;
  apply(initial());
})();
