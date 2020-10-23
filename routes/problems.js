const express = require('express');
const router = express.Router();
const vm = require('vm');
const Problem = require('../models/Problem');

router.get('/:problem_id', async function (req, res, next) {
  try {
    const problemList = await Problem.find();
    const problemId = req.params.problem_id;
    const problem = problemList.find(item => item.id === problemId);

    return res.render('problem', {
      problem: problem
    });
  } catch (err) {
    return res.status(400).json({
      error: 'error'
    });
  }
});

router.post('/:problem_id', async function (req, res, next) {
  try {
  const problemId = req.params.problem_id;
  const problem = await Problem.findOne({ id: problemId });
  const inputStringCode = req.body.code;

  for (let i = 0; i < problem.tests.length; i++) {
    let { code, solution } = problem.tests[i];
    let context = { inputAnswer: null }
    let inputFunction = new vm.Script(inputStringCode + `inputAnswer = ${code}`);

    vm.createContext(context);
    inputFunction.runInContext(context);

    let answer = context.inputAnswer;
    let problemAnswer = solution;

    if (answer !== problemAnswer) {
      return res.render('failure', {
        failureProblem: problem
      });
    }
  }

  return res.render('success', {
    correctProblem: problem
  });
  } catch (err) {
    return res.render('error', {
      errorMessage: err.message
    });
  }
});

module.exports = router;
