const PROBLEM = require("../constants/problemConstants");

function checkTestResult(result, testCase) {
  const testCode = testCase.code;
  const currentValue = testCase.solution;

  if (result !== currentValue) {
    const failTestCode = {
      solution: testCode,
      resultValue: String(result),
      status: PROBLEM.FAIL,
    };

    return failTestCode;
  }

  const successTestCode = {
    solution: testCode,
    resultValue: String(result),
    status: PROBLEM.SUCCESS,
  };

  return successTestCode;
}

module.exports = checkTestResult;
