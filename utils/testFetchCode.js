const { VM } = require("vm2");

const validationResult = require("./validationResult");

function runVMTest(fetchCode, runningCodes) {
  const vm = new VM({
    sandbox: {},
    timeout: 10000,
    fixAsync: true,
    wasm: false,
  });

  let resultList = [];

  for (let i = 0; i < runningCodes.length; i++) {
    const runningCode = runningCodes[i];

    try {
      const result = vm.run(
        `solution = ${fetchCode};

        ${runningCode.code}`
      );

      resultList.push(validationResult(result, runningCode));
    } catch (userSolutionError) {
      return userSolutionError.message;
    }
  }

  return resultList;
}

module.exports = runVMTest;
