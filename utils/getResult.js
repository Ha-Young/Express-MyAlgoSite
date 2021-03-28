const vm = require("vm");

function getResult(userCode, problem) {
  try {
    const resultList = [];
    const context = { result: 0 };

    vm.createContext(context);

    for (let i = 0; i < problem.tests.length; i++) {
      const code = userCode + "result=" + problem.tests[i].code;
      const script = new vm.Script(code);

      script.runInContext(context);

      const result = {
        testResult: context.result,
        expectedResult: problem.tests[i].solution,
      };

      if (result.testResult === result.expectedResult) {
        result.isPassed = true;
      } else {
        result.isPassed = false;
      }

      resultList.push(result);
    }

    const isAllPassed = resultList.every(result => result.isPassed);

    return {
      isAllPassed,
      resultList: resultList,
      hasSolutionError: false,
    }
  } catch (err) {
    return {
      errorMessage: err.message,
      hasSolutionError: true,
    }
  }
}

module.exports = getResult;
