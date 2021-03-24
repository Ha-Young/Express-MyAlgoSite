const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

const authCheck = (req, res, next) => {
  // check logged in or not
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

router.get('/', authCheck, (req, res) => {
  Problem.find().lean()
  .exec(function (err, problems) {
    if (err) {
      return next(err.message);
    }

    res.render('problems', { user: req.user, problems });
  });
});

router.get('/:problem_id', (req, res) => {
  Problem.findOne({ id: req.params.problem_id })
  .lean()
  .exec(function (err, problem) {
    res.render('problemView', { problem, user: req.user });
  });
});

router.post('/result', (req, res) => {
  
});

module.exports = router;
