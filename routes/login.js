const express = require('express');
const router = express.Router();
const passport = require('../passport');

router.get('/', (req, res, next) => {
  try {
    res.status(200).render('login');
  } catch (err) {
    next(err);
  }
});

router.get('/github', passport.authenticate('github'));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res, next) => {
    try {
      res.status(302).redirect('/');
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
