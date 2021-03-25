const answerArea = CodeMirror.fromTextArea(document.getElementById("answer-area"), {
  mode: "javascript",
  tabSize: 2,
  lineNumbers: true,
  theme: "3024-day",
});

const testArea = CodeMirror.fromTextArea(document.getElementById("test-area"), {
  mode: "javascript",
  tabSize: 2,
  lineNumbers: true,
  theme: "base16-light",
});

answerArea.setSize(null, 320);
answerArea.save();

testArea.setSize(null, 280);
testArea.save();
