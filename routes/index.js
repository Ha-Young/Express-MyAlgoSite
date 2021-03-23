const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: '바닐라코딩' });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Sign In' });
});

router.post('/login', (req, res, next) => {
  const {
    body: { email, password }
  } = req;
  console.log(email, password);
  next();
}, passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/'
}));

router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email', 'openid'] }));

router.get('/login/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {res.redirect('/')});

router.get('/join', (req, res, next) => {
  res.render('join', { title: 'Sign Up' });
});

router.post('/join', async (req, res, next) => {
  const {
    body: { email, password, name }
  } = req;

  try {

    const user = await User({
      email,
      name,
      password,
    });
    await User.create(user);
  } catch (err) {
    console.log(err);
  }

  next();
});

module.exports = router;
