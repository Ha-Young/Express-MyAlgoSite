const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const forwardAuthenticated = require('./middlewares/forwardAuthenticated');
const flash = require('express-flash');

/* GET home page. */
router.get('/', forwardAuthenticated, (req, res, next) => {
  res.render('index');
});

router.get('/log-in', (req, res, next) => {
  res.render('logIn');
});

router.post('/log-in', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/log-in',
  failureFlash: true,
}));

router.get('/log-out', forwardAuthenticated, (req, res, next) => {
  res.render('logOut');
});

router.get('/log-out/done', forwardAuthenticated, (req, res, next) => {
  if (req.session) {
    try {
      req.session.destroy();
      res.redirect('/log-in');
    } catch (e) {
      next(e);
    }
  }
});

router.get('/sign-in', (req, res, next) => {
  res.render('signIn');
});

router.post('/sign-in', async (req, res, next) => {
  const email = await User.findOne({ email: req.body.email });

  if (email) {
    req.flash("usedEmail", "등록된 이메일입니다.");
    res.redirect('/sign-in');

    return;
  }

  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    await User.create({
      userName: req.body.name,
      email: req.body.email,
      password: hash,
    });

    res.redirect('/log-in');
  } catch (e) {
    next(e);
  }
});

router.get('/sign-out', forwardAuthenticated, (req, res, next) => {
  res.render('signOut');
});

router.get('/sign-out/done', forwardAuthenticated, async (req, res, next) => {
  const email = req.session.passport.user.email;

  try {
    await User.deleteOne({ email: email });
    req.session.destroy();
    res.redirect('/log-in');
  } catch (e) {
    next(e);
  }
});

router.get('/problems', forwardAuthenticated, (req, res, next) => {
  res.render('problems');
});

module.exports = router;
