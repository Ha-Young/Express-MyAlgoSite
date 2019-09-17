const express = require('express');
const router = express.Router();
const passport = require('passport');
const problemsController = require('./controllers/problems.controllers');

/* GET login process */
router.get('/login', (req, res, next) => {
  const errorMsg = (req.session.flash) ? req.session.flash.failure : null;
  res.render('login', { title: '바닐라코딩', error_msg: errorMsg });
});

router.get('/login/github',
  passport.authenticate('github', {
    successRedirect : '/',
    failureRedirect: '/login',
    failureFlash : true,
    successFlash: "Welcome!"
  }));

/* GET logout process */
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

/* GET home page. */
router.get('/',
  require('connect-ensure-login').ensureLoggedIn(), problemsController.getAll);

module.exports = router;
