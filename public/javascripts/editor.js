const $textarea = document.querySelector(".editor");
const editor = CodeMirror.fromTextArea($textarea, {
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    styleActiveLine: true,
    theme: "material-darker",
    mode: "javascript",
});
editor.setSize(800, 500);

editor.setValue(`function solution() {\n // TODO \n}`);
