const express = require('express');
const router = express.Router();
const authCheck = require('./middlewares/checkAuth');

/* GET home page. */
router.get('/', authCheck, (req, res, next) => {
  res.render('index', { title: 'Vanilla', user: req.user });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Vanilla'});
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
