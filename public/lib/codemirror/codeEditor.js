CodeMirror.fromTextArea(document.getElementById('code'), {
  mode: "javascript",
  lineNumbers: true,
  lineWrapping: true,
  matchBrackets: true,
  theme: 'base16-dark'
}).getDoc().setValue(`function solution(param) {\n //code here...\n};\n`);
