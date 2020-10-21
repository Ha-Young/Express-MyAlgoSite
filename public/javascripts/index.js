const problemSubmitForm = document.querySelector('.problem__submit__form');
const problemSubmitTextArea = document.querySelector(
  '.problem__sumbit__textarea'
);

const codeMirror = CodeMirror.fromTextArea(problemSubmitTextArea, {
  mode: 'javascript',
  tabSize: 2,
  theme: 'material-palenight',
  matchBrackets: true,
  lineWrapping: true,
  lineNumbers: true,
  smartIndent: true,
  lint: {
    esversion: 6,
  },
});
