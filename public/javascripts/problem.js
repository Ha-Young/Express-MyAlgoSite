/* eslint-disable no-undef */
const sendTestCaseBtnElement = document.querySelector(".send-testcase-btn");
const sendAnswerBtnElement = document.querySelector(".send-answer-btn");
const testCaseInputElement = document.querySelector(".test-case-area");
const solveResultElemet = document.querySelector(".result-view-section");

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

    if (!code || !solution) {
      return null;
    }

    return {
      code: code.trim(),
      solution: solution.indexOf('"') > -1 ? solution.trim() : Number(solution),
    };
  });
}

function getSolveReqBody(mode) {
  const solveReqBody = {
    mode,
    userCode: myCodeMirror.getValue(),
  };

  if (mode === "testcase") {
    console.log('testCaseInputElement.textContent', testCaseInputElement.value);
    solveReqBody.testCases = convertTestCaseStrToList(testCaseInputElement.value);
  }

  return solveReqBody;
}

async function getSolveResult(reqBody) {
  try {
    const response = await window.fetch(window.location.pathname, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(reqBody),
    });

    return await response.json();
  } catch (err) {
    return {
      errMsg: '결과를 받아오지 못했습니다.\n다시 시도해주세요.',
    };
  }
}

async function handleTestCaseSendBtnClick(e) {
  const reqBody = getSolveReqBody("testcase");

  console.log('reqBody', reqBody);

  const testCaseSolveResult = await getSolveResult(reqBody);

  console.log('response', testCaseSolveResult);

  const templateStr = testCaseSolveResult.errMsg || getTestCaseSolveTemplates(testCaseSolveResult);

  solveResultElemet.innerHTML = templateStr;
}

function handleAnswerSendBtnClick(e) {
  submitCodeOnMode("answer");
}

function init() {
  window.addEventListener("load", handleWindowLoad);
  sendTestCaseBtnElement.addEventListener("click", handleTestCaseSendBtnClick);
  sendAnswerBtnElement.addEventListener("click", handleAnswerSendBtnClick);
}

init();
