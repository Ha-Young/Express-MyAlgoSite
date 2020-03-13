const express = require('express');
const { VM } = require('vm2');

const { isAuthenticated } = require('../routes/middlewares/authorization');
const { findProblemById, setSolutionResult } = require('../routes/middlewares/utils');

const router = express.Router();

router.get('/:problem_id', isAuthenticated, findProblemById, async (req, res, next) => {
  const problem = res.locals.problem;

  res.render('problem', {
    problem,
    isLogined: req.isAuthenticated(),
  });
});

router.post('/:problem_id', isAuthenticated, findProblemById, setSolutionResult, async (req, res, next) => {
  const problem = res.locals.problem;
  const result = res.locals.result;
  const error = res.locals.error;

  res.render(result ? 'success' : 'failure', {
    error,
    problem,
    isLogined: req.isAuthenticated()
  });
});

module.exports = router;
