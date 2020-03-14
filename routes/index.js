const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const error = require('../lib/error');
const { checkUser } = require('../middlewares/checkUser');

/* GET home page. */
router.get('/', checkUser, async (req, res, next) => {
  try {
    const problems = await Problem.find();
    const username = req.user.username;

    res.render('index', { problems, username });
  } catch (err) {
    if (err.name === 'CastError') return next(new error.CastError());
    
    next(new error.GeneralError());
  }
});

module.exports = router;
