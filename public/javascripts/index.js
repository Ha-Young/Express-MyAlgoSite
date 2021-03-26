const problemForm = document.querySelector('.problem_form');
const problemTextArea = document.querySelector('.problem_textarea');

let codeMirror;

if (problemForm) {
  codeMirror = CodeMirror.fromTextArea(problemTextArea, {
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
