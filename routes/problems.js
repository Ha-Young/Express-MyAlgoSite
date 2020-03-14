const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const { VM, VMScript } = require('vm2');
const vm = new VM({
  timeout: 10000,
  sandbox: {}
});

router.get('/:problem_id', async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const problem = await Problem.find({ id: problemId });
    res.render('problems', { problem: problem[0] });
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

router.post('/:problem_id', async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const problem = await Problem.find({ id: problemId });
    const tests = problem[0].tests;
    const userSolution = req.body.solution;
    const failureList = [];

    try {
      tests.forEach(test => {
        const script = new VMScript(`${userSolution} ${test.code}`, 'vm.js');
        const userAnswer = vm.run(script);

        if (JSON.stringify(userAnswer) !== JSON.stringify(test.answer)) {
          failureList.push({
            case: test.code,
            expected: test.answer,
            result: userAnswer || 'undefined'
          });
        }
      });
    } catch (err) {
      failureList.push({
        error: err.message
      });
    }

    if (failureList.length) {
      res.render('failure', { failureList });
    } else {
      res.render('success');
    }
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

module.exports = router;
