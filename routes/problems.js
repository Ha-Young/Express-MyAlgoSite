const express = require('express');
const { NodeVM } = require('vm2');
const router = express.Router();
const { verifyUser } = require('./middlewares/verifyUser');
const Problem = require('../models/Problem');

router.get('/', verifyUser, (req, res, next) => {
  res.render('problem');
});

router.get('/:problem_id', verifyUser, async (req, res, next) => {
  const targetProblemId = parseInt(req.params['problem_id']);

  const targetProblem = await Problem.findOne({ id: targetProblemId });

  res.status(200).render('problem', { problem: targetProblem });
});

router.post('/:problem_id', verifyUser, async (req, res, next) => {
  const targetProblemId = parseInt(req.params['problem_id']);
  const targetProblem = await Problem.findOne({ id: targetProblemId });
  const userSolution = req.body.solution;
  const judgeResult = {};

  const vm = new NodeVM({
      console: 'inherit',
      sandbox: {
        tests: targetProblem.tests,
        judgeResult,
      },
      require: {
        builtin: ['*'],
      },
  });

  try {
    vm.run(`
      ${userSolution}

      for (const test of tests) {
        console.log(eval(test.code))
        console.log(test.solution)
        if (eval(test.code) !== test.solution) {
          judgeResult[test.code] = false;
        } else {
          judgeResult[test.code] = true;
        }
      }
    `);
  } catch (err) {
    console.log(err);
  }

  res.render('success', { solution: userSolution })
});

module.exports = router;
