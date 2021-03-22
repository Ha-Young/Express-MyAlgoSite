const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: '바닐라코딩' });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: '바닐라코딩' });
});

router.post('/login', (req, res, next) => {
  const {
    body: { email, password }
  } = req;
  console.log(email, password);
});

router.get('/join', (req, res, next) => {
  res.render('login', { title: '바닐라코딩' });
});

router.post('/join', (req, res, next) => {
  
});

module.exports = router;
