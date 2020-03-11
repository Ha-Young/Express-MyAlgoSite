const editor = CodeMirror.fromTextArea(
    document.getElementById('codemirrorTextarea'), {
    mode: 'javascript',
    lineNumbers: true,
    theme: 'darcula',
});

editor.on('change', ()=>{
    console.log('------value ghk------', editor.getValue());
})