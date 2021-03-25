const makeAndExcuteSolutionFunc = (funcArgs, funcBody, tests) => {
  const testResults = [];

  const solutionFunc = new Function(...funcArgs, funcBody)
    .toString()
    .replace("function anonymous", "function solution");

  tests.forEach((test) => {
    const executionFuncBody = solutionFunc.concat(" return ", test.code);
    const executionFunc = new Function(executionFuncBody);

    if (executionFunc() === test.solution) {
      testResults.push(true);
      return;
    }

    testResults.push(false);
  });

  return testResults;
};

module.exports = makeAndExcuteSolutionFunc;
