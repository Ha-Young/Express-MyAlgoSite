const editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  mode: {name: "changes"},
  lineNumbers: true,
  indentUnit: 4
});
const form = document.getElementById("editor-form");

form.addEventListener('submit', (e) => {
  if(!confirm('제출하시겠습니까?')) {
    e.preventDefault();
  }
});