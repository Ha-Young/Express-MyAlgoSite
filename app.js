require("dotenv").config();
const express = require("express");
const app = express();

const index = require("./routes/index");
const level = require("./routes/level");
const login = require("./routes/login");
const logout = require("./routes/logout");
const problem = require("./routes/problem");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const mongoose = require("mongoose");
const db = mongoose.connection;

const bodyParser = require("body-parser");

mongoose.connect("mongodb+srv://hyeongju:WwHdtPxR6b-PibR@codewars.zwtye.mongodb.net/myFirstDatabase", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", function () {
  console.log("Connected to mongod server");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(passport.initialize());


const session = require("express-session");
app.use(passport.session());

app.use(session({
  secret: "hyeongju the genius",
  resave: false,
  saveUninitialized: true
}));

app.use("/", index);
app.use("/level", level);
app.use("/login", login);
app.use("/logout", logout);
app.use("/problems", problem);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
