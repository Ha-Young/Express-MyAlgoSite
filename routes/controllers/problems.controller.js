const mongoose = require('mongoose');
const createError = require('http-errors');
const _ = require('lodash');
const Problem = require('../../models/Problem');
const util = require('./util');

exports.getAll = async (req, res, next) => {
  try {
    const problems = await Problem.find().sort({ difficultyLevel: 1 });
    if (!problems) return next(createError(404, 'Problem Not Found'));

    res.render('index', { user: [req.user], problems });
  } catch (err) {
    next(err);
  }
}

exports.getSelectedProblem = async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const isValidProblem = mongoose.Types.ObjectId.isValid(problemId);
    if (!isValidProblem) return next(createError(404, 'Problem Not Found'));

    const problem = await Problem.find({ _id: problemId });
    res.render('problem', { user: [req.user], problem });
  } catch (err) {
    next(err);
  }
}

exports.solvedSelectedProblem = async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const isValidProblem = mongoose.Types.ObjectId.isValid(problemId);
    if (!isValidProblem) return next(createError(404, 'Problem Not Found'));

    const problem = await Problem.find({ _id: problemId });
    const tests = problem[0].tests;
    try {
      const results = util.excuteCode(tests, req.body.solution);
      const isValid = results.every((result) => _.isEqual(result[0], result[1]));

      if (!isValid) {
        return res.render('failure', { message: 'Fail! Try again! :)', stack: undefined, results });
      } else {
        const isSolvedUser = req.user.solved.some((test) => test.toString() === problemId);
        if (!isSolvedUser) {
          const { _id, solvedAllCount, solvedLevelOne, solvedLevelTwo, solvedLevelThree } = req.user;
          const problemLevel = problem[0].difficultyLevel;

          await util.updateProblemRecords(problemId, problem[0].completedUsers);
          const updatedUser = await util.updateUserRecords(_id, problemLevel, solvedAllCount, solvedLevelOne, solvedLevelTwo, solvedLevelThree);
          updatedUser.solved.push(problemId);
          await updatedUser.save();
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
