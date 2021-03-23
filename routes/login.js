const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "613607891988-e2qrlnof06t5us7q7i30og3o09tmh6q4.apps.googleusercontent.com",
      clientSecret: "pDYMU2nLPASvYGsY0nwq9QI8",
      callbackURL: "login/authcallback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("callback");
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    },
  ),
);

router.get("/", (req, res, next) => {
  res.render("login");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  }),
);

router.get("/authcallback", passport.authenticate("google"), (req, res) => {
  res.send("redirect");
});

router.get("/github", (req, res, next) => {
  // handle with passport
  res.send("login with github");
});

module.exports = router;
