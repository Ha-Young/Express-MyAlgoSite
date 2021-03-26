const vm = require("vm");

function judgeSolution (testcases, solution) {
  let passed = true;
  const testcaseResult = [];

  for (let i = 0; i < testcases.length; i++) {
    const code = testcases[i].code;
    const answer = testcases[i].solution;

    try {
      const sandbox = { result: "" };
      const context = vm.createContext(sandbox);
      const script = new vm.Script(solution + "result=" + code);

      script.runInContext(context);

      if (sandbox.result !== answer) {
          passed = false;
      }

      testcaseResult.push({
          code: code,
          expected: answer,
          result: sandbox.result,
          passed: answer === sandbox.result
        });
    } catch (error) {
      return {error: error};
    }
  }

  return { passed: passed, testcaseResult: testcaseResult };
}

exports.judgeSolution = judgeSolution;
