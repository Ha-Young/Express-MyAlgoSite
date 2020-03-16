const express = require('express');

const router = express.Router();

const { findUser, findProblems } = require('../middlewares/utils');
const { isAuthenticated } = require('../middlewares/authorization');

router.get('/', (req, res) => {
    res.redirect('/home');
});

router.get('/home', findProblems, findUser, async (req, res, next) => {
  const { problems, user } = res.locals;

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
  const { problems, user } = res.locals;
  
  res.render('index', {
    user,
    problems,
    isLogined: req.isAuthenticated()
  });
});

module.exports = router;
