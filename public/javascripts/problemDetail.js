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
