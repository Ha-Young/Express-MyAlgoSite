const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const problems = await Problem.find();
  console.log(problems);
  res.render('index', { data: problems });
});

module.exports = router;
