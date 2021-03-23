require('dotenv').config();

require("./db");
require("./passport");

const express = require("express");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);

const path = require("path");

const index = require("./routes/index");
const auth = require("./routes/auth");
const join = require("./routes/join");
const problem = require("./routes/problem");
const db = require('./db');

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set('view engine', "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(express.static(__dirname + "/public"));

app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 },
  store: new MongoStore({
    mongooseConnection: db,
  }),
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", index);
app.use("/login", auth);
app.use("/join", join);
app.use("/problems", problem);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
