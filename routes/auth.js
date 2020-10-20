const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/github',
  passport.authenticate('github')
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login'}),
  function (req, res) {
    console.log('callback_Success')
    console.log('session', req.session);
    // console.log('Success req', req.session.passport.user);
    res.redirect('/');
  }
);

module.exports = router;
