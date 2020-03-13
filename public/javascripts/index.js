const editor = CodeMirror.fromTextArea(document.getElementById("codearea"), {
  mode: "javascript",
  theme: "darcula",
  lineNumbers: true,
  lineWrapping: true,
  tabSize: 2,
  extraKeys: {"Ctrl-Space": "autocomplete"},
  value: codearea.value //document.documentElement.innerHTML
});
