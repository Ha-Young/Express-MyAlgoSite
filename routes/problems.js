const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const vm = require('vm');
const mongoose = require('mongoose');

router.get('/:problem_id', function(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.problem_id)) {
    return next();
  }
  Problem.findOne({ _id: req.params.problem_id }, function(err, problem) {
    if (!err) {
      res.render('problem', { user: req.user, problem });
    } else {
      next(err);
    }
  });
});

router.post('/:problem_id', function(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.problem_id)) {
    return next();
  }
  Problem.findOne({ _id: req.params.problem_id }, function(err, problem) {
    if (!err) {
      try {
        const code = req.body.code;
        if (code) {
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
              result.push({
                isAnswer: true,
                insteadGot: String(invoke),
                expected: problem.tests[i].solution
              });
            } else {
              isPassed = false;
              result.push({
                isAnswer: false,
                insteadGot: String(invoke),
                expected: problem.tests[i].solution
              });
            }
          }
          isPassed
            ? res.render('success')
            : res.render('failure', { error: null, result, user: req.user });
        } else {
          res.render('failure', {
            error: 'solution이 없습니다!',
            result: [],
            user: req.user
          });
        }
      } catch (err) {
        res.render('failure', { error: err.stack, result: [], user: req.user });
      }
    } else {
      next(err);
    }
  });
});

module.exports = router;
