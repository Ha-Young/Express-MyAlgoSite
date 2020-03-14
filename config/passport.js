const passport = require('passport');
const GitHubStrategy = require('passport-github');
const User = require('../models/User');

passport.use(new GitHubStrategy.Strategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:3000/login/github/callback'
}, async (accessToken, refreshToken, profile, cb) => {
  try {
    const { name, login: githubID, html_url: githubURL } = profile._json;
    let user = await User.findOne({ githubID });

    if (!user) {
      user = new User({
        name,
        githubID,
        githubURL,
        score: 0
      }).save();
    }

    return cb(null, user);
  } catch (err) {
    return cb(err);
  }
}
));

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });
