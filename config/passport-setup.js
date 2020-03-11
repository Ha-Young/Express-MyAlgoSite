const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const keys = require('./keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  })
});  

passport.use(
  new GitHubStrategy({
    callbackUrl: '/auth/github/redirect',
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ githubId: profile.id })
      .then(currentUser => {
        if (currentUser) {
          // console.log('already have the user ', currentUser);
          done(null, currentUser);
        } else {
          new User({
            username: profile.username,
            githubId: profile.id,
            photo: profile.photos[0].value
          }).save().then(newUser => {
            // console.log('new user', newUser);
            done(null, newUser);
          });
        }
      });
  }));
