const express = require('express');
const fs = require('fs');
const router = express.Router();
const Problem = require('../models/Problem');
const vm = require('vm');
// const filltheArray = require('../test/problem1');

router.get('/:problem_id', async (req, res, next) => {
  testId = req.params.problem_id;
  const test = await Problem.findOne({ id: testId });
  res.render('problem', { test: test });
});

const validateUserSolution = async (req, res, next) => {
  const code = req.body.code;
  // console.log(code)
  const problemId = req.params.problem_id;
  const problem = await Problem.findOne({ id: problemId });
  const userCode = new Function(`return ${code}`)();
  console.log(problemId)
  const errResults = [];
  const correctResults = [];
  let isArray = false; 
 
  problem.tests.forEach((problem) => {
    let userResult = ''
    if (problem.parameters.length > 1) {
      userResult = userCode(...problem.parameters);
    } else {
      userResult = userCode(problem.parameters[0]);
    }

    if (problem.solution.length > 1) {
      isArray = true;
      if (problem.solution.join('') !== userResult.join('')) {
        errResults.push(userResult);
        correctResults.push(problem.solution);
      }
    } else {
      if (problem.solution[0] !== userResult) {
        errResults.push(userResult);
        correctResults.push(problem.solution[0]);
      }
    }
    console.log(errResults);
  });

  if (!errResults.length) {
    // const problem = await Problem.findOneAndUpdate({ id: problemId }, { $inc: { completed_users : 1 }});
    console.log(problem);
    res.render('success');
  } else {
    // console.log(isArray)
    res.render('failure', { err: errResults, solution: correctResults, array: isArray });
  }
}; 



router.post('/:problem_id', validateUserSolution, async (req, res, next) => {

});


module.exports = router;

