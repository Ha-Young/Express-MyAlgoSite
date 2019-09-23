const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const User = require('../models/User');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then((currentUser) => {
      if (currentUser) {
        done(null, currentUser);
      } else {
        new User({
          googleId: profile.id,
          userName: profile.displayName,
          thumbnail: profile._json.picture,
          locale: profile._json.locale
        }).save().then((newUser) => {
          done(null, newUser);
        });
      }
    });
  })
);
