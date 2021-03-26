const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

function passportConfig(app) {
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET_KEY,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  app.use(session({ secret: process.env.SECCSION_SECRET_KEY, resave: true, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());
}

module.exports = passportConfig;
