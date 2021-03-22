const express = require('express');
const router = express.Router();
const { verifyUser } = require('./middlewares/verifyUser');
const Problem = require('../models/Problem');

router.get('/', verifyUser, async (req, res, next) => {
  console.log(req.session)
  const problems = await Problem.find();

  res.render('index', { problems });
});

module.exports = router;
