const myTextarea = document.getElementById('myTextarea');
const editor = CodeMirror.fromTextArea(myTextarea, {
  lineNumbers: true,
  mode: "javascript",
  tabSize: 2,
  theme: 'hopscotch'
});

editor.getDoc().setValue('function solution (x) {\r\n\t\r\n}\r\n');
editor.save();
