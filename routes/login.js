const express = require('express');
const router = express.Router();
const passport = require('passport');
const sample_problems = require('../models/sample_problems.json');
const User = require('../models/User');
const Problem = require('../models/Problem');


router.get('/', (req, res, next) => {
  if(req.isAuthenticated()){
    res.render('login', { hasLoggedIn: true })
  } else{
    res.render('login', { hasLoggedIn: false });
  }

  // if (Object.keys(req.session).length === 1) {
  //   res.render('login', { hasLoggedIn: false });
  // } else {
  //   if (Object.keys(req.session.passport).length) {
  //     res.render('login', { hasLoggedIn: true });
  //   } else {
  //     res.render('login', { hasLoggedIn: false });
  //   }
  // }
});

router.get('/github', passport.authenticate('github', {
  scope: []
}));

router.get('/github/callback', passport.authenticate('github'),async (req, res) => {
  await Problem.deleteMany({});
  Problem.insertMany(sample_problems);
  res.redirect('/');
});

module.exports = router;
