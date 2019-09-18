const express = require('express');
const router = express.Router();
const passport = require('passport');
const problemsController = require('./controllers/problems.controllers');

/* GET login process */
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

/* GET logout process */
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

/* GET home page. */
router.get('/',
  require('connect-ensure-login').ensureLoggedIn(),
  problemsController.getProblems
);

module.exports = router;
