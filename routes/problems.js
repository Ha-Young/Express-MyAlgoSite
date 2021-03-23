const express = require('express');
const { NodeVM } = require('vm2');
const router = express.Router();
const { verifyUser } = require('./middlewares/verifyUser');
const Problem = require('../models/Problem');
const creatError = require('http-errors');

router.get('/', verifyUser, (req, res, next) => {
  res.render('problem');
});

router.get('/:problem_id', verifyUser, async (req, res, next) => {
  try {
    const targetProblemId = parseInt(req.params['problem_id']);
    const targetProblem = await Problem.findOne({ id: targetProblemId });

    res.status(200).render('problem', { problem: targetProblem });
  } catch (err) {
    next(creatError(400, err));
  }
});

router.post('/:problem_id', verifyUser, async (req, res, next) => {
  const targetProblemId = parseInt(req.params['problem_id']);
  let targetProblem;

  try {
    targetProblem = await Problem.findOne({ id: targetProblemId });
  } catch (err) {
    next(creatError(400, err));
  }

  const userSolution = req.body.solution;
  const judgeResult = [];
  const vm = new NodeVM({
      console: 'inherit',
      sandbox: {
        tests: targetProblem.tests,
        judgeResult,
      }
  });

  try {
    vm.run(`
      ${userSolution}

      for (let i = 0; i < tests.length; i++) {
        if (eval(tests[i].code) !== tests[i].solution) {
          judgeResult.push(false);
        } else {
          judgeResult.push(true);
        }
      }
    `);
  } catch (err) {
    return res.render('failure', { err, targetProblemId, failTests: targetProblem.tests });
  }

  if (judgeResult.every(result => result === true)) {
    res.render('success');
  } else {
    const failTests = [];

    judgeResult.forEach((result, index) => {
      if (result === false) {
        failTests.push(targetProblem.tests[index]);
      }
    });

    res.render('failure', { failTests, targetProblemId, err: null });
  }
});

module.exports = router;
