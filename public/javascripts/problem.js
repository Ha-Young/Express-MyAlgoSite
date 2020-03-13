const testNumber = document
  .querySelector('.testNumber')
  .textContent.replace(/문제번호:/g, '')
  .trim();
const submitButton = document.querySelector('.submitButton');

let cm = new CodeMirror.fromTextArea(document.getElementById('editor'), {
  value: 'function sdfs() {}',
  lineNumbers: true,
  mode: 'javascript',
  theme: 'dracula',
  lineWrapping: true,
});

cm.setSize(1000, 450);
