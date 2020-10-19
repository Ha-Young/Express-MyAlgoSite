const codeMirror = window.CodeMirror;
const editArea = document.getElementById('edit-area');
const testCasesArea = document.getElementById('test-cases');

// theme: 'cm-ayu-dark'

if (editArea && testCasesArea) {
  const edit = codeMirror.fromTextArea(editArea, {
    mode: 'javascript',
    lineNumbers: true,
    tabSize: 2,
  });
  const test = codeMirror.fromTextArea(testCasesArea, {
    mode: 'javascript',
    lineNumbers: true,
    tabSize: 2
  });

  edit.setSize(600, 200);
  test.setSize(600, 200);
}

console.log('init!');
