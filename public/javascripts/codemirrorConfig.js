const editor = document.getElementById("editor");
const textareaValue = editor.value.trim();
editor.value = textareaValue;

const codemirror = new CodeMirror.fromTextArea(editor, {
  name: "javascript",
  lineNumbers: true,
  lineWrapping: true,
  theme: "ayu-dark",
});
