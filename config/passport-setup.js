const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const keys = require('./keys');
const User = require('../models/User');

passport.use(
  new GitHubStrategy({
    callbackUrl: '/auth/github/redirect',
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    console.log('패스포트 콜백 호출', profile)
  })
);
