const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: '바닐라코딩' });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: '로그인' });
});

module.exports = router;
