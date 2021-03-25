const cm = new CodeMirror.fromTextArea(document.querySelector('.code'), {
  lineNumbers: true,
  lineWrapping: true,
  styleActiveLine: true,
  matchBrackets: true,
  tabSize: 2,
  value: 'console.log(a)',
  mode: 'javascript',
  theme: 'monokai',
});

cm.setSize(500, 500);
cm.getDoc().setValue(`function solution(param) {
  let result;

  return result;
}`);
