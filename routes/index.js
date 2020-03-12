const express = require('express');
const User = require('../models/User');
const Problem = require('../models/Problem');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const problems = await Problem.find();
  let message = '';

  if (req.session.isLogined) {
    const user = (await User.find({ id: req.session.passport.user }))[0];
    message = `Hello, ${user.displayName}`;
  }

  res.render('index', { 
    problems,
    message,
    isLogined: req.session.isLogined
   });
});

router.get('/login', (req, res) => {
  res.render('login', {
    isLogined: req.session.isLogined,
    message: 'Login'
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('/');
  });
});

router.get('/:level', async (req, res, next) => {
  const problems = await Problem.find({ difficulty_level: req.params.level });
  res.render('index', {
    problems,
    isLogined: req.session.isLogined,
  });
});

module.exports = router;
