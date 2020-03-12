const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const vm = require('vm');

router.get('/:problem_id', async (req, res) => {
  try {
    const problem = await Problem.findOne({ id: req.params.problem_id });
    console.log(problem);

    res.render('problem', {
      title: "problem",
      user: req.user.username,
      problem
    });
  } catch (err) {
    console.error(err);
  }
});

router.post('/:problem_id', async (req, res) => {
  const problem = await Problem.findOne({ id: req.params.problem_id });
  const wrongProblem = [];
  const solution = req.body.problem_solution;
  const context = { solution: req.body.problem_solution };
  vm.createContext(context);

  problem.tests.forEach((testCode, index) => {
    const script = new vm.Script(`${solution} ${testCode.code}`);
    const clientResult = script.runInContext(context);
    const result = testCode.solution;

    if (result !== clientResult) {
      wrongProblem.push({
        number: index + 1,
        clientResult: clientResult,
        result: testCode.solution
      });
    }
  });

  
  // console.log(wrongProblem);
});

module.exports = router;
