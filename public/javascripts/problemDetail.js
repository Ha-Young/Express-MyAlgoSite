CodeMirror.fromTextArea(document.getElementById('textEditor'), {
  lineNumbers: true,
  tabSize: 2,
  mode: "javascript",
  theme: "material",
  autoCloseBrackets: true,
  matchBrackets: true,
  matchTags: true,
  autoCloseTags: true,
  showTrailingSpace: true,
  editor: {
    showHint: true
  }
});
