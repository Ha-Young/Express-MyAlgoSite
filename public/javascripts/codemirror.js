const editor = new CodeMirror.fromTextArea(document.getElementById("editor"), {
  lineNumbers: true,
  mode: "javascript",
  theme: "dracula",
  lineWrapping: false,
});

editor.setSize("100%", "100%");
