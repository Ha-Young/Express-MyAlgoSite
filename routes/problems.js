const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const forwardAuthenticated = require('./middlewares/forwardAuthenticated');

router.get('/:problems_id', forwardAuthenticated, async (req, res, next) => {
  const problem = await Problem.findOne({ id: req.params.problems_id });
  res.render('problem', { problem: problem });
});

router.post('/:problems_id', forwardAuthenticated, async (req, res, next) => {
  const { id, title, tests } = await Problem.findOne({ id: req.params.problems_id });

  res.render('result', { id, title, tests })
});

module.exports = router;
