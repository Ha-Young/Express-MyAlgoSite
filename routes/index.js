const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/', function (req, res, next) {
  if (req.session.passport) {
    return res.redirect('/problems');
  }

  return res.redirect('/login');
});

module.exports = router;
