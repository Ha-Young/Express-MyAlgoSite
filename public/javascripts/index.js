var textarea = document.getElementById('editor');
var editor = CodeMirror.fromTextArea(textarea, {
    lineNumbers: true,
    lineWrapping: true,
    mode: "javascript",
    theme: "default"
});

// editor.getDoc().setValue('function solution () {};');

// var myCodeMirror = CodeMirror(editor, {
//   value: "function solution () {}",
//   mode:  "javascript"
// });

