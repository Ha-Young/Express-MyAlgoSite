const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/:id', async (req, res, next) => {
  if (!req.user) return res.redirect('/login');

  try {
    const id = req.params.id;
    const username = req.user.username;
    const problemData = await Problem.findById(id);

    res.render('problemDetail', { username, problemData });
  } catch (err) {
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  if (!req.user) return res.redirect('/login');

  const {
    body: { solution: receivedSolution },
    params: { id },
  } = req;
  const failureTests = [];
  const { title: problemTitle } = await Problem.findById(id);
  const tests = problem.tests;
  const username = req.user.username;

  try {
    tests.forEach(test => {
      const makeSolution = new Function(`return ${receivedSolution}`);
      const solution = makeSolution();
      const result = eval(test.code);

      if (result !== test.solution) failureTests.push([test.code, test.solution, result]);
    });

    if (!failureTests.length)
      return res.render('success', { username });

    res.render('failure', {
      failureTests,
      problemTitle,
      username,
      errorMessage: null
    });
  } catch (err) {
    if (
      err instanceof SyntaxError ||
      err instanceof TypeError ||
      err instanceof ReferenceError
    ) {
      res.render('failure', {
        problemTitle,
        username,
        errorMessage: err.message,
        errorStack: err.stack
      });
    } else {
      next(err);
    }
  }
});

module.exports = router;
