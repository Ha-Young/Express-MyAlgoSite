const submitButton = document.querySelector(".submit-btn");
const resultBox = document.querySelector(".result");

const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  lineNumbers: true,
  styleActiveLine: true,
  lineWrapping: true,
  matchBrackets: true,
  mode: { name: "javascript", globalVars: true },
});

const result = CodeMirror.fromTextArea(document.getElementById("result"), {
  lineNumbers: true,
  styleActiveLine: true,
  lineWrapping: true,
  matchBrackets: true,
  mode: { name: "javascript", globalVars: true },
  theme: "seti",
});

result.setSize("100%", "100px");
