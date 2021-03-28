const editor = document.getElementById("editor");
let textareaValue = editor.value;
textareaValue = textareaValue.trim();
editor.value = textareaValue;

const codemirror = new CodeMirror.fromTextArea(editor, {
  name: "javascript",
  lineNumbers: true,
  lineWrapping: true,
  theme: "ayu-dark",
});
