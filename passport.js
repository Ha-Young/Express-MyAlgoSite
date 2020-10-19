const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/github/callback'
},
function(accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
  // User.findOrCreate({ githubId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
}
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
