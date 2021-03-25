/* eslint-disable indent */
function testCaseResultTableTemplate(testCaseResult) {
  return `<table class="console-testcase" data-index="0">
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
    </tbody>
  </table>`;
}

function getTestCaseSolveTemplates(solveResult) {
  let templateStr = "";
  console.log(solveResult);

  for (const caseResult of solveResult.caseResultList) {
    templateStr += testCaseResultTableTemplate(caseResult);
  }

  console.log(templateStr);

  return templateStr;
}

function getAnswerSolveTemplates(solveResult) {}
