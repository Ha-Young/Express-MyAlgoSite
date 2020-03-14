const passport = require('passport');
const GitHubStrategy = require('passport-github');

passport.use(new GitHubStrategy.Strategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:3000/login/github/callback'
},
function(accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
}
));

passport.serializeUser(function(user, done) {
done(null, user);
});

passport.deserializeUser(function(user, done) {
done(null, user);
});

