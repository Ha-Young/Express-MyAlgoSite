const Problem = require('../models/Problem');
const functionalize = require('../utils/functionalize');

exports.getProblem = async (req, res, next) => {
  const { problem_id } = req.params;
  const currentProblem = await Problem.findById(problem_id);

  res.render('problem', { currentProblem, error: '' });
};

exports.checkProblem = async (req, res, next) => {
  const { problem_id } = req.params;
  const { submission: submissionCode } = req.body;
  const testResults = [];
  let solution;
  let testCases;
  let isTestPassed = true;

  try {
    solution = functionalize(submissionCode);
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
    const excuteStatement = testCase.code;
    const testAnswer = testCase.solution;
    let userAnswer;
    let resultEmoji;

    try {
      userAnswer = new Function('solution', `return ${excuteStatement}`)(
        solution
      );
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

  if (isTestPassed) return res.render('success', { testResults });

  res.render('failure', { testResults, error: '', problem_id });
};
