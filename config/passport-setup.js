const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  }).catch((err) => console.log(err.message));
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ googleId: profile.id })
      .then(user => {
        if (!user) {
          console.log('new user save..');
          new User({
            googleId: profile.id,
            name: {
              familyName: profile.name.familyName,
              givenName: profile.name.givenName
            },
            photos: [...profile.photos],
            locale: profile.locale
          }).save().then((newUser) => {
            console.log('new user created: ' + newUser);
            done(null, newUser);
          });
        } else {
          console.log('already exist user..');
          done(null, user);
        }
      });
  }
));
