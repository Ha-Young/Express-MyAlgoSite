const PROBLEM = require("../constants/problemConstants");

function validationResult(result, runningCode) {
  const testCode = runningCode.code;
  const correntValue = runningCode.solution;

  if (result !== correntValue) {
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

module.exports = validationResult;
