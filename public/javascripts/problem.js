(function () {
  const textarea = document.getElementById('editor');
  CodeMirror.fromTextArea(textarea, {
    lineNumbers: true,
    lineWrapping: true,
    mode: 'javascript',
    theme: 'dracula'
  }).setSize('auto', 500);
})();
