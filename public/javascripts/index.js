const codemirrorTextarea = document.getElementById('codemirrorTextarea');

const editor = CodeMirror.fromTextArea(
    codemirrorTextarea , {
    mode: 'javascript',
    lineNumbers: true,
    theme: 'darcula',
});

editor.on('change', ()=>{
    const textareaValue = editor.getValue();
})
