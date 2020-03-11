const express = require('express');
const router = express.Router();
const passport = require('passport');
const sample_problems = require('../models/sample_problems.json');
const Problem = require('../models/Problem');
const errors = require("../lib/error");

router.get('/', async(req, res, next) => {
  try{
    if(req.isAuthenticated()){
      res.render('login', { hasLoggedIn: true });
    } else{
      res.render('login', { hasLoggedIn: false });
    }
  } catch (error) {
    res.render('login', { hasLoggedIn: false });
  }
});

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github'),async (req, res) => {
  const problems = await Problem.find({});
  if (!problems.length) {
    Problem.insertMany(sample_problems);
  }
  
  res.redirect('/');
});

module.exports = router;
