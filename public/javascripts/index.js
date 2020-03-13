import './codemirror';
import './mode/javascript';

var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
  lineNumbers: true,
  mode: { name: 'javascript', globalVars: true },
  matchBrackets: true,
  theme: 'panda-syntax'
});
