// const cm = require("codemirror");
// import cm from "../codemirror/lib/codemirror.js";
console.log("hello");
const $codeInput = document.querySelector(".code-input");
console.log($codeInput);
const editor = CodeMirror.fromTextArea($codeInput, {
  //   width: "200px",
  height: "200px",
  lineNumbers: true,
  mode: "javascript",
  //   textWrapping: true,
});

editor.save();
console.log("JavaScript");
