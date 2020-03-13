const textarea = document.querySelector('textarea');
const editor = CodeMirror.fromTextArea(textarea, {
  mode: 'javascript',
  theme: 'ayu-dark',
  lineNumbers: true
});
editor.setSize(null, 575);
