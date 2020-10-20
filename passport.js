const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('./models/User');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
},
  function(accessToken, refreshToken, profile, done) {
    // console.log(profile);
    User.findOne({ githubId: profile.id }, function(err, user) {
      return done(err, profile);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


module.exports = passport;
