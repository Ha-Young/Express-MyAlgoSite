const express = require('express');
const router = express.Router();
const passport = require('passport');

// const authCheck = (req, res, next) => {
//   if (!req.session.passport) {
//     res.redirect('/login');
//   } else {
//     next();
//   }
// }

router.get('/', (req, res, next) => {
  if (!req.session.passport) {
    res.render('/login', { hasLoggedIn: false });
  } else {
    res.render('login', { hasLoggedIn: true });
  }
});


router.get('/github', passport.authenticate('github', {
  scope: []
}));

router.get('/github/callback', passport.authenticate('github'),(req, res) => {
  res.redirect('/');
});

module.exports = router;
