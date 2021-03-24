const codemirrorEl = document.getElementById("codemirror");
const submitBtn = document.getElementById("submit");

const cm = CodeMirror.fromTextArea(codemirrorEl, {
  mode: "javascript",
  theme: "cobalt",
  indentWithTabs: true,
  smartIndent: true,
  autoCloseBrackets: true,
  lineNumbers: true,
  lineWrapping: true,
  gutter: true,
});
