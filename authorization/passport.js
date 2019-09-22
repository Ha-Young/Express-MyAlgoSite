require('dotenv').config();

const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User');

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const AUTH_CALLBACK_URL = process.env.GITHUB_AUTH_CALLBACK;

module.exports = function passport(passport) {
  passport.use(new GitHubStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: AUTH_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, done) {
    const userData = {
      user_id: profile.id,
      name: profile.username,
      profile_img_url: profile.photos[0].value
    };
    try {
      const user = await User.findOrCreate({ user_id : profile.id }, userData);
      done(null, user.doc);
    } catch (error) {
      done(error);
    }
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(user, cb) {
    cb(null, user);
  });
};
