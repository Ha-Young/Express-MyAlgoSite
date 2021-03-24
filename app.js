require("dotenv").config();

const express = require("express");
const path = require("path");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");

const mongoose = require("mongoose");
const SERVER_ADDRESS = process.env.SERVER_ADDRESS;
const PASSWORD = process.env.PASSWORD;
const DB = SERVER_ADDRESS.replace("<password>", PASSWORD);

mongoose.connect(DB,
  { useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log("server connect!!"));

const db = mongoose.connection;
db.on("error", () => console.log("error"));
db.once("open", () => console.log("connect!!!"));

const User = require("./models/User");

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true,
  },
  (request, accessToken, refreshToken, profile, done) => {
    User.findOrCreate({
      googleId: profile.id,
      email: profile.emails[0].value,
      username: profile.displayName,
      photo_url: profile.photos[0].value,
      solved_count: 0,
    }, (err, user) => {
      user.save();

      return done(null, user);
    });
  }));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const index = require("./routes/index");
const problems = require("./routes/problems");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SECRET_CODE,
  cookie: { maxAge: 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", index);
app.use("/problems", problems);

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
  res.locals.error = req.app.get('env') === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
