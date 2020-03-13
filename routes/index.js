const express = require('express');
const router = express.Router();
const verifyLogin = require('./middlewares/authorization').verifyLogin;
const Problem = require('../models/Problem');
const errors = require('../lib/errors');

router.get('/', verifyLogin, async (req, res, next) => {
  let problems;
  try {
    problems = await Problem.find({}).exec();
  } catch (err) {
    next(
      new errors.GeneralError('Error occured while fetching problems from DB' + err)
    );
  }

  res.render('index', { 
    title: '바닐라코딩',
    problems,
    user: req.user
  });
});

module.exports = router;
