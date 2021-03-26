const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const User = require('../models/User');
const Submission = require('../models/Submission');

router.get('/:user_id', async (req, res, next) => {
  const userInfo = await User.findById(req.params['user_id']);

  res.render('user', { userInfo });
});

router.get('/:user_id/:problem_id', async (req, res, next) => {
  const userInfo = await User.findById(req.params['user_id']);
  const problemId = Number(req.params['problem_id']);

  const submissions = await Submission.findOne({ user_id: req.user });
  const targetProblemSubmissions = submissions.history.find(problem => problem.id === problemId);

  res.render('submission', { userInfo, history: targetProblemSubmissions })
});

module.exports = router;
