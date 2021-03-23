const express = require('express');
const { verifyUser } = require('./middlewares/verifyUser');
const router = express.Router();

router.get('/', verifyUser, (req, res, next) => {
  res.render('index', { title: '바닐라코딩' });
});

module.exports = router;
