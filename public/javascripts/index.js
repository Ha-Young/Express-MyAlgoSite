/* CodeMirror 3.14.2 .....*/
const codemirror = new CodeMirror.fromTextArea(document.getElementById("codemirror"), {
  mode: 'javascript',
  lineNumbers: true,
  lineWrapping: true,
  tabSize: 2,
  theme: 'material-darker',
});
