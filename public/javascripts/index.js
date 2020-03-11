const editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  mode: "javascript",
  theme: "dracula",
  lineNumbers: true,
  tabSize: 2,
  extraKeys: {"Ctrl-Space": "autocomplete"},
  value: document.documentElement.innerHTML
});
