const $testSubmit = document.getElementById('test-submit');
const $stringCode = document.getElementById('string-code');
const $triedValue = document.querySelector('#tried-value');
const editor = CodeMirror(document.querySelector('#editor'), {
  mode: 'javascript',
  lineNumbers: true,
  tabSize: 2,
  value: $triedValue.innerHTML,
  theme: 'monokai',
});

$testSubmit.addEventListener('submit', () => {
  $stringCode.value = editor.getDoc().getValue();
});
