require('dotenv').config();

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const User = require('../models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

module.exports = (passport) => {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const currentUser = await User.findOne({githubId: profile.id});

      if (currentUser) {
        done(null, currentUser);
      } else {
        const newUser = new User({
          username: profile.username,
          githubId: profile.id
        });

        newUser
          .save()
          .then((newUser) => done(null, newUser))
          .catch(err => done(err, false));
      }
    } catch (err) {
      done(err, false)
    }
  }));
  // (accessToken, refreshToken, profile, done) => {
  //   User.findOne({githubId: profile.id})
  //     .then((currentUser) => {
  //       if (currentUser) {
  //         done(null, currentUser);
  //       } else {
  //         const newUser = new User({
  //           username: profile.username,
  //           githubId: profile.id
  //         });

  //         newUser
  //           .save()
  //           .then((newUser) => done(null, newUser))
  //           .catch(err => done(err, false));
  //       }
  //     })
  //     .catch(err => done(err, false));
  // }));
}
