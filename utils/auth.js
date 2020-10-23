const passport = require('passport');
const ObjectId = require('mongoose').Types.ObjectId;
const appRoot = require('app-root-path');
const User = require('../models/User');

module.exports = () => {
  const GithubStrategy = require('passport-github').Strategy;

  passport.use(
    new GithubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'https://codewars-justin.herokuapp.com/auth/login/github/callback',
    }, async function (accessToken, refreshToken, profile, cb) {
      try {
        // find or create user
        const user = await User.find({ id: profile.id });

        if (user.length === 0) {
          const { id, username, profileUrl } = profile;

          const user = new User({
            id,
            username,
            profileUrl
          });

          await user.save();

          return cb(null, user);
        } else {
          return cb(null, user);
        }
      } catch (err) {
        console.error(err);
        return cb(err, null);
      }
    })
  );
};

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
