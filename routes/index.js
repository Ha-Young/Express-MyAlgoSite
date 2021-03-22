const express = require('express');
const router = express.Router();
const { verifyUser } = require('./middlewares/verifyUser');

router.get('/', verifyUser, (req, res, next) => {
  console.log(req.session)
  res.render('index', { title: '바닐라코딩' });
});

module.exports = router;
