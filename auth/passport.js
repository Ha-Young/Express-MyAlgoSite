const User = require('../models/User');

module.exports = function (app) {
  const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (_id, done) {
    User.findById(_id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
    },
    function (email, password, done) {
      User.authenticate(email, password, done);
    }
  ));

  return passport;
}
