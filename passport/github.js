const passport = require("passport");
const jwt = require("jsonwebtoken");
const GitHubStrategy = require("passport-github").Strategy;

const { MongoError } = require("../service/error");

const SECRET_KEY = process.env.JWT_KEY;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log(1);
  done(null, user);
});

const User = require("../models/User");

const githubAuth = new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
},
  async function (accessToken, refreshToken, profile, cb) {
    try {
      const { id, username } = profile;
      const currentUser = await User.findOne({ id });

      if (currentUser) {
        cb(null, jwt.sign({ user: currentUser }, SECRET_KEY));
      } else {
        const newUser = await User.create({ id, username });

        cb(null, { token: jwt.sign({ user: newUser }, SECRET_KEY) });
      }
    } catch (err) {
      throw new MongoError();
    }
  }
);

passport.use("github", githubAuth);

module.exports = passport;
