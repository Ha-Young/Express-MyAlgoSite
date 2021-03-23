const codeMirrorArea = CodeMirror.fromTextArea(document.getElementById("code-area"), {
  mode: "javascript",
  tabSize: 2,
  lineNumbers: true,
});

codeMirrorArea.save();
