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
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;quot;/gi, '"');

  descElement.innerHTML = htmlStr;
}

function getValueOfType(solution) {
  return solution.indexOf('"') > -1
    ? solution.trim()
    : JSON.parse(solution);
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
      solution: getValueOfType(solution),
    };
  });
}

function getSolveReqBody(mode) {
  const solveReqBody = {
    mode,
    userCode: myCodeMirror.getValue(),
  };

  if (mode === "testcase") {
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
      errMsg: '????????? ???????????? ???????????????.\n?????? ??????????????????.',
    };
  }
}

async function handleTestCaseSendBtnClick(e) {
  const reqBody = getSolveReqBody("testcase");

  const testCaseSolveResult = await getSolveResult(reqBody);

  const templateStr = testCaseSolveResult.errMsg || getTestCaseSolveTemplates(testCaseSolveResult);

  solveResultElemet.innerHTML = templateStr;
}

async function handleAnswerSendBtnClick(e) {
  const reqBody = getSolveReqBody("answer");

  const testCaseSolveResult = await getSolveResult(reqBody);

  const templateStr = testCaseSolveResult.errMsg || getAnswerSolveTemplates(testCaseSolveResult);

  solveResultElemet.innerHTML = templateStr;
}

function init() {
  window.addEventListener("load", handleWindowLoad);
  sendTestCaseBtnElement.addEventListener("click", handleTestCaseSendBtnClick);
  sendAnswerBtnElement.addEventListener("click", handleAnswerSendBtnClick);
}

init();
