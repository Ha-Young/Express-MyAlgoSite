const PROBLEM = require("../constants/problemConstants");

function checkTestResult(result, testCase) {
  const testCode = testCase.code;
  const currentValue = testCase.solution;

  return {
    solution: testCode,
    resultValue: String(result),
    status: result !== currentValue ? PROBLEM.FAIL : PROBLEM.SUCCESS,
  }
}

module.exports = checkTestResult;
