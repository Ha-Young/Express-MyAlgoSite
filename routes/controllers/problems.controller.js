const createError = require('http-errors');
const _ = require('lodash');
const User = require('../../models/User');
const Problem = require('../../models/Problem');
const util = require('./util');

exports.getAll = async (req, res, next) => {
  try {
    const problems = await Problem.find().sort({ difficultyLevel: 1 });
    if (!problems) return next(createError(404, 'Problem Not Found'));

    const userInfo = await User.findById({ _id: req.user._id }).populate('solved');
    const processedInfo = util.getUserinfo(userInfo);
    res.render('index', { processedInfo, problems });
  } catch (err) {
    next(err);
  }
}

exports.getSelectedProblem = async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const problem = await Problem.findById({ _id: problemId });
    if (!problem) return next(createError(404, 'Problem Not Found'));

    const userInfo = await User.findById({ _id: req.user._id }).populate('solved');
    const processedInfo = util.getUserinfo(userInfo);
    res.render('problem', { processedInfo, problem: [problem] });
  } catch (err) {
    next(err);
  }
}

exports.solvedSelectedProblem = async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const problem = await Problem.findById({ _id: problemId });
    if (!problem) return next(createError(404, 'Problem Not Found'));
    
    const tests = problem.tests;
    try {
      const results = util.excuteCode(tests, req.body.solution);
      const isValid = results.every((result) => _.isEqual(result[0], result[1]));

      if (!isValid) {
        return res.render('failure', { message: 'Fail! Try again! :)', stack: undefined, results });
      } else {
        const isSolvedUser = req.user.solved.some((test) => test.toString() === problemId);
        if (!isSolvedUser) {
          await util.updateProblemRecords(problemId, problem.completedUsers);
          await util.updateUserRecords(req.user._id, problemId);
        }
        res.render('success', { message: 'Success :)', results });
      }
    } catch (err) {
      res.render('failure', { message: err.message, stack: err.stack, results: undefined });
    }
  } catch (err) {
    next(err);
  }
}
