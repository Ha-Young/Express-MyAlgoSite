(function () {
  const codeMirror = window.CodeMirror;
  const editArea = document.getElementById('edit-area');
  const testCasesArea = document.getElementById('test-cases');

  if (editArea && testCasesArea) {
    const options = {
      lineNumbers: true,
      tabSize: 2,
      theme: 'ayu-dark'
    };
    const editAreaMirror = codeMirror.fromTextArea(editArea, options);
    const testCasesAreaMirror = codeMirror.fromTextArea(testCasesArea, options);

    editAreaMirror.setSize(600, 200);
    testCasesAreaMirror.setSize(600, 200);
    editAreaMirror.save();
    testCasesAreaMirror.save();
  }
})();
