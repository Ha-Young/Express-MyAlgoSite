const textarea = document.getElementById('editor');
const editor = CodeMirror.fromTextArea(textarea, {
    lineNumbers: true,
    lineWrapping: false,
    mode: 'javascript',
    theme: 'dracula'
});
