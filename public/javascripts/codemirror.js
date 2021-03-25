let cm = new CodeMirror.fromTextArea(document.getElementById("editor"), {
  lineNumbers: true,
  mode: "javascript",
  theme: "dracula",
  lineWrapping: false,
});

cm.setSize(500, 300);
console.log(cm);
