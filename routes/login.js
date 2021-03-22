const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const User = require("../models/User");

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
  callbackURL: "http://localhost:3000/login/auth/google/callback"
},
function (accessToken, refreshToken, profile, done) {
  User.findOrCreate({ profile: profile }, function (err, user) {
    return done(err, user);
  });
}
));

router.get("/auth/google",passport.authenticate("google",{ scope:
['profile', 'email'] }));

router.get("/auth/google/callback",
passport.authenticate("google", { failureRedirect: "/"}),
function (req, res) {
  res.redirect("/");
});

router.get("/", (req, res, next) => {
    res.render("login");
  });

module.exports = router;