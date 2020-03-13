const express = require('express');
const router = express.Router();
const passportGithub = require('../auth/github');

router.get('/', (req, res, next) => {
  res.render('login');
});

router.get('/github', passportGithub.authenticate('github'));

router.get(
  '/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;
