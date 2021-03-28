const vm = require("vm");

function getResult(userCode, tests) {
  try {
    const resultList = [];
    const context = { result: 0 };

    vm.createContext(context);

    for (let i = 0; i < tests.length; i++) {
      const code = userCode + "result=" + tests[i].code;
      const script = new vm.Script(code);

      script.runInContext(context);

      const result = {
        testResult: context.result,
        expectedResult: tests[i].solution,
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
      resultList,
      hasSolutionError: null,
      solutionError: false,
    }
  } catch (err) {
    return {
      isAllPassed: false,
      resultList: null,
      hasSolutionError: true,
      solutionError: err,
    }
  }
}

module.exports = getResult;
