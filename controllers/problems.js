const vm = require('vm');

const Problem = require('../models/Problem');

exports.getAll = async (req, res, next) => {
  try {
    const problems = await Problem.find().sort({ id: 1 }).lean();
    return res.render('index', { title: 'MAIN', problems });
  } catch (err) {
    next(err);
  }
};

exports.getProblem = async (req, res, next) => {
  const { problem_id } = req.params;

  try {
    const problem = await Problem.findOne({ id: problem_id });

    if (!problem) {
      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }

    return res.render('problem', { title: 'Problem', problem });
  } catch (err) {
    next(err);
  }
};

exports.postProblem = async (req, res, next) => {
  const { problem_id } = req.params;
  const { usercode } = req.body;

  try {
    const problem = await Problem.findOne({ id: problem_id });
    const results = checkUserSolution(usercode, problem.tests);
    console.log('📌 : exports.postProblem -> results', results);
    const isSuccess = results.every(result => result.isCorrect);

    if (isSuccess) {
      res.render('success', { title: '✨Success✨', problem, usercode });
    } else {
      res.render('failure', { title: '🤦‍♀️Failure🤦‍♂️', problem, usercode });
    }
  } catch (err) {
    next(err);
  }
};

class SolutionResult {
  constructor(userResult, correctResult, error) {
    this.userResult = userResult;
    this.correctResult = correctResult;
    this.error = error;
    this.isCorrect = this.compare();
  }

  compare() {
    return this.userResult === this.correctResult;
  }
}

function checkUserSolution(code, tests = []) {
  const logs = [];

  for (const test of tests) {
    const { code: executionCommand, solution: correctResult } = test;
    const script = new vm.Script(code + executionCommand);

    try {
      const userResult = script.runInNewContext({}, { timeout: 1000 });
      logs.push(new SolutionResult(userResult, correctResult));
    } catch (error) {
      const { name, message } = error;
      logs.push(new SolutionResult(null, correctResult, `${name}: ${message}`));
    }
  }

  return logs;
}
