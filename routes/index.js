const express = require('express');
const router = express.Router();

/* GET home page. */
// VerifyLogin middleware 추가 예정
router.get('/', (req, res, next) => {
  res.render('index', { title: '바닐라코딩' });
});

module.exports = router;
