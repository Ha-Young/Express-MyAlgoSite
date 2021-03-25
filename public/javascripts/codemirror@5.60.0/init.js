const myCodeMirror = CodeMirror.fromTextArea(document.getElementById("editor"), {
  lineNumbers: true,
  mode: "javascript",
  theme: "moxer",
});

myCodeMirror.setSize(500, 400);
