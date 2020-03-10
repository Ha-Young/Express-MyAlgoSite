const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/github', passport.authenticate('github'))


router.get('/github/callback', 
  passport.authenticate('github', {
     failureRedirect: '/login' 
  }), (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;
