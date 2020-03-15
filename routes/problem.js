const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const vm = require('vm');
const router = express.Router();

const pagePermissions = require('../middlewares/pagePermissions');
const Problem = require('../models/Problem');
const ERROR_NAME = require('../constants/errorName');

router.get('/:problem_id', pagePermissions.privatePage, async (req, res, next) => {
  const {
    params: { problem_id: problemId }
  } = req;

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
  const failure = {};
  let isTestNotPassed = false;

  try {
    if (!userSolutionString) {
      failure.message = 'Solution 함수를 작성해주세요.';
      return res.render('failure', { failure, problemId });
    }

    const problem = await Problem.findOne({ id: problemId });
    const solutionTestList = problem.tests;

    for (let i = 0; i < solutionTestList.length; i++) {
      try {
        const context = Object.create(null);
        context.vmParameter = solutionTestList[i].code_params;
        vm.createContext(context);
        const userSolutionValue = vm.runInContext(`(${userSolutionString})(vmParameter)`, context, { timeout: 2000 });

        if (userSolutionValue !== solutionTestList[i].solution) {
          failure.message = '테스트를 통과하지 못했어요.';
          failure.testCase = solutionTestList[i].code_params;
          isTestNotPassed = true;
          break;
        }
      } catch (failure) {
        failure.message = failure.message ? failure.message : '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.';
        res.render('failure', { failure, problemId });
        return;
      }
    }

    if (isTestNotPassed) {
      res.render('failure', { failure, problemId });
    } else {
      await problem.save();
      problem.completed_users += 1;
      res.render('success');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

module.exports = router;
