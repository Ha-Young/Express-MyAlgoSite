const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).render('login');
});

router.get('/github', passport.authenticate('github'));

router.get('/github/logout', (req, res) => {
  req.logOut();
  res.status(302).redirect('/login');
});

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.status(302).redirect('/');
  }
  // optional error handling is needed
);

module.exports = router;
