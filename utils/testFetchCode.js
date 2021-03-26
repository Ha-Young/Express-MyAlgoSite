const { VM } = require("vm2");

const validationResult = require("./validationResult");

function testFetchCode(fetchedCode, testCases) {
  const vm = new VM({
    sandbox: {},
    timeout: 10000,
    fixAsync: true,
    wasm: false,
  });

  let resultList = [];

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];

    try {
      const result = vm.run(
        `solution = ${fetchedCode};

        ${testCase.code};`
      );

      resultList.push(validationResult(result, testCase));
    } catch (userSolutionError) {
      return {
        error: userSolutionError.message,
      };
    }
  }

  return resultList;
}

module.exports = testFetchCode;
