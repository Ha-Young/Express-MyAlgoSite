const User = require('../models/User');

module.exports = function (app) {
  const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    {
      usernameField: 'username',
      session: true
    },
    function (username, password, done) {
      User.findOne({ username }, function (err, user) {
        if (err) {
          return done(err);
        }

        if (!user || !user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }

        return done(null, user);
      });
    }
  ));
  return passport;
}
