const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/:problemId', async (req, res, next) => {
  console.log(req.params.problemId);
  try {
    const problem = await Problem.findOne({ id : req.params.problemId });
    res.render('problem', {
      title: '바닐라코딩',
      problem
    });
  } catch (error) {
    next();
  }
});

router.post('/:problemId', async (req, res, next) => {
  console.log(req.body);
});

module.exports = router;
