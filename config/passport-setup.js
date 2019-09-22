const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for the strategy
      callbackURL: '/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in db
      User.findOne({
        googleId: profile.id,
      }).then(user => {
        if (user) {
          // already have the user
          console.log('User is:', user);
          done(null, user);
        } else {
          // if not, create a new user in db
          console.log('Creating an user');
          new User({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.picture,
          })
            .save()
            .then(user => {
              console.log('New user created:', user);
              done(null, user);
            });
        }
      });
    }
  )
);
