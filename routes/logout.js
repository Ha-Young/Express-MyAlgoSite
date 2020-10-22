const express = require('express');
const router = express.Router();
const passport = require('../passport');

router.get('/', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
