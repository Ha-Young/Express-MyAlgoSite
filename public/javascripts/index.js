const answerArea = CodeMirror.fromTextArea(document.getElementById("answer-area"), {
  mode: "javascript",
  tabSize: 2,
  lineNumbers: true,
});

const testArea = CodeMirror.fromTextArea(document.getElementById("test-area"), {
  mode: "javascript",
  tabSize: 2,
  lineNumbers: true,
});

answerArea.setSize(null, 200);
answerArea.save();

testArea.setSize(null, 100);
testAra.save();
