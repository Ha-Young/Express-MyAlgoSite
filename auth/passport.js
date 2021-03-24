const User = require('../models/User');

module.exports = function (app) {
  const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (_id, done) {
    try {
      const user = await User.findById(_id).lean();
      delete user.password;
      done(null, user);
    } catch (err) {
      done(err, null);
    }
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
