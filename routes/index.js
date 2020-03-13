const express = require('express');
const router = express.Router();
const { isLoggedIn, create } = require('./middlewares');
const Problem = require('../models/Problem');

/* GET home page. */

router.get('/login', create, (req, res, next) => {
  res.status(200).render('login', {
    title: '로그인하셔야 이용하실 수 있습니다'
  });
});

router.get('/', isLoggedIn, (req, res, next) => {
  Problem.find((err, problemData) => {
    res.status(302).render('index', {
      title: '바닐라코딩',
      problemData
    });
  });
});

module.exports = router;
