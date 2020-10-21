const express = require('express');
const router = express.Router();
const { ensureAuthenticated, checkTestResults } = require('./middlewares');
const problemController = require('./controllers/problem.controller');

router.get('/:problem_id',
  ensureAuthenticated,
  problemController.getTargetProblem,
  (req, res, next) => {
    res.render('problem', {
      problem: req.problem,
      username: req.user.username,
    });
  }
);

router.post('/:problem_id',
  ensureAuthenticated,
  problemController.getTargetProblem,
  checkTestResults
);

module.exports = router;
