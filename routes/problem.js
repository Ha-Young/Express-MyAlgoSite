const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const vm = require('vm');
const router = express.Router();

const pagePermissions = require('../middlewares/pagePermissions');
const Problem = require('../models/Problem');
const ERROR_NAME = require('../constants/errorName');

router.get('/:problem_id', pagePermissions.privatePage, async (req, res, next) => {
  const { params: { problem_id: problemId }} = req;

  try {
    const problem = await Problem.findOne({ id: problemId });

    if (!problem) {
      const error = new Error('페이지를 찾을 수 없습니다.');
      error.status = 404;
      throw error;
    }

    res.render('problem', { problem });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = new Error('페이지를 찾을 수 없습니다.');
      error.status = 404;
      return next(error);
    }

    next(error);
  }
});

router.post('/:problem_id', pagePermissions.privatePage, async (req, res, next) => {
  const {
    params: { problem_id: problemId },
    body: { 'user-solution': userSolutionString }
  } = req;

  try {
    if (!userSolutionString) {
      const error = new Error('Solution함수를 작성해주세요.');
      error.name = ERROR_NAME.NOT_EXISTED_SOLUTION;
      throw error;
    }

    const problem = await Problem.findOne({ id: problemId });
    const solutionTestList = problem.tests;

    solutionTestList.forEach(testCase => {
      const context = Object.create(null);
      context.vmParameter = testCase.code_params;
      vm.createContext(context);
      const userSolutionValue = vm.runInContext(`(${userSolutionString})(vmParameter)`, context, { timeout: 2000 });

      if (userSolutionValue !== testCase.solution) {
        const error = new Error('해당 테스트를 통과하지 못했어요.');
        error.name = ERROR_NAME.FAILED_TEST;
        error.testCase = testCase.code_params;
        throw error;
      }
    });

    problem.completed_users += 1;
    await problem.save();
    res.render('success');
  } catch (error) {
    switch (error.name) {
      case 'EvalError':
        res.render('failure', { error, problemId });
        break;

      case 'InternalError':
        res.render('failure', { error, problemId });
        break;

      case 'RangeError':
        res.render('failure', { error, problemId });
        break;

      case 'ReferenceError':
        res.render('failure', { error, problemId });
        break;

      case 'SyntaxError':
        res.render('failure', { error, problemId });
        break;

      case 'TypeError':
        res.render('failure', { error, problemId });
        break;

      case 'URIError':
        res.render('failure', { error, problemId });
        break;

      case ERROR_NAME.NOT_EXISTED_SOLUTION:
        res.render('failure', { error, problemId });
        break;

      case ERROR_NAME.FAILED_TEST:
        res.render('failure', { error, problemId });
        break;

      default:
        next(error);
        break;
    }
  }
});

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

module.exports = router;
