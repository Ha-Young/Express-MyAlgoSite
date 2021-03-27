const vm = require("vm");

exports.runCodemirrorCode = function(codemirrorText, testcaseCode) {
  try {
    const totalRunningCode = codemirrorText + testcaseCode;
    const context = vm.createContext();
    const script = new vm.Script(totalRunningCode);
    const resultCode = script.runInContext(context, { timeout: 3000 });

    return resultCode;
  } catch (err) {
    resultCode = err;
    return resultCode;
  }
};

exports.determinePassStatus = function(codeRunningResult, testcaseSolution) {
  return codeRunningResult === testcaseSolution ? true : false;
};

exports.checkAllTestcasePassed = function(totalTestcaseResult) {
  return totalTestcaseResult.every((testcase) => testcase.isPassed === true);
};

exports.isDuplicatedProblem = function(solvedProblems, problemObjectId) {
  return solvedProblems.findIndex(
    problem => String(problem.solvedProblemObjectId) === String(problemObjectId)) !== -1;
};
