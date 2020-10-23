const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User');

const router = express.Router();

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHBU_CLIENTSECRET,
    callbackURL: 'http://localhost:3000/login/github/callback',
  },
  async (accessToken, refreshToken, profile, cb) => {
    let user;

    try {
      user = await User.findOne({ githubID: profile.id });

      if (!user) {
        user = await User.create({
          name: profile.username,
          avatarUrl: profile.photos[0].value,
          profileUrl: profile.profileUrl,
          githubID: profile.id,
          totalScore: 0,
          triedProblems: [],
        });
      }

      return cb(null, user);
    } catch (err) {
      return cb(err, user);
    }
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser(async (user, cb) => {
  try {
    const result = await User.findOne({ githubID: user.githubID });
    if (result) return cb(null, result);
    return; //결과가 없을 때도 어떻게 처리하는지
  } catch (error) { //internal error는 어디서 어떻게 처리되는지
  }
});

router.get('/', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/');
  return res.render('login');
});

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

module.exports = router;