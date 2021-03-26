const { VM, VMScript } = require("vm2");

const { getCodeResult } = require("./helper");

function checkUserCode(tests, solution) {
  const resultLog = [];
  let isCodeError = false;

  tests.forEach((test) => {
    try {
      const vm = new VM();
      const script = new VMScript(solution + test.code);
      const usingScript = vm.run(script, { timeout: 1200 });
      const codeResult = getCodeResult(test, usingScript);
      
      if (usingScript === test.solution) {
        resultLog.push({
          result: "SUCCESS",
          ...codeResult,
        });
      } else {
        resultLog.push({
          result: "FAILURE",
          ...codeResult,
        });
      }
    } catch (error) {
      isCodeError = true;

      resultLog.push({
        result: "ERROR",
        error,
      });
    }
  });

  const isPassed = resultLog.every((data) => "SUCCESS" === data.result);

  return { isPassed, resultLog, isCodeError };
}

function checkIsFirstComplete(problem, username) {
  const userIndex = problem.completed_users.indexOf(username);

  if (userIndex === -1) {
    problem.completed_users.push(username);

    return problem;
  }

  return false;
}

exports.checkUserCode = checkUserCode;
exports.checkIsFirstComplete = checkIsFirstComplete;
