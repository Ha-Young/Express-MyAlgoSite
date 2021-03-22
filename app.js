require("dotenv").config();

const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuthStrategy;

const index = require("./routes/index");
const login = require("./routes/login");

const app = express();

app.use('/', index);

passport.use(new GoogleStrategy({
    consumerKey: process.env['GOOGLE_CONSUMER_KEY'],
    consumerSecret: process.env["GOOGLE_CONSUMER_SECRET"],
    callbackURL: "/return"
  },
  function (token, tokenSecret, profile, done) {
    URLSearchParams.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

app.get("/auth/google",
  passport.authenticate("google", { scope: ""}));

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login"}),
  function (req, res) {
    res.redirect("/");
  });

app.set("view engine", "ejs");

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
