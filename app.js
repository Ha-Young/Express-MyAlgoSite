const path = require("path");
const express = require("express");
const passport = require("passport");
const githubStrategy = require("passport-github");
const keys = require("./config/keys");
const index = require("./routes/index");
const login = require("./routes/login");
const problem= require("./routes/problem");

// const userGithubId = require("./config/");
global.loginState = {};

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

passport.use(
  new githubStrategy(
    {
      clientID: keys.github.CLIENT_ID,
      clientSecret: keys.github.CLIENT_SECRET,
      callbackURL: "/login/github/callback"
    },
    (aceessTocken, refreshToken, profile, cb) => {
      user = { ...profile };
      global.loginState.githubId = user._json.login;
      return cb(null, profile);
    }
  )
);
const app = express();
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "./public")));

app.use("/", index);
app.use("/login", login);
app.use("/problem", problem);

// const passportSetup = require('./config/passport_setup');

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/codewars", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch(err => {
    next(err);
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
