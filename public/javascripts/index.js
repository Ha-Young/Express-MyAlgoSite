const textArea = document.getElementById('code');
const form = document.getElementById('editor-form');
const logoutButton = document.querySelector('.logout');

if (textArea) {
  CodeMirror.fromTextArea(textArea, {
    mode: {name: 'changes'},
    lineNumbers: true,
    indentUnit: 4
  });
}

if (form) {
  form.addEventListener('submit', (e) => {
    if(!confirm('제출하시겠습니까?')) {
      e.preventDefault();
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', (e) => {
    if(!confirm('정말 로그아웃하시겠습니까?')) {
      e.preventDefault();
    }
  });
}
