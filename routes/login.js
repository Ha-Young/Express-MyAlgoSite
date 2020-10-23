const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect(302, '/');
  }
  res.status(200).render('login');
});

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/',
}));

module.exports = router;
