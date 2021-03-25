/* eslint-disable indent */
function testCaseResultTableTemplate(testCaseResult) {
  let outputStr = "";

  if (testCaseResult.outputs.length > 0) {
    for (const output of testCaseResult.outputs) {
      outputStr += output + '<br>';
    }
  }

  return `
    <table class="console-testcase" data-index="0">
      <tbody>
        <tr>
          <td colspan="2">테스트 ${testCaseResult.index} </td>
        </tr>
        <tr>
          <td class="td-label" align="right">케이스 <span>〉</span></td>
          <td class="input">${testCaseResult.code}</td>
        </tr>
        <tr>
          <td class="td-label" align="right">기댓값 <span>〉</span></td>
          <td class="output">${testCaseResult.solution}</td>
        </tr>
        <tr>
          <td class="td-label" align="right" valign="top">실행 결과 <span>〉</span></td>
          ${
            testCaseResult.isCollect
              ? `<td class="result passed">${testCaseResult.msg}</td>`
              : `<td class="result failed">${testCaseResult.msg}</td>`
          }
        </tr>
        ${
          outputStr &&
            `<tr>
              <td class="td-label" align="right">출력값 <span>〉</span></td>
              <td class="output">${outputStr}</td>
            </tr>`
        }
      </tbody>
    </table>`;
}

function getTestCaseSolveTemplates(solveResult) {
  const templateStr = solveResult.caseResultList.reduce((acc, cur) => {
    return acc + testCaseResultTableTemplate(cur);
  }, "");

  return templateStr;
}

function answerResultTableTemplate(answerResult) {
  return `
    <table class="console-answer" data-category="correctness">
      <tbody>
        <tr>
          <td valign="top" class="td-label">테스트 ${answerResult.index} <span>〉</span></td>
          ${
            answerResult.isCollect
              ? `<td class="result passed">${answerResult.summary}</td>`
              : `<td class="result failed">${answerResult.summary}</td>`
          }
        </tr>
      </tbody>
    </table>`;
}

function getAnswerSolveTemplates(solveResult) {
  const templateStr = solveResult.caseResultList.reduce((acc, cur) => {
    return acc + answerResultTableTemplate(cur);
  }, "");

  return templateStr;
}
