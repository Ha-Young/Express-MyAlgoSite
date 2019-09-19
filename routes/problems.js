const express = require('express');
const router = express.Router();
const authCheck = require('./middlewares/checkAuth');
const Problem = require('../models/Problem');
// const indexController = require('./controllers/index.controller');

/* GET home page. */
router.get('/:problem_id', authCheck, async (req, res, next) => {
  const problem = await Problem.findOne({ _id: req.params.problem_id });
  res.render('problems', { title: 'Vanilla', user: req.user, problem: problem });
});

module.exports = router;
