let editor = CodeMirror.fromTextArea(document.getElementById('code-area'), {
  mode: 'javascript',
  lineNumbers: true,
  linkWrapping: true,
  matchBrackets: true
});
editor.setSize(750, 870);
