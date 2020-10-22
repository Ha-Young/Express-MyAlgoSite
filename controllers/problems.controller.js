const Problem = require('../models/Problem');
const vm = require('vm');

exports.getProblem = async (req, res, next) => {
  const { problem_id } = req.params;
  const currentProblem = await Problem.findById(problem_id);

  res.render('problem', { currentProblem, error: '' });
};

exports.checkAnswer = async (req, res, next) => {
  const { problem_id } = req.params;
  const { submission: submissionCode } = req.body;
  const testResults = [];
  const context = {};
  let testCases;
  let isTestPassed = true;

  vm.createContext(context);

  try {
    const functionMakingScript = new vm.Script(submissionCode);
    functionMakingScript.runInContext(context);
  } catch (error) {
    const currentProblem = await Problem.findById(problem_id);
    res.render('failure', { currentProblem, error, submissionCode });
    return;
  }

  try {
    const problemData = await Problem.findById(problem_id);
    testCases = problemData.tests;
  } catch (error) {
    next(error);
    return;
  }

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    const funcToBeExecuted = testCase.code;
    const testAnswer = testCase.solution;
    let userAnswer;
    let resultEmoji;

    try {
      const functionExcutingScript = new vm.Script(funcToBeExecuted);
      userAnswer = functionExcutingScript.runInContext(context);
    } catch (error) {
      const currentProblem = await Problem.findById(problem_id);
      res.render('failure', { currentProblem, error, submissionCode });
      return;
    }

    if (userAnswer !== testAnswer) {
      isTestPassed = false;
      resultEmoji = '❌';
    } else {
      resultEmoji = '⭕️';
    }

    testResults.push({ userAnswer, testAnswer, resultEmoji });
  }

  if (isTestPassed) {
    return res.render('success', { testResults });
  }

  res.render('failure', { testResults, error: '', problem_id });
};
