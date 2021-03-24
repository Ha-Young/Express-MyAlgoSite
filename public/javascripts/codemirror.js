const codemirrorEl = document.getElementById("codemirror");
const cm = CodeMirror.fromTextArea(codemirrorEl, {
  mode: "javascript",
  theme: "cobalt",
  indentWithTabs: true,
  smartIndent: true,
  matchBrackets: true,
  lineNumbers: true,
  lineWrapping: true,
  gutter: true,
  value: "",
});

console.log(cm);
