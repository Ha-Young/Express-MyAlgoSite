const { VM } = require('vm2');

exports.runCodeInVM = function (solution, tests) {
  const testResults = [];
  const vm = new VM({
    timeout: 500,
    sandbox: {
      tests,
      testResults
    }
  });

  try {
    vm.run(`
      ${solution}

      for (let i = 0; i < tests.length; i++) {
        const actualReturn = eval(tests[i].code);

        if (actualReturn === tests[i].solution) {
          testResults.push({ actualReturn, result: true});
        } else {
          testResults.push({ actualReturn, result: false});
        }
      }
    `);

    return { testResults };
  } catch (err) {
    return { err };
  }
}
