const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem'); 

router.get('/:id', async(req, res, next) => {
  if (!req.user) return res.redirect('/login');

  try {
    const id = req.params.id;
    const problemData = await Problem.findById(id);
    
    res.render('problemDetail', { problemData });
  } catch(err) {
    next(err);
  }
});

router.post('/:id', async(req, res, next) => {
  if (!req.user) return res.redirect('/login');

  const failureTests = [];
  const { body: { solution: receivedSolution }, params: { id } } = req;
  const problem = await Problem.findById(id);
  const tests = problem.tests;

  try {
    tests.forEach(test => {
      const makeSolution = new Function(`return ${receivedSolution}`);
      const solution = makeSolution();
      const result = eval(test.code);
  
      if (result !== test.solution) failureTests.push([test.code, test.solution, result]);
    });

    console.log(failureTests)
    if (!failureTests.length) return res.render('success');

    res.render('failure', { failureTests, problemTitle: problem.title, errorMessage: null });
  } catch(err) {
    res.render('failure', { problemTitle: problem.title, errorMessage: err.message, errorStack: err.stack });
    console.dir(err);
  }
});

module.exports = router;
