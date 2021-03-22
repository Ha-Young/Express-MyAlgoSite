var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('pages/index', { title: '바닐라코딩' });
});

module.exports = router;
