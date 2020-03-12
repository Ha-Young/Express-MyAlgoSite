const vm = require('vm');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const createError = require('http-errors');
const _ = require('lodash');
const User = require('../models/User');
const Problem = require('../models/Problem');
const { ensureAuthenticated } = require('./middlewares/authorization');

router.get('/', ensureAuthenticated, async (req, res, next) => {
  try {
    const problems = await Problem.find();
    if (!problems) return next(createError(404, 'Problem Not Found'));

    problems.sort((a, b) => a.difficultyLevel - b.difficultyLevel);
    res.render('index', { user: [req.user], problems });
  } catch (err) {
    next(err);
  }
});

router.get('/:problem_id', ensureAuthenticated, async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const isValidProblem = mongoose.Types.ObjectId.isValid(problemId);
    if (!isValidProblem) return next(createError(404, 'Problem Not Found'));

    const problem = await Problem.find({ _id: problemId });
    res.render('problem', { user: [req.user], problem });
  } catch (err) {
    next(err);
  }
});

router.post('/:problem_id', ensureAuthenticated, async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const isValidProblem = mongoose.Types.ObjectId.isValid(problemId);
    if (!isValidProblem) return next(createError(404, 'Problem Not Found'));
    
    const problem = await Problem.find({ _id: problemId });
    const tests = problem[0].tests;
    const results = [];
    try {
      tests.forEach(test => {
        const code = `
          ${req.body.solution}
          ${test.code}
        `
        const script = new vm.Script(code);
        const { solution } = test;
        const result = script.runInNewContext();
        results.push([solution, result]);
      });
      const isValid = results.every((result) => {
        return _.isEqual(result[0], result[1]);
      });

      if (!isValid) {
        return res.render('failure', { message: 'Fail! Try again! :)', stack: undefined, results });
      } else {
        const user = req.user;
        const isSolvedUser = user.solved.some((test) => test.toString() === problemId);
        if (!isSolvedUser) {
          const completedUsers = problem[0].completedUsers + 1;
          await Problem.findOneAndUpdate({ _id: problemId }, { completedUsers });

          const solvedAllCount = user.solvedAllCount + 1;
          let { _id, solvedLevelOne, solvedLevelTwo, solvedLevelThree } = req.user;
          const problemLevel = problem[0].difficultyLevel;

          let updatedUser = null;
          if (problemLevel === 1) {
            solvedLevelOne++;
            updatedUser = await User.findOneAndUpdate({ _id }, { solvedAllCount, solvedLevelOne, });
          } else if (problemLevel === 2) {
            solvedLevelTwo++;
            updatedUser = await User.findOneAndUpdate({ _id }, { solvedAllCount, solvedLevelTwo });
          } else {
            solvedLevelThree++;
            updatedUser = await User.findOneAndUpdate({ _id }, { solvedAllCount, solvedLevelThree });
          }
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
});

module.exports = router;
