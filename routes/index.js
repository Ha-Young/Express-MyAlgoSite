const express = require('express');
const mongoose = require('mongoose');
const vm = require('vm');
const router = express.Router();
const Problem = require('../models/Problem');

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.render('login');
  } else {
    Problem.find({}, function(err, problems) {
      res.render('index', {
        problem: null,
        user: req.user,
        problems
      });
    });
  }
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: '로그인' });
});

router.get('/problems/:problem_id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.problem_id)) {
    return next();
  }
  Problem.findOne({ _id: req.params.problem_id }, function(err, problem) {
    if (!err) {
      res.render('problem', {
        problem,
        user: req.user
      });
    } else {
      next(err);
    }
  });
});

router.post('/problems/:problem_id', (req, res, next) => {
  const userCode = req.body.code;

  Problem.findOne({ _id: req.params.problem_id }, function(err, problem) {
    try {
      if (userCode.indexOf('function solution') === 0) {
        let hasWrongAnswer = false;
        const results = problem.tests.map(el => {
          const sandbox = {};
          const codes = userCode + el.code;
          vm.createContext(sandbox);
          const script = new vm.Script(codes);
          const userCodeValue = script.runInContext(sandbox, { timeout: 500 });
          const isAnswer = userCodeValue === el.solution ? true : false;
          if (!hasWrongAnswer && !isAnswer) {
            hasWrongAnswer = true;
          }
          return {
            code: el.code,
            isAnswer,
            insteadGot: userCodeValue,
            expected: el.solution
          };
        });

        hasWrongAnswer
          ? res.render('failure', { errorMessage: null, results })
          : res.render('success', { results });
      } else {
        res.render('failure', {
          errorMessage: 'user의 코드에 function solution이 없습니다',
          results: []
        });
      }
    } catch (err) {
      res.render('failure', { errorMessage: err.stack, results: [] });
    }
  });
});

module.exports = router;
