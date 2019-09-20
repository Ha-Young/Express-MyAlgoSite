const User = require("./models/User");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = function(app) {
  var passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function(id, done) {
    const user = await User.findOne({ id: id });
    done(null, user);
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password"
      },
      async function(username, password, done) {
        const loginUser = await User.findOne({
          userName: username
        });
        if (loginUser) {
          bcrypt.compare(password, loginUser.pwd, function(err, result) {
            if (result) {
              return done(null, loginUser);
            } else {
              return done(null, false, { message: "Incorrect password." });
            }
          });
        } else {
          return done(null, false, { message: "Incorrect username." });
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URIS
      },
      async function(accessToken, refreshToken, profile, done) {
        var username = profile.emails[0].value;
        var loginUser = await User.findOne({
          userName: username
        });
        if (loginUser) {
          done(null, loginUser);
        } else {
          const user = await User.create({
            id: shortid.generate(),
            userName: username,
            displayName: profile.displayName
          });
          done(null, user);
        }
      }
    )
  );
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login"
    }),
    function(req, res) {
      res.redirect("/");
    }
  );

  return passport;
};
