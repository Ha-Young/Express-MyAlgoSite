CodeMirror.fromTextArea(document.getElementById('textEditor'), {
  lineNumbers: true,
  tabSize: 2,
  mode: "javascript",
  theme: "material",
  viewportMargin: Infinity,
  autoCloseBrackets: true,
  matchBrackets: true,
  matchTags: true,
  autoCloseTags: true,
  showTrailingSpace: true,
  editor: {
    showHint: true
  },
});

document.getElementById("successButton").addEventListener("click", () => {
  document.location.href = "/";
});

document.getElementById("failureButton").addEventListener("click", () => {
  const $failureDiv = document.getElementById("failure");
  $failureDiv.style.display = "none";
  $failureDiv.id = "";
});
