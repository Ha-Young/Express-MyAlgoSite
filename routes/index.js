const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const authenticateUser = require('../middlewares/authorization');

/* GET home page. */
router.get('/', authenticateUser, async (req, res, next) => {
  const problems = await Problem.find();
  res.render('index', {
    title: '바닐라코딩',
    problems
  });
});

module.exports = router;
