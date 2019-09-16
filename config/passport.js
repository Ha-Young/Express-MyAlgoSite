const GithubStrategy = require('passport-github').Strategy;
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
      // console.log('accessToken', accessToken);
      // console.log('refreshToken', refreshToken);
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //   // 실패시 err를, 성공시 req.user를 반환
      //   console.log(user, 'login성공');
      //   return cb(err, user);
      // });

      const socialId = profile.id;
      const nickname = profile.displayName;
      const profileImageUrl = profile.photos[0].value;

      onLoginSuccess('GITHUB', socialId, nickname, profileImageUrl, done);
    }
  ));

  function onLoginSuccess(platformName, socialId, nickname, profileImageUrl, done) {
    User.findOrCreate({
      platform_name: platformName,
      social_id: socialId,
      nickname,
      profile_image_url: profileImageUrl
    }, function (err, user) {
      console.log('login 성공', user);
      return done(err, user);
    });
  }
};
