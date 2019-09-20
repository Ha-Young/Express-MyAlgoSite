const GithubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/User');

require('dotenv').config();

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new GithubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/github'
    }, function (accessToken, refreshToken, profile, done) {
      const socialId = profile.id;
      const nickname = profile.username;
      const profileImageUrl = profile.photos[0].value;

      onLoginSuccess('GITHUB', socialId, nickname, profileImageUrl, done);
    }
  ));

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['openid', 'profile', 'email']
    }, function (accessToken, refreshToken, profile, done) {
        const socialId = profile.id;
        const nickname = profile.email;
        const profileImageUrl = profile.photos[0].value;

        onLoginSuccess('Google', socialId, nickname, profileImageUrl, done);
    }
  ));

  function onLoginSuccess(platformName, socialId, nickname, profileImageUrl, done) {
    User.findOrCreate({
      platform_name: platformName,
      social_id: socialId,
      nickname,
      profile_image_url: profileImageUrl
    }, function (err, user) {
      return done(err, user);
    });
  }
};
