const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
require("dotenv").config();

passport.serializeUser((user, done) => {
  console.log("serialize");
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  console.log("deserialize");
  const user = await User.findById(id);

  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "login/authcallback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const currentUser = await User.findOne({ googleId: profile.id });
      if (currentUser) {
        console.log("current user...");
        done(null, currentUser);

        return;
      }

      const newUser = await new User({
        username: profile.displayName,
        googleId: profile.id,
      }).save();

      done(null, newUser);
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
  res.status(308).redirect("/");
});

router.get("/github", (req, res, next) => {
  // handle with passport
  res.send("login with github");
});

module.exports = router;
