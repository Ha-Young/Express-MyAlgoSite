const express = require('express');
const router = express.Router();
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/login/github/callback"
},
(accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  return cb(null, profile);
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

router.get('/', authenticateUser, (req, res, next) => {
  res.render('login');
});

router.get('/github',
  passport.authenticate('github', {
    scope: ['profile']
  })
);

router.get('/github/callback',
	passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/'
  }
));

module.exports = router;
