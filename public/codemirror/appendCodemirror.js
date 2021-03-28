const editor = CodeMirror.fromTextArea(
  document.getElementById("editor"), {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    autoCloseBrackets: true,
  });

editor.setSize("500", "400");
