const textarea = document.getElementById('editor');
const myCodeMirror = CodeMirror.fromTextArea(textarea, {
  lineNumbers: true,
  lineWrapping: true,
  mode: 'javascript',
  theme: 'dracula'
});

myCodeMirror.setSize('auto', 500);
