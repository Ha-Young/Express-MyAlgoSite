const problemForm = document.querySelector('.problem_form');
const problemTextArea = document.querySelector('.problem_textarea');

if (problemForm) {
  CodeMirror.fromTextArea(problemTextArea, {
    mode: 'javascript',
    tabSize: 2,
    lineNumbers: true,
    matchBrackets: true,
    lineWrapping: true,
    smartIndent: true,
    lint: {
      esversion: 6,
    },
  });
}
