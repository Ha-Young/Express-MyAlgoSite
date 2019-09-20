const editor = CodeMirror.fromTextArea(document.getElementById('code'), {
  mode: "javascript",
  lineNumbers: true,
  lineWrapping: true,
  matchBrackets: true,
  theme: 'base16-dark'
});
editor.getDoc().setValue(`function solution(param) {\n //code here...\n};\n`);

// const sampleEditor = CodeMirror(document.getElementById('code-sample'), {
//   mode: "javascript",
//   lineNumbers: true,
//   lineWrapping: true,
//   matchBrackets: true,
//   theme: 'base16-dark',
// });

// let sampleTestCode = '';
// <% problemTests.forEach(test => { %>
//   sampleTestCode += `<%- test.code %>; <%- test.solution %> \n\n`;
// <% }) %>

// sampleEditor.getDoc().setValue(sampleTestCode);
// sampleEditor.setSize(null, 180);
