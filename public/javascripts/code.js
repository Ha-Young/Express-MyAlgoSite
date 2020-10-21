/* eslint-disable no-undef */
const codeBox = document.getElementById("code");

CodeMirror.fromTextArea(codeBox, {
  lineNumbers: true,
  mode: "javascript",
  theme: "ayu-dark",
  tabSize: 2,
});
