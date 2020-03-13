const $code = document.querySelector('.problem-code');
const $input = document.querySelector('.problem-input');

const code = CodeMirror.fromTextArea($code, {
  mode: 'javascript',
  theme: 'material-darker',
  tabSize: 2,
  scrollbarStyle: 'overlay',
  lineNumbers: true,
  autoCloseBrackets: true
});

code.on('change', () => {
  $input.value = code.getValue();
});
