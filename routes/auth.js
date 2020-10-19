const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res, next) => {
  res.render('login');
});

// configure the Github strategy for use by Passport.
const GithubStrategy = require('passport-github').Strategy;

// OAuth 2.0 - based strategies require a verify function which receives the credential for accessing the Facebook API on the user's behalf, along with the user's profile.
router.post('/login', passport.use(
    new GithubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000"
    }, function (accessToken, refreshToken, profile, cb) { // 이게 verify function인 듯.
      // The function must invoke 'cb' with a user object,
      // which will be set at 'req.user' in route handlers after authentication.
      return cb(null, profile);
    })
  ),
  (req, res, next) => {
    console.log(req.user);
    console.log(req.body);
    res.send('login!!');
  }
);

module.exports = router;
