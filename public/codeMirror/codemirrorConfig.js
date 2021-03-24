const editor = document.getElementById("editor");

CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "javascript",
    theme: "base16-dark",
    lineNumbers: true,
    inputStyle: 'contenteditable',
    spellcheck: true,
}).setValue("function solution() {\n  \n} \n");
