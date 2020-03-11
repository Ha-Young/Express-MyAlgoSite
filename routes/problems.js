const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/:problem_id', async (req, res) => {
  try {
    const problem = await Problem.findOne({ id: req.params.problem_id });

    res.render('problem', {
      title: "problem",
      user: req.user.username,
      problem
    });
  } catch (err) {
    console.error(err);
  }
});

router.post('/:problem_id', async (req, res) => {
  const problem = await Problem.findOne({ id: req.params.problem_id });
  console.log(222222222222222222222222222222222222222222222222222, req)
});

module.exports = router;
