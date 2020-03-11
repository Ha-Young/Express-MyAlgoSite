const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/:problem_id', async (req, res) => {
  try {
    const problem = await Problem.findOne({ id: req.params.problem_id});

    res.render('problem', {
      title: "problem",
      user: req.user.username,
      problem
    });
  } catch(err) {
    console.error(err);
  }
});

module.exports = router;
