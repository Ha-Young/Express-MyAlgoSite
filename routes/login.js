const express = require('express');
const router = express.Router();
const passport = require('../passport');
const { LOGIN, LOGIN_PAGE_URL } = require('../constants/index');

router.get('/', (req, res, next) => {
  try {
    res.status(200).render(LOGIN);
  } catch (err) {
    next(err);
  }
});

router.get('/github', passport.authenticate('github'));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: LOGIN_PAGE_URL }),
  (req, res, next) => {
    try {
      res.status(302).redirect('/');
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
