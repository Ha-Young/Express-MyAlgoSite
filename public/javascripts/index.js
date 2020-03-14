const editor = CodeMirror.fromTextArea(document.getElementById('code'), {
  mode: 'javascript',
  lineNumbers: true,
  value: document.documentElement.innerHTML,
  theme: 'midnight'
});
editor.setSize(600, 300);
editor.getDoc().setValue(`function solution () { \n  //..\n }`);
