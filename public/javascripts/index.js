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

cm.setSize('65vw', 400);
