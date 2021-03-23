const express = require("express");
const router = express.Router();
const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "613607891988-e2qrlnof06t5us7q7i30og3o09tmh6q4.apps.googleusercontent.com",
      clientSecret: "pDYMU2nLPASvYGsY0nwq9QI8",
      callbackURL: "authcallback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
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

router.get("/github", (req, res, next) => {
  // handle with passport
  res.send("login with github");
});

module.exports = router;
