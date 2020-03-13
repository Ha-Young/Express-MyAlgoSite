const editor = CodeMirror.fromTextArea(document.querySelector('textarea'), {
  lineNumbers: true,
  mode: 'javascript',
  lineWrapping: true,
  val: textarea.val,
  theme: 'darcula',
  matchBrackets: true,
  tabSize: 2
});

editor.setSize(null, 600);

const homeButton = document.querySelector('.home-button');
homeButton.addEventListener('click', () => history.back());
