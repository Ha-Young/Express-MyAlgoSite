const express = require('express');
const passport = require('passport');
const verifyUser = require('./middlewares/authorization').verifyUser;

const User = require('../models/User');
const Problem = require('../models/Problem');

const DUMMY = require('../models/sample_problems.json');

const router = express.Router();

// API TEST =================================

router.post('/', async (req, res, next) => {
  const { body } = req;
  console.log(body);
  try {
    const result = await User.create(body);
    res.status(201).send('Created!');
  } catch (error) {
    next(error);
  }
});

router.post('/pro', async (req, res, next) => {
  const { body } = req;
  console.log(body);
  try {
    const result = await Problem.create(body);
    res.status(201).send('Created!');
  } catch (error) {
    next(error);
  }
});

// ===========================================

/* GET home page. */
router.get('/', verifyUser, (req, res, next) => {
  // sort by 처리
  console.log(req.query);
  res.render('index', { title: '바닐라코딩', user: 'TOGGO', list: DUMMY });
});

router.get('/login', (req, res, next) => {
  // console.log(req.session);
  res.render('login');
});

router.post('/login', passport.authenticate('github'));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

router.get('/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

module.exports = router;
