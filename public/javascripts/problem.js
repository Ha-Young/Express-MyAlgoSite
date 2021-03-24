/* eslint-disable no-undef */
const sendBtnElement = document.querySelector(".send-btn");
const testCaseInputElement = document.querySelector(".test-case-area");

const myCodeMirror = getCodeMirror();

function getCodeMirror() {
  const cm = new CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    lineWrapping: true,
    styleActiveLine: true,
    matchBrackets: true,
    tabSize: 2,
    mode: "javascript",
    theme: "base16-light",
  });
  cm.setSize("100%", "calc(100% - 46px)");

  return cm;
}

function handleWindowLoad(e) {
  convertDescStrToHTMLStr();
}

function convertDescStrToHTMLStr() {
  const descElement = document.querySelector(".problem-desc");

  const htmlStr = descElement.innerHTML
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

  descElement.innerHTML = htmlStr;
}

function convertTestCaseStrToList(testCaseStr) {
  const testCaseStrList = testCaseStr.split("\n");

  return testCaseStrList.map(str => {
    const [code, solution] = str.split(":");
    return {
      code: code.trim(),
      solution: solution.trim(),
    };
  });
}

function handleSendBtnClick(e) {
  const dummyForm = document.createElement("form");
  const currentPath = window.location.pathname;

  dummyForm.method = "POST";
  dummyForm.action = `${currentPath}`;

  const codeInput = document.createElement("input");
  const testCaseInput = document.createElement("input");

  const codeStr = myCodeMirror.getValue();
  const testCaseStr = JSON.stringify(
    convertTestCaseStrToList(testCaseInputElement.textContent)
  );

  codeInput.setAttribute("type", "text");
  codeInput.setAttribute("name", "code");
  codeInput.setAttribute("value", codeStr);
  testCaseInput.setAttribute("type", "text");
  testCaseInput.setAttribute("name", "testCase");
  testCaseInput.setAttribute("value", testCaseStr);

  dummyForm.appendChild(codeInput);
  dummyForm.appendChild(testCaseInput);

  document.body.appendChild(dummyForm);

  dummyForm.submit();
}

function init() {
  window.addEventListener("load", handleWindowLoad);
  sendBtnElement.addEventListener("click", handleSendBtnClick);
}

init();
