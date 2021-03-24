const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const Problem = require('../models/Problem');
const forwardAuthenticated = require('./middlewares/forwardAuthenticated');

/* GET home page. */
router.get('/', forwardAuthenticated, async (req, res, next) => {
  try {
    const problems = await Problem.find();
    res.render('index', { data: problems });
  } catch (e) {
    next(e);
  }
});

router.get('/sign-in', (req, res, next) => {
  res.render('signIn');
});

router.post('/sign-in', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/sign-in',
  failureFlash: true,
}));

router.get('/sign-out', forwardAuthenticated, (req, res, next) => {
  res.render('signOut');
});

router.get('/sign-out/callback', forwardAuthenticated, (req, res, next) => {
  if (req.session) {
    try {
      req.session.destroy();
      res.redirect('/sign-in');
    } catch (e) {
      next(e);
    }
  }
});

router.get('/sign-up', (req, res, next) => {
  res.render('signUp');
});

router.post('/sign-up', async (req, res, next) => {
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

    res.redirect('/sign-in');
  } catch (e) {
    next(e);
  }
});

router.get('/delete-account', forwardAuthenticated, (req, res, next) => {
  res.render('deleteAccount');
});

router.get('/delete-account/callback', forwardAuthenticated, async (req, res, next) => {
  const email = req.session.passport.user.email;

  try {
    await User.deleteOne({ email: email });
    req.session.destroy();
    res.redirect('/sign-in');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
