const express = require('express');

const router = express.Router();

const { findUser, findProblems } = require('../routes/middlewares/utils');
const { isAuthenticated } = require('../routes/middlewares/authorization');

router.get('/', (req, res) => {
    res.redirect('/home');
});

router.get('/home', findProblems, findUser, async (req, res, next) => {
  const problems = res.locals.problems;
  const user = res.locals.user;

  res.render('index', { 
    user,
    problems,
    isLogined: req.isAuthenticated()
    });
});

router.get('/login', (req, res) => {
  res.render('login', {
    isLogined: req.isAuthenticated(),
    message: 'Login'
  });
});

router.get('/logout', isAuthenticated, (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/:level', findProblems, findUser, async (req, res, next) => {
  const problems = res.locals.problems;
  const user = res.locals.user;
  
  res.render('index', {
    user,
    problems,
    isLogined: req.isAuthenticated()
  });
});

module.exports = router;
