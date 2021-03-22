require("dotenv").config();

const express = require("express");

const index = require("./routes/index");
const login = require("./routes/login");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const app = express();

const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect("mongodb+srv://hyeongju:WwHdtPxR6b-PibR@codewars.zwtye.mongodb.net/myFirstDatabase", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", function () {
  console.log("Connected to mongod server");
});

app.set("view engine", "ejs");

app.use(passport.initialize());

app.use('/', index);
app.use("/login", login);

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
