const express = require("express");
const router = express.Router();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/User");

const CALLBACK_URL = require("../config/googleAuth").GOOGLE_AUTH_CALLBACK_URL;
const CLIENT_ID = require("../config/googleAuth").GOOGLE_CLIENT_ID;
const CLIENT_SECRET = require("../config/googleAuth").GOOGLE_CLIENT_SECRET;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: CALLBACK_URL
},
function (accessToken, refreshToken, profile, done) {
  User.findOrCreate({ profile: profile }, function (err, user) {
    return done(err, user);
  });
}));

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
