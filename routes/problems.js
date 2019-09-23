const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const {ensureGuest} = require('./middleware/auth');
const {
  getProblemInfo,
  postProblemInfo,
  setCookies
} = require('./controllers/problems.controllers');

router.post('/newproblem', async function(req, res, next) {
  await new Problem(req.body).save();
  res.send('ok');
});

router.get('/:problem_id', ensureGuest, getProblemInfo);

router.post('/:problem_id', ensureGuest, setCookies, postProblemInfo);

module.exports = router;
