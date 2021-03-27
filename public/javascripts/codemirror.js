const cm = new CodeMirror.fromTextArea(document.getElementById("editor"), {
  lineNumbers: true,
  mode: "javascript",
  theme: "dracula",
  lineWrapping: false,
});

cm.setSize("100%", "100%");
