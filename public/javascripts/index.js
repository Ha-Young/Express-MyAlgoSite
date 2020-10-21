(function () {
  const codeMirror = window.CodeMirror;
  const editArea = document.getElementById('edit-area');
  const testCasesArea = document.getElementById('test-cases');

  if (editArea && testCasesArea) {
    const options = {
      lineNumbers: true,
      tabSize: 2,
      theme: 'moxer'
    };
    const editAreaMirror = codeMirror.fromTextArea(editArea, options);
    const testCasesAreaMirror = codeMirror.fromTextArea(testCasesArea, options);

    editAreaMirror.save();
    testCasesAreaMirror.save();
  }
})();
