const textarea = document.getElementById('editor');
CodeMirror.fromTextArea(textarea, {
  lineNumbers: true,
  lineWrapping: true,
  mode: "javascript",
  theme: "default"
});
