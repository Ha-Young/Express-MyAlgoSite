const editor = CodeMirror.fromTextArea(
  document.getElementById("code"),
  {
    lineNumbers: true,
    styleActiveLine: true,
    mode: "javascript",
    indentUnit: 2,
    identWithTabs: true,
    theme: "gruvbox-dark",
  },
);

module.exports = editor;
