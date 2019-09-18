const editor = CodeMirror.fromTextArea(document.getElementById('code'), {
  mode: 'javascript',
  lineNumbers: true,
  lineWrapping: true,
  tabSize: 2,
  theme: 'duotone-dark'
});
