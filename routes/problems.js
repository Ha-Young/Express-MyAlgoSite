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
  try {
    const problemId = req.params.problem_id;
    const problem = await Problem.findOne({ id: problemId });
    const wrongProblem = [];
    const solution = req.body.problem_solution;
    const context = { solution };
    vm.createContext(context);

    problem.tests.forEach((testCode, index) => {
      try {
        const script = new vm.Script(`${solution} ${testCode.code}`);
        const result = testCode.solution;
        const clientResult = script.runInContext(context);

        if (result !== clientResult) {
          wrongProblem.push({
            testNo: index + 1,
            result,
            clientResult,
          });
        }
      } catch (err) {
        res.render('failure', {
          user: req.user.username,
          wrongProblem: null,
          error: err,
          problemId: req.params.problem_id
        });
        return
      }
    });

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
  } catch (err) {
    err.status = 500;
    err.message = 'Internal Server Error';
    next(err);
  }
});

module.exports = router;
