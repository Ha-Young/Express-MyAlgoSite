const express = require('express');
const router = express.Router();
const vm = require('vm');
const Problem = require('../models/Problem');

router.get('/', async function (req, res, next) {
  try {
    const problemList = await Problem.find();

    return res.render('index', {
      problemList: problemList
    });
  } catch (err) {
    next(err);
  }
})

router.get('/:problem_id', async function (req, res, next) {
  try {
    const problemId = req.params.problem_id;
    const problem = await Problem.findOne({ id: problemId });

    return res.render('problem', {
      problem: problem
    });
  } catch (err) {
    next(err);
  }
});

router.post('/:problem_id', async function (req, res, next) {
  let problem;
  let inputStringCode;

  try {
    const problemId = req.params.problem_id;
    problem = await Problem.findOne({ id: problemId });
    inputStringCode = req.body.code;
  } catch (err) {
    next(err);
  }

  for (let i = 0; i < problem.tests.length; i++) {
    const { code, solution } = problem.tests[i];
    const context = { inputAnswer: null };

    let answer;
    let problemAnswer;

    try {
      const inputFunction = new vm.Script(inputStringCode + `inputAnswer = ${code}`);

      vm.createContext(context);
      inputFunction.runInContext(context);

      answer = context.inputAnswer;
      problemAnswer = solution;
    } catch (err) {
      return res.render('error', {
        errorMessage: err.message
      });
    }

    if (answer !== problemAnswer) {
      return res.render('failure', {
        failureProblem: problem
      });
    }
  }

  return res.render('success', {
    correctProblem: problem
  });
});

module.exports = router;
