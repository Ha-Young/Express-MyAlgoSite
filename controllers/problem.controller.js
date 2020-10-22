/* eslint-disable no-unused-vars */
const Problem = require('../models/Problem');
const vm = require('vm');
const { checkAllPass, getCount } = require('../helpers/hepler');

exports.getAll = async (req, res, next) => {
  const avatar = req.user.avatar;
  const username = req.user.username;

  try {
    const problems = await Problem.find().lean();

    res.render('index', {
      problems: problems,
      username: username,
      avatar: avatar,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  const avatar = req.user.avatar;
  const username = req.user.username;
  const id = req.params.problem_id;

  try {
    const problem = await Problem.findOne({ id });

    res.render('problem', {
      problem: problem,
      username: username,
      avatar: avatar,
    });
  } catch (err) {
    next(err);
  }
};

exports.getResult = async (req, res, next) => {
  const id = req.params.problem_id;
  const script = req.body.script;

  try {
    const problem = await Problem.findOne({ id });
    const { tests: solutions, completed_users: userCount, _id } = problem;
    const newUserCount = userCount + 1;
    let testResults;

    try {
      testResults = solutions.map(test => {
        const excutionSyntax = test.code;
        const answer = test.solution;
        const code = `
          ${script}
          ${excutionSyntax};
        `;
        const userAttempt = new vm.Script(code, { timeout: 8000 });
        const context = vm.createContext({});

        return userAttempt.runInContext(context) === answer;
      });
    } catch (err) {
      return res.render('failure', {
        results: err.message,
        solutions: err.message,
        count: err.message,
        problem: problem,
      });
    }

    const allPass = testResults.every(checkAllPass);
    const correctCount = getCount(testResults);

    if (allPass) {
      await Problem.findByIdAndUpdate(
        _id,
        { completed_users: newUserCount },
        { new: true },
      );

      res.render('success', {
        problem: problem,
      });
    } else {
      res.render('failure', {
        results: testResults,
        solutions: solutions,
        count: correctCount,
        problem: problem,
      });
    }
  } catch (err) {
    next(err);
  }
};
