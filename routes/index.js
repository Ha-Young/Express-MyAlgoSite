const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: '바닐라코딩' });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Sign In' });
});

router.post('/login', (req, res, next) => {
  const {
    body: { email, password }
  } = req;
  console.log(email, password);
});

router.get('/join', (req, res, next) => {
  res.render('join', { title: 'Sign Up' });
});

router.post('/join', (req, res, next) => {
  const {
    body: { email, password, name }
  } = req;
  console.log("email", email);
  console.log("password", password);
  console.log("name", name);
});

module.exports = router;
