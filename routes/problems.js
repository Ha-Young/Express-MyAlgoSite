const express = require('express');
const router = express.Router();
const { authenticate } = require('./middlewares/authentication');
const { getTargetProblem } = require('./middlewares/problems');
const { checkTestCases } = require('./controllers/problem.controller');

router.get('/:problem_id',
  authenticate,
  getTargetProblem,
  (req, res, next) => {
    res.status(200).render('problem', {
      problem: req.problem,
      username: req.user.username,
    });
  },
);

router.post('/:problem_id',
  authenticate,
  getTargetProblem,
  checkTestCases,
);

module.exports = router;
