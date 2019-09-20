const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

/* GET home page. */
router.get('/', authCheck, (req, res, next) => {
  Problem.find().then(problem => {
    res.render('index', { user: req.user, problem });
  });
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
