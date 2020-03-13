const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middlewares');
const jdata = require('../models/sample_problems.json');

/* GET home page. */

router.get('/login', (req, res, next) => {
  res.status(200);
  res.set('Content-Type', 'text/html');
  res.render('login', { title: '로그인하세요' });
});

router.get('/', isLoggedIn, (req, res, next) => {
  res.status(302);
  res.render('index', { title: '바닐라코딩', jdata: jdata });
});

module.exports = router;
