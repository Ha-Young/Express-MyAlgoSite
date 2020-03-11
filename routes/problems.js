const express = require('express');
const Problem = require('../models/Problem');
const router = express.Router();

/* GET home page. */

router.get('/:problem_id', async (req, res) => {
  const problem = (await Problem.find({ id: req.params.problem_id }))[0];
  res.render('problem', {
    problem
  });
});

router.post('/:problem_id', async (req, res) => {
  const problem = (await Problem.find({ id: req.params.problem_id }))[0];
  const solution = eval(`(${req.body.code})`);
  const result = [];

  problem.tests.forEach(test => {
    const answer = eval(test.code);
    if (answer === test.solution) {
      result.push(true);
    } else {
      result.push(false);
    }
  });

  if (result.some(res => !res)) {
    res.render('failure');
  } else {
    res.render('success');
  }
});

module.exports = router;
