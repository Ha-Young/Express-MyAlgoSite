const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const forwardAuthenticated = require('./middlewares/forwardAuthenticated');

/* GET home page. */
router.get('/', forwardAuthenticated, (req, res, next) => {
  res.render('index', { title: '바닐라코딩' });
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: false,
}));

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    await User.create({
      userName: req.body.name,
      email: req.body.email,
      password: hash,
    });

    res.redirect('/login');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
