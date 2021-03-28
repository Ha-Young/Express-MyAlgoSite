const { VM } = require("vm2");

const checkTestResult = require("./checkTestResult");

function testUserSubmitCode(submitCode, testCases) {
  const vm = new VM({
    sandbox: {},
    timeout: 10000,
    fixAsync: true,
    wasm: false,
  });

  const resultList = testCases.map(testCase => {
    try {
      const result = vm.run(
        `solution = ${submitCode}

        ${testCase.code};`
      );

      return checkTestResult(result, testCase);
    } catch (userSolutionError) {
      return {
        error: userSolutionError.message,
      };
    }
  });

  return resultList;
}

module.exports = testUserSubmitCode;
