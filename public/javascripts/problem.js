const $code = document.querySelector('.problem__code');
const $input = document.querySelector('.problem__input');

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
