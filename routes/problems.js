const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const vm = require('vm');

router.get('/:problem_id', async (req, res) => {
  try {
    const problem = await Problem.findOne({ id: req.params.problem_id });

    res.render('problem', {
      user: req.user.username,
      problem
    });
  } catch (err) {
    console.error(err);
  }
});

router.post('/:problem_id', async (req, res, next) => {
  const problemId = req.params.problem_id;
  const problem = await Problem.findOne({ id: problemId });
  const wrongProblem = [];
  const solution = req.body.problem_solution;
  console.log(solution)
  const context = { solution };
  vm.createContext(context);

  try {
    problem.tests.forEach((testCode, index) => {
      const script = new vm.Script(`${solution} ${testCode.code}`);
      const clientResult = script.runInContext(context);
      const result = testCode.solution;

      if (result !== clientResult) {
        wrongProblem.push({
          testNo: index + 1,
          clientResult,
          result,
        });
      }
    });
  } catch (err) {
    res.render('failure', {
      user: req.user.username,
      wrongProblem: null,
      error: err,
      problemId: req.params.problem_id
    });
  }

  if (wrongProblem.length) {
    res.locals.wrongProblem = wrongProblem;
    res.render('failure', {
      user: req.user.username,
      wrongProblem,
      problemId
    });
  } else {
    res.render('success', { user: req.user.username });
  }
});

module.exports = router;
