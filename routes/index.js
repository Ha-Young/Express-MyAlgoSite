const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('pages/index', { title: '바닐라코딩' });
});

module.exports = router;
