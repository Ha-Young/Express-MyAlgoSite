const express = require('express');
const User = require('../models/User');
const Problem = require('../models/Problem');
const { setProblems } = require('../utils/index')
const { setMainPageMessage } = require('../utils/index');
const { isAuthenticated } = require('../routes/middlewares/authorization');

const router = express.Router();

router.get('/', async (req, res, next) => {

  const problems = await setProblems(req, res);
  const message = await setMainPageMessage(req, res);

  res.render('index', { 
    problems,
    message,
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

router.get('/:level', async (req, res, next) => {
  const problems = await setProblems(req, res, { difficulty_level: req.params.level });
  const message = await setMainPageMessage(req, res);
  
  res.render('index', {
    problems,
    message,
    isLogined: req.isAuthenticated()
  });
});

module.exports = router;
