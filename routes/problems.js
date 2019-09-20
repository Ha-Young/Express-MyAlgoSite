const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const auth = require('../middleware/auth');
const {getProblemInfo, postProblem} = require('./controllers/problems.controllers');

router.post('/newproblem', function(req, res, next) {
  const newProblem = new Problem(req.body);
  newProblem.save();
  res.send('ok');
});

router.post('/:problem_id', auth, postProblem);

router.get('/:problem_id', auth, getProblemInfo);

module.exports = router;