const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('./middlewares/authentication');
const { getTargetProblem } = require('./middlewares/problems');
const { checkTestCases } = require('./controllers/problem.controller');

router.get('/:problem_id',
  ensureAuthenticated,
  getTargetProblem,
  (req, res, next) => {
    res.render('problem', {
      problem: req.problem,
      username: req.user.username,
    });
  },
);

router.post('/:problem_id',
  ensureAuthenticated,
  getTargetProblem,
  checkTestCases,
);

module.exports = router;
