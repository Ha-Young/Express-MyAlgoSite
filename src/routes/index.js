var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('pages/index');
});

router.get('/login', (req, res, next) => {
  res.render('pages/login');
});

router.get('/join', (req, res, next) => {
  res.render('pages/join');
});

module.exports = router;
