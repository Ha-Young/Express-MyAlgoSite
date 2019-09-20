require('dotenv').config();

const GitHubStrategy = require('passport-github').Strategy;
const User = require('../../models/User');
const { production, development } = require('../../config/env');

const currentEnv = process.env.NODE_ENV || 'development';
const clientID = currentEnv === 'development' ? development.githubClientID : production.githubClientID;
const clientSecret = currentEnv === 'development' ? development.githubClientSecret : production.githubClientSecret;
const callbackURL = currentEnv === 'development' ? development.githubAuthCallback : production.githubAuthCallback;

module.exports = function passport(passport) {
  passport.use(new GitHubStrategy({
    clientID,
    clientSecret,
    callbackURL
  },
  async function(accessToken, refreshToken, profile, done) {
    const userData = {
      user_id: profile.id,
      username: profile.username,
      profile_img_url: profile.photos[0].value
    };
    try {
      const targetUser = await User.findOrCreate({ user_id : profile.id }, userData);
      done(null, targetUser.doc);
    } catch (error) {
      done(error);
    }
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
}
