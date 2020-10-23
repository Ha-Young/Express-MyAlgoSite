const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User');

module.exports = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'https://fathomless-ocean-47271.herokuapp.com/auth/github/callback',
      },
      async function (accessToken, refreshToken, profile, cb) {
        const { id, username, provider } = profile;
        const userInfo = { id, username, provider };

        const isSameIdIn = await User.findOne({ id });

        if (!isSameIdIn) await User.create(userInfo);

        return cb(null, profile);
      }
    )
  );

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
};
