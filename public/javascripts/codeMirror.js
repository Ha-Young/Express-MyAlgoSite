const $codeInput = document.querySelector(".code-input");
const editor = CodeMirror.fromTextArea($codeInput, {
  lineNumbers: true,
  mode: "javascript",
});
