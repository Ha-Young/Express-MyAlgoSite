const express = require('express');
const router = express.Router();
const { verifyUser } = require('./middlewares/verifyUser');

router.get('/', verifyUser, (req, res, next) => {
  res.render('problem');
});

module.exports = router;
