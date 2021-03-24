
// const problemForm = document.querySelector('.problem_form');
// const problemTextArea = document.querySelector('.problem_textarea');

// let codeMirror;

// if (problemForm) {
//   codeMirror = CodeMirror.fromTextArea(problemTextArea, {
//     value: 'hi',
//     mode: 'javascript',
//     tabSize: 2,
//     theme: 'material-palenight',
//     matchBrackets: true,
//     lineWrapping: true,
//     lineNumbers: true,
//     smartIndent: true,
//     lint: {
//       esversion: 6,
//     },
//   });
// }

const code = document.querySelector('#problem_textarea');
const data = CodeMirror.fromTextArea(code, {
  lineNumbers: true,
  value: 'hi'
});

