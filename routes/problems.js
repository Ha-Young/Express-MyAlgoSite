const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const util = require('util');
const vm = require('vm');

router.get('/:problem_id',
  function (req, res, next) {
    Problem.findOne({ _id: req.params.problem_id }, function(err, problem) {
      try {
        res.render('problem', { user: req.user, problem });
      } catch (err) {
        res.next();
      }
    });
  }
);

router.post('/:problem_id',
  function (req, res, next) {
    Problem.findOne({ _id: req.params.problem_id }, function(err, problem) {
      try {
        const code = req.body.code;
        if(code) {
          const result = [];
          let isPassed = true;
          const sandbox = {};
          for (var i = 0; i < problem.tests.length; i++) {
            const script = new vm.Script(`
              ${code}
              ${problem.tests[i].code}
            `);
            const context = vm.createContext(sandbox);
            const invoke = script.runInContext(context, { timeout: 500 });
            if (invoke === problem.tests[i].solution) {
              result.push({isAnswer: true, insteadGot: String(invoke), expected: problem.tests[i].solution });
            } else {
              isPassed = false;
              result.push({isAnswer: false, insteadGot: String(invoke), expected: problem.tests[i].solution });
            }
          }
          isPassed ? res.render('success') : res.render('failure', { error: null, result });
        } else {
          res.render('failure', { error: 'solution이 없습니다!', result: [] });
        }
      } catch (err) {
        res.render('failure', { error: err.stack, result: [] });
      }
    });
  }
);

module.exports = router;
