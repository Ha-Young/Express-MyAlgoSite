const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/', async (req, res, next) => {
  // problems.forEach(async el => {
  //   console.log(el)
  //   await new Problem(el).save();
  // });

  const problemList = await Problem.find();
  res.render('index', { problemList });
});

router.get('/login', (req, res, next) => {
  res.render('socialLogin');
})

router.get('/problem/:problem_id', async (req, res, next) => {
  const problemId = req.params.problem_id;
  await Problem.find({ id: problemId }, (err, problem) => {
    res.render('problem', { problem });
  });
})

module.exports = router;
