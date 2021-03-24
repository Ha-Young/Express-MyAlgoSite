
const problemForm = document.querySelector('.problem_form');
const problemTextArea = document.querySelector('.problem_textarea');

let codeMirror;

if (problemForm) {
  codeMirror = CodeMirror.fromTextArea(problemTextArea, {
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
}

// const code = codeMirror.getTextArea();
// console.log(code);
