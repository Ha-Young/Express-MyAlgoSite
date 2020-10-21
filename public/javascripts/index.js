const code = CodeMirror.fromTextArea(document.getElementById('code'), {
  mode: 'javascript',
  lineNumbers: true,
  theme: 'material-ocean',
  smartIndent:true,
  lineWrapping:true,
  tabSize:2,
}).setValue(`function solution (something) {
  // your code here...
}`);
