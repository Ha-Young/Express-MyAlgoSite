const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require('passport-github').Strategy;

const User = require("./models/User");

// passport.use(new LocalStrategy(User.authenticate));

passport.use(new LocalStrategy({
  usernameField: "username",
  passwordField: "password",
}, (username, password, cb) => {
  if (!username || !password) {
    return cb(null, false);
  }

  if (username === "user001" && password === "password") {
    return cb(null, username);
  }

  return cb(null, false);
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
  async (accessToken, refreshToken, profile, cb) => {
    await User.findOrCreate({ githubId: profile.id }, (err, user) => {
      return cb(err, user);
    });
  },
));

passport.serializeUser((user, cb) => {
  cb(null, user)
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
