const router = require('express').Router();
const authCheck = require('./middlewares/checkAuth');
const Problem = require('../models/Problem');

router.get('/:problem_id', authCheck, async (req, res, next) => {
  const problem = await Problem.findOne({ _id: req.params.problem_id });
  res.render('problems', {
    title: 'Vanilla',
    user: req.user,
    problem: problem
  });
});

router.post('/:problem_id', authCheck, async (req, res, next) => {
  const problem = await Problem.findOne({ _id: req.params.problem_id });
  res.render('problems', { title: 'Vanilla', user: req.user, problem: problem });
});

module.exports = router;
