const myCodeMirror = CodeMirror.fromTextArea(document.querySelector("textarea"), {
  mode:  "javascript",
  theme: "dracula",
  lineNumbers: true
});

myCodeMirror.getDoc().setValue("function solution(data) {\n  return ;\n}");
