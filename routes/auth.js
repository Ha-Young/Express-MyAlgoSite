const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/github',
  passport.authenticate('github')
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login'}),
  function (req, res) {
    res.redirect('/');
  }
);

module.exports = router;
