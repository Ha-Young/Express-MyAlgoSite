const express = require('express');
const router = express.Router();
const { verifyUser } = require('./middlewares/verifyUser');
const Problem = require('../models/Problem');
const creatError = require('http-errors');

router.get('/', verifyUser, async (req, res, next) => {
  try {
    const problems = await Problem.find();

    res.render('index', { problems });
  } catch (err) {
    next(creatError(500, err));
  }
});

module.exports = router;
