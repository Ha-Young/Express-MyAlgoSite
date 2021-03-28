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
        isPassed: context.result === tests[i].solution,
      };

      resultList.push(result);
    }

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
