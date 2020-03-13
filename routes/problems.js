const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const authorization = require('../middleware/auth');
const mongoose = require('mongoose');
const controller = require('./controllers/problem.Controller');

router.get('/:problem_id', authorization, controller.getProblemId, controller.showProblem, (req, res, next) => {
    //res.render('problem');
});

router.post('/:problem_id', authorization, controller.checkProblem, controller.showResult, (req, res, next) => {
  console.log('지나가는지만 확인');
  res.render('html: wow');
})

module.exports = router;