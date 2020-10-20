const codeBox = document.getElementById("code");
codeBox.textContent = "function solution(x){\n  let result;\n  return x;\n}\n";

CodeMirror.fromTextArea(codeBox, {
  lineNumbers: true,
  mode: "javascript",
  theme: "ayu-dark",
  tabSize: 2,
});
