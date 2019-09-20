const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../../models/User');

module.exports = function passport(passport) {
  if(!process.env.NODE_ENV){
    process.env.clientID = process.env.AzureClientID;
    process.env.clientSecret = process.env.AzureClientSecret;
    process.env.callbackURL = process.env.AzurecallbackURL;
  }
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: process.env.callbackURL
      },
      async function(accessToken, refreshToken, profile, cb) {
        const userData = {
          id: profile.id,
          username: profile.username,
          profileUrl: profile.profileUrl
        };
        const target = await User.findOne({ id: profile.id });
        if (target) {
          return cb(null, profile);
        } else {
          const newUser = await new User(userData);
          newUser.save().then(cb(null, profile));
        }
      }
    )
  );
};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});