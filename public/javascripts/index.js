console.log('hello world!');

let editor = CodeMirror.fromTextArea(document.getElementById('code-area'), {
  mode: 'javascript',
  lineNumbers: true,
  linkWrapping: true,
  matchBrackets: true,
  theme: 'tomorrow-night-eighties',
});
editor.getDoc().setValue(`function solution(a){\n  var answer = 0; \n \n  return answer;\n}`);
editor.setSize(null, 460);
