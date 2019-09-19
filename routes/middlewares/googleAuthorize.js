const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../../models/User');
const config = require('../../config');

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
      callbackURL: config.callbackURL,
      clientID: config.clientID,
      clientSecret: config.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          done(null, currentUser);
        } else {
          new User({
            userName: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.picture
          }).save().then(newUser => {
            done(null, newUser);
          });
        }
      });
    }
  )
);

const setup = (app) => {
  app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = setup;
