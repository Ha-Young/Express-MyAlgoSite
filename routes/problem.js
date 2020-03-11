const vm = require('vm');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const createError = require('http-errors');
const Problem = require('../models/Problem');
const { ensureAuthenticated } = require('./middlewares/authorization');

router.get('/', ensureAuthenticated, async (req, res, next) => {
  try {
    if (req.user) {
      const problems = await Problem.find();
      if (problems) {
        problems.sort((a, b) => a.difficulty_level - b.difficulty_level);
        res.render('index', { user: [req.user], problems });
      } else {
        next(createError(404, 'Problem Not Found'));
      }
    } else {
      next(createError(404, 'User Not Found'));
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:problem_id', ensureAuthenticated, async (req, res, next) => {
  try {
    if (req.user) {
      const problemId = req.param('problem_id');
      if (mongoose.Types.ObjectId.isValid(problemId)) {
        const problem = await Problem.find({ _id: problemId });
        res.render('problem', { user: [req.user], problem });
      } else {
        next(createError(404, 'Problem Not Found'));
      }
    } else {
      next(createError(404, 'User Not Found'));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/:problem_id', ensureAuthenticated, async (req, res, next) => {
  try {
    if (req.user) {
      const problemId = req.param('problem_id');
      if (mongoose.Types.ObjectId.isValid(problemId)) {
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
            results.push(script.runInNewContext());
          });
          const isValid = results.every((result, index) => {
            return result === tests[index].solution;
          });
          console.log("results", results);
          if(isValid) {
            //현재 유저에게 완료한 문제 표시.
            //문제에게 완료 숫자 올려주기.
            //문제 예상답변이랑 결과랑 비교하기
            res.render('success', { message: 'Success! :)' });
          } else {
            //몇번 문제가 틀렸는지 알려주기
            res.render('failure', { message: 'Fail! Try again! :)', stack: undefined });
          }
        } catch(err) {
          res.render('failure', { message: err.message, stack: err.stack });
        }
      } else {
        next(createError(404, 'Problem Not Found'));
      }
    } else {
      next(createError(404, 'User Not Found'));
    }
  } catch(err) {
    next(err);
  }
});

module.exports = router;

// [ { code: 'solution(2)', solution: 'Even' },
//   { code: 'solution(0)', solution: 'Even' },
//   { code: 'solution(3)', solution: 'Odd' },
//   { code: 'solution(1)', solution: 'Odd' } ]

// function solution(a) {
// 	if(a % 2 === 0) {
//     return 'Even'
//   } else {
//   	return 'Odd';
//   }
// }
