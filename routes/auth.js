const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const User = require('../models/User');

const router = express.Router();

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
},
async function(accessToken, refreshToken, profile, cb) {
  const user = await User.findOne({ id: profile.id });
  if (user) {
    cb(null, user);
  } else {
    const newUser = new User({
      ...profile,
      avatar_url: profile.photos[0].value
    });
    await newUser.save();
    cb(null, newUser);
  }
}));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

router.use(passport.initialize());
router.use(passport.session());

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.isLogined = true;
    res.redirect('/');
  });

module.exports = router;
