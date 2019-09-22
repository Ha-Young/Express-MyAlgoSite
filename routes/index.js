const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const problemsController = require('./controllers/problems.controllers');

router.get('/login', (req, res, next) => {
  res.render('login', { title: '바닐라코딩' });
});

router.get('/login/github', passport.authenticate('github', {
  successRedirect : '/',
  failureRedirect: '/login'
}));

router.get('/login/google', passport.authenticate('google', {
  successRedirect : '/',
  failureRedirect: '/login'
}));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/',
  ensureLogin.ensureLoggedIn(),
  problemsController.getProblems
);

router.get('/level/:level',
  ensureLogin.ensureLoggedIn(),
  problemsController.getProblems
);

module.exports = router;
