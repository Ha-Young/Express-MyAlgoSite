const express = require('express');
const router = express.Router();
const passport = require('../passport');
const { LOGIN, LOGIN_PAGE_URL } = require('../constants/index');
const tryCatchWrapper = require('../utils/tryCatchWrapper');

router.get('/', tryCatchWrapper((req, res, next) => {
  res.status(200).render(LOGIN);
}));

router.get('/github', passport.authenticate('github'));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: LOGIN_PAGE_URL }),
  tryCatchWrapper((req, res, next) => res.status(302).redirect('/'))
);

module.exports = router;
