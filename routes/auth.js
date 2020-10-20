const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get(
  '/login/github',
  passport.authenticate('github')
);

module.exports = router;
