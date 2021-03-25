const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const User = require('../models/User');

router.get('/:user_id', async (req, res, next) => {
  const userId = req.params['user_id'];
  const userInfo = await User.findById(userId);

  res.render('user', { userInfo });
});

module.exports = router;
