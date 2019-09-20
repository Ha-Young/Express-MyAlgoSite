let editor = CodeMirror.fromTextArea(document.getElementById('code-area'), {
  mode: 'javascript',
  lineNumbers: true,
  linkWrapping: true,
  matchBrackets: true
});
editor.getDoc().setValue(`function solution(a){\n  return a;\n}`);
editor.setSize(null, 460);
