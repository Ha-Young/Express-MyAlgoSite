const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const User = require('../models/User');

router.get('/:user_id', async (req, res, next) => {
  const userInfo = await User.findById(req.params['user_id']);

  res.render('user', { userInfo });
});

router.get('/:user_id/:problem_id', async (req, res, next) => {
  const userInfo = await User.findById(req.params['user_id']);
  const problemId = req.params['problem_id'];

  res.render('submission', {})
});

module.exports = router;
