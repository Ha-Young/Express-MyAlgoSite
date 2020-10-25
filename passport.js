const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('./models/User');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
},
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(
      { github_id: profile.id },
      (err, user) => done(err, user)
    );
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
