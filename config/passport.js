const Strategy = require('passport-github').Strategy;
const User = require('../models/User');

module.exports = function passport (passport) {
  passport.use(new Strategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/login/github/callback'
  },
  async function (accessToken, refreshToken, profile, done) {
    const userInfo = {
      userId: profile.id,
      userName: profile.username,
      userPhotoUrl: profile.photos[0].value
    }

    try {
      await User.findOrCreate({ userId : profile.id }, userInfo);
      done(null, userInfo);
    } catch (error) {
      done(error);
    }
  }));

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
};
