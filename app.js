const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  require("dotenv").config();
}

const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const path = require("path");
const methodOverride = require("method-override");

const initializeDB = require("./config/db");

const app = express();

initializeDB();
app.set("view engine", "ejs");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { err });
});

module.exports = app;
