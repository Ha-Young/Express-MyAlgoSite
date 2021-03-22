const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

const Users = require("../models/User");

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/login/github/callback"
  },
  function (accessToken, refreshToken, profile, cb) {
    Users.findOrCreate(
      {
        githubId: profile.id,
        profileUrl: profile.profileUrl,
      },
      function (err, user) {
        return cb(err, user);
      }
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
