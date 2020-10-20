/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.isAuthenticated(), '로그인 했어?'); // true
    next();
  } else {
    console.log(req.isAuthenticated(), '로그인 했어?'); // false
    res.status(301).redirect('/login');
  }
};

router.get('/', authenticateUser, (req, res, next) => {
  res.redirect('/problems');
});

module.exports = router;
