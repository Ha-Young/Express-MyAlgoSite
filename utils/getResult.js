const vm = require("vm");

function getResult(userCode, tests) {
  try {
    const context = { result: 0 };

    vm.createContext(context);

    const resultList = tests.map(test => {
      const code = userCode + "result=" + test.code;
      const script = new vm.Script(code);

      script.runInContext(context);

      return {
        testResult: context.result,
        expectedResult: test.solution,
        isPassed: context.result === test.solution,
      };
    });

    return {
      isAllPassed: resultList.every(result => result.isPassed),
      resultList,
      solutionError: false,
    }
  } catch (err) {
    return {
      isAllPassed: false,
      resultList: null,
      solutionError: err,
    }
  }
}

module.exports = getResult;
