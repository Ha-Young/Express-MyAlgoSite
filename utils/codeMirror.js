const myTextarea = document.getElementById('myTextarea');
const editor = CodeMirror.fromTextArea(myTextarea, {
  lineNumbers: true,
  mode: "javascript",
});

editor.save();
