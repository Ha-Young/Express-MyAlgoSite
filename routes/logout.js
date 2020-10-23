const express = require('express');
const router = express.Router();
const passport = require('../passport');

router.get('/', (req, res, next) => {
  try {
    req.logout();
    res.redirect('/login');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
