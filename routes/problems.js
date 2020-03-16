const express = require('express');

const { isAuthenticated } = require('../middlewares/authorization');
const { findProblemById, setSolutionResult } = require('../middlewares/utils');

const router = express.Router();

router.get('/:problem_id', isAuthenticated, findProblemById, async (req, res, next) => {
  const { problem } = res.locals;

  res.render('problem', {
    problem,
    isLogined: req.isAuthenticated(),
  });
});

router.post('/:problem_id', isAuthenticated, findProblemById, setSolutionResult, async (req, res, next) => {
  const { problem, result, error } = res.locals;

  res.render(result ? 'success' : 'failure', {
    error,
    problem,
    isLogined: req.isAuthenticated()
  });
});

module.exports = router;
