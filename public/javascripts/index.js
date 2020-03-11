const editor = CodeMirror.fromTextArea(document.getElementById('codemirror'), {
  lineNumbers: true,
  mode:  "javascript",
  theme: "midnight"
});
editor.setSize(700, 300);
