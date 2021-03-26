const PROBLEM_RESULT = require("../constants/problemConstants");

function validationResult(result, runningCode) {
  const testCode = runningCode.code;
  const correntValue = runningCode.solution;

  if (result !== correntValue) {
    const failTestCode = {
      solution: testCode,
      resultValue: String(result),
      status: PROBLEM_RESULT.FAIL,
    };

    return failTestCode;
  }

  const successTestCode = {
    solution: testCode,
    resultValue: String(result),
    status: PROBLEM_RESULT.SUCCESS,
  };

  return successTestCode;
}

module.exports = validationResult;
