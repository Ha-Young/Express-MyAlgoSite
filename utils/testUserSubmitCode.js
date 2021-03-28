const { VM } = require("vm2");

const checkTestResult = require("./checkTestResult");

const PROBLEM = require("../constants/problemConstants");

function testUserSubmitCode(submitCode, testCases) {
  const vm = new VM(
    {
      sandbox: {},
      timeout: 10000,
      fixAsync: true,
      wasm: false,
    }
  );

  const resultList = testCases.map(testCase => {
    try {
      const result = vm.run(
        `solution = ${submitCode}

        ${testCase.code};`
      );

      return checkTestResult(result, testCase);
    } catch (userSolutionError) {
      return {
        solution: testCase.code,
        resultValue: userSolutionError.message,
        status: PROBLEM.FAIL,
      };
    }
  });

  return resultList;
}

module.exports = testUserSubmitCode;
